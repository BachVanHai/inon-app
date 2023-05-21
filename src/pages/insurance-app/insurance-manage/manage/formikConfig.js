import * as Yup from 'yup'
import moment from 'moment'
import { sleepingFor } from '../../../../ultity'
import { getKeyLang } from '../../../../configs/insurance-app'

export const SUCCESS = 'FINISH'
export const FAIL = 'FAIL'
export const NOT_COMPLETE = 'NOT_COMPLETE'
export const APPROVAL = 'APPROVAL'
export const PENDING = 'PENDING'
export const REJECT = 'REJECT'
export const TIMEOUT = 'TIMEOUT'
export const CANCEL = 'CANCELED'
export const CANCELING = 'CANCELING'

export const APPROVED = 'APPROVED'
export const REJECTED = 'REJECT'

export const statusFilterOption = [
    {
        value: 0,
        content: '',
        label: {
            id: getKeyLang(`InsuAll`)
        }
    },
    {
        value: 1,
        content: SUCCESS,
        label: {
            id: getKeyLang(`InsuSUCCESS`)
        }
    },
    {
        value: 2,
        content: FAIL,
        label: {
            id: getKeyLang(`InsuFAIL`)
        }
    },
    {
        value: 3,
        content: NOT_COMPLETE,
        label: {
            id: getKeyLang(`InsuNOT_COMPLETE`)
        }
    },
    {
        value: 4,
        content: APPROVAL,
        label: {
            id: getKeyLang(`InsuAPPROVAL`)
        }
    },
    {
        value: 5,
        content: PENDING,
        label: {
            id: getKeyLang(`InsuPENDING`)
        }
    },
    {
        value: 6,
        content: REJECT,
        label: {
            id: getKeyLang(`InsuREJECT`)
        }
    },
    {
        value: 7,
        content: CANCEL,
        label: {
            id: getKeyLang(`InsuCancel`)
        }
    },
    {
        value: 8,
        content: CANCELING,
        label: {
            id: getKeyLang(`InsuCanceling`)
        }
    },
    {
        value: 9,
        content: TIMEOUT,
        label: {
            id: getKeyLang(`timeout`)
        }
    },
]

export const KEY_ISCHECK = "isCheck"
export const KEY_PARTNER = "owner"

export const KEY_SELECTED_PARTNERS = "selectedPartners"
export const KEY_PENDING_CONTRACTS = "pendingContracts"
export const KEY_SEARCHED_PENDING_CONTRACTS = "searchedPendingContracts"
export const KEY_START_DATE = "startDate"
export const KEY_END_DATE = "endDate"
export const KEY_TOTAL_ELEMENTS = "totalElements"
export const KEY_REVENUE = "revenue"
export const KEY_REASON_REJECT = 'reasonForReject'
export const initialValues = ({
    [KEY_SELECTED_PARTNERS]: [],
    [KEY_PENDING_CONTRACTS]: [],
    [KEY_SEARCHED_PENDING_CONTRACTS]: [],
    [KEY_START_DATE]: moment().subtract(14, 'day').utc(true).toDate(),
    [KEY_END_DATE]: moment().utc(true).toDate(),
    [KEY_TOTAL_ELEMENTS]: 0,
    [KEY_REVENUE]: 0,
    [KEY_REASON_REJECT] : ''

})

export const validate = (values) => {
    return sleepingFor().then(() => {
        return {}
    })
}

export const validationSchema = Yup.object().shape({})