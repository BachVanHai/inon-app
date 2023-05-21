export const REG_FILE_NAME = /[^.]+$/
export const checkFormatFile = (file, format) => {
  const fileNameAfterDot = REG_FILE_NAME.exec(file.name)
  //if name file === "format" => return
  if (fileNameAfterDot[0] !== format) {
    return false
  } else {
    return true
  }
}
// handle covert number to currency 4.000.000
export const convertNumberToCurrency = (number, unit) => {
  //convet number to currency
  const numberConvert = Intl.NumberFormat('en-US').format(number)
  // convert number to string and replace comma with dot
  return `${numberConvert.toString().replace(/\,/g, '.')}`
}