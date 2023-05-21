import React, { useEffect, useState } from 'react'
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
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import "react-table/react-table.css"
import "../../../../assets/scss/insurance-app/common/react-tables.scss"
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import classnames from "classnames"
import { ChevronDown } from "react-feather"
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import EditInputComponent from './EditInputComponent'



const FeeMotorCNManageView = (props) => {
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const [editable, setEditable] = useState(props.editable)
  const [listAprro, setListAprro] = useState([])
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const intl = useIntl()
  const [role, setRole] = useState(props.role)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("Closed")
  const toggleCollapse = () => {
    // console.log(show)
    setShow(!show)
  }

  useEffect(() => {
    // getFee()
  }, [])

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
      text: 'Mức trách nhiệm tham gia',
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: '50%',
        textAlign: 'left'
      },
      // filter: textFilter({ placeholder: '' }),
      headerAlign: 'center',
      headerClasses: "header-class",
    }, {
      dataField: 'fee',
      style: {
        width: '50%',
        textAlign: 'right'
      },
      text: 'Phí',
      // filter: textFilter({ placeholder: '' }),
      headerAlign: 'center',
      // type:'number',
      headerClasses: "header-class",
      // formatter: (cell) => {
      //   console.log(cell)
      //   return '10';
      // }
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='NUM' />
      )
    }

  ];

  const renderTable = () => {
    return (
      <React.Fragment>
        <BootstrapTable
          // className="feetabletnds"
          options={{ noDataText: 'No Templates Found' }}
          exportCSV
          hover
          striped responsive
          data={typeof (feeInsuranceReducer.feeCar.motorTndsOptFees) !== 'undefined' ? feeInsuranceReducer.feeCar.motorTndsOptFees : []}
          keyField="id"
          columns={columns}
          cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
          filter={filterFactory()}
          noDataIndication={<FormattedMessage id={`${AppId.INSURANCE_APP}.NoDataFound`} />}
        // headerTitle={false}
        />

      </React.Fragment>)
  }

  const renderTableApprove = () => {
    return (
      <React.Fragment>
        {typeof (feeInsuranceReducer.feeCar.motorTndsOptFees) !== 'undefined' ?
          <Table bordered responsive>

            <tbody>
              {
                feeInsuranceReducer.feeCar.motorTndsOptFees.map((item, i) => (

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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeBHTNNNTXMTXM`} />
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
              <label className="d-flex justify-content-end unit-fee-padding-left" ><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeUnitVND`} /></label>
              {role === 'VIEW' ? renderTableApprove() : renderTable()}
            </CardBody>
          </Collapse>

        </Card>
      </div>

    </React.Fragment>
  )

}
export default FeeMotorCNManageView
