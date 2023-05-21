import React , { Fragment } from 'react';
import {
    FormGroup
} from "reactstrap";
import {
    Select
} from 'base-app'
import { injectIntl, } from 'react-intl';
// import Select from 'react-select'

const customStylesRequired = {

    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? "#51912D !important" : "#ea5455 !important",
    })
}

const customStylesSelect = {


    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#5f5f5f",
            fontSize: "0.96rem",
            opacity: "0.5"
        };
    }
}
const SelectForm = ({ intl: { formatMessage }, formik, fieldName, msgField, options, addClass, ...inputProps }) => {
    return (
        <Fragment>
            <Select
                id={fieldName}
                blurInputOnSelect={true}
                className={`React ${addClass}`}
                styles={formik.touched[fieldName] && formik.errors[fieldName] ? customStylesRequired : customStylesSelect}
                classNamePrefix="select"
                placeholder={formatMessage({ id: msgField })}
                value={options.find(item => item.value === formik.values[`${fieldName}`])}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        neutral50: '#1A1A1A',  // Placeholder color
                    },
                })}
                options={options}
                onChange={value => {
                    formik.setFieldValue(`${fieldName}`, value.value);
                }}
                //    onBlur={() => {
                //         formik.handleBlur({ target: { name: `${fieldName}` } });
                //    }}
                onBlur={() => {
                    // setTimeout(formik.setFieldTouched(`${fieldName}`, true), 2000)
                    setTimeout(
                        () => formik.setFieldTouched(`${fieldName}`, true),
                        500
                    );
                }}
                {...inputProps}
            />
        </Fragment>
    )
}

export default injectIntl(SelectForm)