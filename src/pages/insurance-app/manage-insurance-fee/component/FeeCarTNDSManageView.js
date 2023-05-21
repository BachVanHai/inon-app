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
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Row
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
  Button, Checkbox, showConfirmAlert, hideConfirmAlert
} from 'base-app'
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
import 'react-table/react-table.css'
import '../../../../assets/scss/insurance-app/common/react-tables.scss'
import '../../../../assets/scss/insurance-app/buy-insurance/account.scss'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { Check, ChevronDown } from 'react-feather'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import { injectIntl } from 'react-intl'
import EditInputComponent from './EditInputComponent'

// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-celledit.html
// npm install react-bootstrap-table2-editor --save
//npm install react-bootstrap-table-next --save
// npm install react-bootstrap-table2-filter --save
const TreeTable = treeTableHOC(ReactTable)

const ExpandableTable = (props) => {
  const [editable, setEditable] = useState(props.editable)
  const [info, setInfo] = useState([])

  // let [firstNameF, setpriceFilter] = useState('6 chỗ')

  useEffect(() => {
    setInfo(props.data.list)
    console.log(JSON.stringify(props.data.list, null, 2))
  }, [])
  const intl = useIntl()

  const columns = [
    // {
    //   dataField: 'id',
    //   text: 'STT'
    // },
    {
      dataField: 'name',
      text: intl.formatMessage({
        id: `${AppId.INSURANCE_APP}.TypeVihicle`,
      }),
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: "50%"
      },
      headerAttrs: {
        hidden: true
      },
      filter: textFilter({ placeholder: '' })
    }, {
      dataField: 'fee',
      style: {
        width: "50%",
        textAlign: "right"
      },
      headerAttrs: {
        hidden: true
      },
      text: intl.formatMessage({
        id: `${AppId.INSURANCE_APP}.FeeRate`,
      }),
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='NUM' />
      ),
      filter: textFilter({
        getFilter: (filter) => { // This does work
        }
      })
    }];


  return (
    <BootstrapTable striped responsive
      bordered={false}
      hover
      className="feetabletnds"
      keyField="id"
      data={info}
      columns={columns}
      cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
      filter={filterFactory()}
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
              < td styles={{ width: '50%' }}> {item.name}</td>
              <td styles={{ width: '50%' }} className="d-flex justify-content-end">

                {Utils.floatFomat(item.oldFee) !== Utils.floatFomat(item.fee) ?
                  <div><del className="text-danger text-bold-600">{Utils.formatCurrency(item.oldFee)}</del>  <label>{ }</label>  <label className="text-bold-600">{item.fee}</label></div> :
                  <label className="text-bold-600">{item.fee}</label>
                }
              </td>
            </tr>

          ))
        }

      </tbody>
    </Table>


  )
}

const FeeCarTNDSManageView = (props) => {
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const [listAprro, setListAprro] = useState([])
  const [data, setData] = useState(props.feeTNDS)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const intl = useIntl()
  const [editable, setEditable] = useState(props.editable)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("Closed")
  const [inputSearch, setInputSearch] = useState('')
  const [role, setRole] = useState(props.role)
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

  const handlerSearch = () => {
    dispatch({
      type: "ACTION_FEE_SEARCH_CAR_TNDS",
      payload: inputSearch
    })

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
    setData([])
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

  const renderTable = () => {
    return (
      <React.Fragment>
        <TreeTable
          filterable
          autoResetExpanded={false}
          className="dataTable-custom margin-table ReactTablefee"
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id
            console.log("dunglhq -" + filter + " - " + row[id])
            return row[id] !== undefined
              ? String(row[id])
                .toLowerCase()
                .includes(filter.value.toLowerCase())
              : true
          }}
          data={typeof (feeInsuranceReducer.feeCar.carTndsFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carTndsFees : []}
          columns={[

            {
              Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} />,
              accessor: `vehicleType`,
              filterable: false
            },
            {
              Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.Fee`} />,
              accessor: null,
              filterable: false
            }
          ]}
          pageSize={typeof (feeInsuranceReducer.feeCar.carTndsFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carTndsFees.length == 0 ? 2 : feeInsuranceReducer.feeCar.carTndsFees.length : 2}
          showPagination={false}
          SubComponent={(row) => {
            return (
              <div style={{ padding: '4px' }}>
                {role === 'VIEW' ? < ExpandableTableAprrove data={row.original} /> : <ExpandableTable data={row.original} editable={editable} />}
                {/**/}
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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsBBTNDSCar`} />
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
            {/* <FormGroup>
              <InputGroup>
                <Input
                  onChange={e => {
                    setInputSearch(e.target.value)
                    // formik.setFieldValue('numberPlate', Utils.removeSpecialCharNumberPlate(e.target.value));
                  }} />
                <InputGroupAddon addonType="append">
                  <Button.Ripple color="primary" onClick={handlerSearch}>Search</Button.Ripple>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup> */}

            {/* <div className="d-flex justify-content-end"> */}
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
                            type: "ACTION_FEE_SEARCH_CAR_TNDS",
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
            {/* </div> */}

            <label className="d-flex justify-content-end unit-fee-padding-left" ><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeUnitVND`} /></label>
            {renderTable()}
            {/* </CardBody> */}
          </Collapse>

        </Card>
      </div>

    </React.Fragment>
  )

}
export default injectIntl(FeeCarTNDSManageView)



// <React.Fragment>
// <label>BH bắt buộc TNDS xe ô tô</label>

// <div className="d-flex justify-content-end margin-top-28">

//   <ButtonGroup className="mb-1">
//     <Button.Ripple color="danger" disabled={listAprro.length > 0 ? false : true} onClick={() => handlerContract(CONST.ACTION_DECLINED)}>Từ chối</Button.Ripple>{" "}
//     <Button.Ripple color="primary" disabled={listAprro.length > 0 ? false : true} onClick={() => handlerContract(CONST.ACTION_APPROVED)}>Phê duyệt</Button.Ripple>{" "}
//     {/* <Button.Ripple color="info">Right</Button.Ripple>{" "} */}
//   </ButtonGroup>

// </div>
// </React.Fragment>


{/* <div className="d-flex justify-content-end margin-top-14 margin-bottom-100">

<Button.Ripple className="mr-1 mb-1 round btn-custom" color="primary" outline onClick={() => history.push("/contracts/all")}>
  Quay lại

</Button.Ripple>

<Button.Ripple className="mr-1 mb-1 round bg-gradient-nophi btn-custom" color="none" onClick={() => history.push("/")}>
  Trang chủ
</Button.Ripple>


</div> */}
