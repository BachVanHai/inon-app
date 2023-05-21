import React from 'react'
import * as Icon from 'react-feather'
import { Button as ReactrapButton, Input } from 'reactstrap'
const ButtonActionData = ({ title = 'Tải lên dữ liệu', type="file" ,  handleFunc, className }) => {
  return (
    <ReactrapButton tag='label' color={'primary'} className={className} outline>
      <Input
        hidden
        type='file'
        bgsize='sm'
        id='uploadxls'
        label='Document'
        name='originalFileName'
        inputprops={{ accept: '.xlxs' }}
        onChange={(e) => handleFunc(e.target.files[0])}
      />
      <div className='d-flex align-items-center justify-content-center'>
        {/* <Icon.Upload size='15' /> */}
        <span style={{ fontSize: '13px' }}>
          {title}
        </span>
      </div>
    </ReactrapButton>
  )
}

export default ButtonActionData
