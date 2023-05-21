import { BaseFormGroup, BaseFormGroupSelect, CurrencyInput } from 'base-app'
import { Field, Formik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import * as Icon from 'react-feather'
import { FormattedMessage } from 'react-intl/lib'
import { useDispatch, useSelector } from 'react-redux'
import moment, { max } from 'moment'
import Toggle from 'react-toggle'
import {
  Col,
  FormGroup,
  Label,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover
} from 'reactstrap'
import Row from 'reactstrap/lib/Row'
import * as Yup from 'yup'
import { getKeyLang } from '../../../../../configs/elite-app'
import { actionHomePrivateNextStep3 } from '../../../../../redux/actions/elite-app/buy-insurance/BuyHomePrivateInsurance'
import {
  actionSaveContract,
  actionSaveStepData
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import PaymentMethods from '../../payment-method/PaymentMethods'
import { StepFooter } from '../../StepFooter'
import DurationInsurances from './DurationInsurances'
import {
  convertDate,
  convertDateToISO,
  convertNumber,
  convertStringToNumber,
  DEDUCTIBLE_DEFAULT,
  KEY_TIME_DEAFAULT,
  styleIconInfo,
  styleLabel,
  styleTitle
} from './utility'
const HomePrivateStep2 = () => {
  const dispatch = useDispatch()
  const { contract, stepData, bankList } = useSelector(
    (state) => state.app.buyInsurance
  )
  const usedTimeHouse = parseInt(stepData[1].usedTime)
  const calcMax = Math.max(12, (25 - stepData[1].usedTime) * 12)
  const calcMin = usedTimeHouse <= 20 ? 6 : 3
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const [maxBenefitTransferRate, setmaxBenefitTransferRate] = useState(stepData[2] !== undefined ? stepData[2].maxLimitBenefitTransferRate : 0)
  const [maxLimitInsuranceAddOnAsset, setMaxLimitInsuranceAddOnAsset] = useState(0)
  const [maxLimitMaterialcompensationLimit, setMaxLimitMaterialcompensationLimit] = useState(0)
  const [
    durationOfInsuranceRangeMinValue,
    setDurationOfInsuranceRangeMinValue
  ] = useState(calcMin)
  const [
    durationOfInsuranceRangeMaxValue,
    setDurationOfInsuranceRangeMaxValue
  ] = useState(calcMax)
  const rangeType = useMemo(() => {
    return [
      {
        value: 1,
        label: 'Cơ bản ',
        businessStatus: false,
        capacityType: 'BASIC'
      },
      {
        value: 2,
        label: 'Toàn diện',
        businessStatus: false,
        capacityType: 'OVERVIEW'
      }
    ]
  }, [])
  const stepDataForm = useSelector(
    (state) =>
      state.app.buyInsurance.stepData['2'] || {
        assetOption: false,
        bankOption: false,
        materialOption: true,
        beneficiaryBankDTOaddress: '',
        beneficiaryBankDTObenefitTransferRate: '',
        beneficiaryBankDTObranch: '',
        beneficiaryBankDTOname: '',
        deduct: convertNumber('3000000'),
        duration: calcMin,
        durationStatus: false,
        insuranceAddOnAssetcompensationLimit: '',
        insuranceAddOnMaterialcompensationLimit: '',
        insuranceCoverage: rangeType[0].value,
        isEnable: true,
        unit: 'PERCENT',
        effectTime : KEY_TIME_DEAFAULT,
        effectiveDateFrom: contract.insurances[0].startValueDate,
        maxLimitBenefitTransferRate : '',
        startedDate: '',
        endValueDate: '',
        endDate: '',
      }
  )
  const validateSchema = Yup.object().shape({
    insuranceAddOnAssetcompensationLimit: Yup.number().when('assetOption', {
      is: true,
      then: Yup.number()
        .required('Không được để trống')
        .min(300000000, `Giới hạn không nhỏ hơn 300.000.000 VNĐ`)
        .max(1000000000, `Giới hạn không vượt quá 1 tỷ đồng`)
    }),
    insuranceAddOnMaterialcompensationLimit: Yup.number()
      .required('Không được để trống')
      .min(300000000, `Giới hạn không nhỏ hơn 300.000.000 VNĐ`)
      .max(10000000000, `Giới hạn không vượt quá 10 tỷ đồng`),
    beneficiaryBankDTOaddress: Yup.string().when('bankOption', {
      is: true,
      then: Yup.string().required('Không được để trống')
    }),
    beneficiaryBankDTOname: Yup.string().when('bankOption', {
      is: true,
      then: Yup.string().required(' ')
    }),
    beneficiaryBankDTObranch: Yup.string().when('bankOption', {
      is: true,
      then: Yup.string().required('Không được để trống')
    }),
    beneficiaryBankDTObenefitTransferRate: Yup.number().when('bankOption', {
      is: true,
      then: Yup.number()
        .required('Không được để trống').max(maxBenefitTransferRate)
        .test(
          'Is positive?',
          'Giá trị phải lớn hơn 0',
          (value) => value > 0
        )
    })
  })
  const [
    propertyInsideTheHouseStatus,
    setPropertyInsideTheHouseStatus
  ] = useState(stepData[2] != undefined ? stepData[2].assetOption : false)
  const [durationOfInsuranceStatus, setDurationOfInsuranceStatus] = useState(
    stepData[2] != undefined ? stepData[2].materialOption : true
  )
  const [
    beneficiaryTransferViaBankStatus,
    setBeneficiaryTransferViaBankStatus
  ] = useState(stepData[2] != undefined ? stepData[2].bankOption : false)
  const bankListFilter = bankList.map((bank) => {
    return {
      value: bank.id,
      label: bank.vn
    }
  })

  const minDate = new Date(contract.insurances[0]?.minStartValueDate)
  minDate.setHours(
    minDate.getHours(),
    minDate.getMinutes() - 1,
    minDate.getSeconds(),
    minDate.getMilliseconds()
  )
  const onChangeEffectiveDateFrom = (date, setValue, status) => {
    setValue('durationStatus', status)
    const newContract = { ...contract }
    newContract.insurances.forEach((item) => {
      const currentDate = new Date(date[0])
      item.startValueDate = new Date(currentDate)
      const startDate = convertDate(item.startValueDate)
      setValue(
        'startedDate',
        convertDateToISO(moment(startDate).format(`YYYY-MM-DD hh:mm:ss`))
      )
      currentDate.setMonth(currentDate.getMonth() + 12)
      item.endValueDate = new Date(currentDate)
      const endDate = convertDate(item.endValueDate)
      setValue('endValueDate', endDate)
      setValue(
        'endDate',
        convertDateToISO(moment(endDate).format(`YYYY-MM-DD hh:mm:ss`))
      )
    })
    dispatch(actionSaveContract(newContract))
  }

  const handelClickSubmit = (values) => {
    values.maxLimitBenefitTransferRate = maxBenefitTransferRate
    dispatch(actionSaveStepData(2, values))
    const bankFilter = bankList.find(
      (item) => item.id == values.beneficiaryBankDTOname
    )
    if (bankFilter) {
      values.beneficiaryBankDTOname = bankFilter.vn
    }
    const coverageType = rangeType.find(
      (item) => item.value == values.insuranceCoverage
    )
    if (coverageType) {
      values.insuranceCoverage = coverageType.capacityType
    }

    dispatch(actionHomePrivateNextStep3(values))
  }
  return (
    <Formik
      initialValues={stepDataForm}
      validationSchema={validateSchema}
      validateOnChange={validateAfterSubmit}
      validateOnBlur={validateAfterSubmit}
      onSubmit={handelClickSubmit}
      enableReinitialize
    >
      {({
        touched,
        errors,
        setFieldError,
        setFieldTouched,
        setFieldValue,
        submitForm,
        getFieldMeta,
        values
      }) => (
        <>
          <span
            className='font-weight-bold mt-2'
            style={{ fontSize: '1.32rem', color: '#338955' }}
          >
            <FormattedMessage
              id={getKeyLang(`insurance.homeprivate.step2.title`)}
            />
          </span>
          <DurationInsurances
            min={durationOfInsuranceRangeMinValue}
            max={durationOfInsuranceRangeMaxValue}
            fieldName='duration'
            stepData={stepData}
            setValue={setFieldValue}
            insurances={contract.insurances[0]}
            durationOfInsuranceRangeMinValue={durationOfInsuranceRangeMinValue}
            durationOfInsuranceRangeMaxValue={durationOfInsuranceRangeMaxValue}
            usedTimeHouse={usedTimeHouse}
            setFieldError={setFieldError}
            setFieldTouched={setFieldTouched}
            duration={values.duration}
            contract={contract}
            onChangeEffectiveDateFrom={onChangeEffectiveDateFrom}
            getFieldMeta={getFieldMeta}
          />
          <div className='mt-3 d-flex justify-content-between'>
            <div>
              <span className='font-weight-bold' style={styleTitle}>
                {' '}
                <FormattedMessage
                  id={getKeyLang(
                    'insurance.homeprivate.step2.physicalPartInsurance'
                  )}
                />
              </span>
            </div>
            <div>
              <span className='d-flex justify-content-end'>
                <Toggle checked={true} />
              </span>
            </div>
          </div>
          {durationOfInsuranceStatus ? (
            <Row className={`mt-2`}>
              <Col md={12} className={`mb-3`}>
                <Field name='insuranceAddOnMaterialcompensationLimit'>
                  {({ field, form }) => (
                    <FormGroup className='form-label-group'>
                      <CurrencyInput
                        id='initValue'
                        className={`form-control mt-2 form-label-group ${
                          touched.insuranceAddOnMaterialcompensationLimit &&
                          errors.insuranceAddOnMaterialcompensationLimit &&
                          'is-invalid'
                        }`}
                        placeholder={getKeyLang(
                          'insurance.homeprivate.step2.compensationExtension'
                        )}
                        touched={touched}
                        errors={errors}
                        type={`text`}
                        defaultValue={
                          stepDataForm.insuranceAddOnMaterialcompensationLimit
                        }
                        onChange={(e) => {
                          const value = convertStringToNumber(e.target.value)
                          setMaxLimitInsuranceAddOnAsset(value)
                          setmaxBenefitTransferRate(value)
                          setFieldValue(
                            `insuranceAddOnMaterialcompensationLimit`,
                            convertStringToNumber(e.target.value)
                          )
                          if(stepData[2] !== undefined){
                          setmaxBenefitTransferRate(stepData[2].insuranceAddOnAssetcompensationLimit + value)
                        }
                        }}
                      />
                      <Label>
                        {' '}
                        <FormattedMessage
                          id={getKeyLang(
                            'insurance.homeprivate.step2.compensationExtension'
                          )}
                        />{' '}
                      </Label>
                      <span className='text-danger mt-3'>
                        {errors.insuranceAddOnMaterialcompensationLimit}
                      </span>
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
          ) : null}
          <div className='d-flex justify-content-between'>
            <div>
              <span className='font-weight-bold' style={styleTitle}>
                <FormattedMessage
                  id={getKeyLang(
                    'insurance.homeprivate.step2.propertyInsideTheHouse'
                  )}
                />
              </span>
            </div>
            <div>
              <span className='d-flex justify-content-end'>
                <Toggle
                  defaultChecked={stepDataForm.assetOption}
                  onChange={(e) => {
                    setFieldValue('assetOption', e.target.checked)
                    setPropertyInsideTheHouseStatus(e.target.checked)

                  }}
                />
              </span>
            </div>
          </div>
          {propertyInsideTheHouseStatus ? (
            <Row className={`mt-2`}>
              <Col md={12} className={`mb-3`}>
                <Field name='insuranceAddOnAssetcompensationLimit'>
                  {({ field, form }) => (
                    <FormGroup className='form-label-group'>
                      <CurrencyInput
                        id='initValue'
                        className={`form-control mt-2 form-label-group ${
                          touched.insuranceAddOnAssetcompensationLimit &&
                          errors.insuranceAddOnAssetcompensationLimit &&
                          'is-invalid'
                        }`}
                        placeholder={getKeyLang(
                          'insurance.homeprivate.step2.compensationExtension'
                        )}
                        touched={touched}
                        errors={errors}
                        type={`text`}
                        defaultValue={
                          stepDataForm.insuranceAddOnAssetcompensationLimit
                        }
                        onChange={(e) => {
                          const value = convertStringToNumber(e.target.value)
                          setmaxBenefitTransferRate(maxLimitInsuranceAddOnAsset + value)
                          setMaxLimitMaterialcompensationLimit(value)
                          setFieldValue(
                            `insuranceAddOnAssetcompensationLimit`,
                            convertStringToNumber(e.target.value)
                          )
                        if(stepData[2] !== undefined){
                          setmaxBenefitTransferRate(stepData[2].insuranceAddOnMaterialcompensationLimit + value)
                        }
                        }}
                      />
                      <Label>
                        {' '}
                        <FormattedMessage
                          id={getKeyLang(
                            'insurance.homeprivate.step2.compensationExtension'
                          )}
                        />{' '}
                      </Label>
                      <span className='text-danger mt-3'>
                        {errors.insuranceAddOnAssetcompensationLimit}
                      </span>
                    </FormGroup>
                  )}
                </Field>
              </Col>
            </Row>
          ) : null}
          <div className="mt-3">
          <span className="font-weight-bold" style={styleTitle}>  <FormattedMessage
                id={getKeyLang(
                  'insurance.homeprivate.step2.coverage'
                )}
              /></span>
              <span className="ml-1">
                <Icon.Info className='vx-icon`'  style={styleIconInfo} size={20}  id='topPropertyIntheHouse' />
                <UncontrolledPopover trigger="focus" placement='top' target='topPropertyIntheHouse'>
                  <PopoverHeader>
                    <FormattedMessage
                      id={`${getKeyLang(
                        'insurance.homeprivate.step2.coverage'
                      )}`}
                    />
                  </PopoverHeader>
                  <PopoverBody>
                  <div >
                  <FormattedMessage
                      id={`${getKeyLang(
                        `insurance.homeprivate.step2.range.detail.basic`
                      )}`}
                    />
                  </div>
                   <div>
                   <FormattedMessage
                      id={`${getKeyLang(
                        `insurance.homeprivate.step2.range.detail.extention`
                      )}`}
                    />
                   </div>
                  </PopoverBody>
                </UncontrolledPopover>
              </span>
          </div>
          <div className="mt-2">
          <BaseFormGroupSelect
                  messageId={getKeyLang("insurance.homeprivate.step2.coverage")}
                  defaultValue={rangeType[0]}
                  options={rangeType}
                  fieldName='insuranceCoverage'
                />
          </div>
          {/* ================= Deductible============== */}
          <div className="d-flex mt-3 mb-3">
          <span className="font-weight-bold" style={styleTitle}>  <FormattedMessage
                id={getKeyLang(
                  'insurance.homeprivate.step2.Deductible.title'
                )}
              /></span>
              <span className="ml-1">
                <Icon.Info className='vx-icon`'  style={styleIconInfo} size={20}  id='Deductible' />
                <UncontrolledPopover trigger="focus" placement='top' target='Deductible'>
                  <PopoverHeader>
                    <FormattedMessage
                      id={`${getKeyLang(
                        'insurance.homeprivate.step2.Deductible.title'
                      )}`}
                    />
                  </PopoverHeader>
                  <PopoverBody>
                  <div >
                  <FormattedMessage
                      id={`${getKeyLang(
                        `insurance.homeprivate.step2.Deductible.detail`
                      )}`}
                    />
                  </div>
                  </PopoverBody>
                </UncontrolledPopover>
              </span>
              <span className='ml-2' style={styleTitle}>
                {DEDUCTIBLE_DEFAULT}
              </span>
          </div>
           {/* ================= end Deductible============== */}
          <div className='d-flex justify-content-between'>
            <div>
            <span className="font-weight-bold" style={styleTitle}>
            <FormattedMessage
                id={getKeyLang(
                  'insurance.homeprivate.step2.beneficiaryTransferViaBank'
                )}
              />
            </span>

            </div>
            <div>
              <span className='d-flex justify-content-end'>
                <Toggle
                defaultChecked={stepDataForm.bankOption}
                  onChange={(e) => {
                    setFieldValue('bankOption', e.target.checked)
                    setBeneficiaryTransferViaBankStatus(e.target.checked)
                  }}
                />
              </span>
            </div>
          </div>
          {beneficiaryTransferViaBankStatus ? (
            <div>
              <Row className="mt-3">
                <Col md={6} className="mb-3">
                  <BaseFormGroupSelect
                    messageId={getKeyLang(
                      'insurance.homeprivate.step2.bankName'
                    )}
                    touched={touched}
                    errors={errors}
                    options={bankListFilter}
                    fieldName='beneficiaryBankDTOname'
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <BaseFormGroup
                    messageId={getKeyLang(
                      'insurance.homeprivate.step2.bankBranch'
                    )}
                    fieldName='beneficiaryBankDTObranch'
                  />
                </Col>
              </Row>
              <Row className={`mb-3`}>
                <Col md={12} >
                  <BaseFormGroup
                    messageId={getKeyLang(
                      'insurance.homeprivate.step2.bankAddress'
                    )}
                    fieldName='beneficiaryBankDTOaddress'
                  />
                </Col>
              </Row>
              <Row className={`mb-3`}>
                <Col md={12}>

                <Field name='beneficiaryBankDTObenefitTransferRate'>
                          {
                            ({ field, form }) => (
                              <FormGroup className='form-label-group'>
                              <CurrencyInput id='initValue'
                             className={`form-control form-label-group ${touched.beneficiaryBankDTObenefitTransferRate && errors.beneficiaryBankDTObenefitTransferRate && 'is-invalid'}`}
                             placeholder={getKeyLang('insurance.homeprivate.step2.benefitTransferRate')}
                            touched={touched}
                            errors={errors}
                            type={`text`}
                            defaultValue={stepDataForm.beneficiaryBankDTObenefitTransferRate}
                            onChange={(e)=>{
                              setFieldValue(`beneficiaryBankDTObenefitTransferRate`,convertStringToNumber(e.target.value))

                              }}
                              />
                                <Label> <FormattedMessage id={getKeyLang('insurance.homeprivate.step2.benefitTransferRate')} /> </Label>
                              </FormGroup>
                            )
                          }
                        </Field>
                </Col>

              </Row>
            </div>
          ) : null}
          <div className="mt-3 mb-3">
            <PaymentMethods/>
          </div>
          <StepFooter errors={errors} onClickNext={() => {
            setValidateAfterSubmit(true)
            submitForm().then()
          }} />
        </>
      )}
    </Formik>
  )
}

export default HomePrivateStep2
