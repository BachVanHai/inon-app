import {
  BaseAppUltils, BaseFormGroup,
  goBackHomePage,
  Select,
  showConfirmAlert
} from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { Button, CardBody, CardFooter, Label, Row } from 'reactstrap'
import Card from 'reactstrap/lib/Card'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardTitle from 'reactstrap/lib/CardTitle'
import Col from 'reactstrap/lib/Col'
import FormGroup from 'reactstrap/lib/FormGroup'
import TextEditor from '../../../../components/supplement-app/TextEditor'
import { addAppContextPath, getKeyLang } from '../../../../configs/supplement-app'
import { loadListAccountsPending } from '../../../../redux/actions/supplement-app/debtApproval'
import {
  loadALllTypeNotification,
  loadInfoNotification, loadListSuggestion, loadUserGroupAuthenticate
} from '../../../../redux/actions/supplement-app/notificationCreate'
import NotificationService from '../../../../services/supplement-app/notification'
import EndDatePicker from './EndDatePicker'
import { initialValues, validationSchema } from './formikConfig'
import SelectSentGroup from './SelectSentGroup'
import StartDatePicker from './StartDatePicker'
import {
  DATE, KEY_DATE_FROM_DEFAULT, MONTH, OUTOFDATE, WEEK
} from './utility'
import PreviewModal from './PreviewModal';
const NewNotification = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [notificationInfo, setNotificationInfo] = useState({});
  const [isActiveNotf, setIsActiveNotf] = useState(false);
  const [isRejectedNotif, setIsRejectedNotif] = useState(false);
  const [statusNotification, setStatusNotification] = useState(false)
  const [checkTimeNow, setcheckTimeNow] = useState(false);
  const [contentDefault, setContentDefault] = useState()
  const [draftStatus, setdraftStatus] = useState(false);
  const [isEmptyTextEditor, setIsEmptyTextEditor] = useState(0)
  const [shortContentDefault, setShortContentDefault] = useState()
  const [statusSentToGroup, setStatusSentToGroup] = useState(false)
  const [sendToValue, setSendToValue] = useState(
    [] || getKeyLang(`notification.create.sendTo.recipientGroup`)
  )
  const [excludeSendTo, setExcludeSendTo] = useState(
    [] || getKeyLang(`notification.create.sendTo.recipientGroup`)
  )
  const { id } = useParams()
  const [dispatchDependency, setDispatchActive] = useState(0)
  const handleClosePreviewModal = () =>{
    setIsOpenPreviewModal(false)
  }
 const handleOpenPreviewModal = () =>{
    setIsOpenPreviewModal(true)
  }
  const HandleCheckId = () => {
    if (id === undefined) {
      const typeNotification_suggestion = availableTypeNotification.map((notif) => {
        return {
          label: notif.name,
          type: notif.code,
          value: notif.id
        }
      })
      setIsEdit(false)
      setStatusSentToGroup(false)
      setStatusNotification(false)
      setStatusSendPeriodically(false)
      setTypeNotification(typeNotification_suggestion[0])
      setFieldValue('sendTo' , '')
      setFieldValue('excludeSendTo' , '')
      setContentDefault('')
      setShortContentDefault('')
      setSendToValue('')
      setExcludeSendTo('')
      resetForm()
      return false
    } else {
      setIsEdit(true)
      dispatch(loadInfoNotification(id))
      const getInfoNotification = async () => {
        const res = await NotificationService.getInfoNotificaion(id)
        if (res !== {}) {
          setNotificationInfo(res)
          const code = res.code !== undefined ?  res.code.substring(0, res.code.length - 8) : null
          const notificatioTypeDefault = availableTypeNotification.filter((notif) =>{
            return notif.code === code
          })
          const TypeNotificationId = notificatioTypeDefault.map((notif) =>{
            return {
              label: notif.name,
              type: notif.code,
              value: notif.id
            }
          })
          const frequencyFilter = frequencyList.filter((frequency) =>{
            return frequency.type === res.frequency
          })
          setFrequencyValue(frequencyFilter);
          const startTime = moment(res.startDate).utc(true).format('H:mm')
          const endTime = moment(res.endDate).utc(true).format('H:mm')
          const startDate = moment(res.startDate).utc(true).format('YYYY-MM-DD')
          const endDate = moment(res.endDate).utc(true).format('YYYY-MM-DD')
          const effectiveTime  = moment(res.startDate).utc(true).format('YYYY-MM-DD H:mm')
          const expireTime = moment(res.endDate).utc(true).format("YYYY-MM-DD H:mm")
          const getEffectiveHours = moment(effectiveTime).get('hours')
          const getEffectiveMinutes = moment(effectiveTime).get('minutes')
          const getExpireHours = moment(expireTime).get('hours')
          const getExpireMinutes = moment(expireTime).get('minutes')
          setFieldValue('effectHoursFrom',getEffectiveHours)
          setFieldValue('effectMinutesTo',getEffectiveMinutes)
          setFieldValue('expireHoursFrom',getExpireHours)
          setFieldValue('expireMinutesTo',getExpireMinutes)
          setFieldValue('startDate' , startDate)
          setFieldValue('endDate' , endDate)
          setFieldValue('title', res.title)
          setFieldValue('content', res.content)
          setFieldValue('shortContent', res.shortContent)
          setFieldValue('sendTo' , res.sendTo)
          setFieldValue('excludeSendTo' , res.excludeSendTo)
          setFieldValue('period', res.period)
          setFieldValue('effectTime', startTime)
          setFieldValue('frequency', res.frequency)
          setFieldValue('expireTime', endTime)
          setFieldValue('rejectReason', res.rejectReason)
          setFieldValue('codeNotificationType',code)
          setFieldValue('createBy' ,res.createBy)
          setFieldValue('createDate' ,res.createDate)
          setContentDefault(res.content)
          setTypeNotification(TypeNotificationId[0])
          setShortContentDefault(res.shortContent)
          if ((res.status === 'TIMEOUT' || res.status === 'WAITINGTOSEND' || res.status === 'OUTOFDATE' || res.status === 'SENT' )) {
            setIsActiveNotf(true)
          }
          if (res.status === 'REJECTED') {
            setIsRejectedNotif(true)
          }
          if(res.status === 'DRAFT' || res.status === 'NEW'){
            setdraftStatus(true)
          }
          if(res.period){
            setStatusSendPeriodically(true)
           }
          if (code === 'USER') {
            setStatusSentToGroup(true)
            const sendToDefault = JSON.parse(res.sendTo)
            const sendToDefaultFilterValue = sendToDefault !== {} ?  sendToDefault.map((sendTo) =>{
              return `${sendTo.id}_${sendTo.type}` 
            }).join() : []
            setSendToValue(sendToDefaultFilterValue)
            const excludeSendToDefault = JSON.parse(res.excludeSendTo)
            const excludeSendToFilterValue = excludeSendToDefault !== {} ? excludeSendToDefault.map((excludeSendTo) =>{
              return `${excludeSendTo.id}_${excludeSendTo.type}` 
            }).join() : []
          setExcludeSendTo(excludeSendToFilterValue)
          }
         return
        }
        else{
          BaseAppUltils.toastError(
            intl.formatMessage({ id: getKeyLang('account.error') })
          )
          return
        }
      }
      getInfoNotification()
    }
  }
  const intl = useIntl()
  const [statusSendPeriodically, setStatusSendPeriodically] = useState(false)
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false); 
  const { availableTypeNotification, availableUserGroupAuthenticate, availableAccountSuggest } = useSelector(
    (state) => state.app.notificationCreate
  )
  const dependencies = [
    availableTypeNotification.length,
    availableAccountSuggest.length,
    history.location.pathname,
    dispatchDependency
  ]
  const typeNotification_suggestion = availableTypeNotification.map((notif) => {
    return {
      label: notif.name,
      type: notif.code,
      value: notif.id
    }
  })
  const availableUserGroupAuthenticateFilter = availableUserGroupAuthenticate.map(user => {
    return {
      label: `[Nhóm quyền] ${user.name} - ${user.description}`,
      type: "GROUP",
      value:user.name
    }
  })
  const availableUserGroup = availableAccountSuggest.map(user => {
    return {
      label: `[Tài khoản] ${user.userCode} - ${user.fullName}`,
      type: "USER",
      value: user.id
    }
  })
  const suggestion_group = [...availableUserGroupAuthenticateFilter.map(item => ({...item, value : `${item.value}_GROUP`})) , ...availableUserGroup.map(item => ({...item, value : `${item.value}_USER`})) ]
  const [typeNotification, setTypeNotification] = useState([])
  const BackHistory = () => {
    history.push(addAppContextPath('/notification/management'))
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
  const handleResetForm = () =>{
    setIsEmptyTextEditor(pre => ++pre)
    setcheckTimeNow(false)
    setStatusSendPeriodically(false)
    setSendToValue([])
    setExcludeSendTo([])
    setTypeNotification(typeNotification_suggestion[0])
    setStatusSentToGroup(false)
    resetForm()
  }
  const handleSubmitClick = (values) => {
    const timeNow = moment().format('H:mm')
    const startDate = moment(values.startDate , 'YYYY-MM-DD H:mm')
    const endDate = moment(values.endDate , 'YYYY-MM-DD H:mm')
    startDate.set({ h : values.effectHoursFrom , m : values.effectMinutesTo})
    endDate.set({ h : values.expireHoursFrom , m : values.expireMinutesTo})
    const startDateConvertToISOString = moment(startDate._d).utc(false).toISOString()
    const endDateConvertToISOString = moment(endDate._d).utc(false).toISOString()
    values.startDate = startDateConvertToISOString
    values.endDate = endDateConvertToISOString
    if (isEdit) {
      dispatch(
        showConfirmAlert({
          title: <FormattedMessage id={getKeyLang(`confirm.title.edit`)} />,
          isShow: true,
          content: (
            <FormattedMessage
              id={getKeyLang(`confirm.content.nothingChange`)}
            />
          ),
          onConfirm: async () => {
            const resolveData = await NotificationService.updateNotification(
              id,
              {
                ...values,
                id: id,
              }
            )
            if (resolveData) {
              BaseAppUltils.toastSuccess(
                intl.formatMessage({ id: getKeyLang('account.success') })
              )
              history.push(addAppContextPath('/notification/management'))
              setDispatchActive((pre) => ++pre)
              return
            }
            else{
              BaseAppUltils.toastError(
                intl.formatMessage({ id: getKeyLang('account.error') })
              )
              return
            }
          }
        })
      )
    } else {
    if(KEY_DATE_FROM_DEFAULT === moment(getFieldMeta('startDate').value).format('YYYY-MM-DD')){
      if (timeNow > values.effectTime) {
        setcheckTimeNow(true)
        return
      }
      if(timeNow <= values.effectTime){
        setcheckTimeNow(false)
      }
    }else{
      setcheckTimeNow(false)
    }
      dispatch(
        showConfirmAlert({
          title: (
            <FormattedMessage id={getKeyLang('notification.create.new')} />
          ),
          isShow: true,
          content: (
            <FormattedMessage
              id={getKeyLang('notification.create.question.comfirmMessage')}
            />
          ),
          onConfirm: async () => {
            const resolvedData = await NotificationService.createNotification({
              ...values,
              codeNotificationType :values.codeNotificationType
            })
            if (resolvedData) {
              setValidateAfterSubmit(false)
              BaseAppUltils.toastSuccess(
                intl.formatMessage({
                  id: getKeyLang('account.success.createNewDebt')
                })
              )
              handleResetForm()
              return false
            }
            else{
              BaseAppUltils.toastError(
                intl.formatMessage({ id: getKeyLang('account.error') })
              )
              return
            }
          }
        })
      )
    }
    if (draftStatus) {
      dispatch(
        showConfirmAlert({
          title: <FormattedMessage id={getKeyLang('notification.create.new')} />,
          isShow: true,
          content: (
            <FormattedMessage
              id={getKeyLang('notification.create.question.saveDraftMessage')}
            />
          ),
          onConfirm: async () => {
            if (notificationInfo.status === 'DRAFT') {
              const res = await NotificationService.updateDraftNotification(id, { ...values , id})
              if (res) {
                BaseAppUltils.toastSuccess(
                  intl.formatMessage({
                    id: getKeyLang('notification.create.success')
                  })
                )
              if(isEdit) {history.push(addAppContextPath('/notification/management'))}
              return true
              }
            }else{
              const resolvedData = await NotificationService.saveDraftNotification(values)
            if (resolvedData) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({
                id: getKeyLang('notification.create.success')
              })
            )
          handleResetForm()
          return true
          }
            }
          }
        })
      )
    }
  }
  const handleChangeTypeNotification = (original) => {
    if (original.type === 'SYSTEM' ||
      original.type === 'PROMOTION') {
      setStatusSentToGroup(false)
      setFieldValue('sendTo', null)
      setFieldValue('excludeSendTo', null)
    }
    if (
      original.type === 'USER'
    ) {
      setStatusSentToGroup(true)
      setFieldValue('sendTo', '')
      setFieldValue('excludeSendTo', '')
    }
    setFieldValue(`codeNotificationType`, original.type)
    setTypeNotification(original)
  }

  const frequencyList = useMemo(() => {
    return [
      {
        label: intl.formatMessage({
          id: getKeyLang('notification.create.frequency.byDay')
        }),
        value: 1,
        type: DATE
      },
      {
        label: intl.formatMessage({
          id: getKeyLang('notification.create.frequency.byWeek')
        }),
        value: 2,
        type: WEEK
      },
      {
        label: intl.formatMessage({
          id: getKeyLang('notification.create.frequency.byMonth')
        }),
        value: 3,
        type: MONTH
      }
    ]
  }, [])
  const [frequencyValue, setFrequencyValue] = useState(frequencyList[0])
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmitClick,
    validationSchema : validationSchema ,
    validateOnChange : validateAfterSubmit,
    validateOnBlur : validateAfterSubmit,
  })
  const {
    handleSubmit,
    getFieldProps,
    errors,
    setFieldValue,
    setFieldError,
    getFieldMeta ,
    touched ,
    setErrors,
    resetForm
  } = formik
  const notificationTitleProps = getFieldProps('title')
  const styles = {
    togglebutton: {
      marginBottom: 16
    }
  }
  const handleChangeValueFrequency = (original) => {
    setFrequencyValue(original)
    setFieldValue(`frequency`, original.type)
  }
  useEffect(() => {
    dispatch(loadALllTypeNotification())
    dispatch(loadListAccountsPending())
    dispatch(loadListSuggestion())
    dispatch(loadUserGroupAuthenticate())
    HandleCheckId()
    const date = new Date()
    const dateAddCovert = moment(date).add('minutes' , 5).format('YYYY-MM-DD H:mm')
    const expireHours = moment(dateAddCovert).get('hours')
    const expireMinutes = moment(dateAddCovert).get('minutes')
    const hours = moment(date).get('hours')
    const minutes = moment(date).get('minutes')
    setFieldValue('effectHoursFrom', hours)
    setFieldValue('effectMinutesTo',minutes)
    setFieldValue('expireHoursFrom', expireHours)
    setFieldValue('expireMinutesTo',expireMinutes)
  }, [...dependencies])
  return (
    <FormikProvider value={formik}>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className='text-uppercase'>
            {
              isEdit ? intl.formatMessage({
                id: getKeyLang('notification.edit.title')
              }) :   intl.formatMessage({
                id: getKeyLang(`notification.create.new`)
              })
            }
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs='12' md='5'>
                <FormGroup>
                  <Select
                    readOnly
                    disabled={isActiveNotf}
                    closeMenuOnSelect={true}
                    notRequired
                    classNamePrefix='select'
                    onChange={handleChangeTypeNotification}
                    value={typeNotification}
                    options={typeNotification_suggestion}
                    placeholder={
                      intl.formatMessage({
                        id: getKeyLang(`notification.create.type.selectType`)
                      })
                    }
                    isClearable={false}
                    className='mt-2'
                  />
                </FormGroup>
              </Col>
              <Col xs='12' md='2' className={`mb-1 text-lg-center text-left`}>
                <Label style={{
                  color : "#b5b6b9",
                  fontSize: "0.7rem"
                }}>
                  {intl.formatMessage({
                    id: getKeyLang(`notification.create.sendPeriodically`)
                  })}
                </Label>
                <div className="" style={{
                  marginTop : '8px'
                }}>
                  <Toggle
                  disabled={isActiveNotf}
                    checked={statusSendPeriodically}
                    label='Custom icon'
                    style={styles.togglebutton}
                    onClick={(e) => {
                      setStatusSendPeriodically(e.target.checked)
                      setFieldValue(`period`, e.target.checked)
                    }}
                  />
                </div>
              </Col>
              <Col xs='12' md='5' className={`mt-1 mb-1`}>
              <div style={{
                marginTop : '6px'
              }}>
              {statusSendPeriodically ?
                 <Select
                  readOnly
                  disabled={isEdit && !draftStatus}
                  closeMenuOnSelect={true}
                  notRequired
                  classNamePrefix='select mt-1'
                  onChange={handleChangeValueFrequency}
                  options={frequencyList}
                  value={frequencyValue}
                  placeholder={
                    intl.formatMessage({
                      id: getKeyLang(`notification.create.frequency`)
                    })
                  }
                  isClearable={false}
                /> : <StartDatePicker errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta} checkTimeNow={checkTimeNow} setcheckTimeNow={setcheckTimeNow} isEdit={isActiveNotf}/>}     
              </div>     
              </Col>
            </Row>
            <div className={`${statusSendPeriodically === false ? 'd-none' : 'visible'}`}>
              <Row>
                <Col md="6" className="mb-2">
                {statusSendPeriodically === false  ? null : <StartDatePicker errors={errors} setFieldValue={setFieldValue}
                getFieldMeta={getFieldMeta} checkTimeNow={checkTimeNow} setcheckTimeNow={setcheckTimeNow} isEdit={isActiveNotf}/>}
                </Col>
                <Col md="6" className="mb-2">
                <div >
                  {statusSendPeriodically ? (
                  <EndDatePicker errors={errors} setFieldValue={setFieldValue} getFieldMeta={getFieldMeta} isEdit={isActiveNotf}  checkTimeNow={checkTimeNow}/>
                            ) : null}
                  </div>
                </Col>
              </Row>
            </div>
            <Row>
              <Col md={12} lg={12} className={`mb-1`}>
                <BaseFormGroup
                  {...notificationTitleProps}
                  disabled={isActiveNotf}
                  messageId={getKeyLang(`notification.create.title`)}
                  fieldName={`title`}
                />
                  {
              getFieldMeta('title').error && (
                  <span className="text-danger">{errors.title}</span>
                )
              }
              </Col>
            </Row>
            <Row>
              <Col md={12} lg={12} className={`mb-2`}>
                <Label className="font-weight-bold">
                  {intl.formatMessage({
                    id: getKeyLang(`notification.create.shortContent`)
                  })}
                </Label>
                <TextEditor
                  name='shortContent'
                  formik={formik}
                  id={id}
                  defaultValueProps={isEdit ? shortContentDefault : ''}
                  minHeight='150px' 
                  maxHeight='150px'
                  errors={errors}
                  isEmpty={isEmptyTextEditor}
                  disabled={isActiveNotf}
                  placeholder={intl.formatMessage({
                    id: getKeyLang(`notification.create.shortContent`)
                  })}
                  className='mt-2'
                />
                 {
              getFieldMeta('shortContent').error && (
                  <span className="text-danger">{errors.shortContent}</span>
                )
              }
              </Col>
            </Row>
            <Row>
              <Col md={12} lg={12} className={`mb-2`}>
                <Label className="font-weight-bold">
                Nội dung chi tiết
                </Label>
               <div>
               <TextEditor
                  name='content'
                  isEmpty={isEmptyTextEditor}
                  defaultValueProps={isEdit ? contentDefault : ''}
                  formik={formik}
                  disabled={isActiveNotf}
                  minHeight='250px' 
                  maxHeight='250px'
                  errors={errors}
                  placeholder={"Nội dung chi tiết"}
                  className='mt-2'
                />
                 {
              getFieldMeta('content').error && (
                  <span className="text-danger">{errors.content}</span>
                )
              }
               </div>
              </Col>
            </Row>
            {
             isRejectedNotif ?  <div className="mt-2">
            <BaseFormGroup
               disabled
               messageId={getKeyLang(`notification.manangement.rejectReason`)}
              fieldName={`rejectReason`}
            />
            </div> : null
           }
            {statusSentToGroup ? <Row>
              <Col md={6}>
                <SelectSentGroup options={suggestion_group} values={sendToValue} placeholder={"notification.create.sendTo.recipientGroup"} fieldName="sendTo" setFieldValue={setFieldValue} setState={setSendToValue} getFieldMeta={getFieldMeta}  errors={errors} touched={touched} isEdit={isActiveNotf}/>
              </Col>
              <Col md={6}>
                <SelectSentGroup options={suggestion_group} values={excludeSendTo} placeholder={"notification.create.sendTo.excludingRecipients"} fieldName="excludeSendTo" setFieldValue={setFieldValue} setState={setExcludeSendTo} getFieldMeta={getFieldMeta}  errors={errors} touched={touched} isEdit={isActiveNotf}/>
              </Col>
            </Row> : null}
          
          </CardBody>
          <CardFooter>
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-end">
          {getFieldMeta('title').value !== '' || getFieldMeta('content').value !== '' || getFieldMeta('shortContent').value !== '' ? 
          <Button.Ripple
             type='button'
             color='primary'
             className="mb-2 mr-lg-1 ml-1"
             style={{
               width : "150px",
             }}
             onClick={handleOpenPreviewModal}
           >
             <FormattedMessage id='Xem trước' />
          </Button.Ripple>
        : null}
        {
                 isActiveNotf ? null :  <Button.Ripple
                  type='submit'
                  color='primary'
                  style={{
                    width : "150px",
                  }}
                  className={` ${statusNotification ? 'd-none' : ''} mb-2 mr-lg-1 ml-1`}
                  onClick={()=>{
                    setValidateAfterSubmit(true)
                    setdraftStatus(false)
                  }}
                >
                  <FormattedMessage
                    id={getKeyLang(`notification.create.button.finish`)}
                  />
                </Button.Ripple>
               }
               {isEdit? (
                  null
                ) : (
                  <Button.Ripple
                    type='submit'
                    color='primary'
                    className="mb-2 mr-lg-1 ml-1"
                    style={{
                      width : "150px",
                    }}
                    onClick={() =>{
                      setdraftStatus(true)
                      setValidateAfterSubmit(true)
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang(`notification.create.button.saveDraft`)}
                    />
                  </Button.Ripple>
                )}
        {
          notificationInfo.status === 'DRAFT' ? 
          <Button.Ripple
                    type='submit'
                    color='primary'
                    className="mb-2 mr-lg-1 ml-1"
                    style={{
                      width : "150px",
                    }}
                    onClick={() =>{
                      setdraftStatus(true)
                      setValidateAfterSubmit(true)
                    }}
                  >
                    <FormattedMessage
                      id={getKeyLang(`notification.create.button.saveDraft`)}
                    />
                  </Button.Ripple>
           : null
        }
        <Button.Ripple
                  type='button'
                  color='primary'
                  className="mb-2 mr-lg-1 ml-1"
                  style={{
                    width : "150px",
                  }}
                  onClick={BackHistory}
                >
                  <FormattedMessage id={getKeyLang(`button.goback`)} />
                </Button.Ripple>
                <Button.Ripple
                  type='button'
                  color='secondary'
                  className="mb-2 mr-lg-1 ml-1"
                  style={{
                    width : "150px",
                  }}
                  onClick={onClickBackHome}
                >
                  <FormattedMessage id={`common.home`} />
                </Button.Ripple>
          </div>
         <PreviewModal isOpen={isOpenPreviewModal} handleClosePreviewModal={handleClosePreviewModal}
         handleOpenPreviewModal={handleOpenPreviewModal} getFieldMeta={getFieldMeta}/>
          </CardFooter>
        </form>
      </Card>
    </FormikProvider>

  )
}

export default NewNotification
