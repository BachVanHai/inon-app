import React, { useEffect, useState } from 'react'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import {
    Card,
    CardBody,
    Table,
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import {
    FormattedMessage,
    AppId,
    showConfirmAlert,
    Button,
} from 'base-app'
import * as Icon from 'react-feather'
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { useFormik } from 'formik';
import "react-table/react-table.css"
import "../../../../assets/scss/insurance-app/common/react-tables.scss"
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { history } from '../../../../history'
import SelectMutilForm from '../../../../components/insurance-app/buy-insurance-car/form/SelectMutilForm';
import FeeInsuranceServ from '../../../../services/insurance-app/feeManageInsurance'

const TreeTable = treeTableHOC(ReactTable)

const renderLable = (row) => {
    const SUCCESS = 'FINISH'
    const FAIL = 'FAIL'
    const NOT_COMPLETE = 'NOT_COMPLETE'
    const APPROVAL = 'APPROVAL'
    const PENDING = 'PENDING'
    const REJECT = 'REJECT'
    const TIMEOUT = 'TIMEOUT'

    const APPROVED = 'APPROVED'
    const REJECTED = 'REJECT'
    return (
        <div className='d-flex justify-content-center'>
            {
                row.approvalStatus === SUCCESS ? <div className="badge badge-pill badge-light-success"> <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuSUCCESS`} /> </div> :
                    row.approvalStatus === FAIL ? <div className="badge badge-pill badge-light-danger"> <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuFAIL`} /> </div> :
                        row.approvalStatus === NOT_COMPLETE ? <div className="badge badge-pill badge-light-warning"> <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuNOT_COMPLETE`} /> </div> :
                            row.approvalStatus === PENDING ? <div className="badge badge-pill badge-light-info"> <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuPENDING`} /> </div> :
                                row.approvalStatus === REJECT ? <div className="badge badge-pill badge-light-dark">  <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuREJECT`} /> </div> :
                                    row.approvalStatus === APPROVAL ? <div className="badge badge-pill badge-light-primary"> <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuAPPROVAL`} /> </div> :
                                        ""
            }
        </div>
    )
}


const ExpandableTable = (props) => {
    const [info, setInfo] = useState(props.data)

    useEffect(() => {
    }, [])

    return (
        <Table responsive bordered>
            <tbody>
                <tr>
                    <td className='table-detail-header'>
                        <FormattedMessage
                            id={`${AppId.INSURANCE_APP}.PartnerPhone`}
                        />
                    </td>
                    <td>{info.phoneNumber}</td>
                </tr>

                <tr>
                    <td className='table-detail-header'>
                        <FormattedMessage
                            id={`${AppId.INSURANCE_APP}.Email`}
                        />
                    </td>
                    <td>{info.email}</td>

                </tr>

                <tr>
                    <td className='table-detail-header'>
                        <FormattedMessage
                            id={`${AppId.INSURANCE_APP}.UserRefId`}
                        />
                    </td>
                    <td>{info.refId}</td>

                </tr>

                <tr>
                    <td className='table-detail-header'>
                        <FormattedMessage
                            id={`${AppId.INSURANCE_APP}.UserCreatedDate`}
                        />
                    </td>
                    <td>{info.createdDate}</td>

                </tr>
            </tbody>
        </Table>

    )
}


