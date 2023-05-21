import React, { useState, useEffect } from 'react'
import { BaseFormGroup, Button } from 'base-app'
import { Minus, Plus } from 'react-feather'
import { FormattedMessage, useIntl } from 'react-intl'
import Toggle from 'react-toggle'
import { Col, FormGroup, Row, Table } from 'reactstrap'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { useSelector } from 'react-redux'
import { KEY_ADDTIONAL_TERM_ALL, KEY_ADDTIONAL_TERM_MAIN, KEY_BH_INCREASE } from '../formikConfig'
import { intlConvertToVnd } from '../../../../../../../ultity'

const AddTerms = ({ touched, errors, setFieldValue, values, disableContinueBtn }) => {
    const { addTermsMain, addTermsAll, deductionLevel } = useSelector(state => state.app.buyInsurancesCar)
    const intl = useIntl()
    const [toggleShow, setToggleShow] = useState(false)
    const [data, setData] = useState([])

    const handleShowMain = e => {
        setToggleShow(false)
        setData(addTermsMain)
    }

    const handleShowAll = e => {
        setToggleShow(true)
        setData([...addTermsMain, ...addTermsAll])
    }

    const handleAddTerm = (item) => {
        let _isEnable = item.isEnable
        if (_isEnable) {
            _isEnable = false
        } else {
            _isEnable = true
        }
        item.isEnable = _isEnable

        let listAddTermMain = values[KEY_ADDTIONAL_TERM_MAIN].map((term) => {
            if (term.id == item.id) {
                return item
            }
            return term
        })
        setFieldValue(KEY_ADDTIONAL_TERM_MAIN, listAddTermMain)

        let listAddTermsAll = values[KEY_ADDTIONAL_TERM_ALL].map((term) => {
            if (term.id == item.id) {
                return item
            }
            return term
        })
        setFieldValue(KEY_ADDTIONAL_TERM_ALL, listAddTermsAll)

        disableContinueBtn && disableContinueBtn()
    }

    useEffect(() => {
        if (addTermsMain.length > 0) {
            setFieldValue(KEY_ADDTIONAL_TERM_MAIN, addTermsMain)
            setData(addTermsMain)
        }
        if (addTermsAll.length > 0) {
            setFieldValue(KEY_ADDTIONAL_TERM_ALL, addTermsAll)
        }
    }, [addTermsMain.length, addTermsAll.length])

    return (
        <div>
            <Table className="custom-padding-table" borderless responsive>
                <tbody>
                    {
                        data.map(item => (
                            <tr key={item.id}>
                                <td width={"90%"}>
                                    {item.addonCode + " - " + item.addonDesc}
                                </td>
                                <td width={"10%"}>
                                    <Toggle
                                        onChange={handleAddTerm.bind(null, item)}
                                        className="switch-danger-primary"
                                        icons={false}
                                        checked={item.isEnable}
                                    />
                                </td>
                            </tr>
                        ))
                    }

                    {
                        !toggleShow ?
                            <tr>
                                <td> <FormattedMessage id={getKeyLang(`AddTerm`)} /></td>
                                <td>
                                    <Button.Ripple
                                        className="btn-icon rounded-circle custom-round-oval"
                                        color="primary"
                                        onClick={handleShowAll}
                                    >
                                        <Plus size={16} />
                                    </Button.Ripple>
                                </td>
                            </tr>
                            :
                            <tr>
                                <td></td>
                                <td>
                                    <Button.Ripple
                                        className="btn-icon rounded-circle custom-round-oval2"
                                        color="primary"
                                        onClick={handleShowMain}
                                    >
                                        <Minus size={16} />
                                    </Button.Ripple>
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>

            <Row className="mb-2">
                <Col xs={12} md={6}>
                    <FormattedMessage id={getKeyLang(`BuyInsurance.Car.Recoup`)} />
                </Col>
                <Col xs={12} md={6}>
                    <label>
                        <span>
                            {
                                intlConvertToVnd(deductionLevel, intl)
                            }
                        </span>
                        <span>&nbsp;</span>
                        đ/vụ
                    </label>
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6} className="mb-2">
                    <FormattedMessage id={getKeyLang(`BuyInsurance.Car.RecoupInc`)} /> (%)
                </Col>
                <Col xs={12} md={6}>
                    <FormGroup>
                        <BaseFormGroup
                            fieldName={KEY_BH_INCREASE}
                            onChange={() => {
                                disableContinueBtn && disableContinueBtn()
                            }}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`BuyInsurance.Car.RecoupInc`)}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}

export default AddTerms