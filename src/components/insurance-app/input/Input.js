import React from 'react';
import { injectIntl } from 'react-intl';
import {
    Input
} from "reactstrap";



const ComponentWithInput  = ({intl: { formatMessage }, placeholder, className,id,type,maxLength,onChange,value, name, onBlur, ...inputProps }) => {
    return (<Input type={type} id={id} maxLength={maxLength} value={value} onChange={onChange} name={name} onBlur={onBlur} placeholder={formatMessage({id: placeholder})} className={className}  {...inputProps}/>)
}
export default injectIntl(ComponentWithInput)
