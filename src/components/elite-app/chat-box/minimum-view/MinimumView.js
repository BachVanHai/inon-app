import React from 'react'
import NormalView from '../normal-view'
import { CONNECTING_STATUS_SUCCESS, KEY_OPENING_REQUEST_ROOMS_INFO, VIEW_SIZE_ARC, VIEW_SIZE_MAXIMIZE, VIEW_SIZE_NORMAL } from '../reducer/ChatBox'
import { useIsUserSignIn } from '../utility'
import { MinimumChatBoxStyled, MinimumTitle, MinimumIcon, ButtonCloseMessage, UnreadMessagesStyled } from './utility'
import * as Icon from 'react-feather'
import { NAME_CHAT_BOX } from '../../../../configs/insurance-app'
import { useSelector } from 'react-redux'
import AvatarComp from '../normal-view/Avatar'
import ArcView from './ArcView'
import notificationSound from '../../../../assets/sound/elite_app/Waterdrop_Message_Notification.mp3'

const MinimumChatBox = ({ id, title, info, unreadMessages, handleSendMsg, handleChangeSizeViewStatus, viewSizeStatus, handleClose }) => {
    const { [KEY_OPENING_REQUEST_ROOMS_INFO]: openingRequestRoomsInfo } = useSelector(state => state.app[NAME_CHAT_BOX])
    const audio = new Audio(notificationSound)
    const openingRequestRoomInfo = React.useMemo(() => openingRequestRoomsInfo.find(elt => elt.roomId === id), [JSON.stringify(openingRequestRoomsInfo)])
    const isUserSignIn = useIsUserSignIn()
    const { connectStatus } = info
    const isEnable = connectStatus === CONNECTING_STATUS_SUCCESS
    const decideBackgroundColor = () => {
        if (isEnable) {
            if (unreadMessages > 0) {
                audio.play()
                return "#c7974f"
            }
            return "#4E9F3D"
        }
        return "gray"
    }

    const renderView = () => {
        if (!isUserSignIn) return null

        if (viewSizeStatus === VIEW_SIZE_NORMAL || viewSizeStatus === VIEW_SIZE_MAXIMIZE) {
            return (
                <NormalView
                    roomInfo={info}
                    handleSendMsg={handleSendMsg}
                    viewSizeStatus={viewSizeStatus}
                />
            )
        }
        if (viewSizeStatus === VIEW_SIZE_ARC) {
            return (
                <ArcView
                    id={id}
                    handleClose={handleClose}
                    handleClick={handleChangeSizeViewStatus.bind(null, id, VIEW_SIZE_NORMAL)}
                    openingRequestRoomInfo={openingRequestRoomInfo}
                    backgroundColor={decideBackgroundColor}
                    unreadMessages={unreadMessages}
                />
            )
        }
        return (
            <MinimumChatBoxStyled id={id} backgroundColor={decideBackgroundColor}>
                <div>
                    {
                        unreadMessages > 0 ? <UnreadMessagesStyled top={"7px"} left={"35px"}>{unreadMessages}</UnreadMessagesStyled> : null
                    }
                    <AvatarComp avatarUrl={openingRequestRoomInfo?.hCUser?.avatar} style={{ marginTop: "10px" }} zIndex={"0"} />

                </div>
                <MinimumTitle
                    onClick={handleChangeSizeViewStatus.bind(null, id, VIEW_SIZE_NORMAL)}
                    className="ml-1"
                >
                    {title}
                </MinimumTitle>

                <MinimumIcon
                    onClick={handleClose.bind(null, id)}
                >
                    <ButtonCloseMessage>
                        <Icon.X color="#fff" width={16} />
                    </ButtonCloseMessage>
                </MinimumIcon>
            </MinimumChatBoxStyled>
        )
    }

    return (
        < >
            {renderView()}
        </>
    )
}

export default MinimumChatBox