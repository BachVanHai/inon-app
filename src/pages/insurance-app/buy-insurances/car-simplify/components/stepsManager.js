import { NAME_BUY_INSURANCES_CAR, NAME_BUY_INSURANCES_MOTOR } from '../../../../../configs/insurance-app'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

export const stepsMap = ([
    {
        id: 1,
        title: "Tải giấy tờ",
        bodyComponent: Step1,
    },
    {
        id: 2,
        title: "Thông tin hợp đồng và thanh toán",
        bodyComponent: Step2,
    },
    {
        id: 3,
        title: "Kết thúc",
        bodyComponent: Step3,
    },
])

export const getStepComponent = (activeStep) => {
    switch (activeStep) {
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
/** don't have different name because this thing use the same redux-state as all the other buy-insurance-motor  
 * we use KEY_LAST_ENDPOINT_PATH to distinguish witch one was right buy-insurance-motor
*/
export const REDUX_STATE_NAME = NAME_BUY_INSURANCES_CAR