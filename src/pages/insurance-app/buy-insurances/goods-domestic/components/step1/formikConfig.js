import React from 'react'
import moment from 'moment'
import * as Yup from 'yup'
import * as config from '../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { isArrayEmpty, isObjEmpty, sleepingFor } from '../../../../../../ultity'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { relationships, RELATIONSHIP_SELF } from './utility'

export const IDTypes = [
  {
    label: <FormattedMessage id={getKeyLang(`IDCMND`)} />,
    content: config.ID_TYPE_CMND,
    value: 1
  },
  {
    label: <FormattedMessage id={getKeyLang(`IDCCCD`)} />,
    content: config.ID_TYPE_CCCD,
    value: 2
  },
  {
    label: <FormattedMessage id={getKeyLang(`IDHC`)} />,
    content: config.ID_TYPE_HC,
    value: 3
  }
]

export const VEHICEL_TYPE = [
  {
    label: <FormattedMessage id={getKeyLang(`goods.railway`)} />,

    value: 1
  },
  {
    label: <FormattedMessage id={getKeyLang(`goods.river`)} />,

    value: 2
  },
  {
    label: <FormattedMessage id={getKeyLang(`goods.sea`)} />,

    value: 3
  },
  {
    label: <FormattedMessage id={getKeyLang(`goods.Road`)} />,

    value: 4
  },
  {
    label: <FormattedMessage id={getKeyLang(`goods.RoadUp`)} />,

    value: 5
  }
]

export const KEY_ADD_VEHICEL = 'vehicels'
export const KEY_ADDTIONAL_PEOPLE = 'KEY_ADDTIONAL_PEOPLE '
export const KEY_VEHICELS = 'vehicels'
export const KEY_GOODS = 'goods'
export const KEY_IC_TYPE = 'icType'
export const KEY_IC_NO = 'icNo'
export const KEY_FULLNAME = 'fullname'
export const KEY_DATE_BIRTH = 'dateOfBirth'
export const KEY_PHONE_NUMBER = 'phoneNumber'
export const KEY_EMAIL = 'email'
export const KEY_GENDER = 'gender'
export const KEY_HAVE_BOUGHT_FOR_ME = 'haveBoughtForMe'
export const KEY_RELATIONSHIP = 'relationship'
export const KEY_BANK = 'bank'
export const KEY_STK = 'accountNumber'
export const KEY_ACCOUNT_NUMBER = 'cardNumber'
export const KEY_CLICKED_CLOSE_POPUP = 'clickedPopup'
export const KEY_BENEFICIARY_FIRST = 'beneficiaryFirst'
export const KEY_BRANCH_NAME = 'branchName'
export const KEY_BANK_NAME = 'bankName'

// BENEFICIARY

export const KEY_FULLNAME_BENEFICIARY = 'fullnameBeneficiary'
export const KEY_EMAIL_BENEFICIARY = 'emailBeneficiary'
export const KEY_PHONE_NUMBER_BENEFICIARY = 'phoneNumberBeneficiary'
export const KEY_CITY_BENEFICIARY = 'citybeneficiary'
export const KEY_DISTRICT_BENEFICIARY = 'districtBeneficiary'
export const KEY_WARD_BENEFICIARY = 'wardbeneficiary'
export const KEY_ADDRESS_BENEFICIARY = 'addressBeneficiary'
// GOODS

export const KEY_GOODS_TYPE = 'goodsType'
export const KEY_GOODS_NAME = 'goodsName'
export const KEY_GOODS_AMOUNT = 'goodsAmount'
export const KEY_GOODS_WEIGHT = 'goodsWeight'
export const KEY_GOODS_VALUE = 'goodsValue'
export const KEY_GOODS_PROCEDURE = 'goodsProcudure'

// VEHICEL

export const KEY_VEHICEL_TYPE = 'vehicelType'
export const KEY_VEHICEL_NAME = 'vehicelName'
export const KEY_VEHICEL_NUMBER_PLATE = 'vehicelNumberPlate'
export const KEY_VEHICEL_CONTRACT_NO = 'vehicelContractNo'
export const KEY_VEHICEL_CONTRACT_NO_DATE = 'vehicelContractNoDate'
export const KEY_VEHICEL_INVOICE_NUMBER = 'vehicelInvoiceNumber'
export const KEY_VEHICEL_INVOICE_NUMBER_DATE = 'vehicelInvoiceNumberDate'

export const KEY_CITY = config.KEY_CITY
export const KEY_DISTRICT = config.KEY_DISTRICT
export const KEY_WARD = config.KEY_WARD
export const KEY_ADDRESS = config.KEY_ADDRESS
export const addtionalVehicelInitValue = {
  [KEY_FULLNAME]: '',
  [KEY_VEHICEL_TYPE]: '',
  [KEY_VEHICEL_NAME]: '',
  [KEY_VEHICEL_NUMBER_PLATE]: '',
  [KEY_VEHICEL_CONTRACT_NO]: '',
  [KEY_VEHICEL_CONTRACT_NO_DATE]: '',
  [KEY_VEHICEL_INVOICE_NUMBER]: '',
  [KEY_VEHICEL_INVOICE_NUMBER_DATE]: ''
}

