import React, { useMemo, useState } from 'react'
import 'react-table/react-table.css'
import { getKeyLang } from '../../../../../configs/supplement-app'
import {
    Row,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup
} from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { BaseAppUltils, BaseFormGroup, Button, Select } from 'base-app'
import DebtService from '../../../../../services/supplement-app/debt'
import { REJECT, NOT_ACCEPT, CHANGE_LIMIT, OTHER } from './utility'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'

const RejectModal = ({
  original,
  closeModal,
  reActiveLoadApi,
  isModalOpen,
  device
}) => {
  const intl = useIntl()
  const denyReasonsOption = useMemo(() => {
    return [
      {
        label: intl.formatMessage({
          id: getKeyLang(`account.rejectDebtAccount.notAccept`)
        }),
        content: NOT_ACCEPT,
        value: 1
      },
      {
        label: intl.formatMessage({
          id: getKeyLang(`account.rejectDebtAccount.changeLimit`)
        }),
        content: CHANGE_LIMIT,
        value: 2
      },
      {
        label: intl.formatMessage({ id: getKeyLang(`otherReason`) }),
        content: OTHER,
        value: 3
      }
    ]
  }, [])
  const [denyReason, setDenyReason] = useState(denyReasonsOption[0])

  const handleSubmitClick = async (values) => {
    // return console.log(`handleSubmitClick.values`, values)
    let _denyReason = denyReason.content
    if (denyReason.content === OTHER) {
      _denyReason = values.otherReason
    }
    const resolvedData = await DebtService.approvalAccount(
      original.id,
      REJECT,
      _denyReason
    )
    if (resolvedData) {
      BaseAppUltils.toastSuccess(
        intl.formatMessage({ id: getKeyLang('account.success') })
      )
      reActiveLoadApi()
      return true
    }
    BaseAppUltils.toastError(
      intl.formatMessage({ id: getKeyLang('account.error') })
    )
    return false
  }

  const formik = useFormik({
    initialValues: {
      otherReason: denyReasonsOption[0]
    },
    validationSchema: Yup.object().shape({
      otherReason: Yup.string()
        .min(3, intl.formatMessage({ id: getKeyLang(`alert.min_characters`) }))
        .required(
          intl.formatMessage({
            id: getKeyLang(`alert.required_empty`)
          })
        )
    }),
    onSubmit: handleSubmitClick
  })
  const { handleSubmit, setFieldValue, errors, touched } = formik
  return (
    <Modal isOpen={isModalOpen} className='modal-dialog-centered'>
      <ModalHeader>
        <FormattedMessage id={getKeyLang('bonus.detail')} />
      </ModalHeader>
      <ModalBody>
        <Row className='justify-content-center'>
          <FormikProvider value={formik}>
            <FormGroup className='w-75'>
              <Select
                name
                readOnly
                closeMenuOnSelect={true}
                classNamePrefix='select mt-1'
                onChange={(reason) => {
                  setFieldValue(`otherReason`, 'Nhập lý do')
                  setDenyReason(reason)
                }}
                value={denyReason}
                options={denyReasonsOption}
                isClearable={false}
              />
              {denyReason.content === OTHER && (
                <div
                  onClick={() => {
                    setFieldValue(`otherReason`, '')
                  }}
                >
                  <BaseFormGroup
                    fieldName='otherReason'
                    errors={errors}
                    touched={touched}
                    messageId={getKeyLang(`otherReason`)}
                  />
                </div>
              )}
            </FormGroup>
          </FormikProvider>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' type='button' onClick={handleSubmit}>
          {intl.formatMessage({ id: getKeyLang('account.reject') })}
        </Button>
        <Button
          type='button'
          onClick={() => {
            closeModal()
            setDenyReason(denyReasonsOption[0])
          }}
        >
          {intl.formatMessage({ id: getKeyLang('account.cancel') })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default RejectModal
