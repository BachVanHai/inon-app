import React, { useState } from 'react'
import { useDeviceDetect } from 'base-app'
import { useSelector } from 'react-redux'
import { NavItem, NavLink } from 'reactstrap'
import ChatRow from './ChatRow'
import {
    chatLogConfig_1,
    chatLogConfig_2,
    getDefault_chatRowInfo,
    getChatRowId,
    getUserFrom,
    ROOM_TYPE_GUEST,
    ROOM_TYPE_INON,
    chatLogConfig_3,
    GROUP_ID_INON_CODE,
    componentsHeight_2
} from './utility'
import {
    CONNECTING_STATUS_SUCCESS,
    KEY_MINIMUM_CHATS,
    KEY_OPENING_REQUEST_ROOMS_INFO,
    KEY_FORCE_UPDATE,
    KEY_ALL_USER,
    VIEW_SIZE_NORMAL,
    VIEW_SIZE_MAXIMIZE
} from '../reducer/ChatBox'
import * as Service from '../service'
import {
    hasRequestFail,
    isArrayEmpty,
    isValueEmpty,
    useIsUserInOn,
    isObjEmpty
} from '../../../../ultity'
import {
    getRealNameOf, isUserCreateThisRequest as isCurrentUserCreateThisRequest,
    isUserInFollowerInOn as isCurrentUserInFollowerInOn,
    KEY_SPLIT_USER_AVATAR
} from '../utility'
import { useDispatch } from 'react-redux'
import { updateProps } from '../utility'
import { NAME_CHAT_BOX } from '../../../../configs/insurance-app'
import { DOING, DONE, TODO } from '../../../../pages/app-no1/support/utility'
import { usePageContext } from '../../../insurance-app/common-page/page-context/PageContext'
import moment from 'moment'
import MaximizeBaseView from './MaximizeBaseView'
import NormalBaseView from './NormalBaseView'
import TurndownService from 'turndown';

