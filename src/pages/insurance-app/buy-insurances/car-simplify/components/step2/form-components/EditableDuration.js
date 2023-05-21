import React from 'react'
import { Col, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import ToggleRow from '../../../../../../../components/insurance-app/common-forms/toggle-row/ToggleRow'
import RadioRow from '../../../../../../../components/insurance-app/common-forms/toggle-row/RadioRow'
import SliderRow from '../../../../../../../components/insurance-app/common-forms/slider-row'
import { getTextClassesBy } from '../../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { DATE_FORMAT } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Slider, { Handle } from 'rc-slider'
import {
  initialValues,
  // KEY_ADD_RESPONSIBILITY_VALUE,
  KEY_AMOUNT_PEOPLE_EACH_CAR,
  KEY_DATE_INSUR_FROM,
  KEY_DATE_INSUR_TO,
  KEY_DURATION_BBTNDS,
  KEY_NUM_IN_CAR,
  KEY_SEATS_PERSON_SITTING_IN_THE_CAR,
  KEY_TIME_INSUR_FROM,
  KEY_TIME_INSUR_TO,
  KEY_TOGGLE_BBTNDS,
  KEY_TOGGLE_TNLPL,
  KEY_XTRIEU_NGUOI_TREN_XE,
  sliderInfo,
  sliderPersonInfo
} from '../formikConfig'
import CalFeeDone from './CalFeeDone'
import { useFormik, useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { calculateFee, get_Insurance_Object, get_Insurance_Update_Object } from '../utility'
import { useDispatch } from 'react-redux'
import { isObjEmpty } from '../../../../../../../ultity'
import { BaseAppUltils, BaseFormGroup } from 'base-app'
import BBTNDSInsurCar from './BBTndsInsurCar'
import TaiNanInsurCar from './TaiNanInsurCar'

const Info = styled.div`
  background-color: #f4f9f4;
  padding: 0.5rem;
`
const InfoRow = styled(Row)`
  min-height: 3.4rem;
`

const ButtonStyled = styled.div`
  cursor: pointer;
  padding: 5px 13px;
  border: solid 1px;
  border-color: ${(p) => p.borderColor || 'inherit'};
  border-radius: 0.5rem;
`
const InputPersonInCar = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 100px;
  }
  label {
    display: none !important;
  }
`
const Value = styled.div`
  margin-top: -32px;
  white-space: nowrap;
  color: red;
  font-size: 12px;
  text-align: center;
  border-radius: 2px;
  background: #0e6856;
  border: 1px solid #737373;
  padding: 2px;
  color: #f9f9f9;
  margin-bottom: 20px;
  opacity: 0.9;
`

function MyHandle(props) {
  const { value, dragging, index, ...rest } = props
  return (
    <FlexHandle key={index} value={value} {...rest}>
      {dragging && <Value>{value}</Value>}
    </FlexHandle>
  )
}

const FlexHandle = styled(Handle)`
  display: flex;
  justify-content: center;
`

const EditableDuration = ({
  saveCallback,
  title,
  details,
  contractInfo,
  dataFees,
  contractId,
  paymentType,
  companyId,
  className,
  errors,
  touched,
  toggleValidateChange
}) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [lastSavedValues, setLastSavedValues] = React.useState({})
  const { setFieldValue, getFieldMeta, values, setValues } = useFormikContext()
  
  const getInsurInfoValues = () => {
    const _values = {}
    _values[KEY_TOGGLE_BBTNDS] = values[KEY_TOGGLE_BBTNDS]
    _values[KEY_DURATION_BBTNDS] = values[KEY_DURATION_BBTNDS]
    _values[KEY_DATE_INSUR_FROM] = values[KEY_DATE_INSUR_FROM]
    _values[KEY_TIME_INSUR_FROM] = values[KEY_TIME_INSUR_FROM]
    _values[KEY_DATE_INSUR_TO] = values[KEY_DATE_INSUR_TO]
    _values[KEY_TIME_INSUR_TO] = values[KEY_TIME_INSUR_TO]
    _values[KEY_TOGGLE_TNLPL] = values[KEY_TOGGLE_TNLPL]
    _values[KEY_XTRIEU_NGUOI_TREN_XE] = values[KEY_XTRIEU_NGUOI_TREN_XE]
    return _values
  }

  const _infoValues = getInsurInfoValues()

  const toggleModify = () => {
    if (!isEditMode) {
      setLastSavedValues({ ...values })
      setIsEditMode(true)
      return
    }
    if (values[KEY_TOGGLE_TNLPL] && errors[KEY_NUM_IN_CAR]) {
      BaseAppUltils.toastError(
        "Vui lòng nhập đúng thông tin bắt buộc !"
      )
      return
    }
    setIsEditMode(false)
    saveCallback && saveCallback()
  }

  const cancelModify = () => {
    setIsEditMode(false)
    toggleValidateChange(false)
    setValues(lastSavedValues)
  }

  const handleChecks = (val) => {
    // setFieldValue(KEY_ADD_RESPONSIBILITY_VALUE, val)
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
   React.useEffect(() => {
        if (isObjEmpty(contractInfo) || !contractId ) return
        calculateFee(dispatch, contractId, contractInfo.insurances , values , true)
      }, [JSON.stringify(_infoValues)])

  return (
    <div className={className}>
      <Row className='mb-1'>
        <Col xs={12} md={12} className=''>
          <b className='font-medium-4 font-weight-bold text-primary-highlight letter-uppercase'>
            {title}
          </b>
        </Col>
      </Row>

      {!isEditMode ? (
        <Info>
          {details.map((elt, index) => {
            return (
              <InfoRow key={index}>
                <Col
                  xs={6}
                  md={4}
                  className='primary d-flex align-items-center pl-2'
                >
                  <span className='font-medium-2'>{elt.label}</span>
                </Col>

                <Col xs={6} md={8} className='d-flex align-items-center pl-2'>
                  <span className='font-medium-2 overflow-auto'>{elt.content}</span>
                </Col>
              </InfoRow>
            )
          })}
        </Info>
      ) : (
        <div className='mt-1'>
          <ToggleRow
            msgField={getKeyLang(`InsBBTNDSCar`)}
            fieldName={KEY_TOGGLE_BBTNDS}
            isHideIcon={true}
          />
          {getFieldMeta(KEY_TOGGLE_BBTNDS).value && (
              <BBTNDSInsurCar
              values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta}
              // disableContinueBtn={disableContinueBtn}
          />
          )}

          <ToggleRow
            msgField={getKeyLang(`InsBHTNLPXNTX`)}
            fieldName={KEY_TOGGLE_TNLPL}
            isHideIcon={true}
            toggleOnChange={() => {
              if (getFieldMeta(KEY_TOGGLE_TNLPL).value) {
                setFieldValue(KEY_TOGGLE_TNLPL, false)
                return
              }
              setFieldValue(KEY_TOGGLE_TNLPL, true)
            }}
          />
          {getFieldMeta(KEY_TOGGLE_TNLPL).value && (
            <>
            <TaiNanInsurCar values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta} toggleValidateChange={toggleValidateChange}/>
            </>
          )}

          <CalFeeDone
            dataFees={dataFees}
            contractId={contractId}
            paymentType={paymentType}
            companyId={companyId}
            className='mt-2'
          />
        </div>
      )}

      <div className='mt-1 font-medium-2 d-flex justify-content-end'>
        <ButtonStyled
          className='text-primary'
          onClick={toggleModify}
          borderColor={'green'}
        >
          {isEditMode ? (
            <FormattedMessage id={getKeyLang('SaveFee')} />
          ) : (
            <FormattedMessage id={getKeyLang('change')} />
          )}
        </ButtonStyled>

        {isEditMode && (
          <ButtonStyled className='ml-2' onClick={cancelModify}>
            <FormattedMessage id={getKeyLang('ConfirmCancel')} />
          </ButtonStyled>
        )}
      </div>
    </div>
  )
}

export default EditableDuration
