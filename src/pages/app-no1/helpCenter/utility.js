import moment from 'moment';
export const USER_ROLE = {
    ADMIN: 'AD.IO',
    VH: 'VH.IO',
  }
export const CHTG = 'CHTG'
export const HDSD = 'HDSD'
export const TLNV = 'TLNV'
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
export const handleConvertTOISOstring = (date) =>{
  return moment(date).utc(true).format('YYYY-MM-DD H:mm')
}
export let selectStyled = {
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#D4D5D6",
          fontSize: "0.85rem",
          opacity: ".5"
      };
  }
}