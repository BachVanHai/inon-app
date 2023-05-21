import { BaseAppUltils, Button, Checkbox, FormattedMessage } from 'base-app'
import { FormikProvider, isNaN, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Card, CardBody, Col } from 'reactstrap'
import styled from 'styled-components'
import '../../../assets/scss/elite-app/buy-insurance/buy-insurance.scss'
import BankTransferInfo from '../../../components/elite-app/bank-tranfer/BankTransferInfo'
import EditableBlock from '../../../components/elite-app/ediable-block/EditableBlock'
import Navs from '../../../components/elite-app/layouts/Navs'
import { nullStrRegex } from '../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang, VEHICLE_STATUS_OPTIONS } from '../../../configs/elite-app'
import {
  updatePropsCompanyId,
  updatePropsContract,
  updatePropsDataFees
} from '../../../redux/actions/elite-app/renewal'
import { updateProps } from '../../../redux/actions/insurance-app/buyInsurancesCar'
import { renewalService } from '../../../services/elite-app/renewalnsurance'
import {
  convertNumberToCurrency,
  convertStrToNumber,
  fillMultipleStepInfo, Utils
} from '../../../ultity'
import {
  KEY_VEHICLE_TYPE,
  sugg_Purpose
} from '../../insurance-app/buy-insurances/car/components/step1/formikConfig'
import { getDefault_updateVehicleInfoObject } from '../../insurance-app/buy-insurances/car/components/step1/utility'
import EditableDuration from './components/EditableDuration'
import FeeComp from './components/feeComp'
import {
  initialValues,
  KEY_ADDRESS,
  KEY_ADDTIONAL_TERM_MAIN,
  KEY_ADD_TERMS_MAIN,
  KEY_BRAND_NAME, KEY_CONTRACTTYPE,
  KEY_CONTRACTVALUE,
  KEY_CONTRACT_CODE,
  KEY_CONTRACT_INFO,
  KEY_DURATION, KEY_EMAIL,
  KEY_FRAME_NUMBER,
  KEY_GT_XE_KHAIBAO,
  KEY_INITVALUE,
  KEY_ISSDATE,
  KEY_ISSPLACE,
  KEY_LOADS,
  KEY_MACHINE_NUMBER,
  KEY_MANUFACTURER_VEHICLE,
  KEY_NAME,
  KEY_NUMBER_PLATE,
  KEY_PHONE_NUMBER,
  KEY_PURPOSE,
  KEY_SEATS,
  KEY_STATUS_VEHICEL,
  KEY_TOGGLE_CAR_VATCHAT,
  validateSchema,
  _KEY_VEHICEL_TYPE_NAME
} from './formikConfig'
import {
  fillInsuranceInfo,
  fillValuesInsurances,
  getDefault_updateCompanyIdObj,
  getDefault_updateContractInfoObject,
  getDefault_updateOwnerContactObj
} from './utility'
const RenewalStyled = styled.div`
  input {
    border-radius: 16px;
    border: 1px solid #d9d9d9;
    color: #5f5f5f;
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
  @media (min-width: 1200px) {
    padding-right: 23%;
    padding-left: 23%;
  }
`
const RenewalPage = () => {
  const [isAccepted, setIsAccepted] = useState(false)
  const {
    contractInfo: insuranceInfo,
    dataFees,
    companyId
  } = useSelector((state) => state.app.renewalInsurance)
  const [actionFeeStatus, setActionFeeStatus] = useState(false)
  const history = useHistory()
  const { addTermsMain } = useSelector((state) => state.app.buyInsurancesCar)
  const [validateStatus, setValidateStatus] = useState(false)
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
    onSubmit: () => {}
  })

  const { getFieldMeta, setFieldValue, setValues, values } = formik
  const intl = useIntl()
  const saveOwnerInfo = () => {}
  const saveInsuranceInfo = async (type) => {
    // update bhvc if toggle change and add tearm main change
    const res = await renewalService.updateInsuranceConfig(
      fillInsuranceInfo(insuranceInfo, formik)
    )
    if (res.status !== 200) return
    if (
      values[KEY_TOGGLE_CAR_VATCHAT] &&
      values[KEY_ADD_TERMS_MAIN] &&
      insuranceInfo.contractType === 'CC'
    ) {
      if (
        values[KEY_GT_XE_KHAIBAO] !==
        convertStrToNumber(contactInfo.vehicleValue)
      ) {
        await renewalService.updateInitalValue(
          getDefault_updateContractInfoObject(
            insuranceInfo.contractId,
            values[KEY_GT_XE_KHAIBAO]
          )
        )
        await renewalService.updateVehicel(
          getDefault_updateVehicleInfoObject(insuranceInfo.vehicles[0].id, {
            contractId: insuranceInfo.contractId,
            ...values,
            [KEY_VEHICLE_TYPE]: values[KEY_VEHICLE_TYPE].id
          })
        )
      }
      const addOns = addTermsMain.map((_elt) => {
        return { ..._elt, contractId: insuranceInfo.contractId }
      })
      const addonsRes = await renewalService.updateAddons(addOns)
      if (addonsRes.status !== 200) {
        setFieldValue(KEY_TOGGLE_CAR_VATCHAT, false)
      }
    }
    const feeRes = await renewalService.getFeeContract(insuranceInfo.contractId)
    if (feeRes.status !== 200) return
    // check companies has in data fee
    const foundCompany = feeRes.data.find((elt) => elt.companyId === companyId)
    if (!foundCompany) {
      const __companyIdDefault = feeRes.data[0].companyId
      // update company when not found in array
      await renewalService.updateCompanies(
        getDefault_updateCompanyIdObj(
          insuranceInfo.contractId,
          __companyIdDefault
        )
      )
      dispatch(updatePropsCompanyId(__companyIdDefault))
    }
    dispatch(updatePropsDataFees(feeRes.data))
  }
  const vehicleDetails = [
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.vehicleType.text')
      }),
      content: getFieldMeta(_KEY_VEHICEL_TYPE_NAME).value,
      formikKey: _KEY_VEHICEL_TYPE_NAME,
      isDisabled: true
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.vehicleStatus.text')
      }),
      content: VEHICLE_STATUS_OPTIONS.find(
        (_elt) => _elt.value === getFieldMeta(KEY_STATUS_VEHICEL).value
      )?.label,
      formikKey: KEY_STATUS_VEHICEL,
      isDisabled: true,
      isHidden: insuranceInfo.contractType === 'MC' ? true : false
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.numberPlate.text')
      }),
      content: getFieldMeta(KEY_NUMBER_PLATE).value,
      formikKey: KEY_NUMBER_PLATE,
      isDisabled: true
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.carManufacturer.text')
      }),
      content: getFieldMeta(KEY_MANUFACTURER_VEHICLE).value,
      formikKey: KEY_MANUFACTURER_VEHICLE,
      isDisabled: true
    },
    {
      label: intl.formatMessage({ id: getKeyLang('insurance.brandName.text') }),
      content: getFieldMeta(KEY_BRAND_NAME).value,
      formikKey: KEY_BRAND_NAME,
      isDisabled: true
    },
    {
      label: intl.formatMessage({ id: getKeyLang('insurance.uses.text') }),
      content: sugg_Purpose.find(
        (_elt) => _elt.temp === getFieldMeta(KEY_PURPOSE).value
      )?.label,
      formikKey: KEY_PURPOSE,
      isDisabled: true,
      isHidden: insuranceInfo.contractType === 'MC' ? true : false
    },
    {
      label: intl.formatMessage({ id: getKeyLang('insurance.initValue.text') }),
      content: `${convertNumberToCurrency(
        Number(getFieldMeta(KEY_CONTRACTVALUE).value)
      )} VNĐ`,
      formikKey: KEY_CONTRACTVALUE,
      isDisabled: true,
      isHidden: !getFieldMeta(KEY_TOGGLE_CAR_VATCHAT).value ? true : false
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.requireVehicle.text')
      }),
      content: `${convertNumberToCurrency(
        Number(getFieldMeta(KEY_INITVALUE).value)
      )} VNĐ`,
      formikKey: KEY_INITVALUE,
      isDisabled: true,
      isHidden: !getFieldMeta(KEY_TOGGLE_CAR_VATCHAT).value ? true : false
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.frameNumber.text')
      }),
      content: getFieldMeta(KEY_FRAME_NUMBER).value,
      formikKey: KEY_FRAME_NUMBER,
      isDisabled: true
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.machineNumber.text')
      }),
      content: getFieldMeta(KEY_MACHINE_NUMBER).value,
      formikKey: KEY_MACHINE_NUMBER,
      isDisabled: true
    },
    {
      label: intl.formatMessage({ id: getKeyLang('insurance.issDate.text') }),
      content: getFieldMeta(KEY_ISSDATE).value,
      formikKey: KEY_ISSDATE,
      isDisabled: true,
      isHidden: getFieldMeta(KEY_CONTRACTTYPE).value === 'CC' ? false : true
    },
    {
      label: intl.formatMessage({ id: getKeyLang('insurance.issPlace.text') }),
      content: `${
        getFieldMeta(KEY_ISSPLACE).value === 'IMPORT' ? 'Nhập khẩu' : 'Việt Nam'
      }`,
      formikKey: KEY_ISSPLACE,
      isDisabled: true,
      isHidden: getFieldMeta(KEY_CONTRACTTYPE).value === 'CC' ? false : true
    },
    {
      label: intl.formatMessage({ id: getKeyLang('vehicles.Seats.text') }),
      content: getFieldMeta(KEY_SEATS).value,
      formikKey: KEY_SEATS,
      isDisabled: true,
      isHidden: getFieldMeta(KEY_CONTRACTTYPE).value === 'CC' ? false : true
    },
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.CAR_HANGHOA.loads')
      }),
      content: getFieldMeta(KEY_LOADS).value,
      formikKey: KEY_LOADS,
      isDisabled: true,
      isHidden:
        insuranceInfo?.capacityType === 'LOADS' &&
        getFieldMeta(KEY_CONTRACTTYPE).value === 'CC'
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
      isDisabled: true
    }
  ]
  const contactInfo = [
    {
      label: intl.formatMessage({
        id: getKeyLang('insurance.invoice.phoneNumber')
      }),
      content: getFieldMeta(KEY_PHONE_NUMBER).value,
      formikKey: KEY_PHONE_NUMBER
    },
    {
      label: intl.formatMessage({ id: getKeyLang('emailRequired') }),
      content: getFieldMeta(KEY_EMAIL).value,
      formikKey: KEY_EMAIL
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
                id: getKeyLang('insurance.insuranceCompany')
              }),
              content: dataFees.find((_elt) => _elt.companyId === companyId)
                ?.companyName
            },
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
              content: moment(_elt?.startValueDate).format('YYYY-MM-DD H:mm')
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('contractManagement.effectTo')
              }),
              content: moment(_elt?.endValueDate).format('YYYY-MM-DD H:mm')
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
      if (_elt.insuranceCode === 'CAR_VATCHAT' && _elt.isEnable) {
        _obj = {
          title: _elt.description,
          info: [
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.duration')
              }),
              content: _elt?.duration
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('contractManagement.effectFrom')
              }),
              content: moment(_elt?.startValueDate).format('YYYY-MM-DD H:mm')
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('contractManagement.effectTo')
              }),
              content: moment(_elt?.endValueDate).format('YYYY-MM-DD H:mm')
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.additionTerms')
              }),
              content: (
                <ul style={{ paddingLeft: 0 }}>
                  {insuranceInfo?.insuranceAddons.map((_elt, index) => {
                    return (
                      _elt?.isEnable && (
                        <li
                          className='list-none'
                          key={index}
                          style={{ listStyleType: 'none', padding: 0 }}
                        >
                          {_elt.addonDesc}
                        </li>
                      )
                    )
                  })}
                </ul>
              )
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
                ? Utils.numberFormat(_elt.value1)
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
      if (_elt.insuranceCode === 'MOTOR_TNDS' && _elt.isEnable) {
        _obj = {
          title: _elt.description,
          info: [
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.insuranceCompany')
              }),
              content: dataFees.find((_elt) => _elt.companyId === companyId)
                ?.companyName
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('insurance.duration')
              }),
              content: `${getFieldMeta(KEY_DURATION).value} tháng`
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('contractManagement.effectFrom')
              }),
              content: moment(_elt?.startValueDate).format('YYYY-MM-DD H:mm')
            },
            {
              label: intl.formatMessage({
                id: getKeyLang('contractManagement.effectTo')
              }),
              content: moment(_elt?.endValueDate).format('YYYY-MM-DD H:mm')
            }
          ]
        }
      }
      if (_elt.insuranceCode === 'MOTOR_CONNGUOI' && _elt.isEnable) {
        _obj = {
          title: _elt.description,
          info: [
            {
              label: intl.formatMessage({
                id: getKeyLang('renewalInsurance.MOTOR_CONNGUOI.liability.text')
              }),
              content: `${
                Number.parseInt(_elt.liability1) / 1_000_000
              } ${intl.formatMessage({ id: getKeyLang('AboutManUnit') })}`
            },
            {
              label: intl.formatMessage({ id: getKeyLang('NumInCar') }),
              content:
                insuranceInfo?.carType === 'MT3'
                  ? `3 ${intl.formatMessage({ id: getKeyLang('people') })}`
                  : `2 ${intl.formatMessage({ id: getKeyLang('people') })}`
            }
          ]
        }
      }
      return _obj
    })

  const handleDebt = async () => {
    setValidateStatus(true)
    formik.handleSubmit() /* this will invoke validateOnChange */
    const email = formik.values[KEY_EMAIL]
    const phoneNumber = formik.values[KEY_PHONE_NUMBER]
    /** return false, everything will work normaly as expect */
    if (
      (email && !email.match(nullStrRegex)) ||
      (phoneNumber && !phoneNumber.match(nullStrRegex))
    ) {
      await renewalService.debt(
        getDefault_updateOwnerContactObj(insuranceInfo.id, values)
      )
      BaseAppUltils.toastSuccess(
        <FormattedMessage
          id={getKeyLang('insurance.motor.step4.notify.SUCCESS')}
        />
      )
      setTimeout(() => {
        history.replace('/')
      }, 1500)
    } else {
      BaseAppUltils.toastError(
        <FormattedMessage
          id={getKeyLang('error.required.emailOrPhoneNumber')}
        />
      )
    }
  }
  useEffect(() => {
    const getData = async () => {
      const res = await renewalService.getContractById(params.id) //CT1659927321366 //CT1659927320330
      if (res.status === 200) {
        const data = {
          ...res.data,
          ...res.data.owner,
          ...res.data.vehicles[0],
          ...res.data.vehicles[0].vehicleType,
          vehicelTypeName: res.data.vehicles[0].vehicleType.name,
          vehicelTypeCode: res.data.vehicles[0].vehicleType.code,
          address: res.data.owner.addresses[0].detail
        }
        dispatch(
          updateProps([
            {
              prop: KEY_CONTRACT_INFO,
              value: data
            },
            {
              prop: KEY_ADDTIONAL_TERM_MAIN,
              value: res.data.insuranceAddons
            }
          ])
        )
        dispatch(updatePropsCompanyId(res.data.companyId))
        dispatch(updatePropsContract(data))
        fillMultipleStepInfo(data, initialValues, setValues)
        fillValuesInsurances(
          res.data.insurances,
          setFieldValue,
          res.data.contractId
        )
      }
    }
    getData()
  }, [])

  return (
    <FormikProvider value={formik}>
      <RenewalStyled className='buy-insurance'>
        <Navs />
        <RenewalContainerStyled className='mt-3 elite-app'>
          <CardStyled className=''>
            <div className='d-flex justify-content-center mt-2'>
              <div className=' text-uppercase text-primary text-2xl text-sm-md font-weight-bold'>
                {' '}
                <h2 className='font-weight-bold text-primary text-center'>
                  <FormattedMessage
                    id={getKeyLang('infoInsuranceAndPayment')}
                  />{' '}
                </h2>
              </div>
            </div>
            <CardBody>
              <h4 className='mb-2 font-weight-bold text-primary'>
                <FormattedMessage id={getKeyLang('insurance.contractNumber')} />{' '}
                : {getFieldMeta(KEY_CONTRACT_CODE).value}
              </h4>
              {/* // info vehecel */}

              <EditableBlock
                title={<FormattedMessage id={getKeyLang('VehicleInfo')} />}
                details={vehicleDetails}
                className='mb-4'
                isHideEditBtn={true}
              />
              <EditableBlock
                title={
                  <FormattedMessage
                    id={getKeyLang('insurance.ownerInformation')}
                  />
                }
                details={ownerDetails}
                className='mb-3'
                saveCallback={saveOwnerInfo}
                isHideEditBtn={true}
              />
              <EditableBlock
                details={contactInfo}
                className='mb-3'
                saveCallback={saveOwnerInfo}
                isEditMode={true}
                isHideEditBtn={true}
              />
              <EditableDuration
                contractId={insuranceInfo.contractId}
                details={vehicelsInsuranceDetails}
                title={
                  <FormattedMessage id={getKeyLang('insurance.homeSafety.3')} />
                }
                saveCallback={saveInsuranceInfo}
                insuranceType={insuranceInfo.contractType}
                companyId={companyId}
                actionFeeStatus={actionFeeStatus}
                setActionFeeStatus={setActionFeeStatus}
              />
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
              {isAccepted ? (
                <BankTransferInfo
                  contractCode={insuranceInfo.contractCode}
                  totalFeeInclVAT={
                    dataFees.find((_elt) => _elt.companyId === companyId)
                      ?.totalFee
                  }
                />
              ) : null}
            </CardBody>
            <div className='d-flex justify-content-end mb-3 px-2'>
              <Button
                disabled={!isAccepted}
                color='primary'
                onClick={handleDebt}
              >
                Hoàn thành
              </Button>
            </div>
          </CardStyled>
        </RenewalContainerStyled>
      </RenewalStyled>
    </FormikProvider>
  )
}

export default RenewalPage
