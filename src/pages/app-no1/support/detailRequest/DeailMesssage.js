import { FormattedMessage, showConfirmAlert } from 'base-app'
import React, { useEffect, useRef, useState } from 'react'
import * as Icon from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import '../../../../assets/scss/app-no1/support.scss'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import styled from 'styled-components'
import {
  getDefault_minimumChatObj, KEY_CONNECTING_STATUS, KEY_FORCE_UPDATE, KEY_IS_RATE_MODAL_OPEN, KEY_MINIMUM_CHATS,
  KEY_OPENING_REQUEST_ROOMS_INFO, VIEW_SIZE_NORMAL
} from '../../../../components/elite-app/chat-box/reducer/ChatBox'
import { getRealNameOf, updateProps, useGetUserSignIn } from '../../../../components/elite-app/chat-box/utility'
import { getKeyLang } from '../../../../configs/app-no1'
import { NAME_CHAT_BOX } from '../../../../configs/insurance-app'
import { hasRequestFail } from '../../../../ultity'
import { getAllPermission } from '../../../../redux/actions/app-no1/permissionManagement'
import {
  actionGetALlAccount,
  actionGetUserGroup
} from '../../../../redux/actions/app-no1/supportCreate'
import SupportService from '../../../../services/app-no1/support'
import { isArrayEmpty } from '../../../../ultity'
import {
  ACCOUNTANT,
  AD,
  DOING,
  DONE,
  DROP,
  GROUP_ID_CODE,
  HIGH,
  LIST_STATUS_FILTER,
  MEDIUM,
  OPERATE,
  TECHNOLOGY,
  TODO
} from '../utility'
import InfoRequest from './infoRequest'
import PopupAddPeople from './PopupAddPeople'
import PopupEditRequest from './PopupEditRequest'
import PopupPointPermission from './PopupPointPermission'
import PopupPrioritized from './PopupPrioritized'

import { usePageContext } from '../../../../components/insurance-app/common-page/page-context/PageContext'
import Media from 'reactstrap/lib/Media'
import * as Service from '../../../../components/elite-app/chat-box/service'
import moment from 'moment'
import VoteModal from '../../../../components/elite-app/chat-box/VoteModal'

export const MediaStyled = styled(Media)` 
    &:hover {
      filter: saturate(70%);
    }
    height : 40px;
    z-index : 1;
    transition-properties: filter;
    transition: all ease .3s;
    filter: ${p => p.isActive ? "saturate(100%)" : "saturate(0%)"};
  @media(max-width : 577px){
      height : 30px;
  }
`
export const LineStyles = styled.div`
position : relative;
width : 86px;
.id_imgFeedback_1{
    width : 43px;
    &:before {
        content: "";
        position: absolute;
        right: 0;
        top: -23px;
        height: 5px;
        width: 50%;
        border-top: 1px solid #e8e8e8;
      }
      
    }
    .id_imgFeedback_2{
    width : 43px;
    &:before {
        content: "";
        position: absolute;
        right: 0;
        top: -23px;
        height: 5px;
        width: 100%;
        border-top: 1px solid #e8e8e8;
      }
    }
    .id_imgFeedback_3{
    width : 43px;
    &:before {
        content: "";
        position: absolute;
        right: 0;
        top: -23px;
        height: 5px;
        width: 100%;
        border-top: 1px solid #e8e8e8;
      }
    }
    .id_imgFeedback_4{
    width : 43px;
    &:before {
        content: "";
        position: absolute;
        right: 0;
        top: -23px;
        height: 5px;
        width: 100%;
        border-top: 1px solid #e8e8e8;
      }
    }
    .id_imgFeedback_5{
      width : 43px;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: -23px;
        height: 5px;
        width: 50%;
        border-top: 1px solid #e8e8e8;
      }
      
    }

`

