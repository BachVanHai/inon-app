import { BaseFormGroup, Button, BaseAppUltils } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { Card, Col, Row } from 'reactstrap'
import { getKeyLang } from '../../../configs/elite-app'
import { initialValues, validateSchema } from './formikConfig'
import SelectTypeProblem from './SelectTypeProblem'
import TextEditor from '../../../components/elite-app/TextEditor'
import UploadFile from '../../../components/elite-app/UploadFile'
import { FormattedMessage } from 'react-intl'
import PopupSuccessProblem from './PopupSuccessProblem'
import SupportService from '../../../services/elite-app/support'
import { PRODUCT, _currenAvatar } from './utility'
import { usePageContext } from '../../../components/insurance-app/common-page/page-context/PageContext'
import { KEY_SPLIT_USER_AVATAR } from '../../app-no1/support/utility'
import { useDispatch } from 'react-redux'
import { updateProps } from '../../../components/elite-app/chat-box/utility'
import { CONNECTING_STATUS_SUCCESS, getDefault_minimumChatObj, KEY_CONNECTING_STATUS, KEY_MINIMUM_CHATS, KEY_OPENING_REQUEST_ROOMS_INFO, KEY_PAGE_CLICKED, KEY_TEMP_USER_INFO, NAME_CREATE_SUPPORT_REQUEST, VIEW_SIZE_NORMAL } from '../../../components/elite-app/chat-box/reducer/ChatBox'
import { NAME_CHAT_BOX } from '../../../configs/insurance-app'
import { useSelector } from 'react-redux'
import { sleepingFor } from '../../../ultity'
import TurndownService from 'turndown';

