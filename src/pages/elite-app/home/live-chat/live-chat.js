import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import liveChatIcon from '../../../../assets/images/elite-app/home/livechat/live_chat_icon.png'
import { KEY_OPENING_REQUEST_ROOMS_INFO } from '../../../../components/elite-app/chat-box/reducer/ChatBox'
import { NAME_CHAT_BOX } from '../../../../configs/insurance-app'
import BoxSendSupportRequest from './boxSendSupportRequest'
import { IconChatCircle, LiveChatBox } from './utility'

const LiveChat = ({sideNavType}) => {
  const { [KEY_OPENING_REQUEST_ROOMS_INFO]: openingRequestRoomsInfo } =
    useSelector((state) => state.app[NAME_CHAT_BOX])
  const [isOpenLiveChat, setIsOpenLiveChat] = useState(false)
  const handleOpenLiveChat = () => {
    setIsOpenLiveChat(!isOpenLiveChat)
  }
  const handleCloseLiveChat = () => {
    setIsOpenLiveChat(false)
  }
  return (
    <div>
      {openingRequestRoomsInfo.length > 0 || sideNavType === 'support' ? null : (
        <LiveChatBox>
          {!isOpenLiveChat ? (
            <div onClick={() => handleOpenLiveChat()}>
              <IconChatCircle src={liveChatIcon} alt='' />
            </div>
          ) : (
            <BoxSendSupportRequest
              isOpen={isOpenLiveChat}
              handleCloseLiveChat={handleCloseLiveChat}
              handleCloseLiveChat={handleCloseLiveChat}
            />
          )}
        </LiveChatBox>
      )}
    </div>
  )
}

export default LiveChat
