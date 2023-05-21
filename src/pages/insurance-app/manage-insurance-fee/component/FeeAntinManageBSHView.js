import {
  AppId,
  BaseAppUltils, BaseFormGroupSelect, FormattedMessage, HttpClient, Select, useDeviceDetect
} from 'base-app'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, Card, Col, CustomInput, FormGroup, Modal, ModalBody,
  ModalFooter, ModalHeader, Row, Table
} from 'reactstrap'
import { getKeyLang, NAME_APP_CONFIG } from '../../../../configs/insurance-app'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import { history } from '../../../../history'
import { getPartners } from '../../../../redux/actions/insurance-app/appConfig'
import {
  getFee, getFeeApproveDetail, getFeePartner
} from '../../../../redux/actions/insurance-app/feeInsuManage'
import { KEY_PARTNERS } from '../../../../redux/reducers/insurance-app/appConfig'
import FeeInsuranceServ from '../../../../services/insurance-app/feeManageInsurance'
import { convertStrToNumber, isArrayEmpty, isObjEmpty } from '../../../../ultity/index'
import FeeAntinInsManageView from './FeeAntinIManageView'
import PartnerSelectedTable from './PartnerSelectedTable'

const FeeAntinManageBSHView = (props) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [role, setRole] = useState(props.role)
  const [editable, setEditable] = useState(props.editable)
  const { isMobile } = useDeviceDetect()
  const { [KEY_PARTNERS]: partners } = useSelector(state => state.app[NAME_APP_CONFIG])
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const intl = useIntl()
  const [feeRate, setFeeRate] = useState([])
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

  const [valueInsurance, setValueInsurance] = useState(0)  
  const [lastValueInsurance, setlastValueInsurance] = useState(valueInsurance)  
  const [partnerSelected, setPartnerSelected] = useState({})

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


  const onSelectPartner = async (id) => {
    setPartnerSelected(id)
    const res = await HttpClient.post('/nth/personalinsurance/api/fee-rate-cs-parent-id' , [id])
    if (res.status === 200 && res.data.length > 0) {
      setFeeRate(res.data[0])
      setValueInsurance(Number(res.data[0].value*100)) 
      setlastValueInsurance(Number(res.data[0].value*100))
    }
  }
  useEffect(() => {
    const getMyFeeManager = async () => {
      const res = await HttpClient.get('/nth/personalinsurance/api/authenticate/get-my-fee-rate')
      if (res.status === 200 && res.data) {
        setFeeRate(res.data)
        setValueInsurance(res.data.value)
      }
    }
    resetSearch()
    reset()
    if (props.userId !== '') {
      setUserPartnerSelect(props.userId)
      dispatch(getFeePartner(formik, role, props.userId, props.companyId))
    } else {
      if (role === 'AGENCY' || role === 'ALL') {
        dispatch(getPartners())
        setPartnerSelected(partners[0].id)
        onSelectPartner(partners[0].id)
      } else if (role === 'VIEW') {
        // dispatch(getFeeApproveDetail(formik, props.data, props.companyId))

      } else {
        // dispatch(getFee(formik, props.role, props.companyId))
        getMyFeeManager()
        
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

  const handleBtn = async () => {
    if (lastValueInsurance === valueInsurance) {
      BaseAppUltils.toastError("Vui lòng cập nhật tỉ lệ phí !")
      return
    }else{
      const newData = [feeRate]
      newData[0].value = String(valueInsurance/100)
      const res = await HttpClient.post('/nth/personalinsurance/api/fee-rate-cs' , newData[0])
      if (res.status === 200) {
        BaseAppUltils.toastSuccess("Cập nhật tỉ lệ phí thành công !")
        setlastValueInsurance(Number(valueInsurance*100))
      }
    }
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
        {(role === 'AGENCY' || role === 'ALL') ?
          <Row>
            <Col md='12' sm='12' className='mt-2'>
            <Select options={partners} value={partners.find(_elt => _elt.id === partnerSelected) || partners[0]}  classNamePrefix='select mt-2'
              className="custom-zindex9" placeholder={intl.formatMessage({ id: getKeyLang(`Partner`) })} onChange={(e) => onSelectPartner(e.value)} />
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
      {
        isObjEmpty(feeRate) ? null :  <Card>
        <FeeAntinInsManageView role={role} editable={editable} feeRate={feeRate} valueInsurance={valueInsurance} setValueInsurance={setValueInsurance} isEdit={role === 'AGENCY' || role === 'ALL' ? true :false} />
      </Card>
      }
     
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
export default FeeAntinManageBSHView
