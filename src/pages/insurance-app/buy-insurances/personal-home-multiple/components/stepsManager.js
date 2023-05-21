import * as _r from '../../../../../redux/reducers/insurance-app/buyInsuranceHomeMultiple'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

export const REDUX_STATE_NAME = _r.REDUX_STATE_NAME

export const stepsMap = ([
    {
        id: 1,
        title: "Thông tin đối tượng bảo hiểm",
        bodyComponent: Step1,
    },
    {
        id: 2,
        title: "Nội dung bảo hiểm & thanh toán",
        bodyComponent: Step2,
    },
    {
        id: 3,
        title: "Kết thúc",
        bodyComponent: Step3,
    },
])
/**
 * 
 * @param {string} stepId : this param is activeStep actually
 * @returns {JSX.Element}
 */
export const getStepComponent = (stepId) => {
    switch (stepId) {
        case 1:
            return stepsMap[0]
        case 2:
            return stepsMap[1]
        case 3:
            return stepsMap[2]
        default:
            return stepsMap[0]
    }
}