export const initialValues = {
  [KEY_FULLNAME]: '',
  [KEY_PHONE_NUMBER]: '',
  [KEY_EMAIL]: '',
  [KEY_CITY]: '',
  [KEY_DISTRICT]: '',
  [KEY_WARD]: '',
  [KEY_ADDRESS]: '',
  [KEY_CLICKED_CLOSE_POPUP]: false,
  [KEY_GOODS_NAME]: '',
  [KEY_GOODS_AMOUNT]: '',
  [KEY_GOODS_WEIGHT]: '',
  [KEY_GOODS_VALUE]: '',
  [KEY_GOODS_PROCEDURE]: '',
  [KEY_FULLNAME_BENEFICIARY]: '',
  [KEY_EMAIL_BENEFICIARY]: '',
  [KEY_PHONE_NUMBER_BENEFICIARY]: '',
  [KEY_CITY_BENEFICIARY]: '',
  [KEY_DISTRICT_BENEFICIARY]: '',
  [KEY_WARD_BENEFICIARY]: '',
  [KEY_ADDRESS_BENEFICIARY]: '',

  [KEY_ADD_VEHICEL]: [{ ...addtionalVehicelInitValue }]
}

export const validate = (values) => {
  return sleepingFor().then(() => {
    let errors = {}
    const { [KEY_GOODS_VALUE]: value } = values
    const _values = Number(value.replace(',', ''))
    if (_values < 200000) {
      errors[KEY_GOODS_VALUE] = 'Giá trị tối thiểu 200,000 VNĐ'
    }
    return errors
  })
}

export const validationSchema = Yup.object().shape(
  {
    //============PHƯƠNG TIỆN================
    [KEY_ADD_VEHICEL]: Yup.array().of(
      Yup.object().shape({
        [KEY_VEHICEL_NAME]: Yup.string().required(config.ALERT_EMPTY),
        [KEY_VEHICEL_NUMBER_PLATE]: Yup.string().required(config.ALERT_EMPTY),
        [KEY_VEHICEL_TYPE]: Yup.string().required(config.ALERT_EMPTY),
        [KEY_VEHICEL_CONTRACT_NO]: Yup.string().required(config.ALERT_EMPTY),
        [KEY_VEHICEL_CONTRACT_NO_DATE]: Yup.string().required(
          config.ALERT_EMPTY
        ),
        [KEY_VEHICEL_INVOICE_NUMBER]: Yup.string().required(config.ALERT_EMPTY),
        [KEY_VEHICEL_INVOICE_NUMBER_DATE]: Yup.string().required(
          config.ALERT_EMPTY
        )
      })
    ),
    // ===============NGƯỜI THỤ HƯỞNG===============
    [KEY_FULLNAME_BENEFICIARY]: Yup.string()
      .matches(config.nameRegex, config.ALERT_INVALID)
      .required(config.ALERT_EMPTY),
    [KEY_EMAIL_BENEFICIARY]: Yup.string()
      .matches(config.emailRegex, config.ALERT_INVALID)
      .required(config.ALERT_EMPTY),
    [KEY_PHONE_NUMBER_BENEFICIARY]: Yup.string()
      .matches(config.phoneNumberRegex, config.ALERT_INVALID)
      .required(config.ALERT_EMPTY),
    [KEY_CITY_BENEFICIARY]: Yup.string().required(config.ALERT_EMPTY),
    [KEY_DISTRICT_BENEFICIARY]: Yup.string().required(config.ALERT_EMPTY),
    [KEY_WARD_BENEFICIARY]: Yup.string().required(config.ALERT_EMPTY),
    ...config.getDefault_addressessSchema(
      KEY_CITY_BENEFICIARY,
      KEY_DISTRICT_BENEFICIARY,
      KEY_WARD_BENEFICIARY
    ),
    // ================BÊN MUA BẢO HIỂM=============
    [KEY_FULLNAME]: Yup.string()
      .matches(config.nameRegex, config.ALERT_INVALID)
      .required(config.ALERT_EMPTY),
    [KEY_PHONE_NUMBER]: Yup.string()
      .matches(config.phoneNumberRegex, config.ALERT_INVALID)
      .required(config.ALERT_EMPTY),
    [KEY_EMAIL]: Yup.string()
      .matches(config.emailRegex, config.ALERT_INVALID)
      .required(config.ALERT_EMPTY),
    [KEY_CITY]: Yup.string().required(config.ALERT_EMPTY),
    [KEY_DISTRICT]: Yup.string().required(config.ALERT_EMPTY),
    [KEY_WARD]: Yup.string().required(config.ALERT_EMPTY),
    ...config.getDefault_addressessSchema(KEY_CITY, KEY_DISTRICT, KEY_WARD),
    // =================HÀNG HOÁ======================
    [KEY_GOODS_TYPE]: Yup.string().required(config.ALERT_EMPTY),
    [KEY_GOODS_NAME]: Yup.string().required(config.ALERT_EMPTY),
    // [KEY_GOODS_AMOUNT]: Yup.string().required(config.ALERT_EMPTY),
    // [KEY_GOODS_WEIGHT]: Yup.string().required(config.ALERT_EMPTY),

    [KEY_GOODS_AMOUNT]: Yup.string().when(KEY_GOODS_WEIGHT, {
      is: undefined,
      then: Yup.string().required(config.ALERT_EMPTY)
    }),
    [KEY_GOODS_WEIGHT]: Yup.string().when(KEY_GOODS_AMOUNT, {
      is: undefined,
      then: Yup.string().required(config.ALERT_EMPTY)
    }),
    [KEY_GOODS_VALUE]: Yup.string().required(config.ALERT_EMPTY),
    [KEY_GOODS_PROCEDURE]: Yup.string().required(config.ALERT_EMPTY)
  },
  [KEY_GOODS_AMOUNT, KEY_GOODS_WEIGHT]
)
