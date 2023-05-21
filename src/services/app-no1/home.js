import { BaseAppUltils, HttpClient } from 'base-app'
import { BH_URL, ELASTICSEARCH_URL } from '../../configs/app-no1'

class HomeService {

  static getRevenueChart(request) {
    // return HttpClient.post(`${ELASTICSEARCH_URL}/revenue-chart`, request, {isBackgroundRequest: true})
    return [{"name":1,"revenueChartData":{"CC":0,"ALL":0,"VTA":0,"FH":0,"MC":0,"HC":0},"contractChartData":{},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":2,"revenueChartData":{"CC":0,"ALL":76000.0,"VTA":0,"FH":0,"MC":76000.0,"HC":0},"contractChartData":{},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":3,"revenueChartData":{"CC":0,"ALL":0,"VTA":0,"FH":0,"MC":0,"HC":0},"contractChartData":{},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":4,"revenueChartData":{"CC":0,"ALL":76000.0,"VTA":0,"FH":0,"MC":76000.0,"HC":0},"contractChartData":{},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":5,"revenueChartData":{"CC":0,"ALL":0,"VTA":0,"FH":0,"MC":0,"HC":0},"contractChartData":{},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":6,"revenueChartData":{"CC":0,"ALL":76000.0,"VTA":0,"FH":0,"MC":76000.0,"HC":0},"contractChartData":{},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":7,"revenueChartData":{"CC":0,"ALL":0,"VTA":0,"FH":0,"MC":0,"HC":0},"contractChartData":{},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}}]
  }

  static getDebtChart(request) {
    return HttpClient.post(`${ELASTICSEARCH_URL}/debt-chart`, request, {isBackgroundRequest: true})
  }

  static getBonusChart(request) {
    // return HttpClient.post(`${ELASTICSEARCH_URL}/bonus-chart`, request, {isBackgroundRequest: true})
    return [{"name":1,"revenueChartData":{"ALL":0},"contractChartData":{},"bonusChartData":{"CC":0,"ALL":30000,"VTA":0,"FH":0,"MC":30000,"HC":0},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":2,"revenueChartData":{"ALL":0},"contractChartData":{},"bonusChartData":{"CC":0,"ALL":0,"VTA":0,"FH":0,"MC":0,"HC":0},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":3,"revenueChartData":{"ALL":0},"contractChartData":{},"bonusChartData":{"CC":0,"ALL":30000,"VTA":0,"FH":0,"MC":30000,"HC":0},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":4,"revenueChartData":{"ALL":0},"contractChartData":{},"bonusChartData":{"CC":0,"ALL":0,"VTA":0,"FH":0,"MC":0,"HC":0},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":5,"revenueChartData":{"ALL":0},"contractChartData":{},"bonusChartData":{"CC":0,"ALL":0,"VTA":0,"FH":0,"MC":0,"HC":0},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":6,"revenueChartData":{"ALL":0},"contractChartData":{},"bonusChartData":{"CC":0,"ALL":30000,"VTA":0,"FH":0,"MC":30000,"HC":0},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":7,"revenueChartData":{"ALL":0},"contractChartData":{},"bonusChartData":{"CC":0,"ALL":76000,"VTA":0,"FH":0,"MC":76000,"HC":0},"debtChartData":{},"newAccounts":{},"totalAccounts":{}}]
  }

  static getContractChart(request) {
    // return HttpClient.post(`${ELASTICSEARCH_URL}/contract-chart`, request, {isBackgroundRequest: true})
    return [{"name":1,"revenueChartData":{"ALL":0},"contractChartData":{"CC":7,"ALL":39,"VTA":0,"FH":0,"MC":6,"HC":0},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":2,"revenueChartData":{"ALL":0},"contractChartData":{"CC":3,"ALL":46,"VTA":0,"FH":0,"MC":11,"HC":0},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":3,"revenueChartData":{"ALL":0},"contractChartData":{"CC":1,"ALL":41,"VTA":0,"FH":0,"MC":9,"HC":0},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":4,"revenueChartData":{"ALL":0},"contractChartData":{"CC":5,"ALL":51,"VTA":0,"FH":0,"MC":7,"HC":0},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":5,"revenueChartData":{"ALL":0},"contractChartData":{"CC":5,"ALL":26,"VTA":0,"FH":0,"MC":8,"HC":0},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":6,"revenueChartData":{"ALL":0},"contractChartData":{"CC":3,"ALL":12,"VTA":0,"FH":0,"MC":3,"HC":0},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}},{"name":7,"revenueChartData":{"ALL":0},"contractChartData":{"CC":0,"ALL":6,"VTA":0,"FH":0,"MC":6,"HC":0},"bonusChartData":{},"debtChartData":{},"newAccounts":{},"totalAccounts":{}}]
  }

  static getAccountChart(request) {
    return HttpClient.post(`${ELASTICSEARCH_URL}/account-chart`, request, {isBackgroundRequest: true})
  }

  static getCountAccountApproved(request) {
    return HttpClient.post(`${ELASTICSEARCH_URL}/users/count-account-approved`, request, {isBackgroundRequest: true})
  }

  static getCountAccountAwaitingApproval() {
    return HttpClient.get(`${ELASTICSEARCH_URL}/users/count-account-awaiting-approval`, { params: { uuid: BaseAppUltils.generateUUID() }, isBackgroundRequest: true })
  }

  static getCountContractAwaitingApproval() {
    return HttpClient.get(`${ELASTICSEARCH_URL}/contracts/count-contract-awaiting-approval`, { params: { uuid: BaseAppUltils.generateUUID() }, isBackgroundRequest: true })
  }

  static getCountContractExpired() {
    return HttpClient.get(`${ELASTICSEARCH_URL}/contracts/count-contract-expired`, { params: { uuid: BaseAppUltils.generateUUID() }, isBackgroundRequest: true })
  }

  static getCountContractPendingBH() {
    return HttpClient.get(`${BH_URL}`, { params: { uuid: BaseAppUltils.generateUUID() }, isBackgroundRequest: true })
  }

  static getDebtInfo() {
    return HttpClient.get(`${ELASTICSEARCH_URL}/debt-info`, { params: { uuid: BaseAppUltils.generateUUID() }, isBackgroundRequest: true })
  }

  static getDebitedAccount() {
    return HttpClient.get(`${ELASTICSEARCH_URL}/debt/count-account-debt`, { params: { uuid: BaseAppUltils.generateUUID() }, isBackgroundRequest: true })
  }

  static getTop10HighestRevenue(timeType) {
    return HttpClient.get(`${ELASTICSEARCH_URL}/revenue/top10best`, {
      params: {
        timeType: timeType,
        uuid: BaseAppUltils.generateUUID()
      },
      isBackgroundRequest: true
    })
  }

  static getTop10LowestRevenue(timeType) {
    return HttpClient.get(`${ELASTICSEARCH_URL}/revenue/top10worst`, {
      params: {
        timeType: timeType,
        uuid: BaseAppUltils.generateUUID()
      },
      isBackgroundRequest: true
    })
  }
}

export default HomeService
