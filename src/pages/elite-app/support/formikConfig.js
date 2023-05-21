import * as Yup from 'yup'
export const initialValues = {
  name: '',
  phoneNumber: '',
  email: '',
  contentText: '',
  deleted: false,
  fromChannel: null,
  priority: 'DROP',
  status: 'TODO',
  titleText: '',
  type: 'PRODUCT',
  hCUserId : null
}
export const validateSchema = Yup.object().shape({
  name: Yup.string().required(),
  phoneNumber: Yup.string()
    .required()
    .matches('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
  email: Yup.string().email().required(),
  titleText: Yup.string().required().min(5).max(50),
  contentText: Yup.string().required()
})
