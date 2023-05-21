import {
    ACTION_LOAD_LIST_ACCOUNTS_PENDING
} from '../../actions/supplement-app/debtApproval'


const initialState = {
    pendingAccounts: []
}

const debtCreate = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LOAD_LIST_ACCOUNTS_PENDING:
            return {
                ...state,
                pendingAccounts: action.payload.data
            }
        default:
            return state
    }
}

export default debtCreate