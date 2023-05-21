import * as Yup from 'yup'
import moment from 'moment'
import { formatingISOStringDate } from '../../../../ultity'

export let ALERT_EMPTY = "Không được để trống"
export let ALERT_INVALID = "Trường thông tin nhập chưa chính xác"
export let ALERT_MIN = "Cần nhập từ 3 ký tự trở lên"
export let ALERT_MIN_VND = "Cần đạt 1 triệu trở lên"
export let TEXT_NO_VALUE = " "
export let VAL_MAX_AGE_NO_REQUIRED = 14
export let getDefault_maxAlert = (maxValue = 25, unit = "năm") => {
    return `Cần nhỏ hơn hoặc bằng ${maxValue} ${unit}`
}
export let getDefault_minAlert = (minVal = 25, unit = "năm") => {
    return `Cần lớn hơn hoặc bằng ${minVal} ${unit}`
}
export let GENDER_TYPE_MALE = 'MALE'
export let GENDER_TYPE_FEMALE = 'FEMALE'
export let GENDER_TYPE_OTHER = 'OTHER'
export let KEY_TOTAL_FEE_VAT = "totalFeeVAT"
export let KEY_TOTAL_FEE = "totalFee"
export let DATE_FORMAT = "YYYY-MM-DD"
/*
@paymentType
*/
export let PAYMENT_TYPE_ATM = "ATM"
export let PAYMENT_TYPE_VISA_MASTER = "VISA_MASTER"
export let PAYMENT_TYPE_QR_CODE = "QR_CODE"
export let PAYMENT_TYPE_FUND_TRANSFER = "FUND_TRANSFER"
export let PAYMENT_TYPE_DEBT = "DEBT"
export let PAYMENT_TYPE_BONUS = "BONUS"
/*
@id-type
*/
export let ID_TYPE_CMND = 'CMND'
export let ID_TYPE_CCCD = 'CCCD'
export let ID_TYPE_HC = 'HOCHIEU'
export let ID_TYPE_MST = 'MST'
/* 
@regex 
*/
export let numberRegex = /^\d+$/
export let nullStrRegex = /^\s*$/
export let phoneNumberRegex = /^\b(84|0[3|5|7|8|9])+([0-9]{8})\b$/g
export let emailRegex = /^[a-zA-Z0-9][^@;:"'^[\]{}\\/*()%#$!\s]*@\w+\.[^@;:"'^[\]{}\\/*()%#$!\s]+$/
export let nameRegex = /^([ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếềìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý0-9A-Za-z_. ])+$/g
export let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*])).{8,}$/gm
export let personalIdRegex = /^(\d{9}|\d{12})$/ /* CMND */
export let citizenIndentifyRegex = /^(\d{12})$/ /* CCCD */
export let passportRegex = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/ /* HC */
export let mstRegex = citizenIndentifyRegex

export const getDefault_templateName = (templateName = "name_here_") => {
    return templateName + formatingISOStringDate(moment().utc(true).toISOString())[0].replace(/(?=.+)\s+(?=.+)/, "-")
}

export const getDefault_validateSchmaIcType = (KEY_IC_TYPE, KEY_DATE_BIRTH) => {
    return {
        [KEY_IC_TYPE]: Yup.string()
            .when(KEY_DATE_BIRTH, (value) => {
                if (value && moment(value).isAfter(moment().subtract(VAL_MAX_AGE_NO_REQUIRED, 'y'))) {
                    return Yup.string().nullable(true)
                }
                return Yup.string().required(ALERT_EMPTY)
            })
        ,
    }
}

export const getIcNo_icType_schema = (KEY_IC_TYPE) => {
    return Yup.string()
        .when(KEY_IC_TYPE, (value) => {
            if (value === ID_TYPE_CMND) {
                return Yup.string()
                    .matches(personalIdRegex, ALERT_INVALID)
                    .required(ALERT_EMPTY)
            }
            if (value === ID_TYPE_CCCD) {
                return Yup.string()
                    .matches(citizenIndentifyRegex, ALERT_INVALID)
                    .required(ALERT_EMPTY)
            }
            if (value === ID_TYPE_HC) {
                return Yup.string()
                    .matches(passportRegex, ALERT_INVALID)
                    .required(ALERT_EMPTY)
            }
            if (value === ID_TYPE_MST) {
                return Yup.string()
                    // .matches(citizenIndentifyRegex, ALERT_INVALID)
                    .required(ALERT_EMPTY)
            }
        })
}

