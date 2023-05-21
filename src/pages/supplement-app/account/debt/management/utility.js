import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { getKeyLang, filterMethod, intlConvertToVnd, addAppContextPath } from '../../../../../configs/supplement-app'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import styled from 'styled-components'
import { DAY_30TH, FIFTH_DAY } from '../edit/utility'
import { getCompanyById } from '../../../../../configs/insurance-app'

const TextWrap = styled.div`
-ms-word-break: break-all;
word-break: break-all;
word-break: break-word;
-webkit-hyphens: auto;
-moz-hyphens: auto;
hyphens: auto;
`

const TdStyled = styled.td`
background-color: #c3c3c3;
color: white;
`

export const PARTNER_DEBT = "partner-debt"
export const PERSONAL_DEBT = "personal-debt"
export const ALL_DEBT = "all-debt"

export const URL_PARTNER_DEBT = "/debt/partner-debt"
export const URL_PERSONAL_DEBT = "/debt/personal-debt"
export const URL_ALL_DEBT = "/debt/all-debt"

export const useResponsiveColums = (detailLink = "/debt/all-debt", availableUsersSuggestions) => {
    const intl = useIntl()

    const dueDateTypes = {
        DAY_30TH: {
            value: 1,
            type: DAY_30TH,
            label: intl.formatMessage({ id: getKeyLang("account.dueDateType.day30th") }),
        },
        FIFTH_DAY: {
            value: 2,
            type: FIFTH_DAY,
            label: intl.formatMessage({ id: getKeyLang("account.dueDateType.fifthday") }),
        }
    }

    return (
        {
            responsiveColums: [
                {
                    Header: <FormattedMessage id={getKeyLang('account.debtManagement.partnerCode')} />,
                    id: "partnerCode",
                    accessor: 'usersDTO.userCode',
                    filterable: true,
                    filterMethod: filterMethod,
                },
                {
                    Header: <FormattedMessage id={getKeyLang('account.debtManagement.partnerName')} />,
                    id: "partnerName",
                    accessor: 'usersDTO.fullName',
                    filterable: true,
                    filterMethod: filterMethod,
                },
                {
                    Header: <FormattedMessage id={getKeyLang('account.debtManagement.currentDebt')} />,
                    id: "currentDebt",
                    Cell: ({ original }) => {
                        return (
                            <div className="d-flex justify-content-end">
                                <span>
                                    {
                                        intlConvertToVnd(
                                            original.currentDebt, intl
                                        )
                                    }
                                </span>
                            </div>
                        )
                    }
                },
            ],
            ReponsiveExpandableTable: ({ data }) => {
                let found
                if (availableUsersSuggestions) {
                    found = availableUsersSuggestions.find(aElt => aElt.id === data.usersDTO.id)
                }
                return (
                    <Table size="sm" bordered>
                        <tbody>
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.phoneNumber')} />
                                </TdStyled>
                                <td className="text-left">
                                    {data.usersDTO.phoneNumber}
                                </td>
                            </tr>
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.email')} />
                                </TdStyled>
                                <td className="text-left">
                                    <TextWrap>
                                        {data.usersDTO.email}
                                    </TextWrap>
                                </td>
                            </tr>
                            {
                                found ?
                                    <tr>
                                        <TdStyled className="text-left">
                                            <FormattedMessage id={getKeyLang('account.debtManagement.address')} />
                                        </TdStyled>
                                        <td className="text-left">
                                            <TextWrap>
                                                {found.address}
                                            </TextWrap>
                                        </td>
                                    </tr>
                                    :
                                    null
                            }
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.monthlyLimit')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(data.monthlyLimit)}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.dailyLimit')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(data.dailyLimit)}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.transactionLimit')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(data.transactionLimit)}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtContractsList')} />
                                </TdStyled>
                                <td className="text-left">
                                    <Link
                                        to={addAppContextPath(`${detailLink}/${data.usersDTO.id}`)} style={{ fontSize: "1em", textDecoration: "underline" }}
                                        className="d-flex align-items-center text-primary cursor-pointer font-italic">
                                        {intl.formatMessage({ id: getKeyLang(`account.detail`) })}
                                    </Link>
                                </td>
                            </tr>

                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('dueDate')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        {
                                            intl.formatDate(data.dueDate)
                                        }
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.dueDateType')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        {
                                            dueDateTypes[(data.dueDateType)].label
                                        }
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.dueDateType.day30th')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        {
                                            Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(data.dueValue)
                                        }
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('totalDebt')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        {
                                            intlConvertToVnd(
                                                data.totalDebt, intl
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }
        }
    )
}

export const getInsurCompanyName = (contractInfo) => {
    const { companyId } = contractInfo
    const foundCompany = getCompanyById(companyId)
    if (foundCompany) {
        return foundCompany.name
    }
    return ""
}