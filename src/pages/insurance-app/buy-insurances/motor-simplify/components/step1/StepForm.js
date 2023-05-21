import '../../../../../../assets/scss/insurance-app/buy-insurances/inputgroup.scss'
import '../../../../../../assets/scss/insurance-app/common/custom-image-modal.scss'
import React from 'react'
import { Select } from 'base-app'
import { COMPANIES, getKeyLang } from '../../../../../../configs/insurance-app'
import {
  OcrInput,
  OCR_TYPE_VEHICLE_REGISTRATION
} from '../../../../../../components/insurance-app/common-forms/ocr-input/OcrInput'
import {
  KEY_MANUFACTURER_VEHICLE,
  KEY_LINE_VEHICLE,
  KEY_MACHINE_NUMBER,
  KEY_NUMBER_PLATE,
  KEY_FULLNAME,
  KEY_ADDRESS,
  KEY_FRAME_NUMBER,
  KEY_VEHICLE_TYPE
} from './formikConfig'
import Media from 'reactstrap/lib/Media'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import {
  fillMultipleStepInfo,
  isArrayEmpty,
  isObjEmpty
} from '../../../../../../ultity'
import { initialValues } from './formikConfig'
import { useDispatch } from 'react-redux'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotor'
import {
  BASE,
  KEY_UPLOADED_IMAGE
} from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotor'
import UncontrolledPopover from '../../../../../../components/insurance-app/common-forms/popup/UncontrolledPopover'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

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
  vehiclesType,
  uploadedImg,
  stepInfo,
  companyId,
  enableValidateOnChange,
  formik,
  className,
  companyList
}) => {
  const dispatch = useDispatch()
  const { setFieldValue, getFieldMeta, values, setValues, handleSubmit } =
    formik
  const selectedCompanyColor = 'green'

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

  const registrationImageCompleted = (
    brand,
    model,
    chassis,
    engine,
    plate,
    year_of_manufacture,
    name,
    address
  ) => {
    enableValidateOnChange()

    const strTrim = (str) => {
      return str.replace(/\s+/g, '')
    }
    const _values = { ...values }
    _values[KEY_FULLNAME] = name
    _values[KEY_ADDRESS] = address
    _values[KEY_NUMBER_PLATE] = strTrim(plate)
    _values[KEY_LINE_VEHICLE] = model
    _values[KEY_MANUFACTURER_VEHICLE] = brand

    _values[KEY_FRAME_NUMBER] = chassis
    _values[KEY_MACHINE_NUMBER] = engine
    setValues(_values)

    handleSubmit && handleSubmit()
  }

  React.useEffect(() => {
    if (isObjEmpty(stepInfo)) return
    fillMultipleStepInfo(stepInfo, initialValues, setValues)
  }, [])

  return (
    <div className={className}>
      <Row>
        <Col xs={12} md={12}>
          <Select
            readOnly
            isClearable={false}
            isSearchable={false}
            closeMenuOnSelect={true}
            classNamePrefix='select mt-1'
            className='custom-zindex8'
            styles={
              getFieldMeta(KEY_VEHICLE_TYPE).error
                ? selectErrorStyles
                : selectNormalStyles
            }
            value={
              !isArrayEmpty(vehiclesType) &&
              vehiclesType.find(
                (elt) => elt.value == getFieldMeta(KEY_VEHICLE_TYPE).value
              )
            }
            options={vehiclesType || []}
            onChange={(original) => {
              setFieldValue(KEY_VEHICLE_TYPE, original.value)
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
            'Phí bảo hiểm TNDS bắt buộc TNDS xe máy là 66,000VNĐ, áp dụng với tất cả các hãng bảo hiểm '
          ]}
          positionStyle={{ top: '-23px', left: '140px' }}
          msgField={<FormattedMessage id={getKeyLang('Detail')} />}
        />
      </div>

      <SelectedInsurs className='w-100 mb-3'>
        {companyList.map((elt, index) => {
          // if (elt.compShortName === "VBI") return null

          // let _customWidth = "100%", _translate = ""
          // switch (elt.compShortName) {
          //     case "XTI":
          //         _customWidth = "85%"
          //         _translate = "translate(5px,-2px)"
          //         break
          //     case "VBI":
          //         _customWidth = "110%"
          //         break
          //     case "BSH":
          //         _customWidth = "85%"
          //         _translate = "translate(0,5px)"
          //         break
          //     case "PTI":
          //         _customWidth = "95%"
          //         break
          //     default:
          //         break
          // }

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

        <div className='font-italic'>
          (*) Chụp mặt sau của giấy chứng nhận đăng ký xe mô tô, xe gắn máy
        </div>
        <div className='font-italic'>
          Vui lòng chụp rõ nét và đầy đủ thông tin trên giấy tờ xe
        </div>
      </div>
    </div>
  )
}

export default StepForm
