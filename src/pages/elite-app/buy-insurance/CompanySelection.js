import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { getKeyLang, INSURANCE_TYPES } from '../../../configs/elite-app'
import bshLogo from '../../../assets/images/elite-app/buy-insurance/logo-bsh.svg'
import vniLogo from '../../../assets/images/elite-app/buy-insurance/logo-vni.svg'
import vbiLogo from '../../../assets/images/elite-app/buy-insurance/logo-vbi.svg'
import xtiLogo from '../../../assets/images/elite-app/buy-insurance/logo-xti.svg'
import ptiLogo from '../../../assets/images/elite-app/buy-insurance/logo-pti.svg'
import pviLogo from '../../../assets/images/elite-app/buy-insurance/Logo_PVI.svg'
import { Button, FormattedMessage, Radio } from 'base-app'
import { actionCalculationInsuranceFee, actionSaveFeeDetails } from '../../../redux/actions/elite-app/buy-insurance/BuyVehicleInsurance'
import { Utils } from '../../../ultity'

const InsuranceCompanyPopUp = ({item, fee, contract}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <Popover
      trigger='legacy'
      placement='top'
      target={`controlledPopover${item.companyName}`}
      isOpen={popoverOpen}
      toggle={() => setPopoverOpen(!popoverOpen)}
    >
      <PopoverHeader className='text-center'><FormattedMessage
        id={getKeyLang('insurance.fee.feeDetailInfo')} /></PopoverHeader>
      <PopoverBody>
        {
          Object.keys(fee?.details).filter(key => fee.details[key]).map(key => {
            const insurance = contract.insurances.filter(item => item.insuranceCode === key)
            if (insurance[0].isEnable) {
              return (
                <>
                  <div key={key} className='row'>
                    <div className='col-7'>
                      <FormattedMessage id={getKeyLang(`insurance.fee.${key}`)} /> :
                    </div>
                    <div className='col-5 font-weight-bold'> {Utils.numberFormat(fee.details[key])}</div>
                  </div>
                  <hr />
                </>
              )
            }
          })
        }
      </PopoverBody>
    </Popover>
  )
}


const CompanySelection = ({ validateForm }) => {

  const { contract, feeDetails, vehicle, type } = useSelector(state => state.app.buyInsurance)
  const dispatch = useDispatch()


  const COMPANY_LOGO = {
    BSH: bshLogo,
    VNI: vniLogo,
    VBI: vbiLogo,
    XTI: xtiLogo,
    PTI: ptiLogo,
    PVI: pviLogo
  }

  const listFee = feeDetails.map((fee, index) => {

    fee.actualFee = fee.totalFee
    return fee
  })

  const onClickCalculateFee = async () => {
    const errors = await validateForm()
    if (Object.keys(errors).length) {
      return
    }
    dispatch(actionCalculationInsuranceFee())
  }

  const onChangeCompany = (company) => {
    const data = feeDetails.map(item => {
      item.isSelected = item.companyName === company
      return item
    })
    dispatch(actionSaveFeeDetails(data))
  }


  return (
    <div className='company-selection mt-4'>
      <div className='company-selection-title'>
        <FormattedMessage id={getKeyLang('insurance.companySelection')} />
      </div>

      {
        type === INSURANCE_TYPES.TD ? (
          <div className='d-flex justify-content-end'>
            <Button color='primary mb-2' onClick={onClickCalculateFee}>Tính phí</Button>
          </div>
        ) : null
      }

      {
        listFee.length > 0 ? <div className='border px-1 mt-2 companies'>
          {
            listFee.map((item, index) => (
              <div key={item.companyId} className='company'>
                <div className='d-flex align-items-center'>
                  <Radio checked={item.isSelected} onChange={() => onChangeCompany(item.companyName)} />
                  <div className='border-image p-1 mx-1'>
                    <img src={COMPANY_LOGO[item.companyName]} style={{height : "40px"}} alt={item.companyName} />
                  </div>
                  <div className='company-name'>
                    <FormattedMessage id={getKeyLang(`insurance.InsuranceCompanyName.${item.companyName}`)} />
                  </div>
                </div>

                <div className='d-flex align-items-center company-detail'>
                  <div
                    className='fee'>{Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(item.actualFee)}
                  </div>
                  <div className='detail' id={`controlledPopover${item.companyName}`}><FormattedMessage
                    id={getKeyLang('insurance.fee.detail')} /></div>
                  <InsuranceCompanyPopUp item={item} fee={feeDetails[index]} contract={contract}/>
                </div>
              </div>
            ))
          }
        </div> : null
      }

    </div>

  )
}

export default CompanySelection