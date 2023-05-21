import React, { useState } from 'react'
import styled from 'styled-components'
import { ChevronDown, ChevronRight } from 'react-feather'
import { BaseAppConfigs, Button, useDeviceDetect, usePageAuthorities } from 'base-app'
import * as Icon from 'react-feather'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl/lib'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getKeyLang } from '../../configs/app-no1/index'
import moment from 'moment'
import useAccount from '../../custom-hooks/useAccount'

const getPaddingLeft = (level) => {
  return level * 10
}

const StyledTreeNode = styled.div`
  display: flex;
  overflow: auto;
  min-width: 244px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level)}px;
  
  ::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    background: lightgray;
  }
  
  .user-code {
    @media screen and (max-width: 768px) {
      max-width: 150px;
      min-width: 150px;
    }
    min-width: 350px;
    max-width: 350px;
  }

`

const StyledAccountStatus = styled.div`
  margin-left: 2rem;
  border-radius: 50%;
  min-width: 15px;
  min-height: 15px;
  @media screen and (max-width: 768px) {
    margin-left: 1rem;
  }
`

const StyledChevronDoubleLeft = styled.div`
  position: absolute;
  left: 5px;
  display: flex;
  flex-direction: column;
`

const TreeNode = ({ node, getChildNodes, onToggle, level = 0 }) => {

  const authorities = usePageAuthorities()
  const [centeredModal, setCenteredModal] = useState(false)
  const {username} = useSelector(state => state.auth.user)
  const {isMobile} = useDeviceDetect()

  const isHasAuthority = (authority) => {
    return authorities.indexOf(authority.toUpperCase()) >= 0
  }

  const {
    onClickApproveAccount,
    onClickRejectAccount,
    onClickUnLockAccount,
    onClickLockAccount,
    onClickDeleteAccount,
    onClickEditAccount} = useAccount(node)

  const renderTableButtons = (row) => {

    let buttons = '';

    switch (row.status) {
      case 'AWAITING_APPROVAL':
        buttons = isHasAuthority(BaseAppConfigs.AUTHORITIES.APPROVE) || isHasAuthority('ALL') ? (
          <>
            <Button
              size='sm'
              onClick={() => onClickApproveAccount()}
              className='btn-icon rounded-circle ml-1 ml-md-2'
              color='flat-success'
            >
              <Icon.Check className='vx-icon' size={24} />
            </Button>
            <Button
              size='sm'
              onClick={() => onClickRejectAccount(row)}
              className='ml-1 ml-md-2 btn-icon rounded-circle'
              color='flat-danger'
            >
              <Icon.X className='vx-icon' size={24} />
            </Button>
          </>
        ) : null
        break;
      case 'LOCK':
        buttons = isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
        isHasAuthority('ALL') ? <Button
          size='sm'
          onClick={() => onClickUnLockAccount(row)}
          className='ml-1 ml-md-2 btn-icon rounded-circle'
          color='flat-success'
        >
          <Icon.Unlock className='vx-icon' size={24} />
        </Button> : ''
        break;
      case 'ACTIVE':
        buttons = isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
        isHasAuthority('ALL') ? <Button
          size='sm'
          onClick={() => onClickLockAccount(row)}
          className='ml-1 ml-md-2 btn-icon rounded-circle'
          color='flat-danger'
        >
          <Icon.Lock className='vx-icon' size={24} />
        </Button> : ''
        break;
      case 'REJECTED':
        buttons = isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
        isHasAuthority('ALL') ? <Button
          size='sm'
          onClick={() => onClickDeleteAccount(row)}
          className='ml-1 ml-md-2 btn-icon rounded-circle'
          color='flat-danger'
        >
          <Icon.X className='vx-icon' size={24} />
        </Button> : ''
        break;
    }

    return (
      <div className="d-flex align-items-center ml-1">
        {
          isHasAuthority(BaseAppConfigs.AUTHORITIES.EDIT) ||
          isHasAuthority('ALL') ? <Button
            size='sm'
            onClick={() => onClickEditAccount(row)}
            className='btn-icon rounded-circle'
            color='flat-primary'
          >
            <Icon.Edit3 className='vx-icon' size={24} />
          </Button> : ''
        }
        {buttons}
      </div>
    )
  }

  return (
    <>
      <StyledTreeNode level={level}>
        {(level >=10 && isMobile) ? <StyledChevronDoubleLeft>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-chevron-double-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            <path fill-rule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
        </StyledChevronDoubleLeft> : null}


        <div className="d-flex align-items-center cursor-pointer">
          <div className="d-flex align-items-center user-code mr-1">
            <div onClick={() => onToggle(node)}>
              {node.isOpen ? <ChevronDown /> : <ChevronRight />}
            </div>

            <span className="w-100" onClick={() => setCenteredModal(!centeredModal)}>{node.userCode + ' - ' + node.fullName}</span>
          </div>
          {node.status === 'ACTIVE' ?
            <StyledAccountStatus className='bg-success' /> : null}
          {node.status === 'AWAITING_APPROVAL' ? <StyledAccountStatus className='bg-secondary' /> : null}
          {node.status === 'LOCK' ? <StyledAccountStatus className='bg-danger' /> : null}
        </div>

        {renderTableButtons(node)}

      </StyledTreeNode>
      {
        node.isOpen && getChildNodes(node).map(childNode => (
          <TreeNode onToggle={(childNode) => onToggle(childNode)} node={childNode}
                    getChildNodes={(childNode) => getChildNodes(childNode)} level={level + 1} />
        ))
      }
      <div className='vertically-centered-modal'>
        <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            <FormattedMessage id="setting.accountInformation" />
          </ModalHeader>
          <ModalBody>
            {
              node.dateOfBirth ? <div className="d-flex align-items-center justify-content-between mb-1">
                <div className="font-weight-bold">
                  <FormattedMessage id="completeInformation.dateOfBirth" />
                </div>
                <div>
                {node.dateOfBirth !== null ?  moment(node.dateOfBirth).format("DD/MM/YYYY") : "-"}
                </div>
              </div> : null
            }

            {
              node.icType ? <div className="d-flex align-items-center justify-content-between mb-1">
                <div className="font-weight-bold">
                  <FormattedMessage id={`common.icType.${node.icType}`} />
                </div>
                <div>
                  {node.icNumber !== "" ? node.icNumber : "-"}
                </div>
              </div> : null
            }

            {
              node.phoneNumber ? <div className="d-flex align-items-center justify-content-between mb-1">
                <div className="font-weight-bold">
                  <FormattedMessage id={getKeyLang("account.phoneNumber")} />
                </div>
                <div>
                  {node.phoneNumber}
                </div>
              </div> : null
            }

            {
              node.email ? <div className="d-flex align-items-center justify-content-between mb-1">
                <div className="font-weight-bold">
                  <FormattedMessage id={getKeyLang("partner.account.email")} />
                </div>
                <div>
                  {node.email}
                </div>
              </div> : null
            }

            {username === 'admin' ? (
              <>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <div className="font-weight-bold">
                    <FormattedMessage id={getKeyLang("partner.account.level")} />
                  </div>
                  <div>
                    {node.level}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <div className="font-weight-bold">
                    <FormattedMessage id={getKeyLang("partner.account.managerId")} />
                  </div>
                  <div>
                  {node.managerId !== null ? node.managerId : "-"}
                  </div>
                </div>

              </>
            ) : null}
            <div className="d-flex align-items-center justify-content-between mb-1">
              <div className="font-weight-bold">
                <FormattedMessage id={getKeyLang("partner.account.created")} />
              </div>
              <div>
                {moment(node.createdDate).format("DD/MM/YYYY")}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <div className="font-weight-bold">
                <FormattedMessage id={getKeyLang("account.management.type")} />
              </div>
              <div>
                {node.userType === "HTKD" ? <FormattedMessage id={getKeyLang("account.supportSale")} /> : node.userType === "KD" ?  <FormattedMessage id={getKeyLang("account.sale")} /> : "-" }
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
              <FormattedMessage id={getKeyLang("partner.account.close")} />
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default TreeNode
