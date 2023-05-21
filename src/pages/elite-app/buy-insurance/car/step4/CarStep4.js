import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StepFooter } from '../../StepFooter'
import PaymentStatus from '../../../../../components/elite-app/PaymentStatus'
import AdditionalRecords from './AdditionalRecords'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  actionCompleteCarContract
} from '../../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import ExportInvoice from './ExportInvoice'
import { BaseAppConfigs, FormattedMessage } from 'base-app'
import { IC_TYPES_OPTIONS, INSURANCE_SETTING_DEFAULTS } from '../../../../../configs/elite-app'
import { useHistory } from 'react-router-dom'
import { actionSaveStepData } from '../../../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'

const CarStep4 = () => {

  const [addProfile, setAddProfile] = useState(false)

  const { paymentStatus, stepData, contract } = useSelector(state => state.app.buyInsurance)
  const { authToken } = useSelector(state => state.auth?.guest)
  const history = useHistory()
  const step4Data = useSelector(state => state.app.buyInsurance.stepData[4] || {})
  const dispatch = useDispatch()
  const bhvc = contract.insurances.find(insurance => insurance.insuranceCode === INSURANCE_SETTING_DEFAULTS.CAR_VATCHAT.key)

  const initialValues = {
    uploadRegisterCar: step4Data.uploadRegisterCar || '',
    uploadTemCar: step4Data.uploadTemCar || '',
    uploadChassisNumber: step4Data.uploadChassisNumber || '',
    uploadBeforeMainSeatCar: step4Data.uploadBeforeMainSeatCar || '',
    uploadBeforeSubSeatCar: step4Data.uploadBeforeSubSeatCar || '',
    uploadAfterMainSeatCar: step4Data.uploadAfterMainSeatCar || '',
    uploadAfterSubSeatCar: step4Data.uploadAfterSubSeatCar || '',
    exportInvoiceType: step4Data.exportInvoiceType || 'NONE',
    icNumber: '',
    icType: step4Data.icType || IC_TYPES_OPTIONS[0].value,
    taxCode: '',
    email: step4Data.exportInvoiceType === 'OWNER' ? stepData[1].email : '',
    phoneNumber: step4Data.exportInvoiceType === 'OWNER' ? stepData[1].phoneNumber : '',
    fullName: step4Data.exportInvoiceType === 'OWNER' ? stepData[1].ownerName : '',
    address: step4Data.exportInvoiceType === 'OWNER' ? stepData[1].address : ''
  }

  const validationSchema = Yup.object().shape({
    uploadRegisterCar: bhvc.isEnable ? Yup.string().required() : Yup.mixed().notRequired(),
    uploadTemCar: bhvc.isEnable ? Yup.string().required() : Yup.mixed().notRequired(),
    uploadChassisNumber: bhvc.isEnable ? Yup.string().required() : Yup.mixed().notRequired(),
    uploadBeforeMainSeatCar: Yup.string().required(stepData[1].vehicleType === 'OLD'),
    uploadBeforeSubSeatCar: Yup.string().required(stepData[1].vehicleType === 'OLD'),
    uploadAfterMainSeatCar: Yup.string().required(stepData[1].vehicleType === 'OLD'),
    uploadAfterSubSeatCar: Yup.string().required(stepData[1].vehicleType === 'OLD'),

    email: Yup.string().required(step4Data.exportInvoiceType !== 'NONE' ? 'Required' : ''),
    phoneNumber: Yup.string().required(step4Data.exportInvoiceType !== 'NONE' ? 'Required' : ''),
    fullName: Yup.string()
      .required(step4Data.exportInvoiceType !== 'NONE' ? 'Required' : '')
      .matches(BaseAppConfigs.NAME_REGEX, () => ('Required')),
    icType: Yup.string().when('exportInvoiceType', {
      is: 'OWNER',
      then: Yup.string().required(true)
    }).when('exportInvoiceType', {
      is: 'PERSONAL',
      then: Yup.string().required(true)
    }).when('exportInvoiceType', {
      is: 'NONE',
      then: Yup.string().required(false)
    }),
    icNumber: Yup.string()
      // .required(step4Data.exportInvoiceType === 'OWNER' || step4Data.exportInvoiceType === 'PERSONAL' ? 'Required' : '')
      .when('exportInvoiceType', {
        is: 'OWNER',
        then: Yup.string().required(true)
      }).when('exportInvoiceType', {
        is: 'PERSONAL',
        then: Yup.string().required(true)
      }).when('exportInvoiceType', {
        is: 'NONE' || 'ORGANIZATION',
        then: Yup.string().required(false)
      })
      .when('icType', {
        is: 'CMND',
        then: Yup.string().matches(BaseAppConfigs.PERSONAL_ID_REGEX, () => (
          <FormattedMessage id='completeInformation.nbrPer.invalid' />
        ))
      })
      .when('icType', {
        is: 'CCCD',
        then: Yup.string().matches(BaseAppConfigs.CITIZEN_INDENTIFY_REGEX, () => (
          <FormattedMessage id='completeInformation.nbrPer.invalid' />
        ))
      })
      .when('icType', {
        is: 'HC',
        then: Yup.string().matches(BaseAppConfigs.PASSPORT_REGEX, () => (
          <FormattedMessage id='completeInformation.nbrPer.invalid' />
        ))
      })
  })

  useEffect(() => {
    // const initialData = {
    //   exportInvoiceType: 'NONE'
    // }
    dispatch(actionSaveStepData(4, initialValues))
  }, [])

  const onClickDone = (formik, error) => {
    if (!Object.keys(error).length) {
      dispatch(actionCompleteCarContract(formik.values, true, authToken))
    }
  }

  const onClickBuyNew = (formik, error) => {
    if (!Object.keys(error).length) {
      dispatch(actionCompleteCarContract(formik.values))
    }
  }

  const onChangeExportType = (type) => {
    const newData = { ...step4Data }
    newData.exportInvoiceType = type
    dispatch(actionSaveStepData(4, newData))
  }


  return (
    <Formik initialValues={paymentStatus === 'SUCCESS' ? initialValues : {}} validationSchema={validationSchema}
            enableReinitialize>
      {
        (formik) => (
          // <>
          //   {!addProfile ? <PaymentStatus setAddProfile={() => setAddProfile(!addProfile)} status={paymentStatus} /> : null}
          //
          //   {
          //     addProfile ? (
          //       <>
          //         {paymentStatus === 'SUCCESS' ? (
          //           <>
          //             {
          //               bhvc.isEnable ? (
          //                 <AdditionalRecords formik={formik} />
          //               ) : null
          //             }
          //             <ExportInvoice formik={formik} onChangeExportType={onChangeExportType} />
          //           </>
          //         ) : null}
          //
          //
          //         <StepFooter errors={formik.errors} onClickBackHome={() => history.push('/home')} onClickBuyNew={() => onClickBuyNew(formik)}
          //                     onClickDone={() => onClickDone(formik)}/>
          //       </>
          //     ) : null
          //   }
          //
          // </>

          <>
            {bhvc.isEnable ? (
              <>
                {!addProfile ?
                  <PaymentStatus setAddProfile={() => setAddProfile(!addProfile)} status={paymentStatus} /> : null}
                {(paymentStatus === 'SUCCESS' && addProfile) ? (
                  <>
                    <AdditionalRecords formik={formik} />
                    <ExportInvoice formik={formik} onChangeExportType={onChangeExportType} />
                    <StepFooter errors={formik.errors}
                                onClickBuyNew={() => formik.validateForm().then((error) => onClickBuyNew(formik, error))}
                                onClickDone={() => formik.validateForm().then((error) => onClickDone(formik, error))} />
                  </>
                ) : (
                  <>
                    {paymentStatus !== 'SUCCESS' ? (
                      <>
                        <StepFooter errors={formik.errors}
                                    onClickBuyNew={() => formik.validateForm().then((error) => onClickBuyNew(formik, error))}
                                    onClickDone={() => formik.validateForm().then((error) => onClickDone(formik, error))} />
                      </>
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <>
                <PaymentStatus status={paymentStatus} />
                {paymentStatus === 'SUCCESS' ?
                  <ExportInvoice formik={formik} onChangeExportType={onChangeExportType} /> : null}
                <StepFooter errors={formik.errors}
                            onClickBuyNew={() => formik.validateForm().then((error) => onClickBuyNew(formik, error))}
                            onClickDone={() => formik.validateForm().then((error) => onClickDone(formik, error))} />
              </>
            )}
          </>
        )
      }
    </Formik>
  )
}

export default CarStep4
