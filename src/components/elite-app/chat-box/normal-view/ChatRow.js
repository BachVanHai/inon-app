import { useDeviceDetect } from 'base-app'
import moment from 'moment'
import React from 'react'
import Lightbox from 'react-modal-image'
import Avatar from './Avatar'
import marked from 'marked';
import {
  CenterHorizontalRow,
  CenterHorizontalRowImageLeft,
  CenterHorizontalRowImageRight,
  ChatArea,
  ColorBox,
  fontSizeLagre,
  fontSizeLagrer,
  fontSizeMedium,
  fontSizeSmall,
  LinkStyled,
  TextFloatLeft,
  TextFloatRight,
  VideoPlayerStyled
} from './utility'

const ChatRow = ({
  id,
  userName,
  avatarUrl,
  backgroundColor,
  isHideUserName,
  isHideAvatar,
  timeStamp,
  content,
  type,
  positionStatus,
  className
}) => {
  const { isMobile } = useDeviceDetect()
  const userNameFontSize = isMobile ? fontSizeMedium : fontSizeSmall
  const subFontSize = isMobile ? fontSizeLagre : fontSizeMedium
  const mainFontSize = isMobile ? fontSizeLagrer : fontSizeLagre

  let _htmlTagContent
  let _htmtTagContentMention
  const link = content.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/)
  const isImage = link !== null ? /(https?:\/\/.*\.(?:png|jpg)|jpeg)/.test(link[2]) : ''

  // check is video
  const isVideo = link !== null ? /(https?:\/\/.*\.(?:mp4|ogv|webm))/.test(link[2]) : ''
  //check hightlight mentions by vietnames unicode
  const isMention = /@\[[0-9\u00E0\u00E1\u00E2\u00E3\u00E8\u00E9\u00EA\u00EC\u00ED\u00F2\u00F3\u00F4\u00F5\u00F9\u00FA\u00FD\u00E5\u0111\u0123\u0169\u01A1\u01B0\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9abcdefghiklmnopqrstuvxy0123456789_\s]*\]*/gi
  //find userId in mention => remove
  const isUserId = /userId:[0-9a-z]*|[(]|[)]|[@[]|\]/g
  const isMentionHightLight = isMention.test(content)

  let higthLight = ''
  // if content has mention user  => hightlight the text
  if (isMentionHightLight) {
    higthLight = content.replace(
      isMention,
      (match) => `<b>${match}</b>`
    )
    higthLight = higthLight.replace(isUserId, '')
    _htmtTagContentMention = (
      <p dangerouslySetInnerHTML={{ __html: marked(higthLight)}}></p>
    )
  }

  /* check if chat-log content is a or p html_tag */
  const _is_a_tag = content.match(/<\s*a[^>]*>(.*?)<\/a>/g)
  if (_is_a_tag) {
    _htmlTagContent = (
      <div
        dangerouslySetInnerHTML={{
          __html: `${_is_a_tag[0].replace(/href/g, `target="_blank" href`)}`
        }}
      ></div>
    )
  }
  const _is_p_tag = content.match(
    /<p(\s*\w+=("[^"]*"|'[^']'|[^ >]))*>(.*)<\/p>/g
  )
  if (_is_p_tag) {
    _htmlTagContent = <div dangerouslySetInnerHTML={{ __html: marked(content) }}  style={{marginBottom : "-5px"}}></div>
  }

  // if today === update => show time , else show date and time in notification message
  const dateSlice = content.slice(0, 10)
  const TODAY = moment().format('DD-MM-YYYY')
  const getTime = content.slice(11, 16)
  const _isTodayUpdate = dateSlice === TODAY
  const contentConvert = content.substring(16, content.length)

  const _convertedTimeStamp = moment(timeStamp).utc(true).format('HH:mm')
  let _positionStatus = positionStatus
  if (type && type === 'notify-log') {
    _positionStatus = 'middle'
  }

  switch (_positionStatus) {
    case 'middle':
      return (
        <CenterHorizontalRow
          id={id}
          fontSize={subFontSize}
          justifyContent='center'
          width={'100%'}
          className={className + ' text-center'}
          marginBottom={'10px'}
        >
          {_isTodayUpdate ? `${getTime} ${contentConvert}` : content}
        </CenterHorizontalRow>
      )
    case 'right':
      return (
        <>
          {isImage ? (
            <CenterHorizontalRowImageRight
              id={id}
              backgroundColor={backgroundColor}
              justifyContent='flex-end'
              width={'100%'}
              className={className}
              color={'#fff'}
            >
              <div>
                <Lightbox
                  small={link[2]}
                  large={link[2]}
                  hideDownload={true}
                  hideZoom={true}
                />
                <TextFloatRight
                  backgroundColor={backgroundColor || 'lightgreen'}
                  radius={'0px 0px 10px 10px'}
                  paddingRight={'10px'}
                  margin={'0px 0px 10px 0px'}
                  fontSize={subFontSize}
                >
                  {_convertedTimeStamp || ''}
                </TextFloatRight>
              </div>
            </CenterHorizontalRowImageRight>
          ) : isVideo ? (
            <CenterHorizontalRowImageRight
              backgroundColor={backgroundColor}
              id={id}
              justifyContent='flex-end'
              width={'100%'}
              className={className}
              color={'#fff'}
            >
              <div>
                <VideoPlayerStyled
                  radius={'10px 0px 0px 0px'}
                  url={link[2]}
                  className='react-player d-flex justify-content-end'
                  width='100%'
                  height={150}
                  controls={true}
                  muted={false}
                />
                <TextFloatRight
                  backgroundColor={backgroundColor || 'lightgreen'}
                  radius={'0px 0px 10px 10px'}
                  paddingRight={'10px'}
                  margin={'0px 0px 10px 0px'}
                  fontSize={subFontSize}
                >
                  {_convertedTimeStamp || ''}
                </TextFloatRight>
              </div>
            </CenterHorizontalRowImageRight>
          ) : isMentionHightLight ? (
            <CenterHorizontalRow
              id={id}
              justifyContent='flex-end'
              width={'100%'}
              className={className}
              color={'#fff'}
            >
              <ChatArea>
                <ColorBox
                  backgroundColor={backgroundColor || 'lightgreen'}
                  radius={'10px 0px 10px 10px'}
                >
                  <TextFloatRight fontSize={mainFontSize} colorMentions={"#FFE162"}>{_htmtTagContentMention}</TextFloatRight>
                  <TextFloatRight fontSize={subFontSize}>{_convertedTimeStamp || ''}</TextFloatRight>
                </ColorBox>
              </ChatArea>
            </CenterHorizontalRow>
          ) : (
            <CenterHorizontalRow
              id={id}
              justifyContent='flex-end'
              width={'100%'}
              className={className}
              color={'#fff'}
            >
              <ChatArea>
                <ColorBox
                  backgroundColor={backgroundColor || 'lightgreen'}
                  radius={'10px 0px 10px 10px'}
                >
                  <TextFloatRight fontSize={mainFontSize}>
                    {_is_a_tag || _is_p_tag ? _htmlTagContent : content}
                  </TextFloatRight>

                  <TextFloatRight fontSize={subFontSize}>{_convertedTimeStamp || ''}</TextFloatRight>
                </ColorBox>
              </ChatArea>
            </CenterHorizontalRow>
          )}
        </>
      )
    case 'left':
      return (
        <>
          {isImage ? (
            <div className='d-flex' id={id}>
              <div className='d-flex'>
                <Avatar isHide={isHideAvatar} avatarUrl={avatarUrl} />
              </div>
              <CenterHorizontalRowImageLeft
                id={id}
                backgroundColor={backgroundColor}
                justifyContent='flex-start'
                width={'100%'}
                className={className}
              >
                <div>
                  {isHideUserName ? null : (
                    <TextFloatLeft fontWeight={'bold'} fontSize={userNameFontSize}>
                      {userName}
                    </TextFloatLeft>
                  )}
                  <Lightbox
                    small={link[2]}
                    large={link[2]}
                    hideDownload={true}
                    hideZoom={true}
                  />
                  <TextFloatLeft
                    backgroundColor={backgroundColor || 'lightgreen'}
                    radius={'0px 0px 10px 10px'}
                    paddingRight={'10px'}
                    margin={'0px 0px 10px 0px'}
                    color={'#000 !important'}
                    fontSize={subFontSize}
                  >
                    {_convertedTimeStamp || ''}
                  </TextFloatLeft>
                </div>
              </CenterHorizontalRowImageLeft>
            </div>
          ) : isVideo ? (
            <div className='d-flex' id={id}>
              <div className='d-flex'>
                <Avatar isHide={isHideAvatar} avatarUrl={avatarUrl} />
              </div>
              <CenterHorizontalRowImageLeft
                id={id}
                backgroundColor={backgroundColor}
                justifyContent='flex-start'
                width={'100%'}
                className={className}
              >
                <div>
                  {isHideUserName ? null : (
                    <TextFloatLeft fontWeight={'bold'} fontSize={userNameFontSize}>
                      {userName}
                    </TextFloatLeft>
                  )}
                  <VideoPlayerStyled
                    radius={'0px 10px 0px 0px'}
                    url={link[2]}
                    className='react-player'
                    width='100%'
                    height={150}
                    controls={true}
                    muted={false}
                    style={{
                      borderRadius: '10px 10px 10px 10px'
                    }}
                  />
                  <TextFloatLeft
                    backgroundColor={backgroundColor || 'lightgreen'}
                    radius={'0px 0px 10px 10px'}
                    paddingRight={'10px'}
                    margin={'0px 0px 10px 0px'}
                    color={'#000'}
                    fontSize={subFontSize}
                  >
                    {_convertedTimeStamp || ''}
                  </TextFloatLeft>
                </div>
              </CenterHorizontalRowImageLeft>
            </div>
          ) : isMentionHightLight ? (
            <CenterHorizontalRow
              id={id}
              justifyContent='flex-start'
              width={'100%'}
              className={className}
            >
              <Avatar isHide={isHideAvatar} avatarUrl={avatarUrl} />

              <ChatArea>
                {isHideUserName ? null : (
                  <TextFloatLeft fontWeight={'bold'} fontSize={userNameFontSize}>{userName}</TextFloatLeft>
                )}
                <ColorBox
                  backgroundColor={backgroundColor || 'lightgreen'}
                  radius={'0px 10px 10px 10px'}
                >
                  <TextFloatLeft fontSize={mainFontSize} colorMentions={"#106d5a"}>{_htmtTagContentMention}</TextFloatLeft>
                  <TextFloatRight fontSize={subFontSize} color={"#000"}>{_convertedTimeStamp || ''}</TextFloatRight>
                </ColorBox>
              </ChatArea>
            </CenterHorizontalRow>
          ) : (
            <CenterHorizontalRow
              id={id}
              justifyContent='flex-start'
              width={'100%'}
              className={className}
            >
              <Avatar isHide={isHideAvatar} avatarUrl={avatarUrl} />

              <ChatArea>
                {isHideUserName ? null : (
                  <TextFloatLeft fontWeight={'bold'} fontSize={userNameFontSize}>{userName}</TextFloatLeft>
                )}
                <ColorBox
                  backgroundColor={backgroundColor || 'lightgreen'}
                  radius={'0px 10px 10px 10px'}
                >
                  <TextFloatLeft fontSize={mainFontSize}>
                    {_is_a_tag || _is_p_tag ? (<LinkStyled color='#fff'>{_htmlTagContent}</LinkStyled>) : (content)}
                  </TextFloatLeft>
                  <TextFloatLeft fontSize={subFontSize} color={"#000"}>{_convertedTimeStamp || ''}</TextFloatLeft>
                </ColorBox>
              </ChatArea>
            </CenterHorizontalRow>
          )}
        </>
      )
    default:
      return (
        <CenterHorizontalRow
          id={id}
          justifyContent='flex-start'
          width={'100%'}
          className={className}
        >
          default-text
        </CenterHorizontalRow>
      )
  }
}

export default ChatRow
