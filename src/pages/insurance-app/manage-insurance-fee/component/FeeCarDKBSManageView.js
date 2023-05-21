import React, {  useState } from 'react'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import {
  Collapse,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Input,
  Table,
  CustomInput,
  FormGroup,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import {
  FormattedMessage,
  AppId,
  Button,
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
import InputForm from '../../../../components/insurance-app/buy-insurance-car/form/InputFormNoTitle';
// https://codesandbox.io/s/1f93h?file=/demo.js:2069-2571
import EditInputComponent from './EditInputComponent'
import CurrencyInput from '../../../../components/insurance-app/input/CurrencyInput'

const FeeCarDKBSManageView = (props) => {
  const feeInsuranceReducer = useSelector((state) => state.app.feeInsuranceReducer)
  const formik = props.formik
  const [listAprro, setListAprro] = useState([])
  const [editable, setEditable] = useState(props.editable)
  const [role, setRole] = useState(props.role)

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const intl = useIntl()
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

  const handlerSearch = () => {
    dispatch({
      type: "ACTION_FEE_SEARCH_CAR_DKBS",
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


  const columns = [

    {
      dataField: 'name',
      text: 'Loại điều khoản bổ sung',
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
      dataField: 'usageTime',
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: '25%',
        textAlign: 'left'
      },
      text: "Thời gian sử dung",
      // filter: textFilter({ placeholder: '' }),
      headerAlign: 'center',
      headerClasses: "header-class",
    },
    {
      dataField: 'worthDesc',
      editable: (cell, row, rowIndex, colIndex) => {
        return false
      },
      style: {
        width: '25%',
        textAlign: 'left'
      },
      text: "Giá trị xe",
      // filter: textFilter({ placeholder: '' }),
      headerAlign: 'center',
      headerClasses: "header-class",
    },
    {
      dataField: 'fee',
      style: {
        width: '25%',
        textAlign: 'right'
      },
      text: 'Tỷ lệ phí',
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
          data={typeof (feeInsuranceReducer.feeCar.carFeeAddons) !== 'undefined' ? feeInsuranceReducer.feeCar.carFeeAddons : []}
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
        {typeof (feeInsuranceReducer.feeCar.carFeeAddons) !== 'undefined' ?
          <Table bordered responsive>

            <tbody>
              {
                feeInsuranceReducer.feeCar.carFeeAddons.map((item, i) => (

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
              <FormattedMessage id={`${AppId.INSURANCE_APP}.FeeDKBS`} />
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
                          id: `${AppId.INSURANCE_APP}.DKBS`,
                        })}
                        onChange={e => {
                          setInputSearch(e.target.value)
                          if (e.target.value === '') {
                            dispatch({
                              type: "ACTION_FEE_SEARCH_CAR_DKBS",
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
              {role === 'VIEW' ? renderTableApprove() : renderTable()}


              <Row>
                <Col md="6" sm="12" className="margin-top-14">
                  <label><FormattedMessage id={`${AppId.INSURANCE_APP}.DuctionLevel`} />
                  </label>
                </Col>
                <Col md="6" sm="12" className="margin-top-14">
                  {/* <InputForm formik={formik} fieldName="deductionLevel" msgField={`${AppId.INSURANCE_APP}.DuctionLevel`}
                      onChange={e => {
                        formik.setFieldValue('deductionLevel', Utils.removeChar(e.target.value));
                      }} /> */}
                  <CurrencyInput id="deductionLevel"
                    className={`form-control form-label-group ${formik.touched.deductionLevel && formik.errors.deductionLevel && "is-invalid"}`}
                    placeholder={`${AppId.INSURANCE_APP}.DuctionLevel`}
                    type="text"
                    value={formik.values[`deductionLevel`]}
                    onChange={e => {
                      formik.setFieldValue('deductionLevel', e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    disabled={!editable}
                  />

                </Col>
              </Row>
              {role === 'SYSTEM' || role === 'VIEW' ?
                <Row>
                  <Col md="6" sm="12" className="margin-top-14">
                    <label><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeIncre`} /></label>
                  </Col>
                  <Col md="6" sm="12" className="margin-top-14">
                    <Table className="custom-padding-table margin-bottom-14" responsive>
                      <tbody>
                        <tr>
                          <td className="text-primary-highlight letter-uppercase"> <FormattedMessage id={`${AppId.INSURANCE_APP}.Minimum`} />
                          </td>
                          <td align="left">
                            <InputForm formik={formik} fieldName="baseFeeIncreaseMin" msgField={`${AppId.INSURANCE_APP}.Minimum`}
                              disabled={!editable}
                              onChange={e => {
                                if (Utils.floatFomat(e.target.value) <= 5 && Utils.floatFomat(e.target.value) >= 0)
                                  formik.setFieldValue('baseFeeIncreaseMin', Utils.floatFomat(e.target.value));
                                // if (e.target.value === "")
                                //   formik.setFieldValue('baseFeeIncreaseMin', 0);
                              }} />
                          </td>
                        </tr>
                        <tr>

                          <td className="text-primary-highlight letter-uppercase">
                            <FormattedMessage id={`${AppId.INSURANCE_APP}.Maximum`} />
                          </td>
                          <td align="left">
                            <InputForm formik={formik} fieldName="baseFeeIncreaseMax" msgField={`${AppId.INSURANCE_APP}.Maximum`}
                              disabled={!editable}
                              onChange={e => {
                                if (Utils.floatFomat(e.target.value) <= 5 && Utils.floatFomat(e.target.value) >= 0)
                                  formik.setFieldValue('baseFeeIncreaseMax', Utils.floatFomat(e.target.value));
                                // if (e.target.value === "")
                                //   formik.setFieldValue('baseFeeIncreaseMax', 0);
                              }} />
                          </td>
                        </tr>

                      </tbody>
                    </Table>
                  </Col>
                  <Col md="6" sm="12" className="margin-top-14">
                    <label><FormattedMessage id={`${AppId.INSURANCE_APP}.FeeMinimum`} /></label>
                  </Col>
                  <Col md="6" sm="12" className="margin-top-14">
                    {/* <InputForm formik={formik} fieldName="minimumFee" msgField={`${AppId.INSURANCE_APP}.MinimumFee`}
                      onChange={e => {
                        formik.setFieldValue('minimumFee', Utils.removeChar(e.target.value));
                      }} /> */}
                    <CurrencyInput id="minimumFee"
                      className={`form-control form-label-group ${formik.touched.minimumFee && formik.errors.minimumFee && "is-invalid"}`}
                      placeholder={`${AppId.INSURANCE_APP}.MinimumFee`}
                      type="text"
                      value={formik.values[`minimumFee`]}
                      onChange={e => {
                        formik.setFieldValue('minimumFee', e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      disabled={!editable}
                    />

                  </Col>
                </Row>
                : null}

              {role === 'SYSTEM' || role === 'VIEW' || role === 'NONRESIDENT' ?
                <Row>
                  <Col md="6" sm="12" className="margin-top-14">
                    <label><FormattedMessage id={`${AppId.INSURANCE_APP}.DebtFile`} /></label>
                  </Col>
                  <Col md="6" sm="12" className="margin-top-14">
                    <CustomInput
                      checked={formik.values["debtFile"]}
                      onClick={() => {
                        console.log("click")
                        let check = !formik.values["debtFile"]
                        formik.setFieldValue("debtFile", check)

                      }}
                      id="debtFile"
                      className="custom-switch-primary"
                      type="switch"
                      name="success"
                      inline
                      disabled={!editable}
                    ></CustomInput>
                  </Col>
                </Row>
                : null}


            </CardBody>
          </Collapse>

        </Card>
      </div>

    </React.Fragment>
  )

}
export default FeeCarDKBSManageView
