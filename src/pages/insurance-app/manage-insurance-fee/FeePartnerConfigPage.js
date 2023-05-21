import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import {
  FormattedMessage,
  AppId
} from 'base-app'
import { history } from "../../../history"

const divStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%'
};

const showAlert = (titleId, contentId, isHaveClose) => {
  return (
    <Modal
      isOpen={true}
      className="modal-dialog-centered"
    >
      <ModalHeader >
        <FormattedMessage id={titleId} />
      </ModalHeader>
      <ModalBody>
        <div className={divStyle}>

          <FormattedMessage id={`${AppId.INSURANCE_APP}.Processing`} />

        </div>
      </ModalBody>

    </Modal>
  )
}

const FeePartnerConfigPage = (props) => {

  const [toggleShow, setToggleShow] = useState(false)
  useEffect(() => {
    let url = window.location.href
    let infos = url.split("?")
    console.log("config " + infos[1])
    if (infos.length === 2) {
      const query = new URLSearchParams(infos[1]);
      if (query.get('vehicle') === 'CAR') {
        history.push({
          pathname: '/insurance/insurance-fee/feeCar',
          state: { role: query.get('type'), editable: false, userId: query.get('userId') }
        })
      } else if (query.get('vehicle') === 'MOTOR') {
        history.push({
          pathname: '/insurance/insurance-fee/feeMotor',
          state: { role: query.get('type'), editable: false, userId: query.get('userId') }
        })

      }

    }

  }, [])


  return (
    <div className={divStyle}>
      {showAlert(`${AppId.INSURANCE_APP}.NoticeAlertTitle`, `${AppId.INSURANCE_APP}.InfoNotExistsAlertContent`, false)}
    </div>
  )
}
export default FeePartnerConfigPage
