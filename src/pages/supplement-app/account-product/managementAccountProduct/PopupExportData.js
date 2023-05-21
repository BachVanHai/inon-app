import { BaseAppUltils, Checkbox, FormattedMessage } from 'base-app'
import FileSaver from 'file-saver'
import moment from 'moment'
import React, { useState } from 'react'
import { Check } from 'react-feather'
import { useSelector } from 'react-redux'
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap'
import { getKeyLang } from '../../../../configs/supplement-app'
import AccountProductsService from '../../../../services/supplement-app/accoutProducts'
const PopupExportData = ({
  isOpen,
  toggle,
  fromDate,
  toDate = moment().toISOString(),
  data
}) => {
  const TODAY = moment().format('YYYY-MM-DD')
  const { user } = useSelector((state) => state.auth)
  const [cifFccOpenDate, setCifFccOpenDate] = useState(true)
  const [accFccNo, setAccFccNo] = useState(true)
  const [cifFcc, setCifFcc] = useState(true)
  const [ebankPresenterCode, setEbankPresenterCode] = useState(true)
  const [ebankCustomerName, setEbankCustomerName] = useState(true)
  const [kycLevelBank, setKycLevelBank] = useState(true)
  const [ebankCheckInfo, setEbankCheckInfo] = useState(true)
  const [ebankDescription, setEbankDescription] = useState(true)
  const [ebankAccType, setEbankAccType] = useState(true)
  const [month, setMonth] = useState(true)
  const [ebankPresenterCodeInOn, setEbankPresenterCodeInOn] = useState(true)
  //handle export data to file exel
  const handleExportData = async () => {
    const fromDateConvert = moment(fromDate).format('YYYY-MM-DD 00:00:00')
    const toDateConvert = moment(toDate).format('YYYY-MM-DD 23:59:59')
    const startDate = moment(fromDateConvert).utc(true).toISOString()
    const endDate = moment(toDateConvert).utc(true).toISOString()
    const res = await AccountProductsService.exportAccoutByFileExel(
      startDate,
      endDate,
      user?.username,
      cifFccOpenDate,
      accFccNo,
      cifFcc,
      ebankPresenterCode,
      ebankCustomerName,
      kycLevelBank,
      ebankCheckInfo,
      ebankDescription,
      ebankAccType,
      month,
      ebankPresenterCodeInOn,
      data
    )
    if (res.status === 200) {
      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      FileSaver.saveAs(blob, `InOn_export_account_${TODAY}.xlsx`)
      toggle()
      BaseAppUltils.toastSuccess('Xuất báo cáo thành công !')
    }
  }
  return (
    <Modal isOpen={isOpen} className='modal-lg modal-dialog-centered'>
      <ModalHeader
        toggle={() => toggle()}
        cssModule={{ 'modal-title': 'w-100 text-center' }}
      >
        <div className='d-flex justify-content-center text-uppercase font-weight-bold'>
          Xuất báo cáo
        </div>
      </ModalHeader>
      <ModalBody>
        <div className='mb-1 font-weight-bold'>
          <FormattedMessage
            id={getKeyLang('accountProduct.pleaseSelectTypeExport')}
          />
        </div>
        <Row>
          <Col md={6} xs={12}>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={cifFccOpenDate}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setCifFccOpenDate(!cifFccOpenDate)}
              />
              <FormattedMessage id={getKeyLang('accountProduct.dateCIFFCC')} />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={accFccNo}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setAccFccNo(!accFccNo)}
              />
              <FormattedMessage
                id={getKeyLang('accountProduct.numberCIFFCC')}
              />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={cifFcc}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => {
                  setCifFcc(!cifFcc)
                }}
              />
              <FormattedMessage id={getKeyLang('accountProduct.numberTKFCC')} />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={month}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setMonth(!month)}
              />
              <FormattedMessage id={getKeyLang('accountProduct.month')} />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={kycLevelBank}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setKycLevelBank(!kycLevelBank)}
              />
              <FormattedMessage
                id={getKeyLang('accountProduct.KYCLevelEbank')}
              />
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={ebankCustomerName}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setEbankCustomerName(!ebankCustomerName)}
              />
              <FormattedMessage id={getKeyLang('accountProduct.nameEbank')} />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={ebankAccType}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setEbankAccType(!ebankAccType)}
              />
              <FormattedMessage id={getKeyLang('accountProduct.accountType')} />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                color='primary'
                checked={ebankCheckInfo}
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setEbankCheckInfo(!ebankCheckInfo)}
              />
              <FormattedMessage
                id={getKeyLang('accountProduct.postCheckEbank')}
              />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                checked={ebankDescription}
                color='primary'
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setEbankDescription(!ebankDescription)}
              />
              <FormattedMessage id={getKeyLang('accountProduct.reasonEbank')} />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                checked={ebankPresenterCodeInOn}
                color='primary'
                icon={<Check className='vx-icon' size={16} />}
                onClick={() =>
                  setEbankPresenterCodeInOn(!ebankPresenterCodeInOn)
                }
              />
              <FormattedMessage id={getKeyLang('accountProduct.codePartner')} />
            </div>
            <div className='d-flex align-items-center'>
              <Checkbox
                checked={ebankPresenterCode}
                color='primary'
                icon={<Check className='vx-icon' size={16} />}
                onClick={() => setEbankPresenterCode(!ebankPresenterCode)}
              />
              <FormattedMessage
                id={getKeyLang('accountProduct.ebankPresenterCodeInOn')}
              />
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter
        cssModule={{ 'modal-footer': 'w-100 text-center' }}
        className='mb-2'
      >
        <div className='d-flex justify-content-center'>
          <div>
            <Button
              color='primary'
              onClick={handleExportData}
              disabled={
                !accFccNo &&
                !cifFcc &&
                !ebankPresenterCode &&
                !ebankCustomerName &&
                !kycLevelBank &&
                !ebankCheckInfo &&
                !ebankDescription &&
                !ebankAccType &&
                !month && 
                !cifFccOpenDate
                  ? true
                  : false
              }
            >
              Xuất
            </Button>
          </div>
          <div className='ml-1'>
            <Button onClick={toggle}>Huỷ bỏ</Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default PopupExportData
