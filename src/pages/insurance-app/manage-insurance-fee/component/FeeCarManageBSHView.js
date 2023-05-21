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
  CustomInput
} from 'reactstrap'
import {
  FormattedMessage,
  DatePicker,
  AppId,
  BaseAppUltils,
  useDeviceDetect
} from 'base-app'
import { useDispatch, useSelector } from 'react-redux'
import FeeCarTNDSManageView from './FeeCarTNDSManageView'
import FeeCarTNDSTNManageView from './FeeCarTNDSTNManageView'
import FeeCarVCManageView from './FeeCarVCManageView'
import FeeCarDKBSManageView from './FeeCarDKBSManageView'
import FeeCarCNManageView from './FeeCarCNManageView'
import FeeCarHHManageView from './FeeCarHHManageView'
import FeeInsuranceServ from '../../../../services/insurance-app/feeManageInsurance'
import {
  getFee,
  getFeePartner,
  getFeeApproveDetail
} from '../../../../redux/actions/insurance-app/feeInsuManage'
import { useFormik } from 'formik'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import moment from 'moment'
import { history } from '../../../../history'
import SelectMutilForm from '../../../../components/insurance-app/buy-insurance-car/form/SelectMutilForm'
import { convertStrToNumber } from '../../../../ultity/index'
import PartnerSelectedTable from './PartnerSelectedTable'
import { KEY_PARTNERS } from '../../../../redux/reducers/insurance-app/appConfig'
import { NAME_APP_CONFIG } from '../../../../configs/insurance-app'
import { getPartners } from '../../../../redux/actions/insurance-app/appConfig'

