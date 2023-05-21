import React from 'react'
import CustomTable from './components/CustomTable'
import Upload from '../../../../../../components/insurance-app/common-forms/custom-input/UploadInput'
import { getKeyLang } from '../../../../../../configs/insurance-app'
import { useIntl } from 'react-intl'
import { Button } from 'reactstrap'
import { downloadExelFile, uploadFile } from './utility'

const StepForm = ({ className, dispatch, stepInfo }) => {
    const intl = useIntl()

    const handleCarChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        if (!file) { return }

        dispatch(uploadFile(file, "car"))
    }

    const handleOwnerChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        if (!file) { return }

        dispatch(uploadFile(file, "onwer"))
    }

    const handleCarClick = () => {
        downloadExelFile("car", "car")
    }

    return (
        <div className={className}>
            <div className='mb-2'>
                <Button
                    className="mr-1" outline color="primary"
                    onClick={handleCarClick}
                >
                    {intl.formatMessage({ id: getKeyLang(`useTemplate`) })}
                </Button>

                <Upload
                    msgField={intl.formatMessage({ id: getKeyLang(`upFile`) })}
                    handleChange={handleCarChange}
                />
            </div>

            <div className='mb-3'>
                <CustomTable
                    stepInfo={stepInfo}
                />
            </div>

            {/* <Row>
                <Col xs={12} md={6} className="mb-2">
                    <span className='font-medium-4 font-weight-bold text-primary-highlight letter-uppercase'>
                        <FormattedMessage id={getKeyLang("ownAcctInfo")} />
                    </span>
                </Col>
            </Row> */}

            {/* <div className='mb-2'>
                <Button
                    className="mr-1" outline color="primary"
                    onClick={handleOwnerClick}
                >
                    {intl.formatMessage({ id: getKeyLang(`useTemplate`) })}
                </Button>

                <Upload
                    msgField={intl.formatMessage({ id: getKeyLang(`upFile`) })}
                    handleChange={handleOwnerChange}
                />
            </div>

            <CustomTable2
                stepInfo={stepInfo}
            /> */}
        </div >
    )
}

export default StepForm