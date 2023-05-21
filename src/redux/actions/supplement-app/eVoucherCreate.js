import EvoucherService from '../../../services/supplement-app/evoucher'
export const ACTION_GET_ALL_COMOPANY_INSURANCE =
  'ACTION_GET_ALL_COMOPANY_INSURANCE'
export const ACTION_GET_ALL_PRODUCT = 'ACTION_GET_ALL_PRODUCT'
export const getAllCompanies = () =>{
  return async (dispatch) =>{
    const res = await EvoucherService.getAllCompanies()
    if (res) {
      const data = res.data || []
      dispatch({
        type : ACTION_GET_ALL_COMOPANY_INSURANCE,
        payload : {
          data
        } || []
      }) 
    }
   
  }
}
export const getAllProduct = () => {
  return async (dispatch) => {
    const res = await EvoucherService.getAllProductApplyForEvoucher()
    if (res.status !== 200) {
      return 
    }
    if (res) {
      const data = res.data || []
      dispatch({
        type: ACTION_GET_ALL_PRODUCT,
        payload:
          {
            data
          } || []
      })
    }
  }
}


