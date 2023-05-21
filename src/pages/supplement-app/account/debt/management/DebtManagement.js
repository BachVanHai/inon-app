import 'react-table/react-table.css'
import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Col, Row, } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { Select, Button, goBackHomePage, showConfirmAlert } from 'base-app'
import { useSelector, useDispatch } from 'react-redux'
import { getListAllDebtAccount, getListAllPartnersDebtAccount } from '../../../../../redux/actions/supplement-app/debtManagement'
import useCheckUserRole from '../../../../../custom-hooks/useCheckUserRole'
import { useResponsiveColums, URL_PARTNER_DEBT, URL_ALL_DEBT, PARTNER_DEBT, ALL_DEBT } from './utility'
import { useHistory } from 'react-router-dom'
import { loadListSuggestion } from '../../../../../redux/actions/supplement-app/debtCreate'
import { getKeyLang } from '../../../../../configs/supplement-app'
import { isArrayEmpty } from '../../../../../ultity'

const TreeTable = treeTableHOC(ReactTable)

const DebtManagement = () => {
    const intl = useIntl()
    const history = useHistory()
    const dispatch = useDispatch()
    const [searchIds, setSearchIds] = useState("")
    const { suggestions, listAllDebtAccount } = useSelector(state => state.app.debtManagement)
    const { availableUsersSuggestions } = useSelector(state => state.app.debtCreate)
    const [debtAccounts, setDebtAccounts] = useState([])

    const { groupId, partnersGroupUser, adminGroupUser } = useCheckUserRole()
    const isAdminUser = adminGroupUser.includes(groupId)
    let detailLink = URL_PARTNER_DEBT
    if (isAdminUser) {
        detailLink = URL_ALL_DEBT
    }
    const { responsiveColums, ReponsiveExpandableTable } = useResponsiveColums(detailLink, availableUsersSuggestions)

    const dependencies = [getListAllPartnersDebtAccount.length, listAllDebtAccount.length, history.location.pathname]

    useEffect(() => {
        if (partnersGroupUser.includes(groupId)) {
            dispatch(getListAllPartnersDebtAccount())
            setDebtAccounts(listAllDebtAccount)
        }
        else if (adminGroupUser.includes(groupId)) {
            dispatch(getListAllDebtAccount())
            setDebtAccounts(listAllDebtAccount)
        }
        else {
            dispatch(getListAllPartnersDebtAccount())
        }
        dispatch(loadListSuggestion())
        // eslint-disable-next-line
    }, dependencies)

    const onChangeSearchIds = (values) => {
        if (isArrayEmpty(values)) {
            setSearchIds("")
            setDebtAccounts(listAllDebtAccount)
            return
        }
        const _partners = values.map(elt => {
            return elt.id
        })
        setSearchIds(!isArrayEmpty(_partners) ? _partners.join(",") : "")
    }

    const onClickSearch = () => {
        let _debtAccount = []
        searchIds.split(",").forEach(searchId => {
            const foundRaw = listAllDebtAccount.find((rawListItem) => {
                return Number(rawListItem.usersDTO.id) === Number(searchId)
            })
            if (foundRaw) {
                _debtAccount.push(foundRaw)
            }
        })
        setDebtAccounts(!isArrayEmpty(_debtAccount) ? _debtAccount : listAllDebtAccount)
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

    const getCardTitle = () => {
        const section = history.location.pathname.split("/").pop()

        switch (section) {
            case PARTNER_DEBT:
                return <FormattedMessage
                    id={getKeyLang(`account.debtPartnerManagement`)}
                />
            case ALL_DEBT:
                return <FormattedMessage
                    id={getKeyLang(`account.debtManagement`)}
                />
            default:
                return <FormattedMessage
                    id={getKeyLang(`account.debtManagement`)}
                />
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-uppercase'>
                    {
                        getCardTitle(detailLink)
                    }
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
                            options={suggestions}
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
                            data={debtAccounts}
                            columns={responsiveColums}
                            defaultPageSize={10}
                            SubComponent={(row) => {
                                return (
                                    <ReponsiveExpandableTable
                                        data={row.original}
                                    />
                                )
                            }
                            }
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

export default DebtManagement
