import {
  BaseAppUltils,
  FormattedMessage,
  showConfirmAlert,
  Select
} from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Badge, Table } from 'reactstrap'
import { addAppContextPath, filterMethod, getKeyLang } from '../../../../configs/supplement-app'
import {
  DISABLED,
  PERCENT,
  REJECTED,
  AWAITING_APPROVAL,
  ACTIVE,
  TdStyled,
  PREPAY,
  VND,
  voucherTypeFilter,
  statusTypeFilter,
  USER_ROLE,
  convertDate,
  convertISOStringToDateTime,
  AWAITING_ACTIVE,
  convertUpdatedDateISOToDate
} from './utility'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Icon from 'react-feather'
import EvoucherService from '../../../../services/supplement-app/evoucher'
import HistoryModal from './historyModal'
import RejectModal from './rejectModal'
import moment from 'moment'
import { SAME_PRICE } from '../create/utility'
import FileSaver from 'file-saver'
import { date } from 'yup'

const EvoucherTable = (reActiveLoadApi) => {  
  const dispatch = useDispatch()
  const history = useHistory()
  const intl = useIntl()
  const TODAY = moment().toISOString()
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false)
  const [historyData, setHistoryData] = useState([]);
  const { availableCompanyInsurance } = useSelector(
    (state) => state.app.evoucherCreate
  )
  const {user} = useSelector(state => state.auth)

  const getApprovalStatus = (approvalStatus, effect) => {
    const effectDate = effect < TODAY
    switch (approvalStatus) {
      case REJECTED:
        return {
          component: (
            <Badge color='danger'>
              <FormattedMessage
                id={getKeyLang('evoucher.management.status.reject')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.management.status.reject`)
          })
        }
      case AWAITING_APPROVAL:
        return {
          component: (
            <Badge color='warning'>
              <FormattedMessage
                id={getKeyLang('evoucher.management.status.notActivated')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.management.status.notActivated`)
          })
        }
      case DISABLED:
        return {
          component: (
            <Badge color='warning'>
              <FormattedMessage
                id={getKeyLang('evoucher.management.status.finished')}
              />
            </Badge>
          ),
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.management.status.finished`)
          })
        }
      case ACTIVE:
        return {
          component:  <Badge color='success'>
              <FormattedMessage
                id={getKeyLang(`evoucher.management.status.active`)}
              />
            </Badge>,
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.management.status.active`)
          })
        }
        case AWAITING_ACTIVE:
        return {
          component:  <Badge color='success'>
              <FormattedMessage
                id={getKeyLang(`evoucher.management.status.actived`)}
              />
            </Badge>,
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.management.status.actived`)
          })
        }
      default:
        return null
    }
  }
  const getEvoucherType = (type) => {
    switch (type) {
      case PERCENT:
        return {
          component: (
            <FormattedMessage
              id={getKeyLang('evoucher.create.percentDiscount')}
            />
          ),
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.create.percentDiscount`)
          })
        }
      case PREPAY:
        return {
          component: (
            <FormattedMessage
              id={getKeyLang('evoucher.management.type.prepay')}
            />
          ),
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.management.type.prepay`)
          })
        }
        case SAME_PRICE:
          return {
            component: (
              <FormattedMessage
                id={getKeyLang('evoucher.create.sameProductPrice')}
              />
            ),
            content: intl.formatMessage({
              id: getKeyLang(`evoucher.create.sameProductPrice`)
            })
          }
      case VND:
        return {
          component: (
            <FormattedMessage id={getKeyLang('evoucher.management.type.vnd')} />
          ),
          content: intl.formatMessage({
            id: getKeyLang(`evoucher.management.type.vnd`)
          })
        }
      default:
        return null
    }
  }
  const approvalEvoucher = (id) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.title.activedVoucher')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.question.activedVoucher')}
          />
        ),
        onConfirm: async () => {
          const res = await EvoucherService.approvalEvoucher(id)
          if (res.status === 200) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('account.success') })
            )
            reActiveLoadApi()
            return true
          }
          else{
            return false
          }
        }
      })
    )
  }
  const removeEvoucher = (id) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.title.deleteVoucher')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.question.deleteVoucher')}
          />
        ),
        onConfirm: async () => {
          const res = await EvoucherService.deleteEvoucher(id)
          if (res) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('account.success') })
            )
            reActiveLoadApi()
            return true
          }
          BaseAppUltils.toastError(
            intl.formatMessage({ id: getKeyLang('account.error') })
          )
          return false
        }
      })
    )
  }
  const disableEvoucher = (id) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.title.disabledVoucher')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.question.disabledVoucher')}
          />
        ),
        onConfirm: async () => {
          const res = await EvoucherService.finishEvoucher(id)
          if (res.status === 200) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('account.success') })
            )
            reActiveLoadApi()
            return true
          }
          else{
            return false
          }
        }
      })
    )
  }
  const handleOpenModalHistory = () => {
    setIsOpenHistoryModal(true)
  }
  const handleCloseModalHistory = () => {
    setIsOpenHistoryModal(false)
  }
  const downloadEvoucher = async (id)  =>{
    const res = await EvoucherService.downloadEvoucher(id);
    if (res.status === 200 ) {
      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
     });
     FileSaver.saveAs(blob, `Inon_evoucher_${id}.xlsx`);  
    }
  }
  useEffect(() => {

  }, []);
  return {
    Table: ({ data }) => {
      return [
        <Table size='sm' responsive bordered>
          <tbody>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.product')}
                />
              </TdStyled>
              <td className='text-left'>{data.insuranceTypeName === null ? '-' : data.insuranceTypeName}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.insuranceBranch')}
                />
              </TdStyled>
              <td className='text-left'>{data.insuranceCompanyName === null ? '-' : data.insuranceCompanyName}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.discountValue')}
                />
              </TdStyled>
              <td className='text-left'>
                {data.voucherType !== PREPAY && data.voucherType !== PERCENT ? `${data.discountValue} ${intl.formatMessage({ id: getKeyLang('evoucher.create.copper') })}` : '-'}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.percentDiscount')}
                />
              </TdStyled>
              <td className='text-left'>
                {data.voucherType === PERCENT ? `${data.discountValue} ${intl.formatMessage({ id: getKeyLang('evoucher.management.precent') })}` : '-'}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.maximumDiscount')}
                />
              </TdStyled>
              <td className='text-left'>
                {data.maxDiscountValue === null ? '-' : `${data.maxDiscountValue} ${intl.formatMessage({ id: getKeyLang('evoucher.create.copper') })}`}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang(
                    'evoucher.management.columns.minimumContractValue'
                  )}
                />
              </TdStyled>
              <td className='text-left'>
                {data.minContractValue === null ? '-' : `${data.minContractValue} ${intl.formatMessage({ id: getKeyLang('evoucher.create.copper') })}`}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.theSamePrice')}
                />
              </TdStyled>
              <td className='text-left'>
              { data.voucherType === SAME_PRICE ? `${data.samePrice} ${intl.formatMessage({ id: getKeyLang('evoucher.create.copper') })}` :  data.voucherType === PREPAY ? `0 ${intl.formatMessage({ id: getKeyLang('evoucher.create.copper') })} ` : '-'}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.dateFrom')}
                />
              </TdStyled>
              <td className='text-left'>
                {data.effectiveDate === null ? '-' : convertISOStringToDateTime(data.effectiveDate)}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.dateTo')}
                />
              </TdStyled>
              <td className='text-left'>
                {data.status === DISABLED ? convertUpdatedDateISOToDate(data.updatedDate) : data.expireDate === null ? '-' : convertISOStringToDateTime(data.expireDate)}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang(
                    'evoucher.management.columns.quantityEvoucherRelease'
                  )}
                />
              </TdStyled>
              <td className='text-left'>{data.totalVoucher}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang(
                    'evoucher.management.columns.quantityEvoucherUsed'
                  )}
                />
              </TdStyled>
              <td className='text-left'>{data.totalVoucherUsed}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.createBy')}
                />
              </TdStyled>
              <td className='text-left'>{data.createdBy}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('evoucher.management.columns.history')}
                />
              </TdStyled>
              <td className='text-left'>
                <span
                  onClick={() => {
                    handleOpenModalHistory()
                    setHistoryData(data.voucherHistory)
                  }}
                  className='cursor-pointer'
                >
                  <FormattedMessage
                    id={getKeyLang('evoucher.management.table.action.detail')}
                  />
                </span>
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
            id={getKeyLang('evoucher.management.programCode')}
          />
        ),
        accessor: 'code',
        filterable: true,
        filterMethod: filterMethod
      },
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.programName')}
          />
        ),
        accessor: 'name',
        filterable: true,
        filterMethod: filterMethod
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('evoucher.management.formality')} />
        ),
        accessor: 'voucherType',
        filterable: true,
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
              {voucherTypeFilter.map((item , index) => {
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
          const evoucherType = original.voucherType
          return getEvoucherType(evoucherType).component
        }
      },
      {
        Header: (
          <FormattedMessage id={getKeyLang('evoucher.management.status')} />
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
          return getApprovalStatus(approvalStatus, original.effectiveDate)
            .component
        }
      },
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('notification.management.actionNotification')}
          />
        ),
        Cell: ({ original }) => {
          const [isModalOpen, setModalOpen] = useState(false)
          const handleCloseModal = () => {
            setModalOpen(false)
          }
          const isVoucherActived = original.status === ACTIVE
          const isVoucherReject = original.status === REJECTED
          const isVoucherNotActived = original.status === AWAITING_APPROVAL
          const isVoucherAwatingActive = original.status === AWAITING_ACTIVE
          const isVoucherDisabled = original.status === DISABLED
          return (
            <div className="">
              <div className="text-center">
              <div className="d-flex justify-content-center">
             {
               user.groupId === USER_ROLE.ADMIN ? <div>
             {isVoucherNotActived ?
               <div className="d-flex ml-2">
               <div className="text-primary cursor-pointer mr-1" onClick={() =>{
                 approvalEvoucher(original.id)
                }}>
                <Icon.Check className='vx-icon' size={15}/>
                </div>
                <div className="text-danger cursor-pointer mr-1" onClick={() => {
                      setModalOpen(true)
                    }}>
                <Icon.X className='vx-icon' size={15}/>
                </div>
               </div>
                : null}
             </div> : null
             }
             <div className="text-primary cursor-pointer mr-1" onClick={() =>{
                 history.push(addAppContextPath(`/evoucher/edit/${original.id}`))
                }}>
                {isVoucherReject || isVoucherAwatingActive ? <Icon.Edit2 className='vx-icon' size={15}/> :null}
               </div>
               <div>
                 {
                   isVoucherActived || isVoucherAwatingActive ?
                   <div className="text-primary cursor-pointer mr-1" onClick={()=>{
               disableEvoucher(original.id)
                }}>
                <Icon.Power className='vx-icon' size={15}/>
                </div>
                    : null 
                 }
               </div>
               <div>
                 {
                   isVoucherActived || isVoucherAwatingActive || isVoucherDisabled ? 
                   <div className="text-primary cursor-pointer mr-1" onClick={() =>{
                 downloadEvoucher(original.id)
                }}>
              <Icon.Download className='vx-icon' size={15}/> 
                </div>
                   : null
                 }
               </div>
                <div className="text-primary cursor-pointer mr-1">
                 {isVoucherReject ?
                 <div onClick={() =>{
                 removeEvoucher(original.id)
                }}> <Icon.Trash className='vx-icon' size={15} /></div>
                  : null}
                </div>
              </div>
              </div>
             <RejectModal
               original={original}
               isOpen={isModalOpen}
               closeModal={handleCloseModal}
               intl={intl}
               getKeyLang={getKeyLang}
               reActiveLoadApi={reActiveLoadApi}
             />
             <HistoryModal
               isOpen={isOpenHistoryModal}
               closeModal={handleCloseModalHistory}
               original={historyData}
             />
            </div>
          )
        }
      }
    ]
  }
}

export default EvoucherTable
