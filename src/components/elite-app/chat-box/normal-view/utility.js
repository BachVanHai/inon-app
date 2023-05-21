import styled, { keyframes } from 'styled-components'
import Input from 'reactstrap/lib/Input'
import Form from 'reactstrap/lib/Form'
import InputEmoji from "react-input-emoji";
import moment from 'moment'
import { getRealNameOf, KEY_SPLIT_USER_AVATAR } from '../utility'
import ReactPlayer from 'react-player'
import * as Icon from 'react-feather'
import { Media } from 'reactstrap'
import { VIEW_SIZE_MAXIMIZE } from '../reducer/ChatBox';

export const ROOM_TYPE_GUEST = 'guest'
export const ROOM_TYPE_INON = 'inon'
export const MAXIMIZE = VIEW_SIZE_MAXIMIZE
export const GROUP_ID_INON_CODE = "IO"
export const currenAvatar = "https://sit2.inon.vn/resources/images/default-user-avatar.png"

export const getChatRowId = (roomId, index) => {
  return roomId + '-message-log-' + index
}

export const getDefault_chatRowInfo = (
  user,
  inputVal,
  roomId,
  contentContentType
) => {
  return {
    fromUser:
      user?.id + KEY_SPLIT_USER_AVATAR +
      getRealNameOf(user) + KEY_SPLIT_USER_AVATAR +
      user?.userSettings?.avatar + KEY_SPLIT_USER_AVATAR +
      getRealNameOf(user, true),
    sendDate: moment().utc(false).toISOString(),
    content: inputVal || '',
    roomId,
    contentContentType
  }
}
/**
 * @example
    const [userId, userName, avatar] = getUserFrom(elt)
 */
export const getUserFrom = (messagesElt) => {
  let arr = messagesElt?.fromUser?.split(KEY_SPLIT_USER_AVATAR)
  return arr || []
}
export const normalSize = {
  width: '25rem',
  height: '32rem'
}
export const maximizeSize = {
  width: '74vw',
  height: '35rem',
}

export const chatLogConfig_1 = {
  positionStatus: 'left',
  backgroundColor: '#d0d3e2'
}
export const chatLogConfig_2 = {
  positionStatus: 'right',
  backgroundColor: '#106d5a',
  color: "#fff !important"
}
export const chatLogConfig_3 = {
  positionStatus: 'left',
  backgroundColor: '#d0d3e2'
}

export const componentsHeight_1 = {
  headerHeight: "20%",
  headerDisplay: "block",
  bodyHeight: "80%",
  bodyDisplay: "block",
  footerHeight: "0%",
  footerDisplay: "none",
  headerTopHeight: "62%",
  headerBelowHeight: "38%"
}

export const componentsHeight_2 = {
  headerHeight: "20%",
  headerDisplay: "block",
  bodyHeight: "66%",
  bodyDisplay: "block",
  footerHeight: "14%",
  footerDisplay: "block",
  headerTopHeight: "62%",
  headerBelowHeight: "38%"
}

export const componentsHeight_3 = {
  headerHeight: "12%",
  headerDisplay: "block",
  bodyHeight: "78%",
  bodyDisplay: "block",
  footerHeight: "10%",
  footerDisplay: "block",
  headerTopHeight: "62%",
  headerBelowHeight: "38%"
}

export const messageKeyframes = keyframes`
    from {
      transform: scale(.7);
    }
    100% {
      transform: scale(1);
    }
`

export const ChatBoxStyled = styled.div`
  background-color: white;
  border: solid #338955 2px;
  border-radius: 8px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: ${(p) => p.zoomOutStatus === VIEW_SIZE_MAXIMIZE ? "25px" : "2px"};
  width: ${(p) => p.width || '40rem'};
  height: ${(p) => p.height || "60rem"};
  @media (max-width: ${(p) => p.breakpointPhone || '1024px'}) {
    & {
      width: 90vw;
    }
  }
  @media (max-width: ${(p) => p.breakpointPhone || '578px'}) {
    & {
      margin-right : 10px;
    }
  }
  @media (max-height: ${(p) => p.breakPointHeight || '500px'}) {
    & {
      height: 75vh;
    }
  }
`
export const ImageAvatarStyled = styled.div`
    border-radius: 50%;
`

