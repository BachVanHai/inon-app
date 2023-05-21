import React, { useState, useEffect } from "react"
import { Card, CardBody } from "reactstrap"
import {
  BaseAppUltils,
  FormattedMessage,
  AppId
} from 'base-app'
import { useDropzone } from "react-dropzone"
import "../../../assets/scss/insurance-app/common/dropzone.scss"
import PropTypes from "prop-types"

function DropzoneAccepted(props) {
  const formik = props.formik;
  const fieldName = props.fieldName;
  const [files, setFiles] = useState([])
  const classes = `dropzone ${formik.touched[fieldName] && formik.errors[fieldName] && "required"}`;
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg, image/bmp, image/HEIF, image/HEVC, image/heic",
    multiple: false,
    maxSize: 5000000,
    onDrop: (acceptedFiles, rejectedFiles) => {

      acceptedFiles.map(file => {
        props.updateAvatar(file, props.fieldName)
      }
      )

      rejectedFiles.map(file => {
        console.log(file)
        if (file.size > 5000000)
          BaseAppUltils.toastError(<FormattedMessage id={`${AppId.INSURANCE_APP}.MaxFileUpload`} />)
        // file.errors.forEach((err) => {
        //   if (err.code === "file-too-large") {
        //     BaseAppUltils.toastError(<FormattedMessage id={`${AppId.INSURANCE_APP}.MaxFileUpload`} />)

        //   }

        //   if (err.code === "file-invalid-type") {

        //   }
        // });
      }
      )


      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })
  const thumbs = files.map(file => (
    <div className="dz-thumb" key={file.lastModified}>
      <div className="dz-thumb-inner">
        <img src={file.preview} className="dz-img" alt={file.name} />
      </div>
    </div>
  ))
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const acceptedFilesItems = acceptedFiles.map(file => (
    <div className="thumb-container">{thumbs}</div>
  ))

  // const rejectedFilesItems = rejectedFiles.map(file => (
  //   <div key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </div>
  // ))




  return (
    <section >
      <div className="d-flex">
        <div {...getRootProps({ className: classes })}>
          <input {...getInputProps()} />
          <p >
            <em>{props.title}</em>
          </p>

        </div>

        <div className="verticalline"></div>
        {files !== null && files.length > 0 ? (<div>{acceptedFilesItems}</div>) :
          (<div className="thumb-container">
            <div className="dz-thumb">
              <div className="dz-thumb-inner">
                {/* <img src={img1} className="dz-img" /> */}
              </div>
            </div>
          </div>)
        }

      </div>


    </section>
  )
}

class DropzoneAccept extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <CardBody>
          <DropzoneAccepted formik={this.props.formik} fieldName={this.props.fieldName} title={this.props.title} updateAvatar={this.props.updateAvatar} />
        </CardBody>
      </Card>
    )
  }
}

DropzoneAccept.propTypes = {
  updateAvatar: PropTypes.func
}

export default DropzoneAccept
