import Utils from '../../../../../../configs/insurance-app/constants/Utils'
import moment from 'moment'
import { convertStrToNumber } from '../../../../../../ultity'
import {
    KEY_BH_INCREASE, KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_DATE_INSUR_VC_FROM, KEY_DATE_INSUR_VC_TO, KEY_DURATION_BBTNDS,
    KEY_DURATION_BHVC, KEY_GROSS_TON, KEY_NUM_IN_CAR, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO, KEY_TIME_INSUR_VC_FROM, KEY_TIME_INSUR_VC_TO, KEY_TOGGLE_BBTNDS,
    KEY_TOGGLE_HH, KEY_TOGGLE_TNDSTN, KEY_TOGGLE_TNLPL, KEY_TOGGLE_VC, KEY_XTRIEU_HANGHOA_VANCHUYEN, KEY_XTRIEU_NGUOI_TREN_XE, KEY_XTRIEU_NGUOI_VU,
    KEY_XTRIEU_TAISAN_VU, KEY_XTRIEU_TAI_HANHKHACH
} from './formikConfig'
export const getDefault_updateCompanyIdObj = (contractId, companyId) => {
    return ({
        id: contractId,
        companyId: companyId
    })
}

export const setupDateInitValueFormat = (setFieldValue, values) => {
    const convertDate = moment().format(Utils.DATE_FORMAT)
    const convertedDateTo = moment().add(values[KEY_DURATION_BBTNDS], 'M').format(Utils.DATE_FORMAT)

    setFieldValue(KEY_DATE_INSUR_FROM, convertDate)
    setFieldValue(KEY_DATE_INSUR_TO, convertedDateTo)

    const convertDateVC = moment().format(Utils.DATE_FORMAT)
    const convertedDateToVC = moment().add(values[KEY_DURATION_BHVC], 'M').format(Utils.DATE_FORMAT)

    setFieldValue(KEY_DATE_INSUR_VC_FROM, convertDateVC)
    setFieldValue(KEY_DATE_INSUR_VC_TO, convertedDateToVC)
}

export const fillMultipleStepInfo = (setFieldValue, info) => {
    setupDateInitValueFormat(setFieldValue, info)

    Object.keys(info).forEach(prop => {
        if (prop !== KEY_DATE_INSUR_FROM &&
            prop !== KEY_DATE_INSUR_TO &&
            prop !== KEY_DATE_INSUR_VC_FROM &&
            prop !== KEY_DATE_INSUR_VC_TO) {
            setFieldValue(prop, info[prop])
        }
    })
}

