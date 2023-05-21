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
import { intlConvertToVnd } from '../../../../ultity'

// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-celledit.html
// npm install react-bootstrap-table2-editor --save
//npm install react-bootstrap-table-next --save
// npm install react-bootstrap-table2-filter --save
const FeeAntinStyled = styled.div`
.form-control {
    /* border: 1px solid #d9d9d9; */
    color: #474747;
    width: 100px;
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
const FeeTravelWordwideInsManageView = (props) => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("Closed")
  const toggleCollapse = () => {
    setShow(!show)
  }
 
  return (
    <React.Fragment>
      <div className="vx-collapse collapse-bordered">
        {
          props.feeRate.map((_elt , index) => (
          <Card
          key={index}

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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeInsTravelWordwide`} />
            </CardTitle>
            <FeeAntinStyled>
              <span className='font-weight-bold'>{intlConvertToVnd(Number( _elt?.value), intl)} VNĐ</span> 
            {/* <CurrencyInput
              id='input__value'
              disabled={true}
              value={_elt?.value}
              onChange={(e) =>{
                const _feeRate = [...props.feeRate]
                _feeRate[index].value = e.target.value
                props.setFeeRate(_feeRate)
              }}
              placeholder={getKeyLang('AmountAlter')}
              className={`form-control form-label-group}`}
            /> */}
            </FeeAntinStyled>
          </CardHeader>
        </Card>
          ))
        }
        
      </div>

    </React.Fragment>
  )

}
export default injectIntl(FeeTravelWordwideInsManageView)
