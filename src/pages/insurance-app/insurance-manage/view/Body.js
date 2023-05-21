import React from 'react'
import styled from 'styled-components'
import * as Icon from 'react-feather'
import { Row, Col, ButtonGroup, CardBody, Input } from 'reactstrap'
import { FormattedMessage, AppId, Button, BaseAppUltils, BaseFormGroup } from 'base-app'
import Footer from '../view/Footer'
import StepBase from '../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import {
    NAME_BUY_INSURANCES_CAR,
    NAME_BUY_INSURANCES_MOTOR,
    getKeyLang,
    ROLE_ALL,
    ROLE_PERSONAL,
    NAME_BUY_INSURANCES_HEALTH_CARE,
    INSURANCE_TYPE_HEALTH_CARE,
    INSURANCE_TYPE_HEALTH_CARE_CONTRACT,
    INSURANCE_TYPE_CAR,
    INSURANCE_TYPE_MOTOR, ROLE_PARTNER, NAME_BUY_INSURANCES_TRAVEL, INSURANCE_TYPE_TRAVEL_GET_CONTRACT
} from '../../../../configs/insurance-app'
import TreeTable from '../../../../components/insurance-app/common-forms/custom-table/TreeTable'
import ExpandableTable from '../../../../components/insurance-app/common-forms/custom-table/ExpandableTable'
import { useIntl } from 'react-intl'
import Checkbox from '../../../../components/insurance-app/checkbox/CheckboxesVuexy'
import { Check } from 'react-feather'
import {
    APPROVED,
    KEY_ISCHECK,
    KEY_SEARCHED_PENDING_CONTRACTS,
    KEY_PENDING_CONTRACTS,
    KEY_REVENUE,
    KEY_TOTAL_ELEMENTS,
    REJECTED,
    statusFilterOption,
    SUCCESS,
    CANCEL,
    CANCELING,
    KEY_START_DATE, KEY_END_DATE, KEY_REASON_REJECT
} from '../manage/formikConfig'
import {
    hasRequestFail, intlConvertToVnd, isArrayEmpty, useIsCompanyUser, useIsRootUser,
} from '../../../../ultity'
import useConfirm from '../../../../components/insurance-app/custom-modal/confirm/useConfirm'
import Service from '../services'
import { getBasePath, getInsuranceType, getDefault_expandableTableRows, getDefault_carExpandableTableRows, renderLable, getDefault_motorExpandableTableRows, getDefault_travelExpandableTableRows } from '../manage/utility'
import { setLoadingStatus } from '../../../../redux/actions/insurance-app/appConfig'
import useCustomModal from '../../../../components/insurance-app/custom-modal/modal/useCustomModal'
import { useSelector } from 'react-redux'

const IconTrashStyled = styled(Icon.Trash2)`cursor: pointer;`
const IconXStyled = styled(Icon.X)`cursor: pointer;`
const IconCircleStyled = styled(Icon.Circle)`cursor: pointer; &:hover {stroke-width: 4.4; transition: all .5s ease;}`
const IconSmallCircleStyled = styled(Icon.Circle)`
    cursor: pointer; 
    margin-right: 3.4rem;
    @media screen and (max-width : 1024px) {
        margin-right: 0;
    }
`

