import {
  BaseAppUltils,
  BaseFormGroup,
  Button,
  goBackHomePage,
  Radio,
  showConfirmAlert
} from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TextEditor from '../../../../components/app-no1/TextEditor'
import { CONNECTING_STATUS_SUCCESS, KEY_CONNECTING_STATUS, KEY_PAGE_CLICKED, NAME_CREATE_SUPPORT_REQUEST } from '../../../../components/elite-app/chat-box/reducer/ChatBox'
import { getRealNameOf, updateProps } from '../../../../components/elite-app/chat-box/utility'
import { usePageContext } from '../../../../components/insurance-app/common-page/page-context/PageContext'
import { getKeyLang } from '../../../../configs/app-no1'
import { NAME_CHAT_BOX } from '../../../../configs/insurance-app'
import SupportService from '../../../../services/app-no1/support'
import { KEY_SPLIT_USER_AVATAR } from '../utility'
import { initialValues, validateSchema } from './formikConfig'
import InfoUserForm from './infoUserForm'
import PopupSuccessProblem from './PopupSuccessProblem'
import SelectTypeProblem from './SelectTypeProblem'
import UploadFile from './UploadFile'
import { FORGUEST, FORME, PRODUCT, DROP } from './utility'
import { useHistory } from 'react-router-dom'
import TurndownService from 'turndown';

