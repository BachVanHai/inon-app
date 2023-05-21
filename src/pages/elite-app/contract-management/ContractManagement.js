import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'base-app'
import Carousel from 'react-multi-carousel'
import carIcon from '../../../assets/images/elite-app/contract-management/car-icon.svg'
import motorIcon from '../../../assets/images/elite-app/contract-management/motor-icon.png'
import homeInsuranceIcon from '../../../assets/images/elite-app/home/products/homeinsuranceicon.png'
import personalIcon from '../../../assets/images/elite-app/home/products/personal-icon.png'
import '../../../assets/scss/elite-app/contract-management/contract-management.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {
  loadContracts
} from '../../../redux/actions/elite-app/contract-management/ContractManagement'
import { getKeyLang } from '../../../configs/elite-app'
import DetailContract from './detail-contract/DetailContract'
import { BuyInsuranceService } from '../../../services/elite-app/buyInsurance'
import contractIcon from '../../../assets/images/elite-app/contract-management/contract-icon.png'
import cardBgValid from '../../../assets/images/elite-app/contract-management/card-bg-valid.png'
import cardBgInvalid from '../../../assets/images/elite-app/contract-management/card-bg-invalid.png'
import logoCompany from '../../../assets/images/elite-app/contract-management/inon-icon.svg'
import bshLogo from '../../../assets/images/elite-app/contract-management/BSHLogo.svg'
import vniLogo from '../../../assets/images/elite-app/buy-insurance/logo-vni.svg'
import xtiLogo from '../../../assets/images/elite-app/buy-insurance/logo-xti.svg'
import vbiLogo from '../../../assets/images/elite-app/buy-insurance/logo-vbi.svg'
import ptiLogo from '../../../assets/images/elite-app/home/products/pti-icon.svg'
import { Document, Page, pdfjs } from 'react-pdf'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Navs from '../../../components/elite-app/layouts/Navs'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const ContractManagement = () => {
  const CC = 'CC'
  const MC = 'MC'
  const VTA = 'VTA'
  const HC = 'HC'
  const PHC = 'PHC'

  // Reponsive Carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  const [activeIndex, setActiveIndex] = useState(0)

  const [numPages, setNumPages] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [modalCert, setModalCert] = useState(false)

  const { contracts } = useSelector(
    (state) => state.app.contractManagement
  )

  const dispatch = useDispatch()

  const INSURANCE_LOGO = {
    '01': bshLogo,
    '02': vbiLogo,
    '03': vniLogo,
    '04': xtiLogo,
    '05': ptiLogo
  }

  useEffect(() => {
    dispatch(loadContracts())
  }, [])

  const getContractType = (type) => {
    switch (type) {
      case CC:
        return carIcon
      case MC:
        return motorIcon
      case VTA:
        return personalIcon
      case HC:
        return personalIcon
      case PHC:
        return homeInsuranceIcon
      default:
        return carIcon
    }
  }

  const getStyleByDurationOfContract = (contract) => {
    const insurances = contract?.insurances
    if (insurances === undefined || insurances.length === 0) {
      return [cardBgInvalid, 'dark-green']
    }
    for (let item of insurances) {
      if (contract.contractType === 'PHC') {
        if (Date.parse(item?.endDate) >= new Date()) return [cardBgValid, 'green']
      } else {
        if (Date.parse(item?.endValueDate) >= new Date()) return [cardBgValid, 'green']
      }
    }
    return [cardBgInvalid, 'dark-green']
  }

  const onChangeCurrentContract = (previousSlide, _ref) => {
    setActiveIndex(_ref.currentSlide)
    return _ref.onMove
  }

  const toggleCertModal = () => setModalCert(prevState => !prevState)

  const getPrintedMatters = async () => {
    const contractId = contracts[activeIndex].id
    const contractCode = contracts[activeIndex].contractCode
    const file = await BuyInsuranceService.getPrintedMatters(contractId, contractCode)
    setPdfFile(file)
    setModalCert(true)
  }

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages)

  return (
    <>
      <Navs />
      <div className='contract-management-container'>
        {contracts.length > 0 ? (
          <div className='contract-management-content mx-auto'>

            <div className='position-relative pb-3 carousel-container'>
              <Carousel className='carousel-multi-item mx-auto' responsive={responsive} showDots renderDotsOutside
                        afterChange={(previousSlide, _ref) => onChangeCurrentContract(previousSlide, _ref)}
                        renderButtonGroupOutside={false}
                        dotListClass='custom-dot-list-style'>
                {
                  contracts.map(item => (
                    <div className='image-item'>
                      <div className='position-relative brand-logo-div'>
                        <img className='brand-logo-background' src={getStyleByDurationOfContract(item)[0]}
                             alt='Brand Logo Background' />
                        <img className='position-absolute logo-company' src={logoCompany} alt='Logo Company' />
                        <img className='position-absolute vehicle-icon' src={getContractType(item.contractType)}
                             alt='Contract Type' />
                        <img className='position-absolute insurance-logo' src={INSURANCE_LOGO[item?.companyId]}
                             alt='Insurance Log' />
                        {item.vehicles ? <div
                            className={'position-absolute number-plate font-weight-bold ' + getStyleByDurationOfContract(item)[1]}>{item?.vehicles[0]?.numberPlate}</div> :
                          <div className='position-absolute number-plate font-weight-bold green'>
                            {item.contractCode}
                          </div>}
                        <div
                          className={'position-absolute name font-weight-bold ' + getStyleByDurationOfContract(item)[1]}>{item?.owner?.fullName?.toUpperCase()}</div>
                      </div>
                    </div>
                  ))
                }
              </Carousel>
            </div>

            <div className='mt-3 mb-3 d-flex justify-content-center mx-auto contract-operation px-2 px-md-3'>
              <button className='mr-2 printed-matters btn-custom' onClick={getPrintedMatters}>
                <FormattedMessage id={getKeyLang('contractManagement.printedMatters')} />
              </button>
              <button className='re-insurance btn-custom'>
                <FormattedMessage id={getKeyLang('contractManagement.reInsurance')} />
              </button>
            </div>

            <DetailContract contract={contracts[activeIndex]} />

          </div>
        ) : (
          <div className='contract-empty text-center'>
            <img className='mx-auto mb-2' src={contractIcon} />
            <h5 className='font-weight-bold text-uppercase'><FormattedMessage
              id={getKeyLang('contractManagement.noContract')} /></h5>
          </div>
        )}
        <Modal isOpen={modalCert} size={'lg'} className='modal-dialog-centered' toggle={toggleCertModal}>
          <ModalHeader toggle={toggleCertModal}>
            <h6>{contracts[activeIndex]?.contractCode}</h6>
          </ModalHeader>
          <ModalBody>
            <div className='overflow-auto' style={{ height: '80vh' }}>
              <Document
                loading={'Đang tải ấn chỉ....'}
                noData={'Không thể tải ấn chỉ....'}
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default ContractManagement
