import React from 'react'
import Body from './components/body'
import Header from './components/header'
import {
  BodyLiveChat, BoxSendSupportRequestStyled, HeaderLiveChat
} from './utility'
const BoxSendSupportRequest = ({ isOpen , handleCloseLiveChat }) => {
  return (
    <BoxSendSupportRequestStyled isOpen={isOpen}>
      <HeaderLiveChat>
        <Header handleCloseLiveChat={handleCloseLiveChat}/>
      </HeaderLiveChat>
      <BodyLiveChat>
        <Body handleCloseLiveChat={handleCloseLiveChat}/>
      </BodyLiveChat>
    </BoxSendSupportRequestStyled>
  )
}

export default BoxSendSupportRequest
