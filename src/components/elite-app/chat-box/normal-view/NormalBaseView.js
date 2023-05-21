import React from 'react'
import BaseView from './BaseView'
import { ChatBoxStyled, componentsHeight_1, componentsHeight_2, normalSize } from './utility'

const NormalBaseView = ({ viewInfo }) => {
    const { viewSizeStatus, setComponentsHeight, shouldShowRateButton, shouldShowInput, isUserInOn } = viewInfo

    React.useEffect(() => {
        if (!shouldShowRateButton && !shouldShowInput) {
            let _componentsHeight_1 = { ...componentsHeight_1 }
            if (!isUserInOn) {
                // user is not in InOn
                _componentsHeight_1.headerHeight = "12%"
                _componentsHeight_1.headerTopHeight = "100%"
                _componentsHeight_1.headerBelowHeight = "0%"
                _componentsHeight_1.bodyHeight = "88%"
            }
            setComponentsHeight(_componentsHeight_1)
        } else {
            let _componentsHeight_2 = { ...componentsHeight_2 }
            if (!isUserInOn) {
                // user is not in InOn
                _componentsHeight_2.headerHeight = "12%"
                _componentsHeight_2.headerTopHeight = "100%"
                _componentsHeight_2.headerBelowHeight = "0%"
                _componentsHeight_2.bodyHeight = "74%"
            }
            setComponentsHeight(_componentsHeight_2)
        }
    }, [shouldShowRateButton, shouldShowInput])

    return (
        <ChatBoxStyled width={normalSize.width} height={normalSize.height} zoomOutStatus={viewSizeStatus}>
            <BaseView viewInfo={viewInfo} />
        </ChatBoxStyled>
    )
}

export default NormalBaseView