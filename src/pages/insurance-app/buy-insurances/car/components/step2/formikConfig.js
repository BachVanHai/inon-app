import moment from 'moment'
import * as Yup from 'yup'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { isValueEmpty, isValueNumber, sleepingFor, updateInsuranceEffectiveDate } from '../../../../../../ultity'

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
    [KEY_NUM_IN_CAR]: 0,
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
        let {
            [KEY_BH_INCREASE]: baseFeeIncrease,
            [KEY_BASE_FEE_INCREASE_MIN]: baseFeeIncreaseMin,
            [KEY_BASE_FEE_INCREASE_MAX]: baseFeeIncreaseMax,
            [KEY_GROSS_TON]: grossTon,
            [KEY_MAX_GROSS_TON]: maxGrossTon,
            [KEY_MIN_GROSS_TON]: minGrossTon,
            [KEY_NUM_IN_CAR]: numInCar,
            [KEY_MAX_NUM_IN_CAR]: maxNumInCar,
            [KEY_MIN_NUM_IN_CAR]: minNumInCar,
        } = values

        if (values[KEY_TOGGLE_VC]) {
            if (isValueEmpty(baseFeeIncrease) || !isValueNumber(baseFeeIncrease) ||
                +baseFeeIncrease < +baseFeeIncreaseMin || +baseFeeIncrease > +baseFeeIncreaseMax) {
                errors[KEY_BH_INCREASE] = `Mức phí tăng thêm không quá ${baseFeeIncreaseMax}%`
                return errors
            }
        }
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
        if (values[KEY_TOGGLE_HH]) {
            if (isValueEmpty(grossTon) || !isValueNumber(grossTon)) {
                errors[KEY_GROSS_TON] = config.ALERT_INVALID
                return errors
            }
            if (+grossTon < +minGrossTon || +grossTon > +maxGrossTon) {
                errors[KEY_GROSS_TON] = `Giá trị trong khoảng ${minGrossTon} đến ${maxGrossTon}`
                return errors
            }
        }

        return errors
    })
}

export const validationSchema = Yup.object().shape({})