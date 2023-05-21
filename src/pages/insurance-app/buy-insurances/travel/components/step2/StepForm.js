import { BaseAppUltils, CurrencyInput, Select, useDeviceDetect } from 'base-app'
import { useFormikContext } from 'formik'
import React, { useRef, useState } from 'react'
import * as Icon from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch } from 'react-redux'
import { Button, CardBody, CardText, Col, Row } from 'reactstrap'
import CardFooter from 'reactstrap/lib/CardFooter'
import CardHeader from 'reactstrap/lib/CardHeader'
import styled from 'styled-components'
import {
  selectErrorStyles,
  selectNormalStyles
} from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import {
  debounceFunc,
  fillMultipleStepInfo,
  intlConvertToVnd,
  isArrayEmpty,
  isObjEmpty
} from '../../../../../../ultity'
import CalFeeDone from './CalFeeDone'
import DurationSlider from './durationSlider'
import {
  initialValues, KEY_INSURANCE_DEDUCTION,
  KEY_INSURANCE_MONEY,
  KEY_PACKAGE_SELECTED,
  KEY_TOTAL_PERSON_INSURANCE
} from './formikConfig'
import PopupInfoInsurance from './popupInfoInsurance'
import {
  INSURANCE_MONEY_ARR, INSURANCE_MONEY_ARR_BASIC
} from './utility'

const PackagesBlock = styled(Col)`
  /* padding-left: 3rem;
  padding-right: 3rem; */
`
const TextFeeStyled = styled.div`
  padding: 10px;
  @media (max-width: 480px) {
    .text-style {
      font-size: 0.9rem;
    }
  }
  @media (min-width: 768px) {
    .text-style {
      font-size: 1.2rem;
    }
  }
`

const PackageBlock = styled.div`
  box-shadow: 5px 5px 11px 7px #d1d1d1;
  border-radius: 0.5rem;
`

const SectionStyled = styled(Row)`
  label {
    display: none !important;
  }
  .input_deduction{
    display: block;
    width: 100%;
    height: calc(1.25 * 1em + 1.4rem + 1px);
    padding: 0.7rem 0.7rem;
    font-size: 0.96rem;
    font-weight: 400;
    line-height: 1.25;
    color: #4e5154;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;
    &:focus{
      border: 1px solid #338955;
    }
  }
`
const FeeRow = styled.div`
  border-radius: 0.5rem;
  padding: 0.7rem;
  box-shadow: none !important;
`
const CarouselStyled = styled.div`
  /* display */
  .react-multiple-carousel__arrow {
    min-width: 30px;
    min-height: 30px;
    z-index: 0;
  }
  .react-multiple-carousel__arrow--right {
    right: calc(1% + 1px);
  }
  .react-multiple-carousel__arrow--left {
    left: calc(1% + 1px);
  }
`
const ButtonShowDetail = styled(Button)`
  span {
    font-size: 0.8rem !important;
  }
`

