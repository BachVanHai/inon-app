import { BaseAppUltils, Button, goBackHomePage, showConfirmAlert } from 'base-app'
import classnames from 'classnames'
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl/lib'
import { useDispatch, useSelector } from 'react-redux'
import { Prompt, Redirect, useHistory, useLocation } from 'react-router'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Modal, Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1/index'
import { getAllCategoryQuestion, loadUserGroupAuthenticate } from '../../../../redux/actions/app-no1/helpCenterCreate'
import HelpCenterSevice from '../../../../services/app-no1/helpCenter'
import { DRAFT } from '../utility'
import ProfessionalDocuments from './components/ProfessionalDocuments'
import QuestionForm from './components/QuestionForm'
import UserMmanualForm from './components/UserManualForm'
import { initialValues, validateSchema } from './formikConfig'
import { ALL, CHTG, HDSD, PARTNER, TLNV } from './utility'
const NewQuestion = () => { 
  const history = useHistory()
  const dispatch = useDispatch()
  const  location = useLocation()
  const [saveStatus, setSaveStatus] = useState(false);
  const intl = useIntl()
  const { availableUserGroupAuthenticate , categoryQuestion } = useSelector(
    (state) => state.app.helpCenterCreate
  )
  const categorySuggestion =  categoryQuestion.map((category) => {
    return {
      value: category.id,
      label: category.name,
      type: category.categoryQuestionType
    }
  })
  const [saveDrafStatus, setSaveDrafStatus] = useState(false);
  const [applyForType, setApplyForType] = useState([]);
  const [fileSelect, setFileSelect] = useState('');
  const [isEmptyTextEditor, setIsEmptyTextEditor] = useState(0)
  const [categoryValues, setCategoryValues] = useState([]);
  const [permissionValues, setPermissionValues] = useState('');
  const [validationAfterSubmit, setValidationAfterSubmit] = useState(false)
  const [dispatchDependency, setDispatchActive] = useState(0)
  const [categorySuggestionValue, setCategorySuggestion] = useState();
  const dependencies = [
    categoryQuestion.length,
    location.pathname ,
    history.location.pathname,
    dispatchDependency
  ]
  const availableUserGroupAuthenticateFilter = availableUserGroupAuthenticate.map(user => {
    return {
      label: `${user.name} - ${user.description}`,
      value: user.code
    }
  })
  const handleUploadFilePDF = async (file , getFieldMeta) => {
    setFileSelect(file)
    const formData = new FormData()
    formData.append(
      'file', file ,  file.name
    )
    formData.append(
      'docCode' , null
    )
    const resFile = await HelpCenterSevice.AddFile(getFieldMeta('categoryQuestionType').value ,formData)
    if (resFile.status === 200) {
      setFieldValue('rsLinkPDF' , resFile.data.downloadFromUrl)
      return 
    }
  }
  const handleSubmitClick = (values) => {
    if(!values.public) {values.applyFor = PARTNER}
    const typeCategoryQuestion = values.categoryQuestionType
    if (saveDrafStatus) {
      dispatch(
        showConfirmAlert({
          title: <FormattedMessage id={getKeyLang('helpcenter.create.draft')} />,
          isShow: true,
          content: (
            <FormattedMessage
              id={getKeyLang('helpcenter.create.confirmSaveDraft')}
            />
          ),
          onConfirm: async () => {
            const questionDraft = {
              ...values , 
              status : DRAFT
            }
            const res = await HelpCenterSevice.saveDraftQuestion(typeCategoryQuestion , questionDraft)
            if (res.status === 201) {
              resetForm()
              setIsEmptyTextEditor(pre => ++pre)
              setCategoryValues([])
              setPermissionValues('')
              setApplyForType('')
              setActiveTab('1')
              setFileSelect('')
              setFieldValue('public' , false)
              BaseAppUltils.toastSuccess(
                intl.formatMessage({ id: getKeyLang('helpcenter.create.draft.success') })
              )
              return 
            }
            else{
              BaseAppUltils.toastError(
                intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
              )
              return
            }
          }
        })
      )
      return
    }
    dispatch(
        showConfirmAlert({
          title: <FormattedMessage id={getKeyLang('helpcenter.create.title')} />,
          isShow: true,
          content: (
            <FormattedMessage
              id={getKeyLang('helpcenter.create.confirmCreate')}
            />
          ),
          onConfirm: async () => {
            const res = await HelpCenterSevice.CreateQuestion(typeCategoryQuestion , values)
            if (res.status === 201) {
              resetForm()
              setIsEmptyTextEditor(pre => ++pre)
              setPermissionValues('')
              setCategoryValues([])
              setApplyForType('')
              setFileSelect('')
              setActiveTab('1')
              setSaveStatus(false)
              BaseAppUltils.toastSuccess(
                intl.formatMessage({ id: getKeyLang('userGroup.createDone') })
              )
            }
            else{
              BaseAppUltils.toastError(
                intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
              )
              return
            }
          }
        })
      )
  }
  const formik = useFormik({
    initialValues: initialValues ,
    onSubmit: handleSubmitClick,
    validationSchema: validateSchema,
    validateOnChange: validationAfterSubmit,
    validateOnBlur: validationAfterSubmit
  })
  const {
    getFieldMeta,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
    resetForm,
    submitForm
  } = formik
  const handleChangeTypeCategorySuggestion = (type) =>{
    const cateFilter =  categorySuggestion.filter((cate)=>{
      return cate.type === type
    })
    setCategorySuggestion(cateFilter);
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
  const reActivedAPI = () => {
    setDispatchActive((pre) => ++pre)
  }
  const handleChangeCategory = async (original) => {
    const typeHelpCenter = getFieldMeta('categoryQuestionType').value
    if (original.__isNew__) {
      const newCategory = {
        categoryQuestionType: typeHelpCenter,
        name:  original.label,
      }
      const res = await HelpCenterSevice.CreateCategoryQuestion(
        newCategory
      )
      if (res) {
        setFieldValue('categoryQuestionId', res.id)
        handleChangeTypeCategorySuggestion(typeHelpCenter)
        reActivedAPI()
        BaseAppUltils.toastSuccess(
          intl.formatMessage({ id: getKeyLang('helpcenter.create.category.success') })
        )
        return
      }
    } else {
      setFieldValue('categoryQuestionId', original.value)
      setCategoryValues(original)
      return
    }
  }
  const handleChecked = (type) =>{
  let newArray = [...applyForType ,type]
  setApplyForType(newArray)
  if (applyForType.includes(type)) {
    newArray = newArray.filter(applyfor => applyfor !== type);
    setApplyForType(newArray)
  }
  setFieldValue('applyFor' , newArray.length === 2 ? 'ALL' : newArray.length === 0 ? null : newArray[0])
  }
  const [activeTab, setActiveTab] = useState('1')
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  useEffect(() => {
    dispatch(getAllCategoryQuestion())
    dispatch(loadUserGroupAuthenticate())
    handleChangeTypeCategorySuggestion(CHTG)
  }, [...dependencies])
  return (
    <div>
    <Prompt when={saveStatus} message={intl.formatMessage({ id: getKeyLang('helpcenter.outPage') })} />
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className='text-uppercase'>
                  <FormattedMessage
                    id={getKeyLang('helpcenter.create.title')}
                  />
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Nav tabs className='d-flex justify-content-around'>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1')
                      setFieldValue('categoryQuestionType', 'CHTG')
                      setFieldValue('rsLinkPDF', '')
                      setFieldValue('rsLinkYT', '')
                      handleChangeTypeCategorySuggestion(CHTG)
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang('helpcenter.create.askedQuestion')}
                    />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2')
                      setFieldValue('categoryQuestionType', 'HDSD')
                      setFieldValue('resultText', '')
                      handleChangeTypeCategorySuggestion(HDSD)
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang('helpcenter.create.userManual')}
                    />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => {
                      toggle('3')
                      setFieldValue('categoryQuestionType', 'TLNV')
                      setFieldValue('resultText', '')
                      handleChangeTypeCategorySuggestion(TLNV)
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang('helpcenter.create.document')}
                    />
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <QuestionForm
                    setFieldValue={setFieldValue}
                    getFieldMeta={getFieldMeta}
                    errors={errors}
                    touched={touched}
                    categorySuggestion={categorySuggestionValue}
                    handleChangeCategory={handleChangeCategory}
                    suggestionPermission={availableUserGroupAuthenticateFilter}
                    setPermissionValues={setPermissionValues}
                    permissionValues={permissionValues}
                    categoryValues={categoryValues}
                    isEmptyTextEditor={isEmptyTextEditor}
                    handleChecked={handleChecked}
                    applyForType={applyForType}
                    setSaveStatus={setSaveStatus}
                  />
                </TabPane>
                <TabPane tabId='2'>
                  <UserMmanualForm
                    setFieldValue={setFieldValue}
                    getFieldMeta={getFieldMeta}
                    errors={errors}
                    touched={touched}
                    categorySuggestion={categorySuggestionValue}
                    handleChangeCategory={handleChangeCategory}
                    suggestionPermission={availableUserGroupAuthenticateFilter}
                    setPermissionValues={setPermissionValues}
                    permissionValues={permissionValues}
                    categoryValues={categoryValues}
                    handleUploadFilePDF={handleUploadFilePDF}
                    fileSelect={fileSelect}
                    handleChecked={handleChecked}
                    applyForType={applyForType}
                    setSaveStatus={setSaveStatus}
                  />
                </TabPane>
                <TabPane tabId='3'>
                  <ProfessionalDocuments
                    setFieldValue={setFieldValue}
                    getFieldMeta={getFieldMeta}
                    errors={errors}
                    touched={touched}
                    categorySuggestion={categorySuggestionValue}
                    handleChangeCategory={handleChangeCategory}
                    suggestionPermission={availableUserGroupAuthenticateFilter}
                    setPermissionValues={setPermissionValues}
                    permissionValues={permissionValues}
                    categoryValues={categoryValues}
                    handleUploadFilePDF={handleUploadFilePDF}
                    fileSelect={fileSelect}
                    handleChecked={handleChecked}
                    applyForType={applyForType}
                    setSaveStatus={setSaveStatus}
                  />
                </TabPane>
              </TabContent>
            </CardBody>
            <CardFooter>
              <div class='d-flex justify-content-end'>
                <Button.Ripple
                  type='submit'
                  color='primary'
                  className='mr-2'
                  onClick={() => {
                    setSaveDrafStatus(false)
                    setValidationAfterSubmit(true)
                  }}
                >
                  <FormattedMessage
                    id={getKeyLang('helpcenter.create.title')}
                  />
                </Button.Ripple>
                <Button.Ripple
                type="submit"
                  color='primary'
                  className='mr-2'
                  onClick={() => {
                    setSaveDrafStatus(true)
                    setValidationAfterSubmit(true)
                  }}
                >
                  <FormattedMessage
                    id={getKeyLang('helpcenter.create.draft')}
                  />
                </Button.Ripple>
                <Button.Ripple
                  color='secondary'
                  className='mr-2'
                  onClick={onClickBackHome}
                >
                  <FormattedMessage id='common.home' />
                </Button.Ripple>
              </div>
            </CardFooter>
          </Card>
        </form>
      </FormikProvider>
    </div>
  )
}

export default NewQuestion
