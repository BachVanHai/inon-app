import React from 'react'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import Input from 'reactstrap/lib/Input'
import { isObjEmpty } from '../../../../ultity'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../configs/insurance-app'
import { BaseAppUltils } from 'base-app'

const InfoBlock = styled.div``
const Info = styled.div`
    background-color: #f4f9f4;
    padding: .5rem;
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
const EditableBlock = ({ isEditMode, isHideEditBtn, saveCallback, title = "", details = [], className   }) => {
    const { errors, setFieldValue, values, setValues } = useFormikContext()
    const [lastSavedValues, setLastSavedValues] = React.useState({})
    const [_isEditMode, setisEditMode] = React.useState(isEditMode)

    const toggleModify = () => {
        if (!_isEditMode) {
            setLastSavedValues({ ...values })
            setisEditMode(true)
            return
        }
        if (!isObjEmpty(errors)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`alert.fullInfo`)} />)
            return
        }

        setisEditMode(false)
        saveCallback && saveCallback()
    }

    const cancelModify = () => {
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
                        <span className="font-medium-4 font-weight-bold text-primary-highlight letter-uppercase">{title}</span>
                    </Col>
                </Row>
            }

            <Info className=''>
                {
                    details.map((elt, index) => {
                        return (
                            <InfoRow key={index} className={elt.className}>
                                <Col xs={4} md={4} className="primary d-flex align-items-center pl-2">
                                    <span className='font-medium-2'>{elt.label}</span>
                                </Col>
                                {
                                    !_isEditMode ?
                                        <Col xs={8} md={8} className="d-flex align-items-center pl-2">
                                            <span className='font-medium-2 overflow-auto'>{elt.content}</span>
                                        </Col>
                                        :
                                        <ColInputForm xs={8} md={8} onKeyPress={handleKeyPress}>
                                            {
                                                elt.contentInput ?
                                                    elt.contentInput
                                                    :
                                                    <Input
                                                        onChange={(e) => {
                                                            setFieldValue(elt.formikKey, e.target.value)
                                                        }}
                                                        value={elt.content}
                                                        className={errors[elt.formikKey] ? "is-invalid" : ""}
                                                        disabled={elt.isDisabled}
                                                    />
                                            }
                                        </ColInputForm>
                                }
                            </InfoRow>
                        )
                    })
                }
            </Info>

            {
                !isHideEditBtn &&
                <div className='mt-1 font-medium-2 d-flex justify-content-end'>
                    <ButtonStyled className='text-primary'
                        onClick={toggleModify}
                        borderColor={"green"}
                    >
                        {
                            _isEditMode ?
                                <FormattedMessage id={getKeyLang("SaveFee")} />
                                :
                                <FormattedMessage id={getKeyLang("change")} />
                        }
                    </ButtonStyled>

                    {
                        _isEditMode &&
                        <ButtonStyled className='ml-2'
                            onClick={cancelModify}
                        >
                            <FormattedMessage id={getKeyLang("ConfirmCancel")} />
                        </ButtonStyled>
                    }
                </div>
            }
        </InfoBlock>
    )
}

export default EditableBlock
