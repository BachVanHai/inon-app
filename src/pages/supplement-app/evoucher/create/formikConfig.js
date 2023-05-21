import {
  KEY_DATE_DEAFAULT,
  KEY_DATE_TO_DEAFAULT,
  KEY_TIME_DEAFAULT,
  KEY_TIME_TO_DEAFAULT,
  PERCENT,
  PREPAY,
  SAME_PRICE,
  VND
} from './utility'
import * as Yup from 'yup'
export const initialValues = {
  effectiveTimeFrom: KEY_TIME_DEAFAULT,
  effectiveTimeTo: KEY_TIME_TO_DEAFAULT,
  effectHoursFrom : '',
  effectMinuteseFrom : '',
  expireHoursFrom : '',
  expireMinuteseFrom : '',
  applyFor: '',
  deleted: false,
  discountValue: '',
  duration: '',
  effectiveDate: KEY_DATE_DEAFAULT,
  expireDate: KEY_DATE_TO_DEAFAULT,
  insuranceCompanyId: '',
  insuranceTypeId: '',
  maxDiscountValue: '',
  minContractValue: '',
  name: '',
  packageName: '',
  reasonReject: '',
  samePrice: '',
  totalVoucher: '',
  voucherType: VND,
  liability : ''
}
const MAX_PRECENT_VALUE = 100
const MIN_PRECENT_VALUE = 1
export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Không được để trống'),
  duration : Yup.string().required('Không được để trông'),
  packageName : Yup.string().required('Không được để trông'),
  applyFor : Yup.string().required('Không được để trông'),
  insuranceCompanyId: Yup.string().required('Không được để trống'),
  insuranceTypeId: Yup.string().required('Không được để trống'),
  totalVoucher: Yup.number().required('Không được để trống').test(
    'Is positive?', 
    'Giá trị phải lớn hơn 0', 
    (value) => value >= 0
  ),
  discountValue: Yup.number().required().test(
    'Is positive?', 
    'Giá trị phải lớn hơn 0', 
    (value) => value > 0
  ).when('voucherType', (value) =>{
    if(value === PERCENT) {
      return Yup.number().required().integer().test(
        'Is positive?', 
        'Giá trị phải lớn hơn 0', 
        (value) => value > 0
      ).min(MIN_PRECENT_VALUE).max(MAX_PRECENT_VALUE)
    }
    if(value === PREPAY) {
      return Yup.number().nullable().notRequired()
    }
    if(value === SAME_PRICE) {
      return Yup.number().nullable().notRequired()
    }
  }),
  minContractValue: Yup.number().required().test(
    'Is positive?', 
    'Giá trị phải lớn hơn 0', 
    (value) => value >= 0
  ).when('voucherType',  (value) =>{
    if(value === PREPAY) {
      return Yup.number().nullable().notRequired()
    }
    if(value === SAME_PRICE) {
      return Yup.number().nullable().notRequired()
    }
  }),
  maxDiscountValue: Yup.number().required().test(
    'Is positive?', 
    'Giá trị phải lớn hơn 0', 
    (value) => value >= 0
  ).when('voucherType',  (value) =>{
    if(value === PREPAY) {
      return Yup.number().nullable().notRequired()
    }
    if(value === VND) {
      return Yup.number().nullable().notRequired()
    }
    if(value === SAME_PRICE) {
      return Yup.number().nullable().notRequired()
    }
  }),
  samePrice : Yup.number().required().test(
    'Is positive?', 
    'Giá trị phải lớn hơn 0', 
    (value) => value > 0
  ).when('voucherType' , (value) =>{
    if(value === PREPAY) {
      return Yup.number().nullable().notRequired()
    }
    if(value === PERCENT) {
      return Yup.number().nullable().notRequired()
    }
    if(value === VND) {
      return Yup.number().nullable().notRequired()
    }
  })
})
