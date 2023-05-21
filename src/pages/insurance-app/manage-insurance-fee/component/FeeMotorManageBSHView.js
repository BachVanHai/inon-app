import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap'
import {
  FormattedMessage,
  DatePicker,
  AppId,
  BaseAppUltils,
  useDeviceDetect
} from 'base-app'
import { useDispatch, useSelector } from 'react-redux'
import FeeMotorTNDSManageView from './FeeMotorTNDSManageView'
import FeeMotorCNManageView from './FeeMotorCNManageView'
import FeeInsuranceServ from '../../../../services/insurance-app/feeManageInsurance'
import {
  getFeeMotorPartner,
  getFeeMotor,
  getFeeApproveDetail
} from '../../../../redux/actions/insurance-app/feeInsuManage'
import { useFormik } from 'formik'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import { history } from '../../../../history'
import moment from 'moment'
import SelectMutilForm from '../../../../components/insurance-app/buy-insurance-car/form/SelectMutilForm'
import PartnerSelectedTable from "./PartnerSelectedTable"
import { KEY_PARTNERS } from '../../../../redux/reducers/insurance-app/appConfig'
import { NAME_APP_CONFIG } from '../../../../configs/insurance-app'
import { getPartners } from '../../../../redux/actions/insurance-app/appConfig'

