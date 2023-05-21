import moment, { max } from 'moment'
import * as Yup from 'yup'
import { KEY_DATE_FROM_DEFAULT, KEY_TIME_FROM_DEFAULT, KEY_TIME_TO_DEFAULT } from './utility'
const TODAY = moment().utc().format(`YYYY-MM-DD hh:mm:ss`)
export const initialValues = {
  content: '',
  endDate: KEY_DATE_FROM_DEFAULT,
  excludeSendTo: null,
  frequency: 'DATE',
  period: false,
  sendTo: null,
  shortContent: '',
  startDate: KEY_DATE_FROM_DEFAULT,
  title: '',
  codeNotificationType : 'SYSTEM',
  effectTime : KEY_TIME_FROM_DEFAULT,
  expireTime : KEY_TIME_TO_DEFAULT,
  effectHoursFrom : '' , 
  effectMinutesTo : '',
  expireHoursFrom : '',
  expireMinutesTo : '',
  createBy: "",
  createDate: ""
}
export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, `Tối thiểu 5 kí tự`)
    .required(`Không được để trông`)
    .max(150, `Tối đa 150 kí tự`),
  shortContent: Yup.string()
    .required(`Không được để trống`)
    .min(5, `Tối thiều 5 kí tự`),
  content: Yup.string()
    .required(`Không được để trống`)
    .min(5, `Tối thiều 5 kí tự`),
  sendTo : Yup.string().nullable(true).when('codeNotificationType' , {
    is : 'USER',
    then : Yup.string().required('Không được để trông')
  }),
  // excludeSendTo : Yup.string().nullable(true).when('codeNotificationType' , {
  //   is : 'USER',
  //   then : Yup.string().required('Không được để trông')
  // }) 
})
