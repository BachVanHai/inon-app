import {
  Button,
  Checkbox,
  FormattedMessage,
  Select
} from 'base-app'
import { FormikProvider, isNaN, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Card, CardBody, Col, Row } from 'reactstrap'
import styled from 'styled-components'
import '../../../assets/scss/elite-app/buy-insurance/buy-insurance.scss'
import BankTransferInfo from '../../../components/elite-app/bank-tranfer/BankTransferInfo'
import EditableBlock from '../../../components/elite-app/ediable-block/EditableBlock'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../configs/elite-app'
import { COMPANIES } from '../../../configs/insurance-app'
import {
  updatePropsDataFees,
  updatePropsInfoVHCStatus,
  updatePropsListCarType
} from '../../../redux/actions/elite-app/renewal'
import { buyNewInsurance } from '../../../services/elite-app/buyNewInsurance'
import {
  isArrayEmpty, Utils
} from '../../../ultity'
import {
  KEY_VEHICLE_TYPE,
  sugg_Purpose,
  sugg_Purpose_KD,
  sugg_Purpose_KKD
} from '../../insurance-app/buy-insurances/car/components/step1/formikConfig'
import { getDefault_updateVehicleInfoObject } from '../../insurance-app/buy-insurances/car/components/step1/utility'
import EditableDuration from './components/EditableDuration'
import FeeComp from './components/feeComp'
import PaymentSuccessScreen from './components/paymentSuccessScreen'
import PopupInfoBuyInsurance from './components/popupInfoBuyInsurance'
import {
  initialValues,
  KEY_ADDRESS, KEY_CAPACITYTYPE,
  KEY_CONTRACTTYPE, KEY_LOADS, KEY_NAME,
  KEY_NUMBER_PLATE,
  KEY_PURPOSE,
  KEY_SEATS,
  KEY_VEHICEL_TYPE,
  KEY_VEHICLE_TYPE_ID,
  validateSchema,
  valitadte,
  _KEY_VEHICEL_TYPE_NAME
} from './formikConfig'
import {
  fetchDataToAPI,
  fillInsuranceInfo, getDefault_updateOwnerContactObj,
  selectErrorStyles,
  selectNormalStyles
} from './utility'
import inonIconSmall from "../../../assets/images/elite-app/buy-insurance/logo-company-icon-buy-zalo.svg";
const RenewalStyled = styled.div`
  overflow-x: hidden;
  input {
    border-radius: 16px;
    border: 1px solid #d9d9d9;
    color: #5f5f5f;
  }
  .title-contract-insurance {
    line-height: 28px;
    color: #106d5a;
    /* margin-bottom: 40px; */
    text-align: center;
  }
  .divider {
    height: 1px;
    width: 100%;
    background-color: #efefef;
    margin-bottom: 30px;
  }
`
const CardStyled = styled(Card)`
  & {
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    border-radius: 16px;
    margin-bottom: 5% !important;
  }
`
const RenewalContainerStyled = styled.div`
  background-color: #efefef;
  @media (min-width: 1200px) {
    padding-right: 23%;
    padding-left: 23%;
  }
`
const RowCompany = styled(Row)`
  background: #fff;
  color: #000;
  padding: 20px;
  border-radius: 20px;
  /* width: 90%; */
  @media (max-width : 576px) {
    .row-company-logo{
      img{
        width : 150px;
      }
    }
    .row-company-title{
      /* display: none; */
    }
  }
`
const RenewalPage = () => {
  const [isAccepted, setIsAccepted] = useState(false)
  const {
    contractInfo: insuranceInfo,
    dataFees,
    companyId,
    listCarType,
    editInfoVehicelStatus,
    contractCode
  } = useSelector((state) => state.app.renewalInsurance)
  const totalFee = dataFees.find(
    (_elt) => _elt.companyId === companyId
  )?.totalFee
  const [actionFeeStatus, setActionFeeStatus] = useState(true)
  const history = useHistory()
  const [validateStatus, setValidateStatus] = useState(true)
  const [bussinessType, setBussinessType] = useState('A')
  const [carManufacturers, setCarManufacturers] = useState([])
  const [CarBrands, setCarBrands] = useState([])
  const [paymentStatus, setPaymentStatus] = useState(false)
  const toggleAccepted = () => {
    setIsAccepted((prevState) => !prevState)
  }
  const dispatch = useDispatch()
  const params = useParams()
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    validateOnBlur: validateStatus,
    validateOnChange: validateStatus,
    validate: valitadte,
    onSubmit: () => {}
  })
  const company = COMPANIES.find((_elt) => _elt.companyId === companyId)
  const { getFieldMeta, setFieldValue, setValues, values, errors } = formik
  const intl = useIntl()
  const saveVehicelInfo = async () => {
    await buyNewInsurance.updateVehicel(
      getDefault_updateVehicleInfoObject(insuranceInfo.vehicles[0].id, {
        contractId: insuranceInfo.contractId,
        ...values,
        [KEY_VEHICLE_TYPE]: values[KEY_VEHICLE_TYPE_ID]
      })
    )
    saveInsuranceInfo()
  }
  const saveInsuranceInfo = async (type) => {
    const res = await buyNewInsurance.updateInsuranceConfig(
      fillInsuranceInfo(insuranceInfo, formik)
    )
    if (res.status !== 200) return
    const feeRes = await buyNewInsurance.getFeeContract(
      insuranceInfo.contractId
    )
    if (feeRes.status !== 200) return
    const feeDatas = feeRes.data.filter((_elt) => _elt.companyId === '06')
    dispatch(updatePropsDataFees(feeDatas))
  }
  const saveOwnerInfo = async () => {
    await buyNewInsurance.updateOwnerInfo(
      getDefault_updateOwnerContactObj(insuranceInfo.owner.id, values)
    )
  }
  const vehicleDetails = [
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.vehicleType.text')
      }),
      content: getFieldMeta(_KEY_VEHICEL_TYPE_NAME).value,
      formikKey: _KEY_VEHICEL_TYPE_NAME,
      contentInput: (
        <Select
          readOnly
          isClearable={false}
          closeMenuOnSelect={true}
          classNamePrefix='select mt-1'
          className='custom-zindex8 mb-1'
          styles={
            getFieldMeta(KEY_VEHICEL_TYPE).error
              ? selectErrorStyles
              : selectNormalStyles
          }
          value={
            !isArrayEmpty(listCarType) &&
            listCarType.find(
              (elt) => elt.id == getFieldMeta(KEY_VEHICLE_TYPE_ID).value
            )
          }
          options={listCarType || []}
          onChange={(original) => {
            setFieldValue(KEY_VEHICEL_TYPE, original.code)
            setFieldValue(_KEY_VEHICEL_TYPE_NAME, original.name)
            setFieldValue(KEY_CAPACITYTYPE, original.capacityType)
            setFieldValue(KEY_VEHICLE_TYPE_ID, original.id)
            setBussinessType(original.businessStatus)
            if (original.businessStatus === 'A') {
              setFieldValue(KEY_PURPOSE, 'KKD')
            } else {
              setFieldValue(KEY_PURPOSE, original.businessStatus)
            }
          }}
        />
      ),
      isDisabled: false
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.numberPlate.text')
      }),
      content: getFieldMeta(KEY_NUMBER_PLATE).value,
      formikKey: KEY_NUMBER_PLATE,
      isDisabled: true
    },
    // {
    //   label: `${intl.formatMessage({
    //     id: getKeyLang('insurance.carManufacturer.text')
    //   })}/${intl.formatMessage({
    //     id: getKeyLang('insurance.brandName.text')
    //   })}`,
    //   content: `${getFieldMeta(KEY_MANUFACTURER_VEHICLE).value}/${
    //     getFieldMeta(KEY_BRAND_NAME).value
    //   }`,
    //   formikKey: KEY_MANUFACTURER_VEHICLE,
    //   isDisabled: true,
    //   isHidden: editInfoVehicelStatus ? true : false
    // },
    // {
    //   label: `${intl.formatMessage({
    //     id: getKeyLang('insurance.carManufacturer.text')
    //   })}`,
    //   content: `${getFieldMeta(KEY_MANUFACTURER_VEHICLE).value}`,
    //   formikKey: KEY_MANUFACTURER_VEHICLE,
    //   contentInput: (
    //     <Select
    //       readOnly
    //       isClearable={false}
    //       closeMenuOnSelect={true}
    //       classNamePrefix='select mt-1'
    //       className='custom-zindex8 mb-1'
    //       styles={
    //         getFieldMeta(KEY_MANUFACTURER_VEHICLE).error
    //           ? selectErrorStyles
    //           : selectNormalStyles
    //       }
    //       value={
    //         !isArrayEmpty(carManufacturers) &&
    //         carManufacturers.find(
    //           (elt) => elt.name == getFieldMeta(KEY_MANUFACTURER_VEHICLE).value
    //         )
    //       }
    //       options={carManufacturers || []}
    //       onChange={(original) => {
    //         setFieldValue(KEY_MANUFACTURER_VEHICLE, original.value)
    //         const brandsMapping = original.brands.map((_elt) => {
    //           return {
    //             ..._elt,
    //             label: _elt.brand,
    //             value: _elt.brand
    //           }
    //         })
    //         setCarBrands(brandsMapping)
    //         setFieldValue(KEY_BRAND_NAME, '')
    //       }}
    //     />
    //   ),
    //   isDisabled: false,
    //   isHidden: editInfoVehicelStatus ? false : true
    // },
    // {
    //   label: `${intl.formatMessage({
    //     id: getKeyLang('insurance.brandName.text')
    //   })}`,
    //   content: `${getFieldMeta(KEY_BRAND_NAME).value}`,
    //   isDisabled: true,

    //   contentInput: (
    //     <Select
    //       readOnly
    //       isClearable={false}
    //       closeMenuOnSelect={true}
    //       classNamePrefix='select mt-1'
    //       className='custom-zindex8 mb-1'
    //       styles={
    //         getFieldMeta(KEY_BRAND_NAME).error
    //           ? selectErrorStyles
    //           : selectNormalStyles
    //       }
    //       value={
    //         !isArrayEmpty(CarBrands) &&
    //         CarBrands.find(
    //           (elt) => elt.value == getFieldMeta(KEY_BRAND_NAME).value
    //         )
    //       }
    //       options={CarBrands || []}
    //       onChange={(original) => {
    //         setFieldValue(KEY_BRAND_NAME, original.value)
    //       }}
    //     />
    //   ),
    //   formikKey: KEY_BRAND_NAME,
    //   isDisabled: false,
    //   isHidden: editInfoVehicelStatus ? false : true
    // },
    {
      label: intl.formatMessage({ id: getKeyLang('insurance.uses.text') }),
      content: sugg_Purpose.find(
        (_elt) => _elt.temp === getFieldMeta(KEY_PURPOSE).value
      )?.label,
      formikKey: KEY_PURPOSE,
      colContent: editInfoVehicelStatus ? 12 : 6,
      contentInput: (
        <Select
          readOnly
          isClearable={false}
          closeMenuOnSelect={true}
          classNamePrefix='select mt-1'
          className='custom-zindex8 mb-1'
          styles={
            getFieldMeta(KEY_PURPOSE).error
              ? selectErrorStyles
              : selectNormalStyles
          }
          value={
            !isArrayEmpty(sugg_Purpose) &&
            sugg_Purpose.find(
              (elt) => elt.temp == getFieldMeta(KEY_PURPOSE).value
            )
          }
          options={
            bussinessType === 'A'
              ? sugg_Purpose
              : bussinessType === 'KD'
              ? sugg_Purpose_KD
              : sugg_Purpose_KKD || []
          }
          onChange={(original) => {
            setFieldValue(KEY_PURPOSE, original.temp)
          }}
        />
      ),
      isDisabled: false,
      isHidden: insuranceInfo.contractType === 'MC' ? true : false
    },
    {
      label: intl.formatMessage({ id: getKeyLang('vehicles.Seats.text') }),
      content: getFieldMeta(KEY_SEATS).value,
      formikKey: KEY_SEATS,
      isHidden: getFieldMeta(KEY_CONTRACTTYPE).value === 'CC' ? false : true
    },
    {
      label: `${intl.formatMessage({
        id: getKeyLang('insurance.CAR_HANGHOA.loads')
      })} (Tấn)`,
      content: `${getFieldMeta(KEY_LOADS).value}`,
      // contentInput : getFieldMeta(KEY_LOADS).value,
      formikKey: KEY_LOADS,
      isDisabled: false,
      isHidden:
        (getFieldMeta(KEY_CAPACITYTYPE).value === 'LOADS' &&
          getFieldMeta(KEY_CONTRACTTYPE).value === 'CC') ||
        (getFieldMeta(KEY_CAPACITYTYPE).value === 'ALL' &&
          getFieldMeta(KEY_CONTRACTTYPE).value === 'CC')
          ? false
          : true
    }
  ]
  const ownerDetails = [
    {
      label: intl.formatMessage({ id: getKeyLang('insurance.fullName.text') }),
      content: getFieldMeta(KEY_NAME).value,
      formikKey: KEY_NAME,
      isDisabled: true
    },

    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.vta.step1.address.text')
      }),
      content: getFieldMeta(KEY_ADDRESS).value,
      formikKey: KEY_ADDRESS,
      isDisabled: false
    }
  ]
  const vehicelsInsuranceDetails =
    insuranceInfo?.insurances &&
    insuranceInfo?.insurances.map((_elt) => {
      let _obj = {}

      if (_elt.insuranceCode === 'CAR_TNDS' && _elt.isEnable) {
        _obj = {
          title: _elt.description,
          info: [
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.duration')
              }),
              content: `${_elt?.duration} tháng`
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('contractManagement.effectFrom')
              }),
              content: moment(_elt?.startValueDate)
                .utc(false)
                .format('YYYY-MM-DD H:mm')
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('contractManagement.effectTo')
              }),
              content: moment(_elt?.endValueDate)
                .utc(false)
                .format('YYYY-MM-DD H:mm')
            }
          ]
        }
      }
      if (_elt.insuranceCode === 'CAR_TNDS_TN' && _elt.isEnable) {
        _obj = {
          title: _elt.description,
          info: [
            {
              label: intl.formatMessage({ id: getKeyLang('AboutMan') }),
              content: !isNaN(_elt.liability1)
                ? Utils.numberFormat(_elt.liability1)
                : 0
            },
            {
              label: intl.formatMessage({ id: getKeyLang('AboutAsset') }),
              content: !isNaN(_elt.liability2)
                ? Utils.numberFormat(_elt.liability2)
                : 0
            },
            {
              label: intl.formatMessage({ id: getKeyLang('AboutPassenger') }),
              content: !isNaN(_elt.liability3)
                ? Utils.numberFormat(_elt.liability3)
                : 0
            }
          ]
        }
      }
      if (_elt.insuranceCode === 'CAR_CONNGUOI' && _elt.isEnable) {
        _obj = {
          title: _elt.description,
          info: [
            {
              label: intl.formatMessage({
                id: getKeyLang('renewalInsurance.MOTOR_CONNGUOI.liability')
              }),
              content: !isNaN(_elt.liability1)
                ? Utils.numberFormat(_elt.liability1)
                : 0
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.CAR_CONNGUOI.numberPeople')
              }),
              content:
                !isNaN(_elt.count1) || _elt.count1 !== null ? _elt.count1 : 0
            }
          ]
        }
      }
      if (_elt.insuranceCode === 'CAR_HANGHOA' && _elt.isEnable) {
        _obj = {
          title: _elt.description,
          info: [
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.CAR_TNDS_TN.additional')
              }),
              content: !isNaN(_elt.liability1)
                ? Utils.numberFormat(_elt.liability1)
                : 0
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.CAR_HANGHOA.loads')
              }),
              content:
                !isNaN(_elt.count1) || _elt.count1 !== null
                  ? `${_elt.count1} Tấn`
                  : 0
            }
          ]
        }
      }
      return _obj
    })

  const handlePayContract = async () => {
    await buyNewInsurance.payConstract(insuranceInfo.contractId, {
      paymentType: PAYMENT_TYPE_FUND_TRANSFER
    })
    setPaymentStatus(true)
  }
  useEffect(() => {
    dispatch(updatePropsInfoVHCStatus(true))
    dispatch(
      fetchDataToAPI(
        params.id,
        setFieldValue,
        setCarBrands,
        setCarManufacturers,
        companyId,
        history,
        initialValues,
        setValues,
        setBussinessType
      )
    )
    const getCarType = async () => {
      const res = await buyNewInsurance.getAllCarType()
      if (res.status === 200) {
        const data = res.data.map((_elt) => {
          return {
            ..._elt,
            value: _elt?.carType,
            label: _elt?.name
          }
        })
        dispatch(updatePropsListCarType(data))
      }
    }
    getCarType()
  }, [])

  return (
    <FormikProvider value={formik}>
      <PopupInfoBuyInsurance />

      <RenewalStyled className='buy-insurance'>
        <div className='d-flex justify-content-center py-2'>
          <div className=' text-uppercase text-primary text-sm-md font-weight-bold'>
            {' '}
            <h4 className='font-weight-bold text-primary text-center title-contract-insurance'>
              <FormattedMessage id={getKeyLang('infoInsuranceAndPayment')} />
            </h4>
          </div>
        </div>
        <RenewalContainerStyled className=' elite-app'>
          <CardStyled className=''>
            <CardBody>
              <h4 className='mb-2 font-weight-bold text-primary'>
                <FormattedMessage id={getKeyLang('insurance.contractNumber')} />{' '}
                : {contractCode}
              </h4>
              {/* // info vehecel */}
              {paymentStatus ? (
                <PaymentSuccessScreen />
              ) : (
                <>
                  <EditableBlock
                    title={<FormattedMessage id={getKeyLang('VehicleInfo')} />}
                    details={vehicleDetails}
                    saveCallback={saveVehicelInfo}
                    className='mb-4 mt-2'
                    isHideEditBtn={false}
                    isEditMode={true}
                  />
                  <div className='divider'></div>
                  <EditableBlock
                    title={
                      <FormattedMessage
                        id={getKeyLang('insurance.ownerInformation')}
                      />
                    }
                    details={ownerDetails}
                    saveCallback={saveOwnerInfo}
                    className='mb-3'
                    isHideEditBtn={false}
                  />
                  <div className='divider'></div>
                  <Row className='mb-1'>
                    <Col xs={12} md={12} className=''>
                      <div className='d-flex align-items-center'>
                        <img src={inonIconSmall} />
                        <b
                          className='font-medium-1 ml-1 font-weight-bold text-primary-highlight letter-uppercase text-uppercase'
                          style={{ color: '#2B7E6C' }}
                        >
                          <FormattedMessage id={getKeyLang('insurance.insuranceCompany')} />
                        </b>
                      </div>
                    </Col>
                  </Row>
                  {dataFees.length !== 0 ? (
                    <div className='mb-2'>
                      <RowCompany className='flex align-items-center'>
                        <Col xs='12' md='2' className='d-flex justify-content-center  row-company-logo'>
                          <img src={company.logo} width='80' />
                        </Col>
                        <Col xs='12' md='8' className='row-company-title text-center'>
                          <span className="font-weight-bold">{company.title}</span>
                        </Col>
                      </RowCompany>
                    </div>
                  ) : null}
                  <div className='divider'></div>
                  <EditableDuration
                    contractId={insuranceInfo.contractId}
                    details={vehicelsInsuranceDetails}
                    title={
                      <FormattedMessage
                        id={getKeyLang('insurance.homeSafety.3')}
                      />
                    }
                    saveCallback={saveInsuranceInfo}
                    insuranceType={insuranceInfo.contractType}
                    companyId={companyId}
                    actionFeeStatus={actionFeeStatus}
                    setActionFeeStatus={setActionFeeStatus}
                    isHiddenBtnEdit={totalFee === 0 ? true : false}
                  />
                  {dataFees[0]?.totalFee !== 0 ? (
                    <>
                      <FeeComp dataFees={dataFees} companyId={companyId} />
                      <div className='d-flex align-items-center justify-content-start mb-3'>
                        <Checkbox
                          color='primary'
                          className=''
                          icon={<Check className='vx-icon' size={16} />}
                          onChange={toggleAccepted}
                        />
                        <Col xs={12} md={12} lg={12}>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: intl.formatMessage({
                                id: getKeyLang('insurance.acceptTerms')
                              })
                            }}
                          />
                        </Col>
                      </div>
                    </>
                  ) : null}
                </>
              )}
              {isAccepted && !paymentStatus ? (
                <BankTransferInfo
                  contractCode={contractCode}
                  totalFeeInclVAT={totalFee}
                />
              ) : null}
            </CardBody>
            {dataFees[0]?.totalFee !== 0 ? (
              <>
                <div className='d-flex justify-content-end mb-3 px-2'>
                  {paymentStatus ? (
                    <Button
                      disabled={!isAccepted}
                      color='primary'
                      onClick={() => {
                        history.replace('/')
                      }}
                    >
                      Trang chủ
                    </Button>
                  ) : (
                    <Button
                      disabled={!isAccepted}
                      color='primary'
                      onClick={handlePayContract}
                    >
                      Hoàn thành
                    </Button>
                  )}
                </div>
              </>
            ) : null}
          </CardStyled>
        </RenewalContainerStyled>
      </RenewalStyled>
    </FormikProvider>
  )
}

export default RenewalPage
