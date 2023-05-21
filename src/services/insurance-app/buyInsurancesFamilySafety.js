import { HttpClient, BaseAppUltils } from 'base-app'
import {
    API_CONTRACT,
    API_CONTRACTS,
    API_INSURANCES,
    API_BENEFICIARIES,
    API_CONTRACTS_FEE,
    API_CONTRACTS_PAY,
    API_CONTRACT_OWNER,
    API_CONTRACT_ISGCN,
    API_AUTHENTICATE_CONTRACTS,
    API_CONTRACTS_VNPAY_CONFIRM,
    API_CHECK_INFO_CONTACT_BY_ID,
    API_CONTRACT_SAVECONTRACT, INSURANCE_TYPE_HOME_SAFETY
} from '../../configs/insurance-app'

class BuyInsurFamilySafety {
    static checkInfoContact(id) {
        return HttpClient.get(`${API_CHECK_INFO_CONTACT_BY_ID}/${id}`,
            { params: { date: new Date().getMilliseconds() } })
    }

    static async confirmVnPay(values) {
        return HttpClient.post(`${API_CONTRACTS_VNPAY_CONFIRM}`, values, { isBackgroundRequest: true })
    }

    static async payContract(contractId, paymentType) {
        return HttpClient.get(`${API_CONTRACTS_PAY}/${contractId}?paymentType=${paymentType}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() }
            })
    }

    static async calculateFeeContract(insurInfo) {
        try {
            // return console.log(`calculateFeeContract.insurInfo`, insurInfo)
            const res = await BuyInsurFamilySafety.updateInsurance(insurInfo)
            if (res.status === 200) {
                const contractRes = await HttpClient.get(`${API_CONTRACTS_FEE}/${insurInfo[0].contractId}`,
                    {
                        params: { uuid: BaseAppUltils.generateUUID() },
                        isBackgroundRequest: true
                    })

                if (contractRes.status === 200) {
                    return contractRes.data
                }
            }
        } catch (err) {
            console.log(`err`, err)
        }
    }

    static async updateInsurance(insurInfo) {
        // return console.log(`insurInfo`, insurInfo)
        return HttpClient.put(`${API_INSURANCES}`, insurInfo)
    }

    static async updateBeneficiaries(beneficiariesInfo) {
        return HttpClient.put(`${API_BENEFICIARIES}/${beneficiariesInfo[0].contractId}`, beneficiariesInfo)
    }

    static async createBeneficiary(contractInfo) {
        return HttpClient.post(`${API_BENEFICIARIES}/${contractInfo[0].contractId}`, contractInfo)
    }

    static async updateContractCompany(contractInfo, contractId, buyerType) {
        return HttpClient.put(`${API_CONTRACT}/${buyerType}/${contractId}`, contractInfo)
    }

    static async updateContract(contractInfo, contractId) {
        return HttpClient.put(`${API_CONTRACT_OWNER}/${contractId}`, contractInfo)
    }

    static async createContract(customerInfo) {
        return HttpClient.post(`${API_CONTRACTS}?contractType=${INSURANCE_TYPE_HOME_SAFETY}`, customerInfo)
    }

    static async deleteContract(contractId) {
        return HttpClient.delete(`${API_CONTRACTS}`, contractId)
    }

    static async saveTemplate(isSave, idContract) {
        return HttpClient.get(`${API_CONTRACT_SAVECONTRACT}/${isSave}/${idContract}`)
    }

    static async getContractIsGcn(printedCertNo) {
        return HttpClient.get(`${API_CONTRACT_ISGCN}`,
            {
                params: {
                    "printedCertNo": printedCertNo,
                    "uuid": BaseAppUltils.generateUUID()
                },
                isBackgroundRequest: true
            })
    }

    static async getContract(contractId) {
        return HttpClient.get(`${API_AUTHENTICATE_CONTRACTS}/${contractId}`,
            {
                params: { uuid: BaseAppUltils.generateUUID() },
                isBackgroundRequest: true
            })
    }
}

export default BuyInsurFamilySafety