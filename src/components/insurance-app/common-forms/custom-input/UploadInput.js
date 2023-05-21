import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Input, Button as ReactrapButton } from 'reactstrap'
import { getKeyLang } from '../../../../configs/insurance-app'

/**
    @example
    const handleUpload = (e) => {
         e.preventDefault()

        const files = e.target.files
        const file = files[0]
        if (!file) { return }

    }
    return (
        <Upload
            msgField={intl.formatMessage({ id: getKeyLang(`upFile`) })}
            handleChange={handleChange}
            className="mb-2"
        />
    )
 */
const Upload = ({ handleChange, msgField, className }) => {
    const onInputClick = (event) => {
        // avoid situation where browser doesn't bother to check for secondary uploaded by user
        event.target.value = ''
    }

    return (
        <ReactrapButton
            tag='label'
            color='primary'
            outline
            className={className}
        >
            <Input
                hidden
                type='file'
                bsSize="small"
                id='uploadxls'
                label="document"
                name='originalFileName'
                onChange={handleChange}
                onClick={onInputClick}
            />
            {
                msgField || <FormattedMessage id={getKeyLang("ButtonOK")} />
            }

        </ReactrapButton>
    )
}

export default Upload