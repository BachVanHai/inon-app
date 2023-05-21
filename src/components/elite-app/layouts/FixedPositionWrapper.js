import React from 'react'
import styled from 'styled-components'
import { isObjEmpty } from '../../../ultity'

const BottomWrapperStyled = styled.div`
  position: fixed; 
  bottom: ${p => p.bottom ? p.bottom : "76px"}; 
  right: ${p => p.right ? p.right : "8px"}; 
  z-index: ${props => props.zIndex ? props.zIndex : "99"}; 
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-wrap: wrap;
`

/** 
 * @example
    const fixedPosStyle = {
            bottom: "76px",
            right: "8px",
        }
    return (
        <FixedPosWrapper fixedPosStyle={fixedPosStyle} zIndex={99}>
            {
                {"place some react components in here"}
            }
        </FixedPosWrapper>
    )
  
 */
const FixedPosWrapper = ({ zIndex, fixedPosStyle, children }) => {
    if (isObjEmpty(fixedPosStyle)) {
        fixedPosStyle = {
            bottom: "76px",
            right: "8px",
        }
    }
    const { bottom, right } = fixedPosStyle
    return (
        <BottomWrapperStyled
            bottom={bottom}
            right={right}
            zIndex={zIndex}
        >
            {children}
        </BottomWrapperStyled>
    )
}

export default FixedPosWrapper