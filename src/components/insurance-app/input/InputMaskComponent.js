import React from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import InputMask from "react-input-mask"


const InputMaskComponent  = ({  intl: { formatMessage }, placeholder , className,id,type,maxLength,onChange,value, name, onBlur, mask}) => {
    return (<InputMask mask={mask} type={type} id={id} maxLength={maxLength} value={value} onChange={onChange} name={name} onBlur={onBlur} placeholder={formatMessage({id: placeholder})} className={className}/>)
}
export default injectIntl(InputMaskComponent)