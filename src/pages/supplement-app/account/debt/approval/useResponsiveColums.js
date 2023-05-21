import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { getKeyLang } from '../../../../../configs/supplement-app'
import { Button, useDeviceDetect } from 'base-app'
import { Table } from 'reactstrap'
import * as Icon from 'react-feather'
import styled from 'styled-components'
import { findChildInParrent } from './utility'
import RejectModal from './RejectModal'

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

const createChangedContentsCol = (intl, original, device) => {
    const _changedProps = original.changed.changedProps
    const changedNameMap = {
        transactionLimit: intl.formatMessage({ id: getKeyLang("account.debtManagement.transactionLimit") }),
        dailyLimit: intl.formatMessage({ id: getKeyLang("account.debtManagement.dailyLimit") }),
        monthlyLimit: intl.formatMessage({ id: getKeyLang("account.debtManagement.monthlyLimit") }),
        dueDateType: intl.formatMessage({ id: getKeyLang("account.dueDateType") }),
        dueValue: intl.formatMessage({ id: getKeyLang("account.dueValue") }),
    }

    const dueDateMap = {
        "FIFTH_DAY": intl.formatMessage({ id: getKeyLang("account.dueDateType.fifthday") }),
        "DAY_30TH": intl.formatMessage({ id: getKeyLang("account.dueDateType.day30th") }),
    }

    if (Array.isArray(_changedProps) && _changedProps.length > 0) {
        return (
            <>
                {
                    _changedProps.map((elt, index) => {
                        return (
                            <div key={`${index}`} className={`${device.isMobile ? "" : "d-flex"}`}>
                                <div className={`mr-1`}>{changedNameMap[elt.name]}</div>
                                <div style={{ textDecoration: "line-through" }} className="text-danger mr-1">
                                    {
                                        !isNaN(Number(elt.oldVal)) ?
                                            <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(elt.oldVal)}</span>
                                            : dueDateMap[elt.oldVal]
                                    }
                                </div>
                                <>&#8702;</>
                                <div className="text-primary ml-1" >
                                    {
                                        !isNaN(Number(elt.newVal)) ?
                                            <span>{Intl.NumberFormat(intl.locale === 'vi' ? 'vn' : 'es').format(elt.newVal)}</span>
                                            : dueDateMap[elt.newVal]
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    return (
        <div>
            {intl.formatMessage({ id: getKeyLang("account.create.new") })}
        </div>
    )
}

const useResponsiveColums = (suggestions, onClickApprove, reActiveLoadApi) => {
    const intl = useIntl()
    const device = useDeviceDetect()

    return (
        {
            responsiveColums: [
                {
                    Header: <FormattedMessage id={getKeyLang('account.debtManagement.partnerCode')} />,
                    id: "partnerCode",
                    minWidth: 90,
                    Cell: ({ original }) => {
                        const found = findChildInParrent(Number(original.userId), suggestions)
                        return (
                            <div>
                                {found.userCode}
                            </div>
                        )
                    }
                },
                {
                    Header: <FormattedMessage id={getKeyLang('account.debtManagement.partnerName')} />,
                    id: "partnerName",
                    minWidth: 120,
                    Cell: ({ original }) => {
                        const found = findChildInParrent(Number(original.userId), suggestions)
                        return (
                            <div>
                                {found.fullName}
                            </div>
                        )
                    }
                },
                {
                    Header: <FormattedMessage id={getKeyLang('bonus.action')} />,
                    id: 'action',
                    sortable: false,
                    filterable: false,
                    Cell: ({ original }) => {
                        const [isModalOpen, setModalOpen] = useState(false)
                        const handleRejectClick = () => {
                            setModalOpen(true)
                        }
                        const closeModal = () => {
                            setModalOpen(false)
                        }

                        return (
                            <div className="d-flex justify-content-center">
                                <Button
                                    size='sm'
                                    onClick={() => onClickApprove(original)}
                                    className='btn-icon rounded-circle'
                                    color='flat-success'
                                >
                                    <Icon.Check className='vx-icon' size={24} />
                                </Button>
                                <Button
                                    size='sm'
                                    onClick={handleRejectClick}
                                    className='ml-2 btn-icon rounded-circle'
                                    color='flat-danger'
                                >
                                    <Icon.X className='vx-icon' size={24} />
                                </Button>
                                <RejectModal
                                    original={original} isModalOpen={isModalOpen}
                                    closeModal={closeModal} reActiveLoadApi={reActiveLoadApi}
                                />
                            </div>
                        )
                    }
                }
            ],

            ReponsiveExpandableTable: ({ data }) => {
                const found = findChildInParrent(Number(data.userId), suggestions)
                return (
                    <Table size="sm" bordered>
                        <tbody>
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.phoneNumber')} />
                                </TdStyled>
                                <td className="text-left">
                                    {found.phoneNumber}
                                </td>
                            </tr>
                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.debtManagement.email')} />
                                </TdStyled>
                                <td className="text-left">
                                    <TextWrap>
                                        {found.email}
                                    </TextWrap>
                                </td>
                            </tr>
                            {
                                found.address ?
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
                                    {intl.formatMessage({ id: getKeyLang("account.debtApproval.changedContents") })}
                                </TdStyled>
                                <td className="text-left">
                                    {createChangedContentsCol(intl, data, device)}
                                </td>
                            </tr>

                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('account.applyDate')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        {
                                            intl.formatDate(data.applyDate)
                                        }
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('createdDate')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        {
                                            intl.formatDate(data.createdDate)
                                        }
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <TdStyled className="text-left">
                                    <FormattedMessage id={getKeyLang('updatedDate')} />
                                </TdStyled>
                                <td className="text-right">
                                    <div>
                                        {
                                            intl.formatDate(data.updateDate)
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

export default useResponsiveColums
