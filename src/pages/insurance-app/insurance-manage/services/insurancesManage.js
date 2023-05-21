import { BaseAppUltils, HttpClient } from 'base-app'
import * as _config from '../../../../configs/insurance-app'
import moment from 'moment'
import FileSaver from 'file-saver'
import { DATE_TIME_ZONE_FORMAT } from '../../../../configs/elite-app'

class ManageInsurance {
    // example "http://localhost:8126/api/contract-manager/my-contracts/PHC?fromDate=2021-06-22T08:22:41.673Z&toDate=2021-09-25T08:22:41.673Z"
    static getPersonalContract(basePath, insuranceType, dateInfo) {
        return HttpClient.get(`${basePath}${_config.API_CONTRACT_MANAGER_PERSONAL_CONTRACTS}/${insuranceType}`,
            {
                params: {
                    fromDate: dateInfo[0],
                    toDate: dateInfo[1],
                    uuid: BaseAppUltils.generateUUID(),
                }
            })
    }
    // example "http://localhost:8126/api/contract-manager/partner-contracts/PHC?fromDate=2021-06-22T08:22:41.673Z&toDate=2021-09-22T08:22:41.673Z"
    static getPartnerContracts(basePath, insuranceType, dateInfo) {
        return HttpClient.get(`${basePath}${_config.API_CONTRACT_MANAGER_PARTNER_CONTRACTS}/${insuranceType}`,
            {
                params: {
                    fromDate: dateInfo[0],
                    toDate: dateInfo[1],
                    uuid: BaseAppUltils.generateUUID(),
                }
            }
        )
    }
    // example "http://localhost:8126/api/contract-manager/all-contracts/PHC?fromDate=2021-06-22T08:22:41.673Z&toDate=2021-09-25T08:22:41.673Z"
    static getAllContracts(basePath, insuranceType, dateInfo) {
        return HttpClient.get(`${basePath}${_config.API_CONTRACT_MANAGER_ALL_CONTRACTS}/${insuranceType}`,
            {
                params: {
                    fromDate: dateInfo[0],
                    toDate: dateInfo[1],
                    uuid: BaseAppUltils.generateUUID(),
                }
            }
        )
    }
    /**
     * @example
        POST: http://localhost:8115/api/contract-manager/cancel-contract
        body:
        {
            "id":"07276bbf-a6e4-4752-9443-d60aded2c55d",
            "deleted":true (optional)
        }
    */
    static updatePrintedCertContract(basePath, bodyObj) {
        return HttpClient.post(`${basePath}${_config.API_CONTRACT_MANAGER_CANCEL_CONTRACT}`, bodyObj)
    }

    static deleteContract(basePath, contractId) {
        return HttpClient.delete(`${basePath}${_config.API_CONTRACT_MANAGER}`,
            {
                params: {
                    contractId: contractId,
                }
            }
        )
    }
    static cancelContract ( basePath , id){
        return HttpClient.post(`${basePath}/${_config.API_CANCEL_CONTRACT}?contractId=${id}`,
    )
    }
    // example "http://localhost:8126/api/contract-manager/approval?approvalStatus=APPROVED"
    /**
     * @param {string} basePath 
     * @param {boolean} approvalStatus 
     * @param {Array} contractIds 
     * @returns 
     */
    static approvalContract(basePath, approvalStatus, contractIds, contractType) {
        return HttpClient.post(`${basePath}${_config.API_CONTRACT_MANAGER_APPROVAL}/${contractType}?approvalStatus=${approvalStatus}`, contractIds)
    }

    static async exportContracts(basePath, contractType, fromDate, toDate) {
        const res =  await HttpClient.get(`${basePath}${_config.API_CONTRACT_MANAGER_EXPORT}/${contractType}`,
          {
              params: {
                  fromDate ,
                  toDate,
                  uuid : BaseAppUltils.generateUUID()
              }
          }
        );
        if (res.status === 200) {
            const TODAY = moment().format('YYYY-MM-DD')
            const blob = new Blob([res.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            FileSaver.saveAs(
              blob,
              `danh_sach_hop_dong_${TODAY}.xlsx`
            )
        }
    }
}

export default ManageInsurance
