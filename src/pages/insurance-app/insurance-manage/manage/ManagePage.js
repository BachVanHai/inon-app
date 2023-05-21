import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { FormikProvider, useFormik } from 'formik'
import Header from '../view/Header'
import Body from '../view/Body'
import {
    initialValues, validate, validationSchema, KEY_START_DATE, KEY_END_DATE, KEY_ISCHECK,
    KEY_PENDING_CONTRACTS, KEY_SELECTED_PARTNERS, KEY_TOTAL_ELEMENTS, KEY_REVENUE, KEY_SEARCHED_PENDING_CONTRACTS
} from './formikConfig'
import { useSelector } from 'react-redux'
import { KEY_IS_LOADING, KEY_PARTNERS } from '../../../../redux/reducers/insurance-app/appConfig'
import { NAME_APP_CONFIG, ROLE_ALL, ROLE_PARTNER, ROLE_PERSONAL } from '../../../../configs/insurance-app'
import Service from '../services'
import { getBasePath, getInsuranceType } from './utility'
import { useDispatch } from 'react-redux'
import { setLoadingStatus } from '../../../../redux/actions/insurance-app/appConfig'
import { convertDateTimeToReadble, hasRequestFail, isValueEmpty } from '../../../../ultity'
import { DATE_FORMAT } from '../../../../components/insurance-app/buy-insurances-page/formik-config'

const ManagePage = () => {
    const { [KEY_PARTNERS]: partners, [KEY_IS_LOADING]: isLoading } = useSelector(state => state.app[NAME_APP_CONFIG])
    const dispatch = useDispatch()
    const { id } = useParams()
    const arr = React.useMemo(() => id.split('-'), [id])
    const role = arr[0]
    const REDUX_NAME = arr[1]

    const [count, setCount] = React.useState(0)
    const invokeSearchPendingContracts = () => {
        setCount(pre => ++pre)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validate: validate,
    })

    const handleSearch = () => {
        const searchWithDate = async () => {
            let getPendingContracts
            switch (role) {
                case ROLE_PARTNER:
                    getPendingContracts = Service.getPartnerContracts
                    break
                case ROLE_PERSONAL:
                    getPendingContracts = Service.getPersonalContract
                    break
                case ROLE_ALL:
                    getPendingContracts = Service.getAllContracts
                    break
                default:
                    getPendingContracts = Service.getPersonalContract
                    break
            }
            const startDate = convertDateTimeToReadble(moment(formik.getFieldMeta(KEY_START_DATE).value).format(DATE_FORMAT), "00:00")
            const endDate = convertDateTimeToReadble(moment(formik.getFieldMeta(KEY_END_DATE).value).format(DATE_FORMAT), "23:59")

            dispatch(setLoadingStatus(true))
            const res = await getPendingContracts(
                getBasePath(REDUX_NAME), getInsuranceType(REDUX_NAME), [startDate, endDate]
            )
            dispatch(setLoadingStatus(false))
            if (hasRequestFail(res.status)) { return }

            formik.setFieldValue(KEY_TOTAL_ELEMENTS, res.data.totalElements)
            formik.setFieldValue(KEY_REVENUE, res.data.revenue)

            const pendingContracts = res.data.content?.map((elt) => {
                elt[KEY_ISCHECK] = false
                return elt
            })
            formik.setFieldValue(KEY_SEARCHED_PENDING_CONTRACTS, pendingContracts)
            formik.setFieldValue(KEY_PENDING_CONTRACTS, pendingContracts)
        }

        const searchWithSelected = () => {
            const selectedPartners = formik.getFieldMeta(KEY_SELECTED_PARTNERS).value
            const searchedContracts = formik.getFieldMeta(KEY_PENDING_CONTRACTS).value.filter((elt) => {
                if (selectedPartners.split(',').find(_elt => _elt?.toString() === elt.salerId?.toString() || elt.sallerId?.toString())) {
                    return true
                }
                return false
            })
            formik.setFieldValue(KEY_PENDING_CONTRACTS, searchedContracts)
        }

        if (isValueEmpty(formik.getFieldMeta(KEY_SELECTED_PARTNERS).value)) {
            searchWithDate()
            return
        }

        searchWithSelected()
    }

    React.useEffect(() => {
        handleSearch()
    }, [count])

    return (
        <FormikProvider value={formik}>
            <Header
                role={role}
                formik={formik}
                isLoading={isLoading}
                partners={partners}
                reduxName={REDUX_NAME}
                handleSearch={handleSearch}
            />

            <Body
                role={role}
                formik={formik}
                reduxName={REDUX_NAME}
                isLoading={isLoading}
                invokeSearchPendingContracts={invokeSearchPendingContracts}
            />
        </FormikProvider>
    )
}

export default ManagePage