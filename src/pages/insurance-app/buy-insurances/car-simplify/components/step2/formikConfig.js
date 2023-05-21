import * as Yup from 'yup'
import { isValueEmpty, isValueNumber, sleepingFor, updateInsuranceEffectiveDate } from '../../../../../../ultity'
import moment from 'moment'
import { ALERT_INVALID, DATE_FORMAT, emailRegex, nullStrRegex, phoneNumberRegex } from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'

export const KEY_COUPON_CODE = "couponCode"
/** step 1 section */
// export const KEY_FULLNAME = "ownerName"
export const KEY_ADDRESS = "ownerAddr"
// export const KEY_PHONE_NUMBER = "phoneNumber"
// export const KEY_EMAIL = "email"

// export const KEY_ADDRESS = "ownerAddr"

export const KEY_IC_TYPE = "idType"
export const KEY_IC_NO = "idOwnerNum"
export const KEY_FULLNAME = "ownerName"
export const KEY_DATE_BIRTH = "dateOfBirth"
export const KEY_PHONE_NUMBER = "ownerPhone"
export const KEY_EMAIL = "ownerEmail"
export const KEY_GENDER = "ownerSex"

export const KEY_VEHICLE_TYPE = "vehicleType"
export const KEY_NUMBER_PLATE = "numberPlate"
export const KEY_MANUFACTURER_VEHICLE = "manufactureVehicleName"
export const KEY_BRAND_NAME = "brandName"
export const KEY_DURATIOBN = 'duration'
export const KEY_FRAME_NUMBER = "frameNo"
export const KEY_MACHINE_NUMBER = "machineNo"
/** step 2 section  */
const MIN_DURATION = 12
const MAX_DURATINON = 36
const MIN_DURATION_PERSON = 10
const MAX_DURATINON_PERSON = 800
export const sliderPersonInfo = {
    min: MIN_DURATION_PERSON ,
    max: MAX_DURATINON_PERSON,
    stepValue: 10,
}
export const sliderInfo = {
    min: MIN_DURATION,
    max: MAX_DURATINON,
    stepValue: 3,
}
export const KEY_TOGGLE_BBTNDS = "toggleBBTNDS"
export const KEY_TOGGLE_VC = "toggleVC"
export const KEY_TOGGLE_TNLPL = "toggleTNLPL"
export const KEY_TOGGLE_HH = "toggleHH"
export const KEY_TOGGLE_TNDSTN = "toggleTNDSTN"

export const KEY_DURATION_BBTNDS = "durationBBTNDS"
export const KEY_DATE_INSUR_FROM = "dateInsuranceFrom"
export const KEY_TIME_INSUR_FROM = "timeInsuranceFrom"
export const KEY_DATE_INSUR_TO = "dateInsuranceTo"
export const KEY_TIME_INSUR_TO = "timeInsuranceTo"

export const KEY_XTRIEU_NGUOI_VU = "xTrieuNguoiVu"
export const KEY_XTRIEU_TAISAN_VU = "xTrieuTaiSanVu"
export const KEY_XTRIEU_TAI_HANHKHACH = "xTrieuTaiHanhKhach"
export const KEY_MIN_XTRIEU_TAI_HANHKHACH = "minXTrieuTaiHanhKhach"
export const KEY_XTRIEU_TAI_HANHKHACH_DISABLE = "xTrieuTaiHanhKhachDisable"

export const KEY_DURATION_BHVC = "durationBHVC"
export const KEY_DATE_INSUR_VC_FROM = "dateInsuranceVCFrom"
export const KEY_TIME_INSUR_VC_FROM = "timeInsuranceVCFrom"
export const KEY_DATE_INSUR_VC_TO = "dateInsuranceVCTo"
export const KEY_TIME_INSUR_VC_TO = "timeInsuranceVCTo"
export const KEY_ADDTIONAL_TERM_MAIN = "addTermsMain"
export const KEY_ADDTIONAL_TERM_ALL = "addTermsAll"
export const KEY_BH_INCREASE = "bhInc"
export const KEY_BASE_FEE_INCREASE_MIN = "baseFeeIncreaseMin"
export const KEY_BASE_FEE_INCREASE_MAX = "baseFeeIncreaseMax"

export const KEY_XTRIEU_NGUOI_TREN_XE = "xTrieuNguoiTrenXe"
export const KEY_NUM_IN_CAR = "numInCar"
export const KEY_MAX_NUM_IN_CAR = "maxNumInCar"
export const KEY_MIN_NUM_IN_CAR = "minNumInCar"

export const KEY_GROSS_TON = "grossTon"
export const KEY_MAX_GROSS_TON = "maxGrossTon"
export const KEY_MIN_GROSS_TON = "minGrossTon"
export const KEY_XTRIEU_HANGHOA_VANCHUYEN = "xTrieuHangHoaVanChuyen"

