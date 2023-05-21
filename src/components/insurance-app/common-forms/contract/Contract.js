import React from 'react'
import TermOfService from './TermOfService'
import Title from './Title'
import InfoCols from './InfoCols'
import InfoRows from './InfoRows'
import FeeRows from './FeeRows'
import VanillaRow from './VanillaRow'
/**
 * @example
     const titleRow = {
        msgField: <FormattedMessage id={getKeyLang(`contractCode`)} />,
        content: contractCode || TEXT_NO_VALUE,
        subTitle: insuranceCompanyName || TEXT_NO_VALUE,
        isContractTitleHide: false,
    }
    const infoCols = [
        {
            msgField: <FormattedMessage id={getKeyLang(`ValueDateStart`)} />,
            content: formatingDate(startDate) || TEXT_NO_VALUE
        },
    ]
   const infoRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.houseAddress`)} />,
            content: city && `${ward}, ${district}, ${city}` || detail || TEXT_NO_VALUE,
            isHide: false
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.houseAssestsFee`)} />,
            content: `${intlConvertToVnd(dataFee.feeAsset, intl) || 0} VND`,
            isHide: false,
            detailRows: [],
            details: [
                {
                    msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.limitCompensated`)} />,
                    content: getAddonInfo(assetBasic, assetOverview).value,
                    isHide: true,
                },
                {
                    msgField: <FormattedMessage id={getKeyLang(`contract.personalHome.coverage`)} />,
                    content: getAddonInfo(assetBasic, assetOverview).title
                },
            ]
        }
    ]
     const vanillaRows = [
        {
            msgField: <CustomTable />,
            isHideUnderLine: false,
        },
    ]
    const feeRows = [
        {
            msgField: <FormattedMessage id={getKeyLang(`InsVatFee`)} />,
            content: `${intlConvertToVnd(dataFee.paymentFee, intl)} VND`,
        },
        {
            msgField: <FormattedMessage id={getKeyLang(`FeeTotal`)} />,
            content: `${intlConvertToVnd(dataFee.totalFeeVAT, intl)} VND`,
            isTotalFee: true
        },
    ]
    const toggleAgree = {
        agreedTermOfServicesStatus: false,
        toggleAgreeCallback: () => { }
    }
    return
        <Contract
            titleRow={titleRow}
            infoCols={infoCols}
            infoRows={infoRows}
            feeRows={feeRows}
            toggleAgree={toggleAgree}
            vanillaRows={vanillaRows}
        />
 */
const Contract = ({
    titleRow, infoCols, infoRows, feeRows, toggleAgree, vanillaRows ,
    ...p
}) => {

    return (
        <div {...p}>
            <Title titleRow={titleRow} className={"mb-2"} />

            <InfoCols rowComponents={infoCols} />
            <InfoRows infoRows={infoRows} />
            <VanillaRow vanillaRows={vanillaRows} />
            <FeeRows feeRows={feeRows} />
            <TermOfService toggleAgree={toggleAgree} />
        </div>
    )
}

export default Contract