const NewRequest = () => {
  const { [KEY_CONNECTING_STATUS]: connectingStatus } = useSelector(state => state.app[NAME_CHAT_BOX])
  const [pageObj] = usePageContext()
  const { sockJs } = pageObj
  const history = useHistory()
  const _currenAvatar = "https://sit2.inon.vn/resources/images/default-user-avatar.png"
  const { user } = useSelector(state => state.auth)
  const codeInOn = user.groupId !== undefined ? user.groupId.substr(user.groupId.length - 2) : null
  const [imagesUpload, setImagesUpload] = useState([])
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhoneNumber, setUserPhoneNumber] = useState()
  const [applyForType, setApplyForType] = useState(FORME)
  const [typeChecked, setTypeChecked] = useState('PRODUCT');
  const [userSupportInfo, setUserSupportInfo] = useState({});
  const [isEmptyTextEditor, setIsEmptyTextEditor] = useState(0)
  const [prioritized, setPrioritized] = useState(DROP);
  const [channelType, setchannelType] = useState(null)
  const intl = useIntl()
  const dispatch = useDispatch()

  const handleUploadFile = async (file, code, roomId, supportBookId) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('SPBCode', code)
    const res = await SupportService.addFile(formData)
    if (res.status === 200) {
      const content = `<a href="${res.data.downloadFromUrl}" taget="_blank">${getRealNameOf(user)} đã gửi tệp đính kèm</a>`
      handleAddImageForRoomChat(content, roomId, supportBookId)
    }
  }

  const handleUploadFilePDF = (code, roomId, supportBookId) => {
    for (var i = 0; i < imagesUpload.length; i++) {
      let fileArr = imagesUpload[i]
      handleUploadFile(fileArr, code, roomId, supportBookId)
    }
  }

  function handleSendMsg(content, _roomId, id, isNotifyLog) {
    const bodyObj = {
      fromUser: user.id + KEY_SPLIT_USER_AVATAR
        + getRealNameOf(user) + KEY_SPLIT_USER_AVATAR
        + user?.userSettings.avatar + KEY_SPLIT_USER_AVATAR
        + getRealNameOf(user, true),
      contentText: content,
      roomId: _roomId,
      hCSupportBookId: id
    }
    if (isNotifyLog) {
      bodyObj["contentContentType"] = "notify-log"
    }
    sockJs.sendMessage(`/app/chat/${_roomId}`, JSON.stringify(bodyObj))
  }

  const handleAddImageForRoomChat = async (contentImage, roomId, supportBookId) => {
    const newMessage = {
      contentText: contentImage,
      fromUser: userSupportInfo.id + KEY_SPLIT_USER_AVATAR
        + userSupportInfo.name + KEY_SPLIT_USER_AVATAR
        + _currenAvatar + KEY_SPLIT_USER_AVATAR
        + userSupportInfo.name,
      hCSupportBookId: supportBookId,
      roomId: roomId,
      type: 'ATTACHMENT',
    }
    await SupportService.addMessageForRoomChat(newMessage)
  }

  const handleSubmitClick = async (values) => {
      // Create an instance of the Turndown service
      const turndownService = new TurndownService();

      const markdown = turndownService.turndown(values.contentText);
    if (connectingStatus !== CONNECTING_STATUS_SUCCESS) {
      BaseAppUltils.toastError(`Bạn đang thao tác quá nhanh, xin đợi giây lát`)
      return
    }
    if (applyForType === FORGUEST) {
      if (getFieldMeta('name').value.trim() !== '' && getFieldMeta('email').value.trim() !== '' && getFieldMeta('phoneNumber').value.trim() !== '' && errors.name === undefined && errors.email === undefined && errors.phoneNumber === undefined) {
        const newUser = {
          email: values?.email,
          name: values?.name,
          phoneNumber: values?.phoneNumber,
        }
        const resUser = await SupportService.createUserSupport(newUser)
        if (resUser.status === 201) {
          setUserSupportInfo(resUser.data)
        }
      }
    }

    const newRequest = {
      ...values,
      contentText : markdown,
      hCUserId: userSupportInfo.id,
      fromChannel: applyForType === FORME ? null : channelType
    }
    const res = await SupportService.createRequest(newRequest)
    if (res.status === 201) {
      const newMessage = {
        "contentText": res.data.content,
        "fromUser": res.data.hCUserId + KEY_SPLIT_USER_AVATAR
          + getRealNameOf(user) + KEY_SPLIT_USER_AVATAR
          + user?.userSettings?.avatar + KEY_SPLIT_USER_AVATAR
          + getRealNameOf(user, true),
        "hCSupportBookId": res.data.id,
        "roomId": res.data.roomId,
        "type": "ATTACHMENT",
      }
      handleOpenPopUP()
      resetForm()
      setApplyForType(FORME)
      setTypeChecked(PRODUCT)
      setchannelType(null)
      setIsEmptyTextEditor(pre => ++pre)
      BaseAppUltils.toastSuccess(
        intl.formatMessage({ id: getKeyLang('userGroup.createDone') })
      )
      history.push("/app/support/my-request")
      setImagesUpload([])
      await SupportService.addMessageForRoomChat(newMessage)
      const content = "Yêu cầu đang được kết nối tới nhân viên hỗ trợ. Vui lòng chờ trong giây lát"
      if (imagesUpload.length !== 0) {
        handleUploadFilePDF(res.data.code, res.data.roomId, res.data.id)
        handleSendMsg(content, res.data.roomId, res.data.id, true)
      } else {
        handleSendMsg(content, res.data.roomId, res.data.id, true)
      }
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: handleSubmitClick,
  })
  const { setFieldValue, errors, handleSubmit, resetForm, getFieldMeta } = formik

  const handleOnchangeFieldName = async (setValues, e) => {
    setValues(e)
  }
  const handleOpenPopUP = () => {
    setIsOpenPopup(true)
  }
  const hanleClosePopUp = () => {
    setIsOpenPopup(false)
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

  const createUserForMe = async () => {
    const newData = {
      name: user?.username,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      avatar: applyForType === FORME ? user?.userSettings?.avatar : _currenAvatar
    }
    const res = await SupportService.createUserSupport(newData)
    if (res.status === 201) {
      setUserSupportInfo(res.data)
    }
  }

  useEffect(() => {
    dispatch(updateProps([
      {
        prop: KEY_PAGE_CLICKED,
        value: NAME_CREATE_SUPPORT_REQUEST
      }
    ]))
  }, []) // eslint-disable-line

  useEffect(() => {
    createUserForMe()
  }, []) // eslint-disable-line

  return (
    <FormikProvider value={formik}>
      <Card>
        <CardHeader>
          <CardTitle>
            <h3 className='text-uppercase'>
              <FormattedMessage id={getKeyLang('support.create.title')} />
            </h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div>
              {
                codeInOn === "IO" ? <div className='mb-2'>
                  <Row>
                    <Col
                      md={6} xs={6}
                      className='d-flex align-items-center mb-2'
                    >
                      <Radio
                        checked={applyForType === FORME}
                        onChange={() => {
                          setApplyForType(FORME)
                          setFieldValue('applyFor', FORME)
                          createUserForMe()
                        }}
                      />
                      <span>
                        <FormattedMessage
                          id={getKeyLang('support.create.forMe')}
                        />
                      </span>
                    </Col>
                    <Col
                      md={6} xs={6}
                      className='d-flex align-items-center mb-2'
                    >
                      <Radio
                        checked={applyForType === FORGUEST}
                        onChange={() => {
                          setApplyForType(FORGUEST)
                          setFieldValue("applyFor", FORGUEST)
                        }}
                      />
                      <span>
                        <FormattedMessage
                          id={getKeyLang('support.create.forGuest')}
                        />
                      </span>
                    </Col>
                  </Row>
                </div> : null
              }
              <div>
                {
                  applyForType === FORGUEST ? <InfoUserForm handleOnchangeFieldName={handleOnchangeFieldName} setUserName={setUserName} setUserEmail={setUserEmail} setUserPhoneNumber={setUserPhoneNumber} prioritized={prioritized} setPrioritized={setPrioritized} setFieldValue={setFieldValue} setchannelType={setchannelType} /> : null
                }
              </div>
              <div>
                <SelectTypeProblem setFieldValue={setFieldValue} typeChecked={typeChecked} setTypeChecked={setTypeChecked} />
              </div>
              <div className='mt-1'>
                <BaseFormGroup
                  messageId={getKeyLang('support.create.titleProblem')}
                  fieldName='titleText'
                />
              </div>
              <div>
                <p className='font-weight-bold'>
                  <FormattedMessage id={getKeyLang('support.create.detail')} />
                </p>
                <TextEditor
                  name='contentText'
                  formik={setFieldValue}
                  defaultValueProps={''}
                  minHeight='250px'
                  errors={errors}
                  //   handleChangeValue={()=>setSaveStatus(true)}
                  maxHeight='250px'
                  isEmpty={isEmptyTextEditor}
                  placeholder={"Nội dung chi tiết"}
                  className='mt-2'
                />
              </div>
              <div className='mt-2 mb-2'>
                <UploadFile
                  fileSelect={imagesUpload}
                  handleChange={(e) => {
                    let arrImg = []
                    for (var i = 0; i < e.target.files.length; i++) {
                      let fileArr = e.target.files[i]
                      arrImg.push(fileArr)
                    }
                    setImagesUpload(arrImg)
                  }}
                />
              </div>
              <div
                className='d-flex justify-content-lg-end justify-content-md-end
               justify-content-sm-end justify-content-between flex-wrap'
              >
                <Button.Ripple
                  type='submit'
                  color='primary'
                  className='mr-lg-2'
                // onClick={()=>setValidateAfterSubmit(true)}
                >
                  Gửi yêu cầu
                </Button.Ripple>
                <Button.Ripple color='secondary' onClick={onClickBackHome}>
                  <FormattedMessage id='common.home' />
                </Button.Ripple>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <PopupSuccessProblem
        isOpenModal={isOpenPopup}
        closePopUp={hanleClosePopUp}
      />
    </FormikProvider>
  )
}

export default NewRequest