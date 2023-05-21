import moment from 'moment'
import * as Yup from 'yup'
import {
  ALERT_EMPTY,
  ALERT_MIN_VND
} from '../../../components/insurance-app/buy-insurances-page/formik-config'
import { sleepingFor } from '../../../ultity'
import { _MIN_INITVALUE } from './utility'

export const KEY_CONTRACT_INFO = 'contractInfo'
export const KEY_ADD_TERMS_MAIN = 'addTermsMain'
export const KEY_ADD_TERMS_ALL = 'addTermsAll'
// owner info
export const KEY_NAME = 'fullName'
export const KEY_EMAIL = 'email'
export const KEY_PHONE_NUMBER = 'phoneNumber'
export const KEY_ADDRESS = 'address'
export const KEY_CONTRACT_CODE = 'contractCode'

// vehicel info
export const KEY_VEHICEL_TYPE = 'vehicelType'
export const KEY_STATUS_VEHICEL = 'vehicleStatus'
export const KEY_NUMBER_PLATE = 'numberPlate'
export const KEY_BRAND_NAME = 'brandName'
export const KEY_MANUFACTURER_VEHICLE = 'manufacturerName'
export const KEY_FRAME_NUMBER = 'frameNo'
export const KEY_MACHINE_NUMBER = 'machineNo'
export const _KEY_VEHICEL_TYPE_NAME = 'vehicelTypeName'
export const KEY_PURPOSE = 'usage'
export const KEY_INITVALUE = 'initValue'
export const KEY_CONTRACTVALUE = 'contractValue'
export const KEY_ISSDATE = 'issDate'
export const KEY_CONTRACTTYPE = 'contractType'
export const KEY_ISSPLACE = 'issPlace'
export const KEY_SEATS = 'seats'
export const KEY_ADDTIONAL_TERM_MAIN = 'addTermsMain'
export const KEY_CAPACITYTYPE = 'capacityType'
export const KEY_VEHICLE_TYPE_ID = 'vehicleTypeId'
// bh vc
export const KEY_DURATION_BHVC = 'durationBHVC'
export const KEY_DATE_INSUR_VC_FROM = 'dateInsuranceVCFrom'
export const KEY_TIME_INSUR_VC_FROM = 'timeInsuranceVCFrom'
export const KEY_DATE_INSUR_VC_TO = 'dateInsuranceVCTo'
export const KEY_TIME_INSUR_VC_TO = 'timeInsuranceVCTo'

// bb tnds
export const KEY_DURATION_BBTNDS = 'durationBBTNDS'
export const KEY_DATE_INSUR_FROM = 'dateInsuranceFrom'
export const KEY_DATE_INSUR_TO = 'dateInsuranceTo'
export const KEY_TIME_INSUR_FROM = 'timeInsuranceFrom'
export const KEY_TIME_INSUR_TO = 'timeInsuranceTo'

export const KEY_COMPANPANY_ID = 'companyId'
/// insurance info
// export const KEY_AMOUNT_PEOPLE_EACH_CAR = 'numInCar'
export const KEY_ADD_RESPONSIBILITY_VALUE = 'responsibility_value'

// optional
export const KEY_TOGGLE_TAI_NAN_MOTOR = 'tnpltx'
export const KEY_TOGGLE_CAR_TNDS = 'toggleBBTNDS'
export const KEY_TOGGLE_CAR_VATCHAT = 'toggleVC'
export const KEY_TOGGLE_CAR_TNDS_TN = 'toggleTNDSTN'
export const KEY_TOGGLE_CAR_CONNGUOI = 'toggleTNLPL'
export const KEY_TOGGLE_CAR_HANGHOA = 'toggleHH'

// value

export const KEY_XTRIEU_NGUOI_VU = 'xTrieuNguoiVu'
export const KEY_XTRIEU_TAISAN_VU = 'xTrieuTaiSanVu'
export const KEY_XTRIEU_TAI_HANHKHACH = 'xTrieuTaiHanhKhach'
export const KEY_MIN_XTRIEU_TAI_HANHKHACH = 'minXTrieuTaiHanhKhach'
export const KEY_XTRIEU_NGUOI_TREN_XE = 'xTrieuNguoiTrenXe'
export const KEY_NUM_IN_CAR = 'numInCar'
export const KEY_XTRIEU_HANGHOA_VANCHUYEN = 'xTrieuHangHoaVanChuyen'
export const KEY_GROSS_TON = 'grossTon'
export const KEY_BH_INCREASE = 'bhInc'
export const KEY_GT_XE_KHAIBAO = 'initValue'
export const KEY_GTBH_YEUCAU = 'contractValue'
export const KEY_LOADS = 'loads'

// MOTOR
export const KEY_TOGGLE_BBTNDS = 'toggleBBTNDS'
export const KEY_DURATION = 'duration'
export const KEY_DATE_INSUR_FROM_MOTOR = 'valueDateStart'
export const KEY_TIME_INSUR_FROM_MOTOR = 'valueTimeStart'
export const KEY_DATE_INSUR_TO_MOTOR = 'valueDateEnd'
export const KEY_TIME_INSUR_TO_MOTOR = 'valueTimeEnd'

