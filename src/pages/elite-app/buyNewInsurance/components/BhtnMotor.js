import { FormattedMessage } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { getTextClassesBy } from '../../../../components/insurance-app/common-forms/title-row/TitleRow'
import RadioRow from '../../../../components/insurance-app/common-forms/toggle-row/RadioRow'
import { getKeyLang } from '../../../../configs/elite-app'
import { KEY_ADD_RESPONSIBILITY_VALUE_MOTOR, KEY_AMOUNT_PEOPLE_EACH_CAR } from '../formikConfig'

const BhtnMotor = ({ _defaulChecks, getFieldMeta }) => {
    const intl = useIntl()
    const { contractInfo } = useSelector(state => state.app.renewalInsurance)
    return (
        <div className='mb-3'>
            <>
                <Row>
                    <Col xs={12} md={12} className="text-italic text-secondary">
                        <FormattedMessage id={getKeyLang("TimeTNDSBBXM")} />
                    </Col>
                </Row>
                <RadioRow
                    msgField={getKeyLang(`AddResponsibility`)}
                    fieldName={KEY_ADD_RESPONSIBILITY_VALUE_MOTOR}
                    checks={_defaulChecks}
                    isHideImage={true}
                    className="mt-2"
                />
                <Row>
                    <Col xs={8} md={6} className={getTextClassesBy("s")}>
                        <FormattedMessage id={getKeyLang("NumInCar")} />:
                    </Col>

                    <Col xs={4} md={6} className={getTextClassesBy("s")}>
                        {
                            contractInfo?.vehicleType?.carType === 'MT3' ? `3 ${intl.formatMessage({ id: getKeyLang("people") })}` : `2 ${intl.formatMessage({ id: getKeyLang("people") })}`
                        }
                    </Col>
                </Row>
            </>
        </div>
    )
}

export default BhtnMotor