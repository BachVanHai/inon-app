import moment from 'moment'
export const RANGE_DEDUCTIBLE = "3.000.000 VNĐ/vụ"
export const OWNER = 'OWNER'
export const OTHER ='OTHER'
export const CMT = 'CMT'
export const CCCD = 'CCCD'
export const HOCHIEU = 'HOCHIEU'
export const APARTMENT = "APARTMENT"
export const TOWNHOUSE = 'TOWNHOUSE'
export const convertTime = (time) =>{
    return moment(time).format('DD-MM-YYYY')
}