import React, { useEffect, useState } from 'react'
import { BONUS_TYPE, getKeyLang } from '../../../configs/supplement-app'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { BaseAppUltils, Button, Checkbox, DatePicker, goBackHomePage, Select, showConfirmAlert } from 'base-app'
import moment from 'moment'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  exportExcel, loadContractInfo,
  loadListBonusHistory,
  loadListSuggestion,
  updateBonusHistoryPaid
} from '../../../redux/actions/supplement-app/bonusHistory'
import { Check, CheckCircle, XCircle } from 'react-feather'

const MAX_SELECT_DAYS = 90


const BonusHistory = () => {

  const [bonusType, setBonusType] = useState()
  const [isOpenModal, setIsOpenModal] = useState()
  const [bonusHistorySelected, setBonusHistorySelected] = useState({})
  const [startDate, setStartDate] = useState(moment().subtract(7, 'day').toDate())
  const [endDate, setEndDate] = useState(moment().toDate())
  const [searchIds, setSearchIds] = useState('')
  const { list, suggestions, contract } = useSelector(state => state.app.bonusHistory)
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [isCheckAll, setIsCheckAll] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const intl = useIntl()

  useEffect(() => {
    const type = getBonusType()
    if (type) {
      setBonusType(type)
      dispatch(loadListBonusHistory(type, startDate, endDate, searchIds))
      if (type !== BONUS_TYPE.PERSONAL) {
        dispatch(loadListSuggestion())
      }
    }

  }, [history.location.pathname])

  const getBonusType = () => {
    for (const key of Object.keys(BONUS_TYPE)) {
      if (history.location.pathname.includes(`/${BONUS_TYPE[key].toLowerCase()}`)) {
        return BONUS_TYPE[key]
      }
    }
    return ''
  }

  const onChangeDateSearch = ([start, end]) => {
    if (!end) {
      return
    }
    if (Math.abs(moment(start).diff(end, 'days')) >= MAX_SELECT_DAYS) {
      BaseAppUltils.toastError('Chỉ có thể chọn ngày bắt đầu và kết thúc tối đa là 3 tháng!')
    } else {
      setStartDate(start)
      setEndDate(end)
    }
  }

  const onChangeSearchIds = (values) => {
    setSearchIds((values || []).map(item => item.id).join(','))
  }

  const onClickSearch = () => {
    dispatch(loadListBonusHistory(bonusType, startDate, endDate, searchIds))
  }

  const onClickSave = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={getKeyLang('bonus.contractComplete')} />,
        isShow: true,
        content: <FormattedMessage id={getKeyLang('bonus.contractComplete.confirmMessage')} />,
        onConfirm: () => {
          dispatch(updateBonusHistoryPaid(Array.from(selectedItems).join(), bonusType, startDate, endDate, searchIds))
          selectedItems.clear()
        }
      })
    )
  }

  const onClickExportExcel = (bonusType) => {
    if(bonusType === BONUS_TYPE.ALL) {
      dispatch(exportExcel(startDate, endDate, searchIds, false))
    } else dispatch(exportExcel(startDate, endDate, searchIds, true))

  }

  const onClickCheck = (item, checked) => {
    if (checked) {
      selectedItems.add(item.id)
    } else {
      selectedItems.delete(item.id)
    }
    setSelectedItems(new Set([...Array.from(selectedItems)]))
  }

  const onClickCheckAll = (checked) => {
    setIsCheckAll(checked)
    list.filter(item => !item.paid).forEach(item => {
      onClickCheck(item, checked)
    })
  }

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

  const onClickViewContractDetail = (event, bonusHistory) => {
    event.preventDefault()
    setBonusHistorySelected(bonusHistory)
    toggleModal()
    dispatch(loadContractInfo(bonusHistory.contractId))
  }

  const toggleModal = () => {
    if (isOpenModal) {
      setBonusHistorySelected(null)
    }
    setIsOpenModal((isOpenModal) => !isOpenModal)
  }

  const dateOptions = {
    mode: 'range',
    dateFormat: 'm-d-Y'
  }

  const getTotalBonus = () => {
    const totalBonus = list.reduce((total, item) => total += item.bonusValue, 0)
    return Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(totalBonus)
  }

  const columns = [
    {
      Header: <FormattedMessage id={getKeyLang('bonus.contractId')} />,
      accessor: 'contractName',
      Cell: ({ original }) => (
        <a href='#' onClick={(event) => onClickViewContractDetail(event, original)}>{original.contractName}</a>
      )
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.bonusPoints')} />,
      accessor: 'bonusValue',
      Cell: ({ original }) => (
        <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(original.bonusValue)}</span>
      )
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.userReceiveBonusPoint')} />,
      accessor: 'userCode'
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.status')} />,
      accessor: 'paid',
      Filter: ({ filter, onChange }) => (
        <select className='React w-100' value={filter ? filter.value : ''}
                onChange={event => onChange(event.target.value)}>
          <option value=''>{intl.formatMessage({ id: getKeyLang('bonus.all') })}</option>
          <option value={true}>{intl.formatMessage({ id: getKeyLang('bonus.paid') })}</option>
          <option value={false}>{intl.formatMessage({ id: getKeyLang('bonus.unpaid') })}</option>
        </select>
      ),
      Cell: ({ original }) => (
        <span className={original.paid ? 'text-success' : 'text-danger'}>
          {original.paid ? <CheckCircle size={18} /> : <XCircle size={18} />}
        </span>
      )
    },
    {
      Header: <FormattedMessage id={getKeyLang('bonus.action')} />,
      id: 'action',
      show: bonusType === BONUS_TYPE.ALL || bonusType === BONUS_TYPE.PARTNER,
      sortable: false,
      Filter: () => (
        <div className='d-flex justify-content-center'>
          <Checkbox checked={isCheckAll} onChange={e => onClickCheckAll(e.target.checked)}
                    icon={<Check className='vx-icon' size={16} />} />
        </div>
      ),
      Cell: ({ original }) => (
        <div className='d-flex justify-content-center'>
          {!original.paid ? (
            <Checkbox checked={selectedItems.has(original.id)} onChange={e => onClickCheck(original, e.target.checked)}
                      icon={<Check className='vx-icon' size={16} />} />
          ) : null}
        </div>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='text-uppercase'><FormattedMessage
            id={getKeyLang(`bonus.history.title.${bonusType}`)}
          /></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={12} md={4}>
              <DatePicker value={[startDate, endDate]} options={dateOptions} onChange={onChangeDateSearch} />
            </Col>
            {
              bonusType !== BONUS_TYPE.PERSONAL ? (
                <Col xs={12} md={5}>
                  <FormattedMessage
                    id={getKeyLang('bonus.findPartner')}
                  >
                    {(msg) => (
                      <FormGroup>
                        <Select
                          readOnly
                          isMulti
                          closeMenuOnSelect={true}
                          notRequired
                          className='React'
                          classNamePrefix='select mt-1'
                          onChange={onChangeSearchIds}
                          value={searchIds}
                          options={suggestions}
                          placeholder={msg}
                          isClearable={true}
                        />
                      </FormGroup>
                    )}
                  </FormattedMessage>
                </Col>
              ) : null
            }
            <Col xs={12} md={3}>
              <Button.Ripple color='primary' onClick={onClickSearch}><FormattedMessage
                id={getKeyLang('bonus.search')} /></Button.Ripple>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col className='d-flex justify-content-between align-items-center'>
              <h5>
                <FormattedMessage id={getKeyLang('bonus.totalBonusPoint')} /> : {getTotalBonus()}
              </h5>
              {bonusType === BONUS_TYPE.ALL || bonusType === BONUS_TYPE.PARTNER ? (
                <Button.Ripple color='primary' className='mb-2' onClick={() => onClickExportExcel(bonusType)}>
                  <FormattedMessage id={getKeyLang('bonus.exportReport')} /></Button.Ripple>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <ReactTable
                className='-striped -highlight'
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
                data={list}
                filterable
                columns={columns}
                defaultPageSize={10}
              >

              </ReactTable>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <div className='d-flex justify-content-end'>
            <Button.Ripple color='secondary' className='mr-2' onClick={onClickBackHome}>
              <FormattedMessage id='common.home' /></Button.Ripple>
            {
              bonusType === BONUS_TYPE.ALL || bonusType === BONUS_TYPE.PARTNER  ? (<Button.Ripple color='primary' disabled={selectedItems.size === 0}
                                                            onClick={onClickSave}><FormattedMessage
                id={getKeyLang('bonus.save')} /></Button.Ripple>) : null
            }
          </div>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpenModal} className='modal-dialog-centered'>
        <ModalHeader toggle={toggleModal}>
          <FormattedMessage id={getKeyLang('bonus.detail')} />
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={5}>
              <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.bonusPoints')} />:</span>
            </Col>
            <Col md={7}>
              <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(bonusHistorySelected?.bonusValue)}</span>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={5}>
              <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.contractId')} />:</span>
            </Col>
            <Col md={7}>
              <span>{bonusHistorySelected?.contractName}</span>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={5}>
              <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.owner')} />:</span>
            </Col>
            <Col md={7}>
              <span>{contract?.owner?.fullName}</span>
            </Col>
          </Row>
          {
            bonusType !== BONUS_TYPE.PARTNER ? (
              <>
                <Row className='mt-2'>
                  <Col md={5}>
                    <span className='font-weight-bold'><FormattedMessage
                      id={getKeyLang('bonus.manufacturer')} />:</span>
                  </Col>
                  <Col md={7}>
                    <span>{contract?.vehicles ? contract.vehicles[0]?.manufacturerName : ''}</span>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col md={5}>
                    <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.vehicles')} />:</span>
                  </Col>
                  <Col md={7}>
                    <span>{contract?.vehicles ? contract.vehicles[0]?.brandName : ''}</span>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col md={5}>
                    <span className='font-weight-bold'><FormattedMessage
                      id={getKeyLang('bonus.licensePlates')} />:</span>
                  </Col>
                  <Col md={7}>
                    <span>{contract?.vehicles ? contract.vehicles[0]?.numberPlate : ''}</span>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col md={5}>
                    <span className='font-weight-bold'><FormattedMessage
                      id={getKeyLang('bonus.insuranceType')} />:</span>
                  </Col>
                  <Col md={7}>
            <span><FormattedMessage
              id={getKeyLang(`bonus.insuranceType.${contract.contractType === 'CC' ? 'car' : 'motor'}`)} /></span>
                  </Col>
                </Row>
              </>
            ) : null
          }

          <Row className='mt-2'>
            <Col md={5}>
              <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.insuranceCompany')} />:</span>
            </Col>
            <Col md={7}>
              <span>{contract?.insurCompanyName}</span>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={5}>
              <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.effectiveFrom')} />:</span>
            </Col>
            <Col md={7}>
              <span>{contract?.insurances ? moment(contract?.insurances[0]?.startValueDate).format('HH:mm DD/MM/YYYY') : ''}</span>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={5}>
              <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.effectiveTo')} />:</span>
            </Col>
            <Col md={7}>
              <span>{contract?.insurances ? moment(contract?.insurances[0]?.endValueDate).format('HH:mm DD/MM/YYYY') : ''}</span>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={5}>
              <span className='font-weight-bold'><FormattedMessage
                id={getKeyLang('bonus.totalInsuranceMoney')} />:</span>
            </Col>
            <Col md={7}>
              <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(contract?.totalFeeInclVAT)} VNĐ
                (<FormattedMessage id={getKeyLang('bonus.vatIncluded')} />)</span>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>)
}

export default BonusHistory
