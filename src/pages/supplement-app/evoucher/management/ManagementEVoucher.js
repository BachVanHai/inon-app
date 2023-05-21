import {
  Button,
  goBackHomePage,
  Select,
  showConfirmAlert,
  useDeviceDetect
} from 'base-app'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import { getKeyLang } from '../../../../configs/supplement-app'
import { getAllEvoucher } from '../../../../redux/actions/supplement-app/eVoucherManagement'
import useColumns from './eVoucherTable'
import ExportReportModal from './exportReportModal'

const TreeTable = treeTableHOC(ReactTable)
const ManagementEVoucher = () => {
  const { Table, columns } = useColumns(reActiveLoadApi)
  const intl = useIntl()
  const dispatch = useDispatch()
  const history = useHistory()
  const [isOpenExportModal, setIsOpenExportModal] = useState(false);
  const { availableEvoucher } = useSelector(
    (state) => state.app.evoucherManagement
  )
  //if  dispatchDependency change => get render UI
  const [dispatchDependency, setDispatchAcitive] = useState(0)
  const dependencies = [
    availableEvoucher.length,
    dispatchDependency,
    history.location.pathname
  ]
  //get data api
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
  const handleCloseExportModal = () =>{
    setIsOpenExportModal(false)
  }
  //load evoucher
  useEffect(() => {
    dispatch(getAllEvoucher())
  }, [...dependencies, JSON.stringify(availableEvoucher)])
  function reActiveLoadApi() {
    setDispatchAcitive((pre) => ++pre)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id={getKeyLang(`evoucher.management.title`)} />
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={6} className={`mb-2`}>
            <FormattedMessage id={getKeyLang('evoucher.management.totalVoucher')}/>
            {availableEvoucher.length}
          </Col>
          <Col md={6} className="mb-2">
            <div className={`d-flex justify-content-end`}>
            <Button color="success" onClick={()=>{
              setIsOpenExportModal(true)
            }}>
              <FormattedMessage id={getKeyLang('evoucher.management.acticon.exportReport')}/>
            </Button>
            </div>
            <div>
              <ExportReportModal isOpen={isOpenExportModal} closeModal={handleCloseExportModal}/>
            </div>
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
              //push data here
              data={availableEvoucher}
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

export default ManagementEVoucher
