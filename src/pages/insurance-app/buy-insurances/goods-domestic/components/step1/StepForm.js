import { BaseFormGroup, Button, HttpClient } from 'base-app'
import { FieldArray } from 'formik'
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Col, FormGroup, Row } from 'reactstrap'
import TitleRow from '../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesGoods'
import { KEY_GOODS_SUGGESTION } from '../../../../../../redux/reducers/insurance-app/buyInsurancesGoods'
import { fillMultipleStepInfo, isObjEmpty } from '../../../../../../ultity'
import AddtionalVehicel from './form-components/AddtionalVehicel'
import FullAddress from './form-components/FullAddress'
import GoodsInfo from './form-components/GoodsInfo'
import PopupConditionBuyInsurance from './form-components/popupConditionBuyInsurance'
import {
  addtionalVehicelInitValue,
  IDTypes,
  KEY_ADDRESS,
  KEY_ADDRESS_BENEFICIARY,
  KEY_ADD_VEHICEL,
  KEY_CITY,
  KEY_CITY_BENEFICIARY,
  KEY_CLICKED_CLOSE_POPUP,
  KEY_DISTRICT,
  KEY_DISTRICT_BENEFICIARY,
  KEY_EMAIL,
  KEY_EMAIL_BENEFICIARY,
  KEY_FULLNAME,
  KEY_FULLNAME_BENEFICIARY,
  KEY_GOODS,
  KEY_GOODS_TYPE,
  KEY_PHONE_NUMBER,
  KEY_PHONE_NUMBER_BENEFICIARY,
  KEY_VEHICEL_CONTRACT_NO,
  KEY_VEHICEL_CONTRACT_NO_DATE,
  KEY_VEHICEL_INVOICE_NUMBER,
  KEY_VEHICEL_INVOICE_NUMBER_DATE,
  KEY_VEHICEL_NAME,
  KEY_VEHICEL_NUMBER_PLATE,
  KEY_VEHICEL_TYPE,
  KEY_WARD,
  KEY_WARD_BENEFICIARY
} from './formikConfig'

const AddtionalVehicelBlock = ({
  index,
  keyMaps,
  errors,
  touched,
  IDTypes,
  setFieldValue,
  values,
  getFieldMeta,
  resetForm,
  setValues,
  vehicelTypeSugg
}) => {
  return (
    <>
      <AddtionalVehicel
        index={index}
        stepInfo={{
          errors,
          touched,
          setFieldValue,
          values,
          getFieldMeta,
          resetForm,
          setValues,
          IDTypes
        }}
        keyMaps={{
          KEY_VEHICEL_NUMBER_PLATE: keyMaps.KEY_VEHICEL_NUMBER_PLATE,
          KEY_VEHICEL_NAME: keyMaps.KEY_VEHICEL_NAME,
          KEY_VEHICEL_TYPE: keyMaps.KEY_VEHICEL_TYPE,
          KEY_VEHICEL_CONTRACT_NO: keyMaps.KEY_VEHICEL_CONTRACT_NO,
          KEY_VEHICEL_CONTRACT_NO_DATE: keyMaps.KEY_VEHICEL_CONTRACT_NO_DATE,
          KEY_VEHICEL_INVOICE_NUMBER: keyMaps.KEY_VEHICEL_INVOICE_NUMBER,
          KEY_VEHICEL_INVOICE_NUMBER_DATE:
            keyMaps.KEY_VEHICEL_INVOICE_NUMBER_DATE
        }}
        className='mt-2'
        vehicelTypeSugg={vehicelTypeSugg}
      />

      <div
        style={{
          backgroundColor: '#d8d8d8',
          height: '1px',
          width: ' 100%',
          marginTop: '2rem'
        }}
        className='mb-1'
      />
    </>
  )
}

