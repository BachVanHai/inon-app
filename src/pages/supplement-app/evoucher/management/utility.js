import styled from 'styled-components'
import React from 'react'
import moment from 'moment'

export const DISABLED = 'DISABLED'
export const PERCENT = 'PERCENT'
export const PREPAY = 'PREPAY'
export const VND = 'VND'
export const SAME_PRICE = "SAME_PRICE"

export const REJECTED = 'REJECTED'
export const AWAITING_APPROVAL = 'AWAITING_APPROVAL'
export const ACTIVE = 'ACTIVE'
export const AWAITING_ACTIVE = "AWAITING_ACTIVE"
export const USER_ROLE = {
  ADMIN: 'AD.IO',
  HTKD: 'HT.IO',
}
export const voucherTypeFilter = [
  {
    type: PERCENT,
    name: 'Chiết khấu phần trăm'
  },
  {
    type: VND,
    name:'Chiết khấu giá trị'
  },
  {
    type: SAME_PRICE,
    name:'Đồng giá sản phẩm'
  },
  {
    type: PREPAY,
    name: 'Miễn phí/đối tác trả trước'
  }
]
export const statusTypeFilter = [
  {
    type: AWAITING_APPROVAL,
    name: 'Chờ phê duyệt'
  },
  {
    type: REJECTED,
    name: 'Bị từ chối'
  },
  {
    type: AWAITING_ACTIVE,
    name: 'Đã phê duyệt'
  },
  {
    type: ACTIVE,
    name:'Đang hiệu lực'
  },

  {
    type: DISABLED,
    name: 'Đã kết thúc'
  },
]
// create element by styled
export const TextWrap = styled.div`
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
`
export const TdStyled = styled.td`
  background-color: #c3c3c3;
  color: white;
`
export const convertDate = (date) =>{
  return moment(date).format('YYYY-MM-DD')
}
export const convertISOStringToDateTime = (date) =>{
  const newDate = new Date(date)
  return moment(newDate).utc(false).format("YYYY-MM-DD H:mm")
}
export const convertUpdatedDateISOToDate = (date) =>{
  const dateInitial = moment(date).utc(false).format('YYYY-MM-DD H:mm')
  return moment(dateInitial).add('hours' , 7).format('YYYY-MM-DD H:mm')
}

