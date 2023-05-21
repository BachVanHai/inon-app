import React from 'react'
import imgFeedback_1_color from '../../../assets/images/elite-app/chat-box/feedback_1_color.png'
import imgFeedback_2_color from '../../../assets/images/elite-app/chat-box/feedback_2_color.png'
import imgFeedback_3_color from '../../../assets/images/elite-app/chat-box/feedback_3_color.png'
import imgFeedback_4_color from '../../../assets/images/elite-app/chat-box/feedback_4_color.png'
import imgFeedback_5_color from '../../../assets/images/elite-app/chat-box/feedback_5_color.png'
import { NAME_CHAT_BOX } from '../../../configs/insurance-app'
import { hasRequestFail, isObjEmpty } from '../../../ultity'
import useConfirm from '../../insurance-app/custom-modal/confirm/useConfirm'
import useCustomModal from '../../insurance-app/custom-modal/modal/useCustomModal'
import { KEY_FORCE_UPDATE, KEY_IS_RATE_MODAL_OPEN, KEY_MINIMUM_CHATS, KEY_OPENING_REQUEST_ROOMS_INFO } from './reducer/ChatBox'
import * as Service from './service'
import { getRealNameOf, isUserCreateThisRequest, isUserInFollowerInOn, isUserSupporter, updateProps } from './utility'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { MediaStyled } from '../../../pages/app-no1/support/detailRequest/DeailMesssage'
import { LineStyles } from '../../../pages/app-no1/support/detailRequest/DeailMesssage'
import { BaseAppUltils } from 'base-app'
import styled from 'styled-components'
import { usePageContext } from '../../../components/insurance-app/common-page/page-context/PageContext'
import { DONE, LIST_STATUS_FILTER } from '../../../pages/app-no1/support/utility'
import moment from 'moment'

export const default_activedIcons = [
    {
        imgUrl_color: imgFeedback_1_color,
        id: `id_imgFeedback_1`,
        isActive: false,
        content: "Thất vọng",
        contentValue: 1
    },
    {
        imgUrl_color: imgFeedback_2_color,
        id: `id_imgFeedback_2`,
        isActive: false,
        content: "Chưa tốt",
        contentValue: 2
    },
    {
        imgUrl_color: imgFeedback_3_color,
        id: `id_imgFeedback_3`,
        isActive: false,
        content: "Bình thường",
        contentValue: 3
    },
    {
        imgUrl_color: imgFeedback_4_color,
        id: `id_imgFeedback_4`,
        isActive: false,
        content: "Hài lòng",
        contentValue: 4
    },
    {
        imgUrl_color: imgFeedback_5_color,
        id: `id_imgFeedback_5`,
        isActive: false,
        content: "Tuyệt vời",
        contentValue: 5
    },
]

const TextAreaStyled = styled.textarea`
border: 1px solid #EDEDED;
`
/**
 * @example
   <VoteModal currentUser={currentUser} roomInfo={roomInfo} /> // can omited roomInfo prop
 */
