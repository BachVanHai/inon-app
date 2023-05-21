import {
  Button,
  FormattedMessage,
  goBackHomePage,
  showConfirmAlert
} from 'base-app'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row
} from 'reactstrap'
import { getKeyLang } from '../../../../configs/app-no1'
import { loadAllQuestion } from '../../../../redux/actions/app-no1/helpCenterManagement'
import FilterPromissionDocument from '../components/FilterPromissionDocument'
import useColumns from './UserManualTable'
import {HDSD} from '../utility'
import { isArrayEmpty, TreeTable_filterMethod, TreeTable_filterMethod_noAccents } from '../../../../ultity'

const ManagementUserManual = () => {
  const history = useHistory()
  const {availableHDSD} = useSelector(state => state.app.helpCenterManagement)
  const { Table, columns } = useColumns(reActiveLoadApi)
  const [avaibleData, setavaibleData] = useState([]);
  const [dispatchDependency, setDispatchAcitive] = useState(0)
  const intl = useIntl()
  const TreeTable = treeTableHOC(ReactTable)
  const dispatch = useDispatch()
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
  function reActiveLoadApi() {
    setDispatchAcitive((pre) => ++pre)
  }
  const dependencies = [
    availableHDSD.length,
    history.location.pathname,
    dispatchDependency
  ]
  useEffect(() => {
    dispatch(loadAllQuestion())
    setavaibleData(availableHDSD)
  }, [...dependencies , JSON.stringify(availableHDSD)])
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id={getKeyLang('helpcenter.create.userManual')} />
        </CardTitle>
      </CardHeader>
      <CardBody>
      <FilterPromissionDocument type={HDSD} total={availableHDSD.length} data={availableHDSD} avaibleData={avaibleData} setavaibleData={setavaibleData}/>
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
                  height: '50px',
                  lineHeight: '35px'
                }
              })}
              data={avaibleData}
              columns={columns}
              defaultPageSize={10}
              SubComponent={(row) => {
                return (
                  <div style={{ padding: '10px' }}>
                    <Table data={row.original} />
                  </div>
                )
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

export default ManagementUserManual
