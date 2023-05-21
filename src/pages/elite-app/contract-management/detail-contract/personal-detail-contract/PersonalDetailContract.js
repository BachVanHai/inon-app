import React from 'react'
import moment from 'moment'
import ContractInformation from '../ContractInformation'
import { FormattedMessage } from 'base-app'
import { getKeyLang } from '../../../../../configs/elite-app'
import '../../../../../assets/scss/elite-app/contract-management/detail-contract/personal-detail-contract/personal-detail-contract.scss'

const PersonalDetailContract = ({ contract }) => {

  const getInsuranceCompanyName = (companyId) => {
    switch (companyId) {
      case '01':
        return 'BSH'
      case '02':
        return 'VBI'
      case '03':
        return 'VNI'
      case '04':
        return 'XTI'
      case '05':
        return 'PTI'
      default:
        return 'BSH'
    }
  }

  const getContractType = (contract) => {
    switch (contract.contractType) {
      case 'CC':
        return <FormattedMessage id={getKeyLang("home.carInsurance")} />
      case 'MC':
        return <FormattedMessage id={getKeyLang('insurance.title.motor')} />
      case 'VTA':
        return <FormattedMessage id={getKeyLang('insurance.vta')} />
      case 'HC':
        return <FormattedMessage id={getKeyLang('insurance.title.homesafety')} />
      case 'PHC':
        return <FormattedMessage id={getKeyLang("insurance.title.homeprivate")} />
      default:
        return <FormattedMessage id={getKeyLang("home.carInsurance")} />
    }
  }

  return (
    <div className='bg-white personal-detail-contract mx-2'>

      <ContractInformation contract={contract} />
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('contractManagement.contractType')} /></div>
        <div className='col-md-6 col-12 dark-green'>{getContractType(contract)}</div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('contractManagement.contractCode')} /></div>
        <div className='col-md-6 col-12 dark-green'>{contract.contractCode}</div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('insurance.insuranceCompany')} /></div>
        <div className='col-md-6 col-12 dark-green'>{getInsuranceCompanyName(contract.companyId)}</div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('contractManagement.paymentType')} /></div>
        <div className='col-md-6 col-12 dark-green'><FormattedMessage
          id={getKeyLang(`contractManagement.${contract.paymentType}`)} /></div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('insurance.fee.totalFee')} /></div>
        <div className='col-md-6 col-12 dark-green'>
          {contract?.totalFeeInclVAT}
        </div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('insurance.homeSafety.phoneNumber')} /></div>
        <div className='col-md-6 col-12 dark-green'>
          {contract?.owner?.phoneNumber}
        </div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('insurance.homeSafety.email')} /></div>
        <div className='col-md-6 col-12 dark-green'>
          {contract?.owner?.email}
        </div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('insurance.owner.address')} /></div>
        <div className='col-md-6 col-12 dark-green'>
          {contract?.owner?.addresses[0].detail}
        </div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'><FormattedMessage
          id={getKeyLang('insurance.contractInfo.createdDate')} /></div>
        <div className='col-md-6 col-12 dark-green'>
          {moment(contract?.createdDate).format('DD/MM/YYYY')}
        </div>
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('insurance.contractInfo.effectiveDate')} />
        </div>
        {contract.contractType === 'PHC' ? <div className='col-md-6 col-12 dark-green'>
          {moment(contract?.insurances[0].startedDate).format('DD/MM/YYYY')}
        </div> : <div className='col-md-6 col-12 dark-green'>
          {moment(contract?.insurances[0].startValueDate).format('DD/MM/YYYY')}
        </div>}
      </div>
      <div className='row align-items-center py-2'>
        <div className='col-md-6 col-12 mb-md-0 mb-1 font-weight-bold'>
          <FormattedMessage id={getKeyLang('insurance.contractInfo.dueDate')} />
        </div>
        {contract.contractType === 'PHC' ? <div className='col-md-6 col-12 dark-green'>
          {moment(contract?.insurances[0].endDate).format('DD/MM/YYYY')}
        </div> : <div className='col-md-6 col-12 dark-green'>
          {moment(contract?.insurances[0].endValueDate).format('DD/MM/YYYY')}
        </div>}

      </div>
    </div>
  )
}

export default PersonalDetailContract