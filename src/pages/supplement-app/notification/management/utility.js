
import moment, { isMoment } from 'moment'

export const APPROVED = "APPROVED"
export const REJECT = "REJECT"
export const PENDING = "PENDING"
export const DAY_30TH = "DAY_30TH"
export const FIFTH_DAY = "FIFTH_DAY"
export const NOT_ACCEPT = "NOT_ACCEPT"
export const CHANGE_LIMIT = "CHANGE_LIMIT"

export const NEW = "NEW"
export const SENT = "SENT"
export const WAITINGTOSEND ="WAITINGTOSEND"
export const REJECTED = "REJECTED"
export const DRAFT = "DRAFT"
export const TIMEOUT = "TIMEOUT"
export const OUTOFDATE = "OUTOFDATE"
export const DAYS_AMOUNT_MAX = 35
export const DAYS_AMOUNT_MIN = 1
export const DAY_MAX = 5
export const DAY_MIN = 1


export const NOTIFICATION_SYSTEM = 'NOTIFICATION_SYSTEM'
export const NOTIFICATION_USER = 'NOTIFICATION_USER'
export const NOTIFICATION_PROMOTION = 'NOTIFICATION_PROMOTION'


export const FREQUENCY_BY_DAY = "FREQUENCY_BY_DAY"
export const FREQUENCY_BY_WEEK = "FREQUENCY_BY_WEEK"
export const FREQUENCY_BY_MONTH = "FREQUENCY_BY_MONTH"

export const convertNumberToVndStr = (num) => {
    if (typeof num === "number") {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return 0
}

export const convertPickedDateToReadable = (pickedDate) => {
  return isMoment(pickedDate).utc().toISOString()
}
export const convertStrToNumber = (str) => {
    if (typeof str === "string") {
        return Number(str.replace(/,/g, match => ""))
    }
    if (typeof str === "number") {
        return str
    }
    return false
}
export const convertStrToDate = (strDate) => {
    return new Date(strDate)
}

export const hasValuesEqual = (currentValues, initialValues) => {
    const isEqual = (arr1, arr2) => {
        for (let i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) {
                return false
            }
        }
        return true
    }
    const {title,
        shortContent} = initialValues

    const {title: c_title,
       shortContent: c_shortContent,
        } = currentValues

    const initialArr = [title,
        shortContent]
    const currentArr = [c_title,c_shortContent]
    return isEqual(initialArr, currentArr)
}

export const convertISOToDate = (date)=>{
    return moment(date).utc(true).format('YYYY-MM-DD H:mm')
}
export const convertUpdatedDateISOToDate = (date) =>{
    const dateInitial = moment(date).utc(false).format('YYYY-MM-DD H:mm')
    return moment(dateInitial).add('hours' , 7).format('YYYY-MM-DD H:mm')
  }

  export const statusTypeFilter = [
    {
      type: DRAFT,
      name: 'Bản nháp'
    },
    {
      type: REJECTED,
      name:'Từ chối'
    },
    {
      type: NEW,
      name: 'Đang chờ phê duyệt'
    },
    {
      type: WAITINGTOSEND,
      name: 'Đã phê duyệt'
    },
    {
      type: SENT,
      name: 'Đang gửi'
    },
    {
        type: TIMEOUT,
        name: 'Đã gửi'
      },
      {
        type: OUTOFDATE,
        name: 'Quá hạn'
      },
  ]

  export const USER_ROLE = {
    ADMIN: 'AD.IO',
  }