export const KEY_TOGGLE_TAI_NAN = 'toggleTainan'
export const KEY_ADD_RESPONSIBILITY_VALUE_MOTOR = 'addResponsibilityValue'
export const KEY_AMOUNT_PEOPLE_EACH_CAR = 'numInCar'
export const KEY_ADDTIONAL_TERM_ALL = 'addTermsAll'
export const KEY_MAX_NUM_IN_CAR = 'maxNum'
const currentTime = new Date().getHours()
const date = new Date()
if (currentTime > 0 && currentTime < 8) {
  date.setHours(12, 0, 0)
} else if (currentTime >= 8 && currentTime < 12) {
  date.setHours(18, 0, 0)
} else {
  date.setDate(date.getDate() + 1)
  date.setHours(12, 0, 0)
}
export const initialValues = {
  [KEY_COMPANPANY_ID]: '06',
  // ower info
  [KEY_NAME]: '',
  [KEY_EMAIL]: '',
  [KEY_PHONE_NUMBER]: '',
  [KEY_ADDRESS]: '',
  // vehicel info
  [KEY_VEHICEL_TYPE]: '',
  [KEY_STATUS_VEHICEL]: 'OLD',
  [KEY_NUMBER_PLATE]: '',
  [KEY_BRAND_NAME]: '',
  [KEY_MANUFACTURER_VEHICLE]: '',
  [KEY_FRAME_NUMBER]: '',
  [KEY_MACHINE_NUMBER]: '',
  [KEY_NUMBER_PLATE]: '',
  [KEY_CONTRACTTYPE]: '',
  [KEY_SEATS]: '',
  [KEY_ISSPLACE]: 'VIETNAM',
  [KEY_CAPACITYTYPE]: '',
  [KEY_VEHICLE_TYPE_ID]: '',
  // insurance info
  [KEY_DURATION_BBTNDS]: 12,
  [KEY_CONTRACT_CODE]: '',
  [KEY_ISSDATE]: '',
  [KEY_ADD_RESPONSIBILITY_VALUE_MOTOR]: 5,
  [KEY_ADDTIONAL_TERM_MAIN]: [],
  [KEY_ADDTIONAL_TERM_ALL]: [],
  //optional
  //GENERAL
  [KEY_TOGGLE_CAR_TNDS]: false,

  //MOTOR
  [KEY_TOGGLE_TAI_NAN_MOTOR]: false,
  [KEY_DATE_INSUR_FROM_MOTOR]: moment().format('YYYY-MM-DD'),
  [KEY_TIME_INSUR_FROM_MOTOR]: moment().format('H:mm'),
  [KEY_DATE_INSUR_TO_MOTOR]: moment().add(1, 'y').format('YYYY-MM-DD'),
  [KEY_TIME_INSUR_TO_MOTOR]: moment().format('H:mm'),

  //CAR
  [KEY_TOGGLE_CAR_TNDS_TN]: false,
  [KEY_TOGGLE_CAR_VATCHAT]: false,
  [KEY_TOGGLE_CAR_CONNGUOI]: false,
  [KEY_TOGGLE_CAR_HANGHOA]: false,
  [KEY_DATE_INSUR_FROM]: moment(date).utc(true).format('YYYY-MM-DD'),
  [KEY_DATE_INSUR_TO]: moment(date).utc(true).add(1,'y').format('YYYY-MM-DD'),
  [KEY_TIME_INSUR_FROM]: `${date.getHours()}:00`,
  [KEY_TIME_INSUR_TO]: `${date.getHours()}:00`,

  //VC CAR
  [KEY_DATE_INSUR_VC_FROM]: moment().format('YYYY-MM-DD'),
  [KEY_DATE_INSUR_VC_TO]: moment().add(1, 'y').format('YYYY-MM-DD'),
  [KEY_TIME_INSUR_VC_FROM]: moment().format('H:mm'),
  [KEY_TIME_INSUR_VC_TO]: moment().format('H:mm'),
  [KEY_NUM_IN_CAR]: 1,
  [KEY_DURATION_BHVC]: 12,

  // value

  [KEY_XTRIEU_NGUOI_VU]: 10,
  [KEY_XTRIEU_TAISAN_VU]: 10,
  [KEY_XTRIEU_TAI_HANHKHACH]: 10,
  [KEY_MIN_XTRIEU_TAI_HANHKHACH]: 10,
  [KEY_XTRIEU_HANGHOA_VANCHUYEN]: 10,
  [KEY_XTRIEU_NGUOI_TREN_XE]: 20,
  [KEY_GROSS_TON]: 1,
  [KEY_GT_XE_KHAIBAO]: 0,
  [KEY_GTBH_YEUCAU]: 0,
  [KEY_BH_INCREASE]: 0,
  [KEY_LOADS]: 0.1,

  // duration motor
  [KEY_DURATION]: 12
}
export const valitadte = (values) => {
  return sleepingFor().then(() => {
    let errors = {}
    if (values[KEY_TOGGLE_CAR_CONNGUOI]) {
      if (Number(values[KEY_MAX_NUM_IN_CAR]) > Number(values[KEY_SEATS])) {
        errors[KEY_NUM_IN_CAR] = `Số ghế ngồi không được lớn hơn ${values[KEY_SEATS]}`
        return errors
      }
    }
    return errors
  })
}
export const validateSchema = Yup.object().shape({
  [KEY_SEATS]: Yup.string().required(ALERT_EMPTY),
})
