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
  Button, Checkbox, showConfirmAlert, hideConfirmAlert, CurrencyInput
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
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/insurance-app'

// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-celledit.html
// npm install react-bootstrap-table2-editor --save
//npm install react-bootstrap-table-next --save
// npm install react-bootstrap-table2-filter --save
const FeeAntinStyled = styled.div`
.form-control {
    /* border: 1px solid #d9d9d9; */
    color: #474747;
    width: 80px;
    outline: none;
    border: none;
    &:focus{
    border: 1px solid #338955;
  }
  &:disabled{
    background-color: #fff;
  }
}
`
const TreeTable = treeTableHOC(ReactTable)

const ExpandableTable = (props) => {
  const [editable, setEditable] = useState(props.editable)
  const [info, setInfo] = useState([])

  // let [firstNameF, setpriceFilter] = useState('6 chỗ')

  useEffect(() => {
    setInfo(props.data.list)
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

const FeeAntinInsManageView = (props) => {
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
    setShow(!show)
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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsAntinI`} />
            </CardTitle>
            <FeeAntinStyled>
            <CurrencyInput
              id='input__value'
              disabled={props.isEdit ? false : true}
              value={props.valueInsurance}
              onChange={(e) =>{
                props.setValueInsurance(e.target.value)
              }}
              placeholder={getKeyLang('AmountAlter')}
              className={`form-control form-label-group}`}
            />
            </FeeAntinStyled>
          </CardHeader>
        </Card>
      </div>

    </React.Fragment>
  )

}
export default injectIntl(FeeAntinInsManageView)



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
