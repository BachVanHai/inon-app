import { BaseFormDatePicker, Radio, useDeviceDetect } from 'base-app'
import { useFormikContext } from 'formik'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import * as Icon from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch } from 'react-redux'
import { Button, CardBody, CardText, Col, Input, Row } from 'reactstrap'
import CardFooter from 'reactstrap/lib/CardFooter'
import CardHeader from 'reactstrap/lib/CardHeader'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../configs/insurance-app'
import {
  fillMultipleStepInfo,
  intlConvertToVnd, isArrayEmpty, isObjEmpty
} from '../../../../../ultity'
import { KEY_ADDTIONAL_PEOPLE } from '../step1/formikConfig'
import CalFeeDone from './CalFeeDone'
import {
  initialValues, KEY_DURATION_SELECTED, KEY_END_INSURANCE, KEY_PACKAGE_SELECTED, KEY_START_INSURANCE, KEY_YEAR
} from './formikConfig'
import PopupInfoInsurance from './popupInfoInsurance'
import { DURATION_PACKAGE, subStringMoney, updateInsuranceAndFeeStep2 } from './utility'

const PackagesBlock = styled(Col)`
  padding-left: 1.2rem;
  padding-right: 1.2rem;
`
const TextFeeStyled = styled.div`
padding : 10px;
@media (max-width : 480px) {
  .text-style {
    font-size: .9rem;
  }
}
@media (min-width : 768px) {
  .text-style {
    font-size: 1.2rem;
  }
}
`

const PackageBlock = styled.div`
  box-shadow: 5px 5px 11px 7px #d1d1d1;
  border-radius: 0.5rem;
`

const CustomDurationInputStyled = styled(Input)`
  transform: translate(0px, -4px);
  position: relative;
  display: block;
  margin: 0;

  /* remove standard background appearance */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* create custom radiobutton appearance */
  display: inline-block;
  width: 25px;
  height: 25px;
  padding: 6px;
  /* background-color only for content */
  background-clip: content-box;
  border: 2px solid #bbbbbb;
  background-color: #e7e6e7;
  border-radius: 50%;
  &:checked {
    background-color: green;
  }
`

const DurationBlock = styled.div`
  display: flex;
  margin-right: 1rem;
  margin-top: 1rem;
`

const DurationsBlock = styled.div`
  width: 100%;
`

const FeeRow = styled.div`
  border-radius: 0.5rem;
  padding: 0.7rem;
  box-shadow: none !important;
`
const CarouselStyled = styled.div`
  .react-multiple-carousel__arrow {
    min-width: 30px;
    min-height: 30px;
    z-index : 0;
  }
  .react-multiple-carousel__arrow--right{
    right: calc(1% + 1px);
  }
  .react-multiple-carousel__arrow--left{
    left: calc(1% + 1px);
  }
`
const ButtonShowDetail = styled(Button)`
span{
  font-size: .8rem !important;
}
`

