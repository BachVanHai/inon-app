import { BaseAppUltils, BaseFormGroup, Button } from 'base-app'
import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import 'react-table/react-table.css'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap'
import { getKeyLang } from '../../../../configs/supplement-app'
import NotificationService from '../../../../services/supplement-app/notification'
import { REJECTED } from './utility'
import * as Yup from 'yup';

const RejectModal = ({
  original,
  closeModal,
  reActiveLoadApi,
  isModalOpen,
  device
}) => {
  const intl = useIntl()
  const handleSubmitClick = async (values) => {
    const res = await NotificationService.approvalNotification(original.id,REJECTED,values.rejectReason)
    if (res !== {}) {
      BaseAppUltils.toastSuccess(
        intl.formatMessage({ id: getKeyLang('account.success') })
      )
      reActiveLoadApi()
      return 
    }
    else{
      BaseAppUltils.toastError(
        intl.formatMessage({ id: getKeyLang('account.error') })
      )
      return 
    }
  }
  const validateSchema = Yup.object().shape({
    rejectReason: Yup.string().required('Vui lòng nhập lí do từ chối')
  })
  const formik = useFormik({
    initialValues: {
      rejectReason: ''
    },
    validationSchema : validateSchema,
    onSubmit: handleSubmitClick
  })
  const { handleSubmit, errors, touched } = formik
  return (
    <Modal isOpen={isModalOpen} className='modal-dialog-centered'>
      <ModalHeader>
        <FormattedMessage id={getKeyLang('notification.approval.reasonInput')} />
      </ModalHeader>
      <ModalBody>
        <div className="">
        <FormikProvider value={formik}>
          <div className='mt-1'>
            <BaseFormGroup
              errors={errors}
              touched={touched}
              messageId={getKeyLang(`notification.approval.reasonInput`)}
              type={`text`}
              fieldName={`rejectReason`}
            />
          </div>
        </FormikProvider>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' type='button' onClick={handleSubmit}>
          {intl.formatMessage({ id: getKeyLang('account.reject') })}
        </Button>
        <Button
          type='button'
          onClick={() => {
            closeModal()
          }}
        >
          {intl.formatMessage({ id: getKeyLang('account.cancel') })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default RejectModal
