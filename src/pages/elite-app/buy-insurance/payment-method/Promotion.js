import React, { useState } from 'react'
import { FormattedMessage, Button } from 'base-app'
import { getKeyLang } from '../../../../configs/elite-app'
import {
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  CustomInput,
  Card,
  CardBody
} from 'reactstrap'
import { Form } from 'formik'
import '../../../assets/scss/buy-insurance/payment-method/promotion.scss'

const Promotion = ({promotionOption}) => {

  const endowArr = ['Mã khuyến mại 5% INONRETAIL 1', 'Mã khuyến mại 5% INONRETAIL 2', 'Mã khuyến mại 5% INONRETAIL 3']
  const [promotion, setPromotion] = useState(true);
  const [modal, setModal] = useState(false)
  const [promotionValue, setPromotionValue] = useState(promotionOption)
  const [promotionOptionAlt, setPromotionOptionAlt] = useState(promotionOption)

  const handleChangeEndow = () => {
    setPromotionOptionAlt(promotionValue)
    setModal(false)
    setPromotion(false)
  }

  const cancelChangeEndow = () => {
    setPromotionValue(promotionOption)
    setModal(false)
  }

  const openChooseEndowPopup = () => {
    setModal(true);
  }

  return (
    <>
      <div className="mt-2 d-flex align-items-center justify-content-between">
        <div className='font-weight-bold'><FormattedMessage id={getKeyLang('contractManagement.couponCode')}/></div>
        <div className='text-right'>
          <span className='mr-2 font-weight-bold'>{promotionOptionAlt}</span>
          <Button onClick={() => {openChooseEndowPopup()}} color='primary'>{
            promotion ? <FormattedMessage id={getKeyLang('insurance.chooseEndow')}/> : <FormattedMessage id={getKeyLang('insurance.changeEndow')}/>
          }</Button>
        </div>
      </div>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className='modal-dialog-centered'>
        <ModalHeader toggle={() => setModal(!modal)}><FormattedMessage id={getKeyLang('insurance.chooseEndow')}/></ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              {endowArr.map(item => {
                return(
                  <Card>
                    <CardBody>
                      <CustomInput type="radio" id={item} label={item} checked={item === promotionValue} onChange={() => {setPromotionValue(item)}}></CustomInput>
                    </CardBody>
                  </Card>
                )
              })}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => cancelChangeEndow()}>
            Thôi
          </Button>
          <Button color='primary' onClick={() => handleChangeEndow()}>
          OK
          </Button>
        </ModalFooter>
      </Modal>
    </>

  )
}

export default Promotion
