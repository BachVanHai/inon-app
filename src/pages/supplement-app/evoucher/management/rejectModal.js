import { BaseAppUltils, BaseFormGroup } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import EvoucherService from '../../../../services/supplement-app/evoucher'
import * as Yup from 'yup'
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
      promotionId: original.id,
      ...values
    }
    const res = await EvoucherService.rejectEvoucher(data)
    if (res.status === 200) {
      BaseAppUltils.toastSuccess(
        intl.formatMessage({ id: getKeyLang('account.success') })
      )
      reActiveLoadApi()
      return true
    }else{
      return false
    }
  }
  const validateSchema = Yup.object().shape({
    reasonReject: Yup.string().required('Vui lòng nhập lí do từ chối')
  })
  const formik = useFormik({
    initialValues: {
      reasonReject: ''
    },
    validationSchema : validateSchema,
    onSubmit: handleSubmitClick
  })
  const { handleSubmit, errors, touched } = formik
  return (
    <Modal isOpen={isOpen} className='modal-dialog-centered'>
      <ModalHeader>
        <FormattedMessage
          id={getKeyLang('evoucher.management.form.rejectVoucher')}
        />
      </ModalHeader>
      <ModalBody>
        <FormikProvider value={formik}>
          <div className='mt-1'>
            <BaseFormGroup
              errors={errors}
              touched={touched}
              messageId={getKeyLang(`notification.approval.reasonInput`)}
              type={`text`}
              fieldName={`reasonReject`}
            />
          </div>
        </FormikProvider>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' type='button' onClick={handleSubmit}>
          {intl.formatMessage({ id: getKeyLang('account.reject') })}
        </Button>
        <Button
          type='button'
          onClick={() => {
            closeModal(false)
          }}
        >
          {intl.formatMessage({ id: getKeyLang('account.cancel') })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default RejectModal
