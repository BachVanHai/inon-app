import { initialValues } from "./formikConfig"

export const fillMultipleStepInfo = (stepInfo, setFieldValue) => {
    Object.keys(stepInfo).forEach((prop) => {
        if (initialValues.hasOwnProperty(prop)) {
            setFieldValue(prop, stepInfo[prop])
        }
    })
}