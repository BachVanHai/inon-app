import { ACTION_RESET_ALL, ACTION_UPDATE_PROPS } from './reducer/ChatBox'
import * as _ from '../../../ultity'

export const KEY_SPLIT_USER_AVATAR = "___"

export const MAX_FRONT_MINIMIZE_CHATS_SHOW = 3
export const MAX_BACK_MINIMIZE_CHATS_SHOW = 4

export const MOBILE_MAX_FRONT_MINIMIZE_CHATS_SHOW = 1
export const MOBILE_MAX_BACK_MINIMIZE_CHATS_SHOW = 5

export const useGetUserSignIn = _.useGetUserSignIn

export const useIsUserSignIn = () => {
    if (!useGetUserSignIn()) {
        return false
    }
    return true
}

export const isUserCreateThisRequest = (currentUser, createdBy) => {
    const _currentUserId = (currentUser?.id?.toString() === "1" || currentUser?.id?.toString() === "2") ? "2" : currentUser?.id?.toString()
    const _createdBy = (createdBy?.toString() === "1" || createdBy?.toString() === "2") ? "2" : createdBy?.toString()
    return _currentUserId === _createdBy
}

export const isUserInFollowerInOn = (flowerInOnId, currentUser) => {
    return flowerInOnId?.match(new RegExp(currentUser.id?.toString()))
}

export const isUserSupporter = (currentUser, openingRequestRoomInfo) => {
    const _currentUserId = (currentUser.id?.toString() === "1" || currentUser.id?.toString() === "2") ? "2" : currentUser.id?.toString()
    const _supporterInOnId = (openingRequestRoomInfo.supporterInOnId?.toString() === "1"
        || openingRequestRoomInfo.supporterInOnId?.toString() === "2") ? "2" : openingRequestRoomInfo.supporterInOnId?.toString()
    return _currentUserId === _supporterInOnId
}

export const getRealNameOf = (user, isUserName) => {
    const { username, fullName } = user
    if (isUserName) {
        return username
    }
    return fullName
}

export const getAvatarOf = (user) => {
    return user?.userSettings?.avatar
}

export const updateProps = (props) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_UPDATE_PROPS,
                payload: props
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const resetState = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ACTION_RESET_ALL,
            })
        } catch (error) {
            console.log(error)
        }
    }
}