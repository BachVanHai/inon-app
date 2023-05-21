import { FormattedMessage } from 'base-app'
import { Button } from 'base-app'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Table from 'reactstrap/lib/Table'
import { getKeyLang } from '../../../../configs/supplement-app'

const HistoryModal = ({ isOpen, closeModal, original }) => {
  return (
    <Modal
      isOpen={isOpen}
      className='modal-dialog-centered modal-xl'
      toggle={() => closeModal()}
    >
      <ModalHeader toggle={() => closeModal()}>
        <FormattedMessage
          id={getKeyLang('evoucher.management.history.title')}
        />
      </ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead>
            <tr>
              <th>
                <FormattedMessage id={getKeyLang('evoucher.management.history.contractCode')}/>
              </th>
              <th>
              <FormattedMessage id={getKeyLang('evoucher.management.history.date')}/>
              </th>
              <th>
                 <FormattedMessage id={getKeyLang('evoucher.management.history.name')}/>
              </th>
              <th>
              <FormattedMessage id={getKeyLang('evoucher.management.history.evoucherCode')}/>
              </th>
              <th>
              <FormattedMessage id={getKeyLang('evoucher.management.history.contractValues')}/>
              </th>
              <th>  <FormattedMessage id={getKeyLang('evoucher.management.history.promtionAmount')}/></th>
            </tr>
          </thead>
          <tbody>
          {
            original.length === 0 ? <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-uppercase text-center font-weight-bold">
                <FormattedMessage id={getKeyLang('evoucher.management.history.empty')}/>
              </td>
              <td></td>
              <td></td>
            </tr> : 
            original.map((voucher,index) =>(
              <tr key={index}>
                <td>
                  {voucher.contractId}
                </td>
                <td>
                  {voucher.usedDate}
                </td>
                <td>
                  {voucher.usedDate}
                </td>
                <td>
                  {voucher.code}
                </td>
                <td>
                  {voucher.discountValue}
                </td>
                <td>
                  {voucher.discountValue}
                </td>
              </tr>
              
            ))
          }
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  )
}

export default HistoryModal
