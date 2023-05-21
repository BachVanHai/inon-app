import moment from 'moment'
import styled from 'styled-components'

export const AWAITING_APPROVAL = 'AWAITING_APPROVAL'
export const ACTIVE = 'ACTIVE'
export const AWAITING_ACTIVE = "AWAITING_ACTIVE"
export const PERCENT = 'PERCENT'
export const REJECTED = 'REJECTED'
export const PREPAY = 'PREPAY'
export const SAME_PRICE = "SAME_PRICE"
export const VND = 'VND'
export const durationThreeMonth = 3
export const durationSixMonth = 6
export const durationTwelveMonth = 12
export const PACKAGE1 = 'GOI1'
export const PACKAGE2 = 'GOI2'
export const PACKAGE3 = 'GOI3'

export const SpanStyled = styled.span`
  font-size: 15px;
`
export const DivMarginTop = styled.div`
  margin-top: 5px;

`
export const KEY_DATE_DEAFAULT = moment().utc(true).format(`YYYY-MM-DD`)
export const KEY_DATE_TO_DEAFAULT = moment().utc(true).format(`YYYY-MM-DD`)
export const KEY_TIME_DEAFAULT = moment().utc(true).format('H:mm')
export const insurancePackageFist = {
  twelve: 250000,
  six: 190000,
  three: 130000
}
export const insurancePackageSecond = {
  twelve: 450000,
  six: 340000,
  three: 230000
}
export const insurancePackageThird = {
  twelve: 750000,
  six: 560000,
  three: 380000
}
export const convertStringToNumber = (string) =>{
  return Number(string.replace(/,/g, ''))
}

export const USER_ROLE = {
  ADMIN: 'AD.IO',
  HTKD: 'HT.IO',
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
export const ConvertTime = (date) =>{
  return moment(date).format('HH:mm')
} 
export const ConvertToDate = (date) =>{
  return moment(date).format("YYYY-MM-DD")
}
export const GetTime = (time) =>{
  return moment(time).utc(false).format('H:mm')
}
