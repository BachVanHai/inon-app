import { FormattedMessage, Radio } from 'base-app'
import React from 'react'
import { useIntl } from 'react-intl'
import { Media, Table } from 'reactstrap'
import styled from 'styled-components'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { intlConvertToVnd } from '../../../../../../ultity'

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
const CalFeeDone = ({ companiesData }) => {
  const intl = useIntl()
  return (
    <>
      {companiesData.map((elt, index) => (
        <div key={index}>
          <TableStyled
            isneedbordertop={index === 0 ? 'false' : 'true'}
            borderless
          >
            <tbody>
              <tr>
                {/* <TdStyled>
                  <Radio checked={elt.companyId === '06'} />
                </TdStyled> */}
                <TdLogoCoupon>
                  <div className='d-flex justify-content-start align-items-center'>
                    <ImageWidth className='d-flex justify-content-md-center mr-1'>
                      <Media
                        object
                        className='rounded'
                        src={elt.logo}
                        alt='Generic placeholder image'
                        height={`${
                          elt.companyId === '06'
                            ? '50px'
                            : elt.companyId === '01'
                            ? '50px'
                            : 40
                        }`}
                      />
                    </ImageWidth>

                    <TitleWidth className='user-page-info d-none d-md-none d-lg-block'>
                      <p className='font-medium-2 text-bold-600 custom-remove-margin'>
                        <FormattedMessage id={getKeyLang(elt?.nameDetail)} />
                      </p>
                    </TitleWidth>
                  </div>
                </TdLogoCoupon>

                <td className='float-right'>
                  <FeeStyled className=''>
                    {intlConvertToVnd(elt.totalFeeInsurance, intl)}
                    <span>&nbsp;</span>
                    VND
                  </FeeStyled>
                </td>
              </tr>
            </tbody>
          </TableStyled>
          <TitleWidth className='d-flex d-md-none' width='100%'>
            <p className='font-medium-1 text-bold-600 text-center'>
              <FormattedMessage id={getKeyLang(elt?.nameDetail)} />
            </p>
          </TitleWidth>
        </div>
      ))}
    </>
  )
}

export default CalFeeDone
