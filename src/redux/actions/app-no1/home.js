import HomeService from '../../../services/app-no1/home'
import { BaseAppConfigs } from 'base-app'
import moment from 'moment'
import React from 'react'
import { ACCOUNT_TYPE, CHART_TYPE, DEBT_TYPE, INSURANCE_TYPE, TIME_TYPE } from '../../../configs/app-no1/index'

export const ACTION_LOAD_HOME_INFO = 'ACTION_LOAD_HOME_INFO'
export const ACTION_LOAD_HOME_REVENUE_CHART_DATA = 'ACTION_LOAD_HOME_REVENUE_CHART_DATA'
export const ACTION_LOAD_HOME_CONTRACTS_CHART_DATA = 'ACTION_LOAD_HOME_CONTRACTS_CHART_DATA'
export const ACTION_LOAD_HOME_DEBT_CHART_DATA = 'ACTION_LOAD_HOME_DEBT_CHART_DATA'
export const ACTION_LOAD_HOME_ACCOUNTS_CHART_DATA = 'ACTION_LOAD_HOME_ACCOUNTS_CHART_DATA'
export const ACTION_LOAD_HOME_BONUS_CHART_DATA = 'ACTION_LOAD_HOME_BONUS_CHART_DATA'
export const ACTION_LOAD_TOP10_BEST_DATA = "ACTION_LOAD_TOP10_BEST_DATA"
export const ACTION_LOAD_TOP10_WORST_DATA = "ACTION_LOAD_TOP10_WORST_DATA"


const homeInfoTypes = {
    CONTRACT_FINISHED: 'contractFinished',
    CONTRACT_PENDING: 'contractPending',
    CONTRACT_APPROVED: 'contractApproved',
    CONTRACT_REJECTED: 'contractRejected',
    CONTRACT_EXPIRE: 'contractExpire',
    ACCOUNT_APPROVED: 'accountApproved',
    ACCOUNT_AWAITING_APPROVAL: 'accountAwaitingApproval',
    ACCOUNT_DEBT: 'accountDebt',
    DEBT: 'debt',
    TOTAL_DEBT: 'totalDebt',
    CONTRACT_PENDING_BH: "contractPendingBH"
}

const homeChartTypes = {
    REVENUE: 'REVENUE',
    CONTRACTS: 'CONTRACTS',
    ACCOUNTS: 'ACCOUNTS',
    BONUS: 'BONUS',
    DEBT: 'DEBT'
}

const CONTRACT_STATUS = {
    FINISH: 'FINISH',
    APPROVED: 'APPROVED',
    PENDING: 'PENDING',
    REJECT: 'REJECT'
}

const getHomeInfoTypesByGroupId = (groupId) => {
    const userRole = BaseAppConfigs.USER_ROLE
    const groupIdAlt = groupId.substring(0, 1) + groupId.substring(2)
    if (groupIdAlt === "L.DT" && groupId !== 'LX.DT') {
        return [homeInfoTypes.DEBT, homeInfoTypes.ACCOUNT_AWAITING_APPROVAL, homeInfoTypes.CONTRACT_PENDING]
    }
    switch (groupId) {
        case userRole.ADMIN :
            return [
                homeInfoTypes.ACCOUNT_AWAITING_APPROVAL,
                homeInfoTypes.CONTRACT_PENDING,
                homeInfoTypes.TOTAL_DEBT
            ]
        case userRole.VH:
            return [
                homeInfoTypes.TOTAL_DEBT
            ]
        case userRole.HTKD:
            return [homeInfoTypes.ACCOUNT_DEBT, homeInfoTypes.DEBT]
        case userRole.HTDT:
            return [homeInfoTypes.DEBT, homeInfoTypes.ACCOUNT_AWAITING_APPROVAL, homeInfoTypes.CONTRACT_PENDING]
        case userRole.KT:
            return [homeInfoTypes.ACCOUNT_AWAITING_APPROVAL, homeInfoTypes.CONTRACT_PENDING, homeInfoTypes.TOTAL_DEBT]
        case userRole.BH:
            return [homeInfoTypes.CONTRACT_PENDING_BH]
        case userRole.KD:
            return [homeInfoTypes.DEBT, homeInfoTypes.ACCOUNT_AWAITING_APPROVAL, homeInfoTypes.CONTRACT_PENDING]
        case userRole.DTLX:
            return [homeInfoTypes.CONTRACT_EXPIRE]
        default :
            return []
    }
}

