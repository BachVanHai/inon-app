import {
  BaseAppUltils,
  FormattedMessage,
  Select,
} from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1'
import SupportService from '../../../../services/app-no1/support'
import { isArrayEmpty, isValueEmpty, useGetUserSignIn } from '../../../../ultity'
import { usePageContext } from '../../../../components/insurance-app/common-page/page-context/PageContext'
import { getRealNameOf, KEY_SPLIT_USER_AVATAR } from '../../../../components/elite-app/chat-box/utility'
import moment from 'moment'

const PopupAddPeople = ({
  isOpen,
  handleToggle,
  handleCloseModal,
  info,
  setDispatchAcitive,
  listUserInAllDepartment,
  connectStatus
}) => {
  const [pageInfo] = usePageContext()
  const { sockJs } = pageInfo
  const currentUser = useGetUserSignIn()
  const { availablePermission } = useSelector(state => state.app.permissionManagement)
  const [addPeopleSelect, setAddPeopleSelect] = useState('')
  const [userSuggesstion, setUserSuggesstion] = useState()
  const [userAdd, setUserAdd] = useState('')
  const intl = useIntl()
  const dispatch = useDispatch()
  const handleAddPeople = async () => {
    info.contentText = info.content
    info.titleText = info.title
    const newRequest = {
      contentText: info.contentText,
      titleText: info.title,
      hCUserId: info.hCUserId,
      flowerInOnId: addPeopleSelect,
      type: info.type,
      status: info.status,
      supporterInOnId: info.supporterInOnId,
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
      const updatedDate = moment(res.data.updatedDate).format("DD-MM-YYYY H:mm")
      /** start */
      const findPeopleNames = () => {
        if (isValueEmpty(userAdd)) return ""
        const _peopleId = userAdd.split(",").map(elt => {
          return elt.split("_")[0]
        }).join("|")
        let rg = new RegExp(_peopleId)
        return availablePermission.filter(elt => {
          if (elt.id.toString().match(rg)) {
            return true
          }
          return false
        })
          .map(elt => elt.userInOnName)
          .join(", ")
      }
      const sendMess = (roomId) => {
        sockJs.sendMessage(
          `/app/chat/${roomId}`,
          JSON.stringify({
            fromUser: currentUser.id + KEY_SPLIT_USER_AVATAR
              + getRealNameOf(currentUser) + KEY_SPLIT_USER_AVATAR
              + currentUser?.userSettings.avatar + KEY_SPLIT_USER_AVATAR
              + getRealNameOf(currentUser, true),
            contentText: `${updatedDate} ` + getRealNameOf(currentUser) + " đã thêm " + userAdd + " vào theo dõi",
            roomId: roomId,
            contentContentType: "notify-log"
          })
        )
      }
      sendMess(info.roomInOnId)
      setUserAdd('')
      /** end */
    } else {
      BaseAppUltils.toastError(
        intl.formatMessage({ id: getKeyLang('helpcenter.create.error') })
      )
    }
  }
  const formik = useFormik({
    initialValues: {
      reasonReject: ''
    },
    onSubmit: handleAddPeople
  })
  const { handleSubmit, errors, touched } = formik
  useEffect(() => {
    setAddPeopleSelect(info.flowerInOnId)
    setUserSuggesstion(listUserInAllDepartment)
  }, [info, listUserInAllDepartment])
  return (
    <FormikProvider value={formik}>
      <Modal isOpen={isOpen} size='md' className='modal-dialog-centered'>
        <ModalHeader
          toggle={() => handleToggle()}
          cssModule={{ 'modal-title': 'w-100 text-center' }}
        >
          <div className='d-flex justify-content-center text-uppercase font-weight-bold mt-1'>
            <FormattedMessage
              id={getKeyLang('support.permission.table.addPeople')}
            />
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='mb-2 mt-2'>
            <Select
              isMulti={true}
              value={addPeopleSelect}
              options={userSuggesstion}
              placeholder={intl.formatMessage({
                id: getKeyLang('support.permission.table.addPeople')
              })}
              onChange={(original) => {
                setUserAdd([...userAdd, original[original.length - 1]?.label])
                const userSelect = !isArrayEmpty(original)
                  ? original
                    .map((_elt) => {
                      return _elt.value
                    })
                    .join()
                  : ''
                setAddPeopleSelect(userSelect)
              }}
            />
          </div>
        </ModalBody>
        <div className='mb-2'>
          <div className='d-flex justify-content-center'>
            <Button
              color='primary'
              className='mr-2'
              disabled={addPeopleSelect === '' ? true : false}
              onClick={() => handleAddPeople()}
            >
              <FormattedMessage
                id={getKeyLang('support.permission.table.addPeople')}
              />
            </Button>
            <Button onClick={() => handleCloseModal()}>
              <FormattedMessage id={getKeyLang('button.goback')} />
            </Button>
          </div>
        </div>
      </Modal>
    </FormikProvider>
  )
}

export default PopupAddPeople
