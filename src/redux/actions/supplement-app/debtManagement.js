import DebtService from '../../../services/supplement-app/debt'
import { BaseAppConfigs } from 'base-app'

export const ACTION_LOAD_LIST_ALL_DEBT_ACCOUNT = 'ACTION_LOAD_LIST_ALL_DEBT_ACCOUNT'
export const ACTION_LOAD_MY_DEBT_ACCOUNT = 'ACTION_LOAD_MY_DEBT_ACCOUNT'

export const getListAllDebtAccount = () => {
    return async (dispatch) => {
        const res = await DebtService.getListAllDebtAccount()
        if (res.status === 200) {
            let data = res.data || []
            const modified_data = data.filter(item => item.usersDTO.userType === BaseAppConfigs.USER_TYPE.KD).map((item) => ({
                value: item.usersDTO.id,
                id: item.usersDTO.id,
                label: `${item.usersDTO.userCode}-${item.usersDTO.fullName}`
            }))
            dispatch({
                type: ACTION_LOAD_LIST_ALL_DEBT_ACCOUNT,
                payload: {
                    modified_data,
                    data
                } || {}
            })
        }
    }
}

export const getListAllPartnersDebtAccount = () => {
    return async (dispatch) => {
        const res = await DebtService.getListAllPartnersDebtAccount()
        if (res.status === 200) {
            let data = res.data || []
            const modified_data = data.filter(item => item.usersDTO.userType === BaseAppConfigs.USER_TYPE.KD).map((item) => ({
                value: item.usersDTO.id,
                id: item.usersDTO.id,
                label: `${item.usersDTO.userCode}-${item.usersDTO.fullName}`
            }))
            dispatch({
                type: ACTION_LOAD_LIST_ALL_DEBT_ACCOUNT,
                payload: {
                    modified_data,
                    data
                } || {}
            })
        }
    }
}

export const getMyDebtAccount = () => {
    return async (dispatch) => {
        const res = await DebtService.getMyDebtAccount()
        if (res.status === 200) {
            let data = res.data || []
            dispatch({
                type: ACTION_LOAD_MY_DEBT_ACCOUNT,
                payload: {
                    data
                } || {}
            })
        }
    }
}