import { BaseAppUltils, FormattedMessage, showConfirmAlert } from 'base-app'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-feather'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table
} from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/app-no1'
import { getAllCategoryQuestion } from '../../../../redux/actions/app-no1/helpCenterCreate'
import HelpCenterSevice from '../../../../services/app-no1/helpCenter'
import { isArrayEmpty, TreeTable_filterMethod_noAccents } from '../../../../ultity'
import DetailModal from '../components/DetailModal'
import RejectModal from '../components/RejectModal'
import { CHTG, handleConvertTOISOstring, USER_ROLE } from '../utility'
import {
  APPROVALED,
  DISABLED,
  DRAFT,
  REJECTED,
  statusTypeFilter,
  TdStyled,
  WAITTING_APPROVAL
} from './utility'
const DropdownToggleStyled = styled.div`
height : 100%;
  .dropdown .dropdown-menu {
    z-index: 1;
    padding  : 0;
  }
  .dropdown .dropdown-menu .dropdown-item {
    width: 100%;
    height : 40px;
    line-height : 20px;
    z-index: 0;
    border-bottom: 1px solid #e3e3e3;
    &:last-child{
      border : none;
    }
  }
  .dropdown .dropdown-menu .dropdown-item:hover{
    ${'' /* background-color : #333 */}
  }
  .dropdown .dropdown-menu::before {
    visibility: hidden;
  }
  .btn-secondary {
    background-color: #338955 !important;
    color: #fff;
  }
`
const QuestionTable = (reActiveLoadApi) => {
  const { categoryQuestion } = useSelector(
    (state) => state.app.helpCenterCreate
  )
  const {user} = useSelector(state => state.auth)
  const isAdmin = user.groupId === USER_ROLE.ADMIN
  const history = useHistory()
  const categorySugesstionFilter =!isArrayEmpty(categoryQuestion) ?  categoryQuestion.filter((cate) => {
    return cate.categoryQuestionType === CHTG
  }) : []
  const categoryListSuggestion = !isArrayEmpty(categorySugesstionFilter) ?  categorySugesstionFilter.map(_elt =>{
    return {
      name : _elt.name ,
      type : _elt.id
    }
  }) : []
  const dispatch = useDispatch()
  const intl = useIntl()
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [originalSelect, setOriginalSelect] = useState({})
  const openDetailModal = () => {
    setIsOpenModalDetail(true)
  }
  const closeDetailModal = () => {
    setIsOpenModalDetail(false)
  }
  const openRejectModal = () => {
    setIsOpenRejectModal(true)
  }
  const closeRejectModal = () => {
    setIsOpenRejectModal(false)
  }
  const handleDeleteQuestion = async (id) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('helpcenter.manangement.action.remove')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('helpcenter.management.delete.title')}
          />
        ),
        onConfirm: async () => {
          const res = await HelpCenterSevice.deleteQuestion(id)
          if (res.status === 204) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('helpcenter.management.action.success') })
            )
            closeRejectModal()
            reActiveLoadApi()
            return
          } else {
            BaseAppUltils.toastError(
              intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
            )
            return
          }
        }
      })
    )
  }
  const getApprovalStatus = (approvalStatus) => {
    switch (approvalStatus) {
      case WAITTING_APPROVAL:
        return {
          component: (
            <Badge color='warning'>
              <FormattedMessage
                id={getKeyLang('helpcenter.management.status.waitingApproval')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`helpcenter.management.status.waitingApproval`)
          })
        }
      case APPROVALED:
        return {
          component: (
            <Badge color='success'>
              <FormattedMessage
                id={getKeyLang('helpcenter.management.status.approvaled')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`helpcenter.management.status.approvaled`)
          })
        }
      case REJECTED:
        return {
          component: (
            <Badge color='danger'>
              <FormattedMessage
                id={getKeyLang('helpcenter.management.status.rejected')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`helpcenter.management.status.rejected`)
          })
        }
      case DISABLED:
        return {
          component: (
            <Badge color='warning'>
              <FormattedMessage
                id={getKeyLang('helpcenter.management.status.disabled')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`helpcenter.management.status.disabled`)
          })
        }
      case DRAFT:
        return {
          component: (
            <Badge color='secondary'>
              <FormattedMessage
                id={getKeyLang('helpcenter.management.status.draft')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`helpcenter.management.status.draft`)
          })
        }
      default:
        return null
    }
  }
  const handleDisbledQuestion = (original) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('helpcenter.management.status.disabled')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('helpcenter.management.disabled.title')}
          />
        ),
        onConfirm: async () => {
          const res = await HelpCenterSevice.disabledQuestion(original.id)
          if (res.status === 200) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('userGroup.createDone') })
            )
            reActiveLoadApi()
            return
          } else {
            BaseAppUltils.toastError(
              intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
            )
            return
          }
        }
      })
    )
  }
  const handleApprovalQuestion = (original) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('helpcenter.manangement.action.approval')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('helpcenter.management.approval.title')}
          />
        ),
        onConfirm: async () => {
          const res = await HelpCenterSevice.approvalQuestion(original.id)
          if (res.status === 200) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('helpcenter.management.action.success') })
            ) 
            reActiveLoadApi()
            return
          } else {
            BaseAppUltils.toastError(
              intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
            )
            return
          }
        }
      })
    )
  }
  const getCategory = (cateId) =>{
    const cate = !isArrayEmpty(categoryQuestion) ?  categoryQuestion.filter((cate) =>{
      return cate.id === cateId
    }) : null
    return cate !== undefined && !isArrayEmpty(cate) ? cate[0].name : ""
  }
  useEffect(() => {
    dispatch(getAllCategoryQuestion())
  }, [])
  return {
    Table: ({ data }) => {
      return [
        <Table size='sm' responsive bordered>
          <tbody>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('helpcenter.management.creator')}
                />
              </TdStyled>
              <td className='text-left'>{data.createdBy}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('helpcenter.management.releaseDate')}
                />
              </TdStyled>
              <td className='text-left'>
                {handleConvertTOISOstring(data.createdDate)}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('helpcenter.management.lastUpdateDate')}
                />
              </TdStyled>
              <td className='text-left'>
                {data.updateDate !== null
                  ? handleConvertTOISOstring(data.updateDate)
                  : '-'}
              </td>
            </tr>
          </tbody>
        </Table>
      ]
    },
    columns: [
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('helpcenter.management.questionCode')}
          />
        ),
        accessor: 'code',
        filterable: true,
        filterMethod : TreeTable_filterMethod_noAccents,
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('helpcenter.management.title')} />
        ),
        accessor: 'question',
        filterMethod : TreeTable_filterMethod_noAccents,
        filterable: true,
        Cell : ({original}) =>{
          return <span title={original.question}>{original.question}</span>
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('helpcenter.management.category')} />
        ),
        accessor: 'categoryQuestionId',
        filterable: true,
        Cell: ({ original }) => {
          const cateId = original.categoryQuestionId
          return getCategory(cateId)
        },
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={(e) => {
                onChange(e.target.value)
              }}
              style={{ width: '100%' }}
              value={filter ? filter.value : ''}
            >
              <option value=''>
                {intl.formatMessage({
                  id: getKeyLang('helpcenter.management.table.filter.all')
                })}
              </option>
              {!isArrayEmpty(categoryQuestion) ?  categoryListSuggestion.map((item,index) => {
                return (
                  <option value={item.type} key={index}>
                    {item.name}
                  </option>
                )
              }) : ""}
            </select>
          )
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('helpcenter.management.status')} />
        ),
        accessor: 'status',
        filterable: true,
        Cell: ({ original }) => {
          const approvalStatus = original.status
          return getApprovalStatus(approvalStatus).component
        },
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={(e) => {
                onChange(e.target.value)
              }}
              style={{ width: '100%' }}
              value={filter ? filter.value : ''}
            >
              <option value=''>
                {intl.formatMessage({
                  id: getKeyLang('helpcenter.management.table.filter.all')
                })}
              </option>
              {statusTypeFilter.map((item,index) => {
                return (
                  <option value={item.type} key={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          )
        }
      },
      {
        Header: <FormattedMessage id={getKeyLang('userGroup.action')} />,
        style: { overflow: 'visible' },
        Cell: ({ original }) => {
          const isNotWaitingApproval = original.status === WAITTING_APPROVAL
          const isDeleteQuestion =
            original.status === DRAFT || original.status === REJECTED || original.status === APPROVALED || original.status === DISABLED
          const isApprovalQuestion = original.status === APPROVALED
          const [dropdownOpen, setDropdownOpen] = useState(false)
          const toggle = () => {
            setDropdownOpen((prevState) => !prevState)
          }
          return (
            <DropdownToggleStyled>
              <div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle size="sm" className='btn btn-primary'>
                    <Icon.List size='15' />
                  </DropdownToggle>
                  <DropdownMenu onClick={() => setOriginalSelect(original)}>
                    <DropdownItem
                      onClick={() =>
                        history.push(`/app/help-center/edit/${original.id}`)
                      }
                    >
                      <Icon.Edit2 size='15' color="#338955"/>
                      <span className='text-primary ml-1'>
                        <FormattedMessage
                          id={getKeyLang('helpcenter.manangement.action.edit')}
                        />
                      </span>
                    </DropdownItem>
                      <DropdownItem onClick={() => openDetailModal()}>
                      <Icon.Eye size='15' color='#2E75B6' />
                      <span style={{color :"#2E75B6"}} className='ml-1'>
                        <FormattedMessage
                          id={getKeyLang('helpcenter.manangement.action.view')}
                        />
                      </span>
                    </DropdownItem>

                    {isDeleteQuestion ? (
                      <DropdownItem
                        onClick={() => {
                          handleDeleteQuestion(original.id)
                        }}
                      >
                        <Icon.Trash size='15' color='#ea5455' />
                        <span className='text-danger ml-1'>
                          <FormattedMessage
                            id={getKeyLang(
                              'helpcenter.manangement.action.remove'
                            )}
                          />
                        </span>
                      </DropdownItem>
                    ) : (
                      ''
                    )}
                    {isApprovalQuestion ? (
                      <DropdownItem
                        onClick={() => handleDisbledQuestion(original)}
                      >
                        <Icon.EyeOff size='15' color='#c15811' />
                        <span style={{color : "#c15811"}} className='ml-1'>
                          <FormattedMessage
                            id={getKeyLang(
                              'helpcenter.manangement.action.hidden'
                            )}
                          />
                        </span>
                      </DropdownItem>
                    ) : (
                      ''
                    )}
                    {isAdmin ? <div>
                      {isNotWaitingApproval ? (
                      <>
                        <DropdownItem
                          onClick={() => handleApprovalQuestion(original)}
                        >
                          <Icon.Check size='15' color='#338955' />
                          <span className='text-primary ml-1'>
                            <FormattedMessage
                              id={getKeyLang(
                                'helpcenter.manangement.action.approval'
                              )}
                            />
                          </span>
                        </DropdownItem>
                        <DropdownItem onClick={() => openRejectModal()}>
                          <Icon.X size='15' color='#ea5455' />
                          <span className='text-danger ml-1'>
                            <FormattedMessage
                              id={getKeyLang(
                                'helpcenter.manangement.action.reject'
                              )}
                            />
                          </span>
                          <RejectModal
                            isOpen={isOpenRejectModal}
                            closeModal={closeRejectModal}
                            intl={intl}
                            getKeyLang={getKeyLang}
                            original={originalSelect}
                            reActiveLoadApi={reActiveLoadApi}
                          />
                        </DropdownItem>
                      </>
                    ) : (
                      ''
                    )}
                    </div> : null}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <DetailModal
                isOpen={isOpenModalDetail}
                closeDetailModal={closeDetailModal}
                original={originalSelect}
              />
            </DropdownToggleStyled>
          )
        }
      }
    ]
  }
}

export default QuestionTable
