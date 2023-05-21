import '../../../../assets/scss/insurance-app/buy-insurances/IdOcrInput.scss'
import React from 'react'
import { Input } from "reactstrap"
import { FormattedMessage } from 'base-app'
import ModalImage from "react-modal-image"
import Button from 'reactstrap/lib/Button'

const UploadInput = ({ handleImageChange, idKeylangBtnName, uploadedImg, uploadedImgUrl, className }) => {
    let imgUrl = "", imgName = ""
    if (uploadedImg && uploadedImg.name !== "dumbName") {
        imgUrl = URL.createObjectURL(uploadedImg)
        imgName = uploadedImg.name
    }
   
    const onInputClick = (event) => {
        // avoid situation where browser doesn't bother to check for secondary uploaded by user
        event.target.value = ''
    }

    return (
        <div className={`id-ocr-input ` + className}>
            <Button
                tag='label'
                color='primary'
                className={"mb-1"}
                outline
                onClick={handleImageChange}
            >
                <Input
                    hidden
                    type='file'
                    bsSize="small"
                    id='uploadImg'
                    label="Document"
                    name='originalFileName'
                    onChange={handleImageChange}
                    onClick={onInputClick}
                />
                <FormattedMessage id={idKeylangBtnName} />
            </Button>
            <ModalImage
                small={uploadedImgUrl || imgUrl}
                large={uploadedImgUrl || imgUrl}
                alt={imgName}
                className="w-100 mb-1"
            />
        </div>
    )
}

export default UploadInput