import moment from 'moment'

export const APPROVED = "APPROVED"
export const REJECT = "REJECT"
export const PENDING = "PENDING"
export const NOT_ACCEPT = "NOT_ACCEPT"
export const CHANGE_LIMIT = "CHANGE_LIMIT"
export const OTHER = "OTHER"

export const convertStrToDate = (strDate) => {
    return moment(strDate).utc().toISOString()
}

export const convertToDateValue = (strDate) => {
    return moment(strDate).valueOf()
}

export const findChildInParrent = (childId, parrent, prop = "id") => {
    const found = parrent.find(elt => elt[prop] === childId)
    if (found) {
        return found
    }
    return false
}

export const addChangePropTo = (pendingAccounts, listAllDebtAccounts) => {
    pendingAccounts.forEach(pendingElt => {
        const foundListAccount = listAllDebtAccounts.find(listElt => listElt.usersDTO.id === Number(pendingElt.userId))
        if (foundListAccount) {
            let changedProps = []
            const transactionLimitChanged = Number(pendingElt.transactionLimit) !== Number(foundListAccount.transactionLimit)
            const dailyLimitChanged = Number(pendingElt.dailyLimit) !== Number(foundListAccount.dailyLimit)
            const monthlyLimitChanged = Number(pendingElt.monthlyLimit) !== Number(foundListAccount.monthlyLimit)
            const isChangedDueDateType = pendingElt.dueDateType !== foundListAccount.dueDateType
            const isChangedDueValue = pendingElt.dueValue !== foundListAccount.dueValue

            if (transactionLimitChanged) {
                const transactionLimitChanged = {
                    name: "transactionLimit",
                    oldVal: foundListAccount.transactionLimit,
                    newVal: pendingElt.transactionLimit
                }
                changedProps.push(transactionLimitChanged)
            }
            if (dailyLimitChanged) {
                const dailyLimitChanged = {
                    name: "dailyLimit",
                    oldVal: foundListAccount.dailyLimit,
                    newVal: pendingElt.dailyLimit
                }
                changedProps.push(dailyLimitChanged)
            }
            if (monthlyLimitChanged) {
                const monthlyLimitChanged = {
                    name: "monthlyLimit",
                    oldVal: foundListAccount.monthlyLimit,
                    newVal: pendingElt.monthlyLimit
                }
                changedProps.push(monthlyLimitChanged)
            }
            if (isChangedDueDateType) {
                const dueDateTypeChanged = {
                    name: "dueDateType",
                    oldVal: foundListAccount.dueDateType,
                    newVal: pendingElt.dueDateType
                }
                changedProps.push(dueDateTypeChanged)
            }
            if (isChangedDueValue) {
                const dueValueChanged = {
                    name: "dueValue",
                    oldVal: foundListAccount.dueValue,
                    newVal: pendingElt.dueValue
                }
                changedProps.push(dueValueChanged)
            }
            pendingElt.changed = {
                changedProps,
                isNewDebtAccount: false
            }
        } else {
            pendingElt.changed = {
                isNewDebtAccount: true
            }
        }
    })
    return pendingAccounts
}