const FeeManageBSHApproveView = (props) => {
    const dispatch = useDispatch()
    const [partnerSelect, setPartnerSelect] = useState([])
    const [optionSelect, setOptionSelect] = useState([])

    const intl = useIntl()
    useEffect(() => {
        getAprrovedList()
    }, [])

    const getAprrovedList = async () => {

        const res = await FeeInsuranceServ.getFeeApprove()
        console.log(res)
        if (res !== null && res.status === 200) {
            let list = res.data.map((item, i) => {
                item.label = item.userCode + " " + item.fullName
                return item
            })
            setOptionSelect(list)
        }

    }


    const onClickDetail = (data) => {
        if (data.vehicleType === 'CAR')
            history.push({
                pathname: '/insurance-fee/feeCar',
                state: { role: 'VIEW', editable: false, data: data }
            })
        else if (data.vehicleType === 'MOTOR')
            history.push({
                pathname: '/insurance-fee/feeMotor',
                state: { role: 'VIEW', editable: false, data: data }
            })
    }
    const renderDetail = (row) => {
        return (
            <div className='d-flex justify-content-center' onClick={() => onClickDetail(row)}>
                <u> Xem chi tiết</u>
            </div>
        )
    }

    const [modalResult, setModalResult] = useState(false)
    const [messageResult, setMessageResult] = useState('')

    const toggleModalResult = () => {
        setModalResult(false)
        Utils.goBackHome()
    }

    const showAlertResult = (titleId, contentId, isHaveClose) => {
        return (


            <Modal
                isOpen={modalResult}
                className="modal-dialog-centered"
            >
                <ModalHeader toggle={isHaveClose ? toggleModalResult : false}>
                    <FormattedMessage id={titleId} />
                </ModalHeader>
                <ModalBody>
                    {/* <FormattedMessage id={contentId} /> */}
                    {contentId}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModalResult}>
                        <FormattedMessage id={`${AppId.INSURANCE_APP}.ButtonOK`} />
                    </Button>{" "}
                </ModalFooter>
            </Modal>
        )
    }

    const approveFee = async (id, action) => {
        const feeInfo = JSON.stringify({
            approvalId: id,
            approvalStatus: action
        });
        console.log(feeInfo)
        const res = await FeeInsuranceServ.approvedFee(feeInfo)
        console.log(res)
        if (res.status === 200) {
            console.log(res.data.errorCode)
            if (res.data.errorCode === '000')
                setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeeSuccess`} />)
            else if (res.data.errorCode === '001')
                setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeePending`} />)
            else if (res.data.errorCode === '003')
                setMessageResult(<FormattedMessage id={`${AppId.INSURANCE_APP}.UpdateFeeFail`} />)

            setModalResult(true)

        } else {
            // toggleModal()
            // setMessageResult(`${AppId.INSURANCE_APP}.UpdateFeeSuccess`)
            // setModalResult(true)
        }
    }
    const onClickAprrove = (account) => {
        console.log(JSON.stringify(account, null, 2))
        // const messageId = `${AppId.INSURANCE_APP}.ConfirmApproveFee`
        const messageId = intl.formatMessage({
            id: `${AppId.INSURANCE_APP}.ConfirmApproveFee`,
        }) + account.username
        const onConfirm = () => {
            approveFee(account.approvalId, 'APPROVAL')
        }
        const onCancel = () => { }
        showConfirmDialog(messageId, account, onConfirm, onCancel)
    }

    const onClickReject = (account) => {
        // const messageId = `${AppId.INSURANCE_APP}.ConfirmRejectFee`
        const messageId = intl.formatMessage({
            id: `${AppId.INSURANCE_APP}.ConfirmRejectFee`,
        }) + account.username
        const onConfirm = () => {
            approveFee(account.approvalId, 'REJECT')
        }
        const onCancel = () => { }
        showConfirmDialog(messageId, account, onConfirm, onCancel)
    }
    const renderTableButtons = (row) => {

        return (
            <div className='d-flex justify-content-center'>
                <Button
                    size='sm'
                    onClick={() => onClickAprrove(row)}
                    className='ml-2 btn-icon rounded-circle'
                    color='flat-success'
                >
                    <Icon.Check className='vx-icon' size={24} />
                </Button>

                <Button
                    size='sm'
                    onClick={() => onClickReject(row)}
                    className='ml-2 btn-icon rounded-circle'
                    color='flat-danger'
                >
                    <Icon.X className='vx-icon' size={24} />
                </Button>
            </div>
        )

    }

    const showConfirmDialog = (confirmMessageId, account, onConfirm, onCancel) => {
        dispatch(
            showConfirmAlert({
                title: intl.formatMessage({
                    id: `${AppId.INSURANCE_APP}.Notice`
                }),
                isShow: true,
                content: (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: confirmMessageId
                        }}
                    />
                ),
                onConfirm: () => {
                    onConfirm()
                },
                onCancel: () => {
                    onCancel()
                }
            })
        )
    }

    const renderTable = () => {
        return (
            <React.Fragment>
                <TreeTable
                    filterable
                    autoResetExpanded={false}
                    className="dataTable-custom"
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id
                        return row[id] !== undefined
                            ? String(row[id])
                                .toLowerCase()
                                .includes(filter.value.toLowerCase())
                            : true
                    }}
                    data={partnerSelect}
                    columns={[

                        {
                            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.UserCode`} />,
                            accessor: `userCode`,
                            filterable: false
                        },
                        {
                            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.UserName`} />,
                            accessor: `fullName`,
                            filterable: false
                        },
                        {
                            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.State`} />,
                            columns: [
                                {
                                    //   Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutMan`} />,
                                    accessor: `approvalStatus`,
                                    Cell: ({ original }) => renderLable(original),
                                    filterable: false
                                },
                                {
                                    //   Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutAsset`} />,
                                    accessor: null,
                                    Cell: ({ original }) => renderDetail(original),
                                    filterable: false
                                }]

                        },
                        {
                            Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.InsuranceAction`} />,
                            accessor: null,
                            filterable: false,
                            Cell: ({ original }) => renderTableButtons(original)
                        }
                    ]}
                    pageSize={partnerSelect.length === 0 ? 2 : partnerSelect.length}
                    showPagination={false}
                    SubComponent={(row) => {
                        return (
                            <div style={{ padding: '4px' }}>
                                <ExpandableTable data={row.original} />
                                {/* < ExpandableTableAprrove data={row.original} /> */}
                            </div>
                        )
                    }}
                />

            </React.Fragment>)
    }

    const formik = useFormik({
        initialValues: {
        },
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: values => {

        },
    });
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <Row>
                        <Col md="6" sm="12">
                            <SelectMutilForm formik={formik} fieldName="namePartner" msgField={`${AppId.INSURANCE_APP}.Partner`} options={optionSelect} addClass="custom-zindex8" isMulti={true} value={partnerSelect}
                                onChange={value => {
                                    console.log(value)
                                    if (value !== null && value.length > 0) {
                                        setPartnerSelect(value)
                                    } else {
                                        setPartnerSelect([])
                                    }
                                }}
                            />

                        </Col>
                    </Row>

                    {renderTable()}
                    {showAlertResult(`${AppId.INSURANCE_APP}.NoticeAlertTitle`, messageResult, false)}
                </CardBody>
            </Card>
        </React.Fragment>
    )

}
export default FeeManageBSHApproveView
