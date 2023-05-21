import 'react-table/react-table.css'
import React, { useEffect } from 'react'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import { getKeyLang } from '../../../../../configs/supplement-app'
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Col, Row } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, goBackHomePage, showConfirmAlert } from 'base-app'
import { useSelector, useDispatch } from 'react-redux'
import { getMyDebtAccount } from '../../../../../redux/actions/supplement-app/debtManagement'
import { useResponsiveColums } from './utility'
import { useHistory } from 'react-router-dom'
import { URL_PERSONAL_DEBT } from './utility'

const TreeTable = treeTableHOC(ReactTable)

const MyDebtManagement = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { myDebtAccount } = useSelector((state) => state.app.debtManagement)
  const { responsiveColums, ReponsiveExpandableTable } = useResponsiveColums(URL_PERSONAL_DEBT)

  const history = useHistory()
  useEffect(() => {
    dispatch(getMyDebtAccount())
    // eslint-disable-next-line
  }, [history.location.pathname])

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id={getKeyLang(`account.myDebtManagement`)} />
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
              data={myDebtAccount}
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

export default MyDebtManagement
