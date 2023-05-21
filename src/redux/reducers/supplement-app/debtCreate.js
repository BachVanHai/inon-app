import {
    ACTION_LOAD_ALL_ACCOUNTS
} from '../../actions/supplement-app/debtCreate'


const initialState = {
    availableUsersSuggestions: [],
    availableUsers: []
}

const debtCreate = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LOAD_ALL_ACCOUNTS:
            return {
                ...state,
                availableUsersSuggestions: action.payload.modifiedData,
                availableUsers: action.payload.data
            }
        default:
            return state
    }
}

export default debtCreate