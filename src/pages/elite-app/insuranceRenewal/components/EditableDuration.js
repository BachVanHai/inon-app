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
import { isObjEmpty } from '../../../../ultity'
import {
  KEY_ADDTIONAL_TERM_ALL,
  KEY_ADDTIONAL_TERM_MAIN,
  KEY_ADD_RESPONSIBILITY_VALUE_MOTOR,
  KEY_COMPANPANY_ID,
  KEY_DATE_INSUR_FROM_MOTOR,
  KEY_DURATION,
  KEY_DURATION_BBTNDS,
  KEY_DURATION_BHVC,
  KEY_GTBH_YEUCAU,
  KEY_GT_XE_KHAIBAO,
  KEY_MIN_XTRIEU_TAI_HANHKHACH,
  KEY_TOGGLE_BBTNDS,
  KEY_TOGGLE_CAR_CONNGUOI,
  KEY_TOGGLE_CAR_HANGHOA,
  KEY_TOGGLE_CAR_TNDS,
  KEY_TOGGLE_CAR_TNDS_TN,
  KEY_TOGGLE_CAR_VATCHAT,
  KEY_TOGGLE_TAI_NAN,
  KEY_XTRIEU_HANGHOA_VANCHUYEN,
  KEY_XTRIEU_NGUOI_TREN_XE,
  KEY_XTRIEU_NGUOI_VU,
  KEY_XTRIEU_TAISAN_VU,
  KEY_XTRIEU_TAI_HANHKHACH
} from '../formikConfig'
import { ALL, LOAD, SEAT, _MIN_INITVALUE } from '../utility'
import BBtnds from './BBtnds'
import BBtndsMotor from './BBtndsMotor'
import BhhhCar from './BhhhCar'
import BhtnCar from './BhtnCar'
import BhtnMotor from './BhtnMotor'
import BhtnplxCar from './BhtnplxCar'
import BhvcCar from './BhvcCar'
import CalFeeDone from './CalFeeDone'
import ToggleRow from './ToggleRow'
const Info = styled.div`
  /* background-color: #f4f9f4; */
  background: linear-gradient(
      90deg,
      #106d5a 20.27%,
      rgba(16, 109, 90, 0) 136.87%
    ),
    linear-gradient(283.11deg, #106d5a -16.63%, #73c14f 90.56%);
  /* background-image: url('../../../../assets/images/elite-app/layouts/side-nav'); */
  color: #fff;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .title-text {
    color: #ffd51e !important;
  }
`
const InfoRow = styled(Row)`
  min-height: 3.4rem;
`

const EditableDuration = ({
  saveCallback,
  title,
  details,
  contractId,
  companyId,
  className,
  insuranceType,
  setActionFeeStatus
}) => {
  const { dataFees , contractInfo  } = useSelector((state) => state.app.renewalInsurance)
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

  // console.log("contractInfo.capacityType", contractInfo.capacityType);

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
            <b
              className='font-medium-4 font-weight-bold text-primary-highlight letter-uppercase text-uppercase'
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
                  <div className='mb-1'>
                    {' '}
                    <span className='font-medium-4 font-weight-bold mb-5'>
                      {elt?.title}
                    </span>
                  </div>
                  {elt.info &&
                    elt.info.map((_info, item) => (
                      <InfoRow key={item}>
                        <Col
                          xs={12}
                          md={4}
                          className='font-weight-bold mb-1 d-flex align-items-center title-text pl-2'
                        >
                          <span className='font-medium-2'>{_info.label}</span>
                        </Col>

                        <Col
                          xs={12}
                          md={8}
                          className='d-flex mb-1 align-items-center pl-2'
                        >
                          <span className='font-medium-2'>{_info.content}</span>
                        </Col>
                      </InfoRow>
                    ))}
                </div>
              )
            })}
        </Info>
      ) : (
        <div className='mt-1'>
          {/* trách nhiệm dân sự xe máy  */}
          {insuranceType === 'MC' ? (
            <>
              <ToggleRow
                msgField={getKeyLang('insurance.MOTOR_TNDS')}
                fieldName={KEY_TOGGLE_BBTNDS}
                isHideIcon={true}
              />
              {getFieldMeta(KEY_TOGGLE_BBTNDS).value && (
                <BBtndsMotor
                  setFieldValue={setFieldValue}
                  getFieldMeta={getFieldMeta}
                />
              )}
              {/* tự nguyện xe máy  */}
              <ToggleRow
                msgField={getKeyLang(`insurance.MOTOR_CONNGUOI`)}
                fieldName={KEY_TOGGLE_TAI_NAN}
                isHideIcon={true}
                toggleOnChange={() => {
                  if (getFieldMeta(KEY_TOGGLE_TAI_NAN).value) {
                    setFieldValue(KEY_TOGGLE_TAI_NAN, false)
                    return
                  }
                  setFieldValue(KEY_TOGGLE_TAI_NAN, true)
                }}
              />
              {getFieldMeta(KEY_TOGGLE_TAI_NAN).value && (
                <BhtnMotor
                  _defaulChecks={_defaulChecks}
                  getFieldMeta={getFieldMeta}
                />
              )}
            </>
          ) : (
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
              <div className='mt-1'>
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
              </div>
              {/* vật chất xe ô tô */}
              <div className='mt-1'>
                <ToggleRow
                  msgField={getKeyLang(`insurance.bhvc`)}
                  fieldName={KEY_TOGGLE_CAR_VATCHAT}
                  isHideIcon={true}
                  toggleOnChange={() => {
                    if (getFieldMeta(KEY_TOGGLE_CAR_VATCHAT).value) {
                      setFieldValue(KEY_TOGGLE_CAR_VATCHAT, false)
                      return
                    }
                    if (
                      getFieldMeta(KEY_GT_XE_KHAIBAO).value === 0.0 &&
                      getFieldMeta(KEY_GTBH_YEUCAU).value === 0.0
                    ) {
                      setFieldValue(KEY_GT_XE_KHAIBAO, _MIN_INITVALUE)
                      setFieldValue(KEY_GTBH_YEUCAU, _MIN_INITVALUE)
                    }
                    setFieldValue(KEY_TOGGLE_CAR_VATCHAT, true)
                  }}
                />
                {getFieldMeta(KEY_TOGGLE_CAR_VATCHAT).value && (
                  <BhvcCar
                    errors={errors}
                    values={values}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    getFieldMeta={getFieldMeta}
                    disableContinueBtn={disableContinueBtn}
                  />
                )}
              </div>
              {/* tai nạn phụ lái  */}
              {
                contractInfo.capacityType === ALL ||  contractInfo.capacityType === SEAT ? 
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
                  />
                )}
              </div> : null
              }
             
              {/* hàng hoá xe ô tô */}

              {
                contractInfo.capacityType === ALL ||  contractInfo.capacityType === LOAD ? 
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
              </div> : null
              }
             
            </>
          )}

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

      <div className='mt-1 font-medium-2 d-flex justify-content-end'>
        {isEditMode ? (
          <>
            <Button color='primary' className='mr-2' onClick={toggleModify}>
              <FormattedMessage id={getKeyLang('SaveFee')} />
            </Button>
            {/* {
                            actionFeeStatus ? <Button className='text-primary'
                                onClick={toggleModify}
                                color="primary"
                            >
                                <FormattedMessage id={getKeyLang("SaveFee")} />

                            </Button> : null
                        } */}
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
    </div>
  )
}

export default EditableDuration
