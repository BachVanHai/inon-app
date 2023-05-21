import React, { useState, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import {
  BaseAppUltils,
  FormattedMessage,
  BaseAppConfigs
} from 'base-app'
import { useDropzone } from 'react-dropzone'
import '../../assets/scss/elite-app/dropzone.scss'
import upload from '../../assets/images/elite-app/upload-icon.svg'

function DropzoneAccepted(props) {
  const formik = props.formik
  const fieldName = props.fieldName
  const [files, setFiles] = useState([])
  const classes = `dropzone p-1 ${formik.touched[fieldName] && formik.errors[fieldName] && 'required'}`
  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg, image/bmp, image/HEIF, image/HEVC, image/heic',
    multiple: false,
    // maxSize: 5000000,
    onDrop: (acceptedFiles, rejectedFiles) => {

      acceptedFiles.map(file => {
        const url = URL.createObjectURL(file)
        props.uploadFile(props.fieldName, file, url)
      }
      )

      // rejectedFiles.map(file => {
      //     if (BaseAppUltils.bytesToMb(file.size) >= BaseAppConfigs.MAX_FILE_SIZE)
      //       BaseAppUltils.toastError(<FormattedMessage id={'setting.updateInfo.imageExceedSize'}
      //                                                  values={{ size: BaseAppConfigs.MAX_FILE_SIZE }} />)
      //   }
      // )


      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file,
            {
              preview: URL.createObjectURL(file)
            }
          )
        )
      )
    }
  })

  const thumbs = files.map(file => (
    <div className='dz-thumb' key={file.lastModified}>
      <div className='dz-thumb-inner'>
        <img src={file.preview} className='dz-img' alt={file.name} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
    ,
    [files]
  )

  const acceptedFilesItems = acceptedFiles.map(file => (
    <div key={file.lastModified} className='thumb-container'>{thumbs}</div>
  ))


  return (
    <section>
      <div className='d-flex'>
        <div {...getRootProps({ className: classes })}>
          <input {...getInputProps()} />
          <p>
            <em><FormattedMessage id={props.title} /></em>
          </p>

        </div>

        <div className='verticalline' />
        {files.length > 0 ? (<div>{acceptedFilesItems}</div>) :
          (<div className='thumb-container'>
            <div className='dz-thumb-upload'>
              <div className='dz-thumb-inner'>
                <img src={upload} className="dz-img" />
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
    super(props)
  }

  render() {
    return (
      <Card>
        <CardBody>
          <DropzoneAccepted formik={this.props.formik} fieldName={this.props.fieldName} title={this.props.title}
            uploadFile={this.props.uploadFile} />
        </CardBody>
      </Card>
    )
  }
}


export default DropzoneAccept
