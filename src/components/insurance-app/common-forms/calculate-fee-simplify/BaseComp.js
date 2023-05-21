import React from 'react'
import { FormattedMessage, AppId, Button, } from 'base-app'
import { Table, Label, Media, TabPane, Popover, FormGroup, CustomInput, PopoverBody, PopoverHeader } from "reactstrap"
import styled from 'styled-components'
import { KEY_TOTAL_FEE } from './CalFeeDone'

const TdStyled = styled.td`
width: 5%;
`
const ImageWidth = styled.div`
width: 18%;
`
const TitleWidth = styled.div`
width: 82%;
`
const TdLogoCoupon = styled.td`
width: 60%;
`

const TableStyled = styled(Table)`
border-top: ${props => props.isneedbordertop === "true" ? "solid #dadada 1px" : "0px"};
margin-bottom: ${props => props.isneedmb === "true" ? "14px" : "0"};
`

const BaseComp = ({ className, dataFees, popovers, isNeedRadio, handleRadioClick, checks, getInsurenceCompanyMap, togglePopover, getDetailFeeInfo }) => {

    return (
        <div className={"custom-card " + className}>
            {
                dataFees.map((elt, index) => {
                    return (
                        <TableStyled
                            isneedmb={index === dataFees.length - 1 ? "false" : "true"}
                            isneedbordertop={index === 0 ? "false" : "true"}
                            borderless
                            key={index}
                        >
                            <tbody>
                                <tr>
                                    {
                                        isNeedRadio ?
                                            <TdStyled>
                                                <FormGroup check>
                                                    <Label check>
                                                        <CustomInput
                                                            id={`custom-input-` + elt.companyName}
                                                            type="radio" name="custom-radio"
                                                            onChange={handleRadioClick(elt)}
                                                            checked={checks.find(check => check.companyName === elt.companyName)?.isChecked}
                                                        />
                                                    </Label>
                                                </FormGroup>
                                            </TdStyled>
                                            :
                                            null
                                    }
                                    <TdLogoCoupon>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <ImageWidth className="d-flex justify-content-md-center mr-1">
                                                <Media
                                                    object
                                                    className="rounded"
                                                    src={getInsurenceCompanyMap(elt.companyName).logo}
                                                    alt="Generic placeholder image"
                                                    height={`${elt.companyName === 'PVI' ? "50px" :  elt.companyName === 'XTI' ? "70px" : "40px" }`}
                                                />
                                            </ImageWidth>

                                            <TitleWidth className="user-page-info">
                                                <p className="font-medium-2 text-bold-600 custom-remove-margin">
                                                    {
                                                        getInsurenceCompanyMap(elt.companyName).title
                                                    }
                                                </p>
                                                <span className="font-small-1">
                                                    <FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.CouponNote`} />
                                                </span>
                                            </TitleWidth>
                                        </div>
                                    </TdLogoCoupon>

                                    <td className="d-flex float-right">
                                        <label className="d-flex align-items-center mr-2">
                                            {
                                                getDetailFeeInfo(elt).find(elt => elt.id === KEY_TOTAL_FEE)?.value
                                            }
                                            <span>&nbsp;</span>
                                            VND
                                        </label>

                                        <TabPane>
                                            <Button.Ripple
                                                id={elt.companyName}
                                                color="primary" outline onClick={togglePopover.bind(null, elt.companyName)}
                                                className={`${elt.companyName}`}
                                            >
                                                <FormattedMessage id={`${AppId.INSURANCE_APP}.Detail`} />
                                            </Button.Ripple>
                                            <Popover
                                                target={elt.companyName}
                                                placement="top"
                                                isOpen={popovers.find(pop => pop.companyName === elt.companyName)?.isOpen}
                                                toggle={togglePopover.bind(null, elt.companyName)}
                                            >
                                                <PopoverHeader> <FormattedMessage id={`${AppId.INSURANCE_APP}.DetailFee`} /></PopoverHeader>
                                                <PopoverBody>
                                                    <Table className="custom-padding-table margin-bottom-14" borderless responsive>
                                                        <tbody>
                                                            {
                                                                getDetailFeeInfo(elt)
                                                                    .map((item, index) => {
                                                                        if (item.id === KEY_TOTAL_FEE) {
                                                                            return null
                                                                        }
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    {item.name}:
                                                                                </td>
                                                                                <td>
                                                                                    {item.value}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </PopoverBody>
                                            </Popover>
                                        </TabPane>
                                    </td>
                                </tr>
                            </tbody>
                        </TableStyled>
                    )
                })
            }
        </div>
    )
}

export default BaseComp