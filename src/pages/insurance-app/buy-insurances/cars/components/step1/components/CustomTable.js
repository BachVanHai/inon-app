import React from 'react'
import { FormattedMessage } from 'react-intl'
import TreeTable from '../../../../../../../components/insurance-app/common-forms/custom-table/TreeTable'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import ExpandableTable from '../../../../../../../components/insurance-app/common-forms/custom-table/ExpandableTable'
import { intlConvertToVnd, isArrayEmpty } from '../../../../../../../ultity'
import { DATE_FORMAT } from '../../../../../../../components/insurance-app/buy-insurances-page/formik-config'
import { sugg_Purpose } from '../../../../car/components/step1/formikConfig'
import { useIntl } from 'react-intl'
import moment from 'moment'

const CustomTable = ({ stepInfo }) => {
  const intl = useIntl()

  const { returnCarUploaded } = stepInfo
  let _data_for_columns = []
  if (!isArrayEmpty(returnCarUploaded)) {
    _data_for_columns = returnCarUploaded
  }

  const columns = [
    {
      Header: <FormattedMessage id={getKeyLang(`NumberPlate`)} />,
      accessor: `numberPlate`
    },
    {
      Header: <FormattedMessage id={getKeyLang('fullName')} />,
      accessor: `fullName`
    },
    {
      Header: <FormattedMessage id={getKeyLang('BrandVehicle')} />,
      accessor: `manufactureName`
    },
    {
      Header: <FormattedMessage id={getKeyLang('LineVehicle')} />,
      accessor: `branchName`
    }
  ]

  const SubComponent = ({ original: original_data_for_columns }) => {
    const {
      vehicleType,
      usage,
      frameNo,
      machineNo,
      initValue,
      issPlace,
      issDate,
      duration,
      startValueDate,
      people, // muc tn tham gia them ve nguoi
      asset, // muc tn tham gia them ve nguoi
      passenger, // muc tn tham gia them ve nguoi
      mtnTgT, // muc tn tham gia them
      mountOfPeople, // so nguoi tren xe
      load, // so nguoi tren xe
      vehicleStatus,
      icNo,
      icType,
      address,
      telephone,
      email
    } = original_data_for_columns

    const _rows = [
      {
        title: (
          <span className='text-primary'>
            <FormattedMessage id={getKeyLang('vehicleInfo')} />
          </span>
        )
      },
      {
        msgField: <FormattedMessage id={getKeyLang('vehiclesStatus')} />,
        content: vehicleStatus
      },
      {
        msgField: <FormattedMessage id={getKeyLang('TypeVihicle')} />,
        content: vehicleType
      },
      {
        msgField: <FormattedMessage id={getKeyLang('purpose')} />,
        content: sugg_Purpose.find((elt) => elt.temp === usage)?.label
      },
      {
        msgField: <FormattedMessage id={getKeyLang('FrameNumber')} />,
        content: frameNo
      },
      {
        msgField: <FormattedMessage id={getKeyLang('EngineNumber')} />,
        content: machineNo
      },
      {
        msgField: <FormattedMessage id={getKeyLang('VehicleValue')} />,
        content: intlConvertToVnd(initValue, intl) + ' VND'
      },
      {
        msgField: <FormattedMessage id={getKeyLang('requireValue')} />,
        content: intlConvertToVnd(initValue, intl) + ' VND'
      },
      {
        msgField: <FormattedMessage id={getKeyLang('OriginProduction')} />,
        content: issPlace === 'VIETNAM' ? 'Việt Nam' : 'Quốc tế'
      },
      {
        msgField: <FormattedMessage id={getKeyLang('YearProduction')} />,
        content: issDate
      }
    ]

    const _bonus_TNDS_TN = [
      {
        title: (
          <span className='text-primary'>
            <FormattedMessage id={getKeyLang('InsBBTNDSTNCar')} />
          </span>
        )
      },
      {
        msgField: (
          <span>
            {' '}
            <FormattedMessage id={getKeyLang('FeeAddResponsibility')} />
            <span>&nbsp;</span>thêm về người
          </span>
        ),
        content: intlConvertToVnd(people, intl) + ' VND/Người/Vụ'
      },
      {
        msgField: (
          <span>
            {' '}
            <FormattedMessage id={getKeyLang('FeeAddResponsibility')} />
            <span>&nbsp;</span>thêm về tài sản
          </span>
        ),
        content: intlConvertToVnd(asset, intl) + ' VND/Người/Vụ'
      },
      {
        msgField: (
          <span>
            {' '}
            <FormattedMessage id={getKeyLang('FeeAddResponsibility')} />
            <span>&nbsp;</span>thêm về hành khách
          </span>
        ),
        content: intlConvertToVnd(passenger, intl) + ' VND/Người/Vụ'
      }
    ]

    const _bonus_TAI_NAN_LAI = [
      {
        title: (
          <span className='text-primary'>
            <FormattedMessage id={getKeyLang('InsBHTNLPXNTX')} />
          </span>
        )
      },
      {
        msgField: (
          <span>
            {' '}
            <FormattedMessage id={getKeyLang('Responsibility')} />
          </span>
        ),
        content: intlConvertToVnd(mtnTgT, intl) + ' VND/Người/Vụ'
      },
      {
        msgField: (
          <span>
            {' '}
            <FormattedMessage id={getKeyLang('amountInCar')} />
          </span>
        ),
        content: mountOfPeople
      }
    ]

    const _insurance_info = [
      {
        title: (
          <span className='text-primary'>
            <FormattedMessage id={getKeyLang('insuranceInfo')} />
          </span>
        )
      },
      {
        msgField: <FormattedMessage id={getKeyLang('RangeDate')} />,
        content: (
          <span>
            {duration}
            <span>&nbsp;</span>
            <FormattedMessage id={getKeyLang('Month')} />
          </span>
        )
      },
      {
        msgField: (
          <FormattedMessage
            id={getKeyLang('insurance.personalHome.startDateInsurance')}
          />
        ),
        content: moment(startValueDate).utc(false).format(DATE_FORMAT)
      }
    ]

    const _owner_info = [
      {
        title: (
          <span className='text-primary'>
            <FormattedMessage id={getKeyLang('ownAcctInfo')} />
          </span>
        )
      },
      {
        msgField: <FormattedMessage id={getKeyLang('icNoType')} />,
        content: icType
      },
      {
        msgField: <FormattedMessage id={getKeyLang('idPers')} />,
        content: icNo
      },
      {
        msgField: <FormattedMessage id={getKeyLang('PartnerPhone')} />,
        content: telephone
      },
      {
        msgField: <FormattedMessage id={getKeyLang('Email')} />,
        content: email
      },
      {
        msgField: <FormattedMessage id={getKeyLang('Address')} />,
        content: address
      }
    ]

    const _bonus_HANG_HOA = [
      {
        title: (
          <span className='text-primary'>
            <FormattedMessage id={getKeyLang('InsCommodity')} />
          </span>
        )
      },
      {
        msgField: (
          <span>
            {' '}
            <FormattedMessage id={getKeyLang('grossTon')} />
          </span>
        ),
        content: load
      }
    ]

    if (true) {
      _rows.push(..._owner_info)
    }
    if (true) {
      _rows.push(..._insurance_info)
    }

    if (true) {
      _rows.push(..._bonus_TNDS_TN)
    }
    if (true) {
      _rows.push(..._bonus_TAI_NAN_LAI)
    }
    if (true) {
      _rows.push(..._bonus_HANG_HOA)
    }

    return (
      <div style={{ padding: '4px' }}>
        <ExpandableTable rows={_rows} />
      </div>
    )
  }

  return (
    <TreeTable
      columns={columns}
      data={_data_for_columns}
      SubComponent={SubComponent}
    />
  )
}

export default CustomTable
