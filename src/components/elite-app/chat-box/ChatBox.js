import React from 'react'
import SockJsClient from 'react-stomp'
import BottomWrapper from './fixed-position-wrapper'
import MinimumChatBox from './minimum-view'
import { getDefault_chatRowInfo, getUserFrom } from './normal-view/utility'
import {
    getRealNameOf, updateProps, useGetUserSignIn, KEY_SPLIT_USER_AVATAR,
    MAX_FRONT_MINIMIZE_CHATS_SHOW, MOBILE_MAX_FRONT_MINIMIZE_CHATS_SHOW,
    MAX_BACK_MINIMIZE_CHATS_SHOW, MOBILE_MAX_BACK_MINIMIZE_CHATS_SHOW,
} from './utility'
import { useSelector, useDispatch } from 'react-redux'
import { NAME_CHAT_BOX } from '../../../configs/insurance-app'
import {
    CONNECTING_STATUS_DISCONNECTED, CONNECTING_STATUS_NOT_CONNECT, CONNECTING_STATUS_SUCCESS,
    KEY_CONNECTING_STATUS, KEY_IS_RATE_MODAL_OPEN, KEY_MINIMUM_CHATS, KEY_OPENING_REQUEST_ROOMS_INFO, KEY_PAGE_CLICKED, KEY_TEMP_USER_INFO, NAME_CREATE_SUPPORT_REQUEST, VIEW_SIZE_ARC, VIEW_SIZE_MAXIMIZE,
    VIEW_SIZE_MINIMIZE, VIEW_SIZE_NORMAL
} from './reducer/ChatBox'
import { HttpClient, useDeviceDetect } from 'base-app'
import { isArrayEmpty, isObjEmpty } from '../../../ultity'
import { usePageContext } from '../../insurance-app/common-page/page-context/PageContext'
import VoteModal from './VoteModal'

