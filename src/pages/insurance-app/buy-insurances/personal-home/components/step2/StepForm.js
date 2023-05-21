import "rc-slider/assets/index.css"
import "flatpickr/dist/themes/material_green.css"
import '../../../../../../assets/scss/insurance-app/common/slider.scss'
import React, { useEffect, useMemo } from 'react'
import { Col, FormGroup, Label, Row } from 'reactstrap'
import SliderRow from "./form-components/SliderRow"
import ToggleRow from "../../../../../../components/insurance-app/common-forms/toggle-row/ToggleRow"
import { Button, CurrencyInput, Select } from 'base-app'
import { FormattedMessage, useIntl } from 'react-intl'
import moment from "moment"
import {
    KEY_DATE_INSUR_FROM, KEY_DATE_INSUR_TO, KEY_DURATION, KEY_TIME_INSUR_FROM, KEY_TIME_INSUR_TO, KEY_TOGGLE_MATERIAL_HOME,
    suggCoverage, KEY_TOGGLE_ASSETS_HOME, KEY_MATERIAL_HOME_LIMIT_COMPENSATED,
    KEY_ASSESTS_HOME_LIMIT_COMPENSATED, KEY_TOGGLE_ALTER_BENEFICIARY, KEY_BENEFIARRY_BANK_SELETECTED, KEY_BENEFICIARY_BRANCH,
    KEY_BENEFICIARY_ADDRESS, KEY_BENEFICIARY_LIMIT, KEY_DEDUCTION, KEY_COUPON_CODE, durationInitVal, KEY_COVERAGE, KEY_FEE_RATE
} from "./formikConfig"
import { getKeyLang } from "../../../../../../configs/insurance-app"
import Utils from "../../../../../../configs/insurance-app/constants/Utils"
import { getRightPaymentVATFee, intlConvertToVnd, isObjEmpty, selectErrorStyles, selectNormalStyles } from "../../../../../../ultity"
import { FEE_RATE_ADVANCE, FEE_RATE_BASIC, fillMultipleStepInfo } from "./utility"
import AlterBeneficiaryBank from "../../../../../../components/insurance-app/common-forms/alter-beneficiaries/BankInfo"
import PaymentType from '../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { updateProps } from "../../../../../../redux/actions/insurance-app/buyInsurancesPersonalHome"
import CalFeeDone from '../../../../../../components/insurance-app/common-forms/calculate-fee/CalFeeDone'
import { KEY_PAYMENT_TYPE } from "../../../../../../redux/reducers/insurance-app/buyInsurancesPersonalHome"
import UnControlledPopover from '../../../../../../components/insurance-app/common-forms/popup'
import { KEY_TIME_USED, MAX_USED_TIME } from "../step1/formikConfig"
import { DATE_FORMAT } from "../../../../../../components/insurance-app/buy-insurances-page/formik-config"
import { getTextClassesBy } from "../../../../../../components/insurance-app/common-forms/title-row/TitleRow"
import styled from "styled-components"

