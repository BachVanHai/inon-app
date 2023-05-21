import React from 'react'
import { BaseAppUltils } from 'base-app'
import { TabContent, TabPane, Nav } from 'reactstrap'
import {
    ChatBoxHeader,
    HeaderTopIcon,
    RateInputStyled,
    HeaderTop,
    HeaderBelow,
    ChatBoxBody,
    ChatBoxFooter,
    IconXStyled,
    IconMinusStyled,
    ROOM_TYPE_GUEST,
    ROOM_TYPE_INON,
    ButtonCloseMessageStyled,
    getChatRowId
} from './utility'
import ChatInput from './ChatInput'
import {
    KEY_IS_RATE_MODAL_OPEN,
    VIEW_SIZE_MINIMIZE,
    VIEW_SIZE_ARC,
} from '../reducer/ChatBox'
import { updateProps } from '../utility'
import AvatarComp from './Avatar'
import { Link } from 'react-router-dom'

const BaseView = ({ viewInfo }) => {
    const { renderGuestChatRow, renderInOnChatRow, openingRequestRoomInfo, handleChangeSizeViewStatus, title,
        handleClose, renderTabs, shouldShowInput, shouldShowRateButton, roomId, active, isEnable, handleChatSubmit, handleInputChange,
        inputVal, handleSendMsg, handleUploadMultiFile, users, voteScore, isMobile, isUserSupporter, dispatch,
        componentsHeight, _messagesOfThisRoom, _room_id_by_active } = viewInfo

    React.useEffect(() => {
        const lastEltIndex = _messagesOfThisRoom.length - 1
        const emit = document.getElementById(
            getChatRowId(_room_id_by_active, lastEltIndex)
        )
        if (!emit) return
        emit.scrollIntoView(true)
    }, [_messagesOfThisRoom.length])

    return (
        <>
            <ChatBoxHeader height={componentsHeight.headerHeight} display={componentsHeight.headerDisplay}>
                <HeaderTop
                    backgroundColor={isEnable ? '#106d5a' : 'gray'}
                    height={componentsHeight.headerTopHeight}
                    borderRadius={isMobile && "initial"}
                >
                    <div className="d-flex align-items-center">
                        <AvatarComp avatarUrl={openingRequestRoomInfo?.hCUser?.avatar} />
                        <Link to={`/app/support/chat/${openingRequestRoomInfo?.id}`}>
                            <div className="ml-1" style={{ color: "#fff" }}>{title}</div>
                        </Link>
                    </div>
                    <div className='d-flex'>
                        <HeaderTopIcon
                            onClick={() => {
                                if (isMobile) {
                                    handleChangeSizeViewStatus(roomId, VIEW_SIZE_ARC)
                                    return
                                }
                                handleChangeSizeViewStatus(roomId, VIEW_SIZE_MINIMIZE)
                            }}
                            className='mr-2'
                        >
                            <IconMinusStyled width={18} />
                        </HeaderTopIcon>

                        <ButtonCloseMessageStyled onClick={handleClose.bind(null, roomId)}>
                            <IconXStyled width={18} />
                        </ButtonCloseMessageStyled>
                    </div>
                </HeaderTop>

                <HeaderBelow height={componentsHeight.headerBelowHeight}>
                    <Nav tabs className='w-100 m-0 overflow-hidden'>
                        {renderTabs()}
                    </Nav>
                </HeaderBelow>
            </ChatBoxHeader>

            <ChatBoxBody height={componentsHeight.bodyHeight} display={componentsHeight.bodyDisplay}>
                <TabContent className='h-100' activeTab={active}>
                    <TabPane tabId={ROOM_TYPE_GUEST}>{renderGuestChatRow()}</TabPane>
                    <TabPane tabId={ROOM_TYPE_INON}>{renderInOnChatRow()}</TabPane>
                </TabContent>
            </ChatBoxBody>

            <ChatBoxFooter height={componentsHeight.footerHeight} display={componentsHeight.footerDisplay}>
                {shouldShowInput ?
                    (
                        <ChatInput
                            placeholder={'Aa'}
                            handleSubmit={handleChatSubmit}
                            handleInputChange={handleInputChange}
                            value={inputVal}
                            isEnable={isEnable}
                            openingRequestRoomInfo={openingRequestRoomInfo}
                            handleSendMsg={handleSendMsg}
                            handleUploadMultiFile={handleUploadMultiFile}
                        />
                    )
                    :
                    shouldShowRateButton &&
                    (
                        <RateInputStyled
                            onClick={() => {
                                if (isUserSupporter) {
                                    BaseAppUltils.toastError("Đánh giá không dành cho người xử lý")
                                    return
                                }
                                if (voteScore) {
                                    return
                                }
                                dispatch(updateProps([
                                    {
                                        prop: KEY_IS_RATE_MODAL_OPEN,
                                        value: true
                                    }
                                ]))
                            }}
                        >
                            Đánh giá dịch vụ hỗ trợ
                        </RateInputStyled>
                    )}
            </ChatBoxFooter>
        </>
    )
}

export default BaseView