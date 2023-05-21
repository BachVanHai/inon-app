import React from 'react'
import { BaseAppUltils, Button } from 'base-app'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardBody, CardFooter } from 'reactstrap'
import '../../../../../../assets/scss/insurance-app/buy-insurance-multiple/buy-insurance-multiple.scss'
import StepBase from '../../../../../../components/insurance-app/buy-insurances-page/step/StepBase'
import { API_DOWNLOAD_FILE_TEMPLATE } from '../../../../../../configs/insurance-app'
import {
  nextStep,
  updateProps
} from '../../../../../../redux/actions/insurance-app/buyInsuranceMultiple'
import {
  KET_CONTRACT_GROUP_ID,
  KEY_ACTIVE_STEP,
  KEY_COMPANY_ID,
  KEY_COMPANY_NAME,
  KEY_DATA_FEES,
  KEY_DATA_IMPORT,
  KEY_STEP_1,
  KEY_TOTAL_FEE,
  MAX_STEP
} from '../../../../../../redux/reducers/insurance-app/buyInsuranceHomeMultiple'
import { buyInsurancePersonHomeMultipleService } from '../../../../../../services/insurance-app/buyInsurancePersonHomeMultiple'
import { isArrayEmpty } from '../../../../../../ultity'
import ButtonActionData from './components/ButtonActionData'
import { checkFormatFile } from '../../../utility'
import FooterView from '../../views/FooterView'
import { getStepComponent, REDUX_STATE_NAME } from '../stepsManager'
import TableData from './tableData/TableData'

const Step1 = () => {
  const dispatch = useDispatch()
  const { [KEY_ACTIVE_STEP]: activeStep, [KEY_DATA_IMPORT]: dataAvailable } =
    useSelector((state) => state['app'][REDUX_STATE_NAME])
  const [dataImport, setDataImport] = useState(dataAvailable)
  function getSum(total, num) {
    return total + Math.round(num)
  }
  const next = async (values) => {
    if (isArrayEmpty(dataImport)) {
      BaseAppUltils.toastError('Vui lòng nhập dữ liệu')
    } else {
      const res = await buyInsurancePersonHomeMultipleService.createCOntract(
        dataImport
      )
      const totalFee = res.data.map((_elt) => {
        return _elt?.feeInsurance?.feeInsurance
      })
      const feeInsurance = res.data.map((_elt) => {
        return _elt?.feeInsurance?.feeMaterial
      })
      const vatFee = res.data.map((_elt) => {
        return _elt?.contract?.totalFeeInclVAT === null
          ? 0
          : _elt?.contract?.totalFeeInclVAT
      })
      const feeVOUCHERPayFee = res.data.map((_elt) => {
        return _elt?.feeInsurance?.VOUCHERPayFee
      })
      const _totalFee = totalFee.reduce(getSum, 0)
      const _feeInsurance = feeInsurance.reduce(getSum, 0)
      const _feeVOUCHERPayFee = feeVOUCHERPayFee.reduce(getSum, 0)
      const _vatFee = vatFee.reduce(getSum, 0)
      const objFee = {
        feeInsurance: _feeInsurance,
        feeVAT: _vatFee,
        promotionDiscount: _feeVOUCHERPayFee
      }
      if (res.status === 200) {
        await buyInsurancePersonHomeMultipleService.updatePaymentType({
          contractGroupId: res?.data[0]?.contract?.contractGroupId,
          paymentType: 'ATM'
        })
        dispatch(
          updateProps([
            {
              prop: KEY_STEP_1,
              value: res.data
            },
            {
              prop: KEY_DATA_FEES,
              value: objFee
            },
            {
              prop: KEY_TOTAL_FEE,
              value: _totalFee
            },
            {
              prop: KEY_COMPANY_NAME,
              value: res?.data[0]?.feeInsurance?.companyFullName
            },
            {
              prop: KEY_COMPANY_ID,
              value: res?.data[0]?.feeInsurance?.companyId
            },
            {
              prop: KET_CONTRACT_GROUP_ID,
              value: res?.data[0]?.contract?.contractGroupId
            }
          ])
        )
        dispatch(nextStep(activeStep))
      }
    }
  }
  const handleImportData = async (file) => {
    if (checkFormatFile(file, 'xlsx')) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await buyInsurancePersonHomeMultipleService.readFileExel(
        formData
      )
      if (res.status === 200) {
        dispatch(updateProps([{ prop: KEY_DATA_IMPORT, value: res.data }]))
        setDataImport(res.data)
      }
    } else {
      BaseAppUltils.toastError('Định dạng không được chấp nhận !')
    }
  }
  const handleSaveFileTemplate = async () => {
    window.open(API_DOWNLOAD_FILE_TEMPLATE)
  }

  return (
    <StepBase titleMsg={getStepComponent(activeStep).title}>
      <CardBody>
        <div>
          <Button
            color='primary'
            className='mr-1'
            outline
            onClick={handleSaveFileTemplate}
          >
            Sử dụng mẫu
          </Button>
          <ButtonActionData handleFunc={handleImportData} />
        </div>
        <div className='mt-2 buy-insurance-personal-home'>
          <TableData data={dataImport} />
        </div>
      </CardBody>
      <CardFooter>
        <FooterView
          handleSubmitClick={next}
          constantVals={{
            MAX_STEP: MAX_STEP,
            REDUX_STATE_NAME: REDUX_STATE_NAME
          }}
        />
      </CardFooter>
    </StepBase>
  )
}

export default Step1
