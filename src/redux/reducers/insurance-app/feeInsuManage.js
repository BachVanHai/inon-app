import {
    ACTION_GET_FEE,

} from '../../actions/insurance-app/feeInsuManage'

const initialState = {
    feeCar: {},
    feeOldCar: {}
}

const feeInsuranceManageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_GET_FEE:
            return {
                ...state,
                feeCar: action.payload,
                feeOldCar: action.payload
            }
        case 'ACTION_RESET_FEE':
            return {
                ...initialState
            }
        case 'ACTION_FEE_SET_UPDATE':
            return {
                ...state,
                feeCar: action.payload,
                feeOldCar: action.payload
            }
        case 'ACTION_FEE_SEARCH_CAR_TNDS':

            let merge = { ...state.feeCar, ...state.feeOldCar }

            if (action.payload === null || action.payload === '') {
                return {
                    ...state,
                    feeCar: merge,
                    feeOldCar: merge
                }
            }
            let tempMerge = { ...state.feeCar, ...state.feeOldCar }
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))

            let tempCarTndsFees = []
            tempMerge.carTndsFees.map((item, j) => {
                let list = []
                let temp = {}
                temp.vehicleType = item.vehicleType
                item.list.map((iFee, t) => {
                    if (String(iFee.name)
                        .toLowerCase()
                        .includes(action.payload.toLowerCase())) {
                        list = [...list, iFee]
                    }

                })
                temp.list = list
                if (list.length > 0)
                    tempCarTndsFees = [...tempCarTndsFees, temp]
            })
            // console.log("list: " + JSON.stringify(list, null, 2))
            let filterData = {
                ...tempMerge,
                carTndsFees: tempCarTndsFees
            }
            // console.log("list: " + JSON.stringify(filterData, null, 2))
            return {
                ...state,
                feeCar: filterData,
                feeOldCar: merge
            }
        case 'ACTION_FEE_SEARCH_CAR_TNDSTN':

            merge = { ...state.feeCar, ...state.feeOldCar }

            if (action.payload === null || action.payload === '') {
                return {
                    ...state,
                    feeCar: merge,
                    feeOldCar: merge
                }
            }
            tempMerge = { ...state.feeCar, ...state.feeOldCar }
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))

            tempCarTndsFees = []
            tempMerge.carTndsOptFees.map((item, j) => {
                // let list = []
                // let temp = {}
                // temp.vehicleType = item.vehicleType
                // item.list.map((iFee, t) => {
                //     if (String(iFee.name)
                //         .toLowerCase()
                //         .includes(action.payload.toLowerCase())) {
                //         list = [...list, iFee]
                //     }

                // })
                // temp.list = list
                // if (list.length > 0)
                //     tempCarTndsFees = [...tempCarTndsFees, temp]
                if (String(item.vehicleType)
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())) {
                    tempCarTndsFees = [...tempCarTndsFees, item]
                }
            })
            // console.log("list: " + JSON.stringify(list, null, 2))
            filterData = {
                ...tempMerge,
                carTndsOptFees: tempCarTndsFees
            }
            // console.log("list: " + JSON.stringify(filterData, null, 2))
            return {
                ...state,
                feeCar: filterData,
                feeOldCar: merge
            }
        case 'ACTION_FEE_SEARCH_CAR_VC':

            merge = { ...state.feeCar, ...state.feeOldCar }

            if (action.payload === null || action.payload === '') {
                return {
                    ...state,
                    feeCar: merge,
                    feeOldCar: merge
                }
            }
            tempMerge = { ...state.feeCar, ...state.feeOldCar }
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))

            tempCarTndsFees = []
            tempMerge.carFees.map((item, j) => {
                // temp.vehicleType = item.vehicleType

                if (String(item.name)
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())) {
                    tempCarTndsFees = [...tempCarTndsFees, item]
                }


            })
            // console.log("list: " + JSON.stringify(list, null, 2))
            filterData = {
                ...tempMerge,
                carFees: tempCarTndsFees
            }
            // console.log("list: " + JSON.stringify(filterData, null, 2))
            return {
                ...state,
                feeCar: filterData,
                feeOldCar: merge
            }
        case 'ACTION_FEE_SEARCH_CAR_DKBS':

            merge = { ...state.feeCar, ...state.feeOldCar }

            if (action.payload === null || action.payload === '') {
                return {
                    ...state,
                    feeCar: merge,
                    feeOldCar: merge
                }
            }
            tempMerge = { ...state.feeCar, ...state.feeOldCar }
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))
            // console.log("tempMerge: " + JSON.stringify(tempMerge, null, 2))

            tempCarTndsFees = []
            tempMerge.carFeeAddons.map((item, j) => {
                // temp.vehicleType = item.vehicleType

                if (String(item.name)
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())) {
                    tempCarTndsFees = [...tempCarTndsFees, item]
                }


            })
            // console.log("list: " + JSON.stringify(list, null, 2))
            filterData = {
                ...tempMerge,
                carFeeAddons: tempCarTndsFees
            }
            // console.log("list: " + JSON.stringify(filterData, null, 2))
            return {
                ...state,
                feeCar: filterData,
                feeOldCar: merge
            }
        default:
            return state
    }
}

export default feeInsuranceManageReducer
