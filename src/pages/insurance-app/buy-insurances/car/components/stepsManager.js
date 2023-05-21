import * as _r from '../../../../../redux/reducers/insurance-app/buyInsurancesCar'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'
import Step5 from './step5'
import Step6 from './step6'

export const REDUX_STATE_NAME = _r.REDUX_STATE_NAME

export const stepsMap = ([
    {
        id: 1,
        title: "Thông tin xe",
        bodyComponent: Step1,
    },
    {
        id: 2,
        title: "Nội dung bảo hiểm",
        bodyComponent: Step2,
    },
    {
        id: 3,
        title: "Thông tin chủ tài sản",
        bodyComponent: Step3,
    },
    {
        id: 4,
        title: "Bổ sung hồ sơ",
        bodyComponent: Step4,
    },
    {
        id: 5,
        title: "Thanh toán",
        bodyComponent: Step5,
    },
    {
        id: 6,
        title: "Kết thúc",
        bodyComponent: Step6,
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
        case 4:
            return stepsMap[3]
        case 5:
            return stepsMap[4]
        case 6:
            return stepsMap[5]

        default:
            return stepsMap[0]
    }
}