const getChartTypeByGroupId = (groupId) => {
    const userRole = BaseAppConfigs.USER_ROLE
    switch (groupId) {
        case userRole.ADMIN :
        case userRole.KT:
            return [
                homeChartTypes.REVENUE,
                homeChartTypes.BONUS, homeChartTypes.DEBT,
                homeChartTypes.ACCOUNTS, homeChartTypes.CONTRACTS
            ]
        case userRole.DTL1:
        case userRole.DTL2:
        case userRole.DTL3:
        case userRole.DTL4:
        case userRole.DTL5:
        case userRole.DTLX:
        case userRole.HTDT:
        case userRole.HTKD:
            return [homeChartTypes.REVENUE, homeChartTypes.BONUS, homeChartTypes.CONTRACTS, homeChartTypes.ACCOUNTS, homeChartTypes.DEBT]
        case userRole.BH:
            return [homeChartTypes.CONTRACTS]
        case userRole.VH:
            return [homeChartTypes.REVENUE, homeChartTypes.BONUS, homeChartTypes.DEBT]
        default :
            return ''
    }
}

export const loadHomeInfo = () => {
    return async (dispatch, getState) => {
        const {user} = getState().auth
        const infoTypes = getHomeInfoTypesByGroupId(user.groupId)
        const data = {}
        for (let item of infoTypes) {
            data[item] = await getHomeInfoData(item, user)
            if (typeof data[item] === 'object') {
                data[item] = 0
            }
        }
        dispatch({type: ACTION_LOAD_HOME_INFO, payload: data})
    }
}

export const loadHomeChartData = () => {
    return async (dispatch, getState) => {
        const {user} = getState().auth
        const type = getChartTypeByGroupId(user.groupId)
        const request = {
            timeType: TIME_TYPE.ALL,
            companyId: null,
            contractType: [INSURANCE_TYPE.ALL, INSURANCE_TYPE.CAR, INSURANCE_TYPE.MOTOR, INSURANCE_TYPE.HOME_SAFETY, INSURANCE_TYPE.VTA, INSURANCE_TYPE.HOME_PRIVATE],
            debtType: [DEBT_TYPE.ALL, DEBT_TYPE.UNDUE, DEBT_TYPE.OUT_DATE],
            accountType: ACCOUNT_TYPE.ALL
        }

        for (let item of type) {
            const data = await getHomeChartData(item, request)
            switch (item) {
                case homeChartTypes.REVENUE:
                    dispatch({type: ACTION_LOAD_HOME_REVENUE_CHART_DATA, payload: { data , isLoading : false}})
                    break
                case homeChartTypes.CONTRACTS:
                    dispatch({type: ACTION_LOAD_HOME_CONTRACTS_CHART_DATA, payload: {data , isLoading : false}})
                    break
                case homeChartTypes.DEBT:
                    dispatch({type: ACTION_LOAD_HOME_DEBT_CHART_DATA, payload: {data , isLoading : false}})
                    break
                case homeChartTypes.ACCOUNTS:
                    dispatch({type: ACTION_LOAD_HOME_ACCOUNTS_CHART_DATA, payload: {data , isLoading : false}})
                    break
                case homeChartTypes.BONUS:
                    dispatch({type: ACTION_LOAD_HOME_BONUS_CHART_DATA, payload: {data , isLoading : false}})
                    break
                default:
                    break
            }
        }
    }
}

export const getTop10HighestRevenue = (timeType) => {
    return async (dispatch) => {
        try {
            const res = await HomeService.getTop10HighestRevenue(timeType)
            dispatch({type: ACTION_LOAD_TOP10_BEST_DATA, payload: {data: res.data}})
        } catch (e) {
            console.log(e)
        }
    }
}

export const getTop10LowestRevenue = (timeType) => {
    return async (dispatch) => {
        try {
            const res = await HomeService.getTop10LowestRevenue(timeType)
            dispatch({type: ACTION_LOAD_TOP10_WORST_DATA, payload: {data: res.data}})
        } catch (e) {
            console.log(e)
        }
    }
}