export const fontSizeSmall = '.7rem'
export const fontSizeMedium = '.82rem'
export const fontSizeLagre = '1.05rem'
export const fontSizeLagrer = '1.25rem'

export const CenterHorizontalRow = styled.div`
    display: flex;
    align-items: center;
    color : ${(p) => p?.color ? p?.color : ""};
    text-align : ${(p) => p.textCenter ? p.textCenter : ''};
    justify-content: ${(p) => p.justifyContent ? p.justifyContent : 'space-between'};
    width: ${(p) => (p.width ? p.width : '100%')};
    font-size: ${(p) => (p.fontSize ? p.fontSize : fontSizeLagre)};
    margin-bottom : ${(p) => (p.marginBottom ? p.marginBottom : "0px")};
    margin-right : ${(p) => (p.marginRight ? p.marginRight : "0px")};
`

export const CenterHorizontalRowImageRight = styled.div`
display : flex ;
justify-content : flex-end;
color :  ${(p) => p.color ? p.color : `normal`};
   img{
    background-color: ${(p) => p.backgroundColor ? p.backgroundColor : '#338955'};
     padding : 10px;
     width : 200px;
     border-radius : 10px 0px 0px 0px;
   }
   img#react-modal-image-img {
    width: 600px;
    }
`

export const CenterHorizontalRowImageLeft = styled.div`
display : flex ;
justify-content : flex-start;
   img{
    background-color: ${(p) => p.backgroundColor ? p.backgroundColor : '#338955'};
    padding : 10px;
     width : 200px;
     border-radius : 0px 10px 0px 0px;
   }
   img#react-modal-image-img {
     width: 600px;
    }
`

/** Header start */
export const ChatBoxHeader = styled.div`
  width: 100%;
  height: ${p => p.height || "25%"};
  display: ${p => p.display || "block"};
  @media (max-height: ${(p) => p.breakPointHeight || '500px'}) {
    & {
      height: 26%;
    }
  }
`
export const HeaderTop = styled(CenterHorizontalRow)`
  padding: 0 6px 0 6px;
  color: white;
  font-weight: bold;
  width: 100%;
  max-height : 50px;
  height: ${p => p.height || "62%"};
  background-color: ${(p) => p.backgroundColor || '#338955'};
  border-radius: ${p => p.borderRadius || "5px 5px 0px 0px"};
`
export const HeaderTopIcon = styled.span`
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 4px 4px 4px 4px;
  border-radius: 0.3rem;
  &:hover {
    background-color: #AAA492;
  }
`
export const MediaStyled = styled(Media)`
  margin-top: 0.5rem;
  filter: invert(100%) sepia(0%) saturate(2%) hue-rotate(62deg) brightness(105%)
    contrast(101%);
`
export const IconXStyled = styled(Icon.X)``
export const IconMinusStyled = styled(Icon.Minus)``
export const IconSquareStyled = styled(Icon.Square)``
export const HeaderBelow = styled(CenterHorizontalRow)`
  width: 100%;
  height: ${p => p.height || "38%"};
`
/** Header end */

/** Body start */
export const ChatBoxBody = styled.div`
  border-radius: 8px;
  overflow: auto;
  padding: 6px 8px;
  background-color: inherit;
  position: relative;
  width: 100%;
  height: ${p => p.height || "57%"};
  display: ${p => p.display || "block"};
  @media (max-height: ${(p) => p.breakPointHeight || '500px'}) {
    & {
      height: 52%;
    }
  }
  
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  ::-webkit-scrollbar {
    width: 2px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #338955;
  }
`
/** Body end */

/** Footer start */
export const ChatBoxFooter = styled.div`
  background-color: inherit;
  width: 100%;
  height: ${p => p.height || "18%"};
  display: ${p => p.display || "block"};
  border-radius: 0px 0px 8px 8px;
  @media (max-height: ${(p) => p.breakPointHeight || '500px'}) {
    & {
      height: 22%;
    }
  }
`
export const FormStyle = styled(Form)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: end;
`
export const BorderGreenBox = styled.div`
  background-color: inherit;
  border-top: 1px solid #338955;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 3.8rem;