const getIcNo_dateOfBirth_schema = (KEY_DATE_BIRTH, KEY_IC_TYPE) => {
    return Yup.string()
        .when(KEY_DATE_BIRTH, {
            is: (value) => value && moment(value).isAfter(moment().subtract(VAL_MAX_AGE_NO_REQUIRED, 'y')),
            then: Yup.string().nullable(true),
            otherwise: getIcNo_icType_schema(KEY_IC_TYPE)
        })
}
/*
@validate icNo
*/
/** KEY_DATE_BIRTH is optional
    @example
      return ({
        [KEY_IC_NO]: Yup.string()
            .when(KEY_IC_TYPE, (value) => {
                if (value === ID_TYPE_CMND) {
                    return Yup.string()
                        .matches(personalIdRegex, ALERT_INVALID)
                        .required(ALERT_EMPTY)
                }
                .......
            })
    })
 */
export const getDefault_validateSchemaIcNo = (KEY_IC_NO, KEY_IC_TYPE, KEY_DATE_BIRTH) => {
    return ({
        [KEY_IC_NO]: Yup.string()
            .concat(KEY_DATE_BIRTH ?
                getIcNo_dateOfBirth_schema(KEY_DATE_BIRTH, KEY_IC_TYPE)
                : getIcNo_icType_schema(KEY_IC_TYPE)
            )
    })
}
/* 
@validate addresses
*/
export let KEY_CITY = "city"
export let KEY_DISTRICT = "district"
export let KEY_WARD = "ward"
export let KEY_ADDRESS = "detail"
/**
 * 
 * @returns [KEY_CITY, KEY_DISTRICT, KEY_WARD, KEY_ADDRESS]
 */
export let getDefault_keyAddresses = () => {
    return [KEY_CITY, KEY_DISTRICT, KEY_WARD, KEY_ADDRESS]
}
/**
    @example
    export const validate = (values) => {
        return sleepingFor().then(() => {
            let errors = {}
            const { [KEY_ADDTIONAL_PEOPLE]: _addtinalPeople } = values

            errors = config.getDefault_addressValidate(KEY_CITY, KEY_ADDRESS)(values)
            if (!isObjEmpty(errors)) return errors // return errors immediately to avoid conflict

            _addtinalPeople.forEach((elt, index) => {
                if (!elt[KEY_CITY] || elt[KEY_CITY].match(config.nullStrRegex)) {
                    if (!elt[KEY_ADDRESS] || elt[KEY_ADDRESS].match(config.nullStrRegex)) {
                        if (isArrayEmpty(errors[KEY_ADDTIONAL_PEOPLE])) {
                            errors[KEY_ADDTIONAL_PEOPLE] = []
                            for (let i = 0; i < _addtinalPeople.length; ++i) {
                                errors[KEY_ADDTIONAL_PEOPLE].push({})
                            }
                        }
                        errors[KEY_ADDTIONAL_PEOPLE][index][KEY_ADDRESS] = config.ALERT_INVALID
                    }
                }
            })
            return errors
        })
    }
 */
export let getDefault_addressValidate = (KEY_CITY, KEY_ADDRESS) => {
    return (values) => {
        const errors = {}
        const { [KEY_CITY]: city, [KEY_ADDRESS]: address } = values

        if (!city) {
            if (!address) {
                errors[KEY_ADDRESS] = ALERT_EMPTY
                return errors
            }
            if (address.trim().length < 3) {
                errors[KEY_ADDRESS] = ALERT_MIN
            }
        }
        return errors
    }
}

/**
    @example
     return ({
        [KEY_DISTRICT]: Yup.string()
            .when(KEY_CITY, (value) => {
                if (value && value.trim().length > 0) {
                    return Yup.string()
                        .required(ALERT_EMPTY)
                }
                return Yup.string().nullable(true)
            })
        ,
            ....
    })
 */
export let getDefault_addressessSchema = (KEY_CITY, KEY_DISTRICT, KEY_WARD) => {
    return ({
        [KEY_DISTRICT]: Yup.string()
            .when(KEY_CITY, (value) => {
                if (value && value.trim().length > 0) {
                    return Yup.string()
                        .required(ALERT_EMPTY)
                }
                return Yup.string().nullable(true)
            })
        ,
        [KEY_WARD]: Yup.string()
            .when(KEY_DISTRICT, (value) => {
                if (value && value.trim().length > 0) {
                    return Yup.string()
                        .required(ALERT_EMPTY)
                }
                return Yup.string().nullable(true)
            })
        ,
    })
}

/* 
@select style 
*/
export let selectErrorStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}

export let selectNormalStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}

export let selectNormalStyleRemoveLeft = {
    control: (provided) => ({
        ...provided,
        // borderLeftStyle: "hidden",
        borderRadius: "0px 5px 5px 0px !important"
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}

export let selectNormalStylesRemoveRight = {
    control: (provided) => ({
        ...provided,
        borderRadius: "5px 0px 0px 5px !important"
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        }
    }
}

export let selectErrorStyleRemoveRight = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: "5px 0px 0px 5px !important",
        borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}

export let selectErrorStylesRemoveLeft = {
    control: (provided, state) => ({
        ...provided,
        borderLeftStyle: "hidden",
        borderRadius: "0px 5px 5px 0px !important",
        borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}