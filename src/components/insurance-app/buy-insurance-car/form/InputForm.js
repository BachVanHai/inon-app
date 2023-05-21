import React from 'react';
import {
    Label,
    FormGroup
} from "reactstrap";
import { injectIntl, } from 'react-intl';
import Input from '../../input/Input';
const InputForm = ({ intl: { formatMessage }, formik, fieldName, msgField, maxLength, addClass, ...inputProps  }) => {
    return (<FormGroup className="form-label-group">
            <Input
                id={fieldName}
                className={`custom-padding ${addClass} ${formik.touched[fieldName] &&  formik.errors[fieldName] && "is-invalid"}`}
                type="text"
                value={formik.values[`${fieldName}`]}
                maxLength={maxLength}
                placeholder={msgField}
                onChange={e => {
                    formik.setFieldValue(`${fieldName}`, e.target.value);
                }}
                // onBlur={formik.handleBlur}
                onBlur={() => {

                    setTimeout(function() {
                        formik.setFieldTouched(`${fieldName}`)
                    }, 50);
               }}
                {...inputProps}
            />
            <Label for="nameFloating">{formatMessage({ id: msgField })}</Label>
    </FormGroup>)
}

export default injectIntl(InputForm)

