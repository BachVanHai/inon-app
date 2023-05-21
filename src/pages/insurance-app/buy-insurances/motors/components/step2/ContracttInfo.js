import React from 'react'
import { Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { getTextClassesBy } from '../../../../../../components/insurance-app/common-forms/title-row/TitleRow'
import { COMPANIES, getKeyLang } from '../../../../../../configs/insurance-app'
import { FormGroup } from 'reactstrap'
import { Check } from 'react-feather'
import RadioVuexy from '../../../../../../components/insurance-app/radio/RadioVuexy'
import CustomTable from './components/CustomTable'
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesMotors'
import { BASE } from '../../../../../../redux/reducers/insurance-app/buyInsurancesMotors'
import { getDefault_updateContractForCompanyId, updateContract } from './utility'

const ContracttInfo = ({ dispatch, className, companyId, contractGroupId, contracttInfo }) => {
    const radioChange = (e) => {
        const _companyId = e.target.value
        dispatch(updateProps([
            {
                prop: BASE.KEY_COMPANY_ID,
                value: _companyId
            }
        ]))

        dispatch(
            updateContract(
                getDefault_updateContractForCompanyId(contracttInfo, _companyId)
            )
        )
    }

    return (
        <div className={className}>
            <Row className="mb-1">
                <Col xs={4} md={4}>
                    <span className={"font-medium-4 font-weight-bold text-primary-highlight letter-uppercase"}>
                        <FormattedMessage id={getKeyLang(`contractsParcel`)} />
                    </span>
                </Col>
            </Row>

            <Row className="mb-1">
                <Col xs={6} md={6}>
                    <span className={getTextClassesBy("s")}>
                        <FormattedMessage id={getKeyLang(`contractCode`)} />
                    </span>
                    :
                    <span>&nbsp;</span>
                    <span className={getTextClassesBy("s")}>
                        {contractGroupId || ""}
                    </span>
                </Col>
            </Row>

            <Row className="mb-1">
                <Col xs={6} md={6}>
                    <span className={"font-medium-4 font-weight-bold text-primary-highlight letter-uppercase"}>
                        <FormattedMessage id={getKeyLang(`selectInsuranceCompanies`)} />
                    </span>
                </Col>
            </Row>

            <Row>
                <Col xs={4} md={4}>
                    <FormGroup >
                        <RadioVuexy
                            label={"BSH"}
                            name={"company"}
                            color='success successPayment'
                            icon={<Check className='vx-icon' size={16} />}
                            value={COMPANIES[0].companyId}
                            defaultChecked={COMPANIES[0].companyId === companyId}
                            onChange={radioChange}
                        />
                    </FormGroup>
                </Col>

                <Col xs={4} md={4}>
                    <FormGroup >
                        <RadioVuexy
                            label={"PTI"}
                            name={"company"}
                            color='success successPayment'
                            icon={<Check className='vx-icon' size={16} />}
                            value={COMPANIES[4].companyId}
                            defaultChecked={COMPANIES[4].companyId === companyId}
                            onChange={radioChange}
                        />
                    </FormGroup>
                </Col>

                <Col xs={4} md={4}>
                    <FormGroup >
                        <RadioVuexy
                            label={"XTI"}
                            name={"company"}
                            color='success successPayment'
                            icon={<Check className='vx-icon' size={16} />}
                            value={COMPANIES[3].companyId}
                            defaultChecked={COMPANIES[3].companyId === companyId}
                            onChange={radioChange}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row className="mb-1">
                <Col xs={6} md={6}>
                    <span className={"font-medium-4 font-weight-bold text-primary-highlight letter-uppercase"}>
                        <FormattedMessage id={getKeyLang(`insuranceInfo`)} />
                    </span>
                </Col>
            </Row>

            <CustomTable
                contracttInfo={contracttInfo}
            />
        </div >
    )
}

export default ContracttInfo