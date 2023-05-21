import FeeInsuranceServ from '../../../services/insurance-app/feeManageInsurance'
import Utils from '../../../configs/insurance-app/constants/Utils'
import moment from 'moment'

export const ACTION_GET_FEE = 'ACTION_GET_FEE'


export const getFee = (formik, role, companyId) => {
    return async (dispatch) => {
        try {
            const res = await FeeInsuranceServ.getFee('car/' + role + '/' + companyId)
            // console.log(JSON.stringify(res, null, 2))

            if (res.status === 200) {

                res.data.carTndsFees.map((item, j) => {

                    item.list.map((iFee, t) => {
                        iFee.fee = Utils.formatCurrency(iFee.fee)
                    })
                })
                // console.log(JSON.stringify(res.data.carGoodsFees, null, 2))
                res.data.oldDeductionLevel = res.data.deductionLevel
                formik.setFieldValue("deductionLevel", res.data.deductionLevel)
                res.data.oldBaseFeeIncreaseMin = res.data.baseFeeIncreaseMin
                formik.setFieldValue("baseFeeIncreaseMin", res.data.baseFeeIncreaseMin)
                res.data.oldBaseFeeIncreaseMax = res.data.baseFeeIncreaseMax
                formik.setFieldValue("baseFeeIncreaseMax", res.data.baseFeeIncreaseMax)
                res.data.oldMinimumFee = res.data.minimumFee
                formik.setFieldValue("minimumFee", res.data.minimumFee)
                res.data.oldDebtFile = res.data.debtFile
                formik.setFieldValue("debtFile", res.data.debtFile)
                dispatch({
                    type: ACTION_GET_FEE,
                    payload: res.data
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}


export const getFeeApproveDetail = (formik, data, companyId) => {
    return async (dispatch, getState) => {
        try {
            console.log(JSON.stringify(data, null, 2))
            const res = await FeeInsuranceServ.getFeeDetailApprove(data.vehicleType + '/' + companyId + '?user=' + data.username + '&approvalId=' + data.approvalId)
            if (res.status === 200) {

                if (data.vehicleType === 'CAR') {
                    res.data.carTndsFees.map((item, j) => {

                        item.list.map((iFee, t) => {
                            iFee.fee = Utils.formatCurrency(iFee.fee)
                        })
                    })
                    // console.log(JSON.stringify(res.data.carGoodsFees, null, 2))
                    res.data.oldDeductionLevel = res.data.deductionLevel
                    formik.setFieldValue("deductionLevel", res.data.deductionLevel)
                    res.data.oldBaseFeeIncreaseMin = res.data.baseFeeIncreaseMin
                    formik.setFieldValue("baseFeeIncreaseMin", res.data.baseFeeIncreaseMin)
                    res.data.oldBaseFeeIncreaseMax = res.data.baseFeeIncreaseMax
                    formik.setFieldValue("baseFeeIncreaseMax", res.data.baseFeeIncreaseMax)
                    res.data.oldMinimumFee = res.data.minimumFee
                    formik.setFieldValue("minimumFee", res.data.minimumFee)
                    res.data.oldDebtFile = res.data.debtFile
                    formik.setFieldValue("debtFile", res.data.debtFile)
                    formik.setFieldValue("applyDate", moment(res.data.applyDate.replace("Z", "")).format(Utils.DATE_FORMAT))
                } else if (data.vehicleType === 'MOTOR') {
                    res.data.motorTndsFees.map((item, j) => {
                        item.fee = Utils.formatCurrency(item.fee)
                    })
                    res.data.motorTndsOptFees.map((item, j) => {
                        item.fee = Utils.formatCurrency(item.fee)
                    })

                    formik.setFieldValue("applyDate", moment(res.data.applyDate.replace("Z", "")).format(Utils.DATE_FORMAT))
                }
                dispatch({
                    type: ACTION_GET_FEE,
                    payload: res.data
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const getFeeMotor = (role, companyId) => {
    return async (dispatch) => {
        try {
            const res = await FeeInsuranceServ.getFee('motor/' + role + '/' + companyId)
            console.log(JSON.stringify(res, null, 2))

            if (res.status === 200) {
                res.data.motorTndsFees.map((item, j) => {
                    item.fee = Utils.formatCurrency(item.fee)
                })
                res.data.motorTndsOptFees.map((item, j) => {
                    item.fee = Utils.formatCurrency(item.fee)
                })
                // console.log(JSON.stringify(res.data.carGoodsFees, null, 2))
                // res.data.oldDeductionLevel = res.data.deductionLevel
                // res.data.oldBaseFeeIncreaseMin = res.data.baseFeeIncreaseMin
                // res.data.oldBaseFeeIncreaseMax = res.data.baseFeeIncreaseMax
                // res.data.oldMinimumFee = res.data.minimumFee
                // res.data.oldDebtFile = res.data.debtFile
                dispatch({
                    type: ACTION_GET_FEE,
                    payload: res.data
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}


export const getFeeMotorPartner = (formik, role, partner, companyId) => {
    return async (dispatch) => {
        try {
            const res = await FeeInsuranceServ.getFee('motor/' + (role !== 'ALL' ? role : 'AGENCY') + '/'+companyId+'?user=' + partner.toString().trim())
            console.log(JSON.stringify(res, null, 2))

            if (res.status === 200) {
                res.data.motorTndsFees.map((item, j) => {
                    item.fee = Utils.formatCurrency(item.fee)
                })
                res.data.motorTndsOptFees.map((item, j) => {
                    item.fee = Utils.formatCurrency(item.fee)
                })
                dispatch({
                    type: ACTION_GET_FEE,
                    payload: res.data
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}



export const getFeePartner = (formik, role, partner, companyId) => {
    return async (dispatch) => {
        try {
            const res = await FeeInsuranceServ.getFee('car/' + (role !== 'ALL' ? role : 'AGENCY') + '/'+companyId+'?user=' + partner.toString().trim())

            if (res.status === 200) {
                res.data.carTndsFees.map((item, j) => {
                    item.list.map((iFee, t) => {
                        iFee.fee = Utils.formatCurrency(iFee.fee)
                    })
                })
                res.data.oldDeductionLevel = res.data.deductionLevel
                formik.setFieldValue("deductionLevel", res.data.deductionLevel)
                res.data.oldBaseFeeIncreaseMin = res.data.baseFeeIncreaseMin
                formik.setFieldValue("baseFeeIncreaseMin", res.data.baseFeeIncreaseMin)
                res.data.oldBaseFeeIncreaseMax = res.data.baseFeeIncreaseMax
                formik.setFieldValue("baseFeeIncreaseMax", res.data.baseFeeIncreaseMax)
                res.data.oldMinimumFee = res.data.minimumFee
                formik.setFieldValue("minimumFee", res.data.minimumFee)
                res.data.oldDebtFile = res.data.debtFile
                formik.setFieldValue("debtFile", res.data.debtFile)
                dispatch({
                    type: ACTION_GET_FEE,
                    payload: res.data
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}