export const loadChartDataByType = (request, type) => {
    switch (type) {
        case CHART_TYPE.REVENUE: {
            return async (dispatch) => {
                // const data = await getRevenueChart(request)
                // dispatch({
                //     type: ACTION_LOAD_HOME_REVENUE_CHART_DATA,
                //     payload: {data}
                // })

                const data = [
                    {
                      "name": 1,
                      "revenueChartData": {
                        "CC": 0,
                        "ALL": 76000.0,
                        "VTA": 0,
                        "FH": 0,
                        "MC": 76000.0,
                        "HC": 0
                      },
                      "contractChartData": {},
                      "bonusChartData": {},
                      "debtChartData": {},
                      "newAccounts": {},
                      "totalAccounts": {}
                    },
                    {
                      "name": 2,
                      "revenueChartData": {
                        "CC": 0,
                        "ALL": 76000.0,
                        "VTA": 0,
                        "FH": 0,
                        "MC": 76000.0,
                        "HC": 0
                      },
                      "contractChartData": {},
                      "bonusChartData": {},
                      "debtChartData": {},
                      "newAccounts": {},
                      "totalAccounts": {}
                    },
                    {
                      "name": 3,
                      "revenueChartData": {
                        "CC": 0,
                        "ALL": 76000.0,
                        "VTA": 0,
                        "FH": 0,
                        "MC": 76000.0,
                        "HC": 0
                      },
                      "contractChartData": {},
                      "bonusChartData": {},
                      "debtChartData": {},
                      "newAccounts": {},
                      "totalAccounts": {}
                    },
                    {
                      "name": 4,
                      "revenueChartData": {
                        "CC": 0,
                        "ALL": 76000.0,
                        "VTA": 0,
                        "FH": 0,
                        "MC": 76000.0,
                        "HC": 0
                      },
                      "contractChartData": {},
                      "bonusChartData": {},
                      "debtChartData": {},
                      "newAccounts": {},
                      "totalAccounts": {}
                    },
                    {
                      "name": 5,
                      "revenueChartData": {
                        "CC": 0,
                        "ALL": 76000.0,
                        "VTA": 0,
                        "FH": 0,
                        "MC": 76000.0,
                        "HC": 0
                      },
                      "contractChartData": {},
                      "bonusChartData": {},
                      "debtChartData": {},
                      "newAccounts": {},
                      "totalAccounts": {}
                    },
                    {
                      "name": 6,
                      "revenueChartData": {
                        "CC": 0,
                        "ALL": 76000.0,
                        "VTA": 0,
                        "FH": 0,
                        "MC": 76000.0,
                        "HC": 0
                      },
                      "contractChartData": {},
                      "bonusChartData": {},
                      "debtChartData": {},
                      "newAccounts": {},
                      "totalAccounts": {}
                    },
                    {
                      "name": 7,
                      "revenueChartData": {
                        "CC": 0,
                        "ALL": 76000.0,
                        "VTA": 0,
                        "FH": 0,
                        "MC": 76000.0,
                        "HC": 0
                      },
                      "contractChartData": {},
                      "bonusChartData": {},
                      "debtChartData": {},
                      "newAccounts": {},
                      "totalAccounts": {}
                    }
                ]
                dispatch({
                    type: ACTION_LOAD_HOME_REVENUE_CHART_DATA,
                    payload: {data}
                })
            }
        }

        case CHART_TYPE.BONUS: {
            return async (dispatch) => {
                const data = await getBonusChart(request)
                dispatch({
                    type: ACTION_LOAD_HOME_BONUS_CHART_DATA,
                    payload: {data}
                })
            }
        }

        case CHART_TYPE.DEBT: {
            return async (dispatch) => {
                const data = await getDebtChart(request)
                dispatch({
                    type: ACTION_LOAD_HOME_DEBT_CHART_DATA,
                    payload: {data}
                })
            }
        }

        case CHART_TYPE.CONTRACT: {
            return async (dispatch) => {
                const data = await getContractChart(request)
                dispatch({
                    type: ACTION_LOAD_HOME_CONTRACTS_CHART_DATA,
                    payload: {data}
                })
            }
        }

        case CHART_TYPE.ACCOUNT: {
            return async (dispatch) => {
                const data = await getAccountChart(request)
                dispatch({
                    type: ACTION_LOAD_HOME_ACCOUNTS_CHART_DATA,
                    payload: {data}
                })
            }
        }

        default:
            break
    }

}

export const convertChartData = (data, typeChart) => {
    if (data) {
        return data.map(item => {
            const insurance = {...item[typeChart]}
            const insuranceAlt = {}
            Object.keys(insurance).forEach(key => {
                if (typeChart !== 'contractChartData') insuranceAlt[key] = insurance[key] / 1000000
                else insuranceAlt[key] = insurance[key]
            })
            insuranceAlt.name = item.name;
            return insuranceAlt
        })
    } else return [];
}

