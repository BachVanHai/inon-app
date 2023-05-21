import * as _r from '../../../../../redux/reducers/insurance-app/buyInsurancesFamilySafety'
import FamilySafetyStep1 from './step1'
import FamilySafetyStep2 from './step2'
import FamilySafetyStep3 from './step3'
import FamilySafetyStep4 from './step4'
import FamilySafetyStep5 from './step5'

export const REDUX_STATE_NAME = _r.REDUX_STATE_NAME

export const stepsMap = ([
    {
        id: 1,
        title: "Thông tin bên mua bảo hiểm",
        bodyComponent: FamilySafetyStep1,
    },
    {
        id: 2,
        title: "Thông tin người được bảo hiểm",
        bodyComponent: FamilySafetyStep2,
    },
    {
        id: 3,
        title: "Nội dung bảo hiểm",
        bodyComponent: FamilySafetyStep3,
    },
    {
        id: 4,
        title: "Thanh toán",
        bodyComponent: FamilySafetyStep4,
    },
    {
        id: 5,
        title: "Kết thúc",
        bodyComponent: FamilySafetyStep5,
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
        case 5:
            return stepsMap[4]
        default:
            return stepsMap[0]
    }
}
