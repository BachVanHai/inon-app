import {
    ACTION_LOAD_LIST_ALL_DEBT_ACCOUNT,
    ACTION_LOAD_MY_DEBT_ACCOUNT
} from '../../actions/supplement-app/debtManagement'


const initialState = {
    suggestions: [],
    listAllDebtAccount: [],
    myDebtAccount: []
}

const debtManagement = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LOAD_LIST_ALL_DEBT_ACCOUNT:
            return {
                ...state,
                suggestions: action.payload.modified_data,
                listAllDebtAccount: action.payload.data
            }
        case ACTION_LOAD_MY_DEBT_ACCOUNT:
            let myDebtAccountArr = action.payload.data
            if (!Array.isArray(myDebtAccountArr)) {
                myDebtAccountArr = [action.payload.data]
            }
            return {
                ...state,
                myDebtAccount: myDebtAccountArr
            }
        default:
            return state
    }
}

export default debtManagement