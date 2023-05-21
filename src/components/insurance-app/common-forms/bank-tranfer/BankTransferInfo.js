import "../../../../assets/scss/insurance-app/common/toastr.scss"
import "react-toastify/dist/ReactToastify.css"
import React, { useState, useEffect } from 'react'
import { Label, Row, Col, } from "reactstrap"
import { FormattedMessage, AppId } from 'base-app'
import { Copy } from "react-feather"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import { hasRequestFail, intlConvertToVnd } from "../../../../ultity"
import { TEXT_NO_VALUE } from "../../buy-insurances-page/formik-config"
import { useIntl } from "react-intl"
import Service from "../../../../services/insurance-app/buyInsuranceMotor"

/**
  @description
    accountNo: "1010335588"\
    accountOwner: "CÔNG TY CỔ PHẦN INON"\
    appName: "INSURANCE_APP"\
    bankName: "NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM (VIETCOMBANK)"\
    branch: "SỞ GIAO DỊCH"\
  @example
    return (
        <BankTransferInfo
            contractCode={contractInfo.contractCode}
            totalFeeInclVAT={totalFee}
        />
    )
 */
const BankTransferInfo = ({ contractCode, totalFeeInclVAT }) => {
    const intl = useIntl()
    const [bankTransferInfo, setBankTransferInfo] = useState(
        {
            accountNo: TEXT_NO_VALUE,
            accountOwner: TEXT_NO_VALUE,
            bankName: TEXT_NO_VALUE,
            branch: TEXT_NO_VALUE,
        })

    const onCopy = (text) => {
        toast.success(`Bạn đã copy "${text}" vào clipboard`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })
    }

    useEffect(() => {
        async function _getBankTransferInfo() {
            const res = await Service.gettAllBanks()
            if (hasRequestFail(res && res.status)) return

            const { accountNo = TEXT_NO_VALUE, accountOwner = TEXT_NO_VALUE,
                bankName = TEXT_NO_VALUE, branch = TEXT_NO_VALUE } = res.data
            setBankTransferInfo(
                {
                    accountNo,
                    accountOwner,
                    bankName,
                    branch,
                })
        }

        _getBankTransferInfo()
    }, [])

    const vietQrLink = `https://img.vietqr.io/image/970436-1010335588-POfh1uQ.jpg?accountName=C%C3%94NG%20TY%20C%E1%BB%94%20PH%E1%BA%A6N%20INON&amount=${totalFeeInclVAT}&addInfo=${contractCode}`

    return (
      <div>
      <Row>
        <Col sm="12">
          <Label className="font-medium-2 text-bold-600 text-primary-highlight letter-uppercase" >
            <FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.TransferInfo`} />
          </Label>
        </Col>
        <Col sm="12">
          <label> <b><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.TransferInfoSub`} /></b></label>
        </Col>
        <Col sm="12" md="4">
        <p className="font-weight-bold text-danger">* Vui lòng ấn " ĐÃ NỘP PHÍ " sau khi thanh toán thành công </p>
          <img className="mx-auto" style={{width : '300px'}} src={vietQrLink} alt="Viet QR Code"/>
        
        </Col>
        <Col sm="12"  md="8" className="margin-bottom-14 row">
          <Col md="4" sm="12" className="title-wrapper d-flex align-items-center margin-bottom-14">
            <div className="fonticon-wrap">
              <CopyToClipboard
                text={bankTransferInfo.accountNo}
                onCopy={onCopy}
              >
                <Copy size={24} className="margin-right fonticon-wrap" />
              </CopyToClipboard>
            </div>
            <label> <b className="font-medium-2 text-title-color letter-uppercase"><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.STK`} /> </b><br /> <label className="letter-uppercase">
              {
                bankTransferInfo.accountNo
              }
            </label></label>
          </Col>

          <Col md="4" sm="12" className="title-wrapper d-flex align-items-center margin-bottom-14">
            <div className="fonticon-wrap">
              <CopyToClipboard
                text={bankTransferInfo.bankName}
                onCopy={onCopy}
              >
                <Copy size={24} className="margin-right fonticon-wrap" />
              </CopyToClipboard>
            </div>
            <label> <b className="font-medium-2 text-title-color letter-uppercase"><FormattedMessage id={`${AppId.INSURANCE_APP}.Bank`} />: </b><br /> <label className="letter-uppercase">
              {
                bankTransferInfo.bankName
              }
            </label></label>
          </Col>

          <Col md="4" sm="12" className="title-wrapper d-flex align-items-center margin-bottom-14">
            <div className="fonticon-wrap">
              <CopyToClipboard
                text={totalFeeInclVAT}
                onCopy={onCopy}
              >
                <Copy size={24} className="margin-right fonticon-wrap" />
              </CopyToClipboard>
            </div>
            <label> <b className="font-medium-2 text-title-color letter-uppercase"><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.Amount`} /> </b><br />  <label className="letter-uppercase">
              {
                intlConvertToVnd(
                  totalFeeInclVAT || TEXT_NO_VALUE,
                  intl
                )
              }
              <span>&nbsp;</span>
              VND
            </label></label>
          </Col>

          <Col md="4" sm="12" className="title-wrapper d-flex align-items-center margin-bottom-14">
            <div className="fonticon-wrap">
              <CopyToClipboard
                text={bankTransferInfo.accountOwner}
                onCopy={onCopy}
              >
                <Copy size={24} className="margin-right fonticon-wrap" />
              </CopyToClipboard>
            </div>
            <label> <b className="font-medium-2 text-title-color letter-uppercase"><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.OwnerTk`} /> </b><br /> <label className="letter-uppercase">
              {
                bankTransferInfo.accountOwner
              }
            </label></label>
          </Col>

          <Col md="4" sm="12" className="title-wrapper d-flex align-items-center margin-bottom-14">
            <div className="fonticon-wrap">
              <CopyToClipboard
                text={bankTransferInfo.branch}
                onCopy={onCopy}
              >
                <Copy size={24} className="margin-right fonticon-wrap" />
              </CopyToClipboard>
            </div>
            <label> <b className="font-medium-2 text-title-color letter-uppercase"><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.BranchName`} /> </b><br /> <label className="letter-uppercase">
              {
                bankTransferInfo.branch
              }
            </label></label>
          </Col>

          <Col md="4" sm="12" className="title-wrapper d-flex align-items-center margin-bottom-14">
            <div className="fonticon-wrap">
              <CopyToClipboard
                text={contractCode}
                onCopy={onCopy}
              >
                <Copy size={24} className="margin-right fonticon-wrap" />
              </CopyToClipboard>
            </div>
            <label> <b className="font-medium-2 text-title-color letter-uppercase"><FormattedMessage id={`${AppId.INSURANCE_APP}.BuyInsurance.Car.Content`} /> </b><br /> <label className="letter-uppercase">
              {
                contractCode || TEXT_NO_VALUE
              }
            </label></label>
          </Col>
        </Col>
      </Row>
    </div>
    )
}

export default BankTransferInfo
