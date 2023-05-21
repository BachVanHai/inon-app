import React from 'react';
import {
    Label,
    FormGroup,
    InputGroup
} from "reactstrap";
import { injectIntl, } from 'react-intl';
import Input from '../../input/Input';


const InputForm1 = ({ intl: { formatMessage }, formik, fieldName, msgField, maxLength, StepField, addClass, ...inputProps }) => {
    return (<FormGroup className="form-label-group">
        <Input
            id={fieldName}
            //className={`custom-padding ${addClass} ${formik.touched[fieldName] && formik.errors[fieldName] && "is-invalid"}`}
            //className={`custom-padding ${addClass} ${formik.errors}.${StepField}.${fieldName}  ${formik.touched}.${StepField}.${fieldName}  && "is-invalid"}`}
            StepField={StepField !="" ? StepField : ""}
            maxLength={maxLength}
            placeholder={msgField}
           // value={formik.values[`${fieldName}`]}
            // onBlur={formik.handleBlur}
            {...inputProps}
            onBlur={() => {

                setTimeout(function () {
                    formik.setFieldTouched(`${StepField}.${fieldName}`)
                }, 50);
            }}
        />
        <Label for="nameFloating">{formatMessage({ id: msgField })}</Label>
    </FormGroup>)
}

export default injectIntl(InputForm1)