const ChatBox = () => {
    const API_UTILITIES = `${HttpClient.defaults.baseURL}/nth/utilities/api/authenticate/chat`
    const { [KEY_MINIMUM_CHATS]: minimumChats,
        [KEY_CONNECTING_STATUS]: connectStatus,
        [KEY_OPENING_REQUEST_ROOMS_INFO]: openingRequestRoomsInfo,
        [KEY_PAGE_CLICKED]: pageClicked,
        [KEY_TEMP_USER_INFO]: tempUserInfo
    } = useSelector(state => state.app[NAME_CHAT_BOX])

    const { isMobile } = useDeviceDetect()
    const [messages, setMessages] = React.useState([])
    const [showChats, setShowChats] = React.useState({ _front_minimizeChats: [], _back_minimizeChats: [] })
    const setPageState = usePageContext()[1]
    const dispatch = useDispatch()
    const sockJs = React.useRef(null)
    let currentUser = useGetUserSignIn()
    const isTempUser = currentUser.id === "000" && !isObjEmpty(tempUserInfo)
    if (isTempUser) {
        currentUser = { ...currentUser, ...tempUserInfo }
        currentUser.userSettings.avatar = tempUserInfo.avatar
        currentUser.fullName = tempUserInfo.name
    }

    const handleChangeSizeViewStatus = (roomId, viewSizeStatus) => {
        let _new_minimumChats = minimumChats.map(elt => {
            if (elt.id.toString() === roomId.toString()) {
                elt.unreadMessages = 0
                elt.viewSizeStatus = viewSizeStatus
                elt._hasChangedSize = true
                return elt
            }
            elt._hasChangedSize = false
            return elt
        })

        dispatch(updateProps([
            {
                prop: KEY_MINIMUM_CHATS,
                value: _new_minimumChats
            }
        ]))
    }

    const handleChatClose = (roomId) => {
        const closeChat = () => {
            const _new_openingRequestRoomInfo = openingRequestRoomsInfo.filter(_elt => _elt.roomId.toString() !== roomId.toString())
            const _new_minimumChats = minimumChats.filter(elt => elt.id.toString() !== roomId.toString())
            dispatch(updateProps([
                {
                    prop: KEY_MINIMUM_CHATS,
                    value: _new_minimumChats
                },
                {
                    prop: KEY_OPENING_REQUEST_ROOMS_INFO,
                    value: _new_openingRequestRoomInfo
                },
            ]))
        }
        if (isTempUser) {
            dispatch(updateProps([
                {
                    prop: KEY_IS_RATE_MODAL_OPEN,
                    value: roomId
                }
            ]))
            return
        }
        closeChat()
    }

    const handleSendMsg = (user, inputVal, roomId, id) => {
        sockJs.current.sendMessage(
            `/app/chat/${roomId}`,
            JSON.stringify({
                fromUser: user.id + KEY_SPLIT_USER_AVATAR
                    + getRealNameOf(user) + KEY_SPLIT_USER_AVATAR
                    + user?.userSettings.avatar + KEY_SPLIT_USER_AVATAR
                    + getRealNameOf(user, true),
                contentText: inputVal,
                roomId: roomId,
                hCSupportBookId: id
            })
        )
    }

    const forceRenderMinimumChatById = (roomId, updateUnreadMessages) => {
        const _updated_minimumChats = minimumChats.map(elt => {
            if (elt.id.toString() === roomId.toString()
                || elt.roomInOnId.toString() === roomId.toString()) {
                ++elt._forceUpdate
                if (updateUnreadMessages) {
                    ++elt.unreadMessages
                }
            }
            return elt
        })
        dispatch(updateProps([
            {
                prop: KEY_MINIMUM_CHATS,
                value: _updated_minimumChats
            },
        ]))
    }

    const handleMessageReceived = (msgInfo) => {
        setMessages(pre => {
            const [fromUserId, fromUserName, fromUserAvatar, fromUserNickName] = getUserFrom(msgInfo)
            const { contentContentType } = msgInfo
            if (contentContentType !== "notify-log" &&
                fromUserName === getRealNameOf(currentUser)) {
                /* the same user => this is an echo from data streamline so we should not add another chat log */
                return pre
            }
            pre.push(
                getDefault_chatRowInfo(
                    {
                        id: fromUserId,
                        fullName: fromUserName,
                        username: fromUserNickName,
                        userSettings: {
                            avatar: fromUserAvatar
                        }
                    },
                    msgInfo.contentText,
                    msgInfo.roomId,
                    msgInfo.contentContentType,
                )
            )
            return pre
        })

        const minimumReceivedMsg = minimumChats.find(elt => (elt.id === msgInfo.roomId || elt.roomInOnId === msgInfo.roomId))
        if (!minimumReceivedMsg) return
        const hasUserReadThisMsg = (minimumReceivedMsg.viewSizeStatus !== VIEW_SIZE_MINIMIZE && minimumReceivedMsg.viewSizeStatus !== VIEW_SIZE_ARC)
        let updateUnreadMessages = false
        if (!hasUserReadThisMsg) {
            updateUnreadMessages = true
        }
        forceRenderMinimumChatById(msgInfo.roomId, updateUnreadMessages)
    }

    const getTopicAddresses = () => {
        return minimumChats.map(elt => {
            return "/topic/messages/" + elt.roomInOnId
        }).concat(minimumChats.map(elt => {
            return "/topic/messages/" + elt.id
        }))
    }

    const getPositionFor = (isFrontPosition) => {
        const lowPos = { bottom: "20px", right: "8px" }, highPos = { bottom: "76px", right: "8px" }
        if (!isMobile) {
            /* desktop */
            if (!isArrayEmpty(showChats._back_minimizeChats)) {
                if (isFrontPosition) {
                    /* front position */
                    const _lowPos = { ...lowPos }
                    _lowPos.right = "70px"
                    return _lowPos
                }
                /* back position */
                const __lowPos = { ...lowPos }
                __lowPos.bottom = "75px"
                __lowPos.width = "3.7rem"
                return __lowPos
            }
            /* normal position */
            return lowPos
        }
        /* mobile */
        if (!isArrayEmpty(showChats._back_minimizeChats)) {
            if (isFrontPosition) {
                const _lowPos = { ...lowPos }
                _lowPos.bottom = "130px"
                /* front position */
                return _lowPos
            }
            /* back position */
            const __hightPos = { ...highPos }
            // __hightPos.width = "3.7rem"
            __hightPos.bottom = "75px"
            return __hightPos
        }
        /* normal position */
        return highPos
    }

    React.useEffect(() => {
        const decideWhichOneInFront = () => {
            let _MAX_FRONT_SHOW = MAX_FRONT_MINIMIZE_CHATS_SHOW
            if (isMobile) { _MAX_FRONT_SHOW = MOBILE_MAX_FRONT_MINIMIZE_CHATS_SHOW }
            const _pivotIndex = minimumChats.length - 1 - _MAX_FRONT_SHOW

            let _MAX_BACK_SHOW = MAX_BACK_MINIMIZE_CHATS_SHOW
            if (isMobile) { _MAX_BACK_SHOW = MOBILE_MAX_BACK_MINIMIZE_CHATS_SHOW }
            const _minBackIndex = _pivotIndex - _MAX_BACK_SHOW

            if (minimumChats.length > _MAX_FRONT_SHOW) {
                let _frontChats = minimumChats.filter((elt, index) => {
                    if (index > _pivotIndex) {
                        if (isMobile) {
                            elt.viewSizeStatus = VIEW_SIZE_ARC
                        } else {
                            elt.viewSizeStatus = VIEW_SIZE_MINIMIZE
                        }
                        if (index === minimumChats.length - 1) {
                            elt.viewSizeStatus = VIEW_SIZE_NORMAL
                        }
                        return true
                    }
                    return false
                })
                let _backChats = minimumChats.filter((elt, index) => {
                    if (_minBackIndex < index && index <= _pivotIndex) {
                        elt.viewSizeStatus = VIEW_SIZE_ARC
                        return true
                    }
                    return false
                })
                setShowChats({ _front_minimizeChats: _frontChats, _back_minimizeChats: _backChats })
                return
            }

            setShowChats({ _front_minimizeChats: minimumChats, _back_minimizeChats: [] })
        }

        decideWhichOneInFront()
    }, [minimumChats.length, isMobile])

    React.useEffect(() => {
        const decideWhichOneInFront = () => {
            setShowChats(prev => {
                let { _front_minimizeChats, _back_minimizeChats } = prev
                const foundOpenChat = _front_minimizeChats.concat(_back_minimizeChats).find(elt => {
                    return elt._hasChangedSize && elt.viewSizeStatus === VIEW_SIZE_NORMAL
                })
                if (!foundOpenChat) {
                    if (!isArrayEmpty(_back_minimizeChats)) {
                        _back_minimizeChats = _back_minimizeChats.map(elt => {
                            elt.viewSizeStatus = VIEW_SIZE_ARC
                            return elt
                        })
                    }
                    return { _front_minimizeChats, _back_minimizeChats }
                }
                const _isFoundOpenChatInBack = _back_minimizeChats.find(elt => elt.id === foundOpenChat.id)
                if (_isFoundOpenChatInBack) {
                    _front_minimizeChats.push(foundOpenChat)
                    _back_minimizeChats = _back_minimizeChats.filter(elt => elt.id !== foundOpenChat.id)
                    const firstFront = _front_minimizeChats.shift()
                    _back_minimizeChats.push(firstFront)
                }
                if (isMobile) {
                    _front_minimizeChats = _front_minimizeChats.map(elt => {
                        if (elt.id !== foundOpenChat.id) {
                            elt.viewSizeStatus = VIEW_SIZE_MINIMIZE
                        }
                        return elt
                    })
                }
                _back_minimizeChats = _back_minimizeChats.map(elt => {
                    if (elt.id !== foundOpenChat.id) {
                        elt.viewSizeStatus = VIEW_SIZE_ARC
                    }
                    return elt
                })

                return { _front_minimizeChats, _back_minimizeChats }
            })
        }

        decideWhichOneInFront()
    }, [JSON.stringify(minimumChats.map(elt => elt.viewSizeStatus))])

    React.useEffect(() => {
        setPageState(pre => ({ sockJs: sockJs.current, _forceUpdate: pre._forceUpdate }))
    }, [sockJs.current])

    React.useEffect(() => {
        dispatch(updateProps([
            {
                prop: KEY_CONNECTING_STATUS,
                value: CONNECTING_STATUS_NOT_CONNECT
            },
        ]))
    }, [])

    return (
        <div>
            {/* isTempUser is the key to avoid duplicate vote-modal (since in DeailMesssage.js file also have this component too) */}
            {
                isTempUser &&
                <VoteModal currentUser={currentUser} isTempUser={isTempUser} />
            }

            {
                (!isArrayEmpty(minimumChats) || pageClicked === NAME_CREATE_SUPPORT_REQUEST) &&
                <SockJsClient
                    url={API_UTILITIES}
                    topics={getTopicAddresses()}
                    onConnect={() => {
                        dispatch(updateProps([
                            {
                                prop: KEY_CONNECTING_STATUS,
                                value: CONNECTING_STATUS_SUCCESS
                            }
                        ]))
                    }}
                    onDisconnect={() => {
                        dispatch(updateProps([
                            {
                                prop: KEY_CONNECTING_STATUS,
                                value: CONNECTING_STATUS_DISCONNECTED
                            }
                        ]))
                    }}
                    onMessage={handleMessageReceived}
                    debug={true}
                    ref={sockJs}
                />
            }
            {/** the box that is wrap all of front items */}
            <BottomWrapper fixedPosStyle={getPositionFor(true)} zIndex={1032}>
                {
                    showChats._front_minimizeChats.map((_elt) => {
                        const { id, roomInOnId, title, viewSizeStatus, unreadMessages, activeTab, userAvatars } = _elt
                        return (
                            <MinimumChatBox
                                id={id} key={id}
                                title={title}
                                viewSizeStatus={viewSizeStatus}
                                handleClose={handleChatClose}
                                handleSendMsg={handleSendMsg}
                                handleChangeSizeViewStatus={handleChangeSizeViewStatus}
                                unreadMessages={unreadMessages}
                                info={{
                                    messages,
                                    setMessages,
                                    connectStatus,
                                    forceRenderMinimumChatById,
                                    handleChangeSizeViewStatus,
                                    handleClose: handleChatClose,
                                    user: currentUser,
                                    roomId: id,
                                    active: activeTab,
                                    title,
                                    roomInOnId: roomInOnId,
                                    userAvatars
                                }}
                            />
                        )
                    })
                }
            </BottomWrapper>
            {/** the box that is wrap all of back items */}
            {
                !isArrayEmpty(showChats._back_minimizeChats) &&
                <BottomWrapper fixedPosStyle={getPositionFor(false)} zIndex={1031}>
                    {
                        showChats._back_minimizeChats.map((_elt) => {
                            const { id, roomInOnId, title, viewSizeStatus, unreadMessages, activeTab, userAvatars } = _elt
                            return (
                                <MinimumChatBox
                                    id={id} key={id}
                                    title={title}
                                    viewSizeStatus={viewSizeStatus}
                                    handleClose={handleChatClose}
                                    handleSendMsg={handleSendMsg}
                                    handleChangeSizeViewStatus={handleChangeSizeViewStatus}
                                    unreadMessages={unreadMessages}
                                    info={{
                                        title,
                                        messages,
                                        setMessages,
                                        connectStatus,
                                        forceRenderMinimumChatById,
                                        handleChangeSizeViewStatus,
                                        handleClose: handleChatClose,
                                        user: currentUser,
                                        roomId: id,
                                        active: activeTab,
                                        roomInOnId: roomInOnId,
                                        userAvatars
                                    }}
                                />
                            )
                        })
                    }
                </BottomWrapper>
            }
        </div>
    )
}

export default ChatBox