import {
  ACTION_LOAD_HOME_REVENUE_CHART_DATA,
  ACTION_LOAD_HOME_INFO,
  ACTION_LOAD_HOME_CONTRACTS_CHART_DATA,
  ACTION_LOAD_HOME_DEBT_CHART_DATA,
  ACTION_LOAD_HOME_ACCOUNTS_CHART_DATA,
  ACTION_LOAD_HOME_BONUS_CHART_DATA, ACTION_LOAD_TOP10_BEST_DATA, ACTION_LOAD_TOP10_WORST_DATA
} from '../../actions/app-no1/home'
import {INSURANCE_TYPE} from "../../../configs/app-no1/index";

const initialState = {
  homeInfo: {},
  homeRevenueChart: {
    type: [INSURANCE_TYPE.ALL, INSURANCE_TYPE.CAR, INSURANCE_TYPE.MOTOR, INSURANCE_TYPE.HOME_SAFETY, INSURANCE_TYPE.VTA, INSURANCE_TYPE.HOME_PRIVATE],
    data: [],
    isLoading : true
  },
  homeContractsChart: {
    type: ['ALL'],
    data: [],
    isLoading : true
  },
  homeDebtChart: {
    type: ['ALL'],
    data: [],
    isLoading : true
  },
  homeAccountsChart: {
    type: ['ALL'],
    data: [],
    isLoading : true
  },
  homeBonusChart: {
    type: ['ALL'],
    data: [],
    isLoading : true
  },
  top10BestData: {
    data: [],
  },
  top10WorstData: {
    data: []
  }
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOAD_HOME_INFO :
      return { ...state, homeInfo: action.payload }
    case ACTION_LOAD_HOME_REVENUE_CHART_DATA :
      return { ...state, homeRevenueChart: {...state.homeRevenueChart, ...action.payload}}
    case ACTION_LOAD_HOME_CONTRACTS_CHART_DATA :
      return { ...state, homeContractsChart: { ...action.payload } }
    case ACTION_LOAD_HOME_DEBT_CHART_DATA:
      return { ...state, homeDebtChart: { ...action.payload } }
    case ACTION_LOAD_HOME_ACCOUNTS_CHART_DATA:
      return { ...state, homeAccountsChart: { ...action.payload } }
    case ACTION_LOAD_HOME_BONUS_CHART_DATA :
      return { ...state, homeBonusChart: { ...action.payload } }
    case ACTION_LOAD_TOP10_BEST_DATA:
      return { ...state, top10BestData: { ...action.payload } }
    case ACTION_LOAD_TOP10_WORST_DATA:
      return { ...state, top10WorstData: { ...action.payload } }
    default :
      return state
  }
}

export default homeReducer