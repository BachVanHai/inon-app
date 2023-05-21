import BonusService from '../../../services/supplement-app/bonus'
// import DebtService from '../../services/debt'
import { BaseAppConfigs } from 'base-app'

export const ACTION_LOAD_ALL_ACCOUNTS = 'ACTION_LOAD_ALL_ACCOUNTS'

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
                address: item.userDetails ? item.userDetails.address : '',
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