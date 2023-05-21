import * as Yup from 'yup'
import { sleepingFor } from '../../../../../ultity'

export const initialValues = ({})

export const validate = (values) => {
    return sleepingFor().then(() => { })
}

export const validationSchema = Yup.object().shape({})
