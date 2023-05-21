import { useFormikContext } from 'formik'
import React from 'react'
import { CardBody, CardText, Input, Row, Col, Button } from 'reactstrap'
import { KEY_PACKAGE_SELECTED, packages, durations, KEY_DURATION_SELECTED, initialValues, getInsuranceFeeBy } from './formikConfig'
import { FormattedMessage, useIntl } from 'react-intl'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { fillMultipleStepInfo, intlConvertToVnd, isArrayEmpty, isObjEmpty } from '../../../../../../ultity'
import styled from 'styled-components'
import { KEY_ADDTIONAL_PEOPLE } from '../step1/formikConfig'
import * as Icon from 'react-feather'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardFooter from 'reactstrap/lib/CardFooter'

const PackagesBlock = styled(Col)`
    padding-left: 3rem;
    padding-right: 3rem;
`

const PackageBlock = styled.div`
    box-shadow: 5px 5px 11px 7px #d1d1d1;
    border-radius: .5rem;
`

const CustomDurationInputStyled = styled(Input)`
    transform: translate(0px, -4px);
    position: relative;
    display: block;
    margin: 0;

    /* remove standard background appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* create custom radiobutton appearance */
    display: inline-block;
    width: 25px;
    height: 25px;
    padding: 6px;
    /* background-color only for content */
    background-clip: content-box;
    border: 2px solid #bbbbbb;
    background-color: #e7e6e7;
    border-radius: 50%;
    &:checked {
        background-color: green;
    }
`

const DurationBlock = styled.div`
    display: flex;
    margin-right : 1rem;
    margin-top: 1rem;
`

const DurationsBlock = styled.div`
    width: 100%;
`

const FeeRow = styled.div`
    border-radius: .5rem;
    padding: .7rem;
    box-shadow: none !important;
`

