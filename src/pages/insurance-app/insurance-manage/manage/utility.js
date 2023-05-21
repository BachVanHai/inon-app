import React from 'react'
import { DATE_FORMAT, PAYMENT_TYPE_DEBT, PAYMENT_TYPE_FUND_TRANSFER, TEXT_NO_VALUE } from "../../../../components/insurance-app/buy-insurances-page/formik-config"
import * as _ from "../../../../ultity"
import { FormattedMessage, Button, BaseAppUltils, HttpClient } from 'base-app'
import { FICO_MANAGER_ID, getKeyLang } from "../../../../configs/insurance-app"
import { SUCCESS, FAIL, NOT_COMPLETE, PENDING, REJECT, APPROVAL, TIMEOUT, CANCEL, CANCELING } from './formikConfig'
import { Row, Col, Table } from 'reactstrap'
import moment from 'moment'
const renderImages = (photoDetail , refByUser) => {
    const renderImage = (fieldName, msgField) => {
        return (
            <Row className="margin-bottom-14">
                <Col sm="12" className="d-flex align-items-center justify-content-center mb-2 mb-md-0">
                    <img
                        className="img-fluid rounded-sm mb-2 d-flex justify-content-center"
                        src={HttpClient.defaults.baseURL + "/nth/file/api/file?contractId=" + photoDetail.id + "&docType=" + fieldName}
                    />
                </Col>
                <Col sm="12">
                    <label className="d-flex justify-content-center font-medium-1 text-bold-600"><FormattedMessage id={msgField} /></label>
                </Col>
            </Row>
        )
    }
    const renderImageByFicoCustomer = () =>{
       return (
        <Row>
        <Col sm="12">
            {renderImage("uploadRegisterCar", getKeyLang("UploadRegisterCar"))}
        </Col>
        <Col sm="12">
            {renderImage("uploadTemCar", getKeyLang("UploadTemCar"))}
        </Col>
        <Col sm="12">
            {renderImage("uploadChassisNumber", getKeyLang("ChassisNumber"))}
        </Col>
        <Col sm="12">
            {renderImage("uploadBeforeMainSeatCar", getKeyLang("UploadBeforeMainSeatCar"))}
        </Col>
        <Col sm="12">
            {renderImage("uploadBeforeSubSeatCar", getKeyLang("UploadBeforeSubSeatCar"))}
        </Col>
        <Col sm="12">
            {renderImage("uploadAfterMainSeatCar", getKeyLang("UploadAfterMainSeatCar"))}
        </Col>
        <Col sm="12">
            {renderImage("uploadAfterSubSeatCar", getKeyLang("UploadAfterSubSeatCar"))}
        </Col>
    </Row>
       )
    }
    return {
        isOpen: true,
        title: "Thông tin ảnh hồ sơ",
        content: (
            <div className="d-flex justify-content-center">
                {
                    // if manager id 14625 => show all image contract
                    refByUser === FICO_MANAGER_ID ? renderImageByFicoCustomer() : photoDetail !== null ?
                    photoDetail.vehicles[0].vehicleStatus !== 'OLD' ?
                        <Row>
                            <Col sm="12">
                                {renderImage("uploadRegisterCar", getKeyLang("UploadRegisterCar"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadTemCar", getKeyLang("UploadTemCar"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadChassisNumber", getKeyLang("ChassisNumber"))}
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col sm="12">
                                {renderImage("uploadRegisterCar", getKeyLang("UploadRegisterCar"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadTemCar", getKeyLang("UploadTemCar"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadChassisNumber", getKeyLang("ChassisNumber"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadBeforeMainSeatCar", getKeyLang("UploadBeforeMainSeatCar"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadBeforeSubSeatCar", getKeyLang("UploadBeforeSubSeatCar"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadAfterMainSeatCar", getKeyLang("UploadAfterMainSeatCar"))}
                            </Col>
                            <Col sm="12">
                                {renderImage("uploadAfterSubSeatCar", getKeyLang("UploadAfterSubSeatCar"))}
                            </Col>
                        </Row> : null
                }
            </div>
        )
    }
}

export const renderLable = (latestApprovalStatus, isTextCenter = true) => {
    const renderlatestApprovalStatus = () => {
        switch (latestApprovalStatus) {
            case SUCCESS:
                return (
                    <div className='badge badge-pill badge-light-success'>
                        <FormattedMessage id={getKeyLang(`InsuSUCCESS`)} />
                    </div>
                )
            case FAIL:
                return (
                    <div className='badge badge-pill badge-light-danger'>
                        <FormattedMessage id={getKeyLang("InsuFAIL")} />
                    </div>
                )
            case NOT_COMPLETE:
                return (
                    <div className='badge badge-pill badge-light-warning'>
                        <FormattedMessage id={getKeyLang("InsuNOT_COMPLETE")} />
                    </div>
                )
            case PENDING:
                return (
                    <div className='badge badge-pill badge-light-info'>
                        <FormattedMessage id={getKeyLang("InsuPENDING")} />
                    </div>
                )
            case REJECT:
                return (
                    <div className='badge badge-pill badge-light-dark'>
                        <FormattedMessage id={getKeyLang("InsuREJECT")} />
                    </div>
                )
            case APPROVAL:
                return (
                    <div className='badge badge-pill badge-light-primary'>
                        <FormattedMessage id={getKeyLang("InsuAPPROVAL")} />
                    </div>
                )
            case TIMEOUT:
                return (
                    <div className='badge badge-pill badge-light-danger'>
                        {TIMEOUT}
                    </div>
                )
            case CANCEL:
                return (
                    <div className='badge badge-pill badge-light-danger'>
                        <FormattedMessage id={getKeyLang("InsuCancel")} />
                    </div>
                )
            case CANCELING:
                return (
                    <div className='badge badge-pill badge-light-warning'>
                        <FormattedMessage id={getKeyLang("InsuCanceling")} />
                    </div>
                )
            default:
                return (
                    <div className='badge badge-pill badge-light-info'>
                        {TEXT_NO_VALUE}
                    </div>
                )
        }
    }
    return (
        <div className={isTextCenter ? "d-flex justify-content-center" : ""}>
            {renderlatestApprovalStatus()}
        </div>
    )
}

export const getPaymentType = (paymentType) => {
    switch (paymentType) {
        case PAYMENT_TYPE_FUND_TRANSFER:
            return 'Chuyển khoản'
        case PAYMENT_TYPE_DEBT:
            return 'Nợ phí'
        case 'TPBANK':
            return 'Qua TPBank'
        default:
            return paymentType
    }
}

export const getTextApplyFor = (applyFor) => {
    switch (applyFor) {
        case "INDIVIDUAL":
            return "Cá nhân"
        case "GROUP":
            return "Doanh nghiệp"
        default:
            return ""
    }
}

export const getInsuranceType = _.getInsuranceType
export const getBasePath = _.getBasePath

const preVerifiedPropeties = (row) => {
    let { applyFor, companyName, insurCompanyName, owner, totalFeeInclVAT, paymentType, insurances, createdDate, paymentInfo, paid } = row.original

    if (_.isArrayEmpty(insurances)) {
        insurances = [{
            createdDate: TEXT_NO_VALUE,
            startedDate: TEXT_NO_VALUE,
            endDate: TEXT_NO_VALUE
        }]
    }
    let { startedDate, endDate, startValueDate, endValueDate, insuranceTypeInsurance } = insurances[0]

    if (_.isObjEmpty(owner)) {
        owner = {
            phoneNumber: TEXT_NO_VALUE,
            email: TEXT_NO_VALUE,
            addresses: TEXT_NO_VALUE
        }
    }
    let { phoneNumber, email, addresses } = owner

    if (_.isObjEmpty(insuranceTypeInsurance)) {
        insuranceTypeInsurance = { description: '' }
    }
    let { description } = insuranceTypeInsurance

    return ({
        applyFor, companyName, insurCompanyName, createdDate, owner, totalFeeInclVAT, paymentType, insurances,
        startedDate, endDate, startValueDate, endValueDate, insuranceTypeInsurance, description,
        phoneNumber, email, addresses, paymentInfo, paid
    })
}

export const getDefault_expandableTableRows = (row, intl) => {
    const {
        applyFor, companyName, insurCompanyName, createdDate, owner,
        totalFeeInclVAT, paymentType, startedDate, endDate, startValueDate, endValueDate, description,
        phoneNumber, email, addresses, paymentInfo } = preVerifiedPropeties(row)

    const expandTable = [
        {
            msgField: <FormattedMessage id={getKeyLang(`InsuranceProduct`)} />,
            content: description || insurCompanyName || companyName || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`PaymentMethod`)} />,
            content: getPaymentType(paymentType)
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: _.intlConvertToVnd(totalFeeInclVAT, intl) + ' VND'
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`PartnerPhone`)} />,
            content: phoneNumber || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
            content: email || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Address`)} />,
            content: _.getAddressesValue(addresses) || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`createdDate`)} />,
            content: _.formatingISOStringDate(createdDate)[2] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`EffDate`)} />,
            content: _.formatingISOStringDate(startedDate || startValueDate)[2] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`endDate`)} />,
            content: _.formatingISOStringDate(endDate || endValueDate)[2] || TEXT_NO_VALUE
        },
    ]

    if (paymentInfo) {
        const paymentInfoRow = {
            msgField: <FormattedMessage id={getKeyLang(`paymentStatus`)} />,
            content: (
                <Table className="" borderless responsive>
                    <tbody>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("BuyInsurance.Car.Amount")} /> </td>
                            <td>{_.intlConvertToVnd(paymentInfo.amount, intl) + " VND"} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("time")} /> </td>
                            <td>{moment(paymentInfo.createdDate).utc(true).format(DATE_FORMAT + " HH:mm")} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("bank")} /> </td>
                            <td>{`${paymentInfo.bankName} - ${paymentInfo.bankAccountNumber}`} </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
        expandTable.push(paymentInfoRow)
    }

    const applyForRow = {
        msgField: <FormattedMessage id={getKeyLang(`applyFor`)} />,
        content: getTextApplyFor(applyFor) || TEXT_NO_VALUE
    }
    applyFor && expandTable.push(applyForRow)

    return expandTable
}

export const getDefault_carExpandableTableRows = (row, intl, openModal , refByUser) => {
    const data = row.original
    let { insurCompanyName, totalFeeInclVAT, paymentType, createdDate, paymentInfo } = preVerifiedPropeties(row)

    let { customerName, vehicles, insurances, insuranceAddons } = data
    if (_.isArrayEmpty(vehicles)) {
        vehicles = [
            {
                vehicleType: {
                    name: ""
                },
                numberPlate: "",
                frameNo: "",
                machineNo: "",
                contractValue: "",
                issDate: "",
                issPlace: "",
                initValue: "",
            }
        ]
    }

    let { vehicleType, numberPlate, frameNo, machineNo,
        contractValue, issDate, issPlace, initValue } = vehicles[0]

    if (_.isArrayEmpty(insurances)) {
        insurances = [
            {
                id: 21557,
                insuranceCode: 'CAR_TNDS',
                description: 'Bảo hiểm bắt buộc TNDS xe ô tô ',
                isEnable: true,
                duration: 12,
                startValueDate: '2021-10-14T14:38:00Z',
                endValueDate: '2022-10-14T14:38:00Z',
                value1: 873400,
                unit1: 'VND',
                buyEnable: null,
                fee: 873400
            }
        ]
    }
    if (_.isArrayEmpty(insuranceAddons)) {
        insuranceAddons = [
            {
                isEnable: false
            }
        ]
    }

    let vehicleExpandableRows = [
        {
            msgField: <FormattedMessage id={getKeyLang("InsuranceProduct")} />,
            content: insurCompanyName,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`createdDate`)} />,
            content: _.formatingISOStringDate(createdDate)[2] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang("OwnerName")} />,
            content: customerName,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("TypeVihicle")} />,
            content: vehicleType.name,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("LicensePlate")} />,
            content: numberPlate,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("ChassisNumber1")} />,
            content: frameNo,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("EngineNumber")} />,
            content: machineNo,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("YearProduction")} />,
            content: issDate,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("OriginProduction")} />,
            content: issPlace !== "VIETNAM" ? "Nước Ngoài" : "Việt Nam",
        },
        {
            msgField: <FormattedMessage id={getKeyLang("VehicleValue")} />,
            content: _.intlConvertToVnd(initValue, intl) + " VND",
        },
        {
            msgField: <FormattedMessage id={getKeyLang("FeeAmountInsurance")} />,
            content: _.intlConvertToVnd(contractValue, intl) + " VND",
        },
        {
            msgField: <FormattedMessage id={getKeyLang("FeeTotal")} />,
            content: _.intlConvertToVnd(totalFeeInclVAT, intl) + " VND",
        },
        {
            msgField: <FormattedMessage id={getKeyLang("PaymentMethod")} />,
            content: getPaymentType(paymentType),
        },
    ]

    if (paymentInfo) {
        const paymentInfoRow = {
            msgField: <FormattedMessage id={getKeyLang(`paymentStatus`)} />,
            content: (
                <Table className="" borderless responsive>
                    <tbody>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("BuyInsurance.Car.Amount")} /> </td>
                            <td>{_.intlConvertToVnd(paymentInfo.amount, intl) + " VND"} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("time")} /> </td>
                            <td>{moment(paymentInfo.createdDate).utc(true).format(DATE_FORMAT + " HH:mm")} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("bank")} /> </td>
                            <td>{`${paymentInfo.bankName} - ${paymentInfo.bankAccountNumber}`} </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
        vehicleExpandableRows.push(paymentInfoRow)
    }

    const insBBDS = insurances.find(ins => ins.insuranceCode === "CAR_TNDS")
    if (!_.isObjEmpty(insBBDS) && insBBDS.isEnable) {
        const insBBDSRow = [
            {
                msgField: <FormattedMessage id={getKeyLang("FeeInsBBTNDSCar")} />,
                content: _.intlConvertToVnd(insBBDS.fee, intl) + " VND",
            },
            {
                msgField: <FormattedMessage id={getKeyLang("FromDate")} />,
                content: _.formatingISOStringDate(insBBDS.startValueDate)[0],
            },
            {
                msgField: <FormattedMessage id={getKeyLang("ToDate")} />,
                content: _.formatingISOStringDate(insBBDS.endValueDate)[0],
            },
        ]
        vehicleExpandableRows.push(...insBBDSRow)
    }

    const insBBDSTN = insurances.find(ins => ins.insuranceCode === "CAR_TNDS_TN")
    if (!_.isObjEmpty(insBBDSTN) && insBBDSTN.isEnable) {
        const insBBDSTNRow = [
            {
                msgField: <FormattedMessage id={getKeyLang("FeeInsBBTNDSTNCar")} />,
                content: _.intlConvertToVnd(insBBDSTN.fee, intl) + " VND",
            },
            {
                msgField: <FormattedMessage id={getKeyLang("FromDate")} />,
                content: _.formatingISOStringDate(insBBDSTN?.startValueDate)[0],
            },
            {
                msgField: <FormattedMessage id={getKeyLang("ToDate")} />,
                content: _.formatingISOStringDate(insBBDSTN?.endValueDate)[0],
            },
        ]
        vehicleExpandableRows.push(...insBBDSTNRow)
    }

    const insMaterialCar = data.insurances.find(ins => ins.insuranceCode === "CAR_VATCHAT")
    if (!_.isObjEmpty(insMaterialCar) && insMaterialCar.isEnable) {
        const insMaterialCarRow = [
            {
                msgField: <FormattedMessage id={getKeyLang("FeeInsMaterialCar")} />,
                content: _.intlConvertToVnd(insMaterialCar.fee, intl) + " VND",
            },
            {
                msgField: <FormattedMessage id={getKeyLang("AddTerms")} />,
                content: (
                    <Table className="custom-padding-table margin-bottom-14" borderless responsive>
                        <tbody>
                            {
                                insuranceAddons.map(item => item.isEnable ? (
                                    <tr key={item.id}>
                                        <td>{item.addonCode + " - " + item.addonDesc} </td>
                                    </tr>
                                ) : null)
                            }
                        </tbody>
                    </Table>
                ),
            },
            {
                msgField: <FormattedMessage id={getKeyLang("PhotoContract")} />,
                content: (
                    <Button.Ripple
                        className="mr-1 mb-1 round" outline
                        onClick={() => {
                            if (!insMaterialCar || !insMaterialCar.isEnable) {
                                BaseAppUltils.toastSuccess(<FormattedMessage id={getKeyLang("NoNeedUpload")} />)
                                return
                            }
                            openModal(renderImages(data , refByUser))
                        }}
                    >
                        Xem chi tiết
                    </Button.Ripple>
                ),
            },
            {
                msgField: <FormattedMessage id={getKeyLang("FromDate")} />,
                content: _.formatingISOStringDate(insMaterialCar?.startValueDate)[0],
            },
            {
                msgField: <FormattedMessage id={getKeyLang("ToDate")} />,
                content: _.formatingISOStringDate(insMaterialCar?.endValueDate)[0],
            },
        ]
        vehicleExpandableRows.push(...insMaterialCarRow)
    }

    const insBHTNLPXNTX = data.insurances.find(ins => ins.insuranceCode === "CAR_CONNGUOI")
    if (!_.isObjEmpty(insBHTNLPXNTX) && insBHTNLPXNTX.isEnable) {
        const insBHTNLPXNTXRow = [
            {
                msgField: <FormattedMessage id={getKeyLang("FeeInsBHTNLPXNTX")} />,
                content: _.intlConvertToVnd(insBHTNLPXNTX.fee, intl) + " VND",
            },
            {
                msgField: <FormattedMessage id={getKeyLang("FromDate")} />,
                content: _.formatingISOStringDate(insBHTNLPXNTX?.startValueDate)[0],
            },
            {
                msgField: <FormattedMessage id={getKeyLang("ToDate")} />,
                content: _.formatingISOStringDate(insBHTNLPXNTX?.endValueDate)[0],
            },
        ]
        vehicleExpandableRows.push(...insBHTNLPXNTXRow)
    }

    const insCommodity = data.insurances.find(ins => ins.insuranceCode === "CAR_HANGHOA")
    if (!_.isObjEmpty(insCommodity) && insCommodity.isEnable) {
        const insCommodityRow = [
            {
                msgField: <FormattedMessage id={getKeyLang("FeeInsCommodity")} />,
                content: _.intlConvertToVnd(insCommodity.fee, intl) + " VND",
            },
            {
                msgField: <FormattedMessage id={getKeyLang("FromDate")} />,
                content: _.formatingISOStringDate(insCommodity?.startValueDate)[0],
            },
            {
                msgField: <FormattedMessage id={getKeyLang("ToDate")} />,
                content: _.formatingISOStringDate(insCommodity?.endValueDate)[0],
            },
        ]
        vehicleExpandableRows.push(...insCommodityRow)
    }

    return vehicleExpandableRows
}

export const getDefault_motorExpandableTableRows = (row, intl) => {
    const data = row.original
    let { insurCompanyName, totalFeeInclVAT, createdDate, paymentType, paymentInfo } = preVerifiedPropeties(row)

    let { customerName, vehicles, insurances, insuranceAddons, vatfee } = data
    if (_.isArrayEmpty(vehicles)) {
        vehicles = [
            {
                vehicleType: {
                    name: ""
                },
                numberPlate: "",
                frameNo: "",
                machineNo: "",
                contractValue: "",
                issDate: "",
                issPlace: "",
                initValue: "",
            }
        ]
    }

    let { vehicleType, numberPlate, frameNo, machineNo } = vehicles[0]

    if (_.isArrayEmpty(insurances)) {
        insurances = [
            {
                id: 21557,
                insuranceCode: 'CAR_TNDS',
                description: 'Bảo hiểm bắt buộc TNDS xe ô tô ',
                isEnable: true,
                duration: 12,
                startValueDate: '2021-10-14T14:38:00Z',
                endValueDate: '2022-10-14T14:38:00Z',
                value1: 873400,
                unit1: 'VND',
                fee: 873400
            }
        ]
    }
    if (_.isArrayEmpty(insuranceAddons)) {
        insuranceAddons = [
            {
                isEnable: false
            }
        ]
    }

    let vehicleExpandableRows = [
        {
            msgField: <FormattedMessage id={getKeyLang("InsuranceProduct")} />,
            content: insurCompanyName,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`createdDate`)} />,
            content: _.formatingISOStringDate(createdDate)[2] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang("OwnerName")} />,
            content: customerName,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("TypeVihicle")} />,
            content: vehicleType.name,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("LicensePlate")} />,
            content: numberPlate,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("ChassisNumber")} />,
            content: frameNo,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("EngineNumber")} />,
            content: machineNo,
        },
        {
            msgField: <FormattedMessage id={getKeyLang("FeeVAT")} />,
            content: _.intlConvertToVnd(vatfee, intl) + " VND",
        },
        {
            msgField: <FormattedMessage id={getKeyLang("FeeTotal")} />,
            content: _.intlConvertToVnd(totalFeeInclVAT, intl) + " VND",
        },
        {
            msgField: <FormattedMessage id={getKeyLang("PaymentMethod")} />,
            content: getPaymentType(paymentType),
        },
    ]

    if (paymentInfo) {
        const paymentInfoRow = {
            msgField: <FormattedMessage id={getKeyLang(`paymentStatus`)} />,
            content: (
                <Table className="" borderless responsive>
                    <tbody>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("BuyInsurance.Car.Amount")} /> </td>
                            <td>{_.intlConvertToVnd(paymentInfo.amount, intl) + " VND"} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("time")} /> </td>
                            <td>{moment(paymentInfo.createdDate).utc(true).format(DATE_FORMAT + " HH:mm")} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("bank")} /> </td>
                            <td>{`${paymentInfo.bankName} - ${paymentInfo.bankAccountNumber}`} </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
        vehicleExpandableRows.push(paymentInfoRow)
    }

    const feeInsuranceTNDS = insurances.find(ins => ins.insuranceCode === "MOTOR_TNDS")
    if (!_.isObjEmpty(feeInsuranceTNDS) && feeInsuranceTNDS.isEnable) {
        const feeInsuranceTNDSRow = [
            {
                msgField: <FormattedMessage id={getKeyLang("FeeInsBBTNDSTNCar")} />,
                content: _.intlConvertToVnd(feeInsuranceTNDS.fee, intl) + " VND",
            },
            {
                msgField: <FormattedMessage id={getKeyLang("FromDate")} />,
                content: _.formatingISOStringDate(feeInsuranceTNDS.startValueDate)[0],
            },
            {
                msgField: <FormattedMessage id={getKeyLang("ToDate")} />,
                content: _.formatingISOStringDate(feeInsuranceTNDS.endValueDate)[0],
            },
        ]
        vehicleExpandableRows.push(...feeInsuranceTNDSRow)
    }

    const feeInsuranceTNDSTN = insurances.find(ins => ins.insuranceCode === "MOTOR_CONNGUOI")
    if (!_.isObjEmpty(feeInsuranceTNDSTN) && feeInsuranceTNDSTN.isEnable) {
        const feeInsuranceTNDSTNRow = [
            {
                msgField: <FormattedMessage id={getKeyLang("FeeInsBBTNDSTNCar")} />,
                content: _.intlConvertToVnd(feeInsuranceTNDSTN.fee, intl) + " VND",
            },
            {
                msgField: <FormattedMessage id={getKeyLang("FromDate")} />,
                content: _.formatingISOStringDate(feeInsuranceTNDSTN?.startValueDate)[0],
            },
            {
                msgField: <FormattedMessage id={getKeyLang("ToDate")} />,
                content: _.formatingISOStringDate(feeInsuranceTNDSTN?.endValueDate)[0],
            },
        ]
        vehicleExpandableRows.push(...feeInsuranceTNDSTNRow)
    }

    return vehicleExpandableRows
}

export const getDefault_travelExpandableTableRows = (row, intl) => {
    const {
        applyFor, companyName, insurCompanyName, createdDate, owner,
        totalFeeInclVAT, paymentType, startedDate, endDate, startValueDate, endValueDate, description,
        phoneNumber, email, addresses, paymentInfo , insurances } = preVerifiedPropeties(row) 
    const expandTable = [
        {
            msgField: <FormattedMessage id={getKeyLang(`InsuranceProduct`)} />,
            content: description || insurCompanyName || companyName || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeAmountInsurance`)} />,
            content: `${_.intlConvertToVnd(row.original.contractValue, intl)}`  + ' VNĐ'
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`PaymentMethod`)} />,
            content: getPaymentType(paymentType)
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: _.intlConvertToVnd(totalFeeInclVAT, intl) + ' VNĐ'
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`PartnerPhone`)} />,
            content: phoneNumber || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Email`)} />,
            content: email || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`Address`)} />,
            content: _.getAddressesValue(addresses) || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`createdDate`)} />,
            content: _.formatingISOStringDate(createdDate)[2] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`EffDate`)} />,
            content: _.formatingISOStringDate(startedDate || startValueDate)[2] || TEXT_NO_VALUE
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`endDate`)} />,
            content: _.formatingISOStringDate(endDate || endValueDate)[2] || TEXT_NO_VALUE
        },
    ]

    if (paymentInfo) {
        const paymentInfoRow = {
            msgField: <FormattedMessage id={getKeyLang(`paymentStatus`)} />,
            content: (
                <Table className="" borderless responsive>
                    <tbody>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("BuyInsurance.Car.Amount")} /> </td>
                            <td>{_.intlConvertToVnd(paymentInfo.amount, intl) + " VND"} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("time")} /> </td>
                            <td>{moment(paymentInfo.createdDate).utc(true).format(DATE_FORMAT + " HH:mm")} </td>
                        </tr>
                        <tr >
                            <td><FormattedMessage id={getKeyLang("bank")} /> </td>
                            <td>{`${paymentInfo.bankName} - ${paymentInfo.bankAccountNumber}`} </td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
        expandTable.push(paymentInfoRow)
    }

    const applyForRow = {
        msgField: <FormattedMessage id={getKeyLang(`applyFor`)} />,
        content: getTextApplyFor(applyFor) || TEXT_NO_VALUE
    }
    applyFor && expandTable.push(applyForRow)

    return expandTable
}
