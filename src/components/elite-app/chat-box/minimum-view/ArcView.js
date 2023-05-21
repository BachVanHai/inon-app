import React from 'react'
import { ArcView, ButtonCloseArcView, TooltipStyled, UnreadMessagesStyled } from './utility'
import AvatarComp from '../normal-view/Avatar'
import * as Icon from 'react-feather'

const ArcViewComp = ({ id, handleClick, backgroundColor, openingRequestRoomInfo, handleClose,unreadMessages }) => {
    return (
        <ArcView
            backgroundColor={backgroundColor}
            className='minium_view-front'
        >
        {
            unreadMessages > 0 ?   <UnreadMessagesStyled top={"0px"} className='unreadMessage'>
            {
                unreadMessages
            }
            </UnreadMessagesStyled> : null
        }
        <TooltipStyled className='tooltips_message'>
                {
                    openingRequestRoomInfo?.title
                }
            </TooltipStyled>
            <AvatarComp
                avatarUrl={openingRequestRoomInfo?.hCUser?.avatar} width="2.8rem"
                onClick={handleClick}
            />
             <ButtonCloseArcView
                onClick={() => handleClose(id)}
                className="btn__closeMessage"
            >
                <Icon.X color="red" width={16} strokeWidth={"5px"} />
            </ButtonCloseArcView>
           
        </ArcView>
    )
}

export default ArcViewComp