import { NAME_BUY_INSURANCES_CARS } from '../../../../../configs/insurance-app'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

export const stepsMap = ([
    {
        id: 1,
        title: "Thông tin mua bảo hiểm",
        bodyComponent: Step1,
    },
    {
        id: 2,
        title: "Nội dung bảo hiểm và thanh toán",
        bodyComponent: Step2,
    },
    {
        id: 3,
        title: "Kết thúc",
        bodyComponent: Step3,
    },
])
/**
 * @returns {JSX.Element}
 */
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

export const REDUX_STATE_NAME = NAME_BUY_INSURANCES_CARS