export const convertAccountChartData = (data) => {
    if (data) {
        return data.map(item => {
            const totalAccounts = item.totalAccounts;
            const newAccounts = item.newAccounts
            const request = {}
            Object.keys(totalAccounts).forEach(key => {
                request['totalAccounts'] = totalAccounts[key]
            })
            Object.keys(newAccounts).forEach(key => {
                request['newAccounts'] = newAccounts[key]
            })
            request.name = item.name
            return request
        })
    } else return []
}

const getHomeInfoData = async (homeInfoType, user) => {
    switch (homeInfoType) {
        case homeInfoTypes.CONTRACT_PENDING:
            return await getCountContractAwaitingApproval()
        case homeInfoTypes.ACCOUNT_APPROVED:
            return await getCountAccountApproved()
        case homeInfoTypes.ACCOUNT_AWAITING_APPROVAL:
            return await getCountAccountAwaitingApproval()
        case homeInfoTypes.DEBT:
        case homeInfoTypes.TOTAL_DEBT:
            return await getDebtInfo()
        case homeInfoTypes.ACCOUNT_DEBT:
            return await getCountAccountDebt()
        case homeInfoTypes.CONTRACT_EXPIRE:
            return await getCountContractExpired()
        case homeInfoTypes.CONTRACT_PENDING_BH:
            return await getCountContractPendingBH()
    }
}

const getHomeChartData = async (type, request) => {
    let count;
    switch (type) {
        case homeChartTypes.REVENUE:
            count = await getRevenueChart(request)
            break
        case homeChartTypes.BONUS:
            count = await getBonusChart(request)
            break
        case homeChartTypes.DEBT:
            count = await getDebtChart(request)
            break
        case homeChartTypes.CONTRACTS:
            count = await getContractChart(request)
            break
        case homeChartTypes.ACCOUNTS:
            count = await getAccountChart(request)
            break
    }
    return count;
}

const getAccountChart = async (request) => {
    try {
        const res = await HomeService.getAccountChart(request)
        return convertAccountChartData(res.data)
    } catch (e) {
        return 0
    }
}


const getContractChart = async (request) => {
    try {
        const res = await HomeService.getContractChart(request)
        return convertChartData(res, 'contractChartData')
    } catch (e) {
        return 0
    }
}

const getCountContractAwaitingApproval = async () => {
    try {
        const res = await HomeService.getCountContractAwaitingApproval()
        return res.data ? res.data : 0
    } catch (e) {
        return 0
    }
}

const getCountContractExpired = async () => {
    try {
        const res = await HomeService.getCountContractExpired()
        return res.data ? res.data : 0
    } catch (e) {
        return 0
    }
}

const getCountContractPendingBH = async () => {
    try {
        const res = await HomeService.getCountContractPendingBH()
        return res.data.numberOfElements ? res.data.numberOfElements : 0
    } catch (e) {
        return 0
    }
}

const getCountAccountApproved = async (startDateTime = moment().format('YYYY-MM-DDT00:00:00'),
                                       endDateTime = 'now') => {
    try {
        const request = {startDateTime, endDateTime}
        const res = await HomeService.getCountAccountApproved(request)
        return res.data || 0
    } catch (e) {
        return 0
    }

}

const getCountAccountAwaitingApproval = async () => {
    try {
        const res = await HomeService.getCountAccountAwaitingApproval()
        return res.data || 0
    } catch (e) {
        return 0
    }

}

const getRevenueChart = async (request) => {
    try {
        const res = await HomeService.getRevenueChart(request)
        console.log("Checking -------------->", res);
        return convertChartData(res, 'revenueChartData')
    } catch (e) {
        return 0
    }
}

const getBonusChart = async (request) => {
    try {
        const res = await HomeService.getBonusChart(request)
        return convertChartData(res, 'bonusChartData')
    } catch (e) {
        return 0
    }
}

const getDebtChart = async (request) => {
    try {
        const res = await HomeService.getDebtChart(request)
        return convertChartData(res.data, 'debtChartData')
    } catch (e) {
        return 0
    }
}

const getDebtInfo = async () => {
    try {
        const res = await HomeService.getDebtInfo()
        return res.data || 0
    } catch (e) {
        return 0
    }
}

const getCountAccountDebt = async () => {
    try {
        const res = await HomeService.getDebitedAccount()
        return res.data || 0
    } catch (e) {
        return 0
    }
}








