import {
  Button,
  DatePicker,
  FormattedMessage,
  goBackHomePage,
  Select,
  showConfirmAlert
} from 'base-app'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row
} from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/supplement-app'
import {
  actionGetListAccountProducts,
  actionSearchListAccountProducts,
  getPartners
} from '../../../../redux/actions/supplement-app/acountProducts'
import { isArrayEmpty } from '../../../../ultity'
import TableData from '../components/TableData'
import PopupExportData from './PopupExportData'
const DatePickerStyled = styled(DatePicker)`
  label {
    display: none;
  }
`
const ManagementAccountProduct = () => {
  const history = useHistory()
  const { availableAccountProducts, accountProducts, availablePartners } =
    useSelector((state) => state.app.accountProducts)
  const dispatch = useDispatch()
  const [partnerSelect, setPartnerSelect] = useState('')
  const [startDate, setStartDate] = useState(
    moment().subtract(14, 'd').format('DD-MM-YYYY')
  )
  const [endDate, setEndDate] = useState(moment().format('DD-MM-YYYY'))
  const [toDate, setToDate] = useState(moment().toISOString())
  const [isOpenModalExport, setIsOpenModalExport] = useState(false)
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
  const toggleFunc = () => {
    setIsOpenModalExport(!isOpenModalExport)
  }
  const onChangeDateSearch = async ([start, end]) => {
    const startTime = moment(start).format('YYYY-MM-DD 00:00:00')
    const endTime = moment(end).format('YYYY-MM-DD 23:59:59')
    setStartDate(start)
    setEndDate(end)
    setToDate(endTime)
    const startDate = moment(startTime).utc(true).toISOString()
    const endDate = moment(endTime).utc(true).toISOString()
    dispatch(actionGetListAccountProducts(startDate, endDate))
  }
  const handleSearchPartners = (partners) => {
    const dataFilter = !isArrayEmpty(partners)
      ? accountProducts.filter((preElt) => {
          const str = partners.map((elt) => elt.userCode).join()
          const reg = new RegExp('(' + str.replace(/\s*,\s*/g, '|') + ')')
          const ebankPresenterCodeCovert = preElt.ebankPresenterCode.substr(
            preElt.ebankPresenterCode.length - 6
          )
          if (
            ebankPresenterCodeCovert &&
            ebankPresenterCodeCovert.replace(/,/g, '').search(reg) > -1
          ) {
            return true
          }
          return false
        })
      : accountProducts
    const partnerSelect = !isArrayEmpty(partners)
      ? partners
          .map((_elt) => {
            return _elt.value
          })
          .join(',')
      : []
    setPartnerSelect(partnerSelect)
    dispatch(actionSearchListAccountProducts(dataFilter))
  }
  useEffect(() => {
    const startTime = moment().subtract(14, 'd').format('YYYY-MM-DD 00:00:00')
    const endTime = moment().format('YYYY-MM-DD 23:59:59')
    const startDate = moment(startTime).toISOString()
    const endDate = moment(endTime).toISOString()
    dispatch(actionGetListAccountProducts(startDate, endDate))
    dispatch(getPartners())
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id={getKeyLang('managementAccountProducts')} />
        </CardTitle>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <Button
              color='primary'
              onClick={toggleFunc}
              disabled={availableAccountProducts.length === 0}
            >
              Xuất báo cáo
            </Button>
          </div>
        </div>
        {/* filter account  */}
      </CardHeader>
      <CardBody>
        <Row className='d-flex justify-content-between'>
          <Col md={6} xs={12}>
            <DatePickerStyled
              placeholder={
                <FormattedMessage id={getKeyLang(`accountProduct.search`)} />
              }
              value={[startDate, endDate]}
              onChange={onChangeDateSearch}
              options={{
                enableTime: false,
                mode: 'range',
                dateFormat: 'd-m-Y'
              }}
            />
          </Col>
          <Col md={6} xs={12}>
            <Select
              isMulti
              placeholder={'Tìm kiếm đối tác'}
              value={partnerSelect}
              onChange={(originals) => handleSearchPartners(originals)}
              options={availablePartners}
            />
          </Col>
        </Row>
        <div className='mb-1'>
          <span className='font-weight-bold'>
            <FormattedMessage id={getKeyLang('accountProducts.total')} />{' '}
            {availableAccountProducts.length}
          </span>
        </div>
        <TableData data={availableAccountProducts} />
        <PopupExportData
          isOpen={isOpenModalExport}
          toggle={toggleFunc}
          fromDate={startDate}
          toDate={toDate}
          data={availableAccountProducts}
        />
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

export default ManagementAccountProduct
