import React, { useEffect, useState } from 'react'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import {
  Collapse,
  Card,
  CardHeader,
  CardTitle,
  Table,
  Input,
  Col,
  Row,
  FormGroup,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
  Button,
  showConfirmAlert,
  hideConfirmAlert,
} from 'base-app'
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import '../../../../assets/scss/insurance-app/common/react-tables.scss'
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import Checkbox from '../../../../components/insurance-app/checkbox/CheckboxesVuexy'
import { Check } from 'react-feather'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { ChevronDown } from 'react-feather'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import EditInputComponent from './EditInputComponent'

// https://codesandbox.io/s/1f93h?file=/demo.js:2069-2571
const TreeTable = treeTableHOC(ReactTable)

const ExpandableTable = (props) => {
  const [editable, setEditable] = useState(props.editable)
  const [info, setInfo] = useState([])
  const [editting, setEditting] = useState(false)
  useEffect(() => {
    setInfo(props.data.list)
  }, [])

  const columns = [

    {
      dataField: 'name',
      text: 'Product Name',
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: '25%'
      },
      headerAttrs: {
        hidden: true
      }
    }, {
      dataField: `humanFee.fee`,
      style: {
        width: '25%',
        textAlign: 'right'
      },
      headerAttrs: {
        hidden: true
      },
      text: 'Fee',
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='PERCENT' />
      )
    }, {
      dataField: `assetsFee.fee`,
      style: {
        width: '25%',
        textAlign: 'right'
      },
      headerAttrs: {
        hidden: true
      },
      text: 'Fee',
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='PERCENT' />
      )
    }, {
      dataField: `passengerFee.fee`,
      style: {
        width: '25%',
        textAlign: 'right'
      },
      headerAttrs: {
        hidden: true
      },
      text: 'Fee',
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='PERCENT' />
      )
    }

  ];

  return (
    <BootstrapTable striped responsive
      bordered={false}
      keyField="id"
      hover
      data={info}
      columns={columns}
      cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
      noDataIndication={<FormattedMessage id={`${AppId.INSURANCE_APP}.NoDataFound`} />}
    >
    </BootstrapTable>

  )
}

const ExpandableTableAprrove = (props) => {
  const [editable, setEditable] = useState(props.editable)
  const [info, setInfo] = useState(props.data.list)

  useEffect(() => {
    console.log(JSON.stringify(props.data.list, null, 2))
  }, [])

  return (
    <Table bordered responsive>
      {/* <thead>
        <tr>

            <th><FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} /></th>
            <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutMan`} /></th>
            <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutAsset`} /></th>
            <th><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutPassenger`} /></th>
        </tr>
    </thead> */}
      <tbody>
        {
          info.map((item, i) => (

            <tr key={i}>
              < td > {item.name}</td>
              <td >

                {Utils.floatFomat(item.humanFee.fee) !== Utils.floatFomat(item.humanFee.oldFee) ?
                  <div className="d-flex justify-content-end"><del className="text-danger text-bold-600">{item.humanFee.oldFee}</del>  <label>{ }</label>  <label className="text-bold-600">{item.humanFee.fee}</label></div> :
                  <label className="d-flex justify-content-end text-bold-600">{item.humanFee.fee}</label>
                }
              </td>
              <td >

                {Utils.floatFomat(item.assetsFee.fee) !== Utils.floatFomat(item.assetsFee.oldFee) ?
                  <div className="d-flex justify-content-end"><del className="text-danger text-bold-600">{item.assetsFee.oldFee}</del>  <label>{ }</label>  <label className="text-bold-600">{item.assetsFee.fee}</label></div> :
                  <label className="d-flex justify-content-end text-bold-600">{item.assetsFee.fee}</label>
                }
              </td>
              <td >

                {Utils.floatFomat(item.passengerFee.fee) !== Utils.floatFomat(item.passengerFee.oldFee) ?
                  <div className="d-flex justify-content-end"><del className="text-danger text-bold-600">{item.passengerFee.oldFee}</del>  <label>{ }</label>  <label className="text-bold-600">{item.passengerFee.fee}</label></div> :
                  <label className="d-flex justify-content-end text-bold-600">{item.passengerFee.fee}</label>
                }
              </td>
            </tr>

          ))
        }

      </tbody>
    </Table>


  )
}