const StepForm = ({ stepInfo, className }) => {
    const intl = useIntl()
    const { getFieldMeta, setFieldValue, setValues } = useFormikContext()
    const { step_1, step_2 } = stepInfo
    const addtionalPeople = step_1[KEY_ADDTIONAL_PEOPLE]

    const handlePackageRadioChange = (elt_val) => {
        setFieldValue(KEY_PACKAGE_SELECTED, elt_val)
    }
    const handleDurationRadioChange = (elt_val) => {
        setFieldValue(KEY_DURATION_SELECTED, elt_val)
    }

    React.useEffect(() => {
        if (isObjEmpty(step_2)) return
        fillMultipleStepInfo(step_2, initialValues, setValues)
    }, [])

    return (
        <div className={className}>
            <CardText className='mb-3' tag="h5">
                (*) Vui lòng chọn gói bảo hiểm và thời hạn
            </CardText>

            <Row className={''}>
                {
                    packages.map((elt, index, _packages) => {
                        const isSelected = getFieldMeta(KEY_PACKAGE_SELECTED).value === elt.value
                        const selectedTextColor_1 = isSelected ? "text-yellow" : "text-dark"
                        const selectedTextColor_2 = isSelected ? "text-white" : "text-dark"
                        return (
                            <PackagesBlock xs={12} md={4} key={index} className={"mb-3"}>
                                <PackageBlock
                                    className={"cursor-pointer " + (isSelected ? "card-active" : "")}
                                    onClick={() => {
                                        handlePackageRadioChange(elt.value)
                                    }}
                                >
                                    <CardHeader className='d-flex justify-content-center flex-column'>
                                        <span className='text-center mb-1'>
                                            <Icon.Shield size={30} color={isSelected ? "#fff" : "#28c77c"} />
                                        </span>
                                        <h2 className={`font-weight-bold ` + (isSelected ? "text-white" : "success")}>
                                            {elt.msgField}
                                        </h2>
                                        <h3 className={isSelected ? "text-white" : "text-dark"} >
                                            ({elt.packageSubtitleField})
                                        </h3>
                                    </CardHeader>

                                    <CardBody>
                                        <h6 className={`font-medium-2 text-bold-700 text-center mb-2 ` + selectedTextColor_1}>
                                            Quyền lọi bảo hiểm tai nạn
                                        </h6>
                                        <div className='text-center mb-2'>
                                            {elt.fee_1 + " triệu đồng"}
                                        </div>

                                        <h6 className={`font-medium-2  text-bold-700 text-center mb-2 ` + selectedTextColor_1}>
                                            Quỹ hỗ trợ mùa dịch
                                        </h6>
                                        <div className={'text-center mb-2 ' + selectedTextColor_2}>
                                            Tử vong
                                        </div>
                                        <div className='text-center mb-2'>
                                            {elt.fee_2 + " triệu đồng"}
                                        </div>
                                        <div className={'text-center mb-2 ' + selectedTextColor_2}>
                                            Nằm viện
                                        </div>
                                        <div className='text-center mb-2'>
                                            {elt.fee_3 + " triệu đồng"}
                                        </div>
                                        <div className={'text-center mb-2 ' + selectedTextColor_2}>
                                            Điều trị sốc phản vệ
                                        </div>
                                        <div className='text-center mb-2'>
                                            {elt.fee_4 + " triệu đồng"}
                                        </div>
                                    </CardBody>
                                    <CardFooter className='d-flex justify-content-center'>
                                        {
                                            isSelected ?
                                                <Icon.Check size={40} color='#ffd503' />
                                                :
                                                <Button outline color="warning">
                                                    <FormattedMessage id={getKeyLang('selectPackage')} />
                                                </Button>
                                        }
                                    </CardFooter>
                                </PackageBlock>
                            </PackagesBlock>
                        )
                    })
                }
            </Row>

            <div>
                <CardText className='mb-1' tag="h3">
                    <FormattedMessage id={getKeyLang(`RangeDate`)} />
                </CardText>

                <DurationsBlock>
                    {
                        durations.map((elt, index) => {
                            return (
                                <DurationBlock key={index}>
                                    <CustomDurationInputStyled
                                        id={`my-custom-duration-vta-radio-${index}`}
                                        type="radio" name={elt.name}
                                        onChange={() => handleDurationRadioChange(elt.value)}
                                        checked={getFieldMeta(KEY_DURATION_SELECTED).value === elt.value}
                                    />
                                    <div className='ml-1'>{elt.value} <span>tháng</span></div>
                                </DurationBlock>
                            )
                        })
                    }
                </DurationsBlock>
            </div>

            <FeeRow className="card-active mt-2">
                <Row className=''>
                    <Col xs={6} md={6}>
                        <div className="font-medium-2">
                            <FormattedMessage id={getKeyLang("feeInsurance")} />
                        </div>
                    </Col>

                    <Col xs={6} md={6}>
                        <span className={"font-medium-2"}>
                            {intlConvertToVnd(
                                getInsuranceFeeBy(
                                    getFieldMeta(KEY_DURATION_SELECTED).value,
                                    getFieldMeta(KEY_PACKAGE_SELECTED).value
                                )
                                , intl
                            )}
                        </span>
                        <span>&nbsp;</span>
                        <span>VND</span>
                        <span>/</span>
                        <span>
                            <FormattedMessage id={getKeyLang("people")} />
                        </span>
                    </Col>
                </Row>

                <Row className='mt-1'>
                    <Col xs={6} md={6}>
                        <div className="font-medium-2">
                            <FormattedMessage id={getKeyLang("FeeTotal")} />
                        </div>
                    </Col>

                    <Col xs={6} md={6}>
                        <span className={"font-medium-2"}>
                            {intlConvertToVnd(
                                (!isArrayEmpty(addtionalPeople) ? addtionalPeople.length : 1) *
                                getInsuranceFeeBy(
                                    getFieldMeta(KEY_DURATION_SELECTED).value,
                                    getFieldMeta(KEY_PACKAGE_SELECTED).value
                                )
                                , intl
                            )}
                        </span>
                        <span>&nbsp;</span>
                        <span>VND</span>
                    </Col>
                </Row>
            </FeeRow>
        </div >
    )
}

export default StepForm