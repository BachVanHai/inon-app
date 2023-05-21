import React from 'react'
import { history } from "../../../history"
import {
    addAppContextPath, PATH_CONTRACTS_MANAGE,
} from '../../../configs/insurance-app'
import { useDispatch } from 'react-redux'
import { getPartners } from "../../../redux/actions/insurance-app/appConfig"
import Original from "../../../components/insurance-app/buy-insurances-page"
import { getInsuranceBy } from "../../../ultity"

const InsuranceManageComponent = (props) => {
    const { role } = props
    const dispatch = useDispatch()

    const handleInsuranceClick = (reduxState, PATH, INSURANCE_TYPE, action, MAX_STEP) => {
        const getPath = (REDUX_NAME) => {
            return addAppContextPath(PATH_CONTRACTS_MANAGE + "/" + role + "-" + REDUX_NAME)
        }

        history.push({
            pathname: getPath(getInsuranceBy(INSURANCE_TYPE).reduxName),
        })
    }

    React.useEffect(() => {
        dispatch(getPartners())
    }, [])

    return (
        <Original handleInsuranceClick={handleInsuranceClick} />
    )
}

export default InsuranceManageComponent