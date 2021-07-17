import { useState, useEffect, useCallback } from 'react';

interface useLocalStorageConfig<U> {
    localStorageName: string;
    localStorageInitialData: U;
}

export function useLocalStorage<S = any>(config: useLocalStorageConfig<S>): {
    data: S,
    setData: React.Dispatch<React.SetStateAction<S | null>>,
    setItem: <C>(key: string, data: C) => void,
    removeItem: (key: string) => void,
    clearStorage: () => void,
};
export function useLocalStorage<T>(config: useLocalStorageConfig<T>) {

    const [storageData, setStorageData] = useState<T | null>(null);

    const handleSetData = useCallback((data: T | null) => {
        for (var [key, value] of Object.entries(data ? data : {})) {
            if (value) {
                localStorage.setItem(`${config.localStorageName}/${key}`, JSON.stringify(value));
            }
        }
    }, [config.localStorageName])

    const handleGetData = useCallback(() => {
        let newData: any = {};
        for (var [key] of Object.entries(config.localStorageInitialData)) {
            const item = localStorage.getItem(`${config.localStorageName}/${key}`);
            newData = { ...newData, [key]: item && JSON.parse(item) }
        }
        if (newData.constructor === Object && Object.keys(newData).length !== 0) {
            setStorageData(newData);
        } else {
            setStorageData(null)
        }
    }, [config.localStorageInitialData, config.localStorageName])

    const handleSetItem = useCallback(<I>(key: string, data: I) => {
        localStorage.setItem(`${config.localStorageName}/${key}`, JSON.stringify(data));
        handleGetData()
    }, [config.localStorageName, handleGetData])

    const handleRemoveItem = useCallback((key: string) => {
        localStorage.removeItem(`${config.localStorageName}/${key}`);
        handleGetData()
    }, [config.localStorageName, handleGetData])

    const handleClearStorage = useCallback(() => {
        localStorage.clear();
        handleGetData()
    }, [handleGetData])

    useEffect(() => {
        handleGetData()
    }, [])

    useEffect(() => {
        handleSetData(storageData)
    }, [storageData, handleSetData])

    return {
        data: storageData,
        setData: setStorageData,
        setItem: handleSetItem,
        removeItem: handleRemoveItem,
        clearStorage: handleClearStorage,
    }
}