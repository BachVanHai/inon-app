import {
  BaseAppUltils,
  Button,
  goBackHomePage,
  Select,
  showConfirmAlert,
  useDeviceDetect
} from 'base-app'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table
} from 'reactstrap'
import styled from 'styled-components'
import { addAppContextPath, filterMethod, getKeyLang, removeAccents } from '../../../../configs/supplement-app'
import { getListNotificationPending } from '../../../../redux/actions/supplement-app/notificationApproval'
import { loadAllNotification } from '../../../../redux/actions/supplement-app/notificationCreate'
import NotificationService from '../../../../services/supplement-app/notification'
import RejectModal from './RejectModal'
import { convertISOToDate, convertUpdatedDateISOToDate, DRAFT, NEW, OUTOFDATE, REJECTED, SENT, statusTypeFilter, TIMEOUT, USER_ROLE, WAITINGTOSEND } from './utility'
import moment from 'moment'

const TableStyled = styled.div`
.ReactTable .rt-expander {
    margin: 2px 10px;
}
`
const TdStyled = styled.td`
  background-color: #c3c3c3;
  color: white;
`
const TreeTable = treeTableHOC(ReactTable)
const NotificationManagement = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { availableNotification } = useSelector(
    (state) => state.app.notificationCreate
  )
  const {user} = useSelector(state => state.auth)
  const { notificationPending } = useSelector(
    (state) => state.app.notificationApproval
  )
  const [availableUsersState, setAvailableUsersState] = useState([])
  const history = useHistory()
  const [dispatchDependency, setDispatchActive] = useState(0)
  const dependencies = [
    notificationPending.length,
    dispatchDependency,
    history.location.pathname
  ]
  const onClickApprove = (original) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage id={getKeyLang('notification.approval.title')} />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('notification.approval.question.comfirmMessage')}
          />
        ),
        onConfirm: async () => {
          const res = await NotificationService.approvalNotification(
            original.id,
            WAITINGTOSEND
          )
          if (res) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('account.success') })
            )
            reActiveLoadApi()
            return true
          }
        }
      })
    )
  }
  const handleDisabled = (original) =>{
    const code = original.code !== undefined ?  original.code.substring(0, original.code.length - 8) : null
    original.codeNotificationType = code
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage id={getKeyLang('notification.disabled.title')} />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('notification.disabled.message')}
          />
        ),
        onConfirm: async () => {
          const res = await NotificationService.disabledNotification(
            original.id , original
          )
          if (res) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('account.success') })
            )
            reActiveLoadApi()
            return true
          }
        }
      })
    )
  }
  useEffect(() => {
    dispatch(getListNotificationPending())
    dispatch(loadAllNotification())
    setAvailableUsersState(availableNotification)
  }, [
    ...dependencies,
    notificationPending.length,
    JSON.stringify(availableNotification)
  ])
  const onClickBackHome = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='common.home' />,
        isShow: true,
        content: <FormattedMessage id='common.backHome.confirmMessage' />,
        onConfirm: () => {
          dispatch(goBackHomePage())
        }
      })
    )
  }
  const filterMethodTitle = (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) : true
  }
  const reActiveLoadApi = () => {
    setDispatchActive((pre) => ++pre)
  }

  const ExpandableTable = ({ data }) => {
    const isNotShowNumberSendNotif = data.status === DRAFT || data.status === SENT
    return (
      <Table size='sm' responsive bordered>
        <tbody>
          <tr>
            <TdStyled className='text-left'>
              <FormattedMessage
                id={getKeyLang('notification.management.period')}
              />
            </TdStyled>
            <td className='text-left'>{!data.period ? intl.formatMessage({ id: getKeyLang(`notification.period.no`) }) : intl.formatMessage({ id: getKeyLang(`notification.period.yes`) })}</td>
          </tr>
          <tr>
            <TdStyled className='text-left'>
              <FormattedMessage
                id={getKeyLang('notification.management.startDate')}
              />
            </TdStyled>
            <td className='text-left'>{convertISOToDate(data.startDate)}</td>
          </tr>
          <tr>
            <TdStyled className='text-left'>
              <FormattedMessage
                id={getKeyLang('notification.management.endDate')}
              />
            </TdStyled>
            <td className='text-left'>{convertISOToDate(data.endDate)}</td>
          </tr>
          <tr>
            <TdStyled className='text-left'>
              <FormattedMessage
                id={getKeyLang('notification.approval.creatorCode')}
              />
            </TdStyled>
            <td className='text-left'>{data.createdByName === null ? "-" : data.createdByName}</td>
          </tr>
          <tr>
            <TdStyled className='text-left'>
              <FormattedMessage
                id={getKeyLang('notification.management.updateDate')}
              />
            </TdStyled>
            <td className='text-left'>{data.updateDate === null ? "-" : convertISOToDate(data.updateDate)}</td>
          </tr>
          <tr>
            <TdStyled className='text-left'>
              <FormattedMessage
                id={getKeyLang('notification.numberOfTimesSent')}
              />
            </TdStyled>
            <td className='text-left'>{data?.numberOfTimesSend === null ? "-" : data.numberOfTimesSend}</td>
          </tr>
        </tbody>
      </Table>
    )
  }

  const getApprovalStatus = (approvalStatus , approvalTime, numberOfTimesSend) => {
    switch (approvalStatus) {
      case NEW:
        return {
          component: (
            <Badge color='warning'>
              <FormattedMessage id={getKeyLang('account.pending')} />
            </Badge>
          ),
          content: intl.formatMessage({ id: getKeyLang(`account.pending`) })
        }
      case SENT:
        return {
          component: (
            <Badge color='success'>
              <FormattedMessage id={getKeyLang('notification.status.senting')} />
            </Badge>
          ),
          content: intl.formatMessage({ id: getKeyLang(`notification.status.senting`) })
        }
      case REJECTED:
        return {
          component: (
            <Badge color='danger'>
              <FormattedMessage id={getKeyLang('account.reject')} />
            </Badge>
          ),
          content: intl.formatMessage({ id: getKeyLang(`account.reject`) })
        }
      case WAITINGTOSEND:
        return {
          component: (
            <Badge color='warning'>
              <FormattedMessage id={getKeyLang('notification.status.waitingtosent')} />
            </Badge>
          ),
          content: intl.formatMessage({ id: getKeyLang(`notification.status.waitingtosent`) })
        }
      case DRAFT:
        return {
          component: (
            <Badge color='secondary'>
              <FormattedMessage id={getKeyLang('notification.status.draft')} />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`notification.status.draft`)
          })
        }
      case TIMEOUT:
        return{
          component: (
            <Badge color='info'>
            <FormattedMessage id={getKeyLang('notification.status.sent')} />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`notification.status.sent`)
          })
        }
        case OUTOFDATE:
        return{
          component: (
            <Badge color='danger'>
            <FormattedMessage id={getKeyLang('notification.status.outOfDate')} />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`notification.status.sent`)
          })
        }
      default:
        return null
    }
  }



  const columns = [
    {
      Header: (
        <FormattedMessage
          id={getKeyLang('notification.management.notificationCode')}
        />
      ),
      accessor: 'code',
      filterable: true,
      maxWidth: 400,
      minWidth: 140,
      width: 250,
      filterMethod: filterMethod,
      Cell : ({original}) =>{
        return <span title={original.code} style={{marginTop : '5px'}}>{original.code}</span>
      }
    },
    {
      Header: (
        <FormattedMessage
          id={getKeyLang('notification.management.titleNotification')}
        />
      ),
      accessor: 'title',
      maxWidth: 400,
      minWidth: 140,
      width: 250,
      filterable: true,
      filterMethod : filterMethodTitle,
      Cell : ({original}) =>{
        return <span title={original.title} style={{marginTop : '5px'}}>{original.title}</span>
      }
    },
    {
      Header: (
        <FormattedMessage
          id={getKeyLang('notification.management.statusNotification')}
        />
      ),
      filterable: true,
      accessor: 'status',
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
                id: getKeyLang('evoucher.management.table.filter.all')
              })}
            </option>
            {statusTypeFilter.map((item,index) => {
              return (
                <option key={index} value={item.type}>
                  {item.name}
                </option>
              )
            })}
          </select>
        )
      },
      Cell: ({ original }) => {
        const approvalStatus = original.status
        const effectiveDate = original.startDate
        const numberOfTimesSend = original.numberOfTimesSend
        return <span>{getApprovalStatus(approvalStatus,effectiveDate,numberOfTimesSend).component}</span>
      }
    },
    {
      Header: (
        <FormattedMessage
          id={getKeyLang('notification.management.actionNotification')}
        />
      ),
      Cell: ({ original }) => {
        const isNotifActive = original.status === NEW
        const isModalEditable = original.status === REJECTED || original.status === DRAFT || original.status === NEW 
        const isNotifRejected = original.status === REJECTED || original.status === DRAFT
        const isNotifOutDate = original.status === OUTOFDATE && user.groupId === USER_ROLE.ADMIN
        const isNotifSending = original.status === SENT
        const handleDeleteBtnClick = () => {
          dispatch(
            showConfirmAlert({
              title: (
                <FormattedMessage
                  id={getKeyLang('notification.management.cancelNotification')}
                />
              ),
              isShow: true,
              content: (
                <FormattedMessage
                  id={getKeyLang('notification.management.deleteNotification')}
                />
              ),
              onConfirm: async () => {
                const res = await NotificationService.deleteNotification(
                  original.id
                )
                if (res) {
                  BaseAppUltils.toastSuccess(
                    intl.formatMessage({ id: getKeyLang('account.success') })
                  )
                  reActiveLoadApi()
                  return true
                }
              }
            })
          )
        }

        const [isModalOpen, setModalOpen] = useState(false)
        const handleRejectClick = () => {
          setModalOpen(true)
        }
        const closeModal = () => {
          setModalOpen(false)
        }
        const handleCloseModal = () => {
          setModalOpen(false)
        }

        return (
          <div className='d-flex justify-content-center text-center'>
          {
            isNotifActive ?
            <div className='d-flex justify-content-center text-primary cursor-pointer'>              
                  <div onClick={()=> history.push(addAppContextPath(`/notification/create/${original.id}`))}>
                  <Icon.Edit2 className='vx-icon' size={15}/>
                  </div>
                  {
                    user.groupId === USER_ROLE.ADMIN ?
                    <>
                    <div className="text-primary ml-1" onClick={()=>{
                      onClickApprove(original)
                    }}>
                    <Icon.Check size={18} className='vx-icon' />
                    </div>
                    <div className="text-danger ml-1"  onClick={handleRejectClick}>
                    <Icon.X size={18} className='vx-icon'/>
                    </div>
                    </>
                     : null
                  }
              </div>
           : 
           <>
              <div className='d-flex justify-content-center text-primary cursor-pointer' onClick={()=> history.push(addAppContextPath(`/notification/create/${original.id}`))}>
                {isModalEditable ? (
                 <div>
                 <Icon.Edit2 className='vx-icon' size={15}/>
                 </div>
                ) : (
                  <div>
                  <Icon.Eye className='vx-icon' size={15}/>
                  </div>
                )}
              </div>
              {isNotifSending ?
              <div className="text-primary ml-1 cursor-pointer" onClick={() => handleDisabled(original)}>
                <Icon.Power size={15} />
              </div>
               : null}
              {isNotifRejected ?   <div
                onClick={handleDeleteBtnClick}
                className='ml-1 text-danger cursor-pointer'
              >
                <Icon.Trash className='vx-icon' size={15} />
              </div> : null}
            </> 
          }
          {
            isNotifOutDate ?  <div
                onClick={handleDeleteBtnClick}
                className='ml-1 text-danger cursor-pointer'
              >
                <Icon.Trash className='vx-icon' size={15} />
              </div>: null
          }
          <RejectModal
           original={original}
           isModalOpen={isModalOpen}
           closeModal={closeModal}
           reActiveLoadApi={reActiveLoadApi}
           handleCloseModal={handleCloseModal}
              />
            </div>
        
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id={getKeyLang(`notification.management.title`)} />
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
          <TableStyled>
          <TreeTable
              className='nested-table -striped -highlight'
              previousText={intl.formatMessage({ id: 'common.table.previous' })}
              nextText={intl.formatMessage({ id: 'common.table.next' })}
              noDataText={intl.formatMessage({ id: 'common.table.noData' })}
              pageText={intl.formatMessage({ id: 'common.table.page' })}
              ofText={intl.formatMessage({ id: 'common.table.of' })}
              rowsText={intl.formatMessage({ id: 'common.table.rows' })}
              getTdProps={() => ({
                style: {
                  height: '40px'
                }
              })}
              data={availableUsersState}
              columns={columns}
              defaultPageSize={10}
              SubComponent={(row) => {
                return (
                  <div style={{ padding: '10px' }}>
                    <ExpandableTable data={row.original} />
                  </div>
                )
              }}
            />
          </TableStyled>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <div className='d-flex justify-content-end'>
          <Button.Ripple
            color='secondary'
            className=''
            onClick={onClickBackHome}
          >
            <FormattedMessage id='common.home' />
          </Button.Ripple>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NotificationManagement
