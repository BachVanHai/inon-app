import * as Yup from 'yup'
import { sleepingFor } from '../../../../../../ultity'

export const KEY_COUPON_CODE = "couponCode"

export const initialValues = ({
    [KEY_COUPON_CODE]: ""
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors
        return errors
    })
}

export const validationSchema = Yup.object().shape({

})