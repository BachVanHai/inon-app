import { BaseFormGroup } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as Yup from 'yup'
import HelpCenterSevice from '../../../../services/app-no1/helpCenter'
const RejectModal = ({
  original,
  isOpen,
  closeModal,
  intl,
  getKeyLang,
  reActiveLoadApi
}) => {
  const handleSubmitClick = async (values) => {
    const data = {
      reasonReject: values.reasonReject
    }
    const resRejected = await HelpCenterSevice.rejectedQuestion(
      original.id,
      data
    )
    if (resRejected.status === 200) {
      closeModal()
        reActiveLoadApi()
        return
    }
  }
  const validateSchema = Yup.object().shape({
    reasonReject: Yup.string().required('Vui lòng nhập lí do từ chối')
  })
  const formik = useFormik({
    initialValues: {
      reasonReject: ''
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmitClick
  })
  const { handleSubmit, errors, touched } = formik
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered'>
      <ModalHeader>
        <FormattedMessage
          id={getKeyLang('helpcenter.management.rejected.title')}
        />
      </ModalHeader>
      <ModalBody>
        <FormikProvider value={formik}>
          <div className='mt-1'>
            <BaseFormGroup
              errors={errors}
              touched={touched}
              messageId={getKeyLang(`helpcenter.management.rejected.reason`)}
              type={`text`}
              fieldName={`reasonReject`}
            />
          </div>
        </FormikProvider>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' type='button' onClick={handleSubmit}>
          {intl.formatMessage({ id: getKeyLang('helpcenter.management.rejected.continue') })}
        </Button>
        <Button
          type='button'
          onClick={() => {
            closeModal(false)
          }}
        >
          {intl.formatMessage({ id: getKeyLang('helpcenter.management.rejected.back') })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default RejectModal
