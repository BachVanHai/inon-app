import icInOn from '../../../../assets/images/insurance-app/buy-insurance/ic_inon.png'
import 'react-toggle/style.css'
import React from 'react'
import { Col, CustomInput, FormGroup, Label, Row } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { useFormikContext } from 'formik'

/**
 * @example
   const _defaulChecks = [
        {
            value: true,
            handleChange: (value) => { },
            title: intl.formatMessage({ id: getKeyLang(`yes`) }),
        },
        {
            value: false,
            handleChange: (value) => { },
            title: intl.formatMessage({ id: getKeyLang(`no`) }),
        },
    ]
    <RadioRow
        msgField={getKeyLang(`isAddressEqual`)}
        fieldName={KEY_TOGGLE_IS_ADDRESS_EQUAL}
        checks={_defaulChecks}
        isHideImage={false}
    />
 */

const RadioRow = ({ values, msgField, fieldName, checks, isHideImage, ...props }) => {
    const { getFieldMeta } = useFormikContext()
    const getMdValue = () => {
        const _mdVal = Math.floor(6 / checks.length)
        switch (_mdVal) {
            case 3:
                return 3
            case 2:
                return 2
            default:
                return 1
        }
    }

    const getFieldVal = () => {
        if (values) {
            return values[fieldName]
        }
        return getFieldMeta(fieldName).value
    }

    return (
        <div {...props}>
            {
                React.useMemo(() => {
                    return (
                        <Row className="mb-1">
                            <Col xs={12} md={6}>
                                <div className="d-flex align-items-center">
                                    {
                                        !isHideImage &&
                                        <img
                                            className="rounded-circle mr-50"
                                            src={icInOn}
                                            alt="ic"
                                        />
                                    }
                                    <span className="align-middle font-medium-1 text-title-color letter-uppercase">
                                        {
                                            msgField && <b><FormattedMessage id={msgField} /></b>
                                        }
                                    </span>
                                </div>
                            </Col>
                            {
                                checks.map(elt => {
                                    return (
                                        <Col xs={12} md={getMdValue()} key={elt.value}>
                                            <div className="d-flex align-items-center">
                                                <FormGroup check>
                                                    <Label check>
                                                        <CustomInput
                                                            id={`my-custom-radio-${elt.value}`}
                                                            type="radio" name={`my-custom-radio-${elt.value}`}
                                                            onChange={elt.handleChange.bind(null, elt.value)}
                                                            checked={getFieldVal(fieldName) === elt.value}
                                                        />
                                                    </Label>
                                                </FormGroup>
                                                <div>{elt.title}</div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                }, [getFieldVal(fieldName)])
            }
        </div>
    )
}

export default RadioRow