const FeeCarManageBSHView = (props) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [role, setRole] = useState(props.role)
  const [editable, setEditable] = useState(props.editable)
  const { isMobile } = useDeviceDetect()
  const { [KEY_PARTNERS]: partners } = useSelector(state => state.app[NAME_APP_CONFIG])
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  
  const [listFeeTNDSChange, setLisFeeTNDSChange] = useState([])
  const [listFeeTNDSTNChange, setLisFeeTNDSTNChange] = useState([])
  const [listFeeVCChange, setLisFeeVCChange] = useState([])
  const [listFeeDKBSChange, setLisFeeDKBSChange] = useState([])
  const [listFeeCNChange, setLisFeeCNChange] = useState([])
  const [listFeeHHChange, setLisFeeHHChange] = useState([])

  const [infoDKBSChange, setInfoDKBSChange] = useState(false)
  const [modalResult, setModalResult] = useState(false)
  const [messageResult, setMessageResult] = useState('')

  const [updateFeeInfo, setListUpdateFeeInfo] = useState([])
  const [partnerSelect, setPartnerSelect] = useState([])
  const [userPartnerSelect, setUserPartnerSelect] = useState(null)
  const [userId, setUserId] = useState(props.userId)

  const reset = () => {
    setLisFeeTNDSChange([])
    setLisFeeTNDSTNChange([])
    setLisFeeVCChange([])
    setLisFeeDKBSChange([])
    setLisFeeCNChange([])
    setLisFeeHHChange([])
    setInfoDKBSChange([])
    setListUpdateFeeInfo([])
    setPartnerSelect([])
    setUserPartnerSelect('')
  }

  useEffect(() => {
    resetSearch()
    reset()
    if (props.userId !== '') {
      setUserPartnerSelect(props.userId)
      dispatch(getFeePartner(formik, role, props.userId, props.companyId))
    } else {
      if (role === 'AGENCY' || role === 'ALL') {
        dispatch(getPartners())
      } else if (role === 'VIEW') {
        dispatch(getFeeApproveDetail(formik, props.data, props.companyId))
      } else {
        dispatch(getFee(formik, props.role, props.companyId))
      }
    }
    if (role !== 'VIEW')
      formik.setFieldValue('applyDate', moment(new Date()).add(0, 'd').format(Utils.DATE_FORMAT))
  }, [props.userId, props.companyId])

  useEffect(() => {
    if (userPartnerSelect) {
      handleSearch()
    }
  }, [userPartnerSelect])


  const formik = useFormik({
    initialValues: {
      applyDate: ''
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: values => {

    }
  })

  function resetSearch() {
    dispatch({
      type: 'ACTION_RESET_FEE',
      payload: ''
    })
  }

  function handleSearch() {
    resetSearch()
    if (userPartnerSelect == null || userPartnerSelect == '') {
      return
    }
    dispatch(getFeePartner(formik, role, userPartnerSelect, props.companyId))
  }

  const handleBtn = () => {
    let list = []
    let updateFeeInfo = []  // [...listFeeTNDSChange, ...listFeeTNDSTNChange, ...listFeeDKBSChange, ...listFeeCNChange, ...listFeeVCChange, ...listFeeHHChange]
    if (typeof (feeInsuranceReducer.feeCar.carTndsFees) === 'undefined') {
      BaseAppUltils.toastError(<FormattedMessage id={`${AppId.INSURANCE_APP}.NoInfoUpdateFee`} />)
      return
    }

    let tempMerge = { ...feeInsuranceReducer.feeCar, ...feeInsuranceReducer.feeOldCar }

    dispatch({
      type: 'ACTION_FEE_SET_UPDATE',
      payload: tempMerge
    })

    tempMerge.carTndsFees.map((item, j) => {

      item.list.map((iFee, t) => {
        if (Utils.floatFomat(iFee.fee) === '')
          iFee.fee = 0
        if (Number.parseFloat(iFee.oldFee) !== Number.parseFloat(Utils.floatFomat(iFee.fee))) {

          let fee = {
            name: iFee.name,
            feeCode: iFee.feeCode,
            oldFee: Number.parseFloat(iFee.oldFee),
            fee: Utils.floatFomat(iFee.fee)
          }
          list = [...list, fee]
          // iFee.fee = Utils.formatCurrency(iFee.fee)
        }
      })
    })
    if (list.length > 0)
      updateFeeInfo = [...list]
    setLisFeeTNDSChange(list)

    list = []
    let listFeeTNChange = []
    tempMerge.carTndsOptFees.map((item, j) => {

      item.list.map((iFee, t) => {

        if (Utils.floatFomat(iFee.humanFee.fee) === '')
          iFee.humanFee.fee = 0

        if (Utils.floatFomat(iFee.assetsFee.fee) === '')
          iFee.assetsFee.fee = 0

        if (Utils.floatFomat(iFee.passengerFee.fee) === '')
          iFee.passengerFee.fee = 0
        if (Number.parseFloat(iFee.humanFee.oldFee) !== Number.parseFloat(iFee.humanFee.fee)
          || Number.parseFloat(iFee.assetsFee.oldFee) !== Number.parseFloat(iFee.assetsFee.fee)
          || Number.parseFloat(iFee.passengerFee.oldFee) !== Number.parseFloat(iFee.passengerFee.fee)) {
          // iFee.name = item.vehicleType + " " + iFee.name

          let humanFee = { oldFee: Number.parseFloat(iFee.humanFee.oldFee), fee: Number.parseFloat(iFee.humanFee.fee) }

          let assetsFee = {
            oldFee: Number.parseFloat(iFee.assetsFee.oldFee),
            fee: Number.parseFloat(iFee.assetsFee.fee)
          }

          let passengerFee = {
            oldFee: Number.parseFloat(iFee.passengerFee.oldFee),
            fee: Number.parseFloat(iFee.passengerFee.fee)
          }
          let fee = {
            name: item.vehicleType + ' ' + iFee.name,
            humanFee: humanFee,
            assetsFee: assetsFee,
            passengerFee: passengerFee
          }
          listFeeTNChange = [...listFeeTNChange, fee]
        }

        if (Number.parseFloat(iFee.humanFee.oldFee) !== Number.parseFloat(iFee.humanFee.fee)) {
          list = [...list, iFee.humanFee]
        }
        if (Number.parseFloat(iFee.assetsFee.oldFee) !== Number.parseFloat(iFee.assetsFee.fee)) {
          list = [...list, iFee.assetsFee]
        }
        if (Number.parseFloat(iFee.passengerFee.oldFee) !== Number.parseFloat(iFee.passengerFee.fee)) {
          list = [...list, iFee.passengerFee]
        }
      })
    })
    console.log(list)
    if (list.length > 0)
      updateFeeInfo = [...updateFeeInfo, ...list]
    setLisFeeTNDSTNChange(listFeeTNChange)

    list = []
    tempMerge.carFees.map((item, j) => {

      item.list.map((iFee, t) => {
        if (Utils.floatFomat(iFee.fee) === '')
          iFee.fee = 0
        if (Number.parseFloat(iFee.oldFee) !== Number.parseFloat(Utils.floatFomat(iFee.fee))) {
          let fee = {
            name: iFee.name,
            feeCode: iFee.feeCode,
            carWorth: iFee.carWorth,
            usageTime: iFee.usageTime,
            oldFee: iFee.oldFee,
            fee: Utils.floatFomat(iFee.fee)
          }
          list = [...list, fee]
          // iFee.fee = Utils.formatCurrency(iFee.fee)
        }
      })
    })
    // feeInsuranceReducer.feeCar.carFees.map((item, j) => {
    //     if (Number.parseFloat(item.oldFee) !== Number.parseFloat(item.fee)) {
    //         list = [...list, item]
    //     }
    // })
    if (list.length > 0)
      updateFeeInfo = [...updateFeeInfo, ...list]
    setLisFeeVCChange(list)

    list = []
    tempMerge.carFeeAddons.map((item, j) => {

      if (Utils.floatFomat(item.fee) === '')
        item.fee = 0
      if (Number.parseFloat(item.oldFee) !== Number.parseFloat(item.fee)) {
        let fee = {
          name: item.name,
          feeCode: item.feeCode,
          usageTime: item.usageTime,
          oldFee: item.oldFee,
          fee: Utils.floatFomat(item.fee)
        }
        list = [...list, fee]
      }
    })
    if (list.length > 0)
      updateFeeInfo = [...updateFeeInfo, ...list]
    setLisFeeDKBSChange(list)

    list = []
    tempMerge.carLpxNntxFees.map((item, j) => {
      if (Utils.floatFomat(item.fee) === '')
        item.fee = 0
      if (Number.parseFloat(item.oldFee) !== Number.parseFloat(item.fee)) {
        let fee = { name: item.name, feeCode: item.feeCode, oldFee: item.oldFee, fee: Utils.floatFomat(item.fee) }
        list = [...list, fee]
      }
    })
    if (list.length > 0)
      updateFeeInfo = [...updateFeeInfo, ...list]
    setLisFeeCNChange(list)

    list = []
    tempMerge.carGoodsFees.map((item, j) => {
      if (Utils.floatFomat(item.fee) === '')
        item.fee = 0
      if (Number.parseFloat(item.oldFee) !== Number.parseFloat(item.fee)) {
        let fee = { name: item.name, feeCode: item.feeCode, oldFee: item.oldFee, fee: Utils.floatFomat(item.fee) }
        list = [...list, fee]
      }
    })
    if (list.length > 0)
      updateFeeInfo = [...updateFeeInfo, ...list]
    setLisFeeHHChange(list)

    let infoDKBSChange = false
    setInfoDKBSChange(false)
    if (role === 'SYSTEM') {
      if (Utils.floatFomat(formik.values['deductionLevel']) === '')
        formik.setFieldValue('deductionLevel', 0)
      if (Number.parseFloat(tempMerge.oldDeductionLevel) !== Number.parseFloat(formik.values['deductionLevel'])) {
        setInfoDKBSChange(true)
        infoDKBSChange = true
      }
      if (Utils.floatFomat(formik.values['baseFeeIncreaseMin']) === '')
        formik.setFieldValue('baseFeeIncreaseMin', 0)
      if (Number.parseFloat(tempMerge.oldBaseFeeIncreaseMin) !== Number.parseFloat(formik.values['baseFeeIncreaseMin'])) {
        setInfoDKBSChange(true)
        infoDKBSChange = true
      }
      if (Utils.floatFomat(formik.values['baseFeeIncreaseMax']) === '')
        formik.setFieldValue('baseFeeIncreaseMax', 0)
      if (Number.parseFloat(tempMerge.oldBaseFeeIncreaseMax) !== Number.parseFloat(formik.values['baseFeeIncreaseMax'])) {
        setInfoDKBSChange(true)
        infoDKBSChange = true
      }
      if (Utils.floatFomat(formik.values['minimumFee']) === '')
        formik.setFieldValue('minimumFee', 0)
      if (Number.parseFloat(tempMerge.oldMinimumFee) !== Number.parseFloat(formik.values['minimumFee'])) {
        setInfoDKBSChange(true)
        infoDKBSChange = true
      }
      if (tempMerge.oldDebtFile !== formik.values['debtFile']) {
        setInfoDKBSChange(true)
        infoDKBSChange = true
      }
    }
    setListUpdateFeeInfo(updateFeeInfo)
    if (updateFeeInfo.length > 0 || infoDKBSChange)
      setModal(!modal)
    else
      BaseAppUltils.toastError(<FormattedMessage id={`${AppId.INSURANCE_APP}.NoInfoUpdateFee`} />)
  }

  const toggleBack = () => {
    setModal(!modal)
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const updateFee = async () => {

    const feeInfo = JSON.stringify({
      list: updateFeeInfo,
      deductionLevel: convertStrToNumber(formik.values['deductionLevel']),
      baseFeeIncreaseMin: formik.values['baseFeeIncreaseMin'],
      baseFeeIncreaseMax: formik.values['baseFeeIncreaseMax'],
      minimumFee: convertStrToNumber(formik.values['minimumFee']),
      debtFile: formik.values['debtFile'],
      applyDate: formik.values['applyDate'] + 'T00:00:00Z',
      user: userPartnerSelect
    })
    const res = await FeeInsuranceServ.updateFeeCar(role === 'ALL' ? 'AGENCY' : role, feeInfo, props.companyId)
    if (res.status === 200) {
      toggleModal()
      if (res.data.errorCode === '000')
        setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeeSuccess`} />)
      else if (res.data.errorCode === '001')
        setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeePending`} />)
      else if (res.data.errorCode === '003')
        setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeeFail`} />)
      // setMessageResult(res.data.message)
      setModalResult(true)

    } else {
      // toggleModal()
      // setMessageResult(`${AppId.INSURANCE_APP}.UpdateFeeSuccess`)
      // setModalResult(true)
    }


  }

  const toggleModalResult = () => {
    setModalResult(false)
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
          {/* <FormattedMessage id={contentId} /> */}
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
              <SelectMutilForm formik={formik} fieldName='namePartner' msgField={`${AppId.INSURANCE_APP}.Partner`}
                options={partners || []} addClass='custom-zindex8' isMulti={true}
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
        <FeeCarTNDSManageView role={role} editable={editable} />
      </Card>

      <Card>
        <FeeCarTNDSTNManageView role={role} editable={editable} />
      </Card>

      <Card>
        <FeeCarVCManageView role={role} editable={editable} />
      </Card>

      <Card>
        <FeeCarDKBSManageView formik={formik} role={role} editable={editable} />
      </Card>

      <Card>
        <FeeCarCNManageView role={role} editable={editable} />
      </Card>

      <Card>
        <FeeCarHHManageView role={role} editable={editable} />

      </Card>

      <Row>
        <Col sm='12'>
          {/* <label>Ngày hiệu lực</label> */}
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
      {/* </Card> */}
      <div className='d-flex justify-content-end margin-bottom-14'>
        <Button.Ripple className='mr-1 mb-1 round bg-gradient-nophi btn-custom' color='none' onClick={() => {
          if (role === 'ALL')
            history.push('/insurance-fee/all')
          else if (role === 'SYSTEM')
            history.push('/insurance-fee/system')
          else if (role === 'NONRESIDENT')
            history.push('/insurance-fee/lx-partner')
          else if (role == 'INDIVIDUAL') {
            history.push('/insurance-fee/personal')
          } else if (role == 'AGENCY') {
            history.push('/insurance-fee/partner')
          } else if (role == 'VIEW') {
            history.push('/insurance-fee/approval')
          }
        }
        }>
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
          style={!isMobile ? { maxWidth: '60%', width: '60%' } : { maxWidth: '90%', width: '90%' }}
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
                <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsBBTNDSCar`} />
                <Table bordered responsive>
                  <thead>
                    <tr>

                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} />
                      </th>
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

            {listFeeTNDSTNChange.length > 0 ?
              <React.Fragment>
                <br />
                <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsBBTNDSTNCar`} />
                <Table bordered responsive>
                  <thead>
                    <tr>

                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutMan`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutAsset`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutPassenger`} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFeeTNDSTNChange.map((item, i) => (
                        //  let fee = { name: item.vehicleType + " " + iFee.name, humanFee: humanFee, assetsFee: assetsFee, passengerFee: passengerFee }

                        <tr key={i}>
                          < td> {item.name}</td>
                          <td>{item.humanFee.fee !== item.humanFee.oldFee ?
                            <td>
                              <del className='text-danger text-bold-600'>{item.humanFee.oldFee}</del>
                              <label>{ }</label> <label className='text-bold-600'>{item.humanFee.fee}</label></td>
                            : item.humanFee.oldFee
                          }</td>
                          <td>{item.assetsFee.fee !== item.assetsFee.oldFee ?
                            <td>
                              <del className='text-danger text-bold-600'>{item.assetsFee.oldFee}</del>
                              <label>{ }</label> <label className='text-bold-600'>{item.assetsFee.fee}</label></td>
                            : item.assetsFee.oldFee
                          }</td>
                          <td>{item.passengerFee.fee !== item.passengerFee.oldFee ?
                            <td>
                              <del className='text-danger text-bold-600'>{item.passengerFee.oldFee}</del>
                              <label>{ }</label> <label className='text-bold-600'>{item.passengerFee.fee}</label></td>
                            : item.passengerFee.oldFee
                          }</td>
                        </tr>

                      ))
                    }

                  </tbody>
                </Table>

              </React.Fragment>
              : null}

            {listFeeVCChange.length > 0 ?
              <React.Fragment>
                <br />
                <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsMaterialCar`} />
                <Table bordered responsive>
                  <thead>
                    <tr>

                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.VehicleValue`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.UseYear`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeRate`} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFeeVCChange.map((item, i) => (

                        <tr key={i}>
                          < td> {item.name}</td>
                          <td>{item.carWorth}</td>
                          <td>{item.usageTime}</td>
                          <td>
                            <del className='text-danger text-bold-600'>{item.oldFee}</del>
                            <label>{ }</label> <label className='text-bold-600'>{item.fee}</label></td>
                        </tr>

                      ))
                    }

                  </tbody>
                </Table>

              </React.Fragment>
              : null}

            {listFeeDKBSChange.length > 0 || infoDKBSChange ? <React.Fragment>
              <br />
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeDKBS`} />
            </React.Fragment> : null}
            {listFeeDKBSChange.length > 0 ?
              <React.Fragment>
                <Table bordered responsive>
                  <thead>
                    <tr>

                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.DKBSType`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.UseTime`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeRate`} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFeeDKBSChange.map((item, i) => (

                        <tr key={i}>
                          <td>{item.name}</td>
                          <td>{item.usageTime}</td>
                          <td>
                            <del className='text-danger text-bold-600'>{item.oldFee}</del>
                            <label>{ }</label> <label className='text-bold-600'>{item.fee}</label></td>
                        </tr>

                      ))
                    }

                  </tbody>
                </Table>

              </React.Fragment>
              : null}

            {
              role === 'SYSTEM' && Number.parseFloat(feeInsuranceReducer.feeCar.oldDeductionLevel) !== Number.parseFloat(formik.values['deductionLevel']) ?
                <Row>
                  <Col md='6' sm='12' className='margin-top-14'>
                    <label><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.Recoup`} /></label>
                  </Col>
                  <Col md='6' sm='12' className='margin-top-14'>
                    {/* <Input value={formik.values["deductionLevel"]} /> */}
                    <td>
                      <del
                        className='text-danger text-bold-600'>{Utils.formatCurrency(feeInsuranceReducer.feeCar.oldDeductionLevel)}</del>
                      <label>{ }</label> <label className='text-bold-600'>{formik.values['deductionLevel']}</label></td>

                  </Col>
                </Row>
                : null
            }


            {
              role === 'SYSTEM' && (Number.parseFloat(feeInsuranceReducer.feeCar.oldBaseFeeIncreaseMin) !== Number.parseFloat(formik.values['baseFeeIncreaseMin'])
                || Number.parseFloat(feeInsuranceReducer.feeCar.oldBaseFeeIncreaseMax) !== Number.parseFloat(formik.values['baseFeeIncreaseMax'])) ?
                <Row>

                  <Col md='6' sm='12' className='margin-top-14'>
                    <label><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.RecoupInc`} /></label>
                  </Col>
                  <Col md='6' sm='12' className='margin-top-14'>
                    <Table className='custom-padding-table margin-bottom-14' responsive>
                      <tbody>
                        <tr>
                          <td className='text-primary-highlight letter-uppercase'><FormattedMessage
                            id={`${AppId.INSURANCE_APP}.Minimum`} /></td>
                          {/* <td align="left"><Input value={formik.values["baseFeeIncreaseMin"]} /> </td> */}
                          <td>
                            <del
                              className='text-danger text-bold-600'>{feeInsuranceReducer.feeCar.oldBaseFeeIncreaseMin}</del>
                            <label>{ }</label> <label
                              className='text-bold-600'>{formik.values['baseFeeIncreaseMin']}</label></td>
                        </tr>
                        <tr>

                          <td className='text-primary-highlight letter-uppercase'>
                            <FormattedMessage id={`${AppId.INSURANCE_APP}.Maximum`} />
                          </td>
                          <td align='left'>
                            {/* <Input value={formik.values["baseFeeIncreaseMax"]} /> */}
                            <td>
                              <del
                                className='text-danger text-bold-600'>{feeInsuranceReducer.feeCar.oldBaseFeeIncreaseMax}</del>
                              <label>{ }</label> <label
                                className='text-bold-600'>{formik.values['baseFeeIncreaseMax']}</label></td>
                          </td>
                        </tr>

                      </tbody>
                    </Table>
                  </Col>
                </Row>
                : null
            }

            {
              role === 'SYSTEM' && Number.parseFloat(feeInsuranceReducer.feeCar.oldMinimumFee) !== Number.parseFloat(formik.values['minimumFee']) ?

                <Row>

                  <Col md='6' sm='12' className='margin-top-14'>
                    <label> <FormattedMessage id={`${AppId.INSURANCE_APP}.MinimumFee`} /></label>
                  </Col>
                  <Col md='6' sm='12' className='margin-top-14'>
                    {/* <Input value={formik.values["minimumFee"]} /> */}
                    <td>
                      <del
                        className='text-danger text-bold-600'>{Utils.formatCurrency(feeInsuranceReducer.feeCar.oldMinimumFee)}</del>
                      <label>{ }</label> <label className='text-bold-600'>{formik.values['minimumFee']}</label></td>
                  </Col>
                </Row>
                : null
            }

            {
              feeInsuranceReducer.feeCar.oldDebtFile !== formik.values['debtFile'] ?
                <Row>
                  <Col md='6' sm='12' className='margin-top-14'>
                    <label><FormattedMessage id={`${AppId.INSURANCE_APP}.DebtFile`} /></label>
                  </Col>
                  <Col md='6' sm='12' className='margin-top-14'>
                    <CustomInput
                      checked={formik.values['debtFile']}
                      id='debtFile'
                      className='custom-switch-primary'
                      type='switch'
                      name='success'
                      inline
                    ></CustomInput>
                  </Col>
                </Row>
                : null
            }


            {listFeeCNChange.length > 0 ?
              <React.Fragment>
                <br />
                <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsBHTNLPXNTX`} />
                <Table bordered responsive>
                  <thead>
                    <tr>

                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAmountInsurance`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeRate`} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFeeCNChange.map((item, i) => (

                        <tr key={i}>
                          <td>{item.name}</td>
                          <td>
                            <del className='text-danger text-bold-600'>{item.oldFee}</del>
                            <label>{ }</label> <label className='text-bold-600'>{item.fee}</label></td>
                        </tr>

                      ))
                    }

                  </tbody>
                </Table>

              </React.Fragment>
              : null}

            {listFeeHHChange.length > 0 ?
              <React.Fragment>
                <br />
                <FormattedMessage id={`${AppId.INSURANCE_APP}.InsCommodity`} />
                <Table bordered responsive>
                  <thead>
                    <tr>

                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAddResponsibility`} /></th>
                      <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeRate`} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFeeHHChange.map((item, i) => (

                        <tr key={i}>
                          <td>{item.name}</td>
                          <td>
                            <del className='text-danger text-bold-600'>{item.oldFee}</del>
                            <label>{ }</label> <label className='text-bold-600'>{item.fee}</label></td>
                        </tr>

                      ))
                    }

                  </tbody>
                </Table>

              </React.Fragment>
              : null}
            <Row>
              <Col sm='6' xs='12'>
                <label><FormattedMessage id={`${AppId.INSURANCE_APP}.EffDate`} /></label>
              </Col>
              <Col sm='6' xs='12'>
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
export default FeeCarManageBSHView