const SelectStyled = styled.div`
select {
  z-index: 1;
}
`
const DropdownToggleStyled = styled.div`
height: 100%;
.dropdown .dropdown-menu {
  z-index: 1;
  padding: 0;
}
.dropdown .dropdown-menu .dropdown-item {
  width: 100%;
  height: 40px;
  line-height: 20px;
  z-index: 0;
  border-bottom: 1px solid #e7ebeb;
}
.dropdown-item:hover {
  color: '#338955';
}
.dropdown-item:first-child {
  position: relative;
}
.dropdown .dropdown-menu::before {
  visibility: hidden;
}
.dropdown-item .list-group {
  position: absolute;
  top: -2px;
  right: 160px;
}
.btn-secondary {
  background-color: #338955 !important;
}
.dropdown .dropdown-menu .dropdown-item:hover {
  color: #338955 !important;
}
`

const DeailMesssage = () => {
  const { [KEY_MINIMUM_CHATS]: minimumChats,
    [KEY_CONNECTING_STATUS]: connectStatus,
    [KEY_OPENING_REQUEST_ROOMS_INFO]: openingRequestRoomsInfo,
    [KEY_FORCE_UPDATE]: dispatchDependency
  } = useSelector(state => state.app[NAME_CHAT_BOX])
  const [pageObj] = usePageContext()
  const { sockJs } = pageObj
  const currentUser = useGetUserSignIn()

  const setRateModalOpen = (isOpen) => {
    dispatch(updateProps([
      {
        prop: KEY_IS_RATE_MODAL_OPEN,
        value: isOpen
      }
    ]))
  }
  const setDispatchAcitive = () => {
    dispatch(updateProps([
      {
        prop: KEY_FORCE_UPDATE,
        value: dispatchDependency + 1
      }
    ]))
  }
  const [requestInfo, setRequestInfo] = useState({})
  const ref = useRef(null);

  const { user } = useSelector((state) => state.auth)
  const codeInOn =
    user.groupId !== undefined
      ? user.groupId.substr(user.groupId.length - 2)
      : null

  const { availablePermission } = useSelector(
    (state) => state.app.permissionManagement
  )

  const userAD_OP = availablePermission.filter(_elt => {
    return Number(_elt.userId) === user.id && _elt.decentralization === "AD_OP"
  })
  const history = useHistory()
  const dispatch = useDispatch()
  const [isOpenModalPoint, setIsOpenModalPoint] = useState(false)
  const [listUserInAllDepartment, setListUserInAllDepartment] = useState([])
  const [listUserPoint, setlistUserPoint] = useState([])
  const [isOpenModalAddPeople, setIsOpenModalAddPeople] = useState(false)
  const [isOpenModalPrioritized, setIsOpenModalPrioritized] = useState(false)
  const [isOpenModalEditRequest, setIsOpenModalEditRequest] = useState(false)
  const [availableUser, setAvailableUser] = useState([])
  const handleOpenModalPoint = () => {
    setIsOpenModalPoint(!isOpenModalPoint)
  }
  const handleCloseModalPoint = () => {
    setIsOpenModalPoint(false)
  }
  const handleOpenModalAddPeople = () => {
    setIsOpenModalAddPeople(!isOpenModalAddPeople)
  }
  const handleCloseModalAddPeople = () => {
    setIsOpenModalAddPeople(false)
  }
  const handleOpenModalPrioritized = () => {
    setIsOpenModalPrioritized(!isOpenModalPrioritized)
  }
  const handleCloseModalPrioritized = () => {
    setIsOpenModalPrioritized(false)
  }
  const handleOpenModalEdit = () => {
    setIsOpenModalEditRequest(!isOpenModalEditRequest)
  }
  const handleCloseModalEdit = () => {
    setIsOpenModalEditRequest(false)
  }
  const { availableAccount, availableUserGroup } = useSelector(
    (state) => state.app.supportCreate
  )
  const userGroupSuggestion = !isArrayEmpty(availableUserGroup)
    ? availableUserGroup.map((elt) => {
      return {
        label: `${elt.name} - ${elt.description}`,
        value: elt.code
      }
    })
    : []
  const availableUserGroupSuggestion = availableAccount.map((user) => {
    return {
      label: `${user.userCode} - ${user.fullName}`,
      type: 'USER',
      value: user.id
    }
  })
  const { id } = useParams()
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false)
  const [isDropdownAction, setIsDropdownAction] = useState(false)
  const isOpenChatBox = !isArrayEmpty(openingRequestRoomsInfo) ? openingRequestRoomsInfo.filter(_elt => {
    return _elt.id.toString() === id.toString()
  }) : []
  const handleToggleDropdown = () => {
    setIsDropdownAction(!isDropdownAction)
  }
  const handleUpdateStatus = async (status) => {
    dispatch(
      showConfirmAlert({
        title: (
          <FormattedMessage id={getKeyLang('support.detail.updateStatus')} />
        ),
        isShow: true,
        content: (
          <FormattedMessage
            id={getKeyLang('support.detail.question.updateStatus')}
          />
        ),
        onConfirm: async () => {
          requestInfo.contentText = requestInfo.content
          requestInfo.titleText = requestInfo.title
          const newRequest = {
            contentText: requestInfo.contentText,
            titleText: requestInfo.title,
            hCUserId: requestInfo.hCUserId,
            status: status,
            supporterInOnId: requestInfo.supporterInOnId,
            type: requestInfo.type,
            id: requestInfo.id
          }
          const res = await SupportService.updateRequest(
            requestInfo.id,
            newRequest
          )
          const updateDate = moment(res.data.updatedDate).format("DD-MM-YYYY H:mm")
          if (hasRequestFail(res.status)) return
          setDispatchAcitive((pre) => ++pre)
          //show popup rate
          if (status === DONE) {
            setRateModalOpen(requestInfo.roomId)
          }
          //send message to chat box
          Service.sendNotifyLog(sockJs,
            `${updateDate} ` + getRealNameOf(currentUser) + " đã thay đổi trạng thái sang " + LIST_STATUS_FILTER.find(elt => elt.type === status)?.name,
            currentUser,
            requestInfo.roomId,
            requestInfo.roomInOnId,
            requestInfo.id
          )
        }
      })
    )
  }

  useEffect(() => {
    dispatch(actionGetALlAccount())
    dispatch(actionGetUserGroup())
    dispatch(getAllPermission())
    const getAllUserInAllDepartment = async () => {
      const res = await SupportService.getDepartmentByType(TECHNOLOGY)
      const resAccountant = await SupportService.getDepartmentByType(ACCOUNTANT)
      const resOperate = await SupportService.getDepartmentByType(OPERATE)
      if (
        res.status === 200 &&
        resAccountant.status === 200 &&
        resOperate.status === 200
      ) {
        const listSuggesstion = [
          ...res.data,
          ...resAccountant.data,
          ...resOperate.data
        ]
        const listConvert = listSuggesstion.map((_elt) => {
          return {
            label: `${_elt.userInOnName} - ${_elt.department === TECHNOLOGY
              ? 'Kĩ thuật'
              : _elt.department === ACCOUNTANT
                ? 'Kế toán'
                : _elt.department === OPERATE
                  ? 'Vận hành'
                  : null
              }`,
            value: `${_elt.userId}`,
            deparment: _elt.department
          }
        })
        const listConvertPoint = listSuggesstion.map((_elt) => {
          return {
            label: `${_elt.userInOnName} - ${_elt.department === TECHNOLOGY
              ? 'Kĩ thuật'
              : _elt.department === ACCOUNTANT
                ? 'Kế toán'
                : _elt.department === OPERATE
                  ? 'Vận hành'
                  : null
              } ${_elt.processing !== null ? `(${_elt.processing})` : "(0)"}`,
            value: _elt.id,
            userId: _elt.userId,
            deparment: _elt.department
          }
        })
        setlistUserPoint(listConvertPoint)
        setListUserInAllDepartment(listConvert)
        setAvailableUser(listSuggesstion)
      }
    }
    getAllUserInAllDepartment()
  }, [])

  useEffect(() => {
    const getRequest = async () => {
      const res = await SupportService.getInfoRequest(id)
      if (hasRequestFail(res.status)) return
      setRequestInfo(res.data)
      const _openingRequestRoomsInfo = openingRequestRoomsInfo.filter(elt => {
        if (elt.id === res.data.id) {
          return false
        }
        return true
      })
      const _concat_openingRequestRoomsInfo = _openingRequestRoomsInfo.concat(res.data)
      dispatch(updateProps([
        {
          prop: KEY_OPENING_REQUEST_ROOMS_INFO,
          value: _concat_openingRequestRoomsInfo
        }
      ]))
      const { roomId, title, roomInOnId } = res.data
      if (minimumChats.find(elt => elt.id === roomId)) {
        return
      }

      dispatch(updateProps([
        {
          prop: KEY_MINIMUM_CHATS,
          value: [...minimumChats, getDefault_minimumChatObj(roomId, roomInOnId, title, VIEW_SIZE_NORMAL)]
        }
      ]))
    }
    getRequest()
  }, [dispatchDependency])

  return (
    <Card>
      <VoteModal roomInfo={requestInfo} currentUser={currentUser} />

      <div ref={ref}>
        <div className='d-flex justify-content-between flex-wrap align-items-center pl-2 pr-2 pt-2 title-detail-request'>
          <div className='d-flex'>
            <h2 style={{ color: '#106d5a' }} className="detail-title">{requestInfo.title}</h2>
            {
              codeInOn === GROUP_ID_CODE ?
                <div style={{ marginTop: '5px' }} className='ml-1'>
                  {requestInfo.priority === DROP ? (
                    ''
                  ) : requestInfo.priority === MEDIUM ? (
                    <Icon.Star size='20' color='#ff9f43' fill='#ff9f43' />
                  ) : requestInfo.priority === HIGH ? (
                    <Icon.Star fill='#ea5455' size='20' color='#ea5455' />
                  ) : null}
                </div>
                : null
            }
          </div>
          <div className='d-flex'>
            <div className='mr-2'>
              {requestInfo?.status === TODO ? (
                <Badge color='danger' className='p-1'>
                  <FormattedMessage
                    id={getKeyLang('support.management.status.todo')}
                  />
                </Badge>
              ) : requestInfo?.status === DOING ? (
                <Badge color='warning' className='p-1'>
                  <FormattedMessage
                    id={getKeyLang('support.management.status.doing')}
                  />
                </Badge>
              ) : requestInfo?.status === DONE ? (
                <Badge color='primary' className='p-1'>
                  <FormattedMessage
                    id={getKeyLang('support.management.status.done')}
                  />
                </Badge>
              ) : null}
            </div>
            {
              isOpenChatBox.length > 0 ? <div>
                {Number(requestInfo?.supporterInOnId) === user?.id ||
                  user.id === Number(requestInfo.createdBy) ||
                  user.groupId === AD || Number(requestInfo?.hCUser?.userIdInOn) === user?.id || userAD_OP[0]?.decentralization ? (
                  <DropdownToggleStyled status={connectStatus !== "success"}>
                    <Dropdown
                      color={"warning"}
                      isOpen={isDropdownAction}
                      toggle={handleToggleDropdown}
                      disabled={connectStatus !== "success"}
                    >
                      <DropdownToggle size='sm'>
                        <Icon.Menu />
                      </DropdownToggle>
                      {
                        Number(requestInfo?.hCUser?.userIdInOn) === user.id && requestInfo?.status === DONE && user.groupId !== AD ? null : <DropdownMenu left>
                          <DropdownItem
                            onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
                            toggle={false}
                          >
                            <FormattedMessage
                              id={getKeyLang('support.permission.table.updateStatus')}
                            />
                            <ListGroup
                              className={`${isOpenSubMenu ? 'd-block' : 'd-none'}`}
                            >
                              {user.groupId === "AD.IO" && requestInfo?.status !== TODO || Number(requestInfo?.supporterInOnId) === user.id && requestInfo?.status !== TODO || userAD_OP[0]?.decentralization && requestInfo?.status !== TODO ? (
                                <ListGroupItem
                                  onClick={() => handleUpdateStatus(TODO)}
                                >
                                  <Icon.Square
                                    size='15'
                                    color='#ea5455'
                                    fill='#ea5455'
                                  />
                                  <span className='ml-1'>
                                    <FormattedMessage
                                      id={getKeyLang(
                                        'support.management.status.todo'
                                      )}
                                    />
                                  </span>
                                </ListGroupItem>
                              ) : null}
                              {user.groupId === "AD.IO" && requestInfo?.status !== DOING || Number(requestInfo?.supporterInOnId) === user.id && requestInfo?.status !== DOING || userAD_OP[0]?.decentralization && requestInfo?.status !== DOING ? (
                                <ListGroupItem
                                  onClick={() => handleUpdateStatus(DOING)}
                                >
                                  <Icon.Square
                                    size='15'
                                    color='#ff9f43'
                                    fill='#ff9f43'
                                  />
                                  <span className='ml-1'>
                                    <FormattedMessage
                                      id={getKeyLang(
                                        'support.management.status.doing'
                                      )}
                                    />
                                  </span>
                                </ListGroupItem>
                              ) : null}
                              {requestInfo.status !== DONE || Number(requestInfo.supporterInOnId === user.id) ? (
                                <ListGroupItem
                                  onClick={() => handleUpdateStatus(DONE)}
                                >
                                  <Icon.Square
                                    size='15'
                                    color='#338955'
                                    fill='#338955'
                                  />
                                  <span className='ml-1'>
                                    <FormattedMessage
                                      id={getKeyLang(
                                        'support.management.status.done'
                                      )}
                                    />
                                  </span>
                                </ListGroupItem>
                              ) : null}
                            </ListGroup>
                          </DropdownItem>


                          {user.id === Number(requestInfo.supporterInOnId) || user.groupId === AD || userAD_OP[0]?.decentralization ? (
                            <>
                              <DropdownItem onClick={() => handleOpenModalPoint()}>
                                <FormattedMessage
                                  id={getKeyLang('support.permission.table.point')}
                                />
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleOpenModalAddPeople()}
                              >
                                <FormattedMessage
                                  id={getKeyLang(
                                    'support.permission.table.addPeople'
                                  )}
                                />
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  handleOpenModalPrioritized()
                                }}
                              >
                                <FormattedMessage
                                  id={getKeyLang(
                                    'support.permission.table.prioritized'
                                  )}
                                />
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  handleOpenModalEdit()
                                }}
                              >
                                <FormattedMessage
                                  id={getKeyLang(
                                    'helpcenter.manangement.action.edit'
                                  )}
                                />
                              </DropdownItem>
                            </>
                          ) : null}
                        </DropdownMenu>
                      }
                    </Dropdown>
                  </DropdownToggleStyled>
                ) : null}
              </div> : <Button onClick={() => setDispatchAcitive()} color="primary">Mở đoạn chat</Button>
            }

          </div>
        </div>
      </div>
      <PopupPointPermission
        isOpen={isOpenModalPoint}
        handleToggle={handleOpenModalPoint}
        info={requestInfo}
        handleCloseModalPoint={handleCloseModalPoint}
        setDispatchAcitive={setDispatchAcitive}
        listUserInAllDepartment={listUserPoint}
        availableUser={availableUser}
        availablePermission={availablePermission}
        connectStatus={connectStatus}
      />
      <PopupAddPeople
        isOpen={isOpenModalAddPeople}
        userGroupSuggestion={userGroupSuggestion}
        availableUserGroupSuggestion={availableUserGroupSuggestion}
        info={requestInfo}
        handleToggle={handleOpenModalAddPeople}
        handleCloseModal={handleCloseModalAddPeople}
        setDispatchAcitive={setDispatchAcitive}
        listUserInAllDepartment={listUserInAllDepartment}
        connectStatus={connectStatus}
      />
      <PopupPrioritized
        isOpen={isOpenModalPrioritized}
        info={requestInfo}
        handleToggle={handleOpenModalPrioritized}
        handleCloseModal={handleCloseModalPrioritized}
        setDispatchAcitive={setDispatchAcitive}
        listUserInAllDepartment={listUserInAllDepartment}
        connectStatus={connectStatus}
      />
      <SelectStyled>
        <PopupEditRequest
          isOpen={isOpenModalEditRequest}
          info={requestInfo}
          handleToggle={handleOpenModalEdit}
          handleCloseModal={handleCloseModalEdit}
          setDispatchAcitive={setDispatchAcitive}
          connectStatus={connectStatus}
        />
      </SelectStyled>
      <CardBody>
        <InfoRequest info={requestInfo} />
      </CardBody>
      <CardFooter className='d-flex justify-content-end'>
        <Button onClick={() => history.action === "PUSH" ? history.goBack() : history.push("/app/support/management-request")}>
          <FormattedMessage id={getKeyLang('button.goback')} />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DeailMesssage
