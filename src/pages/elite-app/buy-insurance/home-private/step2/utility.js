import moment from 'moment'
export const DATE_FORMAT = "YYYY-MM-DD"
export const DATE_FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss'
export const KEY_TIME_DEAFAULT = moment().format('H:mm')
export const DEDUCTIBLE_DEFAULT = "3,000,000 VND/vụ"

export const convertNumber = (num) =>{
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
export const styleIconInfo = {
  color: "#338955"
}
export const styleTitle = {
  fontSize:"1.1rem" ,
  color: "#338955"
}
export const styleLabel = {
  color: 'rgba(34, 41, 47, 0.4)',
  fontSize: '0.85rem'
}
export const convertDate = (date) =>{
  return  moment(date).format(DATE_FORMAT)
}
export const convertStringToNumber = (string) =>{
  return Number(string.replace(/,/g, ''))
}
export const convertDateToISO = (date) =>{
  return  moment(date).utc("HH:mm:ss").toISOString()
}
