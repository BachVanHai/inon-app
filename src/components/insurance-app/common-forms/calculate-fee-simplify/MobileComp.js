import React from 'react'
import { FormattedMessage, AppId, Button, } from 'base-app'
import { Row, Col, Table, Label, Media, TabPane, Popover, FormGroup, CustomInput, PopoverBody, PopoverHeader } from "reactstrap"
import styled from 'styled-components'
import { KEY_TOTAL_FEE } from './CalFeeDone'

const TdStyled = styled.td`
    width: 5%;
`
const DivStyled = styled.div`
    border-top: ${props => props.isneedbordertop === "true" ? "solid #dadada 1px" : "0px"};
    margin-bottom: ${props => props.isneedmb === "true" ? "14px" : "0"};
    padding: 1.1rem .8rem 1.1rem .8rem;
`

const MobileComp = ({ className, dataFees, popovers, isNeedRadio, handleRadioClick, checks, getInsurenceCompanyMap, togglePopover, getDetailFeeInfo }) => {
    return (
        <div className={"custom-card-mobile " + className}>
            {
                dataFees.map((elt, index) => {
                    return (
                        <DivStyled
                            key={index}
                            isneedbordertop={index === 0 ? "false" : "true"}
                            className={`${index === 0 ? "mb-1" : ""}`}
                        >
                            <Table className="custom-padding-table custom-remove-margin" borderless >
                                <tbody className="mb-1">
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

                                        <td>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <Media
                                                    className="rounded mr-2"
                                                    object
                                                    src={getInsurenceCompanyMap(elt.companyName).logo}
                                                    alt="Generic placeholder image"
                                                    width={"60px"}
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="user-page-info">
                                                <p className="text-bold-600 custom-remove-margin">
                                                    {
                                                        getInsurenceCompanyMap(elt.companyName).title
                                                    }
                                                </p>
                                                <div className="font-small-2" style={{ marginTop: ".5rem", lineHeight: "1rem" }}>
                                                    <FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.CouponNote`} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <label className="react-toggle-wrapper w-100 d-flex justify-content-between mt-1">
                                <label style={{ marginLeft: ".9rem" }}>
                                    {
                                        getDetailFeeInfo(elt).find(elt => elt.id === KEY_TOTAL_FEE)?.value
                                    }
                                    <span>&nbsp;</span>
                                    VND
                                </label>
                                <Button.Ripple
                                    id={elt.companyName}
                                    size="sm" className="remove-padding d-flex justify-content-end"
                                    color="primary" outline
                                    onClick={togglePopover.bind(null, elt.companyName)}
                                    style={{ marginRight: "1.2rem" }}
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
                                                        .map(item => {
                                                            if (item.id === KEY_TOTAL_FEE) {
                                                                return null
                                                            }
                                                            return (
                                                                <tr key={item.value}>
                                                                    <td>
                                                                        {item.name}
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
                            </label>
                        </DivStyled>
                    )
                })
            }
        </div>
    )
}

export default MobileComp