import * as Yup from 'yup'
import { FORGUEST, FORME } from './utility'
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
  hCUserId: null,
  applyFor: FORME
}
export const validateSchema = Yup.object().shape({
  name: Yup.string().when('applyFor', {
    is: FORGUEST,
    then: Yup.string().required()
  }),
  phoneNumber: Yup.string().when('applyFor' ,{
    is: FORGUEST,
    then: Yup.string().required().matches('(84|0[3|5|7|8|9])+([0-9]{8})\\b'),
  }),
  email: Yup.string().when('applyFor' ,{
      is : FORGUEST , 
      then : Yup.string().email().required()
  }),
  titleText: Yup.string().required().max(50),
  contentText: Yup.string().required()
})
