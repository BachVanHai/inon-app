import moment from 'moment'

export const DAY_30TH = "DAY_30TH"
export const FIFTH_DAY = "FIFTH_DAY"

export const convertStrToNumber = (str) => {
    if (typeof str === "string") {
        return Number(str.replace(/,/g, match => ""))
    }
    if (typeof str === "number") {
        return str
    }
    return false
}

export const convertPickedDateToReadable = (pickedDate) => {
    return moment(pickedDate).utc().toISOString()
}