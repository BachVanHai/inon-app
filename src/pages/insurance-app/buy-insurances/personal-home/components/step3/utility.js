import { PAYMENT_TYPE_DEBT } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { getDefault_updateInsuranceObj as _getDefault_updateInsuranceObj } from '../step2/utility'

export const getDefault_updateInsuranceObj = (step_2) => {
    const arr = _getDefault_updateInsuranceObj(step_2)
    arr[0]["paymentChannel"] = PAYMENT_TYPE_DEBT
    return arr
}
