import React, { useMemo } from 'react'
import { BaseAppConfigs } from 'base-app'
import { useSelector } from 'react-redux'

const useCheckUserRole = () => {
    const { groupId } = useSelector(state => state.auth.user)
    const partnersGroupUser = useMemo(() => {
        let group = []
        group.push(BaseAppConfigs.USER_ROLE.DTL1)
        group.push(BaseAppConfigs.USER_ROLE.DTL2)
        group.push(BaseAppConfigs.USER_ROLE.DTL3)
        group.push(BaseAppConfigs.USER_ROLE.DTL4)
        group.push(BaseAppConfigs.USER_ROLE.DTL5)
        return group
    }, [])
    const adminGroupUser = useMemo(() => {
        let group = []
        group.push(BaseAppConfigs.USER_ROLE.ADMIN)
        group.push(BaseAppConfigs.USER_ROLE.KT)
        return group
    }, [])

    return useMemo(() =>
        (
            {
                groupId,
                partnersGroupUser,
                adminGroupUser
            }
        )
        // eslint-disable-next-line
        , [])
}

export default useCheckUserRole