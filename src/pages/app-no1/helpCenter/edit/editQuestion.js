import {
  BaseAppUltils,
  Button,
  goBackHomePage,
  showConfirmAlert
} from 'base-app'
import classnames from 'classnames'
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl/lib'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1/index'
import {
  getAllCategoryQuestion, loadUserGroupAuthenticate
} from '../../../../redux/actions/app-no1/helpCenterCreate'
import HelpCenterSevice from '../../../../services/app-no1/helpCenter'
import { APPROVALED, DRAFT, USER_ROLE } from '../utility'
import ProfessionalDocuments from './components/ProfessionalDocuments'
import QuestionForm from './components/QuestionForm'
import UserMmanualForm from './components/UserManualForm'
import {
  initialValuesCategory, validateSchema
} from './formikConfig'
import { ALL, CHTG, HDSD, TLNV , PARTNER ,INDIVIDUAL, WAITTING_APPROVAL } from './utility'
const EditQuestion = () => {
  const {user} = useSelector(state => state.auth)
  const isAdmin = user.groupId === USER_ROLE.ADMIN
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [applyForType, setApplyForType] = useState([]);
  const [questionType, setQuestionType] = useState('');
  const [draftStatus, setDraftStatus] = useState(false);
  const intl = useIntl()
  const [infoQuestion, setInfoQuestion] = useState({});
  const {
    availableUserGroupAuthenticate,
    categoryQuestion
  } = useSelector((state) => state.app.helpCenterCreate)
  const [fileSelect, setFileSelect] = useState({})
  const [isEmptyTextEditor, setIsEmptyTextEditor] = useState(0)
  const [categoryValues, setCategoryValues] = useState()
  const [permissionValues, setPermissionValues] = useState('')
  const [validationAfterSubmit, setValidationAfterSubmit] = useState(false)
  const [dispatchDependency, setDispatchActive] = useState(0)
  const dependencies = [
    categoryQuestion.length,
    history.location.pathname,
    dispatchDependency
  ]
  const availableUserGroupAuthenticateFilter = availableUserGroupAuthenticate.map(user => {
    return {
      label: `${user.name} - ${user.description}`,
      value: user.code
    }
  })
  const handleUploadFilePDF = async (file) => {
    setFileSelect(file)
    const formData = new FormData()
    formData.append(
      'file', file ,  file.name
    )
    formData.append(
      'docCode' , 'QA_01_21102021_19'
    )
    const resFile = await HelpCenterSevice.AddFile(formData)
    if (resFile.status === 200) {
      setFieldValue('rsLinkPDF' , resFile.data.downloadFromUrl)
      return 
    }
  }
  const handleSubmitClick = (values) => {
    console.log(values);
    if(!values.public) {values.applyFor = PARTNER}
    const typeCategoryQuestion = values.categoryQuestionType
    delete values.categoryQuestion
    if (draftStatus) {
      dispatch(
        showConfirmAlert({
          title: <FormattedMessage id={getKeyLang('helpcenter.management.edit.title')} />,
          isShow: true,
          content: (
            <FormattedMessage
              id={getKeyLang('helpcenter.management.edit.confirm')}
            />
          ),
          onConfirm: async () => {
            const data = {
              ...values , 
              status : DRAFT
            }
            const res = await HelpCenterSevice.UpdateDraft(
              values.id,
              values.categoryQuestionType ,
              data
            )
            if (res) {
              resetForm()
              setIsEmptyTextEditor((pre) => ++pre)
              setCategoryValues('')
              setPermissionValues('')
              BaseAppUltils.toastSuccess(
                intl.formatMessage({ id: getKeyLang('userGroup.createDone') })
              )
              history.push(`${values.categoryQuestionType === CHTG ? '/app/help-center/management-question' : values.categoryQuestionType === HDSD ? '/app/help-center/management-user-manual' : values.categoryQuestionType === TLNV ? '/app/help-center/management-professional-document' : ''}`)
            } else {
              BaseAppUltils.toastError(
                intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
              )
              return
            }
          }
        })
      )
    }else{
      dispatch(
        showConfirmAlert({
          title: <FormattedMessage id={getKeyLang('helpcenter.management.edit.title')} />,
          isShow: true,
          content: (
            <FormattedMessage
              id={getKeyLang('helpcenter.management.edit.confirm')}
            />
          ),
          onConfirm: async () => {
            const data = {
              ...values ,
              status : isAdmin ? APPROVALED : WAITTING_APPROVAL
            }
            const res = await HelpCenterSevice.UpdateQuestion(
              typeCategoryQuestion,
              values.id,
              data 
            )
            if (res) {
              BaseAppUltils.toastSuccess(
                intl.formatMessage({ id: getKeyLang('helpcenter.edit.update.success') })
              )
              history.push(`${values.categoryQuestionType === CHTG ? '/app/help-center/management-question' : values.categoryQuestionType === HDSD ? '/app/help-center/management-user-manual' : values.categoryQuestionType === TLNV ? '/app/help-center/management-professional-document' : ''}`)
            } else {
              BaseAppUltils.toastError(
                intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
              )
              return
            }
          }
        })
      )
    }
  }
  const formik = useFormik({
    initialValues: {
      id : infoQuestion.id,
      applyFor: infoQuestion.applyFor,
      question: infoQuestion.question,
      resultText: infoQuestion.resultText,
      categoryQuestionId: infoQuestion.categoryQuestionId,
      categoryQuestionType: infoQuestion.categoryQuestionType,
      sendTo: infoQuestion.sendTo,
      rsLinkPDF: infoQuestion.rsLinkPDF,
      rsLinkYT: infoQuestion.rsLinkYT,
      public: false,
      deleted: infoQuestion.deleted,
      categoryQuestionType : infoQuestion.categoryQuestionType },
    onSubmit: handleSubmitClick,
    validationSchema: validateSchema,
    validateOnChange: validationAfterSubmit,
    validateOnBlur: validationAfterSubmit,
    enableReinitialize : true
  })
  const {
    getFieldMeta,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
    resetForm
  } = formik
  const categorySuggestion = categoryQuestion.map((category) => {
    return {
      value: category.id,
      label: category.name,
      type: category.categoryQuestionType
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
  const reActivedAPI = () => {
    setDispatchActive((pre) => ++pre)
  }
  const handleChangeCategory = async (original) => {
    const typeHelpCenter = getFieldMeta('categoryQuestionType').value
    if (original.__isNew__) {
      const newCategory = {
        ...initialValuesCategory,
        categoryQuestionName: original.label
      }
      const res = await HelpCenterSevice.CreateCategoryQuestion(
        typeHelpCenter,
        newCategory
      )
      if (res) {
        setFieldValue('categoryQuestionId', res.id)
        reActivedAPI()
        return
      }
    } else {
      setFieldValue('categoryQuestionId', original.value)
      setCategoryValues(original)
      return
    }
  }
  const handleChecked = (e, type) => {
    if (applyForType[0] === ALL) {
      if (e === false && type === PARTNER) {
        setApplyForType([INDIVIDUAL])
      }
    }
    if (applyForType[0] === ALL) {
      if (e === false && type === INDIVIDUAL) {
        setApplyForType([PARTNER])
      }
    }
    else{
    let newArray = [...applyForType ,type]
    setApplyForType(newArray)
    if (applyForType.includes(type)) {
      newArray = newArray.filter(applyfor => applyfor !== type);
      setApplyForType(newArray)
    }
    setFieldValue('applyFor' , newArray.length === 2 ? 'ALL' : newArray.length === 0 ? null : newArray[0])
    }
    
  }
  const [activeTab, setActiveTab] = useState('1')
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  useEffect(() => {
    dispatch(getAllCategoryQuestion())
    dispatch(loadUserGroupAuthenticate())
    const getInfoQuestion =async () =>{
        const resInfo = await HelpCenterSevice.getInfoQuestion(id)
        if (resInfo.status === 200) {
            const data = await resInfo.data || {}
            setInfoQuestion(data);
            setQuestionType(data.status)
            if (data.categoryQuestionType === CHTG) {
                setActiveTab('1')
            }
            if (data.categoryQuestionType === HDSD) {
                setActiveTab('2')
            }
            if (data.categoryQuestionType === TLNV) {
                setActiveTab('3')
            }
            if(data.sendTo === '' || data.sendTo === null){
              setFieldValue('public' , true)
            }
            setApplyForType([data.applyFor])
            const cateFilter = categoryQuestion.filter((cate) =>{
                return cate.id === data.categoryQuestionId
            })
            const cateMap = cateFilter !== null ? cateFilter.map(cate =>{
                return {
                    value : cate.id,
                    label : cate.name
                }
            }) : null
            setCategoryValues(cateMap)
            if (data.rsLinkPDF !== null) {
              setFileSelect(data.rsLinkPDF)
            }
            setPermissionValues(data.sendTo)
            
        }
    }
    getInfoQuestion()
  }, [...dependencies])
  return (
    <div>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>
                <span className='text-uppercase font-weight-bold'>
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
                  disabled={infoQuestion !== CHTG}
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1')
                      setFieldValue('categoryQuestionType', 'CHTG')
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang('helpcenter.create.askedQuestion')}
                    />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  disabled={infoQuestion !== HDSD}
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2')
                      setFieldValue('categoryQuestionType', 'HDSD')
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang('helpcenter.create.userManual')}
                    />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  disabled={infoQuestion !== TLNV}
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => {
                      toggle('3')
                      setFieldValue('categoryQuestionType', 'TLNV')
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
                    categorySuggestion={categorySuggestion}
                    handleChangeCategory={handleChangeCategory}
                    suggestionPermission={availableUserGroupAuthenticateFilter}
                    setPermissionValues={setPermissionValues}
                    permissionValues={permissionValues}
                    categoryValues={categoryValues}
                    isEmptyTextEditor={isEmptyTextEditor}
                    handleChecked={handleChecked}
                    applyForType={applyForType}
                    setApplyForType={setApplyForType}
                    />
                </TabPane>
                <TabPane tabId='2'>
                  <UserMmanualForm
                    setFieldValue={setFieldValue}
                    getFieldMeta={getFieldMeta}
                    errors={errors}
                    touched={touched}
                    categorySuggestion={categorySuggestion}
                    handleChangeCategory={handleChangeCategory}
                    suggestionPermission={availableUserGroupAuthenticateFilter}
                    setPermissionValues={setPermissionValues}
                    permissionValues={permissionValues}
                    categoryValues={categoryValues}
                    handleUploadFilePDF={handleUploadFilePDF}
                    fileSelect={fileSelect}
                    handleChecked={handleChecked}
                    applyForType={applyForType}
                    setApplyForType={setApplyForType} 
                     />
                </TabPane>
                <TabPane tabId='3'>
                  <ProfessionalDocuments
                    setFieldValue={setFieldValue}
                    getFieldMeta={getFieldMeta}
                    errors={errors}
                    touched={touched}
                    categorySuggestion={categorySuggestion}
                    handleChangeCategory={handleChangeCategory}
                    suggestionPermission={availableUserGroupAuthenticateFilter}
                    setPermissionValues={setPermissionValues}
                    permissionValues={permissionValues}
                    categoryValues={categoryValues}
                    handleUploadFilePDF={handleUploadFilePDF}
                    fileSelect={fileSelect}
                    handleChecked={handleChecked}
                    applyForType={applyForType} 
                    setApplyForType={setApplyForType}
                    />
                </TabPane>
              </TabContent>
            </CardBody>
            <CardFooter>
              <div class='d-flex justify-content-end'>
              {questionType === DRAFT ?
               <div>
                 <Button.Ripple
                    type='submit'
                    color='primary'
                    className='mr-2'
                    onClick={() => {
                      setValidationAfterSubmit(true)
                      setDraftStatus(true)
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang('helpcenter.create.draft')}
                    />
                  </Button.Ripple>
                  <Button.Ripple
                    type='submit'
                    color='primary'
                    className='mr-2'
                    onClick={() => {
                      setValidationAfterSubmit(true)
                      setDraftStatus(false)
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang('helpcenter.create.title')}
                    />
                  </Button.Ripple>
               </div>
                 :  <Button.Ripple
                  type='submit'
                  color='primary'
                  className='mr-2'
                  onClick={() => {
                    setValidationAfterSubmit(true)
                  }}
                >
                  <FormattedMessage
                    id={'Cập nhật'}
                  />
                </Button.Ripple> }
                <Button.Ripple
                  type='submit'
                  color='primary'
                  className='mr-2'
                  onClick={() => {
                   history.push('/app/help-center/management-question')
                  }}
                >
                  <FormattedMessage
                    id={getKeyLang('button.goback')}
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

export default EditQuestion
