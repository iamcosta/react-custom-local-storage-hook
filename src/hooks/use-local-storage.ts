import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string) {
    const storageData = localStorage.getItem(key);
    const [stateItem, setStateItem] = useState<T | null>(() => {
        if (storageData) {
            return JSON.parse(storageData);
        }
        return null;
    });

    const handleSetItem = useCallback((item: T | null) => {
        localStorage.setItem(key, JSON.stringify(item));
    }, [key]);

    const handleRemoveItem = useCallback(() => {
        setStateItem(null);
        localStorage.removeItem(key);
    }, [key]);

    const handleClear = useCallback(() => {
        setStateItem(null);
        localStorage.clear();
    }, []);

    useEffect(() => {
        if (stateItem) {
            handleSetItem(stateItem);
        }
    }, [stateItem, handleSetItem]);

    return {
        item: stateItem,
        setItem: setStateItem,
        removeItem: handleRemoveItem,
        clearStorage: handleClear
    };
}
