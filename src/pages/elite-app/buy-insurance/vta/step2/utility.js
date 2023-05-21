import React from 'react'
import { FormattedMessage } from 'base-app'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../configs/elite-app'

export const InsurancePackageCard = styled.div``
export const INSURANCE_PACKAGE = [
  {
    value: 'GOI1',
    type: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.packageBasic')}
      />
    ),
    //
    interestTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.benefitTitle')}
      />
    ),
    interestMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package1.benefitMoney')}
      />
    ),
    //
    fundTitle: (
      <FormattedMessage id={getKeyLang('insurance.vta.step2.card.fund')} />
    ),
    //
    deadTitle: (
      <FormattedMessage id={getKeyLang('insurance.vta.step2.card.deadTitle')} />
    ),
    deadMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package1.deadMoney')}
      />
    ),
    //
    hospitalTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.hospitalTitle')}
      />
    ),
    hospitalMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package1.hospitalMoney')}
      />
    ),
    //
    treatmentTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.treatmentTitle')}
      />
    ),
    treatmentMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package1.hospitalMoney')}
      />
    )
  },
  {
    value: 'GOI2',
    type: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.packageStandard')}
      />
    ),
    //
    interestTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.benefitTitle')}
      />
    ),
    interestMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package2.benefitMoney')}
      />
    ),
    //
    fundTitle: (
      <FormattedMessage id={getKeyLang('insurance.vta.step2.card.fund')} />
    ),
    //
    deadTitle: (
      <FormattedMessage id={getKeyLang('insurance.vta.step2.card.deadTitle')} />
    ),
    deadMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package2.deadMoney')}
      />
    ),
    //
    hospitalTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.hospitalTitle')}
      />
    ),
    hospitalMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package2.hospitalMoney')}
      />
    ),
    //
    treatmentTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.treatmentTitle')}
      />
    ),
    treatmentMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package2.hospitalMoney')}
      />
    )
  },
  {
    value: 'GOI3',
    type: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.packageHigh')}
      />
    ),
    //
    interestTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.benefitTitle')}
      />
    ),
    interestMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package3.benefitMoney')}
      />
    ),
    //
    fundTitle: (
      <FormattedMessage id={getKeyLang('insurance.vta.step2.card.fund')} />
    ),
    //
    deadTitle: (
      <FormattedMessage id={getKeyLang('insurance.vta.step2.card.deadTitle')} />
    ),
    deadMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package3.deadMoney')}
      />
    ),
    //
    hospitalTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.hospitalTitle')}
      />
    ),
    hospitalMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package3.hospitalMoney')}
      />
    ),
    //
    treatmentTitle: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.treatmentTitle')}
      />
    ),
    treatmentMoney: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.package3.hospitalMoney')}
      />
    )
  }
]
export const DURATION_PACKAGE = [
  {
    value: 3,
    title: <FormattedMessage id={getKeyLang('insurance.vta.3months')} />
  },
  {
    value: 6,
    title: <FormattedMessage id={getKeyLang('insurance.vta.6months')} />
  },
  {
    value: 12,
    title: <FormattedMessage id={getKeyLang('insurance.vta.12months')} />
  }
]

export const FEE_INSURANCE = [
  {
    package: 'GOI1',
    duration: 3,
    value: '130000'
  },
  {
    package: 'GOI2',
    duration: 3,

    value: '230000'
  },
  {
    package: 'GOI3',
    duration: 3,

    value: '380000'
  },
  {
    package: 'GOI1',
    duration: 6,
    value: '190000'
  },
  {
    package: 'GOI2',
    duration: 6,
    value: '340000'
  },
  {
    package: 'GOI3',
    duration: 6,
    value: '560000'
  },
  {
    package: 'GOI1',
    duration: 12,
    value: '250000'
  },
  {
    package: 'GOI2',
    duration: 12,
    value: '450000'
  },
  {
    package: 'GOI3',
    duration: 12,
    value: '750000'
  }
]

export const NAV_ITEMS = [
  {
    activeTab: '1',
    title: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.packageBasic')}
      />
    ),
    value: 'GOI1'
  },
  {
    activeTab: '2',
    title: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.packageStandard')}
      />
    ),
    value: 'GOI2'
  },
  {
    activeTab: '3',
    title: (
      <FormattedMessage
        id={getKeyLang('insurance.vta.step2.card.packageHigh')}
      />
    ),
    value: 'GOI3'
  }
]
export const FeeStyled = styled.div`
  @media (max-width: 576px) {
    .fee-insurance{
      margin-left : 5px;
    }
  }
`
