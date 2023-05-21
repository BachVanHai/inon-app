import * as Yup from 'yup'

export const KEY_UPLOADED_COUNT_TEMP = "uploadedCountTemp"

export const initialValues = ({
    [KEY_UPLOADED_COUNT_TEMP]: 0
})

export const validate = (values) => { }
export const validationSchema = Yup.object().shape({})