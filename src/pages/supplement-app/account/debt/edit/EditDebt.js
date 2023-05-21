import React, { useMemo, useState, useEffect } from 'react'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Col, Row, Table, } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { Select, Button, goBackHomePage, showConfirmAlert, BaseAppUltils, useDeviceDetect } from 'base-app'
import { useSelector, useDispatch } from 'react-redux'
import { filterMethod, getKeyLang, removeAccents } from '../../../../../configs/supplement-app'
import {
    PENDING, APPROVED, REJECT, NOT_ACCEPT, CHANGE_LIMIT
} from './utility'
import {
    loadListAccountsPending
} from '../../../../../redux/actions/supplement-app/debtApproval'
import {
    loadListSuggestion
} from '../../../../../redux/actions/supplement-app/debtCreate'
import DebtService from '../../../../../services/supplement-app/debt'
import * as Icon from 'react-feather'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import EditableModal from './EditableModal'
import { isArrayEmpty } from '../../../../../ultity'

const TextWrap = styled.div`
-ms-word-break: break-all;
word-break: break-all;
word-break: break-word;
-webkit-hyphens: auto;
-moz-hyphens: auto;
hyphens: auto;
`

const TdStyled = styled.td`
background-color: #c3c3c3;
color: white;
`

const TreeTable = treeTableHOC(ReactTable)

