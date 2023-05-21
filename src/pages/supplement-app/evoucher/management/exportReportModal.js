import { Modal , ModalBody, ModalFooter, ModalHeader ,Row ,Col } from 'reactstrap'
import React, { useState } from 'react'
import {Button ,Checkbox} from 'base-app';
import { Check } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { getKeyLang } from '../../../../configs/supplement-app';
const ExportReportModal = ({isOpen,closeModal}) => {
    const [checkedAllStatus, setCheckedAllStatus] = useState(true);
    return (
        <Modal isOpen={isOpen} className="modal-lg">
        <ModalHeader toggle={() => closeModal()}>
        Bạn muốn xuất báo cáo những thông tin nào ?
        </ModalHeader>
        <ModalBody>
        <Row>
        <Col md={6}>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.selectAll')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.packageCode')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.packageName')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.dateFrom')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.dateTo')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.form')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.status')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.columns.createBy')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.minValuesContract')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.valuesDiscount')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.precentDiscount')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.maxDiscount')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.theSamePrice')}
          />
      </div>
      
        </Col>
        <Col>
        <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.productName')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.insuranceBranch')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.applyFor')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.totalVoucherRelease')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.totalVoucherUsed')}
          />
      </div>
      <div className="mb-2 d-flex align-items-center">
            <Checkbox checked={checkedAllStatus} color='primary' icon={<Check className='vx-icon' size={16} />}/>
            <FormattedMessage
            id={getKeyLang('evoucher.management.historyUsed')}
          />
      </div>
        </Col>
        </Row>
        </ModalBody>
        <ModalFooter>
        <Button.Ripple
            color='primary'
            className=''
          >
             <FormattedMessage
                  id={getKeyLang('account.finish')}
                />
          </Button.Ripple>
        </ModalFooter>
        </Modal>
    )
}

export default ExportReportModal