const { startValueDate, showTime } = updateInsuranceEffectiveDate()

export const initialValues = ({
    [KEY_EMAIL] : '',
    [KEY_PHONE_NUMBER] : '',
    [KEY_TOGGLE_BBTNDS]: true,
    [KEY_DURATION_BBTNDS]: 12,
    [KEY_DATE_INSUR_FROM]: moment(startValueDate).utc(true).format(config.DATE_FORMAT),
    [KEY_TIME_INSUR_FROM]: moment().hours(showTime).format("H") + ":00",
    [KEY_DATE_INSUR_TO]: moment(startValueDate).add(12, "M").utc(true).format(config.DATE_FORMAT),
    [KEY_TIME_INSUR_TO]: moment().hours(showTime).format("H") + ":00",

    [KEY_TOGGLE_TNDSTN]: false,
    [KEY_XTRIEU_NGUOI_VU]: 10,
    [KEY_XTRIEU_TAISAN_VU]: 10,
    [KEY_XTRIEU_TAI_HANHKHACH]: 10,
    [KEY_MIN_XTRIEU_TAI_HANHKHACH]: 10,
    [KEY_XTRIEU_TAI_HANHKHACH_DISABLE]: false,

    [KEY_TOGGLE_VC]: true,
    [KEY_DURATION_BHVC]: 12,
    [KEY_DATE_INSUR_VC_FROM]: moment(startValueDate).utc(true).format(config.DATE_FORMAT),
    [KEY_TIME_INSUR_VC_FROM]: moment().hours(showTime).format("H") + ":00",
    [KEY_DATE_INSUR_VC_TO]: moment(startValueDate).add(12, "M").utc(true).format(config.DATE_FORMAT),
    [KEY_TIME_INSUR_VC_TO]: moment().hours(showTime).format("H") + ":00",
    [KEY_ADDTIONAL_TERM_MAIN]: [],
    [KEY_ADDTIONAL_TERM_ALL]: [],
    [KEY_BH_INCREASE]: 0,
    [KEY_BASE_FEE_INCREASE_MIN]: 0,
    [KEY_BASE_FEE_INCREASE_MAX]: 5,

    [KEY_TOGGLE_TNLPL]: false,
    [KEY_XTRIEU_NGUOI_TREN_XE]: 20,
    [KEY_NUM_IN_CAR]: 1,
    [KEY_MAX_NUM_IN_CAR]: 10,
    [KEY_MIN_NUM_IN_CAR]: 1,

    [KEY_TOGGLE_HH]: false,
    [KEY_GROSS_TON]: .1,
    [KEY_MAX_GROSS_TON]: 10,
    [KEY_MIN_GROSS_TON]: .1,
    [KEY_XTRIEU_HANGHOA_VANCHUYEN]: 10,
})

export const validate = (values) => {
    return sleepingFor().then(() => {
        let errors = {}
        const phoneNumber = values[KEY_PHONE_NUMBER]
        const email = values[KEY_EMAIL]
        const maxNumInCar = values[KEY_MAX_NUM_IN_CAR]
        const minNumInCar = values[KEY_MIN_NUM_IN_CAR]
        const numInCar = values[KEY_NUM_IN_CAR]
        if (values[KEY_TOGGLE_TNLPL]) {
            if (isValueEmpty(numInCar) || !isValueNumber(numInCar)) {
                errors[KEY_NUM_IN_CAR] = config.ALERT_INVALID
                return errors
            }
            if (+numInCar < +minNumInCar || +numInCar > +maxNumInCar) {
                errors[KEY_NUM_IN_CAR] = `Giá trị trong khoảng ${minNumInCar} đến ${maxNumInCar}`
                return errors
            }
        }
        if (phoneNumber && !phoneNumber.match(nullStrRegex) || email && !email.match(nullStrRegex)) return {}

        if (!email || email.match(nullStrRegex)) {
            errors[KEY_EMAIL] = ALERT_INVALID
            return errors
        }
        if (!phoneNumber || phoneNumber.match(nullStrRegex)) {
            errors[KEY_PHONE_NUMBER] = ALERT_INVALID
            return errors
        }

        return errors
    })
}

export const validationSchema = Yup.object().shape({
    [KEY_FULLNAME]: Yup.string()
        .min(3, ALERT_INVALID)
        .required()
    ,
    [KEY_ADDRESS]: Yup.string()
        .min(3, ALERT_INVALID)
        .required()
    ,
    [KEY_PHONE_NUMBER]: Yup.string()
        .matches(phoneNumberRegex, ALERT_INVALID)
    ,
    [KEY_EMAIL]: Yup.string()
        .matches(emailRegex, ALERT_INVALID)
    ,

    [KEY_VEHICLE_TYPE]: Yup.string()
        .required()
    ,
    [KEY_NUMBER_PLATE]: Yup.string()
        .min(3, ALERT_INVALID)
        .required()
})