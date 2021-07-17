import { useState, useEffect } from 'react';


interface useLocalStorageConfig<U> {
    localStorageName: string;
    localStorageInitialData: U;
}

export function useLocalStorage<S = any>(config: useLocalStorageConfig<S>): {
    data: S,
    setData: React.Dispatch<React.SetStateAction<S | null>>,
    setItem: (key: string, data: any) => void,
    removeItem: (key: string) => void,
    clearStorage: () => void,
};
export function useLocalStorage<T>(config: useLocalStorageConfig<T>) {

    const [storageData, setStorageData] = useState<T | null>(() => handleGetData());

    function handleSetData(data: T) {
        for (var [key, value] of Object.entries(data)) {
            localStorage.setItem(`${config.localStorageName}/${key}`, JSON.stringify(value));
        }
    }

    function handleGetData() {
        let newData: any = {};
        for (var [key, value] of Object.entries(config.localStorageInitialData)) {
            const item = localStorage.getItem(`${config.localStorageName}/${key}`);
            newData = { ...newData, [key]: item ? JSON.parse(item) : null }
        }
        if (newData.constructor === Object && Object.keys(newData).length !== 0) {
            return newData
        } else {
            return null
        }
    }

    function handleSetItem<A = any>(key: string, data: A): void;
    function handleSetItem<I>(key: string, data: I) {
        localStorage.setItem(`${config.localStorageName}/${key}`, JSON.stringify(data));
        setStorageData(handleGetData());
    }

    function handleRemoveItem(key: string) {
        localStorage.removeItem(`${config.localStorageName}/${key}`);
        setStorageData(handleGetData());
    }

    function handleClearStorage() {
        localStorage.clear();
        setStorageData(null);
    }

    useEffect(() => {
        handleSetData(handleGetData())
    }, [storageData])

    return {
        data: storageData,
        setData: setStorageData,
        setItem: handleSetItem,
        removeItem: handleRemoveItem,
        clearStorage: handleClearStorage,
    }
}