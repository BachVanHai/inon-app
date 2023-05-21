import { BaseAppUltils, HttpClient } from 'base-app'
import {
  API_GET_INSURANCE_LIST_BY_COMPANY,
  API_GET_BONUS_BY_TYPE,
  API_GET_BONUS_BY_PARTNER,
  API_BONUSES,
  API_USERS,
  API_USER_INSURANCE_SETTINGS,
  API_BONUSES_APPROVAL,
  API_GET_BONUS_DRAFT_SETTINGS,
  API_UPDATE_BONUS_HISTORY_PAID, API_EXPORT_BONUS_HISTORY, API_GET_CONTRACT
} from '../../configs/supplement-app'
import { API_BONUSES_HISTORY } from '../../configs/supplement-app'

class BonusService {

  static getInsuranceList(companyId) {
    return HttpClient.get(`${API_GET_INSURANCE_LIST_BY_COMPANY}/${companyId}`, {
      isBackgroudRequest: true,
      params: { uuid: BaseAppUltils.generateUUID() }
    })
  }

  static async getBonusSettingByType(type, companyId) {
    try {
      const res = await HttpClient.get(`${API_GET_BONUS_BY_TYPE}/${companyId}`, {
        params: {
          type,
          uuid: BaseAppUltils.generateUUID()
        }, isBackgroundRequest: true
      })
      if (res.status === 200) {
        return res.data
      } else {
        return []
      }
    } catch (error) {
      return []
    }

  }

  static async getBonusSettingByPartner(id, companyId) {
    try {
      const res = await HttpClient.get(`${API_GET_BONUS_BY_PARTNER}/${id}`, {
        params: { uuid: BaseAppUltils.generateUUID(), companyId },
        isBackgroundRequest: true
      })
      if (res.status === 200) {
        return res.data
      } else {
        return []
      }

    } catch (error) {
      return []
    }
  }

  static async getBonusDraftSettings(id) {
    try {
      const res = await HttpClient.get(`${API_GET_BONUS_DRAFT_SETTINGS}/${id}`, {
        params: { uuid: BaseAppUltils.generateUUID() },
        isBackgroundRequest: true
      })
      if (res.status === 200) {
        return res.data
      } else {
        return []
      }

    } catch (error) {
      return []
    }
  }


  static async getUserInsuranceSettings(id) {
    try {
      const res = await HttpClient.get(`${API_USER_INSURANCE_SETTINGS}/${id}`, { isBackgroudRequest: true })
      if (res.status === 200) {
        return res.data
      } else {
        return []
      }

    } catch (error) {
      return []
    }
  }

  static updateBonuses(bonuses) {
    return HttpClient.post(`${API_BONUSES}`, bonuses)
  }

  static updateBonusDraftSettings(id, bonuses) {
    return HttpClient.post(`${API_GET_BONUS_DRAFT_SETTINGS}/${id}`, bonuses)
  }

  static getAccountSuggestions() {
    return HttpClient.get(API_USERS, { params: { size: 99999 }, isBackgroudRequest: true })
  }

  static getBonusesApproval(searchIds) {
    return HttpClient.get(API_BONUSES_APPROVAL, {
      params: {
        searchIds: searchIds && searchIds.length ? searchIds.join() : null,
        uuid: BaseAppUltils.generateUUID()
      }
    })
  }

  static bonusApproval(id, isApproved) {
    return HttpClient.post(`${API_BONUSES_APPROVAL}/${id}`, null, { params: { isApproved } })
  }

  static getBonusHistoryList(type, startDate, endDate, searchIds) {
    const uuid = BaseAppUltils.generateUUID()
    return HttpClient.get(`${API_BONUSES_HISTORY}/${type}`, { params: { startDate, endDate, searchIds, uuid } })
  }

  static updateBonusHistoryPaid(ids) {
    return HttpClient.put(`${API_UPDATE_BONUS_HISTORY_PAID}`, null, { params: { ids } })
  }

  static exportBonusHistory(startDate, endDate, searchIds, isPartner) {
    const uuid = BaseAppUltils.generateUUID()
    return HttpClient.get(`${API_EXPORT_BONUS_HISTORY}`, {
      params: {
        startDate,
        endDate,
        searchIds: searchIds || null,
        isPartner,
        uuid
      }, responseType: 'blob'
    })
  }

  static getContractInfo(id) {
    return HttpClient.get(`${API_GET_CONTRACT}/${id}`)
  }

}

export default BonusService