const FeeCarTNDSTNManageView = (props) => {
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const [listAprro, setListAprro] = useState([])
  const [editable, setEditable] = useState(props.editable)
  const [inputSearch, setInputSearch] = useState('')
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

  const reset = () => {
    setListAprro([])
  }


  const handlerContract = (action) => {

  }

  const showConfirmDialog = (titleMessageId, confirmMesage, onConfirm, onCancel) => {
    dispatch(
      showConfirmAlert({
        title: intl.formatMessage({
          id: titleMessageId
        }),
        isShow: true,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(
                {
                  id: confirmMesage
                }
              )
            }}
          />
        ),
        confirmBtnText: intl.formatMessage({
          id: `${AppId.INSURANCE_APP}.ConfirmOk`
        }),
        cancelBtnText: intl.formatMessage({
          id: `${AppId.INSURANCE_APP}.ConfirmCancel`
        }),
        onConfirm: () => {
          dispatch(hideConfirmAlert())
          onConfirm()
        },
        onCancel: () => {
          dispatch(hideConfirmAlert())
          onCancel()
        }
      })
    )
  }

  const handlerSearch = () => {
    dispatch({
      type: "ACTION_FEE_SEARCH_CAR_TNDSTN",
      payload: inputSearch
    })

  }

  const renderTable = () => {
    return (
      <React.Fragment>
        <TreeTable
          filterable
          className="dataTable-custom margin-table ReactTablefee"
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id
            return row[id] !== undefined
              ? String(row[id])
                .toLowerCase()
                .includes(filter.value.toLowerCase())
              : true
          }}
          data={typeof (feeInsuranceReducer.feeCar.carTndsOptFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carTndsOptFees : []}
          columns={[

            {
              Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} />,
              accessor: `vehicleType`,
              filterable: false
            },
            {
              Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeRateIncre`} />,
              columns: [
                {
                  Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutMan`} />,
                  accessor: null,
                  filterable: false
                  // filterMethod: (filter, row) =>
                  //   row[filter.id].startsWith(filter.value) &&
                  //   row[filter.id].endsWith(filter.value)
                },
                {
                  Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutAsset`} />,
                  accessor: null,
                  filterable: false
                  // accessor: d => d.lastName,
                  // filterMethod: (filter, rows) =>
                  //   matchSorter(rows, filter.value, { keys: ["lastName"] }),
                  // filterAll: true
                },
                {
                  Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeAboutPassenger`} />,
                  accessor: null,
                  filterable: false
                  // accessor: d => d.lastName,
                  // filterMethod: (filter, rows) =>
                  //   matchSorter(rows, filter.value, { keys: ["lastName"] }),
                  // filterAll: true
                }
              ]
            }
          ]}
          pageSize={typeof (feeInsuranceReducer.feeCar.carTndsOptFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carTndsOptFees.length == 0 ? 2 : feeInsuranceReducer.feeCar.carTndsOptFees.length : 2}
          showPagination={false}
          SubComponent={(row) => {
            return (
              <div style={{ padding: '4px' }}>
                {role === 'VIEW' ? < ExpandableTableAprrove data={row.original} /> : <ExpandableTable data={row.original} editable={editable} />}
              </div>
            )
          }}
        />

      </React.Fragment>)
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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsBBTNDSTNCar`} />
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
            {/* <CardBody> */}
            <Row>
              <Col sm="6">
              </Col>
              <Col sm="6">
                <FormGroup className="margin-right-8">
                  <InputGroup>
                    <Input
                      placeholder={intl.formatMessage({
                        id: `${AppId.INSURANCE_APP}.TypeVihicle`,
                      })}
                      onChange={e => {
                        setInputSearch(e.target.value)
                        if (e.target.value === '') {
                          dispatch({
                            type: "ACTION_FEE_SEARCH_CAR_TNDSTN",
                            payload: ''
                          })
                        }
                        // formik.setFieldValue('numberPlate', Utils.removeSpecialCharNumberPlate(e.target.value));
                      }} />
                    <InputGroupAddon addonType="append">
                      <Button.Ripple color="primary" onClick={handlerSearch}><FormattedMessage id={`${AppId.INSURANCE_APP}.Search`} /></Button.Ripple>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <label className="d-flex justify-content-end unit-fee-padding-left" ><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeUnitPercent`} /></label>
            {renderTable()}
            {/* </CardBody> */}
          </Collapse>

        </Card>
      </div>

    </React.Fragment>
  )

}
export default FeeCarTNDSTNManageView