const FormCreateProblem = ({ setIsShowFormCreateProblem, isLiveChat = false, handleCloseLiveChat }) => {
  const { [KEY_CONNECTING_STATUS]: connectingStatus,
    [KEY_OPENING_REQUEST_ROOMS_INFO]: openingRequestRoomsInfo,
    [KEY_MINIMUM_CHATS]: minimumChats,
  } = useSelector(state => state.app[NAME_CHAT_BOX])
  const dispatch = useDispatch()
  const [pageObj] = usePageContext()
  const { sockJs } = pageObj
  const _currentAvatar = 'https://sit2.inon.vn/resources/images/default-user-avatar.png'
  const [imagesUpload, setImagesUpload] = useState([])
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [isEmptyTextEditor, setIsEmptyTextEditor] = useState(0)
  const [typeChecked, setTypeChecked] = useState('PRODUCT')
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)

  const handleUploadFile = async (file, code, roomId, supportBookId, userSupportInfo) => {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('SPBCode', code)
    const res = await SupportService.addFile(formData)
    if (res.status === 200) {
      handleSendMsg(res.data.downloadFromUrl, roomId, supportBookId, userSupportInfo)
    }
  }

  const handleUploadFilePDF = (code, roomId, supportBookId, userSupportInfo) => {
    for (var i = 0; i < imagesUpload.length; i++) {
      let fileArr = imagesUpload[i]
      handleUploadFile(fileArr, code, roomId, supportBookId, userSupportInfo)
    }
  }

  const handleSendMsg = async (contentImage, roomId, supportBookId, userSupportInfo) => {
    const newMessage = {
      contentText: `<a href="${contentImage}" taget="_blank">${userSupportInfo?.name} đã gửi tệp đính kèm</a>`,
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

  const sendMess = (_roomId, id, userSupportInfo) => {
    sockJs.sendMessage(
      `/app/chat/${_roomId}`,
      JSON.stringify({
        fromUser: userSupportInfo.id + KEY_SPLIT_USER_AVATAR
          + userSupportInfo.name + KEY_SPLIT_USER_AVATAR
          + _currentAvatar + KEY_SPLIT_USER_AVATAR
          + userSupportInfo.name,
        contentText: "Yêu cầu đang được kết nối tới nhân viên hỗ trợ. Vui lòng chờ trong giây lát",
        roomId: _roomId,
        contentContentType: "notify-log",
        hCSupportBookId: id
      })
    )
  }

  const handleSubmitClick = async (values) => {
     // Create an instance of the Turndown service
     const turndownService = new TurndownService();

     const markdown = turndownService.turndown(values.contentText);
    if (connectingStatus !== CONNECTING_STATUS_SUCCESS) {
      BaseAppUltils.toastError(`Bạn đang thao tác quá nhanh, xin đợi giây lát`)
      return
    }
    const newUser = {
      email: values?.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
      avatar: _currentAvatar
    }
    const resUser = await SupportService.createUserSupport(newUser)
    const userSupportInfo = resUser.data
    console.log(resUser);
    if (resUser.status === 201) {
      // setUserSupportInfo(resUser.data)
      dispatch(updateProps([
        {
          prop: KEY_TEMP_USER_INFO,
          value: resUser.data
        }
      ]))
    }
    const newRequest = {
      ...values,
      contentText : markdown,
      hCUserId: userSupportInfo?.id
    }
    const resSupport = await SupportService.createRequest(newRequest)
    if (resSupport.status === 201) {
      // start
      const _openingRequestRoomsInfo = openingRequestRoomsInfo.filter(elt => {
        if (elt.id === resSupport.data.id) {
          return false
        }
        return true
      })
      const _concat_openingRequestRoomsInfo = _openingRequestRoomsInfo.concat(resSupport.data)
      dispatch(updateProps([
        {
          prop: KEY_OPENING_REQUEST_ROOMS_INFO,
          value: _concat_openingRequestRoomsInfo
        }
      ]))
      const { roomId, title, roomInOnId } = resSupport.data
      if (minimumChats.find(elt => elt.id === roomId)) {
        return
      }
      sleepingFor(900).then(() => {
        dispatch(updateProps([
          {
            prop: KEY_MINIMUM_CHATS,
            value: [...minimumChats, getDefault_minimumChatObj(roomId, roomInOnId, title, VIEW_SIZE_NORMAL)]
          }
        ]))
      })
      // end

      const newMessage = {
        contentText: resSupport.data.content,
        fromUser: resSupport.data.hCUserId + KEY_SPLIT_USER_AVATAR
          + userSupportInfo.name + KEY_SPLIT_USER_AVATAR
          + _currenAvatar + KEY_SPLIT_USER_AVATAR
          + userSupportInfo.name,
        hCSupportBookId: resSupport.data.id,
        roomId: resSupport.data.roomId,
        type: 'TEXT',
      }
      handleOpenPopUP()
      resetForm()
      setTypeChecked(PRODUCT)
      setIsEmptyTextEditor((pre) => ++pre)
      setImagesUpload([])
      //close live chat 
      if (isLiveChat) {
        handleCloseLiveChat()
      }
      await SupportService.addMessageForRoomChat(newMessage)
      if (imagesUpload.length !== 0) {
        handleUploadFilePDF(resSupport.data.code, resSupport.data.roomId, resSupport.data.id, userSupportInfo)
        sendMess(resSupport.data.roomId, resSupport.data.id, userSupportInfo)
      } else {
        sendMess(resSupport.data.roomId, resSupport.data.id, userSupportInfo)
      }
    }
  }
  const handleOpenPopUP = () => {
    setIsOpenPopup(true)
  }
  const hanleClosePopUp = () => {
    setIsOpenPopup(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,
    onSubmit: handleSubmitClick
  })
  const {
    setFieldValue,
    errors,
    handleSubmit,
    resetForm } = formik
  React.useEffect(() => {
    dispatch(updateProps([
      {
        prop: KEY_PAGE_CLICKED,
        value: NAME_CREATE_SUPPORT_REQUEST
      }
    ]))
  }, [])

  return (
    <FormikProvider value={formik}>
      <Card>
        <form
          onSubmit={handleSubmit}
          autocomplete='off'
          className='elt-support p-1'
        >
          <div>
            <h6 className='font-weight-bold mb-1' style={{ color: '#106D5A' }}>
              <FormattedMessage
                id={getKeyLang('support.detail.infoCustommer')}
              />
            </h6>
            <div className='mt-2 mb-2'>
              <BaseFormGroup
                messageId={getKeyLang('support.create.fullName')}
                fieldName='name'
              />
            </div>
            <Row>
              <Col lg='6' md='12'>
                <BaseFormGroup
                  messageId={getKeyLang('support.create.phoneNumber')}
                  fieldName='phoneNumber'
                />
              </Col>
              <Col lg='6' md='12'>
                <BaseFormGroup
                  messageId={getKeyLang('support.create.email')}
                  fieldName='email'
                  errors
                />
              </Col>
            </Row>
            <div>
              <SelectTypeProblem
                setFieldValue={setFieldValue}
                typeChecked={typeChecked}
                setTypeChecked={setTypeChecked}
              />
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
            <div className={`${!isLiveChat ? "d-flex justify-content-center flex-wrap mb-2" : ""}`}>
              {
                !isLiveChat ? <Button.Ripple
                  className='mr-1'
                  onClick={() => {
                    setIsShowFormCreateProblem(false)
                  }}
                >
                  Quay lại
                </Button.Ripple> : null
              }

              <Button.Ripple
                color='primary'
                type='submit'
                className={`${isLiveChat ? "" : "ml-1"}`}
                onClick={() => setValidateAfterSubmit(true)}
              >
                Gửi yêu cầu{' '}
              </Button.Ripple>
            </div>
          </div>
        </form>
      </Card>
      <PopupSuccessProblem
        isOpenModal={isOpenPopup}
        closePopUp={hanleClosePopUp}
      />
    </FormikProvider>
  )
}

export default FormCreateProblem
