import { NAME_CHAT_BOX } from "../../../../configs/insurance-app"
import { ROOM_TYPE_GUEST } from "../normal-view/utility"

/**
    @description
    viewSizeStatus has 4 option which are: "minimize" , "normal", "maximize", "arc"
 */
export const getDefault_minimumChatObj = (roomId, roomInOnId, title, viewSizeStatus) => {
    return ({
        id: roomId,
        roomInOnId: roomInOnId,
        title: title,
        activeTab: ROOM_TYPE_GUEST,
        viewSizeStatus: viewSizeStatus,
        unreadMessages: 0,
        userAvatars: {},
        _forceUpdate: 0,
        _hasChangedSize: false,
    })
}


export const NAME_CREATE_SUPPORT_REQUEST = "create-support-request"

export const VIEW_SIZE_ARC = "arc"
export const VIEW_SIZE_MINIMIZE = "minimize"
export const VIEW_SIZE_NORMAL = "normal"
export const VIEW_SIZE_MAXIMIZE = "maximize"

export const ACTION_UPDATE_PROPS = "ACTION_" + NAME_CHAT_BOX.toUpperCase() + "_UPDATE_PROPS"
export const ACTION_RESET_ALL = "ACTION_" + NAME_CHAT_BOX.toUpperCase() + "_RESET"
export const CONNECTING_STATUS_SUCCESS = "success"
export const CONNECTING_STATUS_DISCONNECTED = "discconnected"
export const CONNECTING_STATUS_NOT_CONNECT = "not-connect"

export const KEY_TEMP_USER_INFO = "tempUserInfo"
export const KEY_MINIMUM_CHATS = 'minimumChats'
export const KEY_CONNECTING_STATUS = "connectingStatus"
export const KEY_OPENING_REQUEST_ROOMS_INFO = "openingRequestRoomsInfo"
export const KEY_IS_RATE_MODAL_OPEN = "isRateModalOpen"
export const KEY_PAGE_CLICKED = "pageClicked"
export const KEY_ALL_USER = 'userSuggestionChatbox'
export const KEY_FORCE_UPDATE = "_forceUpdate"

const initialState = {
    [KEY_TEMP_USER_INFO]: {},
    [KEY_MINIMUM_CHATS]: [],
    [KEY_CONNECTING_STATUS]: CONNECTING_STATUS_NOT_CONNECT,
    [KEY_OPENING_REQUEST_ROOMS_INFO]: [],
    [KEY_IS_RATE_MODAL_OPEN]: false,
    [KEY_FORCE_UPDATE]: 0,
    [KEY_PAGE_CLICKED]: "",
    [KEY_ALL_USER]: []
}

const ChatBoxReducer = (state = initialState, action) => {
    const { payload, type } = action
    let _draftState = { ...state }

    switch (type) {
        case ACTION_UPDATE_PROPS:
            for (let item of payload) {
                const { prop, value } = item
                _draftState[prop] = value
            }
            return _draftState

        case ACTION_RESET_ALL:
            return initialState

        case "LOGOUT_ACTION":
            return initialState
        default:
            return state
    }
}

export default ChatBoxReducer