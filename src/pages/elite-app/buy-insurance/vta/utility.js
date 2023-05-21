import moment from 'moment'
import styled from 'styled-components'
export const BT = 'BT'
export const BM = 'BM'
export const VC = 'VC'
export const CON = 'CON'
export const ACE = 'ACE'
export const DN = 'DN'
export const convertNumberToCurrency = (number, unit) => {
  //convet number to currency
  const numberConvert = Intl.NumberFormat('en-US').format(number)
  // convert number to string and replace comma with dot
  return `${numberConvert.toString().replace(/\,/g, '.')} ${unit}`
}
export const currentDateFourteenYear = moment()
  .subtract(14, 'years')
  .format('YYYY-MM-DD')
  .toString()
export const TextStyled = styled.span`
  max-width: ${(p) => p.maxWidth || "80%"};
  word-break: break-word;
`
