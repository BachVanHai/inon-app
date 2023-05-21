import moment from 'moment'
import styled from 'styled-components'
const TODAY = moment().utc().format(`YYYY-MM-DD hh:mm:ss`)
export const NOTIFICATION_SYSTEM = 'NOTIFICATION_SYSTEM'
export const NOTIFICATION_USER = 'NOTIFICATION_USER'
export const NOTIFICATION_PROMOTION = 'NOTIFICATION_PROMOTION'
export const WEEK = "WEEK"
export const MONTH = "MONTH"
export const DATE = "DATE"
export const YEAR = "YEAR"

export const KEY_DATE_FROM_DEFAULT = moment().format('YYYY-MM-DD')
export const KEY_DATE_TO_DEFAULT = moment(TODAY).toDate()
export const KEY_TIME_FROM_DEFAULT = moment().format('H:mm')
export const KEY_TIME_TO_DEFAULT = moment().add('minutes',5).format('H:mm')
export const convertPickedDateToReadable = (pickedDate) => {
  return moment(pickedDate).utc().toISOString()
}


export const DivBorderRight = styled.div`
width : 50%;
  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right : none;
  }
`
//create div have input border left 0
export const DivBorderLeft = styled.div`
width : 50%;
  input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left : none;
  }
`
export const disabledDiv = {
  pointerEvents: "none",
  opacity: 0.7,
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