const StepForm = ({ stepInfo, className , packages }) => {
  const intl = useIntl()
  const carouselRef = useRef()
  const { isMobile } = useDeviceDetect()
  const { getFieldMeta, setFieldValue, setValues ,values } = useFormikContext()
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false)
  const [packageShowDetail, setPackageShowDetail] = useState('GOI3')
  const dispatch = useDispatch()
  const { step_1, step_2 , totalFee ,contractId ,insuranceInfo , companyId , contractInfo , companiesData , setCompaniesData } = stepInfo
  const addtionalPeople = step_1[KEY_ADDTIONAL_PEOPLE]
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
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
  }
  const togglePopup = () => {
    setIsOpenModalDetail(!isOpenModalDetail)
  }
  React.useEffect(() => {
   
    const currentSlide =
      getFieldMeta(KEY_PACKAGE_SELECTED).value === 'GOI1'
        ? 0
        : getFieldMeta(KEY_PACKAGE_SELECTED).value === 'GOI2'
        ? 1
        : getFieldMeta(KEY_PACKAGE_SELECTED).value === 'GOI3'
        ? 2
        : getFieldMeta(KEY_PACKAGE_SELECTED).value === 'GOI4'
        ? 3
        : 0
    if (carouselRef.current && isMobile) {
      carouselRef.current.goToSlide(currentSlide)
    }
    if (isObjEmpty(step_2)) return
    fillMultipleStepInfo(step_2, initialValues, setValues)
  }, [isMobile])
  const CustomDot = ({ onMove, index, onClick, active }) => {
    return (
      <>
        {isMobile ? (
          <li onClick={() => onClick()}>
            <Icon.Circle size={13} fill={`${active ? '#207756' : '#fff'}`} />
          </li>
        ) : null}
      </>
    )
  }
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
          // customDot={<CustomDot />}
          // showDots
          afterChange={(previousSlide, _ref) => { 
            const packageNumber = _ref.currentSlide === 0
            ? 'GOI1'
            : _ref.currentSlide === 1
            ? 'GOI2'
            : _ref.currentSlide === 2
            ? 'GOI3'
            : _ref.currentSlide === 3
            ? 'GOI4'
            : 'GOI3'
            handlePackageRadioChange(packageNumber)
            setFieldValue(
              KEY_PACKAGE_SELECTED,
              packageNumber
            )
          }}
        >
          {!isArrayEmpty(packages) && packages.map((elt, index, _packages) => {
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
                        `font-weight-bold text-center ${isSelected ? 'text-white' : 'success'}` 
                      }
                    >
                      {elt.msgField}
                    </h4>
                    <h6 className={`${isSelected ? 'text-white' : 'text-dark'} text-center`}>
                      ({elt.packageSubtitleField})
                    </h6>
                  </CardHeader>

                  <CardBody className='text-center'>
                    <h6
                      className={
                        `` +
                        (isSelected ? 'text-white' : 'success')
                      }
                    >
                      Quyền lợi bảo hiểm tối đa lên đến
                    </h6>
                    <h5
                      className={
                        `font-weight-bold ` +
                        (isSelected ? 'text-warning' : 'text-danger')
                      }
                    >
                      {subStringMoney(elt?.interest ,3)} triệu đồng
                    </h5>
                    <div className='text-medium-1'>
                    <ButtonShowDetail
                      className={
                        `font-weight-bold  ` + (isSelected ? 'text-white' : '')
                      }
                      color='warning'
                      onClick={(e) => {
                        e.preventDefault()
                        togglePopup()
                        setPackageShowDetail(elt.value)
                      }}
                    >
                    <span >Xem chi tiết</span>
                    </ButtonShowDetail>
                    </div>
                 
                  </CardBody>
                  <CardFooter className='d-flex justify-content-center'>
                    {isSelected ? (
                      <Icon.Check size={40} color='#ffd503' />
                    ) : (
                      <Button outline color='warning' 
                       onClick={() => {
                       handlePackageRadioChange(elt.value)
                     }}
                      >
                        <FormattedMessage id={getKeyLang('selectPackage')} />
                      </Button>
                    )}
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
      <CardText className='mb-2 mt-2' tag='h5'>
        (*) Vui lòng chọn gói bảo hiểm và thời hạn
      </CardText>
      {renderCardIsMobile()}
      <PopupInfoInsurance
        isOpen={isOpenModalDetail}
        toggle={togglePopup}
        getFieldMeta={getFieldMeta}
        packages={packages}
        packageShowDetail={packageShowDetail}
      />

      <div>
        <CardText className='mb-1 mt-1 font-weight-bold mt-2' tag='h5'>
          <FormattedMessage id={getKeyLang(`RangeDate`)} />: {getFieldMeta(KEY_DURATION_SELECTED).value === 12 ? '1' : getFieldMeta(KEY_DURATION_SELECTED).value === 24 ? '2' : '3' } năm
        </CardText>
        <Row xs={12} md={9}>
          <Col>
          {DURATION_PACKAGE.map((_elt, index) => (
            <div
              key={index}
              className='d-flex flex-cols align-items-center mb-1 cursor-pointer'
            >
              <Radio
                checked={getFieldMeta(KEY_DURATION_SELECTED).value === _elt.value}
                onChange={() =>{
                  const startDate = moment(getFieldMeta(KEY_START_INSURANCE).value).format('YYYY-MM-DD H:mm:ss')
                  const endDate =  moment(startDate).utc(true).add(_elt.year,'y').format('YYYY-MM-DD H:mm:ss')
                  setFieldValue(KEY_DURATION_SELECTED , _elt.value)
                  setFieldValue(KEY_YEAR , _elt.year)
                  setFieldValue(KEY_END_INSURANCE , moment(startDate).utc(true).add(_elt.year,'y').format('YYYY-MM-DD H:mm:ss'))
                }
                }
              />
              <span>{_elt.title}</span>
            </div>
          ))}
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col xs="6" md="6">
            <BaseFormDatePicker 
             messageId={getKeyLang('DateEffFrom')}
             fieldName={KEY_START_INSURANCE}
             options={{
              minDate: moment().format('YYYY-MM-DD 00:00:00'),
              dateFormat: 'Y-m-d'
            }}
            onChange={(date) => {
              setFieldValue(KEY_START_INSURANCE , moment(date[0]).format('YYYY-MM-DD') )
              setFieldValue(KEY_END_INSURANCE , moment(date[0]).add(getFieldMeta(KEY_YEAR).value,'y').format('YYYY-MM-DD'))
            }}
            />
          </Col>
          <Col xs="6" md="6">
          <BaseFormDatePicker 
             messageId={getKeyLang('DateEffTo')}
             fieldName={KEY_END_INSURANCE}
            options={{
              minDate: moment().utc(true).subtract(1 , 'y').format("YYYY-MM-DD"),
              dateFormat: 'Y-m-d'
            }}
             disabled
           
            />
          </Col>
        </Row>
        <CardText className='mb-1 mt-1 font-weight-bold mt-2' tag='h5'>
          <FormattedMessage id={getKeyLang(`InsuranceProduct`)} />
        </CardText>
      </div>
        {/* ===================== COMPANY================= */}
      
      <CalFeeDone feeInsurance={intlConvertToVnd(
               totalFee,
                intl
              )} companyId={companyId} dispatch={dispatch} contractId={contractId} contractInfo={contractInfo} companiesData={companiesData} />
      {/* ============================================== */}
      <FeeRow className='card-active mt-3'>
        <Row>
          <Col xs={5} md={6}>
            <TextFeeStyled>
            <div className={'font-lg-medium-2 font-md-small-2 text-style '}>
              <FormattedMessage id={getKeyLang('feeInsurance')} />
            </div>
            </TextFeeStyled>
          </Col>
          <Col xs={7} md={6}>
            <TextFeeStyled className='d-flex justify-content-end'>
            <span className={'font-medium-lg-2 font-small-xs-2  text-style '}>
              {intlConvertToVnd(
               totalFee,
                intl
              )}
            </span>
            <span>&nbsp;</span>
            <span className='text-style '>VND</span>
            </TextFeeStyled>
          </Col>
        </Row>
      </FeeRow>
    </div>
  )
}

export default StepForm
