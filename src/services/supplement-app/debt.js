import {
    API_GET_LIST_ALL_DEBT_ACCOUNT,
    API_GET_LIST_ALL_PARTNERS_DEBT_ACCOUNT,
    API_GET_LIST_ACCOUNTS_PENDING,
    API_CREATE_DEBT_ACCOUNT,
    API_APPROVAL_ACCOUNT,
    API_CONFIRM_BANK_TRANS,
    API_EDIT_ACOUNT,
    API_DELETE_DEBT_CONTRACT,
    API_DELETE_DRAFT_DEBT_CONTRACT,
    API_MY_DEBT_ACCOUNT,
    API_CONTRACT_MANAGER_DEBT_CONTRACTS,
} from '../../configs/supplement-app'
import { BaseAppUltils, HttpClient } from 'base-app'
import { getBasePath, hasRequestFail } from '../../ultity'
import { NAME_BUY_INSURANCES_CAR, NAME_BUY_INSURANCES_FAMILY_SAFETY, NAME_BUY_INSURANCES_PERSONAL_HOME } from '../../configs/insurance-app'

class DebtService {
    static getMyDebtAccount() {
        return HttpClient.get(`${API_MY_DEBT_ACCOUNT}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static getListAllDebtAccount() {
        return HttpClient.get(`${API_GET_LIST_ALL_DEBT_ACCOUNT}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static getListAllPartnersDebtAccount() {
        return HttpClient.get(`${API_GET_LIST_ALL_PARTNERS_DEBT_ACCOUNT}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static getListAccountsPending() {
        return HttpClient.get(`${API_GET_LIST_ACCOUNTS_PENDING}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }

    static async getListDebtContract(userId) {
        try {
            let mergedList = []

            let res = await Promise.all([
                HttpClient.get(`${getBasePath(NAME_BUY_INSURANCES_CAR)}${API_CONTRACT_MANAGER_DEBT_CONTRACTS}/${userId}`,
                    {
                        params: { uuid: BaseAppUltils.generateUUID() },
                        isBackgroundRequest: true
                    }),
                HttpClient.get(`${getBasePath(NAME_BUY_INSURANCES_FAMILY_SAFETY)}${API_CONTRACT_MANAGER_DEBT_CONTRACTS}/${userId}`,
                    {
                        params: { uuid: BaseAppUltils.generateUUID() },
                        isBackgroundRequest: true
                    }),
                HttpClient.get(`${getBasePath(NAME_BUY_INSURANCES_PERSONAL_HOME)}${API_CONTRACT_MANAGER_DEBT_CONTRACTS}/${userId}`,
                    {
                        params: { uuid: BaseAppUltils.generateUUID() },
                        isBackgroundRequest: true
                    })
            ])

            for (let item of res) {
                if (!hasRequestFail(item.status)) {
                    mergedList.push(...item.data.content)
                }
            }

            return mergedList
        } catch (err) {
            console.log(`err`, err)
            return false
        }
    }

    static async deleteDraftDebtContract(id) {
        // return console.log(`deleteDraftDebtContract.accountId`, id)
        try {
            const res = await HttpClient.delete(`${API_DELETE_DRAFT_DEBT_CONTRACT}/${id}`)
            if (res.status === 204) {
                return true
            }
            return false
        } catch (err) {
            console.log(`err`, err)
            return false
        }
    }

    static async deleteDebtContract(accountId) {
        // return console.log(`deleteDebtContract.accountId`, accountId)
        try {
            const res = await HttpClient.delete(`${API_DELETE_DEBT_CONTRACT}/${accountId}`)
            if (res.status === 204) {
                return true
            }
            return false
        } catch (err) {
            console.log(`err`, err)
            return false
        }
    }

    static async confirmBankTrans(contractId, bankTransCode) {
        // return console.log(`confirmBankTrans.contractId, bankTransCode`, contractId, bankTransCode)
        try {
            await HttpClient.post(`${API_CONFIRM_BANK_TRANS}`,
                {
                    contractId,
                    bankTransCode
                })
        } catch (err) {
            console.log(`err`, err)
        }
    }

    static async editDebtAccount(id, transactionLimit, dailyLimit, monthlyLimit, dueDateType, dueValue, applyDate) {
        // return console.log(`editDebtAccount`, id, transactionLimit, dailyLimit, monthlyLimit, dueDateType, dueValue, applyDate)
        try {
            const res = await HttpClient.put(`${API_EDIT_ACOUNT}`,
                {
                    id,
                    dueDateType,
                    transactionLimit,
                    dailyLimit,
                    monthlyLimit,
                    "yearlyLimit": 10000000005,
                    applyDate,
                    dueValue
                })
            if (res.status === 200) {
                return res.data
            }
            return false
        } catch (err) {
            console.log(`err`, err)
            return false
        }
    }

    static async approvalAccount(id, approvalStatus, reason) {
        // return console.log(`approvalAccount.id.approvalStatus`, id, approvalStatus, reason)
        let opt = {
            id,
            approvalStatus,
        }
        if (reason) {
            opt = {
                id,
                approvalStatus,
                reason
            }
        }
        try {
            const res = await HttpClient.post(`${API_APPROVAL_ACCOUNT}`, opt)
            if (res.status === 200) {
                return res.data
            }
            return false
        } catch (err) {
            console.log(`err`, err)
            return false
        }
    }

    static async createDebtAccount(userId, dueDateType, dueValue, transactionLimit, dailyLimit, monthlyLimit, yearlyLimit, applyDate) {
        // return console.log(`createDebtAccount`, userId, dueDateType, dueValue, transactionLimit, dailyLimit, monthlyLimit, yearlyLimit, applyDate)
        try {
            const res = await HttpClient.post(`${API_CREATE_DEBT_ACCOUNT}`,
                {
                    userId,
                    dueDateType,
                    transactionLimit,
                    dailyLimit,
                    monthlyLimit,
                    yearlyLimit,
                    applyDate,
                    dueValue
                })
            if (res.status === 200) {
                return res.data
            }
            return false
        } catch (err) {
            console.log(`err`, err)
            return false
        }
    }
}

export default DebtService
