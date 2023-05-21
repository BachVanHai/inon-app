import styled from 'styled-components'
import { CenterHorizontalRow } from '../normal-view/utility'

export const MinimumChatBoxStyled = styled.div`
    &:hover {
        background-color: #34BE82
        
    }
    position : relative;
    border-radius: .5rem;
    padding-left : 6px;
    padding-right : 6px;
    background-color: ${p => p.backgroundColor || "#338955"};
    color: white;
    transition: 0.5s;
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    height: 3.6rem;
    width: 16rem;
    @media screen and (max-width : ${p => p.phoneBreakpoint || "768px"}) {
        & {
            width: 45vw;
        }
    }
`

export const MinimumTitle = styled(CenterHorizontalRow)`
    color: white;
    cursor: pointer;
    font-size: 1rem;
    overflow: hidden;
    white-space: nowrap;
    width: 84%;
`

export const MinimumIcon = styled(CenterHorizontalRow)`
    cursor: pointer;
    width: 16%;
    justify-content: end;
`
export const ButtonCloseMessage = styled.div`
    &:hover{
        background-color : #ea5455;
    }
`
export const UnreadMessagesStyled = styled.div`
    top : ${p => p.top || "7px"}; 
    left :  ${p => p.left || "35px"};
    position : absolute;
    z-index: 9999;
    width : 20px;
    height : 20px;
    background-color : red;
    color : #fff;
    text-align : center; 
    line-height : 20px;
    border-radius : 50%;
`
//tool tip when hover avt circle message 
export const TooltipStyled = styled.div`
  position: absolute;
  display : none;
  width :max-content;
  background-color: #4e9f3d;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 10px 10px;
  right: 115%;
  &:after{
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #4e9f3d;
  }
`

export const ArcView = styled.div`
    background-color: ${p => p.backgroundColor || "green"};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: relative;
    width: 3.7rem;
    height: 3.5rem;
    .unreadMessage{
        transition : all .4s ease-in-out;
    }
    &:hover {
        background-color: #34BE82;
        .btn__closeMessage{
        display : block;
     }
     .unreadMessage{
         display : none;
     }
     .tooltips_message{
         display : block;
     }
    }
    margin-bottom: .4rem;
    margin-right: .4rem;
    .btn__closeMessage{
        display : none
    }
`

export const ButtonCloseArcView = styled(ButtonCloseMessage)`
    position: absolute;
    top: -7px;
    right: -5px;
    cursor: pointer;
    &:hover{
        backgroud-color : #fff;
    }
`