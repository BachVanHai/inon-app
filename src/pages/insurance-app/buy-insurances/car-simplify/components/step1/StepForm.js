import { Select } from 'base-app'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Col, Row } from 'reactstrap'
import Media from 'reactstrap/lib/Media'
import styled from 'styled-components'
import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import '../../../../../../assets/scss/insurance-app/common/custom-image-modal.scss'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import {
  OcrInput,
  OCR_TYPE_VEHICLE_REGISTRATION
} from '../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import UncontrolledPopover from '../../../../../../components/insurance-app/common-forms/popup/UncontrolledPopover'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { getCarManufacturers, getCarVehicle, resetState, updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesCar'
import {
  BASE,
  KEY_UPLOADED_IMAGE,
  KEY_UPLOADED_IMAGE_PERSON
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import {
  fillMultipleStepInfo,
  isArrayEmpty,
  isObjEmpty,
  isValueEmpty
} from '../../../../../../ultity'
import {
  KEY_BRAND_NAME,
  sugg_Purpose
} from '../../../car/components/step1/formikConfig'
import {
  initialValues,
  KEY_ADDRESS,
  KEY_CHASSIS_NUMBER,
  KEY_ENGINE_NUMBER,
  KEY_FULLNAME,
  KEY_LOADS,
  KEY_MANUFACTURER_NAME,
  KEY_NUMBER_PLATE,
  KEY_ORIGIN_PRODUCT,
  KEY_PURPOSE,
  KEY_SEATS,
  KEY_VEHICLE_TYPE,
  KEY_YEAR_PRODUCT
} from './formikConfig'

const OCRinputCustom = styled(OcrInput)`
  width: 40% !important;
  .btn-outline-primary {
    width: 100%;
  }
  @media (max-width: 1024px) {
    & {
      width: 60% !important;
    }
  }
`

const SelectedInsurs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const SelectedInsur = styled.div`
  width: 160px;
  border: ${(p) => p.border || 'solid 1px'};
  border-color: ${(p) => p.borderColor || 'white'};
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
  margin: 0rem 1rem;
  &:hover {
    border: solid 1px;
    border-color: ${(p) => p.borderColor || 'green'};
    border-radius: 0.5rem;
  }
  @media (max-width: 1024px) {
    & {
      margin: 0rem 0.5rem;
      width: 100px;
    }
  }
`

const MediaStyled = styled(Media)`
  width: 100px;
  transform: ${(p) => p.translate || 'translate(0,0)'};
  @media (max-width: 576px) {
    & {
      margin: 0rem 0.5rem;
      width: 80px;
    }
  }
`

const StepForm = ({
  uploadedImg,
  stepInfo,
  companyId,
  formik,
  className,
  companyList,
  sugg_Automaker,
  sugg_Vehicle,
  intl ,
  step_1
}) => {
  const dispatch = useDispatch()
  const { setFieldValue, getFieldMeta, values, setValues, handleSubmit } =
    formik
  const selectedCompanyColor = 'green'
  const [brandsSugg, setBrandsSugg] = useState([])
  const [usageList, setUsageList] = useState(sugg_Purpose)
  const setUploadImg = (e_target_files0) => {
    const imgUrl = URL.createObjectURL(e_target_files0)
    dispatch(
      updateProps([
        {
          prop: KEY_UPLOADED_IMAGE,
          value: imgUrl
        }
      ])
    )
  }
  const setUploadImgPerson = (e_target_files0) => {
    const imgUrl = URL.createObjectURL(e_target_files0)
    dispatch(
      updateProps([
        {
          prop: KEY_UPLOADED_IMAGE_PERSON,
          value: imgUrl
        }
      ])
    )
  }

  const registrationImageCompleted = (
    brand,
    model,
    chassis,
    engine,
    plate,
    year_of_manufacture,
    name,
    address,
    seats,
    issue_at,
    issue_date , 
    capacity
  ) => {
    const loads = Number(capacity)/1000
    const strTrim = (str) => {
      return str.replace(/\s+/g, '')
    }
    const _values = { ...values }

    _values[KEY_NUMBER_PLATE] = strTrim(plate)
    _values[KEY_MANUFACTURER_NAME] = brand
    _values[KEY_SEATS] = seats
    _values[KEY_CHASSIS_NUMBER] = chassis
    _values[KEY_ENGINE_NUMBER] = engine
    _values[KEY_ORIGIN_PRODUCT] = issue_at
    _values[KEY_YEAR_PRODUCT] = issue_date
    _values[KEY_FULLNAME] = name
    _values[KEY_ADDRESS] = address
    _values[KEY_LOADS] = loads
    const brands = sugg_Automaker
      .find((_elt) => _elt.name === brand)
      ?.brands.map((_elt) => {
        return { value: _elt?.brand, label: _elt?.brand }
      })
    // check brand of car not found => return and alert error
    if (!isArrayEmpty(brands)) {
      _values[KEY_BRAND_NAME] = brands[0].value
    }
    setValues(_values)
    handleSubmit && handleSubmit()
  }
  React.useEffect(() => {
    if (isObjEmpty(stepInfo)) {
      const defaultUsage = sugg_Purpose.filter(_elt => _elt.temp === sugg_Vehicle[0]?.businessStatus)
      setUsageList(defaultUsage)
      setFieldValue(KEY_PURPOSE , defaultUsage[0]?.temp)
      return
    }else{
      fillMultipleStepInfo(stepInfo, initialValues, setValues)
    }
    if (!isValueEmpty(getFieldMeta(KEY_VEHICLE_TYPE).value)) {
      const suggPurpose = getFieldMeta(KEY_VEHICLE_TYPE).value !== 'A' ? sugg_Purpose.filter(_elt => _elt.value === getFieldMeta(KEY_VEHICLE_TYPE).value) : usageList
      setUsageList(suggPurpose)
    }
  }, [JSON.stringify(sugg_Vehicle)])

  return (
    <div className={className}>
      <Row>
        <Col xs={12} md={6}>
          <Select
            readOnly
            isClearable={false}
            isSearchable={false}
            closeMenuOnSelect={true}
            classNamePrefix='select mt-1'
            className='custom-zindex9'
            placeholder={intl.formatMessage({ id: getKeyLang(`TypeVihicle`) })}
            styles={
              getFieldMeta(KEY_VEHICLE_TYPE).error
                ? selectErrorStyles
                : selectNormalStyles
            }
            value={
              !isArrayEmpty(sugg_Vehicle) &&
              sugg_Vehicle.find(
                (elt) => elt.id == getFieldMeta(KEY_VEHICLE_TYPE).value
              )
            }
            options={sugg_Vehicle || []}
            onChange={(original) => {
              setFieldValue(KEY_VEHICLE_TYPE, original.id)
              if (original.businessStatus === 'A') {
                setFieldValue(KEY_PURPOSE , sugg_Purpose[0].temp)
                setUsageList(sugg_Purpose)
              }else{
                const defaultUsage = sugg_Purpose.filter(_elt => _elt.temp === original.businessStatus)
                setUsageList(defaultUsage)
                setFieldValue(KEY_PURPOSE , defaultUsage[0].temp)
              }
            }}
          />
        </Col>
        <Col xs={12} md={6}>
          <Select
            readOnly
            isClearable={false}
            isSearchable={false}
            closeMenuOnSelect={true}
            classNamePrefix='select mt-1'
            className='custom-zindex8'
            placeholder={intl.formatMessage({ id: getKeyLang(`purpose`) })}
            styles={
              getFieldMeta(KEY_PURPOSE).error
                ? selectErrorStyles
                : selectNormalStyles
            }
            value={
              !isArrayEmpty(usageList) &&
              usageList.find(
                (elt) =>  elt.temp == getFieldMeta(KEY_PURPOSE).value
              )
            }
            options={usageList || []}
            onChange={(original) => {
              setFieldValue(KEY_PURPOSE, original.temp)
            }}
          />
        </Col>
      </Row>

      <div className='mb-1'>
        <span className='font-medium-3 primary'>
          <FormattedMessage id={getKeyLang('insurance.companyName')} />
        </span>
        <UncontrolledPopover
          targetId={'unique-popover-id-01'}
          contents={[
            'Phí bảo hiểm bắt buộc TNDS xe ô tô được áp dụng như nhau với tất cả các hãng bảo hiểm'
          ]}
          positionStyle={{ top: '-23px', left: '140px' }}
          msgField={<FormattedMessage id={getKeyLang('Detail')} />}
        />
      </div>

      <SelectedInsurs className='w-100 mb-3'>
        {companyList.map((elt, index) => {
          return (
            <SelectedInsur
              key={index}
              borderColor={companyId === elt.companyId && selectedCompanyColor}
              onClick={() => {
                dispatch(
                  updateProps([
                    {
                      prop: BASE.KEY_COMPANY_ID,
                      value: elt.companyId
                    }
                  ])
                )
              }}
            >
              <MediaStyled
                src={elt.logo}
                // customWidth={_customWidth}
                // translate={_translate}
              />
            </SelectedInsur>
          )
        })}
      </SelectedInsurs>
      <div className='ocr-input-wrapper w-100 d-flex flex-column align-items-center'>
        <OCRinputCustom
          ocrType={OCR_TYPE_VEHICLE_REGISTRATION}
          idKeylangBtnName={getKeyLang(`vehicleRegistrationOcr`)}
          completedCallback={registrationImageCompleted}
          className='mb-1 mr-1 ocr-input'
          uploadedImgUrl={uploadedImg} // can omitted
          handleImageChangeCallback={setUploadImg} // can omitted
        />
        {/* <OCRinputCustom
          ocrType={OCR_TYPE_ID_PERSON}
          idKeylangBtnName={getKeyLang(`IdPersonOcr`)}
          completedCallback={PersonCallBackCompletedImage}
          className='mb-1 mr-1 ocr-input'
          uploadedImgUrl={uploadImgPerson} // can omitted
          handleImageChangeCallback={setUploadImgPerson} // can omitted
        /> */}

        <div className='font-italic'>
          (*) Chụp mặt sau của giấy chứng nhận đăng ký xe ô tô;
        </div>
        <div className='font-italic'>
          Vui lòng chụp rõ nét và đầy đủ thông tin trên giấy tờ xe.
        </div>
      </div>
    </div>
  )
}

export default StepForm