const View = ({ roomInfo, handleSendMsg, viewSizeStatus }) => {
    const dispatch = useDispatch()
    const { isMobile } = useDeviceDetect()
    const [pageInfo] = usePageContext()
    const { sockJs } = pageInfo
    const { [KEY_MINIMUM_CHATS]: minimizeChats,
        [KEY_OPENING_REQUEST_ROOMS_INFO]: openingRequestRoomsInfo,
        [KEY_FORCE_UPDATE]: dispatchDependency,
        [KEY_ALL_USER]: users
    } = useSelector(state => state.app[NAME_CHAT_BOX])
    const { user: userGroupInOn } = useSelector(state => state.auth)
    const codeInOn =
        userGroupInOn.groupId !== undefined
            ? userGroupInOn.groupId.substr(userGroupInOn.groupId.length - 2)
            : null
    const {
        messages, setMessages, handleClose, handleChangeSizeViewStatus,
        connectStatus, title, roomId, roomInOnId, active, user, userAvatars
    } = roomInfo
    const [inputVal, setInputVal] = useState("")

    const [componentsHeight, setComponentsHeight] = useState(componentsHeight_2)
    const openingRequestRoomInfo = React.useMemo(() => openingRequestRoomsInfo.find(elt => elt.roomId === roomId), [JSON.stringify(openingRequestRoomsInfo)])
    const { status: supportedStatus = "TODO", flowerInOnId, id: hCSupportBookId,
        supporterInOnId, voteScore, hCUser, createdBy } = openingRequestRoomInfo || {}
    const { userIdInOn } = hCUser ? hCUser : { userIdInOn: "" }
    const _room_id_by_active = active === ROOM_TYPE_GUEST ? roomId : roomInOnId

    const _filterMessages = React.useMemo(() => messages.filter((elt) => {
        return (elt.roomId === _room_id_by_active)
    }), [active, messages.length])

    const [_messagesOfThisRoom, _tmpUserAvatars] = React.useMemo(() => {
        const __chatLogAvatars = {}
        const __filter = _filterMessages.filter((elt, index, _messages) => {
            if (active === ROOM_TYPE_INON) return true
            if (index === 0) return false
            const [_currentId, _currentName, _currentAvatar, _currentNickName] = getUserFrom(elt)
            if (_currentNickName) {
                __chatLogAvatars[_currentNickName] = { avatar: _currentAvatar }
            }
            return true
        })
        return [__filter, __chatLogAvatars]
    }, [active, _filterMessages.length])

    const isUserInOn = useIsUserInOn()
    const isEnable = connectStatus === CONNECTING_STATUS_SUCCESS
    const isUserSupporter = user?.id?.toString() === supporterInOnId?.toString()
    const isUserInFollowerInOn = isCurrentUserInFollowerInOn(flowerInOnId, user)
    const isUserInOnGrouId = codeInOn === GROUP_ID_INON_CODE && userGroupInOn.id?.toString() !== userIdInOn?.toString()
    // shouldChangeRoomStatusByComment
    const foundUserSupporterComment = _messagesOfThisRoom.find(elt => elt.fromUser.split(KEY_SPLIT_USER_AVATAR)[0]?.toString() === supporterInOnId?.toString())
    const shouldChangeRoomStatusByComment = isUserSupporter && supportedStatus === TODO && !foundUserSupporterComment && active === ROOM_TYPE_GUEST
        || isUserInOnGrouId && supportedStatus === TODO && !foundUserSupporterComment && active === ROOM_TYPE_GUEST
    //
    let shouldShowInput = supportedStatus !== DONE
    // admin user has 2 id
    const _createdBy = (createdBy?.toString() === "1" || createdBy?.toString() === "2") ? "2" : createdBy?.toString()
    const _userIdInOn = (userIdInOn?.toString() === "1" || userIdInOn?.toString() === "2") ? "2" : userIdInOn?.toString()
    const isRoomCreatedForGuest = _createdBy !== _userIdInOn
    const isUserCreateThisRequest = isCurrentUserCreateThisRequest(user, _createdBy)
    const shouldShowRateButton = (voteScore || !isUserCreateThisRequest && (isUserInFollowerInOn || isUserSupporter)) ? false : true

    const toggle = (tab) => {
        let _nextArr = [...minimizeChats]
        if (active !== tab) {
            _nextArr = minimizeChats.map(elt => {
                if (elt.id.toString() === roomId.toString()) {
                    elt.activeTab = tab
                }
                return elt
            })
        }
        dispatch(updateProps([
            {
                prop: KEY_MINIMUM_CHATS,
                value: _nextArr
            }
        ]))
    }

    const handleInputChange = (e) => {
        setInputVal(e)
    }

    const handleChatSubmit = (e) => {
        if (isValueEmpty(inputVal) || !isEnable) return
        if (isRoomCreatedForGuest && active === ROOM_TYPE_GUEST && user.id?.toString() === _createdBy) {
            // if you are the one who created this request, you are not allowed to post a comment under the guest's user-name 
            return
        }
        const dating = moment().format("DD-MM-YYYY H:mm")
           // Create an instance of the Turndown service
      const turndownService = new TurndownService();

        setInputVal('')
        const _inputVal = turndownService.turndown(inputVal);
        setMessages((pre) => {
            pre.push(getDefault_chatRowInfo(user, _inputVal, _room_id_by_active))
            return pre
        })
        handleSendMsg(user, _inputVal, _room_id_by_active, openingRequestRoomInfo.id)

        if (shouldChangeRoomStatusByComment) {
            Service.sendNotifyLog(
                sockJs,
                `${dating} ` + getRealNameOf(user) + " đã tiếp nhận yêu cầu",
                user,
                roomId,
                roomInOnId,
                hCSupportBookId
            )
            Service.updateRequestRoomStatus(openingRequestRoomInfo, DOING).then((res) => {
                dispatch(updateProps([
                    {
                        prop: KEY_FORCE_UPDATE,
                        value: dispatchDependency + 1
                    }
                ]))
            })
        }
    }
    
    const handleUploadMultiFile = async (file) => {
        const formData = new FormData()
        formData.append('file', file, file.name)
        formData.append('SPBCode', openingRequestRoomInfo.id)
        const resUpload = await Service.uploadFile(formData)
        if (resUpload.status === 200) {
            const newMessage = {
                contentText: `<a href="${resUpload.data.downloadFromUrl}" taget="_blank">${getRealNameOf(user)} đã gửi tệp : ${file.name}</a>`,
                fromUser:
                    openingRequestRoomInfo.hCUserId +
                    KEY_SPLIT_USER_AVATAR +
                    getRealNameOf(user) +
                    KEY_SPLIT_USER_AVATAR +
                    user?.userSettings?.avatar,
                hCSupportBookId: openingRequestRoomInfo.id,
                roomId: openingRequestRoomInfo.roomId,
                type: 'ATTACHMENT',
            }
            const resNewMessage = await Service.uploadNewMessageAttachment(newMessage)
            if (resNewMessage.status === 201) {
                setMessages((pre) => {
                    pre.push(
                        getDefault_chatRowInfo(
                            user,
                            resNewMessage.data.content,
                            _room_id_by_active
                        )
                    )
                    return pre
                })
                handleSendMsg(user, resNewMessage.data.content, _room_id_by_active)
            }
        }
    }

    const renderChatlog = (index, _messages, _currentElt) => {
        const _id = getChatRowId(_room_id_by_active, index)
        const _previousElt = _messages[index - 1]
        let _preUserName = "", _preBackgroundColor, _preContentContentType
        if (_previousElt) {
            _preUserName = getUserFrom(_previousElt)[1]
            _preContentContentType = _previousElt.contentContentType || ""
            _preBackgroundColor = _previousElt.backgroundColor
        }
        const _nextElt = _messages[index + 1]
        let _nextUserName = "", _nextContentContentType
        if (_nextElt) {
            _nextUserName = getUserFrom(_nextElt)[1]
            _nextContentContentType = _nextElt.contentContentType || ""
        }
        let [_currentUserId, _currentUserName, _currentAvatar, _currentNickName] = getUserFrom(_currentElt)
        _currentAvatar = userAvatars ? userAvatars[_currentNickName]?.avatar : _currentAvatar
        const { contentContentType } = _currentElt
        const _isUserChatLog = _currentUserName === getRealNameOf(user)
        if (_isUserChatLog) {
            _currentElt.positionStatus = chatLogConfig_2.positionStatus
            _currentElt.backgroundColor = chatLogConfig_2.backgroundColor
        } else {
            _currentElt.positionStatus = chatLogConfig_1.positionStatus
            let _otherUserBackgroundColor = _preBackgroundColor
            if (_preUserName !== _currentUserName) {
                // the comment in the series of a specific user's comments
                if (_otherUserBackgroundColor === chatLogConfig_1.backgroundColor) {
                    _otherUserBackgroundColor = chatLogConfig_3.backgroundColor
                } else {
                    _otherUserBackgroundColor = chatLogConfig_1.backgroundColor
                }
            }
            _currentElt.backgroundColor = _otherUserBackgroundColor
        }
        let _isHideUserName = false, _isHideAvatar = false
        /* check if this current comment is in the series of user's comments */
        if (contentContentType !== "notify-log") {
            if (_preUserName !== _currentUserName && _nextUserName === _currentUserName && _nextContentContentType !== "notify-log"
                || _nextUserName === _currentUserName && _preContentContentType === "notify-log" && _nextContentContentType !== "notify-log") {
                // the fist comment in the series of a specific user's comments
                _isHideAvatar = true
                _isHideUserName = false
            }
            if (_preUserName === _currentUserName && _preContentContentType !== "notify-log") {
                // the middle comment in the series of a specific user's comments
                _isHideAvatar = true
                _isHideUserName = true
            }
            if (_preUserName === _currentUserName && _preContentContentType !== "notify-log"
                && (_currentUserName !== _nextUserName || _nextContentContentType === "notify-log")) {
                // the last comment in the series of a specific user's comments
                _isHideAvatar = false
                _isHideUserName = true
            }
        }
        return (
            <ChatRow
                id={_id} key={_id}
                className={`${'message-log'} ` + _isHideAvatar ? '' : 'mt-1'}
                isHideUserName={_isHideUserName} isHideAvatar={_isHideAvatar}
                backgroundColor={_currentElt.backgroundColor}
                positionStatus={_currentElt.positionStatus}
                type={_currentElt.contentContentType}
                userName={_currentUserName}
                timeStamp={_currentElt.sendDate}
                content={_currentElt.content}
                avatarUrl={_currentAvatar}
            />
        )
    }

    const renderInOnChatRow = () => {
        return _messagesOfThisRoom.map((_currentElt, index, _messages) => {
            if (roomInOnId?.toString() !== _currentElt.roomId?.toString()) return null
            return renderChatlog(index, _messages, _currentElt)
        })
    }

    const renderGuestChatRow = () => {
        return _messagesOfThisRoom.map((_currentElt, index, _messages) => {
            if (roomId?.toString() !== _currentElt.roomId?.toString()) return null
            return renderChatlog(index, _messages, _currentElt)
        })
    }

    React.useEffect(() => {
        const updateAvatar = async () => {
            const _keyTmpUserAvatars = Object.keys(_tmpUserAvatars)
            const _noSpacekeyTmpUserAvatars = _keyTmpUserAvatars.filter(elt => elt.match(/(?!temp-user)(^[^\s]+$)/))
            const responses = await Promise.all(_noSpacekeyTmpUserAvatars.map(elt => {
                return Service.getInfoOf(elt)
            }))
            for (let res of responses) {
                if (hasRequestFail(res.status)) continue
                if (_tmpUserAvatars[res.data.username]) {
                    _tmpUserAvatars[res.data.username].avatar = res.data.userSettings?.avatar
                }
            }
            const _next = minimizeChats.map(elt => {
                if (elt.id === roomId) {
                    elt.userAvatars = _tmpUserAvatars
                }
                return elt
            })
            dispatch(updateProps([
                {
                    prop: KEY_MINIMUM_CHATS,
                    value: _next
                }
            ]))
        }
        if (!isObjEmpty(userAvatars)) return
        updateAvatar()
    }, [Object.keys(_tmpUserAvatars).length])

    React.useEffect(() => {
        const getChatlogsOf = async () => {
            const responses = await Promise.all([
                Service.getChatlogsOf(roomId),
                Service.getChatlogsOf(roomInOnId)
            ])
            let _messages = []
            for (let res of responses) {
                if (!hasRequestFail(res.status)) {
                    _messages = [..._messages, ...res.data]
                }
            }
            setMessages((pre) => {
                return [...pre, ..._messages]
            })
        }
        const _chatlogs = messages.filter((elt) => {
            return elt.roomId === roomId || elt.roomId === roomInOnId
        })
        if (!isArrayEmpty(_chatlogs)) return
        getChatlogsOf()
    }, [])

    const renderTabs = () => {
        const _inonTab = {
            tabName: "InOn-tab",
            roomType: ROOM_TYPE_INON,
            label: "InOn",
        }
        const tabs = [
            {
                tabName: "guest-tab",
                roomType: ROOM_TYPE_GUEST,
                label: <div className='overflow-hidden'>{openingRequestRoomInfo?.hCUser?.name}</div>,
            },
        ]
        if (isUserInOn) {
            tabs.push(_inonTab)
        }
        if (tabs.length === 1) return null
        return tabs.map((elt, index, _tabs) => {
            const { tabName, roomType, label } = elt
            return (
                <NavItem className={`w-${100 / _tabs.length} h-100`} key={tabName}>
                    <NavLink
                        className='p-0 d-flex justify-content-center'
                        active={active === roomType}
                        onClick={() => {
                            toggle(roomType)
                        }}
                    >
                        {label}
                    </NavLink>
                </NavItem>
            )
        })
    }

    const renderChatBox = () => {
        if (isMobile) {
            viewSizeStatus = VIEW_SIZE_MAXIMIZE
        }
        const viewInfo = {
            users,
            roomId,
            active,
            title,
            isEnable,
            inputVal,
            voteScore,
            componentsHeight,
            openingRequestRoomInfo,
            viewSizeStatus,
            _messagesOfThisRoom,
            _room_id_by_active,

            isMobile,
            isUserInOn,
            isUserSupporter,
            shouldShowInput,
            shouldShowRateButton,

            dispatch,
            renderTabs,
            handleClose,
            handleSendMsg,
            handleChatSubmit,
            renderInOnChatRow,
            renderGuestChatRow,
            handleInputChange,
            handleUploadMultiFile,
            handleChangeSizeViewStatus,

            setComponentsHeight,
        }

        if (viewSizeStatus === VIEW_SIZE_MAXIMIZE) {
            return (
                <MaximizeBaseView viewInfo={viewInfo} />
            )
        }
        if (viewSizeStatus === VIEW_SIZE_NORMAL) {
            return (
                <NormalBaseView viewInfo={viewInfo} />
            )
        }
        return null
    }

    return (
        <div className='chat-box-content'>
            {renderChatBox()}
        </div>
    )
}

export default View