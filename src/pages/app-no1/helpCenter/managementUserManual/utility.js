import styled from "styled-components";

export const TdStyled = styled.td`
  background-color: #c3c3c3;
  color: white;
`
export const DRAFT = 'DRAFT'
export const REJECTED = 'REJECTED'
export const APPROVALED = 'APPROVALED'
export const WAITTING_APPROVAL = 'WAITTING_APPROVAL'
export const DISABLED = 'DISABLED'
export const statusTypeFilter = [
  {
    type: WAITTING_APPROVAL,
    name: 'Chờ phê duyệt'
  },
  {
    type: APPROVALED,
    name: 'Đã phát hành'
  },
  {
    type: DISABLED,
    name: 'Ẩn'
  },
  {
    type: REJECTED,
    name: 'Bị từ chối'
  },
  {
    type: DRAFT,
    name: 'Bản nháp'
  }
]