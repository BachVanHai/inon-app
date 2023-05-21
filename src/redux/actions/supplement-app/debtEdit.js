import DebtService from '../../../services/debt'
import BonusService from '../../../services/bonus'
import { ACTION_LOAD_ALL_ACCOUNTS } from './debtCreate'
import { BaseAppConfigs } from 'base-app'

export const ACTION_LOAD_LIST_ACCOUNTS_PENDING = 'ACTION_LOAD_LIST_ACCOUNTS_PENDING'

export const loadListSuggestion = () => {
    return async (dispatch) => {
        const res = await BonusService.getAccountSuggestions()
        if (res.status === 200) {
            let data = res.data || []
            const modifiedData = data.filter(item => item.userType === BaseAppConfigs.USER_TYPE.KD).map((item) => ({
                value: item.id,
                id: item.id,
                fullName: item.fullName,
                userCode: item.userCode,
                label: `${item.userCode}-${item.fullName}`
            }))
            dispatch({
                type: ACTION_LOAD_ALL_ACCOUNTS,
                payload: {
                    modifiedData,
                    data
                } || {}
            })
        }
    }
}

export const loadListAccountsPending = () => {
    return async (dispatch) => {
        const res = await DebtService.getListAccountsPending()
        if (res.status === 200) {
            let data = res.data || []
            dispatch({
                type: ACTION_LOAD_LIST_ACCOUNTS_PENDING,
                payload: {
                    data
                } || {}
            })
        }
    }
}