const FeeMotorManageBSHView = (props) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [role, setRole] = useState(props.role)
  const [editable, setEditable] = useState(props.editable)
  const { isMobile } = useDeviceDetect()

  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const [listFeeTNDSChange, setLisFeeTNDSChange] = useState([])

  const [listFeeCNChange, setLisFeeCNChange] = useState([])
  const [modalResult, setModalResult] = useState(false)
  const [messageResult, setMessageResult] = useState('')
  const [updateFeeInfo, setListUpdateFeeInfo] = useState([])
  const [partnerSelect, setPartnerSelect] = useState([])
  const [userPartnerSelect, setUserPartnerSelect] = useState(null)
  const [userId, setUserId] = useState(props.userId)
  const { [KEY_PARTNERS]: partners } = useSelector((state) => state.app[NAME_APP_CONFIG])

  const formik = useFormik({
    initialValues: {},
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: values => { }
  })

  useEffect(() => {
    reset()
    if (props.userId !== '') {
      setUserPartnerSelect(props.userId)
      dispatch(getFeeMotorPartner(formik, role, props.userId, props.companyId))
    } else {

      if (role === 'AGENCY' || role === 'ALL')
        dispatch(getPartners())
      else if (role === 'VIEW')
        dispatch(getFeeApproveDetail(formik, props.data, props.companyId))
      else
        dispatch(getFeeMotor(props.role, props.companyId))
    }
    if (role !== 'VIEW')
      formik.setFieldValue('applyDate', moment(new Date()).add(0, 'd').format(Utils.DATE_FORMAT))
  }, [props.companyId, props.userId, props.role, props.data])

  useEffect(() => {
    if (userPartnerSelect) {
      handleSearch()
    }
  }, [userPartnerSelect])

  function reset() {
    dispatch({
      type: 'ACTION_RESET_FEE',
      payload: ''
    })
  }

  function handleSearch() {
    reset()
    if (userPartnerSelect == null || userPartnerSelect == '') {
      return
    }
    dispatch(getFeeMotorPartner(formik, role, userPartnerSelect, props.companyId))
  }

  const handleBtn = () => {
    let list = []
    let updateFeeInfo = []
    if (typeof (feeInsuranceReducer.feeCar.motorTndsFees) === 'undefined') {
      BaseAppUltils.toastError(<FormattedMessage id={`${AppId.INSURANCE_APP}.NoInfoUpdateFee`} />)
      return
    }

    feeInsuranceReducer.feeCar.motorTndsFees.map((item, j) => {
      if (Utils.floatFomat(item.fee) === '')
        item.fee = 0
      if (Number.parseFloat(item.oldFee) !== Number.parseFloat(Utils.floatFomat(item.fee))) {
        let fee = {
          name: item.name,
          feeCode: item.feeCode,
          oldFee: Number.parseFloat(item.oldFee),
          fee: Utils.floatFomat(item.fee)
        }
        list = [...list, fee]
      }
    })
    if (list.length > 0)
      updateFeeInfo = [...list]
    setLisFeeTNDSChange(list)

    list = []
    feeInsuranceReducer.feeCar.motorTndsOptFees.map((item, j) => {
      if (Utils.floatFomat(item.fee) === '')
        item.fee = 0
      if (Number.parseFloat(item.oldFee) !== Number.parseFloat(Utils.floatFomat(item.fee))) {
        let fee = {
          name: item.name,
          feeCode: item.feeCode,
          oldFee: Number.parseFloat(item.oldFee),
          fee: Utils.floatFomat(item.fee)
        }
        list = [...list, fee]
      }
    })
    if (list.length > 0)
      updateFeeInfo = [...updateFeeInfo, ...list]
    setLisFeeCNChange(list)

    setListUpdateFeeInfo(updateFeeInfo)
    if (updateFeeInfo.length > 0)
      setModal(!modal)
    else
      BaseAppUltils.toastError(<FormattedMessage id={`${AppId.INSURANCE_APP}.NoInfoUpdateFee`} />)
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const updateFee = async () => {
    const feeInfo = JSON.stringify({
      list: updateFeeInfo,
      applyDate: formik.values['applyDate'] + 'T00:00:00Z',
      user: userPartnerSelect
    })
    const res = await FeeInsuranceServ.updateFeeMotor(role, feeInfo)
    if (res.status === 200) {
      toggleModal()
      toggleModal()
      if (res.data.errorCode === '000')
        setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeeSuccess`} />)
      else if (res.data.errorCode === '001')
        setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeePending`} />)
      else if (res.data.errorCode === '003')
        setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeeFail`} />)
      setModalResult(true)

    } else {
      toggleModal()
      setMessageResult(`${AppId.INSURANCE_APP}.UpdateFeeSuccess`)
      setModalResult(true)
    }


  }

  const toggleModalResult = () => {
    setModalResult(false)
    Utils.goBackHome()
  }

  const showAlertResult = (titleId, contentId, isHaveClose) => {
    return (
      <Modal
        isOpen={modalResult}
        className='modal-dialog-centered'
      >
        <ModalHeader toggle={isHaveClose ? toggleModalResult : false}>
          <FormattedMessage id={titleId} />
        </ModalHeader>
        <ModalBody>
          {contentId}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggleModalResult}>
            <FormattedMessage id={`${AppId.INSURANCE_APP}.ButtonOK`} />
          </Button>{' '}
        </ModalFooter>
      </Modal>
    )
  }

  return (
    <>
      <>
        {(role === 'AGENCY' || role === 'ALL') && userId === '' ?
          <Row>
            <Col md='6' sm='12'>
              <SelectMutilForm
                formik={formik} fieldName='namePartner' msgField={`${AppId.INSURANCE_APP}.Partner`}
                options={partners} addClass='custom-zindex8' isMulti={true}
                value={partnerSelect}
                onChange={value => {
                  if (value !== null && value.length > 0) {
                    if (value.length === 1) {
                      setUserPartnerSelect(value[0].id)
                      setPartnerSelect(value)
                      dispatch({
                        type: 'ACTION_RESET_FEE',
                        payload: ''
                      })
                      return
                    }
                    setPartnerSelect(value)
                    dispatch({
                      type: 'ACTION_RESET_FEE',
                      payload: ''
                    })
                  } else {
                    setPartnerSelect([])
                    setUserPartnerSelect('')
                    setUserPartnerSelect('')
                    dispatch({
                      type: 'ACTION_RESET_FEE',
                      payload: ''
                    })
                    setPartnerSelect([])
                  }
                }}
              />
            </Col>
          </Row>
          : null}

        <>
          {
            (role === 'AGENCY' || role === 'ALL') && partnerSelect.length > 0 ?
              <Row>
                <PartnerSelectedTable
                  dispatch={dispatch}
                  partnerSelect={partnerSelect}
                  userPartnerSelect={userPartnerSelect}
                  setUserPartnerSelect={setUserPartnerSelect}
                />
              </Row>
              : null
          }
        </>
      </>

      <Card>
        <FeeMotorTNDSManageView role={role} editable={editable} />
      </Card>
      <Card>
        <FeeMotorCNManageView role={role} editable={editable} />
      </Card>

      <Row>
        <Col sm='12'>
        </Col>
        <Col sm='12'>
          <DatePicker
            className='form-control bg-white mt-2'
            placeholder='Ngày hiệu lực'
            value={formik.values['applyDate']}
            options={{ minDate: moment(new Date()).add(0, 'd').format(Utils.DATE_FORMAT), disableMobile: true }}
            onChange={(date) => {
              let convertDate = moment(date[0]).format(Utils.DATE_FORMAT)
              formik.setFieldValue('applyDate', convertDate)
            }}
            disabled={role === 'VIEW' ? true : false}
          />
        </Col>
      </Row>

      <div className='d-flex justify-content-end margin-bottom-100 margin-bottom-14'>
        <Button.Ripple className='mr-1 mb-1 round bg-gradient-nophi btn-custom' color='none' onClick={() => {
          if (role === 'ALL')
            history.push('/insurance/insurance-fee/all')
          else if (role === 'SYSTEM')
            history.push('/insurance/insurance-fee/system')
          else if (role === 'NONRESIDENT')
            history.push('/insurance/insurance-fee/lx-partner')
          else if (role == 'INDIVIDUAL') {
            history.push('/insurance/insurance-fee/personal')
          } else if (role == 'AGENCY') {
            history.push('/insurance/insurance-fee/partner')
          } else if (role == 'VIEW') {
            history.push('/insurance/insurance-fee/approval')
          }
        }}>
          <FormattedMessage id={`${AppId.INSURANCE_APP}.Previous`} />
        </Button.Ripple>
        {editable || role === 'AGENCY' || role === 'NONRESIDENT' || role === 'ALL' ?
          <Button.Ripple className='mr-1 mb-1 round custom-bg-gradient-primary btn-custom' color='none'
            onClick={() => handleBtn()}>
            <FormattedMessage id={`${AppId.INSURANCE_APP}.SaveFee`} />
          </Button.Ripple>
          : null}

        {
          role === 'INDIVIDUAL' ?
            <Button.Ripple className='mr-1 mb-1 round bg-gradient-nophi btn-custom' color='none' onClick={() => {
              Utils.goBackHome()
            }
            }>
              <FormattedMessage id={`${AppId.INSURANCE_APP}.HomePage`} />
            </Button.Ripple>
            : null
        }
      </div>

      <div>
        <Modal
          isOpen={modal}
          className='modal-dialog-centered'
        >
          <ModalHeader>
            <FormattedMessage id={`${AppId.INSURANCE_APP}.NoticeTitle`} />
          </ModalHeader>
          <ModalBody>
            <FormattedMessage id={`${AppId.INSURANCE_APP}.SaveFeeContent`} />

            {listFeeTNDSChange.length > 0 ?
              <React.Fragment>
                <br />
                <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeBHBBTNDSCCXMTXM`} />
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.Fee`} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFeeTNDSChange.map((item, i) => (
                        <tr key={i}>
                          < td> {item.name}</td>
                          <td>
                            <del className='text-danger text-bold-600'>{Utils.formatCurrency(item.oldFee)}</del>
                            <label>{ }</label> <label className='text-bold-600'>{Utils.formatCurrency(item.fee)}</label>
                          </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </Table>
              </React.Fragment>
              : null}

            {listFeeCNChange.length > 0 ?
              <React.Fragment>
                <br />
                <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeBHTNNNTXMTXM`} />
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAddResponsibility`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.Fee`} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFeeCNChange.map((item, i) => (
                        <tr key={i}>
                          <td>{item.name}</td>
                          <td>
                            <del className='text-danger text-bold-600'>{Utils.formatCurrency(item.oldFee)}</del>
                            <label>{ }</label> <label className='text-bold-600'>{Utils.formatCurrency(item.fee)}</label>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>

              </React.Fragment>
              : null}
            <Row>
              <Col sm='6' sm='12'>
                <label><FormattedMessage id={`${AppId.INSURANCE_APP}.EffDate`} /></label>
              </Col>
              <Col sm='6' sm='12'>
                <label>{formik.values['applyDate']}</label>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => toggleModal()}>
              <FormattedMessage id={`${AppId.INSURANCE_APP}.ConfirmCancel`} />
            </Button>{' '}
            <Button color='primary' onClick={() => updateFee()}>
              <FormattedMessage id={`${AppId.INSURANCE_APP}.Continue`} />
            </Button>{' '}
          </ModalFooter>
        </Modal>

        {showAlertResult(`${AppId.INSURANCE_APP}.NoticeAlertTitle`, messageResult, false)}

      </div>
    </>
  )

}
export default FeeMotorManageBSHView
