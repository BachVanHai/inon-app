import { Checkbox } from 'base-app';
import React, { useState } from 'react'
import { Check } from 'react-feather';
import { useDispatch } from 'react-redux';
import { updateProps } from '../../../../../../redux/actions/insurance-app/buyInsurancesGoods';
import { KEY_ADDONS } from '../../../../../../redux/reducers/insurance-app/buyInsurancesGoods';
import { KEY_ADD_ONS, KEY_INSURANCE_DEDUCTION } from './formikConfig';

const AddOnsCheckbox = ({addOns , setFieldValue , isCheckBS7}) => {
    // const [addOnsValue, setAddOnsValue] = useState(addOns)
    const dispatch = useDispatch()
    const handleChangeAddOns =  (index , isEnable , addonCode) =>{
        if (addonCode === 'BS3' || addonCode === 'BS4' || addonCode === 'BS5' || addonCode === 'BS6') {
            setFieldValue(KEY_INSURANCE_DEDUCTION , 0)       
        }
        const _addOns = [...addOns]
        if (isEnable) {
            _addOns[index].isEnable =  false
        }else{
            _addOns[index].isEnable =  true
        }
        // setAddOnsValue(_addOns)
        setFieldValue(KEY_ADD_ONS , _addOns )     
        dispatch(
            updateProps([
              {
                prop: KEY_ADDONS,
                value: _addOns
              }
            ])
          )  
    }
  return (
    <div className='mt-2'>
        {
            addOns.map((_elt,index) => (
                <div className='d-flex mb-2 align-items-center' key={index}>
                <Checkbox
                     disabled={_elt.addonCode === 'BS7' && isCheckBS7 ? true : false}
                     color="primary"
                     icon={<Check className="vx-icon" size={16} />}
                      checked={_elt?.isEnable}
                     onChange={() => handleChangeAddOns(index,  _elt?.isEnable , _elt?.addonCode)}
                 />
                 <span>{_elt?.description}</span>
         </div>
            ))
        }
    </div>
  )
}

export default AddOnsCheckbox