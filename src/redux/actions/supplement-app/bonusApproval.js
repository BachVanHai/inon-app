import React from 'react'
import BonusService from '../../../services/supplement-app/bonus'
import { BaseAppConfigs, BaseAppUltils} from 'base-app'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../configs/supplement-app'

export const ACTION_LOAD_LIST_BONUS_APPROVAL = 'ACTION_LOAD_LIST_BONUS_APPROVAL'
export const ACTION_LOAD_LIST_BONUS_APPROVAL_SUGGESTION = 'ACTION_LOAD_LIST_BONUS_APPROVAL_SUGGESTION'

export const loadListBonusApproval = (searchIds) => {
  return async (dispatch) => {
    const res = await BonusService.getBonusesApproval(searchIds)
    if (res.status === 200) {
      dispatch({
        type : ACTION_LOAD_LIST_BONUS_APPROVAL,
        payload : res.data
      })
    }
  }
}

export const loadListSuggestion = () => {
  return async (dispatch) => {
    const res = await BonusService.getAccountSuggestions()
    if (res.status === 200) {
      let data = res.data || []
      data = data.filter(item => item.userType === BaseAppConfigs.USER_TYPE.KD).map((item) => ({
        value: item.id,
        id : item.id,
        userCode : item.userCode,
        phoneNumber : item.phoneNumber,
        fullName : item.fullName,
        address : item.userDetails ? item.userDetails.address : '',
        username : item.username,
        parentId : item.parentId,
        email : item.email,
        createDate : item.createDate,
        refByUser : item.refByUser,
        label: `${item.userCode}-${item.fullName}`
      }))
      dispatch({
        type: ACTION_LOAD_LIST_BONUS_APPROVAL_SUGGESTION,
        payload: data
      })
    }
  }
}

export const bonusApproval = (id, isApproved) => {
  return async (dispatch) => {
    const res = await BonusService.bonusApproval(id , isApproved)
    if (res.status === 200) {
       BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang(`bonus.bonusApproval.${isApproved ? 'approve' : 'reject'}`)} />)
       dispatch(loadListBonusApproval())
    }
  }
}



