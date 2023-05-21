import { FormattedMessage, Radio } from 'base-app'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap'
import bshLogo from '../../../../assets/images/elite-app/buy-insurance/logo-bsh.svg'
import ptiLogo from '../../../../assets/images/elite-app/buy-insurance/logo-pti.svg'
import vbiLogo from '../../../../assets/images/elite-app/buy-insurance/logo-vbi.svg'
import vniLogo from '../../../../assets/images/elite-app/buy-insurance/logo-vni.svg'
import xtiLogo from '../../../../assets/images/elite-app/buy-insurance/logo-xti.svg'
import pviLogo from '../../../../assets/images/elite-app/buy-insurance/Logo_PVI.svg'
import { getKeyLang } from '../../../../configs/elite-app'

const InsuranceCompanyPopUp = ({ item, fee, popoverFeeAction }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <Popover
      trigger='legacy'
      placement='top'
      target={`controlledPopover${item.companyName}`}
      isOpen={popoverOpen}
      toggle={() => setPopoverOpen(!popoverOpen)}
    >
      <PopoverHeader className='text-center'>
        <FormattedMessage id={getKeyLang('insurance.fee.feeDetailInfo')} />
      </PopoverHeader>
      <PopoverBody>
        {popoverFeeAction(fee).map((_elt, key) => {
          return (
            <div key={key} className='row mb-2 d-flex align-items-center'>
              <div className='col-7'>{_elt.name}</div>
              <div className='col-5 font-weight-bold'> {_elt.value}</div>
            </div>
          )
        })}
      </PopoverBody>
    </Popover>
  )
}

const CompanySelection = ({ assignCompanyId, companyId, popoverFeeAction }) => {
  const { contractInfo: contract, dataFees: feeDetails } = useSelector(
    (state) => state.app.renewalInsurance
  )
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
  const onChangeCompany = (company) => {
    assignCompanyId && assignCompanyId(company)
  }

  return (
    <div className='company-selection mt-4'>
      <div className='company-selection-title'>
        <FormattedMessage id={getKeyLang('insurance.companySelection')} />
      </div>
      {listFee.length > 0 ? (
        <div className='border px-1 mt-2 companies'>
          {listFee.map((item, index) => (
            <div key={item.companyId} className='company'>
              <div className='d-flex align-items-center'>
                <Radio
                  checked={companyId === item.companyId}
                  onChange={() => onChangeCompany(item.companyId)}
                />
                <div className='border-image p-1 mx-1'>
                  <img
                    src={COMPANY_LOGO[item.companyName]}
                    style={{ height: '40px' }}
                    alt={item.companyName}
                  />
                </div>
                <div className='company-name'>
                  <FormattedMessage
                    id={getKeyLang(
                      `insurance.InsuranceCompanyName.${item.companyName}`
                    )}
                  />
                </div>
              </div>

              <div className='d-flex align-items-center company-detail'>
                <div className='fee'>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(item.actualFee)}
                </div>
                <div
                  className='detail'
                  id={`controlledPopover${item.companyName}`}
                >
                  <FormattedMessage id={getKeyLang('insurance.fee.detail')} />
                </div>
                <InsuranceCompanyPopUp
                  item={item}
                  fee={feeDetails[index]}
                  popoverFeeAction={popoverFeeAction}
                  dataFees={feeDetails}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default CompanySelection
