import EvoucherService from '../../../services/supplement-app/evoucher'
export const ACTION_GET_ALL_EVOUCHER = 'ACTION_GET_ALL_EVOUCHER'
export const getAllEvoucher = () => {
  return async (dispatch) => {
    const res = await EvoucherService.getAllEvoucher()
    if (res.status !== 200 || !res.data) {
      return
    } else {
      let data = res.data
      dispatch({
        type: ACTION_GET_ALL_EVOUCHER,
        payload:
          {
            data
          } || []
      })
    }
  }
}
