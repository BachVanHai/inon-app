import React, { useState } from 'react'
import '../../../../assets/scss/elite-app/home/insurances.scss'
import { FormattedMessage } from 'base-app'
import { getKeyLang, INSURANCE_PRODUCTS } from '../../../../configs/elite-app'
import { useDispatch } from 'react-redux'
import { actionCheckPendingContract } from '../../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { useHistory } from 'react-router-dom'

const Insurances = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const [insuranceActive, setInsuranceActive] = useState("carInsurance");

  const onClickBuyInsurance = (insuranceType) => {
    dispatch(actionCheckPendingContract(insuranceType, () => history.push(`/buy-insurance/${insuranceType}`)))
  }

  const insuranceIconStyle = {
    width: '50px',
    height: '50px',
  }

  return (
    <article className="insurances pt-2 px-1">

      <section className="insurance-tab">
        <div className={"item mr-1" + (insuranceActive === "carInsurance" ? " insurance-active" : "")}
          onClick={() => setInsuranceActive("carInsurance")}>
          <FormattedMessage id={getKeyLang("home.carInsurance")} />
        </div>
        <div className={"item mr-1" + (insuranceActive === "personalInsurance" ? " insurance-active" : "")}
          onClick={() => setInsuranceActive("personalInsurance")}>
          <FormattedMessage id={getKeyLang("home.personalInsurance")} />
        </div>
        {/*<div className={"insurance-type mr-1" + (insuranceActive === "technicalPropertyInsurance" ? " insurance-active" : "")}*/}
        {/*     onClick={() => setInsuranceActive("technicalPropertyInsurance")}>*/}
        {/*  <FormattedMessage id={getKeyLang("insurance.technicalPropertyInsurance")} />*/}
        {/*</div>*/}
        {/*<div className={"insurance-type mr-1" + (insuranceActive === "tripTravelInsurance" ? " insurance-active" : "")}*/}
        {/*     onClick={() => setInsuranceActive("tripTravelInsurance")}>*/}
        {/*  <FormattedMessage id={getKeyLang("insurance.tripTravelInsurance")} />*/}
        {/*</div>*/}
        <div className={"item mr-1" + (insuranceActive === "motorInsurance" ? " insurance-active" : "")}
          onClick={() => setInsuranceActive("motorInsurance")}>
          <FormattedMessage id={getKeyLang("home.motorInsurance")} />
        </div>
      </section>

      <section className="d-flex flex-wrap product-list mt-1">
        {INSURANCE_PRODUCTS[insuranceActive]?.map((item, index) => (
          <div key={index} className="col-6 mb-1 px-custom" onClick={() => onClickBuyInsurance(item.key)}>
            <div className="insurance-card p-1">
              <div className='d-flex mb-lg-1'>
                <div className='vehicle-icon'>
                  <img src={item.image} alt={'insurance-icon'} style={insuranceIconStyle} />
                </div>
                {/*icon insurance branch*/}
                <div />
              </div>
              <div className="insurance-name mb-lg-1">
                <FormattedMessage id={getKeyLang(`insurance.${item.key}`)} />
              </div>
            </div>

          </div>
        ))}
      </section>
    </article>
  )
}

export default Insurances