import '../../../../assets/scss/insurance-app/buy-insurances/overall.scss'
import React from 'react'
import HeaderView from './views/HeaderView'
import BodyView from './views/BodyView'
import { useDispatch } from 'react-redux'

const OverallView = () => {
    const dispatch = useDispatch()

    return (
        <div className="buy-insurances">
            <HeaderView />
            <BodyView />
        </div>
    )
}

export default OverallView