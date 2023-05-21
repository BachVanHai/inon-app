import {
  BaseAppUltils,
  BaseFormGroup,
  FormattedMessage,
  Select,
  showConfirmAlert
} from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1'
import SupportService from '../../../../services/app-no1/support'
import moment from 'moment'
import '../../../../assets/scss/app-no1/support.scss';
import {
  convertDateISOstring,
  LIST_CHANNEL,
  LIST_TYPE_REQUEST
} from '../utility'
import * as Yup from 'yup'
import { usePageContext } from '../../../../components/insurance-app/common-page/page-context/PageContext'
import { useGetUserSignIn } from '../../../../ultity'
import { getRealNameOf, KEY_SPLIT_USER_AVATAR } from '../../../../components/elite-app/chat-box/utility'
import { CONNECTING_STATUS_SUCCESS } from '../../../../components/elite-app/chat-box/reducer/ChatBox'

const PopupEditRequest = ({
  isOpen,
  handleToggle,
  handleCloseModal,
  info,
  setDispatchAcitive,
  connectStatus
}) => {
  const [pageInfo] = usePageContext()
  const { sockJs } = pageInfo
  const intl = useIntl()
  const dispatch = useDispatch()
  const currentUser = useGetUserSignIn()
  const [typeSelect, setTypeSelect] = useState('')
  const [chanelSelect, setChanelSelect] = useState('')
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false)
  const typeDefault = LIST_TYPE_REQUEST.filter((_elt) => {
    return _elt.value === typeSelect
  })
  const chanelDefault = LIST_CHANNEL.filter((_elt) => {
    return _elt.value === chanelSelect
  })
  const sendMess = (content,roomId) => {
    sockJs.sendMessage(
      `/app/chat/${roomId}`,
      JSON.stringify({
        fromUser: currentUser.id + KEY_SPLIT_USER_AVATAR
          + getRealNameOf(currentUser) + KEY_SPLIT_USER_AVATAR
          + currentUser?.userSettings.avatar + KEY_SPLIT_USER_AVATAR
          + getRealNameOf(currentUser, true),
        contentText: content,
        roomId: roomId,
        contentContentType: "notify-log"
      })
    )
  }
  const handleUpdateDetailRequest = (values) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage id={getKeyLang('support.detail.updateInfo')} />
        ),
        isShow: true,
        content: (
          <FormattedMessage id={getKeyLang('support.detail.updateDetail')} />
        ),
        onConfirm: async () => {
          info.contentText = info.content
          info.titleText = info.title
          const newRequest = {
            contentText: values.contentText,
            titleText: values.titleText,
            hCUserId: info.hCUserId,
            type: typeSelect,
            fromChannel: chanelSelect,
            supporterInOnId: info.supporterInOnId,
            status: info.status,
            note: values.note,
            id: info.id
          }
          const newUser = {
            id: info.hCUser.id,
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber
          }
          const res = await SupportService.updateRequest(info.id, newRequest)
          const resUser = await SupportService.updateUserSupport(
            info.hCUser.id,
            newUser
          )
          if (res.status === 200 && resUser.status === 200) {
            const updatedDate = moment(res.data.updatedDate).format("DD-MM-YYYY H:mm")
            setDispatchAcitive((pre) => ++pre)
            handleCloseModal()
            if (info.title !== values.titleText) {
              const content =  `${updatedDate} ` + getRealNameOf(currentUser) + " đã thay đổi tiêu đề"
              sendMess(content,info.roomInOnId)
            }
            if (info.note !== values.note) {
              const content = `${updatedDate} ` + getRealNameOf(currentUser) + " đã cập nhật ghi chú"
             
              sendMess(content,info.roomInOnId)
            }
            if (info.hCUser.name !== values.name || info.hCUser.email !== values.email || info.hCUser.phoneNumber !== values.phoneNumber) {
              const content =  `${updatedDate} ` + getRealNameOf(currentUser) + " đã cập nhật thông tin khách hàng"
              sendMess(content,info.roomInOnId)
            }
            BaseAppUltils.toastSuccess(
              intl.formatMessage({
                id: getKeyLang('helpcenter.management.action.success')
              })
            )
          } else {
            BaseAppUltils.toastError(
              intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
            )
          }
        }
      })
    )
  }
  const validationSchema = Yup.object().shape({
    titleText: Yup.string().required(),
    phoneNumber: Yup.string()
      .required()
      .matches('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
    email: Yup.string().email().required(),
    titleText: Yup.string().required(),
  })
  const formik = useFormik({
    initialValues: {
      contentText: info.contentText,
      titleText: info.title,
      type: info.type,
      name: info.name
    },
    validationSchema: validationSchema,
    validateOnChange: validateAfterSubmit,
    validateOnBlur: validateAfterSubmit,
    onSubmit: handleUpdateDetailRequest
  })

  const { handleSubmit, errors, touched, setFieldValue } = formik
  useEffect(() => {
    const dateConvert = moment(info.createdDate)
      .utc(true)
      .format('YYYY-MM-DD H:mm')
    setFieldValue('titleText', info?.title)
    setFieldValue('name', info?.hCUser?.name)
    setFieldValue('phoneNumber', info?.hCUser?.phoneNumber)
    setFieldValue('email', info?.hCUser?.email)
    setFieldValue('contentText', info?.content)
    setFieldValue('code', info.code)
    setTypeSelect(info?.type)
    setFieldValue('createdDate', dateConvert)
    setChanelSelect(info?.fromChannel)
    setFieldValue('userIdInOn', info?.hCUser?.userIdInOn)
    setFieldValue('note', info.note)
    setFieldValue('supporterInOnIdName', info.supporterInOnIdName)
  }, [info])
  return (
    <FormikProvider value={formik}>
      <Modal isOpen={isOpen} size='xl' className='modal-dialog-centered p-2' >
        <ModalHeader toggle={() => handleToggle()} cssModule={{ 'modal-title': 'w-100 text-center' }} >
          <div className="d-flex justify-content-center text-uppercase font-weight-bold mt-1">
            <FormattedMessage id={getKeyLang('support.detail.updateInfo')} />
          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} style={{ fontSize: "11px" }} className="support-form-edit">
            <div className='mt-1 mb-1 pr-1 pl-1'>
              <BaseFormGroup
                messageId={getKeyLang('support.create.titleProblem')}
                fieldName='titleText'
              />
            </div>
            <Row className='pr-1 pl-1'>
              <Col md='12' lg='6' xs='12'>
                <div>
                  <Row className='d-flex align-items-center mb-1'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang(
                            'support.myrequest.table.requestCode'
                          )}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12' style={{ marginBottom: "0px" }}>
                      <BaseFormGroup
                        fieldName='code'
                        messageId={' '}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row className='d-flex align-items-center mb-1'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('support.myrequest.table.classify')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12'>
                      <Select
                        options={LIST_TYPE_REQUEST}
                        value={typeDefault}
                        placeholder={intl.formatMessage({
                          id: getKeyLang('support.myrequest.table.classify')
                        })}
                        onChange={(original) => {
                          setTypeSelect(original.value)
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row className='d-flex align-items-center mb-1'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang(
                            'account.exportReportOption.createdDate'
                          )}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12'>
                      <BaseFormGroup
                        fieldName='createdDate'
                        messageId={getKeyLang(
                          'ccount.exportReportOption.createdDate'
                        )}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row className='d-flex align-items-center mb-1'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('support.create.channel')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12'>
                      <Select
                        options={LIST_CHANNEL}
                        value={chanelDefault}
                        placeholder={intl.formatMessage({
                          id: getKeyLang('support.create.channel')
                        })}
                        onChange={(original) =>
                          setChanelSelect(original.value)
                        }
                      />
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row className='d-flex align-items-center'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('support.management.handlingStaff')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9 ' xs='12'>
                      <BaseFormGroup
                        fieldName='supporterInOnIdName'
                        messageId={getKeyLang(
                          'ccount.exportReportOption.createdDate'
                        )}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              {/* =====right==== */}
              <Col md='12' lg='6' xs='12'>
                <div className='mb-1'>
                  <Row className='d-flex align-items-center'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('partner.account.fullName')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12'>
                      <BaseFormGroup
                        fieldName='name'
                        messageId={getKeyLang('partner.account.fullName')}
                        disabled={
                          info?.hCUser?.userIdInOn === null ? false : true
                        }
                      />
                    </Col>
                  </Row>
                </div>
                {info?.hCUser?.userIdInOn !== null ? (
                  <div className='mb-1'>
                    <Row className="d-flex align-items-center">
                      <Col md='6' lg='3' xs='12'>
                        <span className='font-weight-bold'>
                          <FormattedMessage
                            id={getKeyLang('account.accountCode')}
                          />
                        </span>
                      </Col>
                      <Col md='6' lg='9' xs='12'>
                        <BaseFormGroup
                          fieldName='userIdInOn'
                          messageId={getKeyLang(
                            'partner.account.phoneNumber'
                          )}
                          disabled={
                            info?.hCUser?.userIdInOn === null ? false : true
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                ) : null}
                <div className='mb-1'>
                  <Row className='d-flex align-items-center'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('partner.account.phoneNumber')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12'>
                      <BaseFormGroup
                        fieldName='phoneNumber'
                        messageId={getKeyLang(
                          'partner.account.phoneNumber'
                        )}
                        disabled={
                          info?.hCUser?.userIdInOn === null ? false : true
                        }
                      />
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row className='d-flex align-items-center'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('partner.account.email')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12'>
                      <BaseFormGroup
                        fieldName='email'
                        messageId={getKeyLang('partner.account.email')}
                        disabled={
                          info?.hCUser?.userIdInOn === null ? false : true
                        }
                      />
                    </Col>
                  </Row>
                </div>
                <div className='mb-1'>
                  <Row className='d-flex align-items-center'>
                    <Col md='6' lg='3' xs='12'>
                      <span className='font-weight-bold'>
                        <FormattedMessage
                          id={getKeyLang('support.detail.description')}
                        />
                      </span>
                    </Col>
                    <Col md='6' lg='9' xs='12'>
                      <BaseFormGroup
                        fieldName='note'
                        type="textarea"
                        messageId={' '}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <div className='d-flex justify-content-center'>
              <Button
                color='primary'
                className='mr-2'
                type='submit'
                onClick={() => setValidateAfterSubmit()}
              >
                Cập nhật
              </Button>
              <Button onClick={() => handleCloseModal()}>Quay lại</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </FormikProvider>
  )
}

export default PopupEditRequest
