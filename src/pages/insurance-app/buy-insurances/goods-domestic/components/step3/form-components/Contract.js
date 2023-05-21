import moment from 'moment'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import {
  DATE_FORMAT,
  TEXT_NO_VALUE
} from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import Original from '../../../../../../../components/insurance-app/common-forms/contract'
import PaymentType from '../../../../../../../components/insurance-app/common-forms/payment/PaymentType'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import { updateProps } from '../../../../../../../redux/actions/insurance-app/buyInsurancesTravel'
import { BASE } from '../../../../../../../redux/reducers/insurance-app/buyInsurancesTravel'
import {
  getRightPaymentVATFee,
  intlConvertToVnd,
  isArrayEmpty,
  isObjEmpty
} from '../../../../../../../ultity'
import { KEY_ADDTIONAL_PEOPLE } from '../../step1/formikConfig'
import {
  KEY_ARRIVE_POINT,
  KEY_DURATION,
  KEY_END_INSURANCE,
  KEY_END_POINT,
  KEY_PACKAGE_SELECTED,
  KEY_START_INSURANCE,
  KEY_START_POINT,
  packages
} from '../../step2/formikConfig'
import { ARR_COMPANIES } from '../../step2/utility'
import { getDefault_updatePaymentContractObj, updateContract } from '../utility'
import CustomTable from './Table'

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
  goodsSuggestion
}) => {
  console.log(paymentType);
  let { owner } = contractInfo
  const intl = useIntl()
  const dispatch = useDispatch()
  const getGenderByType = (type) => {
    switch (type) {
      case 'MALE':
        return <FormattedMessage id={getKeyLang(`Male`)} />
      case 'FEMALE':
        return <FormattedMessage id={getKeyLang(`Female`)} />
      case 'OTHER':
        return <FormattedMessage id={getKeyLang(`Other`)} />
      default:
        break
    }
  }
  if (isObjEmpty(owner)) {
    owner = {
      fullName: TEXT_NO_VALUE,
      icNo: TEXT_NO_VALUE,
      phoneNumber: TEXT_NO_VALUE,
      email: TEXT_NO_VALUE,
      addresses: [{ detail: TEXT_NO_VALUE }]
    }
  }
  const {
    fullname,
    phoneNumber,
    email,
    city,
    district,
    ward,
    startValueDate,
    endValueDate,
    fullnameBeneficiary,
    phoneNumberBeneficiary,
    emailBeneficiary,
    wardbeneficiary,
    districtBeneficiary,
    citybeneficiary,
    vehicels,
    goodsName,
    goodsType,
    goodsAmount,
    goodsWeight,
    goodsValue,
    goodsProcudure
  } = stepInfo
  const {
    vehicelType,
    vehicelName,
    vehicelNumberPlate,
    vehicelContractNo,
    vehicelContractNoDate,
    vehicelInvoiceNumber,
    vehicelInvoiceNumberDate
  } = vehicels[0]
  console.log(stepInfo);
  const goodType = goodsSuggestion.find(_elt => _elt.value === goodsType)
  const titleRow1 = {
    msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
    content: contractCode || TEXT_NO_VALUE,
    subTitle:
      <FormattedMessage id={getKeyLang(`goods.insuranceBuyerInfo`)} /> ||
      TEXT_NO_VALUE
  }
  const titleRow3 = {
    subTitle:
      <FormattedMessage id={getKeyLang(`antin.beneficiaryInformation`)} /> ||
      TEXT_NO_VALUE,
    isContractTitleHide: true
  }
  const titleRow4 = {
    subTitle:
      <FormattedMessage id={getKeyLang(`goods.goodsInfo`)} /> || TEXT_NO_VALUE,
    isContractTitleHide: true
  }
  const titleRow5 = {
    subTitle:
      <FormattedMessage id={getKeyLang(`goods.vehicelInfo`)} /> ||
      TEXT_NO_VALUE,
    isContractTitleHide: true
  }

  const infoCols = [
    {
      msgField: <FormattedMessage id={getKeyLang(`fullName`)} />,
      content: fullname || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`PartnerPhone`)} />,
      content: phoneNumber || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
      content: email || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`Ward`)} />,
      content: ward || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`District`)} />,
      content: district || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`City`)} />,
      content: city || TEXT_NO_VALUE
    }
  ]
  const infoCols2 = [
    {
      msgField: <FormattedMessage id={getKeyLang(`fullName`)} />,
      content: fullnameBeneficiary || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`PartnerPhone`)} />,
      content: phoneNumberBeneficiary || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
      content: emailBeneficiary || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`Ward`)} />,
      content: wardbeneficiary || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`District`)} />,
      content: districtBeneficiary || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`City`)} />,
      content: citybeneficiary || TEXT_NO_VALUE
    }
  ]
  const infoCols3 = [
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.goodsType.text`)} />,
      content: goodType?.label  
       || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.goodsName.text`)} />,
      content: goodsName || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.goodsAmount.text`)} />,
      content: goodsAmount || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.goodsWeight.text`)} />,
      content:  `${goodsWeight ? goodsWeight : 0 } KG`  || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.goodsValue.text`)} />,
      content: `${goodsValue} VNĐ`  || TEXT_NO_VALUE
    },
    {
      msgField: (
        <FormattedMessage id={getKeyLang(`goods.goodsProcedure.text`)} />
      ),
      content: goodsProcudure || TEXT_NO_VALUE
    }
  ]
  const infoCols4 = [
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.vehicelType.text`)} />,
      content: goodType?.transportations.find(_elt => _elt.value === vehicelType)?.label  || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.vehicelName.text`)} />,
      content: vehicelName || TEXT_NO_VALUE
    },
    {
      msgField: (
        <FormattedMessage id={getKeyLang(`goods.vehicelNumberPlate.text`)} />
      ),
      content: vehicelNumberPlate || TEXT_NO_VALUE
    },
    {
      msgField: (
        <FormattedMessage id={getKeyLang(`goods.vehicelContractNo.text`)} />
      ),
      content: vehicelContractNo || TEXT_NO_VALUE
    },
    {
      msgField: (
        <FormattedMessage id={getKeyLang(`goods.vehicelInvoiceNumber.text`)} />
      ),
      content:
      vehicelInvoiceNumber ||
        TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`goods.vehicelDate.text`)} />,
      content:  `${vehicelContractNoDate} - ${vehicelInvoiceNumberDate}`  || TEXT_NO_VALUE
    }
  ]

  const titleRow2 = {
    subTitle:
      <FormattedMessage id={getKeyLang(`insuranceBeneInfo`)} /> ||
      TEXT_NO_VALUE,
    isContractTitleHide: true
  }

  const addtionPeople = (stepInfo[KEY_ADDTIONAL_PEOPLE] || [{}])[0]

  const headRow = [
    {
      msgField: 'Họ và tên',
      content: addtionPeople.fullname
    },
    {
      msgField: 'Số hộ chiếu',
      content: addtionPeople.icNo
    },
    {
      msgField: 'Năm sinh',
      content: moment(addtionPeople.dateOfBirth).utc(true).format(DATE_FORMAT)
    },
    {
      msgField: 'Giới tính',
      content: 'Nam'
    }
  ]

  const bodyRows = []

  const vanillaRows = [
    // {
    //   msgField: <CustomTable headRow={headRow} bodyRows={bodyRows} />
    // },
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
                  contractId,
                  getDefault_updatePaymentContractObj(
                    e.target.value,
                    contractInfo,
                    contractId
                  ),
                  e.target.value
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
  const totalFeeVAT = rightPaymentVATFee + dataFee.totalFeeInsurance
  const feeRows = [
    {
      msgField: <FormattedMessage id={getKeyLang(`insurance.companyName`)} />,
      content: (
        <FormattedMessage
          id={getKeyLang(
            ARR_COMPANIES.find((_elt) => _elt.id === "01")?.nameDetail
          )}
        />
      )
    },
    // {
    //   msgField: <FormattedMessage id={getKeyLang(`coverage`)} />,
    //   content: stepInfo[KEY_PACKAGE_SELECTED]
    //     ? packages.find((elt) => elt.value === stepInfo[KEY_PACKAGE_SELECTED])
    //         .packageSubtitleField
    //     : TEXT_NO_VALUE
    // },
    {
      msgField: (
        <FormattedMessage id={getKeyLang(`travel.travelItinerary.text`)} />
      ),
      content: `${stepInfo[KEY_START_POINT]} - ${stepInfo[KEY_END_POINT]}`
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`FromDate`)} />,
      content:
        moment(startValueDate).utc(false).format(DATE_FORMAT) || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`ToDate`)} />,
      content:
        moment(endValueDate).utc(false).format(DATE_FORMAT) || TEXT_NO_VALUE
    },
    {
      msgField: <FormattedMessage id={getKeyLang(`feeInsurancePer`)} />,
      content: `${intlConvertToVnd(dataFee.totalFeeInsurance, intl)} VND`
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
      <Original titleRow={titleRow1} infoCols={infoCols} />
      <Original titleRow={titleRow3} infoCols={infoCols2} />
      <Original titleRow={titleRow4} infoCols={infoCols3} />
      <Original titleRow={titleRow5} infoCols={infoCols4} />
      <Original
        // titleRow={titleRow2}
        vanillaRows={vanillaRows}
        feeRows={feeRows}
        toggleAgree={toggleAgree}
      />
    </>
  )
}

export default Contract
