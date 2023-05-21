import '../../../../assets/scss/insurance-app/buy-insurances/overall.scss'
import React from 'react'
import HeaderView from './views/HeaderView'
import BodyView from './views/BodyView'
import { useDispatch } from 'react-redux'
import { updateProps } from '../../../../redux/actions/insurance-app/buyInsurancesCar'
import { PATH_BUY_INSURANCES_CAR_SIMPLIFY } from '../../../../configs/insurance-app'
import { KEY_LAST_ENDPOINT_PATH } from '../../../../redux/reducers/insurance-app/utility'

const OverallView = ({ location }) => {
    const dispatch = useDispatch()

    /** assign name-path to make this buy-insurance-motor redux-state become unique, 
      * avoid the conflict with other buy-insurance-motor redux-state */
    React.useEffect(() => {
        dispatch(updateProps([
            {
                prop: KEY_LAST_ENDPOINT_PATH,
                value: PATH_BUY_INSURANCES_CAR_SIMPLIFY
            }
        ]))
    }, [])

    return (
        <div className="buy-insurances">
            <HeaderView />
            <BodyView />
        </div>
    )
}

export default OverallView