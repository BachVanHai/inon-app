import React from 'react'
import styled from 'styled-components'
import { isObjEmpty } from '../../../../ultity'

const BottomWrapperStyled = styled.div`
  position: fixed; 
  bottom: ${p => p.bottom ? p.bottom : "76px"}; 
  right: ${p => p.right ? p.right : "8px"}; 
  z-index: ${props => props.zIndex ? props.zIndex : "1031"}; //default 1032
  width: ${p => p.width || "fit-content"};
  height: ${p => p.height || "fit-content"};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-wrap: wrap;
  ${'' /* z-index : 1031; */}
`

/** 
 * @example
    const fixedPosStyle = {
            bottom: "76px",
            right: "8px",
            width: "",
            height: "",
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
            width: "",
            height: "",
        }
    }
    const { bottom, right, width, height } = fixedPosStyle
    return (
        <BottomWrapperStyled
            bottom={bottom}
            right={right}
            zIndex={zIndex}
            width={width}
            height={height}
        >
            {children}
        </BottomWrapperStyled>
    )
}

export default FixedPosWrapper