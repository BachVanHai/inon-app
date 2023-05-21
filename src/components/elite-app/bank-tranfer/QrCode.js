import React from 'react'

const QrCode = ({ contractCode, totalFeeInclVAT }) => {
  const vietQrLink = `https://img.vietqr.io/image/970436-1010335588-POfh1uQ.jpg?accountName=C%C3%94NG%20TY%20C%E1%BB%94%20PH%E1%BA%A6N%20INON&amount=${totalFeeInclVAT}&addInfo=${contractCode}`
  return (
    <div className='d-flex justify-content-center'>
      <img
        className='mx-auto'
        style={{ width: '300px' }}
        src={vietQrLink}
        alt='Viet QR Code'
      />
    </div>
  )
}

export default QrCode
