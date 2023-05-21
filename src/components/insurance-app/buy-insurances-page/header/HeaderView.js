import '../../../../assets/scss/insurance-app/buy-insurances/buyInsurances.scss'
import React from 'react'
import { Nav, NavItem, NavLink, Label } from "reactstrap"
import classnames from 'classnames'
import { useLocation } from 'react-router-dom'
import { getNameFromLocationPath } from './utility'

const HeaderView = ({ stepsMap, activeStep, reduxStateName, ...p }) => {
    let { pathname } = useLocation() // example pathname: "/insurance/buy-insurances/motors"

    return (
        <div {...p}>
            <div className="font-weight-bold primary mb-2">
                <span>{"Mua bảo hiểm ->"}</span>
                <span>&nbsp;</span>
                {
                    getNameFromLocationPath(pathname)
                }
            </div>

            <Nav className={`buy-insurances justified`} tabs>
                {
                    stepsMap.map((step, index) => {
                        return (
                            <NavItem className="step-wrapper" key={index}>
                                <NavLink className={classnames(`step step-${1}`, {
                                    "active": activeStep === step.id,
                                    "done": step.id < activeStep,
                                })
                                }
                                >
                                    <span className="step-text ">
                                        {step.id}
                                    </span>
                                </NavLink>
                                <Label className="d-flex justify-content-center font-weight-bold text-primary letter-uppercase text-center">
                                    {
                                        index + 1 === activeStep &&
                                        step.title
                                    }
                                </Label>
                            </NavItem>
                        )
                    })
                }
            </Nav>
        </div>
    )
}

export default HeaderView