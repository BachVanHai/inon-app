import {NAME_BUY_INSURANCES_TRAVEL } from '../../../../../configs/insurance-app'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'

export const REDUX_STATE_NAME = NAME_BUY_INSURANCES_TRAVEL

export const stepsMap = ([
    {
        id: 1,
        title: "Thông tin bên mua bảo hiểm",
        bodyComponent: Step1,
    },
    {
        id: 2,
        title: "Nội dung bảo hiểm",
        bodyComponent: Step2,
    },
    {
        id: 3,
        title: "Thanh toán",
        bodyComponent: Step3,
    },
    {
        id: 4,
        title: "Kết thúc",
        bodyComponent: Step4,
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
        case 4:
            return stepsMap[3]
        default:
            return stepsMap[0]
    }
}
