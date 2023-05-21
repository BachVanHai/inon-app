import { BaseAppUltils, Button } from 'base-app'
import { useFormikContext } from 'formik'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import Col from 'reactstrap/lib/Col'
import Input from 'reactstrap/lib/Input'
import Row from 'reactstrap/lib/Row'
import styled from 'styled-components'
import '../../../assets/scss/elite-app/common.scss'
import { getKeyLang } from '../../../configs/elite-app'
import { KEY_LOADS } from '../../../pages/elite-app/buyNewInsurance/formikConfig'
import { updatePropsInfoVHCStatus } from '../../../redux/actions/elite-app/renewal'
import { isObjEmpty } from '../../../ultity'
import inonIconSmall from "../../../assets/images/elite-app/buy-insurance/logo-company-icon-buy-zalo.svg";
const InfoBlock = styled.div``
const Info = styled.div`
    background-color: #fff;
    color: #000;
    /* padding: 1rem; */
    border-radius : 15px;
    .title-text {
        color: #8b8b8b !important;
    }
    input[type="text"][disabled] {
        background-color: #DFDFDE;
    }
    .css-yk16xz-control{
        border-radius : 15px !important;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px !important;
    }
    .mt-1__menu{
        color : #000;
    }
`
const InfoRow = styled(Row)`
    min-height: 3.4rem;
`

const ColInputForm = styled(Col)`
    .form-label-group {
        margin-bottom: 0;
        width: 100%;
    }
    display: flex;
    align-items: center;
    input{
        border-radius: 16px;
        border: 1px solid #d9d9d9;
        color: #5f5f5f;
    }
`

const ButtonStyled = styled.div`
    cursor: pointer;
    padding: 5px 13px;
    border: solid 1px;
    border-color: ${p => p.borderColor || "inherit"};
    border-radius: .5rem;
`

/**
    @example
     const saveCallback = () => {
        // invoke when user hit save button
     }

    const details = [
        {
            label: "Chu xe",
            content: getFieldMeta(KEY_OWNER).value,
            formikKey: KEY_OWNER,
        },
        {
            label: intl.formatMessage({ id: getKeyLang("TypeVihicle") }),
            content: getFieldMeta(KEY_VEHICLE_TYPE_NAME).value,
            formikKey: KEY_VEHICLE_TYPE_NAME,
            isDisabled: false,
            contentInput: <Select
                readOnly
                isClearable={false}
                closeMenuOnSelect={true}
                classNamePrefix='select mt-1'
                className="custom-zindex8"
                placeholder={""}
                styles={getFieldMeta(KEY_VEHICLE_TYPE).error ? selectErrorStyles : selectNormalStyles}
                value={!isArrayEmpty(vehiclesType) && vehiclesType.find(elt => elt.value == getFieldMeta(KEY_VEHICLE_TYPE).value)}
                options={vehiclesType || []}
                onChange={(original) => {
                    setFieldValue(KEY_VEHICLE_TYPE, original.value)
                }}
            />,
            formikKey: KEY_VEHIC
        },
    ]
    return (
        <EditableBlock
            title={"Thong tin chu tai san"}  // can omitted
            saveCallback={saveCallback}
            details={details}
            isEditMode={false}  // can omitted
        />
    )
 */
const EditableBlock = ({ isEditMode, isHideEditBtn, saveCallback, title = "", details = [], className }) => {
    const { errors, setFieldValue, values, setValues  } = useFormikContext()
    const [lastSavedValues, setLastSavedValues] = React.useState({})
    const [_isEditMode, setisEditMode] = React.useState(isEditMode)
    const dispatch = useDispatch()

    const toggleModify = () => {
        if (!_isEditMode) {
            dispatch(updatePropsInfoVHCStatus(true))
            setLastSavedValues({ ...values })
            setisEditMode(true)
            
            return
        }
        if (!isObjEmpty(errors)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.fullInfo`)} />)
            return
        }
        dispatch(updatePropsInfoVHCStatus(false))
        setisEditMode(false)
        saveCallback && saveCallback()
    }

    const cancelModify = () => {
        dispatch(updatePropsInfoVHCStatus(false))
        setisEditMode(false)
        setValues(lastSavedValues)
    }

    const handleKeyPress = (e) => {  /* onKeyPress event will invoke before onChange event */
        const potentialEnterKey = e.charCode;
        const potentialEscKey = e.key;
        if (potentialEnterKey === 13 || potentialEscKey === "Escape") {
            toggleModify()
        }
    }
    const [changeCount, setChangeCount] = React.useState(0)
    React.useEffect(() => {
        if (changeCount < 2) {
            setChangeCount(_count => ++_count)
            setLastSavedValues({ ...values })
        }
    }, [JSON.stringify(values)])

    return (
        <InfoBlock className={className}>
            {
                title &&
                <Row className="mb-1">
                    <Col xs={12} md={12} className="">
                        <div className='d-flex align-items-center'>
                            {/* <Icon.Info color="#2B7E6C" style={{marginRight : "5px"}} /> */}
                            <img src={inonIconSmall} /> <span className="font-medium-1 ml-1 font-weight-bold text-primary-highlight letter-uppercase text-uppercase" style={{ color: "#2B7E6C" }}>{title}</span>
                        </div>
                    </Col>
                </Row>
            }

            <Info className=''>
                {
                    details.map((elt, index) => {
                        return (
                            <div key={index}>
                                {
                                    elt.isHidden ? null :
                                        <InfoRow>
                                            <Col xs={elt.colContent ? elt.colContent : 6} md={4} className=" font-weight-bold title-text d-flex align-items-center pl-2 mb-1">
                                                <span className='font-medium-2'>{elt.label}</span>
                                            </Col>
                                            {
                                                !_isEditMode ?
                                                    <Col xs={!_isEditMode ?  6 : 12} md={8} className="d-flex align-items-center pl-2 mb-1">
                                                        <span className='overflow-auto'>{elt.content}</span>
                                                    </Col>
                                                    :
                                                    <ColInputForm xs={12} md={8} onKeyPress={handleKeyPress}>
                                                        {
                                                            elt.contentInput ?
                                                                elt.contentInput
                                                                :
                                                                <Input
                                                                    onChange={(e) => {
                                                                        setFieldValue(elt.formikKey, e.target.value)
                                                                    }}
                                                                    value={elt.formikKey === KEY_LOADS ? values[KEY_LOADS] : elt.content }
                                                                    className={`${errors[elt.formikKey] ? "is-invalid" : ""} form-label-group mb-1`}
                                                                    disabled={elt.isDisabled}
                                                                />
                                                        }
                                                    </ColInputForm>
                                            }
                                        </InfoRow>
                                }


                            </div>

                        )
                    })
                }
            </Info>

            {
                !isHideEditBtn &&
                <div className='mt-1 font-medium-2 d-flex justify-content-end'>
                    { 
                    _isEditMode ? 
                           <Button className='text-primary' color='primary'
                           onClick={toggleModify}
                           borderColor={"green"}
                        >
                           <FormattedMessage id={getKeyLang("SaveFee")} />
                        </Button> : 
                            <Button.Ripple
                            onClick={toggleModify}
                            borderColor={"green"}
                         >
                           <FormattedMessage id={getKeyLang("change")} />
                         </Button.Ripple>  

                    }
                 
                    {
                        _isEditMode &&
                        <Button.Ripple className='ml-2'
                            onClick={cancelModify}
                        >
                            <FormattedMessage id={getKeyLang("ConfirmCancel")} />
                        </Button.Ripple>
                    }
                </div>
            }
        </InfoBlock>
    )
}

export default EditableBlock
