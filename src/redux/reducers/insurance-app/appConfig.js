import { NAME_APP_CONFIG } from '../../../configs/insurance-app'
import {
    ACTION_APP_CONFIG_UPDATE_PROPS, ACTION_APP_CONFIG_RESET_STATE, ACTION_APP_CONFIG_RESET_PROP
} from '../../actions/insurance-app/appConfig'

export const REDUX_STATE_NAME = NAME_APP_CONFIG

export const KEY_IS_LOADING = "isLoading"
export const KEY_CURRENT_INSURANCE_TYPE = "currentInsuranceType"
export const KEY_DEBT_ACCOUNT_INFO = "debtAccountInfo"
export const KEY_USERS_DTO = "usersDTO"
export const KEY_PARTNERS = "partners"

const initialState = {
    [KEY_IS_LOADING]: false,
    [KEY_CURRENT_INSURANCE_TYPE]: "",
    [KEY_DEBT_ACCOUNT_INFO]: {},
    [KEY_USERS_DTO]: {},
    [KEY_PARTNERS]: [],
}

const appConfig = (state = initialState, action) => {
    let _draftState = { ...state }
    const { payload, type } = action

    switch (type) {
        case ACTION_APP_CONFIG_UPDATE_PROPS:
            for (let item of payload) {
                const { prop, value } = item
                _draftState[prop] = value
            }
            return _draftState

        case ACTION_APP_CONFIG_RESET_PROP:
            _draftState[payload] = initialState[payload]
            return _draftState

        case ACTION_APP_CONFIG_RESET_STATE:
            return initialState

        default:
            return state
    }
}

export default appConfig