const EditDebt = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const [searchIds, setSearchIds] = useState("")
    const { availableUsersSuggestions, availableUsers } = useSelector(state => state.app.debtCreate)
    const { pendingAccounts } = useSelector(state => state.app.debtApproval)
    const [availableUsersState, setAvailableUsersState] = useState([])
    const device = useDeviceDetect()
    const history = useHistory()
    const [dispatchDependency, setDispatchActive] = useState(0)
    const dependencies = [pendingAccounts.length, dispatchDependency, history.location.pathname]

    const suggestions_filter = useMemo(() => {
        return availableUsersSuggestions.filter(suggestionElt => {
            const found = pendingAccounts.find(pendingElt => Number(pendingElt.userId) === Number(suggestionElt.id))
            if (found) {
                return true
            }
            return false
        })
    }, [...dependencies, availableUsersSuggestions.length])

    const availableUsers_pendingFilter = useMemo(() => {
        return availableUsers.filter(availableUser => {
            const found = pendingAccounts.find(pendingElt => {
                if (Number(pendingElt.userId) === Number(availableUser.id)) {
                    availableUser.pendingInfo = {
                        approvalStatus: pendingElt.approvalStatus,
                        transactionLimit: pendingElt.transactionLimit,
                        dailyLimit: pendingElt.dailyLimit,
                        monthlyLimit: pendingElt.monthlyLimit,
                        dueDateType: pendingElt.dueDateType,
                        applyDate: pendingElt.applyDate,
                        dueValue: pendingElt.dueValue,
                        accountId: pendingElt.accountId,
                        reason: pendingElt.reason,
                        userId: pendingElt.userId,
                        id: pendingElt.id
                    }
                    return true
                }
                return false
            })
            if (found) {
                return true
            }
            return false
        })
    }, [...dependencies, availableUsers.length, JSON.stringify(pendingAccounts)])

    const denyReasonsOption = useMemo(() => {
        return (
            [
                {
                    label: intl.formatMessage({ id: getKeyLang(`account.rejectDebtAccount.notAccept`) }),
                    content: NOT_ACCEPT,
                    value: 1
                },
                {
                    label: intl.formatMessage({ id: getKeyLang(`account.rejectDebtAccount.changeLimit`) }),
                    content: CHANGE_LIMIT,
                    value: 2
                },
                {
                    label: intl.formatMessage({ id: getKeyLang(`account.noData`) }),
                    content: null,
                    value: 3
                }
            ]
        )
    }, [])

    const getDenyReason = (rawReason) => {
        switch (rawReason) {
            case NOT_ACCEPT:
                return denyReasonsOption[0]
            case CHANGE_LIMIT:
                return denyReasonsOption[1]
            default:
                denyReasonsOption[2].label = rawReason
                return denyReasonsOption[2]
        }
    }

    useEffect(() => {
        dispatch(loadListAccountsPending())
        dispatch(loadListSuggestion())
        setAvailableUsersState(availableUsers_pendingFilter)
        // eslint-disable-next-line
    }, [...dependencies, availableUsers.length, JSON.stringify(pendingAccounts)])

    const onChangeSearchIds = (values) => {
        if (isArrayEmpty(values)) {
            setSearchIds("")
            setAvailableUsersState(availableUsers_pendingFilter)
            return
        }
        const _partners = values.map(elt => {
            return elt.id
        })
        setSearchIds(!isArrayEmpty(_partners) ? _partners.join(",") : "")
    }

    const onClickSearch = () => {
        const _availableUsers_searched = availableUsers_pendingFilter.filter(avaiElt => {
            return searchIds.split(',').find(searchId => searchId == avaiElt.id)
        })
        setAvailableUsersState(!isArrayEmpty(_availableUsers_searched) ? _availableUsers_searched : availableUsers_pendingFilter)
    }

    const onClickBackHome = () => {
        dispatch(
            showConfirmAlert({
                title: <FormattedMessage id='common.home' />,
                isShow: true,
                content: <FormattedMessage id='common.backHome.confirmMessage' />,
                onConfirm: () => {
                    dispatch(goBackHomePage())
                }
            })
        )
    }

    const reActiveLoadApi = () => {
        setDispatchActive(pre => ++pre)
    }

    const ExpandableTable = ({ data }) => {
        // console.log(`ExpandableTable`, data)
        return (
            <Table size="sm" responsive bordered>
                <tbody>
                    <tr>
                        <TdStyled className="text-left">
                            <FormattedMessage id={getKeyLang('account.debtManagement.phoneNumber')} />
                        </TdStyled>
                        <td className="text-left">
                            {data.phoneNumber}
                        </td>
                    </tr>
                    <tr>
                        <TdStyled className="text-left">
                            <FormattedMessage id={getKeyLang('account.debtManagement.email')} />
                        </TdStyled>
                        <td className="text-left">
                            <TextWrap>
                                {data.email}
                            </TextWrap>
                        </td>
                    </tr>
                    {
                        (data.userDetails && data.userDetails.address) ?
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.address')} />
                                </TdStyled>
                                <td className="text-left">
                                    <TextWrap>
                                        {data.userDetails.address}
                                    </TextWrap>
                                </td>
                            </tr>
                            :
                            null
                    }
                    {
                        data.pendingInfo.reason ?
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.denyReason')} />
                                </TdStyled>
                                <td className="text-left">
                                    <TextWrap>
                                        {
                                            getDenyReason(data.pendingInfo.reason).label
                                        }
                                    </TextWrap>
                                </td>
                            </tr>
                            :
                            null
                    }
                </tbody>
            </Table>
        )
    }

    const getApprovalStatus = (approvalStatus) => {
        switch (approvalStatus) {
            case APPROVED:
                return (
                    {
                        component: <FormattedMessage id={getKeyLang('account.approved')} />,
                        content: intl.formatMessage({ id: getKeyLang(`account.approved`) })
                    }
                )
            case REJECT:
                return (
                    {
                        component: <FormattedMessage id={getKeyLang("account.reject")} />,
                        content: intl.formatMessage({ id: getKeyLang(`account.reject`) })
                    }
                )
            case PENDING:
                return (
                    {
                        component: <FormattedMessage id={getKeyLang("account.pending")} />,
                        content: intl.formatMessage({ id: getKeyLang(`account.pending`) })
                    }
                )
            default:
                return null
        }
    }

    const columns = [
        {
            Header: <FormattedMessage id={getKeyLang('account.debtManagement.partnerCode')} />,
            accessor: 'userCode',
            filterable: true,
            filterMethod: filterMethod,
        },
        {
            Header: <FormattedMessage id={getKeyLang('account.debtManagement.partnerName')} />,
            accessor: 'fullName',
            filterable: true,
            filterMethod: filterMethod,
        },
        {
            Header: <FormattedMessage id={getKeyLang('account.detailDebtParnerContract.status')} />,
            filterable: true,
            accessor: 'pendingInfo.approvalStatus',
            filterMethod: (filter, row) => {
                if (filter.value === '') { return true }

                return removeAccents(
                    getApprovalStatus(row[filter.id]).content
                )
                    .includes(filter.value.toLowerCase())
            },
            Cell: ({ original }) => {
                const approvalStatus = original.pendingInfo.approvalStatus
                return getApprovalStatus(approvalStatus).component
            }
        },
        {
            Header: <FormattedMessage id={getKeyLang("account.command")} />,
            Cell: ({ original }) => {
                const [isModalOpen, setModalOpen] = useState(false)
                const isModalEditable = original.pendingInfo.approvalStatus !== PENDING

                const handleCancelBtnClick = () => {
                    setModalOpen(false)
                }
                const handleEditBtnClick = () => {
                    setModalOpen(true)
                }
                const openModal = () => {
                    setModalOpen(true)
                }
                const closeModal = () => {
                    setModalOpen(false)
                }
                const handleDeleteBtnClick = () => {
                    dispatch(
                        showConfirmAlert({
                            title: <FormattedMessage id={getKeyLang("account.title.cancelDebtAccount")} />,
                            isShow: true,
                            content: <FormattedMessage id={
                                getKeyLang("account.confirm.deleteDebtAccount")
                            } />,
                            onConfirm: async () => {
                                let _needDeletedId = original.pendingInfo.accountId
                                let _serviceCall = DebtService.deleteDebtContract
                                if (!_needDeletedId) {
                                    _needDeletedId = original.pendingInfo.id
                                    _serviceCall = DebtService.deleteDraftDebtContract
                                }
                                const resolveData = await _serviceCall(_needDeletedId)
                                if (resolveData) {
                                    BaseAppUltils.toastSuccess(intl.formatMessage({ id: getKeyLang(`account.success`) }))
                                    reActiveLoadApi()
                                    return
                                }
                                BaseAppUltils.toastError(intl.formatMessage({ id: getKeyLang("account.error") }))
                            }
                        })
                    )
                }

                return (
                    <div className="d-flex justify-content-center">
                        <div onClick={handleEditBtnClick} className="mr-2 text-primary cursor-pointer">
                            {
                                isModalEditable ?
                                    <Icon.Edit2 className='vx-icon' size={15} />
                                    :
                                    <Icon.Eye className='vx-icon' size={15} />
                            }
                        </div>
                        <div onClick={handleDeleteBtnClick} className="text-danger cursor-pointer">
                            <Icon.X className='vx-icon' size={18} />
                        </div>
                        <EditableModal
                            original={original.pendingInfo} reActiveLoadApi={reActiveLoadApi} handleCancelBtnClick={handleCancelBtnClick}
                            intl={intl} device={device} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal}
                            isModalEditable={isModalEditable}
                        />
                    </div>
                )
            }
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-uppercase'>
                    <FormattedMessage
                        id={getKeyLang(`account.edit`)}
                    />
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col xs={12} md={6}>
                        <Select
                            closeMenuOnSelect={true}
                            notRequired
                            classNamePrefix='select mt-1'
                            onChange={onChangeSearchIds}
                            value={searchIds}
                            options={suggestions_filter}
                            placeholder={intl.formatMessage({ id: getKeyLang('bonus.findPartner') })}
                            isClearable={true}
                            isMulti={true}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Button.Ripple color='primary' onClick={onClickSearch}>
                            <FormattedMessage
                                id={getKeyLang('bonus.search')}
                            />
                        </Button.Ripple>
                    </Col>
                </Row>
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
                            data={availableUsersState}
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
                            }}
                        />
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <div className="d-flex justify-content-end">
                    <Button.Ripple color='secondary' className='' onClick={onClickBackHome}>
                        <FormattedMessage id='common.home' />
                    </Button.Ripple>
                </div>
            </CardFooter>
        </Card>
    )
}

export default EditDebt
