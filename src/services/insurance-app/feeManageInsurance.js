import { HttpClient } from 'base-app'

import * as API from '../../configs/insurance-app'


class ManageInsuranceFee {
    static getFee(values) {
        return HttpClient.get(`${API.API_GET_MANAGE_SYSTEM_FEE}/${values}`, { params: { date: new Date().getMilliseconds() } })
    }

    static updateFeeCar(role, values, companyId) {
        return HttpClient.put(`${API.API_UPDATE_MANAGE_SYSTEM_FEE_CAR}/${role}/${companyId}`, values)
    }

    static updateFeeMotor(role, values, companyId) {
        return HttpClient.put(`${API.API_UPDATE_MANAGE_SYSTEM_FEE_MOTOR}/${role}/${companyId}`, values)
    }

    static getFeeApprove() {
        return HttpClient.get(`${API.API_GET_MANAGE_SYSTEM_FEE_APRROVE}`, { params: { date: new Date().getMilliseconds() } })
    }

    static getFeeDetailApprove(values) {
        return HttpClient.get(`${API.API_GET_MANAGE_SYSTEM_FEE_APRROVE_DETAIL}/${values}`, { params: { date: new Date().getMilliseconds() } })
    }
    static approvedFee( values) {
        return HttpClient.post(`${API.API_APPROVE_MANAGE_SYSTEM_FEE}`, values)
    }
}

export default ManageInsuranceFee
