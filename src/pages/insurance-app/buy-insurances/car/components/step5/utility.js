export const getDefault_payObj = (info = {
    toggleprintedCert: "", printedCertType: "", certNo: "", paymentType: "", companyId: ""
}) => {
    const { toggleprintedCert, printedCertType, certNo, paymentType, companyId } = info

    return ({
        certNo: toggleprintedCert && printedCertType === 'DIRECT' ? certNo : '',
        paymentType: paymentType,
        printedCertType: toggleprintedCert ? printedCertType : 'NONE',
        companyId: companyId
    })
}

export const getDefault_debtObj = () => {
    return ({
        certNo: null,
        paymentType: `DEBT`,
        printedCertType: 'NONE',
        couponCode: null
    })
}