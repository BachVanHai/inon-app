import "react-table/react-table.css"
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import "../../../../assets/scss/insurance-app/common/react-tables.scss"
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import React, { useState } from 'react'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import {
  Collapse,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
} from 'base-app'
import { useIntl } from 'react-intl'
import classnames from "classnames"
import { ChevronDown } from "react-feather"
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory from 'react-bootstrap-table2-filter';
import EditInputComponent from './EditInputComponent'
import { useSelector } from "react-redux"
// https://codesandbox.io/s/1f93h?file=/demo.js:2069-2571


const FeeCarHHManageView = (props) => {
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const [editable, setEditable] = useState(props.editable)

  const intl = useIntl()
  const [role, setRole] = useState(props.role)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("Closed")
  const toggleCollapse = () => {
    setShow(!show)
  }

  const onEntered = () => {
    setStatus("Opened")
  }
  const onEntering = () => {
    setStatus("Opening...")
  }

  const onExited = () => {
    setStatus("Closed")
  }

  const onExiting = () => {
    setStatus("Closing...")
  }

  const columns = [
    {
      dataField: 'name',
      text: intl.formatMessage({
        id: `${AppId.INSURANCE_APP}.FeeAddResponsibility`,
      }),
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: '50%',
        textAlign: 'left'
      },
      headerAlign: 'center',
      headerClasses: "header-class",
    }, {
      dataField: 'fee',
      style: {
        width: '50%',
        textAlign: 'right'
      },
      text: intl.formatMessage({
        id: `${AppId.INSURANCE_APP}.FeeRate`,
      }),
      headerAlign: 'center',
      headerClasses: "header-class",
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='PERCENT' />
      ),
    }
  ]


  const renderTable = () => {
    return (
      <React.Fragment>
        <BootstrapTable
          options={{ noDataText: 'No Templates Found' }}
          exportCSV
          hover
          striped responsive
          data={typeof (feeInsuranceReducer.feeCar.carGoodsFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carGoodsFees : []}
          keyField="id"
          columns={columns}
          cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
          filter={filterFactory()}
          noDataIndication={<FormattedMessage id={`${AppId.INSURANCE_APP}.NoDataFound`} />}
        />
      </React.Fragment>)
  }

  const renderTableApprove = () => {
    return (
      <React.Fragment>
        {typeof (feeInsuranceReducer.feeCar.carGoodsFees) !== 'undefined' ?
          <Table bordered responsive>
            <tbody>
              {
                feeInsuranceReducer.feeCar.carGoodsFees.map((item, i) => (
                  <tr key={i}>
                    < td styles={{ width: '50%' }}> {item.name}</td>
                    <td styles={{ width: '50%' }} >

                      {Utils.floatFomat(item.oldFee) !== Utils.floatFomat(item.fee) ?
                        <div className="d-flex justify-content-end"><del className="text-danger text-bold-600">{Utils.formatCurrency(item.oldFee)}</del>  <label>{ }</label>  <label className="text-bold-600">{item.fee}</label></div> :
                        <label className="d-flex justify-content-end text-bold-600">{item.fee}</label>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          : null}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="vx-collapse collapse-bordered">
        <Card
          key={1}

          className={classnames({
            "collapse-collapsed":
              status === "Closed",
            "collapse-shown":
              status === "Opened",
            closing:
              status === "Closing...",
            opening:
              status === "Opening..."
          })}
        >
          <CardHeader onClick={() => toggleCollapse()}>
            <CardTitle className="fee-card-title" >
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsCommodity`} />
            </CardTitle>
            <ChevronDown size={15} className="collapse-icon" />
          </CardHeader>
          <Collapse
            isOpen={show}
            onEntering={() => onEntering()}
            onEntered={() => onEntered()}
            onExiting={() => onExiting()}
            onExited={() => onExited()}
          >
            <CardBody>
              <label className="d-flex justify-content-end unit-fee-padding-left" ><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeUnitPercent`} /></label>
              {role === 'VIEW' ? renderTableApprove() : renderTable()}
            </CardBody>
          </Collapse>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default FeeCarHHManageView