const StepForm = ({ stepInfo, className, packages , enableValidateOnChange }) => {
  const intl = useIntl()
  const carouselRef = useRef()
  const { isMobile } = useDeviceDetect()
  const { getFieldMeta, setFieldValue, setValues, values, errors, touched } =
    useFormikContext()
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)
  const [packageShowDetail, setPackageShowDetail] = useState('GOI3')
  const dispatch = useDispatch()
  const {
    step_1,
    step_2,
    contractId,
    insuranceInfo,
    companyId,
    contractInfo,
    companiesData,
    setCompaniesData,
    dataFees,
    getTitlePackage,
    feeStatus
  } = stepInfo
  const totalFee = dataFees.find((_elt) => _elt.companyId === companyId)
    ?.feeInsurances?.totalFeeInsurance
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  const handlePackageRadioChange = (elt_val) => {
    setFieldValue(KEY_PACKAGE_SELECTED, elt_val)
    if (elt_val === 'BASIC') {
      setFieldValue(KEY_INSURANCE_MONEY , INSURANCE_MONEY_ARR_BASIC[0].value )
    }else{
      setFieldValue(KEY_INSURANCE_MONEY , INSURANCE_MONEY_ARR[0].value )
    }
  }

  const togglePopup = () => {
    setIsOpenModalDetail(!isOpenModalDetail)
  }
  const onChangeDeduction =(value) => {
    const valuess = Number(value)
    if (!isNaN(valuess)) {
      if(values[KEY_TOTAL_PERSON_INSURANCE] > 5){
        if(Number(valuess) <= 50){
          setFieldValue(KEY_INSURANCE_DEDUCTION, valuess)
        }else{
          BaseAppUltils.toastError('Gía trị không được lớn hơn 50')
          setFieldValue(KEY_INSURANCE_DEDUCTION, 50)
        }
        return
      }else{
        if(Number(valuess) <= 25){
          setFieldValue(KEY_INSURANCE_DEDUCTION, valuess)
        }else{
          BaseAppUltils.toastError('Gía trị không được lớn hơn 25')
          setFieldValue(KEY_INSURANCE_DEDUCTION, 25)
        }
      } 
    }else{
      setFieldValue(KEY_INSURANCE_DEDUCTION, 0)
    }
  }
  React.useEffect(() => {
    const currentSlide =
      getFieldMeta(KEY_PACKAGE_SELECTED).value === 'BASIC'
        ? 0
        : getFieldMeta(KEY_PACKAGE_SELECTED).value === 'ADVANCE'
        ? 1
        : 0
    if (carouselRef.current && isMobile) {
      carouselRef.current.goToSlide(currentSlide)
    }
    if (isObjEmpty(step_2)) return
    fillMultipleStepInfo(step_2, initialValues, setValues)
  }, [isMobile])
  const renderCardIsMobile = () => {
    return (
      <CarouselStyled>
        <Carousel
          ssr
          partialVisbile
          responsive={responsive}
          ref={carouselRef}
          renderButtonGroupOutside={false}
          autoPlay={false}
          renderDotsOutside={false}
          afterChange={(previousSlide, _ref) => {
            const packageNumber =
              _ref.currentSlide === 0
                ? 'BASIC'
                : _ref.currentSlide === 1
                ? 'ADVANCE'
                : 'BASIC'
            handlePackageRadioChange(packageNumber)
            setFieldValue(KEY_PACKAGE_SELECTED, packageNumber)
          }}
        >
          {!isArrayEmpty(packages) &&
            packages.map((elt, index, _packages) => {
              const isSelected =
                getFieldMeta(KEY_PACKAGE_SELECTED).value === elt.value

              return (
                <PackagesBlock
                  key={index}
                  className={`${isMobile ? 'mb-2' : 'mb-3'} mt-2`}
                >
                  <PackageBlock
                    className={
                      'cursor-pointer ' + (isSelected ? 'card-active' : '')
                    }
                  >
                    <CardHeader className='d-flex justify-content-center flex-column'>
                      <span className='text-center mb-1'>
                        <Icon.Shield
                          size={30}
                          color={isSelected ? '#fff' : '#28c77c'}
                        />
                      </span>
                      <h4
                        className={
                          `font-weight-bold ` +
                          (isSelected ? 'text-white' : 'success')
                        }
                      >
                        {getTitlePackage(elt.value)}
                      </h4>
                    </CardHeader>

                    <CardBody className='text-center'>
                      <h6
                        className={`` + (isSelected ? 'text-white' : 'success')}
                      >
                        Quyền lợi bảo hiểm :
                      </h6>
                      <h5
                        className={
                          `font-weight-bold ` +
                          (isSelected ? 'text-warning' : 'text-danger')
                        }
                      >
                        - Về người: tối đa đến 1 tỷ đồng
                        {/* {subStringMoney(elt?.interest, 3)} triệu đồng */}
                      </h5>
                      <ul className='list-unstyled mt-1'>
                        {elt.outsideTheCard.map((_title) => (
                          <li className='list-none mb-1 font-italic font-small-3'>
                            + {_title}
                          </li>
                        ))}
                      </ul>

                      <h5
                        className={
                          `font-weight-bold ` +
                          (isSelected ? 'text-warning' : 'text-danger')
                        }
                      >
                        - Về hành lý: tối đa 100 trđ
                        {/* {subStringMoney(elt?.interest, 3)} triệu đồng */}
                      </h5>
                      <div className='text-medium-1 mt-1'>
                        <ButtonShowDetail
                          className={
                            `font-weight-bold  ` +
                            (isSelected ? 'text-white' : '')
                          }
                          color='warning'
                          onClick={(e) => {
                            e.preventDefault()
                            togglePopup()
                            setPackageShowDetail(elt.value)
                          }}
                        >
                          <span>Xem chi tiết</span>
                        </ButtonShowDetail>
                      </div>
                    </CardBody>
                    <CardFooter>
                      <div className='d-flex justify-content-center mb-1'>
                        {isSelected ? (
                          <Icon.Check size={40} color='#ffd503' />
                        ) : (
                          <Button
                            outline
                            color='warning'
                            onClick={() => {
                              handlePackageRadioChange(elt.value)
                            }}
                          >
                            <FormattedMessage
                              id={getKeyLang('selectPackage')}
                            />
                          </Button>
                        )}
                      </div>

                      <span
                        className={`text-center font-small-3 font-weight-bold mt-1 ${
                          isSelected ? 'text-white' : 'text-danger'
                        }`}
                      >
                        {' '}
                        BTLTTTT; Bảng tỷ lệ trả tiền thương tật STBH: Số tiền
                        bảo hiểm
                      </span>
                    </CardFooter>
                  </PackageBlock>
                </PackagesBlock>
              )
            })}
        </Carousel>
      </CarouselStyled>
    )
  }
  return (
    <div className={className}>
      <CardText className='mb-3' tag='h5'>
        (*) Vui lòng chọn gói bảo hiểm và thời hạn
      </CardText>
      <div className='d-flex flex-column flex-md-row'>
        <CardText className='font-weight-bold mb-3 mr-1' tag='h5'>
          <FormattedMessage id={getKeyLang(`travel.travelItinerary`)} />
        </CardText>
        <span className='font-weight-bold mb-3 text-primary'>
          Việt Nam - Worldwide - Việt Nam
        </span>
      </div>

      {/* ============== select time ================== */}

      <DurationSlider
        errors={errors}
        values={values}
        setFieldValue={setFieldValue}
        getFieldMeta={getFieldMeta}
      />

      {/* ================= render card ============== */}

      <CardText className='font-weight-bold' tag='h5'>
        <FormattedMessage id={getKeyLang(`travel.selectPackageInsurance`)} />
      </CardText>

      {renderCardIsMobile()}

      {/* ============= popup========== */}

      <PopupInfoInsurance
        isOpen={isOpenModalDetail}
        toggle={togglePopup}
        getFieldMeta={getFieldMeta}
        packages={packages}
        packageShowDetail={packageShowDetail}
        getTitlePackage={getTitlePackage}
      />

      {/* ================== số tiền bảo hiểm =================== */}

      <SectionStyled>
        <Col md='3' xs='12' className='mb-1'>
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`travel.insuranceMoney`)} />
          </CardText>
        </Col>
        <Col md='9' xs='12' className='mb-1'>
          <Select
            readOnly
            closeMenuOnSelect={true}
            classNamePrefix='select mt-1'
            className='custom-zindex9'
            onChange={({ value }) => {
              console.log("value" , value);
              setFieldValue(KEY_INSURANCE_MONEY, value)
            }}
            value={getFieldMeta(KEY_PACKAGE_SELECTED).value === 'BASIC' ? INSURANCE_MONEY_ARR_BASIC.find(
              (gen) => gen.value === getFieldMeta(KEY_INSURANCE_MONEY).value
            ) : INSURANCE_MONEY_ARR.find(
              (gen) => gen.value === getFieldMeta(KEY_INSURANCE_MONEY).value
            )}
            options={getFieldMeta(KEY_PACKAGE_SELECTED).value === 'BASIC' ? INSURANCE_MONEY_ARR_BASIC : INSURANCE_MONEY_ARR}
            placeholder={intl.formatMessage({
              id: getKeyLang(`travel.insuranceMoney`)
            })}
            isClearable={false}
            styles={
              getFieldMeta(KEY_INSURANCE_MONEY).error
                ? selectErrorStyles
                : selectNormalStyles
            }
          />
        </Col>
      </SectionStyled>

      {/* ========================Giảm trừ phí bảo hiểm ================== */}

      <SectionStyled className='d-flex algin-items-center' flex={'true'}>
        <Col md='3' xs='12' className='mb-1'>
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`travel.insuranceDeduction`)} /> :
          </CardText>
        </Col>
        <Col md='9' xs='12' className='mb-1'>
      <input type='text' value={getFieldMeta(KEY_INSURANCE_DEDUCTION).value} placeholder="Giảm trừ phí bảo hiểm (%)" className='input_deduction' onChange={(e) => onChangeDeduction(e.target.value)}/>
        </Col>
      </SectionStyled>
     
      {dataFees.length === 0 ? null : (
        <>
         {/* ===================== COMPANY================= */}
          <CardText className='font-weight-bold mt-1' tag='h5'>
            <FormattedMessage id={getKeyLang(`insurance.companyName`)} />
          </CardText>
          <CalFeeDone
            feeInsurance={intlConvertToVnd(totalFee, intl)}
            companyId={companyId}
            dispatch={dispatch}
            contractId={contractId}
            contractInfo={contractInfo}
            step_1={step_1}
            companiesData={dataFees}
          />
          {/* ==================== total fee ========================== */}
          <FeeRow className='card-active mt-3'>
            <Row>
              <Col xs={5} md={6}>
                <TextFeeStyled>
                  <div
                    className={'font-lg-medium-2 font-md-small-2 text-style '}
                  >
                    <FormattedMessage id={getKeyLang('feeInsurance')} />
                  </div>
                </TextFeeStyled>
              </Col>

              <Col xs={7} md={6}>
                <TextFeeStyled className='d-flex justify-content-end'>
                  <span
                    className={'font-medium-lg-2 font-small-xs-2  text-style '}
                  >
                    {intlConvertToVnd(totalFee, intl)}
                  </span>
                  <span>&nbsp;</span>
                  <span className='text-style '>VND</span>
                </TextFeeStyled>
              </Col>
            </Row>
          </FeeRow>
        </>
      )}
    </div>
  )
}

export default StepForm
