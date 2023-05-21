import React from 'react'
import { FormattedMessage } from 'base-app'
import { useIntl } from 'react-intl'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../../../configs/insurance-app'
import {
  APARTMENT,
  CCCD,
  CMT,
  convertTime,
  HOCHIEU,
  OTHER,
  OWNER,
  TOWNHOUSE
} from '../../../utility'
import { intlConvertToVnd } from '../../../../../../../ultity'
export const TdStyled = styled.td`
  background-color: #ecf0f1;
  color: #000;
  width: 30%;
`
const ColumnsTable = () => {
  const intl = useIntl()
  const getTypeHouseOwner = (type) => {
    switch (type) {
      case OWNER:
        return {
          component: <FormattedMessage id={getKeyLang('houseOwner')} />,
          content: intl.formatMessage({ id: getKeyLang(`houseOwner`) })
        }
      case OTHER:
        return {
          component: <FormattedMessage id={getKeyLang('hiredPerson')} />,
          content: intl.formatMessage({ id: getKeyLang(`hiredPerson`) })
        }
      default:
        return null
    }
  }
  const getIcType = (type) => {
    switch (type) {
      case CCCD:
        return {
          component: <FormattedMessage id={getKeyLang('IDCCCD')} />,
          content: intl.formatMessage({ id: getKeyLang(`IDCCCD`) })
        }
      case CMT:
        return {
          component: <FormattedMessage id={getKeyLang('IDCMND')} />,
          content: intl.formatMessage({ id: getKeyLang(`IDCMND`) })
        }
      case HOCHIEU:
        return {
          component: <FormattedMessage id={getKeyLang('IDHC')} />,
          content: intl.formatMessage({ id: getKeyLang(`IDHC`) })
        }
      default:
        return null
    }
  }
  const getHouseType = (type) => {
    switch (type) {
      case APARTMENT:
        return {
          component: <FormattedMessage id={getKeyLang('apartment')} />,
          content: intl.formatMessage({ id: getKeyLang(`apartment`) })
        }
      case TOWNHOUSE:
        return {
          component: (
            <FormattedMessage
              id={getKeyLang('insurance.personalInsurance.townHouse')}
            />
          ),
          content: intl.formatMessage({
            id: getKeyLang(`insurance.personalInsurance.townHouse`)
          })
        }
      case OTHER:
        return {
          component: <FormattedMessage id={getKeyLang('Other')} />,
          content: intl.formatMessage({ id: getKeyLang(`Other`) })
        }
      default:
        return null
    }
  }
  const getCoverage = (type) => {
    switch (type) {
      case 'BASIC':
        return {
          component: <FormattedMessage id={getKeyLang('basic')} />,
          content: intl.formatMessage({ id: getKeyLang(`basic`) })
        }
      case 'OVERVIEW':
        return {
          component: <FormattedMessage id={getKeyLang('overall')} />,
          content: intl.formatMessage({
            id: getKeyLang(`overall`)
          })
        }
      default:
        return null
    }
  }
  return {
    Table: ({ data }) => {
      return [
        <div>
          {/* ====== 1 ==== */}
          <div className='d-flex justify-content-start font-weight-bold pt-1 pb-1 text-uppercase '>
            <FormattedMessage id={getKeyLang('insuranceBeneInfo')} />
          </div>
          <Table>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.icType')}
                />
              </TdStyled>
              <td className='text-left'>{getIcType(data.icType).component}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('idPers')} />
              </TdStyled>
              <td className='text-left'>{data?.icNo}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.icfDate')}
                />
              </TdStyled>
              <td className='text-left'>{convertTime(data?.issDate)}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('IdPlace')} />
              </TdStyled>
              <td className='text-left'>{data?.issPlace}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('PartnerPhone')} />
              </TdStyled>
              <td className='text-left'>{data?.telephone}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('Email')} />
              </TdStyled>
              <td className='text-left'>{data?.email}</td>
            </tr>
          </Table>
          {/* ===== 2 ===== */}
          <div className='d-flex justify-content-start font-weight-bold pt-1 pb-1'>
            <span className='text-uppercase'>Thông tin ngôi nhà</span>
          </div>
          <Table>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('contract.personalHome.houseType')}
                />
              </TdStyled>
              <td className='text-left'>
                {getHouseType(data?.houseType).component}
              </td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.userTime')}
                />
              </TdStyled>
              <td className='text-left'>{data?.usedTime} Năm</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('contract.personalHome.houseAddress')}
                />
              </TdStyled>
              <td className='text-left'>{data?.houseAddress}</td>
            </tr>
          </Table>
          <div className='d-flex justify-content-start font-weight-bold text-uppercase pt-1 pb-1'>
            <span>Thông tin bảo hiểm</span>
          </div>
          <Table>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.rangeInsurance')}
                />
              </TdStyled>
              <td className='text-left'>{data?.duration} tháng</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.startDateInsurance')}
                />
              </TdStyled>
              <td className='text-left'>{convertTime(data?.startedDate)}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.rangeIndemnify')}
                />
              </TdStyled>
              <td className='text-left'>{intlConvertToVnd(data?.materialLiability , intl)} VNĐ</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('coverage')} />
              </TdStyled>
              <td className='text-left'>
                {getCoverage(data?.coverage).component}
              </td>
            </tr>
          </Table>{' '}
          {/* ====== 3 ====== */}
          <div className='d-flex justify-content-start font-weight-bold text-uppercase  pt-1 pb-1'>
            <span>Bảo hiểm tài sản bên trong ngôi nhà</span>
          </div>
          <Table>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.rangeIndemnify')}
                />
              </TdStyled>
              <td className='text-left'>{intlConvertToVnd(data?.assetLiability , intl)} VNĐ</td>
            </tr>
          </Table>
          {/* ====== 4 ====== */}
          <div className='d-flex justify-content-start font-weight-bold text-uppercase  pt-1 pb-1'>
            <span>Bảo hiểm vật chất bên trong ngôi nhà</span>
          </div>
          <Table>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.rangeIndemnify')}
                />
              </TdStyled>
              <td className='text-left'>{intlConvertToVnd(data?.assetLiability , intl)} VNĐ</td>
            </tr>
          </Table>
          {/* ===== 5 ===== */}
          <div className='d-flex justify-content-start font-weight-bold text-uppercase  pt-1 pb-1'>
            <span>Chuyển quyền thụ hưởng qua ngân hàng</span>
          </div>
          <Table>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.bankName')}
                />
              </TdStyled>
              <td>{data?.bankName === "0" ? "-" : data?.bankName }</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.branchName')}
                />
              </TdStyled>
              <td>{data?.bankBranch === "0" ? "-" : data?.bankBranch}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage id={getKeyLang('Address')} />
              </TdStyled>
              <td>{data?.bankAddress === "0" ? "-" : data?.bankAddress}</td>
            </tr>
            <tr>
              <TdStyled className='text-left'>
                <FormattedMessage
                  id={getKeyLang('insurance.personalHome.AmountAlter')}
                />
              </TdStyled>
              <td>{data?.transferLevel === "0" ? "-" : data?.transferLevel}</td>
            </tr>
          </Table>
        </div>
      ]
    },
    columns: [
      {
        Header: <FormattedMessage id={getKeyLang('insuredPerson')} />,
        accessor: 'houseOwnerType',
        maxWidth: 200,
        Cell: ({ original }) => {
          return getTypeHouseOwner(original.houseOwnerType).component
        }
      },
      {
        Header: <FormattedMessage id={getKeyLang('fullName')} />,
        accessor: 'fullName',
        maxWidth: 250,
      },
      {
        Header: (
          <FormattedMessage
            id={getKeyLang('insurance.personalHome.personAddressInsurance')}
          />
        ),
        accessor: 'address'
      }
    ]
  }
}

export default ColumnsTable
