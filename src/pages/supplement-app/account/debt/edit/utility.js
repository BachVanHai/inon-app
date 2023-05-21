export const APPROVED = "APPROVED"
export const REJECT = "REJECT"
export const PENDING = "PENDING"
export const DAY_30TH = "DAY_30TH"
export const FIFTH_DAY = "FIFTH_DAY"
export const NOT_ACCEPT = "NOT_ACCEPT"
export const CHANGE_LIMIT = "CHANGE_LIMIT"

export const DAYS_AMOUNT_MAX = 35
export const DAYS_AMOUNT_MIN = 1
export const DAY_MAX = 5
export const DAY_MIN = 1

export const convertNumberToVndStr = (num) => {
    if (typeof num === "number") {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return 0
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

// strDate example: "2021-05-13T17:00:00Z"
export const convertStrToDate = (strDate) => {
    return new Date(strDate)
}

export const addDays = (strDate) => {
    let startDate = convertStrToDate(strDate)
    // let day = 31 * 60 * 60 * 24 * 1000
    let day = 0
    return new Date(startDate.getTime() + day).toISOString()
}

export const addDay = (strDate) => {
    let startDate = convertStrToDate(strDate)
    // let day = 60 * 60 * 24 * 1000
    let day = 0
    return new Date(startDate.getTime() + day).toISOString()
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
    // console.log(`hasValuesEqual`, currentValues, initialValues)
    const { day, daysAmount,
        transactionLimit, monthlyLimit,
        dailyLimit, dueDateType } = initialValues

    const { day: c_day, daysAmount: c_daysAmount,
        transactionLimit: c_transactionLimit, monthlyLimit: c_monthlyLimit,
        dailyLimit: c_dailyLimit, dueDateType: c_dueDateType } = currentValues

    const initialArr = [day, daysAmount, transactionLimit, monthlyLimit, dailyLimit, dueDateType.label]
    const currentArr = [c_day, c_daysAmount, c_transactionLimit, c_monthlyLimit, c_dailyLimit, c_dueDateType.label]
    return isEqual(initialArr, currentArr)
}
