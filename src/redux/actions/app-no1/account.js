import React from 'react'
import {AppId, BaseAppUltils, FormattedMessage} from 'base-app'
import AccountService from '../../../services/app-no1/account'
import {addAppContextPath, USER_TYPE} from '../../../configs/app-no1'
import {history} from '../../../history'
import {getKeyLang} from '../../../configs/app-no1'
import moment from "moment";

export const ACTION_LOAD_LIST_ACCOUNT = 'ACTION_LOAD_LIST_ACCOUNT'
export const ACTION_LOAD_LIST_ACCOUNT_SUGGESTION =
    'ACTION_LOAD_LIST_ACCOUNT_SUGGESTION'
export const ACTION_CHECK_USER_EXIST = 'ACTION_CHECK_USER_EXIST'
export const ACTION_LOAD_INSURANCE_LIST = 'ACTION_LOAD_INSURANCE_LIST'
export const ACTION_UPLOAD_EXCEL_USERS = 'ACTION_UPLOAD_EXCEL_USERS'

export const loadListAccount = (isWaitingApprovePartner, paging, searchKey) => {
    return async (dispatch, getState) => {
        try {
            paging = paging || getState().app.account.paging
            searchKey = searchKey || getState().app.account.searchKey
            const res = isWaitingApprovePartner
                ? await AccountService.getWaitingApproveUsers(paging)
                : await AccountService.getAccounts(paging)
            if (res.status === 200) {
                dispatch({
                    type: ACTION_LOAD_LIST_ACCOUNT,
                    payload: {
                        list: isWaitingApprovePartner
                            ? res.data.map((item) => ({...item, status: 'DEACTIVATE'}))
                            : res.data,
                        totalCount: +res.headers['x-total-count'],
                        paging,
                        searchKey
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadListSuggestion = (isWaitingApprovePartner) => {
    return async (dispatch) => {
        try {
            const res = isWaitingApprovePartner
                ? await AccountService.getWatingApproveSuggestions()
                : await AccountService.getAccountSuggestions()
            if (res.status === 200) {
                const data = res.data || []
                dispatch({
                    type: ACTION_LOAD_LIST_ACCOUNT_SUGGESTION,
                    payload: data.map((item) => ({
                        value: item.value,
                        label: item.searchKey
                    }))
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const approveWaitingPartner = (partnerId) => {
    return async (dispatch) => {
        const res = await AccountService.approveWaitingPartner(partnerId)
        if (res.status === 200) {
            BaseAppUltils.toastSuccess(<FormattedMessage id={`${AppId.APP_NO1}.account.approveSuccessful`}/>)
            dispatch(loadListAccount(true))
        }
    }
}

export const rejectWaitingPartner = (partnerId) => {
    return async (dispatch) => {
        const res = await AccountService.rejectWaitingPartner(partnerId)
        if (res.status === 200) {
            BaseAppUltils.toastSuccess(<FormattedMessage id={`${AppId.APP_NO1}.account.rejectSuccessful`}/>)
            dispatch(loadListAccount(true))
            dispatch(loadListSuggestion(true))
        }
    }
}

export const updatePartnerOG = (values, callback) => {
    return async (dispatch) => {
        values.username = values.phoneNumber;
        const res = await AccountService.updatePartnerOG(values)
        if (res.status === 200) {
            BaseAppUltils.toastSuccess(<FormattedMessage id={`${AppId.APP_NO1}.account.updateSuccess`}/>)
            dispatch(loadListAccount(true))
            callback()
        }
    }
}

export const checkUserExistByPhoneNumber = (index, user) => {
    return async (dispatch) => {
        const res = await AccountService.checkUserExistByPhoneNumber(
            user.phoneNumber
        )
        if (res.status === 200) {
            user.isExist = res.data
            dispatch({
                type: ACTION_CHECK_USER_EXIST,
                payload: {index, user}
            })
        }
    }
}


export const createAccount = (user, callbackFunc, isCreate = false) => {
    return async () => {
        const res = isCreate ? await AccountService.createNewAccount(user) : await AccountService.updateAccount(user)
        if (res.status === 200 || res.status === 201) {
            // if (user.userType === USER_TYPE.HTKD) {
            //   BaseAppUltils.toastSuccess(<FormattedMessage id={`${AppId.APP_NO1}.account.${isCreate ? 'createSuccess' : 'updateSuccess'}${res.data.isAwaitingApproval ? 'NeedApproval' : ''}`} />)
            //   history.push(addAppContextPath('/accounts/management'))
            // } else {
            //   callbackFunc(res.data)
            // }
            BaseAppUltils.toastSuccess(<FormattedMessage
                id={`${AppId.APP_NO1}.account.${isCreate ? 'createSuccess' : 'updateSuccess'}${res.data.isAwaitingApproval ? 'NeedApproval' : ''}`}/>)
            history.push(addAppContextPath('/accounts/management'))
        }
    }
}

export const updateAccountInsuranceSettings = (values, settings, isCreate = false) => {
    return async () => {
        values.userInsuranceSettings = [...settings];
        const res = await AccountService.updateAccount(values)
        if (res.status === 200) {
            BaseAppUltils.toastSuccess(<FormattedMessage
                id={`${AppId.APP_NO1}.account.${isCreate ? 'createSuccess' : 'updateSuccess'}${res.data.isAwaitingApproval ? 'NeedApproval' : ''}`}/>)
            history.push(addAppContextPath('/accounts/management'))
        }
    }
}


export const loadInsuranceList = (companyId, insuranceSettings = []) => {
    return async (dispatch) => {
        const res = await AccountService.getInsuranceList(companyId)
        if (res.status === 200) {
            dispatch({
                type: ACTION_LOAD_INSURANCE_LIST,
                payload: {
                    insuranceList: getInsuranceList(res.data, insuranceSettings),
                    insuranceListOrigin: res.data
                }
            })
        }
    }
}

export const updateInsuranceList = (insuranceList, insuranceSettings) => {
    return async (dispatch) => {
        dispatch({
            type: ACTION_LOAD_INSURANCE_LIST,
            payload: {
                insuranceList: getInsuranceList(insuranceList, insuranceSettings)
            }
        })
    }
}

export const approveAccount = (userId, isApproved) => {
    return async (dispatch) => {
        const res = await AccountService.approveAccount(userId, isApproved);
        if (res.status === 200) {
            BaseAppUltils.toastSuccess(<FormattedMessage
                id={`${AppId.APP_NO1}.account.changeStatus.${isApproved ? 'approve' : 'reject'}.success`}/>)
            dispatch(loadListAccount(false))
            if (!isApproved) {
                dispatch(loadListSuggestion(false))
            }
        }
    }
}

export const changeAccountStatus = (username, status) => {
    return async (dispatch) => {
        const res = await AccountService.changeAccountStatus(username, status);
        if (res.status === 200) {
            BaseAppUltils.toastSuccess(<FormattedMessage
                id={`${AppId.APP_NO1}.account.changeStatus.${status.toLowerCase()}.success${res.data.isAwaitingApproval ? 'NeedApproval' : ''}`}/>)
            dispatch(loadListAccount(false))
        }
    }
}

export const deleteAccount = (id) => {
    return async (dispatch) => {
        const res = await AccountService.deleteAccount(id);
        if (res.status === 204) {
            BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang('account.deleteAccount.success')}/>)
            dispatch(loadListAccount(false))
        }
    }
}

export const exportReport = (exportFields) => {
    return async (dispatch) => {
        const res = await AccountService.exportReport(exportFields);
        if (res.status === 200) {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'matematica.xlsx');
            document.body.appendChild(fileLink);

            fileLink.click();
        }
    }
}

export const importUsersExcel = (files, isInOn) => {
    return async (dispatch) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i])
        }
        const res = await AccountService.importExcelUsers(formData);
        if (res.status === 200) {
            dispatch({
                type: ACTION_UPLOAD_EXCEL_USERS,
                payload: res.data
            })
        }
    }
}

export const downloadResultFile = (data) => {
    return async () => {
        const res = await AccountService.downloadResultFile(data)
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `file_ket_qua.xlsx`) //or any other extension
        document.body.appendChild(link)
        link.click()
    }
}

const getInsuranceList = (insuranceList, insuranceSettings) => {
    const mapInsuranceList = new Map()

    const mapChildrenInsuranceList = (insurance) => {
        insurance.insurances = mapInsuranceList.get(insurance.id + '')
        const setting = insuranceSettings.find(
            (item) => +item.insuranceId === insurance.id
        )
        insurance.value = setting ? setting.value : ''
        insurance.isEnabled = setting ? setting.isEnabled : false
        if (insurance.insurances && insurance.insurances.length) {
            insurance.insurances = insurance.insurances.map((item) =>
                mapChildrenInsuranceList(item)
            )
        }
        return insurance
    }

    insuranceList.forEach((insurance) => {
        const groupInsurance = mapInsuranceList.get(insurance.parentId)
        if (groupInsurance) {
            groupInsurance.push(insurance)
            mapInsuranceList.set(insurance.parentId, groupInsurance)
        } else {
            mapInsuranceList.set(insurance.parentId, [insurance])
        }
    })
    const parentList = mapInsuranceList.get(null)
    return parentList.map((item) => mapChildrenInsuranceList(item))
}
