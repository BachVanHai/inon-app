import React from 'react'

const getSessionStorage = (key, defaultValue) => {
    const stored = sessionStorage.getItem(key)
    if (!stored) {
        return defaultValue
    }
    return JSON.parse(stored)
}

/**
    @example
    const [value, setValue] = useSessionStorage(key, defaultValue)
 */
const useSessionStorage = (key, defaultValue) => {
    const [value, setValue] = React.useState(getSessionStorage(key, defaultValue))

    React.useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useSessionStorage