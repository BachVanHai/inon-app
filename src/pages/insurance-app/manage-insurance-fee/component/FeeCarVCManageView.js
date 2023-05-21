import React, { useEffect, useState } from 'react'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import {
  Collapse,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Input,
  Col,
  Row,
  FormGroup,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
  showConfirmAlert,
  hideConfirmAlert,
  Button,
} from 'base-app'
import '../../../../assets/scss/insurance-app/buy-insurance/buy-insurance-car.scss'
import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'
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
import EditInputComponent from './EditInputComponent'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const TreeTable = treeTableHOC(ReactTable)

const ExpandableTable = (props) => {
  // const [editable, setEditable] = useState(props.editable)
  const [editable, setEditable] = useState(!(props.role === 'AGENCY' || props.role === 'ALL' || props.role === 'NONRESIDENT') ? props.editable : true)
  const [info, setInfo] = useState([])
  useEffect(() => {
    setInfo(props.data.list)
  }, [])

  const columns = [
    // {
    //   dataField: 'id',
    //   text: 'STT'
    // }, 
    {
      dataField: 'carWorth',
      text: 'Giá trị xe khai báo',
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: "30%"
      },
      headerAttrs: {
        hidden: true
      },
      filter: textFilter({ placeholder: '' }),
    }, {
      dataField: 'usageTime',
      text: 'Số năm sử dụng',
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: "30%"
      },
      headerAttrs: {
        hidden: true
      },
      filter: textFilter({ placeholder: '' }),
    }, {
      dataField: 'fee',
      style: {
        width: "30%",
        textAlign: "right"
      },
      headerAttrs: {
        hidden: true
      },
      text: 'Tỷ lệ phí',
      editable: (cell, row, rowIndex, colIndex) => {
        return editable
      },
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <EditInputComponent {...editorProps} value={value} type='PERCENT' />
      ),
      filter: textFilter({ placeholder: '' }),
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
              < td > {item.carWorth}</td>
              < td > {item.usageTime}</td>
              <td >

                {Utils.floatFomat(item.fee) !== Utils.floatFomat(item.oldFee) ?
                  <div className="d-flex justify-content-end"><del className="text-danger text-bold-600">{item.oldFee}</del>  <label>{ }</label>  <label className="text-bold-600">{item.fee}</label></div> :
                  <label className="d-flex justify-content-end text-bold-600">{item.fee}</label>
                }
              </td>
            </tr>

          ))
        }

      </tbody>
    </Table>


  )
}

const FeeCarVCManageView = (props) => {
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const [listAprro, setListAprro] = useState([])
  const [data, setData] = useState(props.feeTNDS)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const intl = useIntl()
  const [editable, setEditable] = useState(props.editable)
  const [role, setRole] = useState(props.role)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("Closed")
  const [inputSearch, setInputSearch] = useState('')

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

  const handlerSearch = () => {
    dispatch({
      type: "ACTION_FEE_SEARCH_CAR_VC",
      payload: inputSearch
    })

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
          className="dataTable-custom ReactTablefee"
          noDataIndication={<FormattedMessage id={`${AppId.INSURANCE_APP}.NoDataFound`} />}
          defaultFilterMethod={(filter, row, column) => {
            const id = filter.pivotId || filter.id
            return row[id] !== undefined
              ? String(row[id])
                .toLowerCase()
                .includes(filter.value.toLowerCase())
              : true
          }}
          data={typeof (feeInsuranceReducer.feeCar.carFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carFees : []}
          columns={[

            {
              Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.TypeVihicle`} />,
              accessor: `name`,
              filterable: false
            }
            ,
            {
              Header: <FormattedMessage id={`${AppId.INSURANCE_APP}.Fee`} />,
              accessor: null,
              filterable: false
            }
          ]}
          pageSize={typeof (feeInsuranceReducer.feeCar.carFees) !== 'undefined' ? feeInsuranceReducer.feeCar.carFees.length == 0 ? 2: feeInsuranceReducer.feeCar.carFees.length : 2}
          showPagination={false}
          SubComponent={(row) => {
            return (
              <div style={{ padding: '4px' }}>
                {role === 'VIEW' ? < ExpandableTableAprrove data={row.original} /> : <ExpandableTable role={role} data={row.original} editable={editable} />}
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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsMaterialCar`} />
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
                              type: "ACTION_FEE_SEARCH_CAR_VC",
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
              <label className="d-flex justify-content-end unit-fee-padding-left" ><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeUnitVND`} /></label>
              {renderTable()}
            </CardBody>
          </Collapse>

        </Card>
      </div>

    </React.Fragment>
  )

}
export default FeeCarVCManageView



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
