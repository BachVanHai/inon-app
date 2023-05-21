import {
  BaseAppUltils, BaseFormGroup, BaseFormGroupSelect, Button,
  goBackHomePage, Select, showConfirmAlert
} from 'base-app'
import { Formik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import { addAppContextPath, getKeyLang } from '../../../../configs/supplement-app'
import {
  getAllCompanies,
  getAllProduct
} from '../../../../redux/actions/supplement-app/eVoucherCreate'
import EvoucherService from '../../../../services/supplement-app/evoucher'
import DuractionSlider from './duractionSlider'
import { validationSchema } from './formikConfig'
import FormSelectPromotion from './formSelectPromotion'
import InsurancePakage from './insurancePakage'
import {
  AWAITING_ACTIVE, ConvertToDate, GetTime, REJECTED
} from './utility'
const EditEvoucher = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const intl = useIntl()
  const { availableProducts } = useSelector(
    (state) => state.app.evoucherCreate
  )
  const [configTemplateRes, setConfigTemplateRes] = useState()
  const [evoucherInfo, setEvoucherInfo] = useState({})
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const [dispatchDependency, setDispatchActive] = useState(0)
  const [isEditVoucher, setIsEditVoucher] = useState(false)
  const [insuranTypeId, setInsuranTypeId] = useState(null);
  const [statusSetInsuranceID, setStatusSetInsuranceID] = useState(false);
  const [nameInsurance, setNameInsurance] = useState(evoucherInfo.insuranceTypeName);
  const [companyRes, setCompanyRes] = useState([]);
  const [insuranceConfig, setInsuranceConfig] = useState(['5']);
  const [statusInsuranCompanyId, setStatusSetInsuranCompanyId] = useState(false);
  const productsSuggestion = availableProducts.map((product) => {
    return {
      label: product.nameInsurance,
      value: product.id,
      type: product.shortNameInsurance
    }
  })
  const insurannFilter = productsSuggestion.filter((insurance) =>{
    return insurance.value === Number(evoucherInfo.insuranceTypeId)
  })
  const effectDate = moment(evoucherInfo.effectiveDate)
  const expireDate = moment(evoucherInfo.expireDate)
  const effectDateConvert = moment(effectDate._i).utc(false).format('YYYY-MM-DD H:mm')
  const expireDateConvert = moment(expireDate._i).utc(false).format('YYYY-MM-DD H:mm')
  const effectHoursDefault = moment(effectDateConvert).get('hours')
  const effectMinutesDefault = moment(effectDateConvert).get('minutes')
  const expireHoursDefault = moment(expireDateConvert).get('hours')
  const expireMinutesDefault = moment(expireDateConvert).get('minutes')
  const initialValues = {
    effectiveTimeFrom: GetTime(evoucherInfo.effectiveDate) ,
    effectiveTimeTo:  GetTime(evoucherInfo.expireDate),
    applyFor: evoucherInfo.applyFor,
    deleted: false,
    effectHouseFrom : effectHoursDefault,
    effectMinuteseFrom : effectMinutesDefault,
    expireHoursFrom : expireHoursDefault,
    expireMinuteseFrom : expireMinutesDefault,
    discountValue: evoucherInfo.discountValue || null,
    duration: evoucherInfo.duration,
    effectiveDate: ConvertToDate(evoucherInfo.effectiveDate) || null,
    expireDate: ConvertToDate(evoucherInfo.expireDate)||  null,
    insuranceCompanyId: evoucherInfo.insuranceCompanyId || '',
    insuranceTypeId: evoucherInfo.insuranceTypeId || '',
    maxDiscountValue: evoucherInfo.maxDiscountValue || null,
    minContractValue: evoucherInfo.minContractValue || null,
    name: evoucherInfo.name || '',
    packageName: '',
    reasonReject:evoucherInfo.reasonReject || '',
    samePrice: evoucherInfo.samePrice || null,
    totalVoucher: evoucherInfo.totalVoucher || '',
    voucherType:  evoucherInfo.voucherType
  }
  const onClickBackHome = () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id='common.home' />,
        isShow: true,
        content: <FormattedMessage id='common.backHome.confirmMessage' />,
        onConfirm: () => {
          dispatch(goBackHomePage())
        }
      })
    )
  }
  const handleGetConfigTemplate = async (id) =>{
    if (statusSetInsuranceID) {
    const res = await EvoucherService.getInsuraceConfigTemplate(insuranTypeId,id)
    if (res.status !== 200) {
      return
    }
    if (res.data.length === 0 ) {
      setConfigTemplateRes(undefined)
      return
    }
    setConfigTemplateRes(res.data)
    const brandName = availableProducts.filter((product)=>{
      return product.id === insuranTypeId
    })
    setNameInsurance(brandName[0].nameInsurance);
    }
    else {
      return 
    }
  }
  const handleChangeInsuranceApply = (insurance ,setFieldValue) =>{
    const valueInsuranceFilter = insurance !== null ?   insurance.map((insurance)=>{
      handleGetConfigTemplate(insurance !== null ? insurance.value : null)
      return insurance.value
    } ) : null
    setInsuranceConfig(Array.isArray(valueInsuranceFilter) ? valueInsuranceFilter : [])
    setFieldValue('insuranceCompanyId', valueInsuranceFilter === null ? '' : valueInsuranceFilter.toString())
  }
  const handleGetCompany = async (id) =>{
    const res = await EvoucherService.getCompanyById(id)
    if (res.status === 200) {
      const companyFilter = res.data.map((company)=>{
        return {
          label: company.nameCompany,
          value: company.id,
          type: company.shortNameCompany
        }
      })
      setCompanyRes(companyFilter)
    }
    else{
      return
    }
  }
  const handelClickSubmit = (values) => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={getKeyLang('evoucher.edit.title.updateEvoucher')} />,
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('evoucher.management.question.updateEvoucher')}
          />
        ),
        onConfirm: async () => {
          const effectiveDate = moment(values.effectiveDate, 'YYYY-MM-DD HH:mm').utc(true);
          effectiveDate.set({h: values.effectHouseFrom, m: values.effectMinuteseFrom});
          const effectDateIS0 = moment(effectiveDate._d).toISOString()
          const expireDate = moment(values.expireDate, 'YYYY-MM-DD HH:mm').utc(true);
          expireDate.set({h: values.expireHoursFrom, m: values.expireMinuteseFrom});
          const expireDateIS0 = moment(expireDate._d).toISOString()
          values.effectiveDate = effectDateIS0
          values.expireDate = expireDateIS0
          const data = {
            ...values,
            id: id
          }
          const resolvedData = await EvoucherService.updateEvoucher(id, data)
          if (resolvedData.status === 200) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({
                id: getKeyLang('evoucher.edit.status.success')
              })
            )
            setDispatchActive((pre) => ++pre)
            history.push(addAppContextPath('/evoucher/management'))
            return true
          }
          else{
            BaseAppUltils.toastError(
              intl.formatMessage({ id: getKeyLang('account.error') })
            )
            return false
          }
        }
      })
    )
  }
  useEffect(() => {
    dispatch(getAllProduct())
    dispatch(getAllCompanies())
    const getInfoEvoucher = async () => {
      const res = await EvoucherService.getInfoEvoucher(id)
      if (res) {
        const data = (await res.data) || {}
        await setEvoucherInfo(data)
        if (data.status === AWAITING_ACTIVE || data.status === REJECTED) {
          setIsEditVoucher(true)
        }
        const resConfig = await EvoucherService.getInsuraceConfigTemplate(Number(res.data.insuranceTypeId),Number(res.data.insuranceCompanyId))
        if (res.status !== 200) {
          return
        }
        setConfigTemplateRes(resConfig.data)
        setNameInsurance(res.data.insuranceTypeName)
        handleGetCompany(res.data.insuranceTypeId)
        setInsuranceConfig(res.data.insuranceCompanyId)
      }
    }
    getInfoEvoucher()
  }, [])
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange = {validateAfterSubmit}
      validateOnBlur ={ validateAfterSubmit}
      onSubmit={handelClickSubmit}
      enableReinitialize
    >
      {({
        touched,
        errors,
        initialValues,
        setFieldValue,
        submitForm,
        getFieldMeta
      }) => (
        <Card>
          <CardHeader>
            <CardTitle>
              <p className='font-weight-bold text-uppercase'>
                {isEditVoucher ? (
                  <FormattedMessage id={getKeyLang('evoucher.edit.title')} />
                ) : (
                  <FormattedMessage id={getKeyLang('evoucher.edit.detail')} />
                )}
              </p>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className='mb-3'>
              <BaseFormGroup
                disabled={!isEditVoucher}
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`evoucher.create.promotionName`)}
                fieldName={`name`}
              />
            </div>
            <Row>
              <Col md={6} className='mb-2'>
                <BaseFormGroupSelect
                disabled={!isEditVoucher}
                  isMulti
                  errors={errors}
                  touched={touched}
                  defaultValue={insurannFilter}
                  messageId={getKeyLang("evoucher.create.productApply")}
                  isClearable={false}
                  fieldName={`insuranceTypeId`}
                  options={productsSuggestion}
                  onChange={(e)=>{
                    setStatusSetInsuranCompanyId(true)
                    if(insuranTypeId !== e.value ){
                      setConfigTemplateRes(undefined)
                    }
                    setStatusSetInsuranceID(true)
                    setFieldValue('insuranceTypeId' , e.value)
                    setInsuranTypeId(e.value)
                    handleGetCompany(e.value)
                  }}
                />
              </Col>
              <Col md={6} className='mb-2'>
              <Select
                  isMulti={true}
                  errors={errors}
                  touched={touched}
                  value={insuranceConfig}
                  placeholder={intl.formatMessage({
                    id: getKeyLang(`evoucher.create.branchInsuranceApply`)
                  })}
                  isMulti
                  isClearable={false}
                  options={companyRes}
                  onChange={(e)=>{
                    handleChangeInsuranceApply(e , setFieldValue)
                    setStatusSetInsuranCompanyId(true)
                  }}
                />
              </Col>
            </Row>
            {
              configTemplateRes === undefined ? null :   <InsurancePakage setFieldValue={setFieldValue} configTemplateRes={configTemplateRes} nameInsurance={nameInsurance} touched={touched}  errors={errors} initialValues={initialValues} getFieldMeta={getFieldMeta} configDefault={evoucherInfo.insuranceConfigList}/>
            }
            <Row>
              <Col md={4} className='mb-2'>
                <span className='font-weight-bold'>
                  <FormattedMessage
                    id={getKeyLang('evoucher.create.amountEVoucher')}
                  />
                </span>
              </Col>
              <Col md={8} className='mb-2'>
                <BaseFormGroup
                  disabled={!isEditVoucher}
                  errors={errors}
                  touched={touched}
                  messageId={getKeyLang(`evoucher.create.amountEVoucher`)}
                  fieldName={`totalVoucher`}
                />
              </Col>
            </Row>
            <DuractionSlider
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              initialValues={initialValues}
              evoucherInfo={evoucherInfo}
              isEdit={isEditVoucher}
              effectMinutesDefault={effectMinutesDefault}
              effectHoursDefault={effectHoursDefault}
            />
            <FormSelectPromotion setFieldValue={setFieldValue}  isEdit={isEditVoucher} original={evoucherInfo} initialValues={initialValues}/>
            <div style={{
              marginTop : "50px"
            }}>
              {
                evoucherInfo.status === REJECTED ?
                <BaseFormGroup disabled messageId={getKeyLang('evoucher.edit.reasonRejected')} fieldName='reasonReject' />
                 : null
              }
            </div>
          </CardBody>
          <CardFooter>
            <div className='d-flex justify-content-end '>
              {isEditVoucher ? (
                <Button.Ripple
                  color='primary'
                  className='mr-2'
                  onClick={() => {
                    submitForm()
                    setValidateAfterSubmit(true)
                  }}
                >
                  <FormattedMessage
                    id={getKeyLang(
                      'evoucher.management.acticon.updateEvoucher'
                    )}
                  />
                </Button.Ripple>
              ) : null}

              <Button.Ripple
                color='primary'
                className='mr-2'
                onClick={() => {
                  history.push(addAppContextPath('/evoucher/management'))
                }}
              >
                <FormattedMessage
                  id={getKeyLang('evoucher.management.acticon.goBack')}
                />
              </Button.Ripple>
              <Button.Ripple
                color='secondary'
                className=''
                onClick={onClickBackHome}
              >
                <FormattedMessage id='common.home' />
              </Button.Ripple>
            </div>
          </CardFooter>
        </Card>
      )}
    </Formik>
  )
}

export default EditEvoucher
