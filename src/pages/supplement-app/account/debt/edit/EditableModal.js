import 'react-table/react-table.css'
import React, { useEffect, useMemo, useState } from 'react'
import { getKeyLang } from '../../../../../configs/supplement-app'
import { Col, FormGroup, Row, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Select, Button, CurrencyInput, BaseAppUltils, BaseFormGroup, showConfirmAlert } from 'base-app'
import {
    FIFTH_DAY, DAY_30TH, DAYS_AMOUNT_MAX, DAY_MAX,
    convertStrToNumber, addDays, convertNumberToVndStr, addDay, REJECT, hasValuesEqual
} from './utility'
import DebtService from '../../../../../services/supplement-app/debt'
import { useFormik, FormikProvider } from 'formik'
import { validationSchema, validate } from './formikConfig'
import { useDispatch } from 'react-redux'

const EditableModal = ({ original, handleCancelBtnClick, isModalEditable, closeModal, reActiveLoadApi, isModalOpen, intl, device }) => {
    const dispatch = useDispatch()

    const dueDateTypes = useMemo(() => {
        return [
            {
                fieldName: "daysAmount",
                label: intl.formatMessage({ id: getKeyLang("account.dueDateType.day30th") }),
                label_day: intl.formatMessage({ id: getKeyLang("account.daysAmount") }),
                label_dayComponent: (setFieldValue) => (
                    <BaseFormGroup
                        id='dueDateTypeDaysAmountInput'
                        messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                        fieldName={`daysAmount`}
                        type={`number`}
                        onChange={(e) => {
                            const currentVal = e.target.value
                            if (currentVal > DAYS_AMOUNT_MAX) {
                                setFieldValue(`daysAmount`, DAYS_AMOUNT_MAX)
                            }
                        }}
                    />
                ),
                label_dayComponent_error: (errors) => {
                    return (
                        <div style={{ fontSize: ".8rem", position: "absolute", left: "15px", bottom: "5px" }} className="text-danger">
                            {errors.daysAmount}
                        </div>
                    )
                },
                origin_label: getKeyLang("account.dueDateType.day30th"),
                type: DAY_30TH,
                value: 1,
            },
            {
                fieldName: "day",
                label: intl.formatMessage({ id: getKeyLang("account.dueDateType.fifthday") }),
                label_day: intl.formatMessage({ id: getKeyLang("account.day") }),
                label_dayComponent: (setFieldValue) => (
                    <BaseFormGroup
                        id='dueDateTypeDayInput'
                        messageId={getKeyLang(`evoucher.create.insurances.empty`)}
                        fieldName={`day`}
                        type={`number`}
                        onChange={(e) => {
                            const currentVal = e.target.value
                            if (currentVal > DAY_MAX) {
                                setFieldValue(`day`, DAY_MAX)
                            }
                        }}
                    />
                ),
                label_dayComponent_error: (errors) => {
                    return (
                        <div style={{ fontSize: ".8rem", position: "absolute", left: "15px", bottom: "5px" }} className="text-danger">
                            {errors.day}
                        </div>
                    )
                },
                origin_label: getKeyLang("account.dueDateType.fifthday"),
                type: FIFTH_DAY,
                value: 2,
            },
        ]
    }, [])

    const getDueDateType = (type) => {
        switch (type) {
            case DAY_30TH:
                return dueDateTypes[0]
            case FIFTH_DAY:
                return dueDateTypes[1]
            default:
                return null
        }
    }

    const pre_dueDateType = useMemo(() => {
        return dueDateTypes.find(dueDateElt => dueDateElt.type === original.dueDateType)
    }, [])

    ///// formik sectiion
    const [isValidateOnChange, setValidateOnChange] = useState(false)
    const [dueDateType, setDueDateType] = useState(pre_dueDateType)

    const initialValues = {
        day: (original.dueValue && convertStrToNumber(original.dueValue) < 5) ? convertStrToNumber(original.dueValue) : DAY_MAX,
        daysAmount: convertStrToNumber(original.dueValue) || DAYS_AMOUNT_MAX,
        transactionLimit: convertNumberToVndStr(original.transactionLimit),
        monthlyLimit: convertNumberToVndStr(original.monthlyLimit),
        dailyLimit: convertNumberToVndStr(original.dailyLimit),
        dueDateType: pre_dueDateType,
    }

    const handleSubmitClick = async (values) => {
        // return console.log(`Formik.onSubmit.values`, values, original.id, dueDateType.type, original.applyDate)
        const { transactionLimit, dailyLimit, monthlyLimit, day, daysAmount } = values
        const hasEqual = hasValuesEqual(values, initialValues)

        if (hasEqual) {
            dispatch(
                showConfirmAlert({
                    title: <FormattedMessage id={getKeyLang(`confirm.title.edit`)} />,
                    isShow: true,
                    content: <FormattedMessage id={getKeyLang(`confirm.content.nothingChange`)} />,
                    onConfirm: async () => {
                        let dueValue = day
                        if (dueDateType.type === DAY_30TH) {
                            dueValue = daysAmount
                        }
                        let applyDate = addDays(original.applyDate)
                        if (original.approvalStatus === REJECT) {
                            applyDate = addDay(original.applyDate)
                        }
                        const resolveData = await DebtService.editDebtAccount(
                            original.id,
                            convertStrToNumber(transactionLimit),
                            convertStrToNumber(dailyLimit),
                            convertStrToNumber(monthlyLimit),
                            dueDateType.type || pre_dueDateType.type,
                            convertStrToNumber(dueValue),
                            applyDate
                        )
                        if (resolveData) {
                            BaseAppUltils.toastSuccess(intl.formatMessage({ id: getKeyLang("account.success") }))
                            closeModal()
                            reActiveLoadApi()
                            return
                        }
                        BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang("account.error") }))
                        closeModal()
                    }
                })
            )
            return
        }

        let dueValue = day
        if (dueDateType.type === DAY_30TH) {
            dueValue = daysAmount
        }
        let applyDate = addDays(original.applyDate)
        if (original.approvalStatus === REJECT) {
            applyDate = addDay(original.applyDate)
        }
        const resolveData = await DebtService.editDebtAccount(
            original.id,
            convertStrToNumber(transactionLimit),
            convertStrToNumber(dailyLimit),
            convertStrToNumber(monthlyLimit),
            dueDateType.type || pre_dueDateType.type,
            convertStrToNumber(dueValue),
            applyDate
        )
        if (resolveData) {
            BaseAppUltils.toastSuccess(intl.formatMessage({ id: getKeyLang("account.success") }))
            closeModal()
            reActiveLoadApi()
            return
        }
        BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang("account.error") }))
        closeModal()
    }

    const formik = useFormik({
        validateOnChange: isValidateOnChange,
        validateOnBlur: isValidateOnChange,
        validationSchema: validationSchema,
        initialValues: initialValues,
        onSubmit: handleSubmitClick,
        validate: validate,
    })

    const { resetForm, handleSubmit, getFieldProps, getFieldMeta, errors, setFieldValue } = formik

    const transactionLimitFieldProps = getFieldProps("transactionLimit")
    const transactionLimitFieldMeta = getFieldMeta("transactionLimit")

    const dailyLimitFieldProps = getFieldProps("dailyLimit")
    const dailyLimitFieldMeta = getFieldMeta("dailyLimit")

    const monthlyLimitFieldProps = getFieldProps("monthlyLimit")
    const monthlyLimitFieldMeta = getFieldMeta("monthlyLimit")

    const reset = () => {
        resetForm()
        setDueDateType(pre_dueDateType)
        setFieldValue(`dueDateType`, pre_dueDateType)
    }

    useEffect(() => {
        reset()
    }, [isModalOpen])

    return (
        <Modal isOpen={isModalOpen} className='modal-dialog-centered'>
            <FormikProvider value={formik}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader >
                        <FormattedMessage id={getKeyLang('bonus.detail')} />
                    </ModalHeader>

                    <ModalBody>
                        <Row className="mb-2">
                            <Col xs={12} md={6} className={`d-flex align-items-center ${device.isMobile && "mb-2"}`}>
                                {intl.formatMessage({ id: getKeyLang("account.star.monthlyLimit.vnd") })}
                            </Col>

                            <Col className="text-left" xs={12} md={6}>
                                <div className="d-flex justify-content-end align-items-center position-relative">
                                    {
                                        (monthlyLimitFieldMeta.error)
                                        &&
                                        <div style={{ fontSize: ".8rem", position: "absolute", left: "0", top: "-19px" }} className="text-danger">
                                            {errors.monthlyLimit}
                                        </div>
                                    }
                                    {
                                        isModalEditable ?
                                            <CurrencyInput
                                                {...monthlyLimitFieldProps}
                                                id='monthlyLimitInput'
                                                placeholder={getKeyLang('account.debtManagement.monthlyLimit')}
                                                style={{ marginBottom: "0", marginRight: ".3rem" }}
                                                className={`form-control form-label-group ${monthlyLimitFieldMeta.error ? 'is-invalid' : false}`}
                                            />
                                            :
                                            <div>
                                                {convertNumberToVndStr(original.monthlyLimit)}
                                            </div>
                                    }
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col xs={12} md={6} className={`d-flex align-items-center ${device.isMobile && "mb-2"}`}>
                                {intl.formatMessage({ id: getKeyLang("account.star.dailyLimit.vnd") })}
                            </Col>

                            <Col className="text-left" xs={12} md={6}>
                                <div className="d-flex justify-content-end align-items-center position-relative">
                                    {
                                        (dailyLimitFieldMeta.error)
                                        &&
                                        <div style={{ fontSize: ".8rem", position: "absolute", left: "0", top: "-19px" }} className="text-danger">
                                            {errors.dailyLimit}
                                        </div>
                                    }
                                    {
                                        isModalEditable ?
                                            <CurrencyInput
                                                {...dailyLimitFieldProps}
                                                id='dailyLimitInput'
                                                placeholder={getKeyLang('account.debtManagement.dailyLimit')}
                                                style={{ marginBottom: "0", marginRight: ".3rem" }}
                                                className={`form-control form-label-group ${dailyLimitFieldMeta.error ? 'is-invalid' : false}`}
                                            />
                                            :
                                            <div>
                                                {convertNumberToVndStr(original.dailyLimit)}
                                            </div>
                                    }
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col xs={12} md={6} className={`d-flex align-items-center ${device.isMobile && "mb-2"}`}>
                                {intl.formatMessage({ id: getKeyLang("account.star.transactionLimit.vnd") })}
                            </Col>

                            <Col className="text-left" xs={12} md={6}>
                                <div className="d-flex justify-content-end align-items-center position-relative">
                                    {
                                        (transactionLimitFieldMeta.error)
                                        &&
                                        <div style={{ fontSize: ".8rem", position: "absolute", left: "0", top: "-19px" }} className="text-danger">
                                            {errors.transactionLimit}
                                        </div>
                                    }
                                    {
                                        isModalEditable ?
                                            <CurrencyInput
                                                {...transactionLimitFieldProps}
                                                id='transactionLimitInput'
                                                placeholder={getKeyLang('account.debtManagement.transactionLimit')}
                                                style={{ marginBottom: "0", marginRight: ".3rem" }}
                                                className={`form-control form-label-group ${transactionLimitFieldMeta.error ? 'is-invalid' : false}`}
                                            />
                                            :
                                            <div>
                                                {convertNumberToVndStr(original.transactionLimit)}
                                            </div>
                                    }
                                </div>
                            </Col>
                        </Row>

                        <Row className="">
                            <Col xs={12} md={6} style={{ marginBottom: "1.5rem" }} className={`d-flex align-items-center ${device.isMobile && "mb-2"}`}>
                                {intl.formatMessage({ id: getKeyLang("account.dueDate") })}
                            </Col>

                            <Col className="text-left" xs={12} md={6}>
                                {
                                    isModalEditable ?
                                        <FormattedMessage
                                            id={dueDateType.origin_label}
                                            className="formattedMessage"
                                        >
                                            {
                                                (msg) => {
                                                    return (
                                                        <FormGroup className="mb-0">
                                                            <Select
                                                                readOnly
                                                                closeMenuOnSelect={true}
                                                                classNamePrefix='select mt-1'
                                                                onChange={original => {
                                                                    setDueDateType(original)
                                                                    setFieldValue(`dueDateType`, original)
                                                                }}
                                                                options={dueDateTypes}
                                                                placeholder={msg}
                                                                isClearable={false}
                                                            />
                                                        </FormGroup>
                                                    )
                                                }
                                            }
                                        </FormattedMessage>
                                        :
                                        <div>
                                            {getDueDateType(original.dueDateType).label}
                                        </div>
                                }
                            </Col>
                        </Row>
                        <Row className="">
                            <Col xs={12} md={6} style={{ marginBottom: "1.5rem" }} className={`d-flex align-items-center ${device.isMobile && "mb-2"}`}>
                                {
                                    getDueDateType(dueDateType.type).label_day
                                }
                            </Col>
                            <Col className="text-left" xs={12} md={6}>
                                <FormGroup>
                                    {
                                        isModalEditable ?
                                            getDueDateType(dueDateType.type).label_dayComponent(setFieldValue)
                                            :
                                            <div>
                                                {original.dueValue}
                                            </div>
                                    }
                                    {
                                        (errors[getDueDateType(dueDateType.type).fieldName])
                                        &&
                                        getDueDateType(dueDateType.type).label_dayComponent_error(errors)
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>

                    <ModalFooter>
                        {
                            isModalEditable ?
                                <Button
                                    color="primary" type="submit" className=""
                                    onClick={() => {
                                        setValidateOnChange(true)
                                    }}
                                >
                                    {
                                        intl.formatMessage({ id: getKeyLang("account.finish") })
                                    }
                                </Button>
                                :
                                null
                        }
                        <Button type="button" onClick={() => {
                            resetForm()
                            handleCancelBtnClick()
                            setDueDateType(pre_dueDateType)
                            setFieldValue(`dueDateType`, pre_dueDateType)
                        }}>
                            {
                                intl.formatMessage({ id: getKeyLang("account.cancel") })
                            }
                        </Button>
                    </ModalFooter>
                </form>
            </FormikProvider>
        </Modal>
    )
}

export default EditableModal