const StepForm = ({ stepInfo, className, formik }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(true)
  const intl = useIntl()
  const { step_1 } = stepInfo
  const {
    errors,
    touched,
    setFieldValue,
    values,
    getFieldMeta,
    resetForm,
    setValues,
    initialValues
  } = formik
  const [vehicelTypeSugg, setVehicelTypeSugg] = useState([])
  const [goodsTypeSugg, setGoodsTypeSugg] = useState([])
  const dispatch = useDispatch()
  const togglePopup = () => {
    setIsOpenPopup(!isOpenPopup)
    setFieldValue([KEY_CLICKED_CLOSE_POPUP], true)
  }

  React.useEffect(() => {
    if (isObjEmpty(step_1)) {
      return
    }
    fillMultipleStepInfo(step_1, initialValues, setValues)
  }, [])

  React.useEffect(() => {
    const __value = { ...step_1 }
    const getVehicelTypeAndGoodsType = async () => {
      const res = await HttpClient.get(
        'nth/homeinsurance/api/authenticate/cs-fee-value'
      )
      if (res.status === 200) {
        const __newData = res.data.map((_elt) => {
          const __transportations = _elt.transportations.map((__elt) => {
            return {
              label: __elt.transportationName,
              value: __elt.transportationCode
            }
          })
          return {
            ..._elt,
            label: _elt.packageName,
            value: _elt.packageCode,
            transportations: __transportations
          }
        })
        setGoodsTypeSugg(__newData)
        dispatch(
          updateProps(
            [
              {
                prop : KEY_GOODS_SUGGESTION , 
                value : __newData
              }
            ]
          )
        )
        if (!isObjEmpty(__value)) {
          const _vehicel = __newData.find(
            (__elt) => __elt.value === __value[KEY_GOODS_TYPE]
          )?.transportations
          setVehicelTypeSugg(_vehicel)
         
        }
      }
    }
    getVehicelTypeAndGoodsType()
  }, [])

  return (
    <div className={className}>
      {getFieldMeta([KEY_CLICKED_CLOSE_POPUP]).value ? null : (
        <PopupConditionBuyInsurance
          isOpen={isOpenPopup}
          togglePopup={togglePopup}
        />
      )}
      <>
        <Row className={'mt-2'}>
          <Col xs={12} md={4}>
            <FormGroup className='position-relative'>
              <BaseFormGroup
                fieldName={KEY_FULLNAME}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`Name`)}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={4}>
            <FormGroup className='form-label-group position-relative'>
              <BaseFormGroup
                fieldName={KEY_PHONE_NUMBER}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`PhoneNum`)}
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={4}>
            <FormGroup className='form-label-group position-relative'>
              <BaseFormGroup
                fieldName={KEY_EMAIL}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`EmailTitle`)}
              />
            </FormGroup>
          </Col>
        </Row>
        {React.useMemo(() => (
          <FullAddress
            keyMaps={{
              KEY_CITY: KEY_CITY,
              KEY_DISTRICT: KEY_DISTRICT,
              KEY_WARD: KEY_WARD,
              KEY_ADDRESS: KEY_ADDRESS
            }}
          />
        ))}
      </>
      <TitleRow
        msg={
          <FormattedMessage id={getKeyLang(`antin.beneficiaryInformation`)} />
        }
        className='mt-1 font-medium-5'
        type='title-insurance'
      />

      {/* ================== NGƯỜI THỤ HƯỞNG ================= */}

      {/* <AddtionalPeople errors={errors} touched={touched} /> */}

      <Row className={'mt-2'}>
        <Col xs={12} md={4}>
          <BaseFormGroup
            fieldName={KEY_FULLNAME_BENEFICIARY}
            errors={errors}
            touched={touched}
            messageId={getKeyLang(`Name`)}
          />
        </Col>
        <Col xs={12} md={4}>
          <BaseFormGroup
            fieldName={KEY_PHONE_NUMBER_BENEFICIARY}
            errors={errors}
            touched={touched}
            messageId={getKeyLang(`PhoneNum`)}
          />
        </Col>

        <Col xs={12} md={4}>
          <BaseFormGroup
            fieldName={KEY_EMAIL_BENEFICIARY}
            errors={errors}
            touched={touched}
            messageId={getKeyLang(`EmailTitle`)}
          />
        </Col>
      </Row>
      {React.useMemo(() => (
        <FullAddress
          keyMaps={{
            KEY_CITY: KEY_CITY_BENEFICIARY,
            KEY_DISTRICT: KEY_DISTRICT_BENEFICIARY,
            KEY_WARD: KEY_WARD_BENEFICIARY,
            KEY_ADDRESS: KEY_ADDRESS_BENEFICIARY
          }}
        />
      ))}
      {/* ======================== HÀNG HOÁ==================== */}
      <TitleRow
        msg={<FormattedMessage id={getKeyLang(`goods.goodsInfo`)} />}
        className='mb-2 font-medium-5'
        type='title-insurance'
      />

      <GoodsInfo
        errors={errors}
        getFieldMeta={getFieldMeta}
        touched={touched}
        setFieldValue={setFieldValue}
        values={values}
        goodsTypeSugg={goodsTypeSugg}
        setVehicelTypeSugg={setVehicelTypeSugg}
      />
      {/* ======================== PHƯƠNG TIỆN==================== */}
      <TitleRow
        msg={<FormattedMessage id={getKeyLang(`goods.vehicelInfo`)} />}
        className='mb-2 font-medium-5'
        type='title-insurance'
      />
      <FieldArray name={KEY_ADD_VEHICEL}>
        {({ remove, push }) => {
          let addtionalVehicel = getFieldMeta(KEY_ADD_VEHICEL).value
          const _values = { ...values }
          if (!Array.isArray(addtionalVehicel)) {
            addtionalVehicel = []
          }
          return (
            <>
              {addtionalVehicel.map((elt, index) => {
                return (
                  <AddtionalVehicelBlock
                    key={index}
                    keyMaps={{
                      KEY_VEHICEL_NUMBER_PLATE: `${KEY_ADD_VEHICEL}.${index}.${KEY_VEHICEL_NUMBER_PLATE}`,
                      KEY_VEHICEL_NAME: `${KEY_ADD_VEHICEL}.${index}.${KEY_VEHICEL_NAME}`,
                      KEY_VEHICEL_TYPE: `${KEY_ADD_VEHICEL}.${index}.${KEY_VEHICEL_TYPE}`,
                      KEY_VEHICEL_CONTRACT_NO: `${KEY_ADD_VEHICEL}.${index}.${KEY_VEHICEL_CONTRACT_NO}`,
                      KEY_VEHICEL_CONTRACT_NO_DATE: `${KEY_ADD_VEHICEL}.${index}.${KEY_VEHICEL_CONTRACT_NO_DATE}`,
                      KEY_VEHICEL_INVOICE_NUMBER: `${KEY_ADD_VEHICEL}.${index}.${KEY_VEHICEL_INVOICE_NUMBER}`,
                      KEY_VEHICEL_INVOICE_NUMBER_DATE: `${KEY_ADD_VEHICEL}.${index}.${KEY_VEHICEL_INVOICE_NUMBER_DATE}`
                    }}
                    index={index}
                    remove={remove}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    values={values}
                    getFieldMeta={getFieldMeta}
                    resetForm={resetForm}
                    setValues={setValues}
                    vehicelTypeSugg={vehicelTypeSugg}
                  />
                )
              })}

              <Row className='mt-3'>
                <Col xs={0} md={6} />
                <Col xs={6} md={3}>
                  {getFieldMeta(KEY_ADD_VEHICEL).value.length > 1 && (
                    <Button
                      color='danger'
                      className='w-100'
                      onClick={() => {
                        remove(getFieldMeta(KEY_ADD_VEHICEL).value.length - 1)
                      }}
                    >
                      <FormattedMessage id={getKeyLang(`remove`)} />
                    </Button>
                  )}
                </Col>
                <Col xs={6} md={3}>
                  <Button
                    color='primary'
                    className='w-100'
                    onClick={() => {
                      push(addtionalVehicelInitValue)
                    }}
                  >
                    <FormattedMessage id={getKeyLang(`goods.addVehicel`)} />
                  </Button>
                </Col>
              </Row>
            </>
          )
        }}
      </FieldArray>
    </div>
  )
}

export default StepForm
