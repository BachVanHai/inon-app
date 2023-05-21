import moment from 'moment'
import styled from 'styled-components'

export const AWAITING_APPROVAL = 'AWAITING_APPROVAL'
export const ACTIVE = 'ACTIVE'
export const PERCENT = 'PERCENT'
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
export const KEY_TIME_TO_DEAFAULT = moment().utc(true).add('minute',1).format('H:mm')
export const convertStringToNumber = (string) =>{
  return Number(string.replace(/,/g, ''))
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



export let selectStyled = {
  placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: "#D4D5D6",
          fontSize: "0.85rem",
          opacity: "1"
      };
  }
}

export const USER_ROLE = {
  ADMIN: 'AD.IO',
  HTKD: 'HT.IO',
}
