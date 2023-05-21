import {
  BaseAppUltils,
  Button,
  FormattedMessage,
  goBackHomePage,
  showConfirmAlert
} from 'base-app'
import moment from 'moment'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'reactstrap'
import { getKeyLang } from '../../../../configs/supplement-app'
import AccountProductsService from '../../../../services/supplement-app/accoutProducts'
import { isArrayEmpty } from '../../../../ultity'
import ButtonActionData from '../components/ButtonActionData'
import TableData from '../components/TableData'
import { checkFormatFile, checkIstemplateExel, handleReadFileExel } from '../utility'
const ImportAcountProduct = () => {
  const history = useHistory()
  const intl = useIntl()
  const [dataImport, setDataImport] = useState([])
  const dispatch = useDispatch()
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
  const handleUploadFile = async (file) => {
    if (checkFormatFile(file, 'xlsx')) {
      const promise = new Promise((resolve, reject) => {
        handleReadFileExel(file, resolve, reject)
      })
      promise.then((d) => {
        const data = d.map((_elt) => {
          const dateConvert = moment(_elt.cifFccOpenDate).add(1, 'm')
          return {
            ..._elt,
            cifFccOpenDate: dateConvert.utc(true).toISOString()
          }
        })
        setDataImport(data)
      })
      return
    } else {
      BaseAppUltils.toastError(
        'Định dạng không được chấp nhận. Vui lòng chọn định dạng khác'
      )
      return
    }
  }
  const handleImportData = async () => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={getKeyLang('accountProduct.confirm')} />,
        isShow: true,
        content: (
          <FormattedMessage id={getKeyLang('accountProduct.import.confirm')} />
        ),
        onConfirm: async () => {
          const res = await AccountProductsService.addAccount(dataImport)
          if (res.status === 200) {
            BaseAppUltils.toastSuccess(
              intl.formatMessage({
                id: getKeyLang('accountProduct.importSuccess')
              })
            )
            history.push('/supplement/account-product/management')
            setDataImport([])
          } else {
            setDataImport([])
          }
        }
      })
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-uppercase'>
          <FormattedMessage id={getKeyLang('importAccountProducts')} />
        </CardTitle>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            {dataImport.length > 0 ? (
              <Button
                color='primary'
                onClick={handleImportData}
                className='mr-1'
              >
                Nhập dữ liệu
              </Button>
            ) : (
              <ButtonActionData handleFunc={handleUploadFile} />
            )}
            {!isArrayEmpty(dataImport) ? (
              <ButtonActionData handleFunc={handleUploadFile} />
            ) : null}
          </div>
          <div></div>
        </div>
      </CardHeader>
      <CardBody>
        <TableData data={dataImport} />
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

export default ImportAcountProduct