`
export const ButtonStyled = styled.div`
  padding: 5px;
  background-color: ${(p) => p.backgroundColor || 'inherit'};
  width: ${(p) => p.width || 'auto'};
  color: white;
  padding : ${(p) => p.padding || 'inherit'};;
  border-radius: 50%;
  height: fit-content;
  cursor: pointer;
`
export const InputStyled = styled(Input)`
  width: 100%;
  border-radius: 20px;
  margin-left : 5px;
  background: #EAEAEA;
  &:focus {
    color: #4e5154;
    background-color: #fff;
    border-color: #338955;
    outline: 0;
    background: #EAEAEA;
    box-shadow: none;
  }
`
export const RateInputStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #338955;
  font-size: 1.1rem;
  font-style: italic;
  cursor: pointer;
  border: 1px solid #338955;
  border-radius: 0.5rem;
  &:hover {
    color: lightgreen;
  }
`
/** Footer end */

/** chat-row start */
export const ChatArea = styled.div`
  width: fit-content;
  height: fit-content;
  max-width : 80%;
  animation: ${messageKeyframes} 0.15s ease-in 0s both;
  animation-delay: var(--delay);
  overfollow : hidden;
  --bgcolor: #d8d8d8;
  border-radius : --radius: 8px 8px 8px 0;
  transform-origin: 0 100%;
  margin-bottom : 5px;
`
export const ColorBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.backgroundColor ? p.backgroundColor : '#338955'};
  border-radius: 0.2rem;
  white-space: normal;
  padding: 3px 6px;
  border-radius :  ${(p) => p.radius ? p.radius : '0px'};
`
export const TextFloatLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: ${p => p.fontSize || ".7rem"};
  background-color: ${(p) => p.backgroundColor ? p.backgroundColor : ''};
  width: ${(p) => p.width ? p.width : `100%`};
  padding-left :  ${(p) => p.paddingLeft ? p.paddingLeft : `0px`};
  border-radius :  ${(p) => p.radius ? p.radius : `0px`};
  margin :  ${(p) => p.margin ? p.margin : `0px`};
  font-weight :  ${(p) => p.fontWeight ? p.fontWeight : `normal`};
  word-break: break-word;
  overflow: hidden;
  max-height: 30rem;
  color : ${(p) => p.color ? p.color : `#000`};
  a {
    color : #000 !important;
  }
  .time-stamp {
    color : #000;
  }
  b {
    color : ${(p) => p.colorMentions ? p.colorMentions : `#000`};;
  }
`
export const TextFloatRight = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${p => p.fontSize || ".7rem"};
  background-color: ${(p) => p.backgroundColor ? p.backgroundColor : ''};
  width: ${(p) => p.width ? p.width : ``};
  border-radius :  ${(p) => p.radius ? p.radius : `0px`};
  padding-right :  ${(p) => p.paddingRight ? p.paddingRight : `0px`};
  margin :  ${(p) => p.margin ? p.margin : `0px`};
  font-weight :  ${(p) => p.fontWeight ? p.fontWeight : `normal`};
  word-break: break-word;
  overflow: hidden;
  max-height: 30rem;
  color : ${(p) => p.color ? p.color : `#fff`};
  a {
    color : #fff;
  }
  b{
    font-weight : bold;
    color : ${(p) => p.colorMentions ? p.colorMentions : `#000`};
  }
`
/** chat-row end */
export const ButtonCloseMessageStyled = styled.div`
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 2px 4px 4px 4px;
  border-radius: 0.3rem;
  &:hover {
    background-color: #ea5455;
  }
`
// input emoji styled
export const InputEmojiStyled = styled(InputEmoji)``
export const LinkStyled = styled.div`
  a{
    color : ${(p) => p.color || ""} ;
  }
`
//video modal styled 
export const VideoPlayerStyled = styled(ReactPlayer)`
  video{
    border-radius : ${(p) => p.radius ? p.radius : "0px"}
  }
`
//mentions hightlight content
export const MentionContentHightLight = styled.p`
  text-decoration: underline;
  color : ${(p) => p.color ? p.color : "#06FF00"};
` 