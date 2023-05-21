import React from 'react'
import styled from 'styled-components'
import BaseView from './BaseView'
import { componentsHeight_3 } from './utility'

const FullScreen = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background-color: white;   
    padding-top: env(safe-area-inset-top);
`

const MaximizeViewComp = ({ viewInfo }) => {
    const { setComponentsHeight, shouldShowRateButton, shouldShowInput, isUserInOn } = viewInfo

    React.useEffect(() => {
        if (!shouldShowRateButton && !shouldShowInput) {
            let _componentsHeight_1 = { ...componentsHeight_3 }
            if (!isUserInOn) {
                _componentsHeight_1.headerHeight = "10%"
                _componentsHeight_1.headerTopHeight = "100%"
                _componentsHeight_1.headerBelowHeight = "0%"
                _componentsHeight_1.bodyHeight = "90%"
            } else {
                _componentsHeight_1.headerHeight = "10%"
                _componentsHeight_1.bodyHeight = "90%"
            }
            setComponentsHeight(_componentsHeight_1)
            return
        }
        setComponentsHeight(componentsHeight_3)
    }, [shouldShowRateButton, shouldShowInput])

    return (
        <FullScreen>
            <BaseView viewInfo={viewInfo} />
        </FullScreen>
    )
}

export default MaximizeViewComp