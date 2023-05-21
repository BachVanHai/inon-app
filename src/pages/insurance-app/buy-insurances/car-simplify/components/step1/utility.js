import moment from 'moment'
export const getDefaultTemplate_vehicel = (vehicel) => {
  const {
    brandName,
    contractId,
    numberPlate,
    seats,
    usage,
    vehicleType,
    frameNo,
    machineNo,
    manufacturerName,
    loads
  } = vehicel 
  return {
      "contractId": contractId,
      "vehicleStatus": "NEW",
      "numberPlate": numberPlate,
      "usage": usage,
      "issPlace": "VIETNAM",
      "issDate": moment().toISOString(),
      "vehicleTypeId": vehicleType,
      "manufacturerName": manufacturerName,
      "brandName": brandName,
      "initValue": 0,
      "contractValue": 0,
      "frameNo": frameNo,
      "machineNo": machineNo,
      "seats": Number(seats),
      "loads" : loads
  }
}
export const get_ObjectCustomerDefault = (customer) => {
  const { ownerName ,ownerAddr } = customer
  return {  
    icType: null,
    icNo: null,
    issuedDate: null,
    issuedPlace: null,
    fullName: ownerName,
    dateOfBirth: null,
    gender: null,
    phoneNumber: null,
    email: null,
    type: 'INV',
    addresses: [
      {
        type: 'HOME',
        city: null,
        district: null,
        ward: null,
        detail: ownerAddr
      }
    ]
  }
}
