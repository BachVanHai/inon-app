import moment from 'moment'
export const ADMIN = 'ADMIN'
export const VH = 'VH'
export const AD = "AD.IO"
export const VANHANH = "VH.IO"
export const PRODUCT = 'PRODUCT'
export const PAYMENT = 'PAYMENT'
export const TECHNOLOGY = 'TECHNOLOGY'
export const ASSURANCE_COMPENSATION = 'ASSURANCE_COMPENSATION'
export const CUSTOMER_SERVICE = 'CUSTOMER_SERVICE'
export const FEEDBACK = 'FEEDBACK'
export const OTHER = 'OTHER'
export const TODO = 'TODO'
export const DOING = 'DOING'
export const DONE = 'DONE'
export const MEDIUM = 'MEDIUM'
export const HIGH = 'HIGH'
export const DROP = "DROP"
export const MAJOR = "MAJOR"
export const AD_OP = "AD_OP"
export const OPERATE = "OPERATE"
export const ACCOUNTANT = "ACCOUNTANT"

export const WEBSITE = "WEBSITE"
export const EMAIL = "EMAIL"  
export const HOTLINE = "HOTLINE"
export const SOCIAL = "SOCIAL"

export const KEY_SPLIT_USER_AVATAR = "___"
export const GROUP_ID_CODE = "IO"
export const LIST_STATUS_FILTER = [
  { name: 'Đang xử lý', type: DOING },
  { name: 'Chờ xử lý', type: TODO },
  { name: 'Hoàn tất', type: DONE }
]
export const LIST_TYPE_FILTER = [
  { name: 'Sản phẩm', type: PRODUCT , type_filter : "VH" },
  { name: 'Thanh toán', type: PAYMENT , type_filter : "KT" },
  { name: 'Kĩ thuật', type: TECHNOLOGY , type_filter : "IT" },
  { name: 'Bồi thường bảo hiểm', type: ASSURANCE_COMPENSATION , type_filter : "VH" },
  { name: 'Dịch vụ khách hàng', type: CUSTOMER_SERVICE , type_filter : "VH" },
  { name: 'Phản hồi - góp ý', type: FEEDBACK , type_filter : "VH" },
  { name: 'Khác', type: OTHER , type_filter : "VH" }
]

export const LIST_TYPE_REQUEST = [
  { label: 'Sản phẩm', value: PRODUCT , type_filter : "VH" },
  { label: 'Thanh toán', value: PAYMENT , type_filter : "KT" },
  { label: 'Kĩ thuật', value: TECHNOLOGY, type_filter : "IT" },
  { label: 'Bồi thường bảo hiểm', value: ASSURANCE_COMPENSATION,type_filter : "VH" },
  { label: 'Dịch vụ khách hàng', value: CUSTOMER_SERVICE ,type_filter : "VH" },
  { label: 'Phản hồi - góp ý', value: FEEDBACK ,type_filter : "VH" },
  { label: 'Khác', value: OTHER ,type_filter : "VH" }
]
export const LIST_PERMISSION_FILTER = [
  {
    name: 'Điều phối',
    type: 'AD_OP'
  },
  {
    name: 'Xử lý',
    type: 'MAJOR'
  },
]
export const LIST_DEPARTMENT_FILTER = [
  {
    name: 'Vận hành',
    type: 'OPERATE',
    type_filter : "VH"
  },
  {
    name: 'Kế toán',
    type: 'ACCOUNTANT',
    type_filter : "KT"
  },
  {
    name: 'Kĩ thuật',
    type: 'TECHNOLOGY',
    type_filter : "IT"

  }
]
export const convertDateISOstring = (date) => {
  return moment(date).utc(true).format('YYYY-MM-DD H:mm')
}
export const LIST_DEPARTMENT = [
  {
    label: 'Vận hành',
    value: 'OPERATE',
    type_filter : "VH"
  },
  {
    label: 'Kế toán',
    value: 'ACCOUNTANT',
    type_filter : "KT"
  },
  {
    label: 'Kĩ thuật',
    value: 'TECHNOLOGY',
    type_filter : "IT"
  }
]
export const LIST_CHANNEL = [
  {
    label: 'Website',
    value: 'WEBSITE'
  },
  {
    label: 'Email',
    value: 'EMAIL'
  },
  {
    label: 'Hotline',
    value: 'HOTLINE'
  },
  {
    label: 'Social',
    value: 'SOCIAL'
  },
  {
    label: 'Khác',
    value: 'OTHER'
  }
]

export const  removeAccents = (rawStr) => {
  let _str = `${rawStr}`
  var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"
  ]
  for (let i = 0; i < AccentsMap.length; i++) {
      let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
      let char = AccentsMap[i][0]
      _str = _str.replace(re, char)
  }
  return _str
}

export let selectErrorStyles = {
  control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
  }),
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}

export let selectNormalStyles = {
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#5f5f5f",
          fontSize: "0.96rem",
          opacity: "0.5"
      };
  }
}

export const OPERATE_DEPARMENT = [
  { label: 'Sản phẩm', value: PRODUCT , type_filter : "VH" }, 
  { label: 'Bồi thường bảo hiểm', value: ASSURANCE_COMPENSATION,type_filter : "VH" },
  { label: 'Dịch vụ khách hàng', value: CUSTOMER_SERVICE ,type_filter : "VH" },
  { label: 'Phản hồi - góp ý', value: FEEDBACK ,type_filter : "VH" },
  { label: 'Khác', value: OTHER ,type_filter : "VH" }
]
export const TECHNOLOGY_DEPARMENT = [
  { label: 'Kĩ thuật', value: TECHNOLOGY, type_filter : "IT" }
]
export const ACCOUNTANT_DEPARTMENT = [
  { label: 'Thanh toán', value: PAYMENT , type_filter : "KT" }
]