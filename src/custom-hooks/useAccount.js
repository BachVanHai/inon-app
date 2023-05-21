import { AppId, showConfirmAlert } from 'base-app'
import { approveAccount, changeAccountStatus, deleteAccount } from '../redux/actions/app-no1/account'
import { FormattedMessage } from 'react-intl/lib'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { addAppContextPath } from '../configs/app-no1'

const useAccount = (account) => {

  const dispatch = useDispatch()
  const intl = useIntl()
  const history = useHistory()

  const onClickApproveAccount = () => {
    const messageId = `${AppId.APP_NO1}.account.accountApproval`
    const onConfirm = () => {
      dispatch(approveAccount(account.username, true))
    }
    const onCancel = () => { }
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickRejectAccount = () => {
    const messageId = `${AppId.APP_NO1}.account.refuseApproveAccount`
    const onConfirm = () => {
      dispatch(approveAccount(account.username, false))
    }
    const onCancel = () => { }
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickUnLockAccount = () => {
    const messageId = `${AppId.APP_NO1}.account.unlockAccount`
    const onConfirm = () => {
      dispatch(changeAccountStatus(account.username, 'ACTIVE'))
    }
    const onCancel = () => {}
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickLockAccount = () => {
    const messageId = `${AppId.APP_NO1}.account.lockAccount`
    const onConfirm = () => {
      dispatch(changeAccountStatus(account.username, 'LOCK'))
    }
    const onCancel = () => {}
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickDeleteAccount = () => {
    const messageId = `${AppId.APP_NO1}.account.deleteAccount`
    const onConfirm = () => {
      dispatch(deleteAccount(account.id))
    }
    const onCancel = () => {}
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const onClickEditAccount = () => {
    const messageId = `${AppId.APP_NO1}.account.editAccount`
    const onConfirm = () => {
      history.push(addAppContextPath(`/accounts/create/${account.username}`))
    }
    const onCancel = () => {}
    showConfirmDialog(messageId, account, onConfirm, onCancel)
  }

  const showConfirmDialog = (titleMessageId, account, onConfirm, onCancel) => {
    dispatch(
      showConfirmAlert({
        title: <FormattedMessage id={titleMessageId} />,
        isShow: true,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(
                {
                  id: `${titleMessageId}.confirmMessage`
                },
                { name: `<b class="text-danger">${account.fullName}</b>` }
              )
            }}
          />
        ),
        onConfirm: () => {
          onConfirm()
        },
        onCancel: () => {
          onCancel()
        }
      })
    )
  }

  return {
    onClickApproveAccount,
    onClickRejectAccount,
    onClickUnLockAccount,
    onClickLockAccount,
    onClickDeleteAccount,
    onClickEditAccount
  }
}

export default useAccount
