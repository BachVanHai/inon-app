import { Radio } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { Media, Table } from 'reactstrap'
import styled from 'styled-components'
import { intlConvertToVnd } from '../../../../../../ultity'
import { ARR_COMPANIES, getDefault_updateCompanyIdContractObj, updateCompanyId, _BSH_INSURANCE } from './utility'
const TdStyled = styled.td`
  width: 5%;
`
const ImageWidth = styled.div`
  width: 18%;
`
const TitleWidth = styled.div`
  width: ${(p) => (p.width ? p.width : '82%')};
`
const TdLogoCoupon = styled.td`
  width: 60%;
`

const TableStyled = styled(Table)`
  border-top: ${(props) =>
    props.isneedbordertop === 'true' ? 'solid #dadada 1px' : '0px'};
  margin-bottom: ${(props) => (props.isneedmb === 'true' ? '14px' : '0')};
  height: 100px;
`
const FeeStyled = styled.span`
  font-weight: 700;
  margin-top: 10px;
  line-height: 100px;
  font-size: 1.1rem;
`
const CalFeeDone = ({
  companyId,
  contractId,
  feeInsurance,
  dispatch ,
  contractInfo,
  step_1,
  companiesData
}) => {
  const intl = useIntl()
  return (
    <>
        <div>
          <TableStyled
            isneedbordertop={'false'}
            borderless
          >
            <tbody>
              <tr>
                <TdLogoCoupon>
                  <div className='d-flex justify-content-start align-items-center'>
                    <ImageWidth className='d-flex justify-content-md-center mr-1'>
                      <Media
                        object
                        className='rounded'
                        src={_BSH_INSURANCE.image}
                        alt='Generic placeholder image'
                        height={'50px'}
                      />
                    </ImageWidth>

                    <TitleWidth className='user-page-info d-none d-md-none d-lg-block'>
                      <p className='font-medium-2 text-bold-600 custom-remove-margin'>
                        {_BSH_INSURANCE.nameDetail}
                      </p>
                    </TitleWidth>
                  </div>
                </TdLogoCoupon>

                <td className='float-right'>
                  <FeeStyled className=''>
                  {intlConvertToVnd(
               companiesData.feeInsurance,
                intl
              )}
                    <span>&nbsp;</span>
                    VND
                  </FeeStyled>
                </td>
              </tr>
            </tbody>
          </TableStyled>
          <TitleWidth className='d-flex d-md-none' width='100%'>
            <p className='font-medium-1 text-bold-600'>{companiesData.nameDetail}</p>
          </TitleWidth>
        </div>
    </>
  )
}

export default CalFeeDone