const Body = ({ role = 'all', formik, invokeSearchPendingContracts, isLoading, reduxName }) => {
    const intl = useIntl()
    const { values , setFieldValue , getFieldMeta } = formik
    const [_data, setData] = React.useState([])
    const isRootUser = useIsRootUser()
    const isCompanyUser = useIsCompanyUser()
    const {user} = useSelector(state => state.auth)
    const isCarPage = reduxName === NAME_BUY_INSURANCES_CAR
    const isMotorPage = reduxName === NAME_BUY_INSURANCES_MOTOR
    const isHCPage = reduxName === NAME_BUY_INSURANCES_HEALTH_CARE
    const isTCPage = reduxName === NAME_BUY_INSURANCES_TRAVEL
    const shouldShowApprovalButtons = (isRootUser || isCompanyUser) && !isArrayEmpty(_data)

    const [openModal, CustomModal] = useCustomModal("title", "content")
    const [openConfirm, ConfirmModal] = useConfirm(
        intl.formatMessage({ id: getKeyLang(`ConfirmNotice`) }),
        intl.formatMessage({ id: getKeyLang(`confirm.title.insuranceManage`) }),
        intl.formatMessage({ id: getKeyLang(`ConfirmNotice`) }),
        intl.formatMessage({ id: getKeyLang(`ConfirmCancel`) }),
        false,
        'w-100 text-center',
        'font-weight-bold text-uppercase',
    )

    const handleApproval = (approvalStatus) => {
        let _reasonRejected = ''
        const _contracts = _data.filter((filterElt) => {
            if (filterElt[KEY_ISCHECK]) {
                return true
            }
            return false
        })
        const _contracts_canceling_printedCert = _contracts.filter(elt => {
            return elt.latestApprovalStatus === CANCELING
        })
        const _contracts_needed_approval = _contracts.filter(elt => {
            const { latestApprovalStatus } = elt
            return latestApprovalStatus !== SUCCESS && latestApprovalStatus !== CANCEL && latestApprovalStatus !== CANCELING
        })
        if (isArrayEmpty(_contracts) ||
            !isArrayEmpty(_contracts_canceling_printedCert) && !isArrayEmpty(_contracts_needed_approval)) {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`toast.select.error`)} />)
            return
        }

        const actionType = !isArrayEmpty(_contracts_canceling_printedCert) ? "cancel-printedCert-contracts" : "approval-contracts"

        const decideModalContent = () => {
           
            if (approvalStatus === APPROVED) {
                if (actionType === "cancel-printedCert-contracts") {
                    return intl.formatMessage({ id: getKeyLang(`confirm.title.printedCert`) })
                }
                return intl.formatMessage({ id: getKeyLang(`confirm.title.insuranceManage`) })
            }
            if (actionType === "cancel-printedCert-contracts") {
                return intl.formatMessage({ id: getKeyLang(`confirm.title.denyPrintedCert`) })
            }
            return <>
            {
                reduxName === 'buyInsurancesCar' ? <div className='mt-1'>
                <BaseFormGroup
                fieldName={KEY_REASON_REJECT}
                messageId={getKeyLang(`management.rejected.reason`)}
                onChange={async(e) => {
                    await formik.setFieldValue(KEY_REASON_REJECT, e.target.value)
                    _reasonRejected = e.target.value
                }} 
            />
            </div> : <span className='font-weight-bold'>Bạn có chắc chắn muốn từ chối hợp đồng ?</span>
            }
            </>
        }

        const successAction = () => {
            BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang(`success`)} />)
            invokeSearchPendingContracts()
        }

        const setupObj = {
            yesAction: () => {
                if (actionType === "cancel-printedCert-contracts") {
                    Promise.all(_contracts_canceling_printedCert.map(elt => {
                        const bodyObj = {
                            "id": elt.id
                        }
                        if (approvalStatus === REJECTED) {
                            bodyObj["latestApprovalStatus"] = "REJECT"
                        }
                        return Service.updatePrintedCertContract(getBasePath(reduxName), bodyObj)
                    })).then(responses => {
                        for (let res of responses) {
                            if (!hasRequestFail(res.status)) {
                                successAction(res.status)
                                break
                            }
                        }
                    })
                    return
                }
                const contractIds = _contracts.map((mapElt) => {
                    return mapElt.id
                })
                if (approvalStatus === 'REJECT' && _reasonRejected === "" && reduxName === 'buyInsurancesCar') {
                    BaseAppUltils.toastError(<FormattedMessage id={getKeyLang(`management.rejected.reason.required`)} />)
                    return
                }else if(approvalStatus === 'APPROVED' && _reasonRejected === "") {
                    Service.approvalContract(
                        getBasePath(reduxName), approvalStatus, reduxName === 'buyInsurancesCar' || reduxName === 'buyInsurancesMotor' ? { contractIds , reasonForReject : ""} : contractIds , getInsuranceType(reduxName)
                    ).then((res) => {
                        if (hasRequestFail(res.status)) return
                        successAction(res.status)
                        formik.setFieldValue(KEY_REASON_REJECT, "")
                    })
                }else{
                    Service.approvalContract(
                        getBasePath(reduxName), approvalStatus, reduxName === 'buyInsurancesCar' || reduxName === 'buyInsurancesMotor' ? { contractIds , reasonForReject : _reasonRejected} : contractIds , getInsuranceType(reduxName)
                    ).then((res) => {
                        if (hasRequestFail(res.status)) return
                        successAction(res.status)
                        formik.setFieldValue(KEY_REASON_REJECT, "")
                    })
                }
            },
            content: decideModalContent()
        }
        openConfirm(setupObj)
    }


    const columns = [
        {
            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceNum`} />,
            accessor: `contractCode`,
            minWidth: 152,
            Cell: ({ original }) => {
                const { paymentType } = original

                const _paid = original?.paid
                let color = "red"
                switch (_paid) {
                    case "SUCCESS":
                        color = "green"
                        break
                    case "PENDING":
                        color = "red"
                        break
                    case "WARNING":
                        color = "orange"
                        break
                    default:
                        break
                }

                if (paymentType === "TPBANK") {
                    color = "green"
                }
                return (
                    <div className="d-flex justify-content-between">
                        {original.contractCode}
                        <IconSmallCircleStyled color={color} size={18} />
                    </div>
                )
            }
        },
        {
            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.CustomerName`} />,
            accessor: `owner.fullName`
        },
        {
            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceStatus`} />,
            accessor: `latestApprovalStatus`,
            Cell: ({ original }) => {
                return renderLable(original.latestApprovalStatus)
            },
            Filter: ({ filter, onChange }) => {
                return (
                    <select
                        onChange={event => onChange(event.target.value)}
                        className={`React custom-zindex9`}
                        style={{ width: '100%' }}
                        value={filter ? filter.value : 'all'}
                    >
                        {
                            statusFilterOption.map((item) => {
                                return (
                                    <option
                                        key={item.value} value={item.content}
                                    >
                                        {
                                            intl.formatMessage(item.label)
                                        }
                                    </option>
                                )
                            })
                        }
                    </select>
                )
            }
        },
        {
            Header: <FormattedMessage id={getKeyLang("InsuranceCert")} />,
            accessor: `certReceiverId`,
            filterable: false,
            Cell: ({ original }) => {
                const { inonCertUrl, certUrl, latestApprovalStatus } = original
                const url = certUrl || inonCertUrl
                return (
                    <div>
                        {
                            (url && latestApprovalStatus === SUCCESS) &&
                            <div
                                className='d-flex justify-content-center'
                                style={{ "cursor": "pointer" }}
                                onClick={() => window.open(url, '_blank')}
                            >
                                <u> <FormattedMessage id={getKeyLang(`ActionView`)} /></u>
                            </div>
                        }
                    </div>
                )
            }
        },
        {
            Header: <FormattedMessage id={getKeyLang(`InsuranceAction`)} />,
            accessor: `id`, // only for specify this column when user click in it and nothing more
            filterable: false,
            show: role === ROLE_ALL || role === ROLE_PERSONAL,
            Cell: ({ original }) => {
                const { latestApprovalStatus } = original
                const shouldShowDeleteButton = (role === ROLE_PERSONAL
                    && latestApprovalStatus !== SUCCESS
                    && latestApprovalStatus !== CANCELING)
                const shouldShowInsurApprovalCheckbox = ((isCompanyUser || isRootUser)
                    && latestApprovalStatus !== SUCCESS
                    && latestApprovalStatus !== CANCEL
                    && latestApprovalStatus !== CANCELING)
                const shouldShowDeletePrintedCertButton = role === ROLE_PERSONAL
                    && latestApprovalStatus === SUCCESS
                const shouldShowDeletePrintedCertCheckbox = isCompanyUser
                    && latestApprovalStatus === CANCELING
                // const shouldCancelContract = (role) 

                const handleDeleteContract = (original) => {
                    const setupObj = {
                        title: "Xóa hợp đồng",
                        yesAction: () => {
                            setLoadingStatus(true)
                            Service.deleteContract(
                                getBasePath(reduxName), original.id
                            ).then((res) => {
                                setLoadingStatus(false)
                                if (hasRequestFail(res.status)) { return }

                                BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang(`success`)} />)
                                invokeSearchPendingContracts()
                            })
                        },
                        content: <FormattedMessage id={getKeyLang(`confirm.content.deleteInsurance`)} />
                    }
                    openConfirm(setupObj)
                }

               
                const handleCancelPrintedCertContract = () => {
                    const setupObj = {
                        title: "Hủy hợp đồng",
                        yesAction: () => {
                            let bodyObj = {
                                "id": original.id,
                            }
                            setLoadingStatus(true)
                            Service.updatePrintedCertContract(
                                getBasePath(reduxName), bodyObj
                            ).then((res) => {
                                setLoadingStatus(false)
                                if (hasRequestFail(res.status)) { return }

                                BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang(`success`)} />)
                                invokeSearchPendingContracts()
                            })
                        },
                        content: <FormattedMessage id={getKeyLang(`confirm.content.cancelInsurance`)} />
                    }
                    openConfirm(setupObj)
                }

                const handleChange = () => {
                    setData(pre => {
                        let _check = false
                        let _cloneData = [...pre]
                        if (!original[KEY_ISCHECK]) {
                            _check = true
                        }
                        const found = _cloneData.find(elt => elt.id === original.id)
                        if (found) {
                            found[KEY_ISCHECK] = _check
                        }
                        return _cloneData
                    })
                }

                return (
                    <div className='d-flex justify-content-center'>
                        {
                            (shouldShowInsurApprovalCheckbox) &&
                            <Checkbox
                                color='primary'
                                icon={<Check className='vx-icon' size={16} />}
                                checked={original[KEY_ISCHECK]}
                                onChange={handleChange}
                                className="insur-approval-checkbox"
                            />
                        }

                        {
                            shouldShowDeletePrintedCertCheckbox &&
                            <Checkbox
                                color='primary'
                                icon={<Check className='vx-icon' size={16} />}
                                checked={original[KEY_ISCHECK]}
                                onChange={handleChange}
                                className="delete-printedcert-checkbox"
                            />
                        }

                        {
                            (shouldShowDeleteButton) &&
                            <IconXStyled
                                style={{ color: 'red' }} className='vx-icon mx-1' size={26}
                                onClick={() => handleDeleteContract(original)}
                            />
                        }
                        {
                            shouldShowDeletePrintedCertButton &&
                            <IconXStyled
                                style={{ color: 'red' }} className='vx-icon mx-1' size={26}
                                onClick={() => handleCancelPrintedCertContract(original)}
                            />
                        }
                    </div>
                )
            }
        }
    ]

    React.useEffect(() => {
        setData(values[KEY_PENDING_CONTRACTS])
    }, [JSON.stringify(values[KEY_PENDING_CONTRACTS])])

    const onClickExportReport = () => {
        let contractType;
        if (isHCPage) {
            contractType = INSURANCE_TYPE_HEALTH_CARE_CONTRACT
        } else if (isMotorPage) {
            contractType = INSURANCE_TYPE_MOTOR
        }
        else if (isTCPage) {
            contractType = INSURANCE_TYPE_TRAVEL_GET_CONTRACT
        }
        else  {
            contractType  = INSURANCE_TYPE_CAR
        } 
        Service.exportContracts(getBasePath(reduxName), contractType, values[KEY_START_DATE], values[KEY_END_DATE])
    }

    return (
        <StepBase>
            <CardBody className='margin-bottom-14'>
                <Row>
                    <Col sm='12'>
                        <div className='d-flex justify-content-between'>
                            <label className='font-medium-1 text-bold-600'>
                                <FormattedMessage id={getKeyLang(`TotalInsu`)} />:
                                <span>&nbsp;</span>
                                {values[KEY_TOTAL_ELEMENTS]}
                            </label>
                            {
                                role === ROLE_ALL || role === ROLE_PARTNER ? (
                                  <Button
                                    color='primary'
                                    onClick={onClickExportReport}
                                    disabled={_data.length === 0}
                                  >
                                      Xuất báo cáo
                                  </Button>
                                ) : null
                            }
                        </div>
                    </Col>
                    <Col sm='12' className='margin-bottom-14'>
                        <label className='font-medium-1 text-bold-600'>
                            <FormattedMessage id={getKeyLang(`Revenue`)} />:
                            <span>&nbsp;</span>
                            {
                                intlConvertToVnd(
                                    values[KEY_REVENUE], intl
                                ) + ' VND'
                            }
                        </label>
                    </Col>
                </Row>

                <Row className="mb-1 d-flex justify-content-center">
                    <Col md={2} xs={12} className="d-flex align-items-center mb-1 mx-2">
                        <IconCircleStyled
                            color="green" size={24}
                            onClick={() => {
                                const _filtereds = formik.getFieldMeta(KEY_SEARCHED_PENDING_CONTRACTS).value.filter(_original => {
                                    if (_original.paymentType === "TPBANK" || _original.paid === "SUCCESS") {
                                        return true
                                    }
                                    return false
                                })
                                formik.setFieldValue(KEY_PENDING_CONTRACTS, _filtereds)
                            }}
                        />
                        <div className='ml-1'>
                            <FormattedMessage id={getKeyLang('paymentTypeSuccess')} />
                        </div>
                    </Col>
                    <Col md={2} xs={12} className="d-flex align-items-center mb-1 mx-2" >
                        <IconCircleStyled
                            color="orange" size={24}
                            onClick={() => {
                                const _filtereds = formik.getFieldMeta(KEY_SEARCHED_PENDING_CONTRACTS).value.filter(_original => {
                                    return _original.paid === "WARNING"
                                })
                                formik.setFieldValue(KEY_PENDING_CONTRACTS, _filtereds)
                            }}
                        />
                        <div className='ml-1'>
                            <FormattedMessage id={getKeyLang('paymentTypeWarning')} />
                        </div>
                    </Col>
                    <Col md={2} xs={12} className="d-flex align-items-center mb-1 mx-2" >
                        <IconCircleStyled
                            color="red" size={24}
                            onClick={() => {
                                const _filtereds = formik.getFieldMeta(KEY_SEARCHED_PENDING_CONTRACTS).value.filter(_original => {
                                    if (!_original.paid) return true
                                    return _original.paid === "PENDING"
                                })
                                formik.setFieldValue(KEY_PENDING_CONTRACTS, _filtereds)
                            }}
                        />
                        <div className='ml-1'>
                            <FormattedMessage id={getKeyLang('paymentTypePending')} />
                        </div>
                    </Col>
                </Row>

                <TreeTable
                    filterable
                    data={_data}
                    columns={columns}
                    SubComponent={(row) => {
                        let expandableTableRows = getDefault_expandableTableRows(row, intl)
                        if (isCarPage) {
                            expandableTableRows = getDefault_carExpandableTableRows(row, intl, openModal , user.managerId)
                        }
                        if (isMotorPage) {
                            expandableTableRows = getDefault_motorExpandableTableRows(row, intl )
                        }
                        if(isTCPage){
                            expandableTableRows = getDefault_travelExpandableTableRows(row, intl)
                        }

                        return (
                            <div style={{ padding: '4px' }}>
                                <ExpandableTable
                                    rows={expandableTableRows}
                                />
                            </div>
                        )
                    }}
                />

                {CustomModal}
                {ConfirmModal}

                {
                    (shouldShowApprovalButtons) &&
                    <div className='d-flex justify-content-end margin-top-28'>
                        <ButtonGroup className=''>
                            <Button.Ripple
                                className='letter-uppercase' color='primary'
                                disabled={isLoading}
                                onClick={() => handleApproval(APPROVED)}
                            >
                                <FormattedMessage id={getKeyLang(`APPROVALTitle`)} />
                            </Button.Ripple>{' '}

                            <Button.Ripple
                                className='letter-uppercase' color='danger'
                                disabled={isLoading}
                                onClick={() => handleApproval(REJECTED)}
                            >
                                <FormattedMessage id={getKeyLang(`REJECTTitle`)} />
                            </Button.Ripple>{' '}
                        </ButtonGroup>
                    </div>
                }
            </CardBody>

            <Footer role={role} />
        </StepBase>
    )
}

export default Body
