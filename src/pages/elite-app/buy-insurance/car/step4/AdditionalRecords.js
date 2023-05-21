import React from 'react'
import { BaseAppConfigs, FormattedMessage, HttpClient } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'
import DropzoneAccept from '../../../../../components/elite-app/DropzoneAccept'
import { useDispatch, useSelector } from 'react-redux'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { BuyInsuranceService } from '../../../../../services/elite-app/buyInsurance'
import '../../../../../assets/scss/elite-app/buy-insurance/car/step4/addition-records.scss'

const AdditionalRecords = ({ formik }) => {

  const { stepData, contract } = useSelector(state => state.app.buyInsurance)
  const dispatch = useDispatch()


  const onUploadFile = async (fieldName, file, url) => {
    const step4Data = stepData[4] || {}
    const formData = new FormData()
    formData.append(
      'fileInfo',
      new Blob([JSON.stringify({ 'contractId': contract.id, 'docType': fieldName })], {
        type: 'application/json'
      })
    )

    formData.append('file', file)
    const res = await BuyInsuranceService.uploadFile(formData)
    if (res.status !== 200 && !res.data) {
      return
    }
    step4Data[fieldName] = HttpClient.defaults.baseURL + BaseAppConfigs.API_GET_FILE + '?fileCode=' + res.data.code
    dispatch(actionSaveStepData(4, { ...step4Data }))
  }


  return (
    <div className='additional-records'>
      <div className='additional-records-title mb-4'>
        <FormattedMessage id={getKeyLang(`insurance.additionalRecords`)} />
      </div>
      <div className="profile-photo mb-3">
        <FormattedMessage id={getKeyLang("contractManagement.profilePhoto")} />
      </div>
      <>
        <DropzoneAccept formik={formik} fieldName='uploadRegisterCar'
                        title={getKeyLang(`insurance.additionalRecords.1`)}
                        uploadFile={onUploadFile} />

        <DropzoneAccept formik={formik}
                        fieldName='uploadTemCar'
                        title={getKeyLang(`insurance.additionalRecords.2`)}
                        uploadFile={onUploadFile} />

        <DropzoneAccept formik={formik} fieldName='uploadChassisNumber'
                        title={getKeyLang(`insurance.additionalRecords.3`)}
                        uploadFile={onUploadFile} />
        {
          stepData[1]?.vehicleStatus === 'OLD' ?
            (<React.Fragment>
              <DropzoneAccept formik={formik} fieldName='uploadBeforeMainSeatCar'
                              title={getKeyLang(`insurance.additionalRecords.4`)}
                              uploadFile={onUploadFile} />

              <DropzoneAccept formik={formik} fieldName='uploadBeforeSubSeatCar'
                              title={getKeyLang(`insurance.additionalRecords.5`)}
                              uploadFile={onUploadFile} />

              <DropzoneAccept formik={formik} fieldName='uploadAfterMainSeatCar'
                              title={getKeyLang(`insurance.additionalRecords.6`)}
                              uploadFile={onUploadFile} />

              <DropzoneAccept formik={formik} fieldName='uploadAfterSubSeatCar'
                              title={getKeyLang(`insurance.additionalRecords.7`)}
                              uploadFile={onUploadFile} />
            </React.Fragment>) : null

        }
      </>
    </div>
  )
}

export default AdditionalRecords
