import Step1 from './step1'

export const stepsMap = ([
    {
        id: 1,
        title: "Thông tin mua bảo hiểm",
        bodyComponent: Step1,
    },
])
/**
 * @returns {JSX.Element}
 */
export const getStepComponent = (activeStep) => {
    switch (activeStep) {
        case 1:
            return stepsMap[0]
       
        default:
            return stepsMap[0]
    }
}

export const REDUX_STATE_NAME = "BUY_INSURANCE_EXAMPLE_NAME_HERE"