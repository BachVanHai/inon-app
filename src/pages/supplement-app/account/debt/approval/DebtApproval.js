import 'react-table/react-table.css'
import React, { useMemo, useState, useEffect } from 'react'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { getKeyLang } from '../../../../../configs/supplement-app'
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Col, FormGroup, Row, } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { BaseAppUltils, Select, Button, goBackHomePage, showConfirmAlert, DatePicker } from 'base-app'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import DebtService from '../../../../../services/supplement-app/debt'
import { addChangePropTo, APPROVED, PENDING, convertToDateValue } from './utility'
import { loadListAccountsPending, loadListSuggestion } from '../../../../../redux/actions/supplement-app/debtApproval'
import { getListAllDebtAccount, getListAllPartnersDebtAccount } from '../../../../../redux/actions/supplement-app/debtManagement'
import useCheckUserRole from '../../../../../custom-hooks/useCheckUserRole'
import useResponsiveColums from './useResponsiveColums'
import { useHistory } from 'react-router-dom'
import { isArrayEmpty } from '../../../../../ultity'

const TreeTable = treeTableHOC(ReactTable)

const DebtApproval = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { availableUsersSuggestions } = useSelector(
    (state) => state.app.debtCreate
  )
  const { pendingAccounts } = useSelector((state) => state.app.debtApproval)
  const { listAllDebtAccount } = useSelector(
    (state) => state.app.debtManagement
  )
  const [pendingDebtAccounts, setPendingDebtAccount] = useState([])
  const [searchIds, setSearchIds] = useState("")
  const { groupId, partnersGroupUser, adminGroupUser } = useCheckUserRole()
  const { responsiveColums, ReponsiveExpandableTable } = useResponsiveColums(
    availableUsersSuggestions,
    onClickApprove,
    reActiveLoadApi
  )
  const [dispatchDependency, setDispatchAcitive] = useState(0)
  const history = useHistory()
  const dependencies = [
    availableUsersSuggestions.length,
    pendingAccounts.length,
    listAllDebtAccount.length,
    history.location.pathname,
    dispatchDependency
  ]

  const _pendingAccountsCount = pendingAccounts.reduce((total, elt) => {
    if (elt.approvalStatus === PENDING) {
      return total + 1
    }
    return total
  }, 0)
  const filteredSuggestions = useMemo(() => {
    return availableUsersSuggestions.filter((suggestElt) => {
      const found = pendingAccounts.find(
        (rawElt) => Number(rawElt.userId) === Number(suggestElt.id)
      )
      if (found) {
        if (found.approvalStatus === PENDING) {
          return true
        }
      }
      return false
    })
    // eslint-disable-next-line
  }, [...dependencies, _pendingAccountsCount])

  const pendingAccounts_filter = useMemo(() => {
    return pendingAccounts.filter((pendingElt) => {
      if (pendingElt.approvalStatus === PENDING) {
        return true
      }
      return false
    })
    // eslint-disable-next-line
  }, [...dependencies, _pendingAccountsCount])

  const [startDate, setStartDate] = useState(
    moment().subtract(7, 'day').utc().toISOString()
  )
  const [endDate, setEndDate] = useState(moment().utc().toISOString())
  const [nowDateValue] = useState(moment().utc().toDate())
  const MAX_SELECT_DAYS = 90
  const dateOptions = {
    mode: 'range',
    dateFormat: 'm-d-Y'
  }

  function reActiveLoadApi() {
    setDispatchAcitive((pre) => ++pre)
  }

  const onChangeSearchIds = (values) => {
    if (isArrayEmpty(values)) {
      setSearchIds("")
      const _pendingAccounts = addChangePropTo(
        pendingAccounts_filter,
        listAllDebtAccount
      )
  
      setPendingDebtAccount(_pendingAccounts)
      return
    }
    const _partners = values.map(elt => {
      return elt.id
    })
    setSearchIds(!isArrayEmpty(_partners) ? _partners.join(",") : "")
  }

  const applyDateSearch = (start, end) => {
    if (start > end) {
      let temp = start
      start = end
      end = temp
    }
    setStartDate(start)
    setEndDate(end)

    const convertedStartDate = convertToDateValue(start)
    const convertedEndDate = convertToDateValue(end)

    const _pendingAccounts = addChangePropTo(
      pendingAccounts_filter,
      listAllDebtAccount
    )
    const pendingDebtAccounts_filterApplyDate = _pendingAccounts.filter(
      (applyDateElt) => {
        const _date = convertToDateValue(applyDateElt.updateDate)

        if (_date >= convertedStartDate && _date <= convertedEndDate) {
          return true
        }
        return false
      }
    )

    setPendingDebtAccount(pendingDebtAccounts_filterApplyDate)
  }

  const onChangeDateSearch = ([start, end]) => {
    // return console.log(`applyDateSearch.start.end`, start, end)
    if (!end) {
      if (moment(nowDateValue).diff(start, 'days') <= MAX_SELECT_DAYS) {
        applyDateSearch(start, nowDateValue)
        return
      } else if (moment(nowDateValue).diff(start, `days`) >= MAX_SELECT_DAYS) {
        applyDateSearch(
          start,
          moment(start).add(MAX_SELECT_DAYS, `days`).utc().toDate()
        )
        return
      }
    }

    if (Math.abs(moment(start).diff(end, 'days')) >= MAX_SELECT_DAYS) {
      BaseAppUltils.toastError(
        'Chỉ có thể chọn ngày bắt đầu và kết thúc tối đa là 3 tháng!'
      )
      return
    }
    applyDateSearch(start, end)
  }

  useEffect(() => {
    if (adminGroupUser.includes(groupId)) {
      dispatch(getListAllDebtAccount())
    } else if (partnersGroupUser.includes(groupId)) {
      dispatch(getListAllPartnersDebtAccount())
    } else {
      dispatch(getListAllPartnersDebtAccount())
    }

    dispatch(loadListSuggestion())
    dispatch(loadListAccountsPending())

    const _pendingAccounts = addChangePropTo(
      pendingAccounts_filter,
      listAllDebtAccount
    )
    setPendingDebtAccount(_pendingAccounts)

    // eslint-disable-next-line
  }, [...dependencies, _pendingAccountsCount])

  const onClickSearch = () => {
    const _pendingAccounts = addChangePropTo(
      pendingAccounts_filter,
      listAllDebtAccount
    )

    const _pendingAccounts_filterSearchedIds = _pendingAccounts.filter(
      (pendingElt) => {
        return searchIds.split(",").find(
          (searchElt) => Number(searchElt) === Number(pendingElt.userId)
        )
      }
    )
    
    setPendingDebtAccount(
      !isArrayEmpty(_pendingAccounts_filterSearchedIds)
        ? _pendingAccounts_filterSearchedIds
        : _pendingAccounts
    )
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

  function onClickApprove(original) {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={getKeyLang('account.debtApproval')} />,
        isShow: true,
        content: (
          <FormattedMessage id={getKeyLang('account.confirm.debtApproval')} />
        ),
        onConfirm: async () => {
          const resolvedData = await DebtService.approvalAccount(
            original.id,
            APPROVED
          )
          if (resolvedData) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({ id: getKeyLang('account.success') })
            )
            reActiveLoadApi()
            return true
          }
          BaseAppUltils.toastError(
            intl.formatMessage({ id: getKeyLang('account.error') })
          )
          return false
        }
      })
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id={getKeyLang(`account.debtApproval`)} />
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row className={'mb-2'}>
          <Col xs={12} md={5}>
            <DatePicker
              messageId={getKeyLang(`account.applyDate`)}
              value={[startDate, endDate]}
              options={dateOptions}
              onChange={onChangeDateSearch}
            />
          </Col>
          <Col xs={12} md={5}>
            <FormattedMessage id={getKeyLang('bonus.findPartner')}>
              {(msg) => (
                <FormGroup>
                  <Select
                    readOnly
                    isMulti
                    closeMenuOnSelect={true}
                    notRequired
                    className='React'
                    classNamePrefix='select mt-1'
                    onChange={onChangeSearchIds}
                    value={searchIds}
                    options={filteredSuggestions}
                    placeholder={msg}
                    isClearable={true}
                  />
                </FormGroup>
              )}
            </FormattedMessage>
          </Col>
          <Col xs={12} md={2}>
            <Button.Ripple color='primary' onClick={onClickSearch}>
              <FormattedMessage id={getKeyLang('bonus.search')} />
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
                  height: 'auto'
                }
              })}
              data={pendingDebtAccounts}
              columns={responsiveColums}
              defaultPageSize={10}
              SubComponent={(row) => {
                return <ReponsiveExpandableTable data={row.original} />
              }}
            />
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <div className='d-flex justify-content-end'>
          <Button.Ripple
            color='secondary'
            className=''
            onClick={onClickBackHome}
          >
            <FormattedMessage id='common.home' />
          </Button.Ripple>
        </div>
      </CardFooter>
    </Card>
  )
}

export default DebtApproval
