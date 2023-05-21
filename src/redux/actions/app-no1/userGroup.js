import React from 'react'
import { AppId, BaseAppUltils } from 'base-app'
import { FormattedMessage } from 'react-intl'
import { history } from '../../../history'
import UserGroupService from '../../../services/app-no1/userGroup'
import { addAppContextPath } from '../../../configs/app-no1'

export const ACTION_LOAD_ROLES = 'ACTION_LOAD_ROLES'
export const ACTION_LOAD_USER_GROUPS = 'ACTION_LOAD_USER_GROUPS'
export const ACTION_LOAD_ACCOUNT_IN_GROUP = 'ACTION_LOAD_ACCOUNT_IN_GROUP'

export const loadListRoles = (groupId) => {
  return async (dispatch) => {
    try {
      let res = await UserGroupService.getRoles()
      if (res.status === 200) {
        const roles = res.data
        let userRoles = []
        if (groupId) {
          res = await UserGroupService.getUserRoles(groupId)
          userRoles = res.data
        }
        dispatch({
          type: ACTION_LOAD_ROLES,
          payload: mapRoleToDisplay(roles, userRoles)
        })
      }
    } catch (error) {}
  }
}

export const loadUserGroup = (isReload) => {
  return async (dispatch) => {
    let res = await UserGroupService.getUserGroups(isReload)
    if (res.status === 200) {
      dispatch({
        type: ACTION_LOAD_USER_GROUPS,
        payload: res.data
      })
    }
  }
}

export const loadListAccountInGroup = (groupId) => {
  return async (dispatch) => {
    let res = await UserGroupService.getAccountInGroup(groupId)
    if (res.status === 200) {
      dispatch({
        type: ACTION_LOAD_ACCOUNT_IN_GROUP,
        payload: res.data
      })
    }
  }
}

export const updateUserGroup = (values, userRoles) => {
  return async (dispatch) => {
    const res = await UserGroupService.updateUserGroup({
      ...values,
      id: values.userGroupId
    })
    if (
      res.status === 200 &&
      (await updateUserGroupRoles(values.userGroupId, userRoles))
    ) {
      BaseAppUltils.toastSuccess(
        <FormattedMessage id={`${AppId.APP_NO1}.userGroup.processDone`} />
      )
      history.push(addAppContextPath(`/permission-group/management`))
    }
  }
}

export const createNewUserGroup = async (values, userRoles) => {
  const res = await UserGroupService.createUserGroup(values)
  if (
    res.status === 201 &&
    (await updateUserGroupRoles(res.data.id, userRoles))
  ) {
    BaseAppUltils.toastSuccess(
      <FormattedMessage id={`${AppId.APP_NO1}.userGroup.createDone`} />
    )
    history.push(addAppContextPath(`/permission-group/management`))
  }
}

export const deleteUserGroup = (userGroupId) => {
  return async (dispatch) => {
    const res = await UserGroupService.deleteUserGroup(userGroupId)
    if (res.status === 204) {
      BaseAppUltils.toastSuccess(
        <FormattedMessage id={`${AppId.APP_NO1}.userGroup.deleteSuccess`} />
      )
      dispatch(loadUserGroup(true))
    }
  }
}

const updateUserGroupRoles = async (userGroupId, userRoles) => {
  const groupRoles = getUserRolesToUpdate(userGroupId, userRoles)
  const res = await UserGroupService.updateUserGroupRoles(
    userGroupId,
    groupRoles
  )
  return res.status === 200
}

const getUserRolesToUpdate = (userGroupId, userRoles) => {
  const listRole = []
  const listParentUpdate = []
  const defaultItem = { userGroupId, roleId: '', authority: '' }
  for (const role of userRoles) {
    let canViewParent = false
    if (role.view && role.edit && role.create && role.approve) {
      listRole.push({ ...defaultItem, roleId: role.id, authority: 'ALL' })
      canViewParent = true;
      listParentUpdate.push(...role.parentIds)
      continue
    }
    if (role.view) {
      listRole.push({ ...defaultItem, roleId: role.id, authority: 'VIEW' })
      canViewParent = true;
    }
    if (role.edit) {
      listRole.push({ ...defaultItem, roleId: role.id, authority: 'EDIT' })
      canViewParent = true;
    }
    if (role.create) {
      listRole.push({ ...defaultItem, roleId: role.id, authority: 'CREATE' })
      canViewParent = true;
    }
    if (role.approve) {
      listRole.push({ ...defaultItem, roleId: role.id, authority: 'APPROVE' })
      canViewParent = true;
    }
    if (canViewParent) {
      listParentUpdate.push(...role.parentIds)
    }
  }
  new Set([...listParentUpdate]).forEach((roleId) => {
    listRole.push({ ...defaultItem, roleId, authority: 'VIEW' })
  })
  return listRole
}

const mapRoleToDisplay = (roles, userRoles) => {
  const mapRoles = new Map()
  roles.forEach((role) => {
    const listRole = mapRoles.get(role.parentId)
    if (listRole) {
      listRole.push(role)
      mapRoles.set(role.parentId, listRole)
    } else {
      mapRoles.set(role.parentId, [role])
    }
  })
  let parentList = mapRoles.get(null)
  parentList = parentList.map((item) => {
    item.children = mapRoles.get(item.id + '')
    setAuthorities(item, userRoles)
    return item
  })
  parentList.forEach((parent) => {
    parent.children2 = parent.children.filter((item) => {
      setAuthorities(item, userRoles)
      return item.order > 1000
    })
    parent.children1 = parent.children
      .filter((item) => {
        setAuthorities(item, userRoles)
        return item.order < 1000
      })
      .map((item) => {
        item.children = mapRoles.get(item.id + '') || []
        const children = item.children.map(v => {
          setAuthorities(v, userRoles)
          return v;
        } )
        parent.children2.push(...children)
        return item
      })
  })
  return parentList
}

const setAuthorities = (item, userRoles) => {
  const authorities = userRoles
    .filter((v) => v.roleId === item.id)
    .map((v) => v.authority)
  item.view = authorities.some(
    (v) => ['ALL', 'VIEW', 'EDIT', 'CREATE', 'APPROVE'].indexOf(v) >= 0
  )
  item.edit = authorities.some((v) => ['ALL', 'EDIT'].indexOf(v) >= 0)
  item.create = authorities.some((v) => ['ALL', 'CREATE'].indexOf(v) >= 0)
  item.approve = authorities.some((v) => ['ALL', 'APPROVE'].indexOf(v) >= 0)
}
