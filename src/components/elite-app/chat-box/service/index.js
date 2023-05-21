import { HttpClient } from "base-app"
import SupportService from "../../../../services/app-no1/support"
import { getRealNameOf, KEY_SPLIT_USER_AVATAR } from "../utility"

export const API_HC_MESSAGES_ROOM = "/nth/utilities/api/hc-messages/room"
export const API_ADD_FILE_SUPPORT = "/nth/file/api/upload-file/message"
export const API_ADD_FILE_INFO_HC_USER = "/nth/utilities/api/authenticate/hc-messages"
export const API_USERS = "/nth/user/api/users"
export const API_AUTHENTICATE_HC_SUPPORT_BOOKS = "/nth/utilities/api/authenticate/hc-support-books"

export const getInfoOf = (userName) => {
    if (userName) {
        return HttpClient.get(`${API_USERS}/${userName}`, { isBackgroundRequest: true })
    }
    return HttpClient.get(`${API_USERS}`, { isBackgroundRequest: true })
}

export const getChatlogsOf = (roomId) => {
    return HttpClient.get(`${API_HC_MESSAGES_ROOM}`,
        {
            params: {
                date: new Date().getMilliseconds(),
                roomId: roomId
            },
            isBackgroundRequest: true
        }
    )
}

export const uploadFile = (formData) => {
    return HttpClient.post(`${API_ADD_FILE_SUPPORT}`, formData)
}

export const updateRoomInfo = (roomInfo, status, voteScore, _hasUseAuthenticateApi) => {
    roomInfo.contentText = roomInfo.content
    roomInfo.titleText = roomInfo.title
    const newRequest = {
        contentText: roomInfo.contentText,
        titleText: roomInfo.title,
        hCUserId: roomInfo.hCUserId,
        status: status,
        supporterInOnId: roomInfo.supporterInOnId,
        type: roomInfo.type,
        id: roomInfo.id,
        voteScore: voteScore,
    }
    if (_hasUseAuthenticateApi) {
        return HttpClient.put(`${API_AUTHENTICATE_HC_SUPPORT_BOOKS}/${roomInfo.id}`, newRequest, {
            isBackgroudRequest: true
        })
    }
    return SupportService.updateRequest(roomInfo.id, newRequest)
}

export const uploadNewMessageAttachment = (formData) => {
    return HttpClient.post(`${API_ADD_FILE_INFO_HC_USER}`, formData)
}

export const updateRequestRoomStatus = (roomInfo, status) => {
    roomInfo.contentText = roomInfo.content
    roomInfo.titleText = roomInfo.title
    const newRequest = {
        contentText: roomInfo.contentText,
        titleText: roomInfo.title,
        hCUserId: roomInfo.hCUserId,
        status: status,
        supporterInOnId: roomInfo.supporterInOnId,
        type: roomInfo.type,
        id: roomInfo.id
    }
    return SupportService.updateRequest(roomInfo.id, newRequest)
}

export const sendNotifyLog = (sockJs, contentText, currentUser, roomId, roomInOnId, hCSupportBookId) => {
    const sendMess = (_roomId) => {
        sockJs.sendMessage(
            `/app/chat/${_roomId}`,
            JSON.stringify({
                fromUser: currentUser.id + KEY_SPLIT_USER_AVATAR
                    + getRealNameOf(currentUser) + KEY_SPLIT_USER_AVATAR
                    + currentUser?.userSettings.avatar + KEY_SPLIT_USER_AVATAR
                    + getRealNameOf(currentUser, true),
                contentText: contentText,
                roomId: _roomId,
                hCSupportBookId: hCSupportBookId,
                contentContentType: "notify-log"
            })
        )
    }
    sendMess(roomId)
    sendMess(roomInOnId)
}