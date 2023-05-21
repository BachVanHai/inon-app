import {
    ACTION_LOAD_LIST_ACCOUNT,
    ACTION_CHECK_USER_EXIST,
    ACTION_LOAD_LIST_ACCOUNT_SUGGESTION,
    ACTION_LOAD_INSURANCE_LIST, ACTION_UPLOAD_EXCEL_USERS
} from '../../actions/app-no1/account'

const initialState = {
    list: [],
    totalCount: 0,
    paging: {
        pageSize: 9999,
        pageNumber: 0,
        sort: 'fullName',
        searchIds: null,
        searchGroupIds: null,
        filter: []
    },
    suggestions: [],
    insuranceList: [],
    insuranceListOrigin: [],
    importExcelUsers: []
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LOAD_LIST_ACCOUNT:
            return {
                ...state,
                ...action.payload
            }
        case ACTION_LOAD_LIST_ACCOUNT_SUGGESTION:
            return {
                ...state,
                suggestions: [...action.payload]
            }
        case ACTION_CHECK_USER_EXIST:
            const newList = [...state.list]
            newList[action.payload.index] = action.payload.user
            return {...state, list: newList}
        case ACTION_LOAD_INSURANCE_LIST:
            return {...state, ...action.payload}
        case ACTION_UPLOAD_EXCEL_USERS:
            return {...state, importExcelUsers: [...action.payload]}
        default:
            return state
    }
}

export default accountReducer