const RateModal = ({ roomInfo, currentUser, isTempUser }) => {
    const dispatch = useDispatch()
    const {
        [KEY_IS_RATE_MODAL_OPEN]: closeClickedRoomId,
        [KEY_FORCE_UPDATE]: dispatchDependency,
        [KEY_OPENING_REQUEST_ROOMS_INFO]: openingRequestRoomsInfo,
        [KEY_MINIMUM_CHATS]: minimumChats,
    } = useSelector(state => state.app[NAME_CHAT_BOX])
    const [pageObj] = usePageContext()
    const { sockJs } = pageObj

    let roomRequestInfo = roomInfo
    if (!roomInfo) {
        roomRequestInfo = openingRequestRoomsInfo.find(elt => elt.roomId?.toString() === closeClickedRoomId?.toString())
    }
    if (!roomRequestInfo) {
        roomRequestInfo = openingRequestRoomsInfo[openingRequestRoomsInfo.length - 1]
    }

    const { voteScore } = roomRequestInfo ? roomRequestInfo : { voteScore: 0 }
    const roomId = roomRequestInfo?.roomId
    const roomInOnId = roomRequestInfo?.roomInOnId

    const [openCustomModal, CustomModal] = useCustomModal()
    const [openModal, ConfirmModal] = useConfirm(
        "Đánh giá",
        "",
        "Gửi",
        "Bỏ qua",
        true,
        'w-100 text-center',
        'font-weight-bold text-uppercase'
    )

    const setRateModalOpen = (isOpen) => {
        dispatch(updateProps([
            {
                prop: KEY_IS_RATE_MODAL_OPEN,
                value: isOpen
            }
        ]))
    }

    const setDispatchAcitive = () => {
        dispatch(updateProps([
            {
                prop: KEY_FORCE_UPDATE,
                value: dispatchDependency + 1
            }
        ]))
    }

    const closeChat = () => {
        const _new_openingRequestRoomInfo = openingRequestRoomsInfo.filter(_elt => _elt.roomId.toString() !== roomId.toString())
        const _new_minimumChats = minimumChats.filter(elt => elt.id.toString() !== roomId.toString())
        dispatch(updateProps([
            {
                prop: KEY_MINIMUM_CHATS,
                value: _new_minimumChats
            },
            {
                prop: KEY_OPENING_REQUEST_ROOMS_INFO,
                value: _new_openingRequestRoomInfo
            },
        ]))
    }

    const textAreaRef = React.useRef(null)
    const [activedIcons, setActivedIcons] = React.useState(default_activedIcons)

    React.useEffect(() => {
        const Content = ({ activedIcons, setActivedIcons, textAreaRef }) => {
            const [inputVal, setInputVal] = React.useState(textAreaRef.current?.textContent || "Tôi hài lòng với sự hỗ trợ của InOn")

            const handleClick = (e) => {
                const targetId = e.target.id
                setActivedIcons(pre => {
                    return pre.map(elt => {
                        if (elt.id === targetId) {
                            if (elt.isActive) {
                                elt.isActive = false
                            } else {
                                elt.isActive = true
                            }
                        } else {
                            elt.isActive = false
                        }
                        return elt
                    })
                })
            }

            return (
                <div>
                    <div className="mb-2 w-100 d-flex justify-content-center">
                        Bạn có hài lòng về dịch vụ hỗ trợ của InOn?
                    </div>
                    <div className="w-100 px-2 d-flex justify-content-center mb-2">
                        {
                            activedIcons.map(elt => {
                                const { id, imgUrl_color, isActive } = elt
                                return (
                                    <div key={id} className="d-flex w-25 flex-column align-items-center cursor-pointer">
                                        <MediaStyled
                                            key={id} id={id}
                                            isActive={isActive}
                                            onClick={handleClick}
                                            src={imgUrl_color}
                                            style={{ width: "3.5rem", height: "3.5rem" }}
                                        />
                                        <LineStyles>
                                            <div className={id}></div>
                                        </LineStyles>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div >
                        <TextAreaStyled
                            id={"textarea-unique-id"} ref={textAreaRef}
                            style={{ width: "100%", height: "5.8rem" }}
                            value={inputVal} onChange={(e) => {
                                setInputVal(e.target.value)
                            }}
                            placeholder="Nhập nhận xét của bạn"
                            className="pt-1 pl-1"
                        />
                    </div>
                </div>
            )
        }
        // opening the first modal
        const setupObj = {
            isCentered: true,
            yesAction: () => {
                const textContent = textAreaRef.current.textContent || ""
                const foundIcon = activedIcons.find(elt => elt.isActive === true)
                if (!foundIcon) {
                    BaseAppUltils.toastError("Bạn chưa lựa chọn gì cả!")
                    return true
                }

                Service.updateRoomInfo(roomRequestInfo, DONE, foundIcon.contentValue + "___" + textContent, true)
                    .then(res => {
                        if (hasRequestFail(res.status)) return
                        setDispatchAcitive()
                        if (!isTempUser) return

                        const updateDate = moment(res.data.updatedDate).format("DD-MM-YYYY H:mm")
                        Service.sendNotifyLog(sockJs,
                            `${updateDate} ` + getRealNameOf(currentUser) + " đã thay đổi trạng thái sang " + LIST_STATUS_FILTER.find(elt => elt.type === DONE)?.name,
                            currentUser,
                            roomId,
                            roomInOnId,
                            roomRequestInfo.id
                        )
                    })
                /** opening second modal after the first one close by clicked yesAction */
                let _content = "InOn ghi nhận ý kiến của bạn và sẽ cải thiện dịch vụ trong thời gian tới"
                if (foundIcon.contentValue > 3) {
                    _content = "InOn ghi nhận ý kiến của bạn và sẽ luôn làm bạn hài lòng"
                }
                const _setupObj = {
                    isCentered: true,
                    isOpen: true,
                    title: "Xin cám ơn",
                    content: (
                        <div>
                            <div className="w-100 px-2 d-flex justify-content-center mb-2">
                                {
                                    activedIcons.map(elt => {
                                        const { id, imgUrl_color, isActive } = elt
                                        return (
                                            <div key={id} className="d-flex w-25 flex-column align-items-center">
                                                <MediaStyled
                                                    key={id} id={id}
                                                    isActive={isActive}
                                                    src={imgUrl_color}
                                                    style={{ width: "3.5rem", height: "3.5rem" }}
                                                />
                                                <LineStyles>
                                                    <div className={id}></div>
                                                </LineStyles>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="mb-1 w-100 d-flex justify-content-center text-center" style={{ fontSize: "1.3rem" }}>
                                {_content}
                            </div>
                        </div>
                    ),
                    titleStyled: 'w-100 text-center font-weight-bold text-uppercase mt-1'
                }
                setRateModalOpen(false)
                openCustomModal(_setupObj)
                closeChat()
            },
            noAction: () => {
                setRateModalOpen(false)
            },
            content: <Content activedIcons={activedIcons} setActivedIcons={setActivedIcons} textAreaRef={textAreaRef} />
        }

        if (!closeClickedRoomId
            || voteScore
            || isObjEmpty(roomRequestInfo)
            || isUserSupporter(currentUser, roomRequestInfo)) {
            setRateModalOpen(false)
            return
        }
        if (isUserInFollowerInOn(roomRequestInfo?.flowerInOnId, currentUser)) {
            if (!isUserCreateThisRequest(currentUser, roomRequestInfo?.createdBy)) {
                setRateModalOpen(false)
                return
            }
        }

        openModal(setupObj)
    }, [JSON.stringify(roomRequestInfo), JSON.stringify(activedIcons), closeClickedRoomId])

    return (
        <div className='vote-modal'>
            {CustomModal}
            {ConfirmModal}
        </div>
    )
}

export default RateModal