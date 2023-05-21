import React, { useState } from 'react'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import {
  Collapse,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
} from 'base-app'
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import "react-table/react-table.css"
import "../../../../assets/scss/insurance-app/common/react-tables.scss"
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import Checkbox from "../../../../components/insurance-app/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import classnames from "classnames"
import { ChevronDown } from "react-feather"
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import EditInputComponent from './EditInputComponent'
import { injectIntl, } from 'react-intl';
// https://codesandbox.io/s/1f93h?file=/demo.js:2069-2571


const FeeCarCNManageView = (props) => {
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const [listAprro, setListAprro] = useState([])
  const [editable, setEditable] = useState(props.editable)

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const intl = useIntl()
  const [role, setRole] = useState(props.role)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("Closed")
  const toggleCollapse = () => {
    console.log(show)
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


  const renderTableButtons = (row) => {
    return (
      <div className='d-flex justify-content-center'>
        <Checkbox
          color="primary"
          icon={<Check className="vx-icon" size={16} />}
          checked={row.check}
          defaultChecked={row.check}
          onClick={() => {
            const id = listAprro.find(ins => ins === row.id)
            row.check = !row.check
            if (typeof (id) === 'undefined') {
              setListAprro([...listAprro, row.id])
            } else {
              const list = listAprro.filter(ins => ins !== row.id)
              setListAprro(list)
            }

          }}
        />
      </div>
    )
  }


  const columns = [

    {
      dataField: 'name',
      text: intl.formatMessage({
        id: `${AppId.INSURANCE_APP}.FeeAmountInsurance`,
      }),
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: '25%',
        textAlign: 'left'
      },
      // filter: textFilter({ placeholder: '' }),
      headerAlign: 'center',
      headerClasses: "header-class",
    }, {
      dataField: 'fee',
      style: {
        width: '25%',
        textAlign: 'right'
      },
      text:
        intl.formatMessage({
          id: `${AppId.INSURANCE_APP}.FeeRate`,
        }),
      // filter: textFilter({ placeholder: '' }),
      headerAlign: 'center',
      headerClasses: "header-class",
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='PERCENT' />
      )
    }

  ];


  const renderTable = () => {
    return (
      <React.Fragment>
        <BootstrapTable
          options={{ noDataText: 'No Templates Found' }}
          exportCSV
          hover
          striped responsive
          data={typeof (feeInsuranceReducer.feeCar.carLpxNntxFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carLpxNntxFees : []}
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
        {typeof (feeInsuranceReducer.feeCar.carLpxNntxFees) !== 'undefined' ?
          <Table bordered responsive>

            <tbody>
              {
                feeInsuranceReducer.feeCar.carLpxNntxFees.map((item, i) => (

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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsBHTNLPXNTX`} />
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
              <label className="d-flex justify-content-end unit-fee-padding-left" > <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeUnitPercent`} /></label>
              {role === 'VIEW' ? renderTableApprove() : renderTable()}
            </CardBody>
          </Collapse>

        </Card>
      </div>

    </React.Fragment>
  )

}
export default injectIntl(FeeCarCNManageView)
