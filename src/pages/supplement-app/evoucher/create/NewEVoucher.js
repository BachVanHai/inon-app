import {
  BaseAppUltils, BaseFormGroup, BaseFormGroupSelect, Button,
  goBackHomePage, showConfirmAlert , Select
} from 'base-app'
import { Formik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col, Row
} from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/supplement-app'
import {
  getAllProduct
} from '../../../../redux/actions/supplement-app/eVoucherCreate'
import EvoucherService from '../../../../services/supplement-app/evoucher'
import DuractionSlider from './duractionSlider'
import { initialValues, validationSchema } from './formikConfig'
import FormSelectPromotion from './formSelectPromotion'
import InsurancePackage from './insurancePackage'
import { selectStyled } from './utility'
const NewEVoucher = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const { availableProducts } = useSelector(
    (state) => state.app.evoucherCreate
  )
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const [configTemplateRes, setConfigTemplateRes] = useState()
  const [resetStatus, setResetStatus] = useState(false)
  const [insuranTypeId, setInsuranTypeId] = useState(null);
  const [statusSetInsuranceID, setStatusSetInsuranceID] = useState(false);
  const [statusInsuranCompanyId, setStatusSetInsuranCompanyId] = useState(false);
  const [dispatchDependency, setDispatchActive] = useState(0)
  const [insuranceConfig, setInsuranceConfig] = useState([]);
  const [companyRes, setCompanyRes] = useState([]);
  const [nameInsurance, setNameInsurance] = useState();
  const productsSuggestion = availableProducts.map((product) => {
    return {
      label: product.nameInsurance,
      value: product.id,
      type: product.shortNameInsurance
    }
  })
 
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
  }
  const handleChangeInsuranceApply = (insurance ,setFieldValue) =>{
    const valueInsuranceFilter = insurance !== null ?   insurance.map((insurance)=>{
      handleGetConfigTemplate(insurance !== null ? insurance.value : null)
      return insurance.value
    }).join() : null
    setInsuranceConfig(valueInsuranceFilter || [])
    setFieldValue('insuranceCompanyId', valueInsuranceFilter === null ? '' : valueInsuranceFilter.toString())
  }
  const handelClickSubmit = (values, {resetForm}) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage
            id={getKeyLang('evoucher.create.button.createEVoucher')}
          />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('evoucher.create.question.createEVoucher')}
          />
        ),
        onConfirm: async () => {
          const effectiveDate = moment(values.effectiveDate, 'YYYY-MM-DD H:mm:ss').utc(true);
          effectiveDate.set({h: values.effectHoursFrom, m: values.effectMinuteseFrom});
          const effectDateIS0 = moment(effectiveDate._d).toISOString()
          const expireDate = moment(values.expireDate, 'YYYY-MM-DD H:mm:ss').utc(true);
          expireDate.set({h: values.expireHoursFrom, m: values.expireMinuteseFrom});
          const expireDateIS0 = moment(expireDate).toISOString()
          values.effectiveDate = effectDateIS0
          values.expireDate = expireDateIS0
          const resolvedData = await EvoucherService.createEvoucher(values)
          if (resolvedData.status === 201) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({
                id: getKeyLang('evoucher.create.status.success')
              })
            )
            setDispatchActive((pre) => ++pre)
            resetForm({})
            setConfigTemplateRes(undefined)
            setCompanyRes([])
            setInsuranceConfig([])
            setResetStatus(true)
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
  }, [])
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={validateAfterSubmit}
      validateOnChange={validateAfterSubmit}
      onSubmit={handelClickSubmit}
      enableReinitialize
    >
      {({
        touched,
        errors,
        initialValues,
        setFieldValue,
        getFieldMeta,
        submitForm,
      }) => (
        <Card>
          <CardHeader>
            <CardTitle>
              <p className='font-weight-bold text-uppercase'>
                <FormattedMessage id={getKeyLang('evoucher.create.title')} />
              </p>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className='mb-3'>
              <BaseFormGroup
                errors={errors}
                touched={touched}
                messageId={getKeyLang(`evoucher.create.promotionName`)}
                fieldName={`name`}
              />
            </div>
            <Row>
              <Col md={6} className='mb-2'>
                <BaseFormGroupSelect
                  isMulti
                  errors={errors}
                  touched={touched}
                  messageId={getKeyLang("evoucher.create.productApply")}
                  isClearable={false}
                  fieldName={`insuranceTypeId`}
                  options={productsSuggestion}
                  onChange={(e)=>{
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
                  styles={selectStyled}
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
              configTemplateRes === undefined ? null :   <InsurancePackage setFieldValue={setFieldValue} configTemplateRes={configTemplateRes} nameInsurance={nameInsurance} touched={touched}  errors={errors} initialValues={initialValues} getFieldMeta={getFieldMeta} />
            }
            <div className="mb-3">
            <BaseFormGroup
                  type='number'
                  errors={errors}
                  touched={touched}
                  messageId={getKeyLang(`evoucher.create.amountEVoucher`)}
                  fieldName={`totalVoucher`}
                />
            </div>
            <DuractionSlider
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              initialValues={initialValues}
            />
            <FormSelectPromotion
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
              resetStatus={resetStatus}
            />
          </CardBody>
          <CardFooter>
            <div className='d-flex justify-content-end'>
              <Button.Ripple
                color='primary'
                className='mr-2'
                onClick={() => {
                  setValidateAfterSubmit(true)
                  
                  submitForm()
                }}
              >
                <FormattedMessage
                  id={getKeyLang('evoucher.create.button.createEVoucher')}
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

export default NewEVoucher
