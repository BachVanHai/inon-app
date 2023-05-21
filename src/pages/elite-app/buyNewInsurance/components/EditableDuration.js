import { Button } from 'base-app'
import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import styled from 'styled-components'
import { PAYMENT_TYPE_FUND_TRANSFER } from '../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../configs/elite-app'
import { COMPANIES } from '../../../../configs/insurance-app'
import { isObjEmpty } from '../../../../ultity'
import {
  KEY_ADDTIONAL_TERM_ALL,
  KEY_ADDTIONAL_TERM_MAIN,
  KEY_ADD_RESPONSIBILITY_VALUE_MOTOR,
  KEY_CAPACITYTYPE,
  KEY_COMPANPANY_ID,
  KEY_DATE_INSUR_FROM_MOTOR,
  KEY_DURATION,
  KEY_DURATION_BBTNDS,
  KEY_DURATION_BHVC, KEY_MIN_XTRIEU_TAI_HANHKHACH,
  KEY_NUM_IN_CAR,
  KEY_SEATS,
  KEY_TOGGLE_BBTNDS,
  KEY_TOGGLE_CAR_CONNGUOI,
  KEY_TOGGLE_CAR_HANGHOA,
  KEY_TOGGLE_CAR_TNDS,
  KEY_TOGGLE_CAR_TNDS_TN,
  KEY_TOGGLE_CAR_VATCHAT,
  KEY_TOGGLE_TAI_NAN, KEY_XTRIEU_HANGHOA_VANCHUYEN,
  KEY_XTRIEU_NGUOI_TREN_XE,
  KEY_XTRIEU_NGUOI_VU,
  KEY_XTRIEU_TAISAN_VU,
  KEY_XTRIEU_TAI_HANHKHACH
} from '../formikConfig'
import { ALL, SEAT } from '../utility'
import BBtnds from './BBtnds'
import BhtnplxCar from './BhtnplxCar'
import CalFeeDone from './CalFeeDone'
import ToggleRow from './ToggleRow'
import inonIconSmall from "../../../../assets/images/elite-app/buy-insurance/logo-company-icon-buy-zalo.svg";
const Info = styled.div`
  /* background-color: #f4f9f4; */
  /* background: linear-gradient(
      90deg,
      #106d5a 20.27%,
      rgba(16, 109, 90, 0) 136.87%
    ),
    linear-gradient(283.11deg, #106d5a -16.63%, #73c14f 90.56%); */
  /* background-image: url('../../../../assets/images/elite-app/layouts/side-nav'); */
  background-color: #fff;
  color: #000;
  border-radius: 15px;
  /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
  .title-text {
    color: #8b8b8b !important;
  }
  .title-config-insurance-turn-on{
    color: #73c14f;
  }
`
const InfoRow = styled(Row)`
  min-height: 3.4rem;
`
const RowCompany = styled(Row)`
  background: #fff;
  color: #000;
  padding: 20px;
  border-radius: 20px;
  /* width: 90%; */
`
const EditableDuration = ({
  saveCallback,
  title,
  details,
  contractId,
  companyId,
  className,
  insuranceType,
  setActionFeeStatus , 
  isHiddenBtnEdit = false
}) => {
  const { dataFees, contractInfo } = useSelector(
    (state) => state.app.renewalInsurance
  )
  // const { contractInfo } = useSelector((state) => state.app.renewalInsurance)
  const intl = useIntl()
  const history = useHistory()
  const dispatch = useDispatch()
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [lastSavedValues, setLastSavedValues] = React.useState({})
  const { setFieldValue, getFieldMeta, values, setValues, errors, touched } =
    useFormikContext()

  const disableContinueBtn = () => {
    // dispatch(updateSpecificProp(KEY_HAS_CAL_FEE_DONE, false))
  }
  const getInsurInfoValues = () => {
    const _values = {}
    _values[KEY_TOGGLE_CAR_TNDS] = values[KEY_TOGGLE_CAR_TNDS]
    _values[KEY_TOGGLE_CAR_TNDS_TN] = values[KEY_TOGGLE_CAR_TNDS_TN]
    _values[KEY_TOGGLE_CAR_VATCHAT] = values[KEY_TOGGLE_CAR_VATCHAT]
    _values[KEY_TOGGLE_CAR_CONNGUOI] = values[KEY_TOGGLE_CAR_CONNGUOI]
    _values[KEY_TOGGLE_CAR_HANGHOA] = values[KEY_TOGGLE_CAR_HANGHOA]
    _values[KEY_TOGGLE_BBTNDS] = values[KEY_TOGGLE_BBTNDS]
    _values[KEY_TOGGLE_TAI_NAN] = values[KEY_TOGGLE_TAI_NAN]
    _values[KEY_DURATION_BBTNDS] = values[KEY_DURATION_BBTNDS]
    _values[KEY_DURATION_BHVC] = values[KEY_DURATION_BHVC]
    _values[KEY_XTRIEU_NGUOI_VU] = values[KEY_XTRIEU_NGUOI_VU]
    _values[KEY_XTRIEU_TAISAN_VU] = values[KEY_XTRIEU_TAISAN_VU]
    _values[KEY_XTRIEU_TAI_HANHKHACH] = values[KEY_XTRIEU_TAI_HANHKHACH]
    _values[KEY_MIN_XTRIEU_TAI_HANHKHACH] = values[KEY_MIN_XTRIEU_TAI_HANHKHACH]
    _values[KEY_XTRIEU_HANGHOA_VANCHUYEN] = values[KEY_XTRIEU_HANGHOA_VANCHUYEN]
    _values[KEY_XTRIEU_NGUOI_TREN_XE] = values[KEY_XTRIEU_NGUOI_TREN_XE]
    _values[KEY_ADD_RESPONSIBILITY_VALUE_MOTOR] =
      values[KEY_ADD_RESPONSIBILITY_VALUE_MOTOR]
    _values[KEY_DURATION] = values[KEY_DURATION]
    _values[KEY_ADDTIONAL_TERM_ALL] = values[KEY_ADDTIONAL_TERM_ALL]
    _values[KEY_ADDTIONAL_TERM_MAIN] = values[KEY_ADDTIONAL_TERM_MAIN]
    _values[KEY_COMPANPANY_ID] = values[KEY_COMPANPANY_ID]
    _values[KEY_DATE_INSUR_FROM_MOTOR] = values[KEY_DATE_INSUR_FROM_MOTOR]
    return _values
  }

  const _infoValues = getInsurInfoValues()

  const toggleModify = async () => {
    if (!isEditMode) {
      setLastSavedValues({ ...values })
      setIsEditMode(true)
      return
    }
    setIsEditMode(false)
    saveCallback && saveCallback()
  }


  const cancelModify = () => {   
    setIsEditMode(false)
    setValues(lastSavedValues)
  }
  const HandelFee = async () => {
    setActionFeeStatus(true)
    saveCallback && saveCallback()
  }

  const handleChecks = (val) => {
    setFieldValue(KEY_ADD_RESPONSIBILITY_VALUE_MOTOR, val)
  }
  const _defaulChecks = [
    {
      value: 5,
      handleChange: handleChecks,
      title: 5 + intl.formatMessage({ id: getKeyLang(`AboutManUnit`) })
    },
    {
      value: 10,
      handleChange: handleChecks,
      title: 10 + intl.formatMessage({ id: getKeyLang(`AboutManUnit`) })
    }
  ]
  const company = COMPANIES.find((_elt) => _elt.companyId === companyId)
  useEffect(() => {
    const getDataFees = async () => {
      if (!isObjEmpty(contractInfo)) {
        saveCallback && saveCallback()
      }
    }
    getDataFees()
  }, [JSON.stringify(_infoValues)])

  return (
    <div className={className}>
      <Row className='mb-1'>
        <Col xs={12} md={12} className=''>
          <div className='d-flex align-items-center'>
           <img src={inonIconSmall} /> <b
              className='font-medium-1 ml-1 font-weight-bold text-primary-highlight letter-uppercase text-uppercase'
              style={{ color: '#2B7E6C' }}
            >
              {title}
            </b>
          </div>
        </Col>
      </Row>

      {!isEditMode ? (
        <Info>
        
          {details &&
            details.map((elt, index) => {
              return (
                <div key={index}>
                  <div className='mb-2'>
                    {' '}
                    <span className='font-medium-2 font-weight-bold mb-5 title-config-insurance-turn-on'>
                      {elt?.title}
                    </span>
                  </div>
                  {elt.info &&
                    elt.info.map((_info, item) => (
                      <InfoRow key={item}>
                        <Col
                          xs={_info?.xs ? _info?.xs :  6}
                          md={_info?.md ? _info?.md :  4}
                          className='font-weight-bold mb-1 d-flex align-items-center title-text pl-2'
                        >
                          <span>{_info.label}</span>
                        </Col>

                        <Col
                           xs={_info?.xs ? _info?.xs :  6}
                           md={_info?.md ? _info?.md :  8}
                          className='d-flex mb-1 align-items-center pl-2'
                        >
                          <span >{_info.content}</span>
                        </Col>
                      </InfoRow>
                    ))}
                </div>
              )
            })}
        </Info>
      ) : (
        <div className='mt-1'>
       <>
              <ToggleRow
                msgField={getKeyLang('insurance.CAR_TNDS')}
                fieldName={KEY_TOGGLE_CAR_TNDS}
                isHideIcon={true}
              />
              {getFieldMeta(KEY_TOGGLE_CAR_TNDS).value && (
                <BBtnds
                  errors={errors}
                  values={values}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  getFieldMeta={getFieldMeta}
                  disableContinueBtn={disableContinueBtn}
                />
              )}
              {/* tự nguyện */}
              {/* <div className='mb-3'>
                <ToggleRow
                  msgField={getKeyLang(`insurance.TNDSTNCAR`)}
                  fieldName={KEY_TOGGLE_CAR_TNDS_TN}
                  isHideIcon={true}
                  toggleOnChange={() => {
                    if (getFieldMeta(KEY_TOGGLE_CAR_TNDS_TN).value) {
                      setFieldValue(KEY_TOGGLE_CAR_TNDS_TN, false)
                      return
                    }
                    setFieldValue(KEY_TOGGLE_CAR_TNDS_TN, true)
                  }}
                />
                {getFieldMeta(KEY_TOGGLE_CAR_TNDS_TN).value && (
                  <BhtnCar
                    errors={errors}
                    values={values}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    getFieldMeta={getFieldMeta}
                    disableContinueBtn={disableContinueBtn}
                  />
                )}
              </div> */}
              {/* tai nạn phụ lái  */}
              {getFieldMeta(KEY_CAPACITYTYPE).value === ALL ||
              getFieldMeta(KEY_CAPACITYTYPE).value === SEAT ? (
                <div className='mt-1'>
                  <ToggleRow
                    msgField={getKeyLang(`insurance.CAR_CONNGUOI`)}
                    fieldName={KEY_TOGGLE_CAR_CONNGUOI}
                    isHideIcon={true}
                    toggleOnChange={() => {
                      if (getFieldMeta(KEY_TOGGLE_CAR_CONNGUOI).value) {
                        setFieldValue(KEY_TOGGLE_CAR_CONNGUOI, false)
                        return
                      }
                      setFieldValue(KEY_TOGGLE_CAR_CONNGUOI, true)
                      setFieldValue(KEY_NUM_IN_CAR , getFieldMeta(KEY_SEATS).value)
                    }}
                  />
                  {getFieldMeta(KEY_TOGGLE_CAR_CONNGUOI).value && (
                    <BhtnplxCar
                      errors={errors}
                      values={values}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      getFieldMeta={getFieldMeta}
                      disableContinueBtn={disableContinueBtn}
                      onBlurChangeSeatValues={saveCallback}
                    />
                  )}
                </div>
              ) : null}

              {/* hàng hoá xe ô tô */}

              {/* {getFieldMeta(KEY_CAPACITYTYPE).value === ALL ||
              getFieldMeta(KEY_CAPACITYTYPE).value === LOAD ? (
                <div className='mt-1'>
                  <ToggleRow
                    msgField={getKeyLang(`insurance.CAR_HANGHOA`)}
                    fieldName={KEY_TOGGLE_CAR_HANGHOA}
                    isHideIcon={true}
                    toggleOnChange={() => {
                      if (getFieldMeta(KEY_TOGGLE_CAR_HANGHOA).value) {
                        setFieldValue(KEY_TOGGLE_CAR_HANGHOA, false)
                        return
                      }
                      setFieldValue(KEY_TOGGLE_CAR_HANGHOA, true)
                    }}
                  />
                  {getFieldMeta(KEY_TOGGLE_CAR_HANGHOA).value && (
                    <BhhhCar
                      errors={errors}
                      values={values}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      getFieldMeta={getFieldMeta}
                      disableContinueBtn={disableContinueBtn}
                    />
                  )}
                </div>
              ) : null} */}
            </>
          <div className='mt-1'>
            <CalFeeDone
              dataFees={dataFees}
              contractId={contractId}
              paymentType={PAYMENT_TYPE_FUND_TRANSFER}
              companyId={companyId}
              className='mt-2'
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      )}
      {
        isHiddenBtnEdit ? null :  <div className='mt-1 font-medium-2 d-flex justify-content-end'>
        {isEditMode ? (
          <>
            <Button color='primary' className='mr-2' onClick={toggleModify}>
              <FormattedMessage id={getKeyLang('SaveFee')} />
            </Button>
          </>
        ) : (
          <Button.Ripple className='text-primary' onClick={toggleModify}>
            <FormattedMessage id={getKeyLang('change')} />
          </Button.Ripple>
        )}

        {isEditMode && (
          <Button.Ripple className='ml-2' onClick={cancelModify}>
            <FormattedMessage id={getKeyLang('ConfirmCancel')} />
          </Button.Ripple>
        )}
      </div>
      }
     
    </div>
  )
}

export default EditableDuration