const FeeRateSelectStyled = styled(Row)`
   label {
        display : none !important;
    }
`
const StepForm = ({ dataFees, contractId, paymentType, hasCalFeeDone, formik, callbacks, stepInfo }) => {
    const intl = useIntl()
    const { errors, touched, values, setFieldValue, setValues , getFieldMeta } = formik
    const { disableContinueBtn, dispatch, handleCalculateFee } = callbacks
    const { step_1, step_2 } = stepInfo
    const { [KEY_TIME_USED]: usedTime } = step_1

    const sliderInfo = useMemo(() => {
        const _max = Math.max(durationInitVal, (MAX_USED_TIME + 1 - usedTime) * 12)
        if (Number(usedTime) <= 20) {
            return ({
                min: 6,
                max: _max,
                stepValue: 6
            })
        }
        return ({
            min: 3,
            max: _max,
            stepValue: 3,
        })
    }, [usedTime])

    const popoverFeeAction = (companyDataFee) => {
        let data = []

        // const _right = getRightPaymentVATFee(paymentType, companyDataFee)
        // if (_right !== undefined) {
        //     let paymentFee = {}
        //     paymentFee.name = intl.formatMessage({ id: getKeyLang(`paymentFee`) })
        //     paymentFee.value = intlConvertToVnd(_right, intl) + " VND"
        //     data.push(paymentFee)
        // }

        // if (companyDataFee.reduceFee !== undefined) {
        //     let reduceFee = {}
        //     reduceFee.name = "Phí giảm"
        //     reduceFee.value = intlConvertToVnd(companyDataFee.reduceFee, intl) + " VND"
        //     data.push(reduceFee)
        // }

        if (companyDataFee.feeMaterial !== undefined) {
            let feeMaterial = {}
            feeMaterial.name = "Phí bảo hiểm phần vật chất"
            feeMaterial.value = intlConvertToVnd(companyDataFee.feeMaterial, intl) + " VND"
            data.push(feeMaterial)
        }

        if (companyDataFee.feeAsset !== undefined) {
            let feeAsset = {}
            feeAsset.name = "Phí bảo hiểm phần tài sản"
            feeAsset.value = intlConvertToVnd(companyDataFee.feeAsset, intl) + " VND"
            data.push(feeAsset)
        }

        let totalFeeVAT = {}
        totalFeeVAT.name = "totalFeeVAT"
        totalFeeVAT.id = "totalFeeVAT"
        totalFeeVAT.value = intlConvertToVnd(+companyDataFee.feeInsurance, intl)
        data.push(totalFeeVAT)

        return data
    }

    useEffect(() => {
        if (isObjEmpty(step_2)) { return }
        fillMultipleStepInfo(step_2, setFieldValue, setValues)
    }, [])

    return (
        <div>
            <SliderRow
                errors={errors} values={values} setFieldValue={setFieldValue}
                disableContinueBtn={disableContinueBtn}
                sliderValue={values[KEY_DURATION]}
                sliderInfo={sliderInfo}
                sliderOnChange={(value) => {
                    disableContinueBtn && disableContinueBtn()

                    setFieldValue(KEY_DURATION, value)
                    setFieldValue(KEY_DATE_INSUR_TO,
                        moment(values[KEY_DATE_INSUR_FROM])
                            .add(value, 'M')
                            .format(DATE_FORMAT)
                    )
                }}
                keyNames={{
                    KEY_DURATION: KEY_DURATION,
                    KEY_DATE_INSUR_FROM,
                    KEY_DATE_INSUR_TO,
                    KEY_TIME_INSUR_FROM,
                    KEY_TIME_INSUR_TO,
                }}
            />

            <ToggleRow
                values={values}
                isHideIcon={true}
                msgField={getKeyLang(`materialHomeInsurance`)}
                fieldName={KEY_TOGGLE_MATERIAL_HOME}
                toggleOnChange={() => {
                    disableContinueBtn && disableContinueBtn()
                }}
            />
            {
                values[KEY_TOGGLE_MATERIAL_HOME] ?
                    <Row className="mt-2">
                        <Col xs={12} md={12}>
                            <FormGroup className={"form-label-group"}>
                                <CurrencyInput
                                    id={KEY_MATERIAL_HOME_LIMIT_COMPENSATED}
                                    value={values[KEY_MATERIAL_HOME_LIMIT_COMPENSATED]}
                                    onChange={(e) => {
                                        disableContinueBtn && disableContinueBtn()
                                        setFieldValue(KEY_MATERIAL_HOME_LIMIT_COMPENSATED, e.target.value)
                                    }}
                                    placeholder={getKeyLang('limitCompensated')}
                                    className={`form-control form-label-group ${errors[KEY_MATERIAL_HOME_LIMIT_COMPENSATED] ? 'is-invalid' : false}`}
                                />
                                {
                                    (errors[KEY_MATERIAL_HOME_LIMIT_COMPENSATED])
                                    &&
                                    <div style={{ fontSize: ".8rem", position: "absolute", left: "4px", bottom: "-20px" }} className="text-danger">
                                        {errors[KEY_MATERIAL_HOME_LIMIT_COMPENSATED]}
                                    </div>
                                }
                                <Label >{intl.formatMessage({ id: getKeyLang('limitCompensated') })}</Label>
                            </FormGroup>
                        </Col>
                    </Row >
                    :
                    null
            }

            <ToggleRow
                values={values}
                isHideIcon={true}
                msgField={getKeyLang(`materialAssetHomeInsurance`)}
                fieldName={KEY_TOGGLE_ASSETS_HOME}
                toggleOnChange={() => {
                    disableContinueBtn && disableContinueBtn()

                    if (values[KEY_TOGGLE_ASSETS_HOME]) {
                        setFieldValue(KEY_TOGGLE_ASSETS_HOME, false)
                        return
                    }
                    setFieldValue(KEY_TOGGLE_ASSETS_HOME, true)
                }}
            />
            {
                values[KEY_TOGGLE_ASSETS_HOME] ?
                    <>
                        <Row className="mt-2">
                            <Col xs={12} md={12}>
                                <FormGroup className={"form-label-group"}>
                                    <CurrencyInput
                                        id={KEY_ASSESTS_HOME_LIMIT_COMPENSATED}
                                        value={values[KEY_ASSESTS_HOME_LIMIT_COMPENSATED]}
                                        onChange={(e) => {
                                            disableContinueBtn && disableContinueBtn()
                                            setFieldValue(KEY_ASSESTS_HOME_LIMIT_COMPENSATED, e.target.value)
                                        }}
                                        placeholder={getKeyLang('limitCompensated')}
                                        className={`form-control form-label-group ${errors[KEY_ASSESTS_HOME_LIMIT_COMPENSATED] ? 'is-invalid' : false}`}
                                    />
                                    {
                                        (errors[KEY_ASSESTS_HOME_LIMIT_COMPENSATED])
                                        &&
                                        <div style={{ fontSize: ".8rem", position: "absolute", left: "4px", bottom: "-20px" }} className="text-danger">
                                            {errors[KEY_ASSESTS_HOME_LIMIT_COMPENSATED]}
                                        </div>
                                    }
                                    <Label >{intl.formatMessage({ id: getKeyLang('limitCompensated') })}</Label>
                                </FormGroup>
                            </Col>
                        </Row >
                    </>
                    :
                    null
            }

            <Row className="mt-1">
                <UnControlledPopover
                    targetId="uncontrolled-popover-01"
                    positionStyle={{ top: "-1px", left: "168px", zIndex: "2" }}
                    contents={[
                        " - Phạm vi bảo hiểm cơ bản: HBH bồi thường cho người được bảo hiểm những thiệt hại xảy ra do Cháy, Sét đánh, Nổ.",
                        " - Phạm vi bảo hiểm toàn diện bao gồm cơ bản, mở rộng 1 (thiệt hại do giông, bão , lũ lụt - bao gồm nước biển tràn, vỡ hoặc tràn nước từ các bể chứa nước, thiết bị chứa nước hoặc đường ống dẫn nước, va chạm với ngôi nhà, trộm cướp) và mở rộng 2 (chi phí dọn dẹp hiện trường và thuê nhà sau tổn thất).",
                    ]}
                />
                <Col xs={8} md={6}>
                    <span className={getTextClassesBy("toggle-row-title")}>
                        <FormattedMessage id={getKeyLang(`coverage`)} />
                    </span>
                </Col>
            </Row>

            <Row className="mt-1">
                <Col xs={12} md={12}>
                    <Select
                        readOnly
                        closeMenuOnSelect={true}
                        classNamePrefix='select'
                        className="custom-zindex9"
                        onChange={(original) => {
                            disableContinueBtn && disableContinueBtn()
                            setFieldValue(KEY_COVERAGE, original.content)
                            setFieldValue(KEY_FEE_RATE , '')
                        }}
                        value={suggCoverage.find(elt => elt.content === values[KEY_COVERAGE])}
                        options={suggCoverage}
                        isClearable={false}
                    />
                </Col>
            </Row>

             {/* // tỉ lệ phí */}
             <Row>
                <Col xs={8} md={6}>
                    <span className={`${getTextClassesBy("toggle-row-title")} d-flex`}>
                        <FormattedMessage id={getKeyLang(`home.private.feeRate`)} />
                        <UnControlledPopover
                    targetId="uncontrolled-popover-01"
                    positionStyle={{ top: "-1px" , left : "10px" ,zIndex: "2" }}
                    contents={[
                        " - Phạm vi bảo hiểm cơ bản: HBH bồi thường cho người được bảo hiểm những thiệt hại xảy ra do Cháy, Sét đánh, Nổ.",
                        " - Phạm vi bảo hiểm toàn diện bao gồm cơ bản, mở rộng 1 (thiệt hại do giông, bão , lũ lụt - bao gồm nước biển tràn, vỡ hoặc tràn nước từ các bể chứa nước, thiết bị chứa nước hoặc đường ống dẫn nước, va chạm với ngôi nhà, trộm cướp) và mở rộng 2 (chi phí dọn dẹp hiện trường và thuê nhà sau tổn thất).",
                    ]} 
                />
                    </span>
                   
                </Col>
                </Row>

            <FeeRateSelectStyled className="mt-1">
                <Col xs={12} md={12}>
                <Select
                        readOnly
                        closeMenuOnSelect={true}
                        placeholder={<FormattedMessage id={getKeyLang(`home.private.feeRate`)} />}
                        classNamePrefix='select'
                        className="custom-zindex3"
                        styles={errors[KEY_FEE_RATE] ? selectErrorStyles : selectNormalStyles}
                        onChange={(original) => {
                            setFieldValue(KEY_FEE_RATE, original.value)
                            disableContinueBtn && disableContinueBtn()
                        }}
                    value={values[KEY_COVERAGE] === 'BASIC' ? FEE_RATE_BASIC.find(elt => elt.value === values[KEY_FEE_RATE]) : FEE_RATE_ADVANCE.find(elt => elt.value === values[KEY_FEE_RATE]) }
                        options={getFieldMeta(KEY_COVERAGE).value === 'BASIC' ? FEE_RATE_BASIC : FEE_RATE_ADVANCE}
                        isClearable={false}
                    />
                </Col>
            </FeeRateSelectStyled>
            <Row className="mt-1">
                <UnControlledPopover
                    targetId="uncontrolled-popover-03"
                    contents={[
                        "Mức khấu trừ là số tiền mà người được bảo hiểm phải tự chịu đối với mỗi tổn thất hoặc chuỗi tổn thất phát sinh từ cùng một nguồn gốc hoặc nguyên nhân.",
                    ]}
                    positionStyle={{ top: "-2px", left: "146px", zIndex: "1" }}
                />
                <Col xs={6} md={2}>
                    <span className={getTextClassesBy("toggle-row-title")}>
                        <FormattedMessage id={getKeyLang(`deductionLimit`)} />
                    </span>
                </Col>
                <Col xs={6} md={10}>
                    <div className="d-flex justify-content-start">
                        <span className="primary text-bold-600">
                            {
                                intlConvertToVnd(
                                    values[KEY_DEDUCTION] * 1_000_000,
                                    intl
                                )
                            }
                        </span>
                        <span>&nbsp;</span>
                        <span>VND</span>
                        <span>/ vụ</span>
                    </div>
                </Col>
            </Row>

            <ToggleRow
                values={values}
                isHideIcon={true}
                msgField={getKeyLang(`AlterBeneficiary`)}
                fieldName={KEY_TOGGLE_ALTER_BENEFICIARY}
                toggleOnChange={() => {
                    disableContinueBtn && disableContinueBtn()

                    if (values[KEY_TOGGLE_ALTER_BENEFICIARY]) {
                        setFieldValue(KEY_TOGGLE_ALTER_BENEFICIARY, false)
                        return
                    }
                    setFieldValue(KEY_TOGGLE_ALTER_BENEFICIARY, true)
                }}
                className="mt-3"
            />
            {
                values[KEY_TOGGLE_ALTER_BENEFICIARY] &&
                <AlterBeneficiaryBank
                    callbacks={{
                        banksSelectChange: (original) => {
                            disableContinueBtn && disableContinueBtn()
                            setFieldValue(KEY_BENEFIARRY_BANK_SELETECTED, original.value)
                        },
                        branchInputChange: (e) => {
                            disableContinueBtn && disableContinueBtn()
                            const value = Utils.removeSpecialChar(e.target.value)
                            setFieldValue(KEY_BENEFICIARY_BRANCH, Utils.removeNumber(value))
                        },
                        addressInputChange: (e) => {
                            disableContinueBtn && disableContinueBtn()
                            setFieldValue(KEY_BENEFICIARY_ADDRESS, Utils.removeSpecialChar(e.target.value))
                        },
                        currencyInputChange: (e) => {
                            disableContinueBtn && disableContinueBtn()
                            setFieldValue(KEY_BENEFICIARY_LIMIT, e.target.value);
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
            }


            <Row className="mt-1">
                <Col xs={12} md={10} />
                <Col xs={12} md={2}>
                    <Button.Ripple
                        color={"primary"} outline
                        className='mr-1 mb-2 round btn-mobile-round'
                        onClick={handleCalculateFee}
                    >
                        <FormattedMessage id={getKeyLang(`HanlerFee`)} />
                    </Button.Ripple>
                </Col>
            </Row>

            {
                hasCalFeeDone &&
                <CalFeeDone
                    dataFees={dataFees}
                    contractId={contractId}
                    paymentType={paymentType}
                    popoverFeeAction={popoverFeeAction}
                    assignCompanyId
                />
            }
        </div>
    )
}

export default StepForm