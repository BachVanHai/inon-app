import {
  ACTION_LOAD_ACCOUNT_IN_GROUP,
  ACTION_LOAD_ROLES,
  ACTION_LOAD_USER_GROUPS
} from '../../actions/app-no1/userGroup'

const initialState = {
  roles: [],
  userGroups: [],
  accounts: []
}

const userGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOAD_ROLES:
      return { ...state, roles: [...action.payload] }
    case ACTION_LOAD_USER_GROUPS:
      return { ...state, userGroups: [...action.payload] }
    case ACTION_LOAD_ACCOUNT_IN_GROUP:
      return { ...state, accounts: [...action.payload] }
    default:
      return state
  }
}

export default userGroupReducer
