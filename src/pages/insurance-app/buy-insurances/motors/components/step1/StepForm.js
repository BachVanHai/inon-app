import React from 'react'
import CustomTable from './components/CustomTable'
import Upload from '../../../../../../components/insurance-app/common-forms/custom-input/UploadInput'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { useIntl } from 'react-intl'
import { Button } from 'reactstrap'
import { downloadExelFile, uploadFile } from './utility'

const StepForm = ({ className, dispatch, stepInfo }) => {
    const intl = useIntl()
    const handleChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        if (!file) { return }

        dispatch(uploadFile(file))
    }

    const handleClick = () => {
        downloadExelFile("motor")
    }

    return (
        <div className={className}>
            <div className='mb-2'>
                <Button
                    className="mr-1" outline color="primary"
                    onClick={handleClick}
                >
                    {intl.formatMessage({ id: getKeyLang(`useTemplate`) })}
                </Button>

                <Upload
                    msgField={intl.formatMessage({ id: getKeyLang(`upFile`) })}
                    handleChange={handleChange}
                />
            </div>

            <CustomTable
                stepInfo={stepInfo}
            />
        </div >
    )
}

export default StepForm