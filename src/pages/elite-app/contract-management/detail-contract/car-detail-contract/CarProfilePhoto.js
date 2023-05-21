import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import 'react-multi-carousel/lib/styles.css'
import '../../../../../assets/scss/elite-app/contract-management/detail-contract/car-detail-contract/car-detail-contract.scss'
import '../../../../../assets/scss/elite-app/contract-management/detail-contract/car-detail-contract/car-profile-photo.scss'
import ImageGallery from 'react-image-gallery'

const CarProfilePhoto = ({ modal, toggle, contract }) => {

  const vehicalStatus = contract?.vehicles[0]?.vehicleStatus
  let uploadPhotos
  if (vehicalStatus === 'NEW') {
    uploadPhotos = ['uploadRegisterCar', 'uploadTemCar', 'uploadChassisNumber']
  } else {
    uploadPhotos = ['uploadRegisterCar', 'uploadTemCar', 'uploadChassisNumber', 'uploadBeforeMainSeatCar', 'uploadBeforeSubSeatCar',
      'uploadAfterMainSeatCar', 'uploadAfterSubSeatCar']
  }

  const items = uploadPhotos.map(item => (
    {
      original: 'https://apidev.inon.vn/nth/file/api/file?contractId=' + contract.id + '&docType=' + item,
      thumbnail: 'https://apidev.inon.vn/nth/file/api/file?contractId=' + contract.id + '&docType=' + item,
      originalWidth: 700,
      originalHeight: 500,
      fullscreen: 'https://apidev.inon.vn/nth/file/api/file?contractId=' + contract.id + '&docType=' + item
    }
  ))

  return (
    contract.vehicles.length > 0 && contract.vehicles[0] && contract.vehicles[0].vehicleStatus ? (
      <Modal scrollable isOpen={modal} toggle={toggle} className='modal-dialog-centered modal-lg'
             contentClassName='custom-modal-style'>
        <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center mt-1' }}
                     toggle={toggle}>
          Ảnh hồ sơ
        </ModalHeader>
        <ModalBody>
          <ImageGallery items={items} showNav={false} lazyLoad={true}/>
        </ModalBody>
      </Modal>
    ) : null
  )
}

export default CarProfilePhoto
