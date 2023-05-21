import React, { useState, useEffect } from 'react'
import { Label, Row, Col, FormGroup } from "reactstrap"
import { CurrencyInput, Select, BaseFormGroup } from 'base-app'
import Service from '../../../../services/insurance-app/buyInsuranceCar'
import { getKeyLang } from '../../../../configs/insurance-app'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'
import { hasRequestFail } from '../../../../ultity'

export const errorStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}

export const normalStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}

/** @example
       <AlterBeneficiaryBank
                callbacks={{
                    banksSelectChange: (original) => {
                    },
                    branchInputChange: (e) => {
                    },
                    addressInputChange: (e) => {
                    },
                    currencyInputChange: (e) => {
                    },
                }}
                keyNames={{
                    KEY_BANKS_SELECT: KEY_BENEFIARRY_BANK_SELETECTED,
                    KEY_BRANCH_NAME_INPUT: KEY_BENEFICIARY_BRANCH,
                    KEY_ADDRESS_INPUT: KEY_BENEFICIARY_ADDRESS,
                    KEY_CURRENCY_INPUT: KEY_BENEFICIARY_LIMIT
                }}
                className="mt-2 mb-1"
            />
 */

const AlterBankInfo = ({
    callbacks = {
        banksSelectChange: null,
        branchInputChange: null,
        addressInputChange: null,
        currencyInputChange: null,
    },
    keyNames = {
        KEY_BANKS_SELECT: "banks",
        KEY_BRANCH_NAME_INPUT: "branch",
        KEY_ADDRESS_INPUT: "address",
        KEY_CURRENCY_INPUT: "currency"
    },
    ...p }) => {
    const { KEY_BANKS_SELECT, KEY_BRANCH_NAME_INPUT, KEY_ADDRESS_INPUT, KEY_CURRENCY_INPUT } = keyNames
    const { banksSelectChange, branchInputChange, addressInputChange, currencyInputChange } = callbacks
    const [_sugg_Bank, setSugg_Bank] = useState([])
    const { values, touched, errors } = useFormikContext()
    const intl = useIntl()

    useEffect(() => {
        const getAllBank = async () => {
            const res = await Service.getAllBank()
            let banks = []
            if (hasRequestFail(res.status)) {
                return
            }
            res.data.forEach((bank) => {
                if (bank.vn !== null) {
                    bank.value = bank.vn
                    bank.label = bank.vn + " " + bank.en
                    banks.push(bank)
                }
            })
            setSugg_Bank(banks)
        }

        getAllBank()
    }, [])



    return (
        <div {...p}>
            <Row>
                <Col xs={12} md={6}>
                    <FormGroup className="form-label-group">
                        <Select
                            readOnly
                            closeMenuOnSelect={true}
                            classNamePrefix='select mt-1'
                            className="custom-zindex9"
                            onChange={banksSelectChange}
                            value={_sugg_Bank.find(elt => elt.value === values[KEY_BANKS_SELECT])}
                            options={_sugg_Bank}
                            placeholder={intl.formatMessage({ id: getKeyLang(`BankName`) })}
                            isClearable={false}
                            styles={errors[KEY_BANKS_SELECT] ? errorStyles : normalStyles}
                        />
                    </FormGroup>
                </Col>

                <Col xs={12} md={6} >
                    <FormGroup className='form-label-group'>
                        <BaseFormGroup
                            fieldName={KEY_BRANCH_NAME_INPUT}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`BrachName`)}
                            onChange={branchInputChange}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row className="mt-1">
                <Col xs={12} md={12} >
                    <FormGroup className='form-label-group'>
                        <BaseFormGroup
                            fieldName={KEY_ADDRESS_INPUT}
                            errors={errors}
                            touched={touched}
                            messageId={getKeyLang(`BankAddr`)}
                            onChange={addressInputChange}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row className="mt-1">
                <Col xs={12} md={12}>
                    <FormGroup className={"form-label-group"}>
                        <CurrencyInput
                            id='amountAlter'
                            value={values[KEY_CURRENCY_INPUT]}
                            onChange={currencyInputChange}
                            placeholder={getKeyLang('AmountAlter')}
                            className={`form-control form-label-group ${errors[KEY_CURRENCY_INPUT] ? 'is-invalid' : false}`}
                        />
                        {
                            (errors[KEY_CURRENCY_INPUT])
                            &&
                            <div style={{ fontSize: ".8rem", position: "absolute", left: "4px", bottom: "-20px" }} className="text-danger">
                                {errors[KEY_CURRENCY_INPUT]}
                            </div>
                        }
                        <Label >{intl.formatMessage({ id: getKeyLang('AmountAlter') })}</Label>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}
export default AlterBankInfo
