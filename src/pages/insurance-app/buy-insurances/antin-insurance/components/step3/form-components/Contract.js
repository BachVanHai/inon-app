import moment from 'moment'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
  DATE_FORMAT,
  TEXT_NO_VALUE
} from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Original from '../../../../../../../components/insurance-app/common-forms/contract'
import PaymentType from '../../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import {
  getCompanyById,
  getKeyLang
} from '../../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesHealthCare'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesHealthCareCard'
import {
  getAddressesValue,
  getRightPaymentVATFee,
  intlConvertToVnd,
  isArrayEmpty,
  isObjEmpty
} from '../../../../../../../ultity'
import { KEY_ADDTIONAL_PEOPLE } from '../../step1/formikConfig'
import { KEY_DURATION_SELECTED } from '../../step2/formikConfig'
import { getDefault_updatePaymentContractObj, updateContract } from '../utility'
const BenificiaryStyled = styled.div`
.benificiary__p{
  font-size: 15.4px !important;
}
.benificiary__text{
  color: #0F3324 !important;
  font-size: 15.4px !important;
}
.benificiary__value{
  font-size: 15.4px !important;
}
`
const Contract = ({
  contractInfo = {},
  contractCode,
  contractId,
  dataFee,
  agreedTermOfServicesStatus,
  paymentType,
  toggleAgreeCallback,
  companyId,
  stepInfo,
  insuranceInfo
}) => {
  let { owner, beneficiaries } = contractInfo
  const { beneficiaryFirst, beneficiarySecond } = stepInfo
  const intl = useIntl()
  const dispatch = useDispatch()

  if (isObjEmpty(owner)) {
    owner = {
      fullName: TEXT_NO_VALUE,
      icNo: TEXT_NO_VALUE,
      phoneNumber: TEXT_NO_VALUE,
      email: TEXT_NO_VALUE,
      addresses: [{ detail: TEXT_NO_VALUE }]
    }
  }
  if (isArrayEmpty(beneficiaries)) {
    beneficiaries = [
      {
        beneficiaryName: TEXT_NO_VALUE,
        duration: TEXT_NO_VALUE,
        endDate: TEXT_NO_VALUE,
        packageName: TEXT_NO_VALUE,
        id: TEXT_NO_VALUE,
        feeInsurance: TEXT_NO_VALUE,
        startDate: TEXT_NO_VALUE
      }
    ]
  }
  if (Object.keys(insuranceInfo).length === 0) {
    insuranceInfo = [
      {
        startValueDate: TEXT_NO_VALUE,
        duration: TEXT_NO_VALUE,
        endValueDate: TEXT_NO_VALUE
      }
    ]
  }
  const titleRow1 = {
    msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
    content: contractCode || TEXT_NO_VALUE,
    subTitle:
      <FormattedMessage id={getKeyLang(`insuranceBeneInfo`)} /> || TEXT_NO_VALUE
  }
  const addtionPeople = stepInfo[KEY_ADDTIONAL_PEOPLE][0]
  const headRow = [
    {
      msgField: 'Họ và tên',
      content: addtionPeople.fullname
    },
    {
      msgField: 'Số giấy tờ tuỳ thân',
      content: addtionPeople.icNo
    },
    {
      msgField: 'Năm sinh',
      content: moment(addtionPeople.dateOfBirth).utc(true).format(DATE_FORMAT)
    },
    {
      msgField: 'Số điện thoại',
      content: addtionPeople.phoneNumber
    },
    {
      msgField: 'Email',
      content: addtionPeople.email
    },
    {
      msgField: 'Địa chỉ',
      content:
        addtionPeople.detail === ''
          ? addtionPeople.ward + addtionPeople.district + addtionPeople.city
          : addtionPeople.detail
    },
    {
      msgField: 'Số HĐTD/Sổ vay vốn',
      content: addtionPeople.creditContractNo
    },
    {
      msgField: 'Số tiền vay',
      content: `${addtionPeople.loan} VND`
    },
    {
      msgField: 'Thời hạn vay',
      content: `${addtionPeople.creditDuration} Tháng`
    }
  ]
  const headRow2 = [beneficiaryFirst, beneficiarySecond].map((_elt, index) => {
    return {
      fullName:
        index === 0 ? `${_elt.bankName} - ${_elt.branchName}` : _elt.fullname
    }

    // [
    //   {
    //     msgField: index === 0 ? "Tên ngân hàng" : 'Họ và tên',
    //     content: index === 0 ? _elt.bankName : _elt.fullname
    //   },
    //   {
    //     msgField: index === 0 ? "Chi nhánh" : 'Loại giấy tờ',
    //     content:  index === 0 ? _elt.branchName : _elt.icType
    //   },
    //   {
    //     msgField: index === 0 ? undefined : 'Số giấy tờ tuỳ thân',
    //     content: index === 0 ? undefined : _elt.icNo
    //   },
    // ]
  })
  const bodyRows = beneficiaries.map((person, index) => {
    const { fullName, icNo, dateOfBirth, phoneNumber, email } = person

    return {
      contents: [
        { content: fullName },
        { content: icNo },
        { content: moment(dateOfBirth).utc(true).format(DATE_FORMAT) },
        { content: phoneNumber },
        { content: email }
      ]
    }
  })

  const vanillaRows = [
    {
      msgField: (
        <PaymentType
          paymentType={paymentType}
          isHideIcon={true}
          keyNames={{ KEY_GIFT_CODE: 'KEY_COUPON_CODE' }}
          callbacks={{
            radioChange: (e) => {
              dispatch(
                updateContract(
                  getDefault_updatePaymentContractObj(
                    e.target.value,
                    contractInfo
                  )
                )
              )
            }
          }}
        />
      )
    },
    {
      msgField: (
        <div
          className='font-medium-4 font-weight-bold text-primary-highlight letter-uppercase mb-2'
          style={{ marginLeft: '-14px' }}
        >
          <FormattedMessage id={getKeyLang('Detail')} />
        </div>
      ),
      isHideUnderLine: true
    }
  ]
  const rightPaymentVATFee = getRightPaymentVATFee(paymentType, dataFee)
  const totalFeeVAT =
    rightPaymentVATFee + ((dataFee && dataFee.feeInsurance) || 0)
  const feeRows = [
    {
      msgField: <FormattedMessage id={getKeyLang(`insurance.companyName`)} />,
      content: getCompanyById(companyId).title
    },
  
    {
      msgField: (
        <FormattedMessage
          id={getKeyLang(`contract.personalHome.limitCompensated`)}
        />
      ),
      content: `${stepInfo?.responsibility} VNĐ`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`RangeDate`)} />,
      content:
        `${stepInfo[KEY_DURATION_SELECTED]} ` +
          intl.formatMessage({ id: getKeyLang('Month') }) || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`FromDate`)} />,
      content:
        moment(stepInfo?.dateInsuranceFrom).utc(true).format(DATE_FORMAT) ||
        TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`ToDate`)} />,
      content:
        moment(stepInfo?.dateInsuranceTo).utc(true).format(DATE_FORMAT) ||
        TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`InsuranceFee`)} />,
      content:
      `${intlConvertToVnd(dataFee.feeInsurance, intl)} VND`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
      content: `${intlConvertToVnd(rightPaymentVATFee, intl)} VND`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`voucherApplied`)} />,
      content: `${dataFee && dataFee.reduceFee ? '-' : ''}${intlConvertToVnd(
        dataFee && dataFee.reduceFee,
        intl
      )} VND`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
      content: `${intlConvertToVnd(totalFeeVAT, intl)} VND`,
      isTotalFee: true
    }
  ]

  const toggleAgree = {
    agreedTermOfServicesStatus: agreedTermOfServicesStatus,
    toggleAgreeCallback: toggleAgreeCallback
  }

  React.useEffect(() => {
    dispatch(
      updateProps([
        {
          prop: BASE.KEY_TOTAL_FEE,
          value: totalFeeVAT
        }
      ])
    )
  }, [JSON.stringify(contractInfo), paymentType])

  return (
    <>
      <Original titleRow={titleRow1} infoCols={headRow} />
      <p class='font-medium-4 font-weight-bold text-primary-highlight letter-uppercase'>
        <FormattedMessage id={getKeyLang('antin.beneficiaryInformation')} />
      </p>
      <BenificiaryStyled className='mt-2'>
        {headRow2.map((_elt, index) => {
          return (
            <>
              <p className='font-medium-2 mb-1 benificiary__title'>
                <span className='benificiary__text font-weight-bold'>Người được thụ hưởng {index === 0 ? 'đầu tiên' : 'còn lại'} : </span>
                <span className='benificiary__value'>{_elt?.fullName}</span>
              </p>
            </>
          )
        })}
      </BenificiaryStyled>
      <div class="border-bottom margin-bottom-14 margin-top-14"></div>
      <Original
        vanillaRows={vanillaRows}
        feeRows={feeRows}
        toggleAgree={toggleAgree}
      />
    </>
  )
}

export default Contract
