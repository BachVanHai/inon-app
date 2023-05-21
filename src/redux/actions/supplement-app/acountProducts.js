import AccountProductsService from '../../../services/supplement-app/accoutProducts'

export const ACTION_SAVE_ACCOUNT_PRODUCTS_UPLOAD =
  'ACTION_SAVE_ACCOUNT_PRODUCTS_UPLOAD'
export const ACTION_GET_LIST_ACOUNT_PRODUCTS = 'ACTION_GET_LIST_ACOUNT_PRODUCTS'
export const ACTION_GET_LIST_PARTNERS = 'ACTION_GET_LIST_PARTNERS'
export const ACTION_SEARCH_LIST_ACCOUNT = 'ACTION_SEARCH_LIST_ACCOUNT'
export const actionUploadfileAccount = (files) => {
  return async (dispatch) => {
    let formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }
    // const res = await
    dispatch({
      type: ACTION_SAVE_ACCOUNT_PRODUCTS_UPLOAD
      // payload : res.data
    })
  }
}
export const actionGetListAccountProducts = (start, end) => {
  return async (dispatch) => {
    const res = await AccountProductsService.getAccount(start, end)
    if (res.status === 200) {
      const data = res.data || []
      dispatch({
        type: ACTION_GET_LIST_ACOUNT_PRODUCTS,
        payload: data
      })
    }
  }
}
export const getPartners = () => {
  return async (dispatch) => {
    const res = await AccountProductsService.getPartners()
    if (res.status === 200) {
      const data = res.data || []
      const dataConvert = data.map((item) => {
        return {
          value: item.id,
          label: `${item.userCode}-${item.fullName}`,
          userCode : item.userCode
        }
      })
      dispatch({
        type: ACTION_GET_LIST_PARTNERS,
        payload: dataConvert
      })
    }
  }
}
export const actionSearchListAccountProducts = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ACTION_SEARCH_LIST_ACCOUNT,
      payload: data
    })
  }
}

