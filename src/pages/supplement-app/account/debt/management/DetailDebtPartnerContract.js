import 'react-table/react-table.css'
import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { Card, CardTitle, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap'
import moment from 'moment'
import { Check } from 'react-feather'
import { useDispatch } from 'react-redux'
import { BaseAppUltils, Button, Checkbox, showConfirmAlert } from 'base-app'
import { addAppContextPath, getKeyLang } from '../../../../../configs/supplement-app'
import { FormattedMessage, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import DebtService from '../../../../../services/supplement-app/debt'
import { useHistory } from 'react-router-dom'
import useCheckUserRole from '../../../../../custom-hooks/useCheckUserRole'
import { getInsurCompanyName, URL_ALL_DEBT, URL_PARTNER_DEBT } from './utility'
import { KEY_ISCHECK } from './formikConfig'
import { getInsuranceBy } from '../../../../../ultity'

const TreeTable = treeTableHOC(ReactTable)

const DetailDebtPartnerContract = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const intl = useIntl()
    const history = useHistory()

    const [isSelectedAllContracts, setIsSelectedAllContracts] = useState(false)
    const [_contracts, setContracts] = useState([])

    const { groupId, partnersGroupUser, adminGroupUser } = useCheckUserRole()
    const isPartnerGroupUser = partnersGroupUser.includes(groupId)
    const isAdminUser = adminGroupUser.includes(groupId)

    useEffect(() => {
        async function getListDebtContract(userId) {
            const content = await DebtService.getListDebtContract(userId)
            if (content) {
                const __contracts = content.map((elt) => {
                    elt[KEY_ISCHECK] = false
                    return elt
                })
                setContracts(__contracts)
            }
        }
        getListDebtContract(userId)
    }, [history.location.pathname, userId])

    const getContractWith = (contractId, contracts = _contracts) => {
        const found = contracts.find(elt => elt.id === contractId)
        if (!found) {
            return ({
                [KEY_ISCHECK]: false
            })
        }
        return found
    }

    const handleChangeChecked = (original, e) => {
        // return console.log(`handleChangeChecked.original`, original)
        const _checked = e.target.checked
        setContracts((pre) => {
            let _clone = [...pre]
            let _isCheck = _checked
            const found = _clone.find(elt => elt.id === original.id)
            if (!found) return

            found[KEY_ISCHECK] = _isCheck
            if (_isCheck) {
                const _selectedContracts = _clone.filter(elt => elt[KEY_ISCHECK])
                if (_selectedContracts.length === _clone.length) {
                    setIsSelectedAllContracts(true)
                }
            } else {
                setIsSelectedAllContracts(false)
            }
            return _clone
        })
    }

    const handleSelectedItemsAll = (e) => {
        setIsSelectedAllContracts(e.target.checked)

        if (e.target.checked) {
            setContracts((pre) => {
                let _clone = [...pre]
                _clone.forEach(elt => {
                    elt[KEY_ISCHECK] = true
                })
                return _clone
            })
            return
        }
        setContracts((pre) => {
            let _clone = [...pre]
            _clone.forEach(elt => {
                elt[KEY_ISCHECK] = false
            })
            return _clone
        })
    }

    const onClickBackHome = () => {
        if (isAdminUser) {
            history.push(addAppContextPath(URL_ALL_DEBT))
            return
        }
        history.push(addAppContextPath(URL_PARTNER_DEBT))
    }

    const handlePaidAction = () => {
        let checkedContracts = _contracts.filter(elt => elt[KEY_ISCHECK])
        if (checkedContracts.length === 0) {
            return BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang(`account.warning.emptyField`) }))
        }
        dispatch(
            showConfirmAlert({
                title: <FormattedMessage id={getKeyLang('account.paid')} />,
                isShow: true,
                content: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.confirm.isPaid')} />,
                onConfirm: async () => {
                    for (let contract of _contracts) {
                        try {
                            if (contract[KEY_ISCHECK]) {
                                const contractVal = document.getElementById(contract.id).value
                                await DebtService.confirmBankTrans(contract.id, contractVal)
                            }
                        } catch (e) {
                            console.log(e)
                        }
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
                                <span>
                                    {
                                        getInsuranceBy(contract.contractType).fullName
                                    }
                                </span>
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
            filterable: false,
            Cell: ({ original }) => {
                return (
                    <div className='d-flex justify-content-center'>
                        <input id={original.id} />
                    </div>
                )
            }
        },
        {
            Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.isPaid')} />,
            id: "isPaid",
            Filter: () => (
                <div className='d-flex justify-content-center'>
                    <div className="d-flex align-items-center mr-1">{intl.formatMessage({ id: getKeyLang('account.selectAll') })}</div>
                    <Checkbox
                        checked={isSelectedAllContracts}
                        onChange={handleSelectedItemsAll}
                        icon={<Check className='vx-icon' size={16} />}
                    />
                </div>
            ),
            Cell: ({ original }) => (
                <div className='d-flex justify-content-center'>
                    <Checkbox
                        checked={getContractWith(original.id)[KEY_ISCHECK]}
                        onChange={(e) => handleChangeChecked(original, e)}
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
                            data={_contracts}
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
