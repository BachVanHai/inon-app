import 'react-table/react-table.css'
import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import ReactTable from 'react-table'
import moment from 'moment'
import { Check } from 'react-feather'
import { BaseAppUltils, Button, Checkbox, showConfirmAlert } from 'base-app'
import { Card, CardTitle, CardBody, CardFooter, CardHeader, Col, Row, } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { addAppContextPath, getKeyLang } from '../../../../../configs/supplement-app'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import DebtService from '../../../../../services/supplement-app/debt'
import { useHistory } from 'react-router-dom'
import { getInsurCompanyName, URL_ALL_DEBT, URL_PARTNER_DEBT } from './utility'
import useCheckUserRole from '../../../../../custom-hooks/useCheckUserRole'
import { getInsuranceBy } from '../../../../../ultity'

const TreeTable = treeTableHOC(ReactTable)

const DetailDebtPartnerContract = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const intl = useIntl()
    const [_detailPartnerContract, setDetailPartnerContracts] = useState([])
    const [selectedItems, setSelectedItems] = useState(new Set())
    const [isSelectedItemsAll, setSelectedItemsAll] = useState(false)
    const history = useHistory()
    const { groupId, partnersGroupUser, adminGroupUser } = useCheckUserRole()
    const isPartnerGroupUser = partnersGroupUser.includes(groupId)
    const isAdminUser = adminGroupUser.includes(groupId)

    useEffect(() => {
        async function getListDebtContract(userId) {
            const contents = await DebtService.getListDebtContract(userId)
            if (contents) {
                setDetailPartnerContracts(contents)
            }
        }
        getListDebtContract(userId)
    }, [history.location.pathname, userId])

    const handleChangeChecked = (original, e) => {
        // console.log(`handleChangeChecked.original`, original)
        if (e.target.checked) {
            selectedItems.add(original.id)
            if (selectedItems.size === _detailPartnerContract.length) {
                setSelectedItemsAll(true)
            }
        } else {
            selectedItems.delete(original.id)
            setSelectedItemsAll(false)
        }
        setSelectedItems(new Set(Array.from(selectedItems)))
    }

    const handleSelectedItemsAll = (e) => {
        setSelectedItemsAll(e.target.checked)
        if (e.target.checked) {
            setSelectedItems(new Set(Array.from(_detailPartnerContract.map(elt => elt.id))))
            return
        }
        setSelectedItems(new Set())
    }

    const onClickBackHome = () => {
        if (isAdminUser) {
            history.push(addAppContextPath(URL_ALL_DEBT))
            return
        }
        history.push(addAppContextPath(URL_PARTNER_DEBT))
    }

    const handlePaidAction = () => {
        if (selectedItems.size === 0) {
            return BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`account.warning.emptyField`) }))
        }
        dispatch(
            showConfirmAlert({
                title: <FormattedMessage id={getKeyLang('account.paid')} />,
                isShow: true,
                content: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.confirm.isPaid')} />,
                onConfirm: async () => {
                    for (let item of selectedItems) {
                        const resolveData = await DebtService.confirmBankTrans(item)
                        console.log(`resolveData`, resolveData)
                    }
                    if (isAdminUser) {
                        history.push(addAppContextPath(URL_ALL_DEBT))
                        return
                    }
                    history.push(addAppContextPath(URL_PARTNER_DEBT))
                }
            })
        )
    }

    const ExpandableTable = ({ data }) => {
        const contract = data

        return (
            <Table size="sm" bordered>
                <tbody >
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold text-left'><FormattedMessage id={getKeyLang('bonus.contractId')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{contract.contractCode}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.owner')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{contract?.owner?.fullName}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage
                                id={getKeyLang('bonus.manufacturer')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{contract?.vehicles ? contract.vehicles[0]?.manufacturerName : ''}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.vehicles')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{contract?.vehicles ? contract.vehicles[0]?.brandName : ''}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage
                                id={getKeyLang('bonus.licensePlates')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{contract?.vehicles ? contract.vehicles[0]?.numberPlate : ''}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage
                                id={getKeyLang('bonus.insuranceType')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                {
                                    getInsuranceBy(contract.contractType).fullName
                                }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.insuranceCompany')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{getInsurCompanyName(contract)}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.effectiveFrom')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{contract?.insurances ? moment(contract?.insurances[0]?.startValueDate).format('HH:mm DD/MM/YYYY') : ''}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage id={getKeyLang('bonus.effectiveTo')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{contract?.insurances ? moment(contract?.insurances[0]?.endValueDate).format('HH:mm DD/MM/YYYY') : ''}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "#ecf0f1" }} className="text-left">
                            <span className='font-weight-bold'><FormattedMessage
                                id={getKeyLang('bonus.totalInsuranceMoney')} />:</span>
                        </td>
                        <td className="text-left">
                            <div>
                                <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(contract?.totalFeeInclVAT)} VNĐ
                                    (<FormattedMessage id={getKeyLang('bonus.vatIncluded')} />)
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    let columns = [
        {
            Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.contractCode')} />,
            id: "contractCode",
            accessor: 'contractCode',
            minWidth: 70,
        },
        {
            Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.customerName')} />,
            id: "customerName",
            accessor: 'customerName',
        },
        {
            Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.status')} />,
            id: "status",
            filterable: false,
            Cell: ({ original }) => {
                return (
                    <div className='d-flex justify-content-center'>
                        {
                            original.paymentType === "DEBT" ?
                                intl.formatMessage({ id: getKeyLang(`account.debt`) })
                                : intl.formatMessage({ id: getKeyLang(`account.paid`) })
                        }
                    </div>
                )
            }
        },
        {
            Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.transactionCode')} />,
            id: "transactionCode",
            accessor: 'contractApprovalId',
            filterable: false,
        },
        {
            Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.isPaid')} />,
            id: "isPaid",
            Filter: () => (
                <div className='d-flex justify-content-center'>
                    <div className="d-flex align-items-center mr-1">{intl.formatMessage({ id: getKeyLang('account.selectAll') })}</div>
                    <Checkbox checked={isSelectedItemsAll} onChange={handleSelectedItemsAll}
                        icon={<Check className='vx-icon' size={16} />}
                    />
                </div>
            ),
            Cell: ({ original }) => (
                <div className='d-flex justify-content-center'>
                    <Checkbox checked={selectedItems.has(original.id)} onChange={handleChangeChecked.bind(null, original)}
                        icon={<Check className='vx-icon' size={16} />}
                    />
                </div>
            )
        },
    ]

    if (isPartnerGroupUser) {
        columns = [
            {
                Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.contractCode')} />,
                id: "contractCode",
                accessor: 'contractCode',
                minWidth: 70,
            },
            {
                Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.customerName')} />,
                id: "customerName",
                accessor: 'customerName',
            },
            {
                Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.status')} />,
                id: "status",
                filterable: false,
                Cell: ({ original }) => {
                    return (
                        <div className='d-flex justify-content-center'>
                            {
                                original.paymentType === "DEBT" ?
                                    intl.formatMessage({ id: getKeyLang(`account.debt`) })
                                    : intl.formatMessage({ id: getKeyLang(`account.paid`) })
                            }
                        </div>
                    )
                }
            }
        ]
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-uppercase'>
                    <FormattedMessage
                        id={getKeyLang(`bonus.detail`)}
                    />
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <TreeTable
                            className='nested-table -striped -highlight'
                            previousText={intl.formatMessage({ id: 'common.table.previous' })}
                            nextText={intl.formatMessage({ id: 'common.table.next' })}
                            noDataText={intl.formatMessage({ id: 'common.table.noData' })}
                            pageText={intl.formatMessage({ id: 'common.table.page' })}
                            ofText={intl.formatMessage({ id: 'common.table.of' })}
                            rowsText={intl.formatMessage({ id: 'common.table.rows' })}
                            getTdProps={() => ({
                                style: {
                                    height: '40px'
                                }
                            })}
                            filterable
                            data={_detailPartnerContract}
                            columns={columns}
                            defaultPageSize={10}
                            SubComponent={(row) => {
                                return (
                                    <div style={{ padding: '10px' }}>
                                        <ExpandableTable
                                            data={row.original}
                                        />
                                    </div>
                                )
                            }
                            }
                        />

                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <Button onClick={onClickBackHome} className="btn mt-2 mr-2 float-right">{intl.formatMessage({ id: getKeyLang(`account.back`) })}</Button>
                {
                    !isPartnerGroupUser && <Button onClick={handlePaidAction} color={'primary'} className="btn mt-2 mr-2 float-right">{intl.formatMessage({ id: getKeyLang("account.paid") })}</Button>
                }
            </CardFooter>
        </Card>
    )
}

export default DetailDebtPartnerContract
