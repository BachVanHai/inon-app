import { FormattedMessage } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getKeyLang } from '../../../../configs/insurance-app'
import Utils from '../../../../configs/insurance-app/constants/Utils'
import { updatePropsCompanyId } from '../../../../redux/actions/elite-app/renewal'
import { renewalService } from '../../../../services/elite-app/renewalnsurance'
import { getDefault_updateCompanyIdObj } from '../utility'
import CompanySelection from './companySelection'
const CallFeeDoneStyled = styled.div`
  .company-selection {
    .company-selection-title {
      color: #106d5a;
      font-size: 24px;
      font-weight: bold;
    }
    .companies {
      padding: 0 16px;
      .company {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        border-bottom: 1px solid #e7ebeb;
        padding: 16px 0;

        @media (max-width: 768px) {
          display: block;
        }

        .border-image {
          img {
            width: 45px;
            height: 24px;
          }
        }

        .company-name {
          font-size: 12px;
          color: #113934;
          max-width: 350px;
        }

        .company-detail {
          @media screen and (max-width: 768px) {
            margin-top: 2rem;
            padding-left: 22px;
          }
        }
      }

      .fee {
        color: #73c14f;
        font-size: 14px;
        font-weight: bold;
        margin-right: 32px;
        margin-left: 16px;

        @media (max-width: 768px) {
          font-size: 1rem;
        }
      }

      .detail {
        color: #ff9900;
        cursor: pointer;
        min-width: fit-content;
        margin-right: 16px;
      }
    }
  }
`
const CalFeeDone = ({
  companyId,
  contractId,
  paymentType,
  className,
  dataFees = []
}) => {
  const intl = useIntl()
  const dispatch = useDispatch()

  let _compId
  const findValidCompany = () => {
    const foundCompany = dataFees.find((elt) => elt.companyId === companyId)
    if (foundCompany) {
      _compId = foundCompany.companyId
    } else {
      _compId = dataFees[0]?.companyId || "06"
    }
    return _compId
  }

  const _companyId = findValidCompany()

  const popoverFeeAction = (dataFee) => {
    let data = []

    // CAR
    if (dataFees) {
    }
    if (typeof dataFee.CAR_TNDS !== 'undefined') {
      data = [
        ...data,
        {
          name: <FormattedMessage id={getKeyLang(`FeeInsBBTNDSCar`)} />,
          value: Utils.formatCurrency(dataFee.CAR_TNDS) + ' VND'
        }
      ]
    }

    if (typeof dataFee.CAR_TNDS_TN !== 'undefined') {
      data = [
        ...data,
        {
          name: <FormattedMessage id={getKeyLang(`FeeInsBBTNDSTNCar`)} />,
          value:
            Utils.formatCurrency(
              dataFee.CAR_TNDS_TN.value1 +
                dataFee.CAR_TNDS_TN.value2 +
                dataFee.CAR_TNDS_TN.value3
            ) + ' VND'
        }
      ]
    }

    if (typeof dataFee.CAR_VATCHAT !== 'undefined') {
      data = [
        ...data,
        {
          name: <FormattedMessage id={getKeyLang(`FeeInsMaterialCar`)} />,
          value: Utils.formatCurrency(dataFee.CAR_VATCHAT) + ' VND'
        }
      ]
    }

    if (typeof dataFee.CAR_CONNGUOI !== 'undefined') {
      data = [
        ...data,
        {
          name: <FormattedMessage id={getKeyLang(`FeeInsBHTNLPXNTX`)} />,
          value: Utils.formatCurrency(dataFee.CAR_CONNGUOI) + ' VND'
        }
      ]
    }

    if (typeof dataFee.CAR_HANGHOA !== 'undefined') {
      data = [
        ...data,
        {
          name: <FormattedMessage id={getKeyLang(`FeeInsCommodity`)} />,
          value: Utils.formatCurrency(dataFee.CAR_HANGHOA) + ' VND'
        }
      ]
    }

    // MOTOR

    if (typeof dataFee.MOTOR_TNDS !== 'undefined') {
      data = [
        ...data,
        {
          name: <FormattedMessage id={getKeyLang(`FeeInsBBTNDSMotor`)} />,
          value: Utils.formatCurrency(dataFee.MOTOR_TNDS) + ' VND'
        }
      ]
    }

    if (typeof dataFee.MOTOR_CONNGUOI !== 'undefined') {
      data = [
        ...data,
        {
          name: <FormattedMessage id={getKeyLang(`FeeBHTNNNTXMTXM`)} />,
          value: Utils.formatCurrency(dataFee.MOTOR_CONNGUOI) + ' VND'
        }
      ]
    }

    return data
  }

  const assignCompanyId = async (__companyId) => {
    // update conpanies
    const conpRes = await renewalService.updateCompanies(
      getDefault_updateCompanyIdObj(contractId, __companyId)
    )
    if (conpRes.status === 200) {
      dispatch(updatePropsCompanyId(__companyId))
    }
  }

  return (
    <CallFeeDoneStyled>
      <CompanySelection
        assignCompanyId={assignCompanyId}
        companyId={companyId}
        popoverFeeAction={popoverFeeAction}
      />
    </CallFeeDoneStyled>
  )
}

export default CalFeeDone
