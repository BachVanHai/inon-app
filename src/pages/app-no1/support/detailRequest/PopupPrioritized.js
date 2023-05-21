import {
  BaseAppUltils,
  FormattedMessage,
  Radio,
  Select,
  showConfirmAlert
} from 'base-app'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import {
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap'
import { CONNECTING_STATUS_SUCCESS } from '../../../../components/elite-app/chat-box/reducer/ChatBox'
import { getRealNameOf, KEY_SPLIT_USER_AVATAR } from '../../../../components/elite-app/chat-box/utility'
import { usePageContext } from '../../../../components/insurance-app/common-page/page-context/PageContext'
import { getKeyLang } from '../../../../configs/app-no1'
import SupportService from '../../../../services/app-no1/support'
import { useGetUserSignIn } from '../../../../ultity'
import { DROP, HIGH, MEDIUM } from '../utility'

const PopupPrioritized = ({
  isOpen,
  handleToggle,
  handleCloseModal,
  info,
  setDispatchAcitive,
  connectStatus
}) => {
  const [pageInfo] = usePageContext()
  const { sockJs } = pageInfo
  const currentUser = useGetUserSignIn()

  const [prioritizedType, setPrioritizedType] = useState(MEDIUM)
  const dispatch = useDispatch()
  const intl = useIntl()
  const handleUpdatePrioritized = async () => {
    info.contentText = info.content
    info.titleText = info.title
    const newRequest = {
      contentText: info.contentText,
      titleText: info.title,
      hCUserId: info.hCUserId,
      priority: prioritizedType,
      supporterInOnId: info.supporterInOnId,
      status: info.status,
      type: info.type,
      id: info.id
    }
    const res = await SupportService.updateRequest(info.id, newRequest)
    if (res.status === 200) {
      setDispatchAcitive((pre) => ++pre)
      handleCloseModal()
      BaseAppUltils.toastSuccess(
        intl.formatMessage({
          id: getKeyLang('helpcenter.management.action.success')
        })
      )

      /** start */
      const getNameOfPriority = (prioritizedType) => {
        let _priorityName = ""
        switch (prioritizedType) {
          case MEDIUM:
            _priorityName = "Trung bình"
            break
          case DROP:
            _priorityName = "Không ưu tiên"
            break
          case HIGH:
            _priorityName = "Cao"
            break
          default:
            break
        }
        return _priorityName
      }
      const updatedDate = moment(res.data.updatedDate).format("DD-MM-YYYY H:mm")
      const sendMess = (roomId) => {
        sockJs.sendMessage(
          `/app/chat/${roomId}`,
          JSON.stringify({
            fromUser: currentUser.id + KEY_SPLIT_USER_AVATAR
              + getRealNameOf(currentUser) + KEY_SPLIT_USER_AVATAR
              + currentUser?.userSettings.avatar + KEY_SPLIT_USER_AVATAR
              + getRealNameOf(currentUser, true),
            contentText: `${updatedDate}` + getRealNameOf(currentUser) + " đã thay ưu tiên sang " + getNameOfPriority(prioritizedType),
            roomId: roomId,
            contentContentType: "notify-log"
          })
        )
      }
      // sendMess(info.roomId)
      sendMess(info.roomInOnId)
      /** end */
    } else {
      BaseAppUltils.toastError(
        intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
      )
    }
  }
  useEffect(() => {
    setPrioritizedType(info.priority)
  }, [info])
  return (
    <>
      <Modal isOpen={isOpen} size='md' className='modal-dialog-centered'>
        <ModalHeader
          toggle={() => handleToggle()}
          cssModule={{ 'modal-title': 'w-100 text-center' }}
        >
          <div className='d-flex justify-content-center text-uppercase font-weight-bold mt-1'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.prioritized')}
            />
          </div>
        </ModalHeader>
        <div>
          <div className='d-flex justify-content-center mt-2'>
            <h4 className='mb-2'>
              <FormattedMessage
                id={getKeyLang('support.detail.selectPrioritized')}
              />
            </h4>
          </div>
          <div className='d-flex justify-content-center mb-2'>
            <div className='d-flex align-items-center '>
              <Radio
                checked={prioritizedType === DROP}
                onClick={() => setPrioritizedType(DROP)}
              />
              <FormattedMessage id={getKeyLang('support.create.noPriority')} />
            </div>
            <div className='d-flex align-items-center' style={{ marginLeft: "15px" }}>
              <Radio
                checked={prioritizedType === MEDIUM}
                onClick={() => setPrioritizedType(MEDIUM)}
              />
              <FormattedMessage id={getKeyLang('support.create.medium')} />
            </div>
            <div className='d-flex align-items-center' style={{ marginLeft: "15px" }}>
              <Radio
                checked={prioritizedType === HIGH}
                onClick={() => setPrioritizedType(HIGH)}
              />
              <FormattedMessage id={getKeyLang('support.create.high')} />
            </div>
          </div>
          <div className='mb-2'>
            <div className='d-flex justify-content-center'>
              <Button
                color='primary'
                className='mr-2'
                onClick={() => handleUpdatePrioritized()}
              >
                <FormattedMessage id={'Tiếp tục'} />
              </Button>
              <Button onClick={() => handleCloseModal()}>
                <FormattedMessage id={getKeyLang('button.goback')} />
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PopupPrioritized