export const fillInsuranceInfo = (contractInfo, formik) => {
    return contractInfo.insurances.map((insurance) => {
        let _time_from = formik.values[KEY_TIME_INSUR_FROM]
        let _time_to = formik.values[KEY_TIME_INSUR_TO]
        let _time_vc_from = formik.values[KEY_TIME_INSUR_VC_FROM]
        let _time_vc_to = formik.values[KEY_TIME_INSUR_VC_TO]
        if (typeof formik.values[KEY_TIME_INSUR_FROM] == "object") {
            _time_from = moment(formik.values[KEY_TIME_INSUR_FROM]).format("HH:mm")
            _time_to = moment(formik.values[KEY_TIME_INSUR_TO]).format("HH:mm")
            _time_vc_from = moment(formik.values[KEY_TIME_INSUR_VC_FROM]).format("HH:mm")
            _time_vc_to = moment(formik.values[KEY_TIME_INSUR_VC_TO]).format("HH:mm")
        }
        switch (insurance.insuranceCode) {
            case "CAR_TNDS":
                insurance.isEnable = formik.values[KEY_TOGGLE_BBTNDS]
                if (formik.values[KEY_TOGGLE_BBTNDS]) {
                    insurance.duration = formik.values[KEY_DURATION_BBTNDS]

                    insurance.startValueDate = Utils.formatDateTime(formik.values[KEY_DATE_INSUR_FROM] + " " + _time_from)
                    insurance.endValueDate = Utils.formatDateTime(moment(formik.values[KEY_DATE_INSUR_FROM])
                        .add(formik.values[KEY_DURATION_BBTNDS], 'M').format(Utils.DATE_FORMAT) + " " + _time_to)
                }
                return insurance

            case "CAR_TNDS_TN":
                insurance.isEnable = formik.values[KEY_TOGGLE_TNDSTN]
                if (formik.values[KEY_TOGGLE_TNDSTN]) {
                    insurance.duration = formik.values[KEY_DURATION_BBTNDS]
                    insurance.startValueDate = Utils.formatDateTime(formik.values[KEY_DATE_INSUR_FROM] + " " + _time_from)
                    insurance.endValueDate = Utils.formatDateTime(moment(formik.values[KEY_DATE_INSUR_FROM])
                        .add(formik.values[KEY_DURATION_BBTNDS], 'M').format(Utils.DATE_FORMAT) + " " + _time_to)
                    insurance.liability1 = Number.parseInt(formik.values[KEY_XTRIEU_NGUOI_VU]) * 1_000_000
                    insurance.liability2 = Number.parseInt(formik.values[KEY_XTRIEU_TAISAN_VU]) * 1_000_000
                    insurance.liability3 = Number.parseInt(formik.values[KEY_XTRIEU_TAI_HANHKHACH]) * 1_000_000
                }
                return insurance

            case "CAR_VATCHAT":
                insurance.isEnable = formik.values[KEY_TOGGLE_VC]
                if (formik.values[KEY_TOGGLE_VC]) {
                    insurance.duration = formik.values[KEY_DURATION_BHVC]

                    insurance.startValueDate = Utils.formatDateTime(formik.values[KEY_DATE_INSUR_VC_FROM] + " " + _time_vc_from)
                    insurance.endValueDate = Utils.formatDateTime(moment(formik.values[KEY_DATE_INSUR_VC_FROM])
                        .add(formik.values[KEY_DURATION_BHVC], 'M').format(Utils.DATE_FORMAT) + " " + _time_vc_to)
                    insurance.value2 = formik.values[KEY_BH_INCREASE]
                }
                return insurance

            case "CAR_CONNGUOI":
                insurance.isEnable = formik.values[KEY_TOGGLE_TNLPL]
                if (formik.values[KEY_TOGGLE_TNLPL]) {
                    insurance.duration = formik.values[KEY_DURATION_BBTNDS]

                    if (formik.values[KEY_TOGGLE_VC]) {
                        insurance.startValueDate = Utils.formatDateTime(formik.values[KEY_DATE_INSUR_VC_FROM] + " " + _time_vc_from)
                        insurance.endValueDate = Utils.formatDateTime(moment(formik.values[KEY_DATE_INSUR_VC_FROM])
                            .add(formik.values[KEY_DURATION_BHVC], 'M').format(Utils.DATE_FORMAT) + " " + _time_vc_to)
                    } else {
                        insurance.startValueDate = Utils.formatDateTime(formik.values[KEY_DATE_INSUR_FROM] + " " + _time_from)
                        insurance.endValueDate = Utils.formatDateTime(moment(formik.values[KEY_DATE_INSUR_FROM])
                            .add(formik.values[KEY_DURATION_BBTNDS], 'M').format(Utils.DATE_FORMAT) + " " + _time_to)
                    }
                    insurance.liability1 = Number.parseInt(formik.values[KEY_XTRIEU_NGUOI_TREN_XE]) * 1_000_000
                    insurance.count1 = convertStrToNumber(formik.values[KEY_NUM_IN_CAR])
                }
                return insurance

            case "CAR_HANGHOA":
                insurance.isEnable = formik.values[KEY_TOGGLE_HH]
                if (formik.values[KEY_TOGGLE_HH]) {
                    insurance.duration = formik.values[KEY_DURATION_BBTNDS]

                    if (formik.values[KEY_TOGGLE_VC]) {
                        insurance.startValueDate = Utils.formatDateTime(formik.values[KEY_DATE_INSUR_VC_FROM] + " " + _time_vc_from)
                        insurance.endValueDate = Utils.formatDateTime(moment(formik.values[KEY_DATE_INSUR_VC_FROM])
                            .add(formik.values[KEY_DURATION_BHVC], 'M').format(Utils.DATE_FORMAT) + " " + _time_vc_to)
                    } else {
                        insurance.startValueDate = Utils.formatDateTime(formik.values[KEY_DATE_INSUR_FROM] + " " + _time_from)
                        insurance.endValueDate = Utils.formatDateTime(moment(formik.values[KEY_DATE_INSUR_FROM])
                            .add(formik.values[KEY_DURATION_BBTNDS], 'M').format(Utils.DATE_FORMAT) + " " + _time_to)
                    }
                    insurance.liability1 = Number.parseInt(formik.values[KEY_XTRIEU_HANGHOA_VANCHUYEN]) * 1_000_000
                    insurance.count1 = Number.parseFloat(formik.values[KEY_GROSS_TON])
                    formik.setFieldValue(KEY_GROSS_TON, Number.parseFloat(formik.values[KEY_GROSS_TON]))
                }
                return insurance
        }
        
        return insurance
    })
}