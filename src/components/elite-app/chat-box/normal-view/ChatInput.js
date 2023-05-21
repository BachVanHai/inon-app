import { BaseAppUltils } from 'base-app'
import React from 'react'
import * as Icon from 'react-feather'
import { Button, Input } from 'reactstrap'
import Media from 'reactstrap/lib/Media'
import styled from 'styled-components'
import '../asset/chatbox.scss'
import {
  BorderGreenBox,
  CenterHorizontalRow,
  FormStyle,
  InputEmojiStyled,
  currenAvatar
} from './utility'

export const MediaStyled = styled(Media)`
  filter: invert(23%) sepia(86%) saturate(2020%) hue-rotate(107deg)
    brightness(97%) contrast(105%);
`
const ButtonUploadFileStyled = styled.div`
  .btn-uploaddFile {
    padding: 0 !important;
    background: none !important;
    color: #008000 !important;
  }
`

const ChatInput = ({
  value,
  handleInputChange,
  isEnable,
  handleSubmit,
  placeholder,
  handleUploadMultiFile,
  openingRequestRoomInfo
}) => {
  const searchMention = () => {
    const arrUserFolower =
      openingRequestRoomInfo?.followerInOn !== null
        ? openingRequestRoomInfo?.followerInOn
        : []
    const userSuggestion = arrUserFolower.map((_elt) => {
      return (
        {
          id: _elt.id,
          name: _elt.fullName,
          image: currenAvatar
        } || []
      )
    })
    return userSuggestion
  }

  const handleUploadImage = (file) => {
    //regex get name file
    const rgCheckGetName = /[^.]+$/
    for (var i = 0; i < file.target.files.length; i++) {
      const name = file.target.files[i] || ''
      //get name file
      const fileNameAfterDot = rgCheckGetName.exec(name.name)
      //if name file === "pptx" => return
      if (fileNameAfterDot[0] === 'pptx') {
        BaseAppUltils.toastError(
          'Định dạng không được chấp nhận. Vui lòng chọn định dạng khác'
        )
        return
      } else {
        let fileArr = file.target.files[i]
        handleUploadMultiFile(fileArr)
      }
    }
  }

  return (
    <>
      {!isEnable ? (
        <div className='d-flex justify-content-center'>
          <div className='mt-2'>Đang kết nối ...</div>
        </div>
      ) : (
        <FormStyle onSubmit={handleSubmit}>
          <BorderGreenBox>
            <CenterHorizontalRow width='10%' className='ml-1'>
              <ButtonUploadFileStyled>
                <Button
                  tag='label'
                  className='btn-uploaddFile'
                  disabled={!isEnable}
                >
                  <Input
                    hidden
                    type='file'
                    size='sm'
                    id='uploadxls'
                    label='Document'
                    name='originalFileName'
                    onChange={(e) => handleUploadImage(e)}
                    multiple
                  />
                  <div>
                    <Icon.Paperclip size='25' color='#338955' />
                  </div>
                </Button>
              </ButtonUploadFileStyled>
            </CenterHorizontalRow>
            <CenterHorizontalRow width='90%'>
              <InputEmojiStyled
                borderRadius={21}
                maxLength={255}
                onChange={(text) => {
                  handleInputChange(text)
                }}
                value={''}
                cleanOnEnter
                onEnter={handleSubmit}
                placeholder={placeholder}
                searchMention={searchMention}
              />
            </CenterHorizontalRow>
          </BorderGreenBox>
        </FormStyle>
      )}
    </>
  )
}

export default ChatInput
