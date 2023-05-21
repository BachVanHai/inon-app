import React, { useEffect, useState } from 'react'
import { BaseAppUltils, Button, FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../configs/elite-app'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { BuyInsuranceService } from '../../../services/elite-app/buyInsurance'
import { actionSaveStepData } from '../../../redux/actions/elite-app/buy-insurance/BuyInsuranceStep'
import { useHistory } from 'react-router-dom'
import ModalImage from 'react-modal-image'
import uploadFile from '../../../assets/images/elite-app/buy-insurance/upload-file-icon.svg'
import '../../../assets/scss/elite-app/buy-insurance/upload-file-ocr.scss'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

const CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

const MIN_RATE_OCR = 0.0

const UploadFileOCR = ({
                         values,
                         stepData,
                         type,
                         carManufacturers,
                         setBrandOptions,
                         setUploadVehicleOrNot,
                         setUploadIdentifyOrNot,
                         typeInsurance , 
                         formik
                       }) => {

  const { authToken } = useSelector(state => state.auth?.guest)
  const { activeStep } = useSelector((state) => state.app.buyInsurance)
  const dispatch = useDispatch()
  const history = useHistory()
  const [modal, setModal] = useState(false)
  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)
  const [modalImage, setModalImage] = useState(null)
  const [uuid, setUuid] = useState()

  const toggle = () => {
    setModal(!modal)
  }

  let btnText
  switch (type) {
    case 'vehicleRegistrationFile':
      btnText = <FormattedMessage id={getKeyLang('insurance.uploadVehicleRegistration')} />
      break
    case 'vehicleInspectionFile':
      btnText = <FormattedMessage id={getKeyLang('insurance.uploadVehicleInspection')} />
      break
    case 'identificationFile':
      btnText = <FormattedMessage id={getKeyLang('insurance.uploadIdentification')} />
      break
    default:
      break
  }

  useEffect(() => {
    setUuid(uuidv4())

    if (file) {
      if (type === 'vehicleRegistrationFile') {
        const formData = new FormData()
        formData.append('img', file)
        BuyInsuranceService.uploadVehicleRegistrationFileOCR(formData, CONFIG).then(res => {
          if (res?.status === 200 && res.data.errorCode === '0') {
            const info = res.data.data.info
            let check = false
            let options
            if (info.brand && carManufacturers) {
              values.manufacturerName = info.brand.toUpperCase()
              const carManufacturer = carManufacturers.find(item => item.name.includes(values.manufacturerName)) || {}
              options = (carManufacturer.brands || []).map(item => ({ label: item.brand, value: item.brand }))
              if (options) {
                setBrandOptions(options)
              }
              check = true
            }
            if (info.name && info['name_confidence'] > MIN_RATE_OCR) {
              values.ownerName = info.name
              check = true
            }
            if (info.plate && info['plate_confidence'] > MIN_RATE_OCR) {
              values.numberPlate = info.plate
              check = true
            }
            if (info.chassis && info['chassis_confidence'] > MIN_RATE_OCR) {
              values.frameNo = info.chassis
              check = true
            }
            if (info.engine && info['engine_confidence'] > MIN_RATE_OCR) {
              values.machineNo = info.engine
              check = true
            }
            if (info.model && options) {
              const model = options.find(item => item.label.search(info.model) >= 0 || info.model.search(item.label) >= 0)
              if (model) {
                values.brandName = model.label
                check = true
              }
            }
            if (info['year_of_manufacture'] && info['manufactured_year_confidence'] > MIN_RATE_OCR) {
              values.issDate = info['year_of_manufacture']
            }
            if (check) {
              dispatch(actionSaveStepData(1, values))
              setUploadVehicleOrNot()
            } else {
              BaseAppUltils.toastError(<FormattedMessage id={getKeyLang('uploadFileOCR.imageNotValid')} />)
            }
          } else {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang('uploadFileOCR.imageNotValid')} />)
          }
        })
      } else if (type === 'vehicleInspectionFile') {
        const formData = new FormData()
        formData.append('img', file)
        BuyInsuranceService.uploadVehicleInspectionFileOCR(formData, CONFIG).then(res => {
          if (res.status === 200 && res.data.errorCode === '0') {
            let check = false
            let options
            const info = res.data.data.info
            if (info['registration_number'] && info['registration_number_confidence'] > MIN_RATE_OCR) {
              values.numberPlate = info['registration_number']
              check = true
            }
            if (info.mark && info['mark_confidence'] > MIN_RATE_OCR && carManufacturers) {
              values.manufacturerName = info.mark
              const carManufacturer = carManufacturers.find(item => item.name === values.manufacturerName) || {}
              options = (carManufacturer.brands || []).map(item => ({ label: item.brand, value: item.brand }))
              if (options) {
                setBrandOptions(options)
              }
              check = true
            }
            if (info['model_code'] && info['model_code_confidence'] > MIN_RATE_OCR) {
              const model = options.find(item => item.label.includes(info['model_code']))
              if (model) {
                values.brandName = model.label
                check = true
              }
            }
            if (info['engine_number'] && info['engine_number_confidence'] > MIN_RATE_OCR) {
              values.machineNo = info['engine_number']
              check = true
            }
            if (info['chassis_number'] > MIN_RATE_OCR) {
              values.frameNo = info['chassis_number']
              check = true
            }

            if (info['manufactured_year'] && info['manufactured_year_confidence'] > MIN_RATE_OCR) {
              values.issDate = info['manufactured_year']
            }

            if (info['permissible_no'] && info['permissible_no_confidence'] > MIN_RATE_OCR) {
              values.seats = info['permissible_no'].split(',').reduce((total, item) => total += Number(item.split(' ')[0]), 0)
            }

            if (check) {
              dispatch(actionSaveStepData(1, values))
              setUploadVehicleOrNot()
            } else {
              BaseAppUltils.toastError(<FormattedMessage id={getKeyLang('uploadFileOCR.imageNotValid')} />)
            }
          } else {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang('uploadFileOCR.imageNotValid')} />)
          }
        })
      } else if (type === 'identificationFile') {
        const formData = new FormData()
        formData.append('img', file)
        BuyInsuranceService.uploadIdentificationFileOCR(formData, CONFIG).then(res => {
          if (res?.status === 200 && res.data.errorCode === '0') {
            let check = false
            const info = res.data.data.info
            if (info.name && info['name_confidence'] > MIN_RATE_OCR) {
              values.ownerName = info.name
              values.fullName = info.name
              check = true
            }
            if (info['address_confidence'] > MIN_RATE_OCR && info.address) {
              values.address = info.address
              check = true
            }
            if (info.id > MIN_RATE_OCR) {
              values.icNo = info.id
              check = true
            }
            if (check) {
              if (stepData) {
                const index = stepData.moreInsured.findIndex(i => i.id === values.id)
                stepData.moreInsured[index] = { ...values }
                dispatch(actionSaveStepData(activeStep, stepData))
              } else if(typeInsurance === 'bc') {
                values.detail = info.address
                const index = formik.addtinalPeople.findIndex(i => i.id === formik.id)
                formik.addtinalPeople[index] = { ...values , fullname : info.name , addtinalPeople : undefined , bank : 'TPBANK' , dateOfBirth : info.dob.split("/").reverse().join("-")}
              }  else {
                dispatch(actionSaveStepData(activeStep, values))
              }

              setUploadIdentifyOrNot()
            } else {
              BaseAppUltils.toastError(<FormattedMessage id={getKeyLang('uploadFileOCR.imageNotValid')} />)
            }
          } else {
            BaseAppUltils.toastError(<FormattedMessage id={getKeyLang('uploadFileOCR.imageNotValid')} />)
          }
        })
      }
      setModalImage('modal-image img-thumbnail')
    } else {
      setModalImage('')
    }
  }, [file])

  const checkLoginRequired = (e) => {
    if (!authToken) {
      e.preventDefault()
      setModal(true)
    }
  }

  const onChangeFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
      setFileUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  return <>
    <div className='d-flex upload-file-ocr'>
      <div className='file-upload-type'>
        {
          file ? <div className='modal-image-container flex-grow-1'>
            <ModalImage
              className={modalImage}
              small={fileUrl}
              large={fileUrl}
            />
          </div> : null
        }
      </div>

      <div className='upload-file-icon' onClick={() => document.getElementById(uuid).click()}>
        <img src={uploadFile} className="mb-1" alt='Upload file icon' />
        <input
          id={uuid}
          className='d-none'
          type='file'
          name={`file${values.id}`}
          onChange={e => onChangeFile(e)}
          onClick={e => checkLoginRequired(e)}
          accept='image/*'
        />
        {btnText}
      </div>
    </div>
    <Modal isOpen={modal} toggle={toggle} className='modal-dialog-centered'>
      <ModalHeader toggle={toggle}>
        <FormattedMessage id={getKeyLang('insurance.loginRequired')} />
      </ModalHeader>
      <ModalBody>
        <FormattedMessage id={getKeyLang('insurance.loginRequiredContent')} />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={() => {
          history.push('/login')
          toggle()
        }}><FormattedMessage
          id={getKeyLang('insurance.step.login')} /></Button>
        <Button color='secondary' onClick={toggle}>
          <FormattedMessage id={getKeyLang('insurance.pendingContract.cancel')} />
        </Button>
      </ModalFooter>
    </Modal>
  </>
}

export default UploadFileOCR
