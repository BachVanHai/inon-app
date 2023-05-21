export const UPDATE_PROPS_RENEWAL = 'UPDATE_PROPS_RENEWAL'
export const UPDATE_CONTRACT_INFO = 'UPDATE_CONTRACT_INFO'
export const UPDATE_DATA_FEES = 'UPDATE_DATA_FEES'
export const UPDATE_COMPANY_ID = 'UPDATE_COMPANY_ID'
export const UPDATE_LIST_CAR_TYPE = 'UPDATE_LIST_CAR_TYPE'
export const UPDATE_EDIT_INFO_VHC_STATUS = 'UPDATE_EDIT_INFO_VHC_STATUS'
export const UPDATE_CONTRACT_CODE = 'UPDATE_CONTRACT_CODE'
export const updatePropsRenewal = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_PROPS_RENEWAL,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updatePropsContract = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_CONTRACT_INFO,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updatePropsDataFees = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_DATA_FEES,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updatePropsCompanyId = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_COMPANY_ID,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updatePropsListCarType = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_LIST_CAR_TYPE,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const updatePropsInfoVHCStatus = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_EDIT_INFO_VHC_STATUS,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const updateContractCode = (contractCode) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_CONTRACT_CODE,
                payload: contractCode
            })
        } catch (error) {
            console.log(error)
        }
    }
}