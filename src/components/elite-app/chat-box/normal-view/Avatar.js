import React from 'react'
import styled from "styled-components";

const Div = styled.div`
    width: ${props => props.width ? props.width : "2.5rem"};
    height: fit-content;
    position: relative;
    margin-left: .2rem;
    margin-right: .2rem;
    cursor: pointer;
`
const Img = styled.img`
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: ${props => props.background || "inherit"};
`
const WHequalContent = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: ${props => props.zIndex || "inherit"};
    padding: ${props => props.padding || "0"};
`
const WHequalPointer = styled.div`
    padding-top: 100%;
`

const AvatarComp = ({ width, isHide, avatarUrl, onClick, className , style }) => {
    const renderImg = () => {
        return avatarUrl || "https://www.w3schools.com/howto/img_avatar2.png"
    }

    return (
        <Div width={width} className={className} onClick={onClick} style={style}>
            <WHequalPointer />
            <WHequalContent>
                {
                    isHide ?
                        <div />
                        :
                        <Img
                            className="logo"
                            src={renderImg()}
                        />
                }
            </WHequalContent>
        </Div>
    )
}

export default AvatarComp