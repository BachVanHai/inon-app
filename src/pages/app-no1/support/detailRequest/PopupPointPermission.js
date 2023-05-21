import { BaseAppUltils, FormattedMessage, Select } from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1'
import SupportService from '../../../../services/app-no1/support'
import { ACCOUNTANT, ACCOUNTANT_DEPARTMENT, ASSURANCE_COMPENSATION, CUSTOMER_SERVICE, FEEDBACK, LIST_TYPE_REQUEST, OPERATE, OPERATE_DEPARMENT, OTHER, PAYMENT, PRODUCT, selectErrorStyles, selectNormalStyles, TECHNOLOGY, TECHNOLOGY_DEPARMENT } from '../utility'

import { getRealNameOf, KEY_SPLIT_USER_AVATAR } from '../../../../components/elite-app/chat-box/utility'
import { usePageContext } from '../../../../components/insurance-app/common-page/page-context/PageContext'
import { useGetUserSignIn } from '../../../../ultity'
import moment from 'moment'

const PopupPointPermission = ({
  isOpen,
  handleToggle,
  handleCloseModalPoint,
  info,
  setDispatchAcitive,
  listUserInAllDepartment,
  availableUser,
  availablePermission,
  connectStatus
}) => {
  const [pageInfo] = usePageContext()
  const { sockJs } = pageInfo
  const currentUser = useGetUserSignIn()

  const intl = useIntl()
  const [userSuggesstion, setUserSuggesstion] = useState([])
  const [userSelect, setUserSelect] = useState([])
  const [availabelUser, setAvailabelUser] = useState([])
  const [userSelected, setUserSelected] = useState({})
  const [typeRequestSelected, setTypeRequestSelected] = useState({});
  const [btnNotDisabledStatus, setBtnNotDisabledStatus] = useState(false)

  const handlePointRequest = async () => {
    if (typeRequestSelected === '') {
      return false
    }
    else {
      info.contentText = info.content
      info.titleText = info.title
      const newRequest = {
        contentText: info.contentText,
        titleText: info.title,
        hCUserId: info.hCUserId,
        supporterInOnId:
          userSelected === {} ? info.supporterInOnId : userSelected.userId,
        supporterInOnIdName:
          userSelected === {}
            ? info.supporterInOnIdName
            : userSelected.userInOnName,
        status: info.status,
        type: typeRequestSelected.value,
        id: info.id
      }
      const res = await SupportService.updateRequest(info.id, newRequest)
      if (res.status === 200) {
        setDispatchAcitive((pre) => ++pre)
        handleCloseModalPoint()
        BaseAppUltils.toastSuccess(
          intl.formatMessage({
            id: getKeyLang('helpcenter.management.action.success')
          })
        )
        const updatedDate = moment(res.data.updatedDate).format("DD-MM-YYYY H:mm")

        /** start */
        const sendMess = (roomId) => {
          sockJs.sendMessage(
            `/app/chat/${roomId}`,
            JSON.stringify({
              fromUser: currentUser.id + KEY_SPLIT_USER_AVATAR
                + getRealNameOf(currentUser) + KEY_SPLIT_USER_AVATAR
                + currentUser?.userSettings.avatar + KEY_SPLIT_USER_AVATAR
                + getRealNameOf(currentUser, true),
              contentText: `${updatedDate} ` + getRealNameOf(currentUser) + " đã chuyển tiếp yêu cầu tới " + userSelected.userInOnName,
              roomId: roomId,
              contentContentType: "notify-log"
            })
          )
        }
        sendMess(info.roomId)
        sendMess(info.roomInOnId)
        /** end */
      } else {
        BaseAppUltils.toastError(
          intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
        )
      }
    }
  }
  useEffect(() => {
    setUserSuggesstion(listUserInAllDepartment)
    const typeInfo =
      info.type === PRODUCT
        ? OPERATE
        : info.type === ASSURANCE_COMPENSATION
          ? OPERATE
          : info.type === CUSTOMER_SERVICE
            ? OPERATE
            : info.type === FEEDBACK
              ? OPERATE
              : info.type === OTHER
                ? OPERATE
                : info.type === TECHNOLOGY
                  ? TECHNOLOGY
                  : info.type === PAYMENT
                    ? ACCOUNTANT
                    : null
    const filter = listUserInAllDepartment.filter((_elt) => {
      return _elt.userId === info.supporterInOnId && typeInfo === _elt.deparment
    })
    const typeFilter = LIST_TYPE_REQUEST.filter(_elt => {
      return _elt.value === info.type
    })

    const userFilter = availablePermission.filter(_elt => {
      return _elt.userId === info.supporterInOnId && _elt.department === typeInfo
    })
    setTypeRequestSelected(typeFilter[0]);
    setAvailabelUser(availableUser)
    setUserSelect(filter)
    setUserSelected(userFilter[0])
  }, [listUserInAllDepartment, JSON.stringify(availableUser), info])
  return (
    <Modal isOpen={isOpen} size='md' className='modal-dialog-centered'>
      <ModalHeader
        toggle={() => handleToggle()}
        cssModule={{ 'modal-title': 'w-100 text-center' }}
      >
        <div className='d-flex justify-content-center text-uppercase font-weight-bold mt-1'>
          <FormattedMessage id={getKeyLang('support.permission.table.point')} />
        </div>
      </ModalHeader>
      <ModalBody>
        <div className='mt-2 mb-2'>
          <Row>
            <Col md={6} xs={6}>
              <Select
                options={userSuggesstion}
                value={userSelect}
                onChange={(original) => {
                  const filter = availabelUser.filter((_elt) => {
                    return _elt.id === original.value
                  })
                  setUserSelect(original)
                  setUserSelected(filter[0])
                  setTypeRequestSelected('')
                  setBtnNotDisabledStatus(true)
                }}
                placeholder={intl.formatMessage({
                  id: getKeyLang('support.management.handlingStaff')
                })}
              />
            </Col>
            <Col md={6} xs={6}>
              <Select
                value={typeRequestSelected}
                options={userSelected?.department === ACCOUNTANT ? ACCOUNTANT_DEPARTMENT : userSelected?.department === TECHNOLOGY ? TECHNOLOGY_DEPARMENT : userSelected?.department === OPERATE ? OPERATE_DEPARMENT : []}
                onChange={(original) => {
                  setTypeRequestSelected(original)
                }}
                placeholder={intl.formatMessage({
                  id: getKeyLang('support.typeRequest')
                })}
                styles={typeRequestSelected === '' ? selectErrorStyles : selectNormalStyles}
              />
            </Col >
          </Row >
        </div >
      </ModalBody >
      <div className='mb-2'>
        <div className='d-flex justify-content-center'>
          <Button
            color='primary'
            className='mr-2'
            onClick={() => handlePointRequest()}
          >
            <FormattedMessage id={'Tiếp tục'} />
          </Button>
          <Button onClick={() => handleCloseModalPoint()}>
            <FormattedMessage id={getKeyLang('button.goback')} />
          </Button>
        </div>
      </div>
    </Modal >
  )
}

export default PopupPointPermission
