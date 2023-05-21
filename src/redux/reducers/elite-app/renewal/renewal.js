import { UPDATE_COMPANY_ID, UPDATE_CONTRACT_CODE, UPDATE_CONTRACT_INFO, UPDATE_DATA_FEES, UPDATE_EDIT_INFO_VHC_STATUS, UPDATE_LIST_CAR_TYPE, UPDATE_PROPS_RENEWAL } from "../../../actions/elite-app/renewal"

const initialState = {
    contractInfo: {},
    dataFees: [],
    companyId : "06",
    listCarType : [],
    // status editblock 
    editInfoVehicelStatus : false ,
    contractCode : ""
}

const renewalInsuranceReducers = (state = initialState, action) => {
    const { payload, type } = action
    let _draftState = { ...state }

    switch (type) {
        case UPDATE_PROPS_RENEWAL:
            for (let item of payload) {
                const { prop, value } = item
                _draftState[prop] = value
            }
            return _draftState
        case UPDATE_CONTRACT_INFO:
            return { ...state, contractInfo: payload }
        case UPDATE_DATA_FEES:
            return { ...state, dataFees: payload }
        case UPDATE_COMPANY_ID:
            return { ...state, companyId: payload }
        case UPDATE_LIST_CAR_TYPE:
            return { ...state, listCarType: payload }
        case UPDATE_EDIT_INFO_VHC_STATUS:
            return { ...state, editInfoVehicelStatus: payload }
        case UPDATE_CONTRACT_CODE:
            return { ...state, contractCode: payload }
        default:
            return state
    }
}

export default renewalInsuranceReducers