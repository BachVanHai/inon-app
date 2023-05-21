import React from 'react'
import moment from 'moment'
import { BaseAppUltils } from 'base-app'
import { CardBody, Row, Col } from 'reactstrap'
import { FormattedMessage, Button, Select, DatePicker } from 'base-app'
import StepBase from '../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import {
    getDefault_buyInsurancesName, getKeyLang, ROLE_ALL, ROLE_PARTNER, ROLE_PERSONAL
} from '../../../../configs/insurance-app'
import { DATE_FORMAT, TEXT_NO_VALUE } from '../../../../components/insurance-app/buy-insurances-page/formik-config'
import { isArrayEmpty } from '../../../../ultity'
import { KEY_SELECTED_PARTNERS, KEY_START_DATE, KEY_END_DATE } from '../manage/formikConfig'
import { useIntl } from 'react-intl'

const Header = ({ role, formik, isLoading, partners, handleSearch, reduxName }) => {
    const { getFieldMeta, setFieldValue } = formik
    const intl = useIntl()

    const getPath = () => {
        const _roles = [
            {
                value: ROLE_ALL,
                label: intl.formatMessage({ id: getKeyLang(`InsuAll`) })
            },
            {
                value: ROLE_PERSONAL,
                label: intl.formatMessage({ id: getKeyLang(`Pers`) })
            },
            {
                value: ROLE_PARTNER,
                label: intl.formatMessage({ id: getKeyLang(`Partner`) })
            }
        ]
        const getRole = () => {
            const found = _roles.find(elt => elt.value === role)
            if (found) {
                return _roles.find(elt => elt.value === role)
            }
            return TEXT_NO_VALUE
        }

        return `${intl.formatMessage({ id: getKeyLang('ContractManage') })} -> ${getRole().label} -> ${getDefault_buyInsurancesName(reduxName).fullName}`
    }

    const onChangeDateSearch = ([start, end]) => {
        const applyDateSearch = (start, end) => {
            
            if (start > end) {
                let temp = start
                start = end
                end = temp
            }
            // IF BETWEEN END DATA AND START DATA > 1 YEAR => LAST DATE 1 YEAR
            if (moment(start).isAfter(moment(end).subtract(1, 'y')) === false) {
                let temp = end
                start = moment(end).subtract(1, 'y')._d
                end = temp 
                BaseAppUltils.toastError(`Thời gian chọn không quá ${moment(end).subtract(1, 'y').format("DD-MM-YYYY")}`)
            }
            setFieldValue(KEY_START_DATE, start)
            setFieldValue(KEY_END_DATE, end)
        }

        setFieldValue(KEY_SELECTED_PARTNERS, [])
        applyDateSearch(start, end)
    }

    return (
        <>
            <div className='font-weight-bold primary mb-2'>
                {getPath()}
            </div>

            <StepBase>
                <CardBody>
                    {
                        (role === ROLE_ALL || role === ROLE_PARTNER) ?
                            <Row>
                                <Col xs={12} md={6} className='margin-top-14'>
                                    <DatePicker
                                        placeholder={<FormattedMessage id={getKeyLang(`Search`)} />}
                                        value={[getFieldMeta(KEY_START_DATE).value, getFieldMeta(KEY_END_DATE).value]}
                                        onChange={onChangeDateSearch}
                                        options={
                                            {
                                                // minDate: moment().utc(true).subtract(1, 'y').format(DATE_FORMAT),
                                                enableTime: false,
                                                mode: 'range',
                                                dateFormat: 'm-d-Y'
                                            }
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={6} className='margin-top-14'>
                                    <Select
                                        closeMenuOnSelect={true}
                                        notRequired
                                        classNamePrefix='select mt-1'
                                        onChange={(originals) => {
                                            if (isArrayEmpty(originals)) {
                                                setFieldValue(KEY_SELECTED_PARTNERS, "")
                                                return
                                            }
                                            setFieldValue(KEY_SELECTED_PARTNERS, originals.map(elt => elt.value).join(","))
                                        }}
                                        value={getFieldMeta(KEY_SELECTED_PARTNERS).value}
                                        options={partners}
                                        placeholder={<FormattedMessage id={getKeyLang(`Partner`)} />}
                                        isClearable={true}
                                        isMulti={true}
                                    />
                                </Col>

                                <Col xs={12} md={6} className='margin-top-14'>
                                    <Button.Ripple
                                        className='round'
                                        color='check'
                                        disabled={isLoading}
                                        onClick={handleSearch}
                                    >
                                        <FormattedMessage id={getKeyLang(`Search`)} />
                                    </Button.Ripple>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col xs={12} md={6} className='margin-top-14'>
                                    <DatePicker
                                        placeholder={<FormattedMessage id={getKeyLang(`Search`)} />}
                                        value={[getFieldMeta(KEY_START_DATE).value, getFieldMeta(KEY_END_DATE).value]}
                                        onChange={onChangeDateSearch}
                                        options={
                                            {
                                                // minDate: moment().utc(true).subtract(1, 'y').format(DATE_FORMAT),
                                                enableTime: false,
                                                mode: 'range',
                                                dateFormat: 'm-d-Y'
                                            }
                                        }
                                    />
                                </Col>

                                <Col xs={12} md={6} className='margin-top-14'>
                                    <Button.Ripple
                                        className='round'
                                        color='check'
                                        disabled={isLoading}
                                        onClick={handleSearch}
                                    >
                                        <FormattedMessage id={getKeyLang(`Search`)} />
                                    </Button.Ripple>
                                </Col>
                            </Row>
                    }
                </CardBody>
            </StepBase>
        </>
    )
}

export default Header