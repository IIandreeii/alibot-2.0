import React, { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface URLParamsContextType {
    updateURLParams: (params: Record<string, string>) => void;
}

const URLParamsContext = createContext<URLParamsContextType | undefined>(undefined);

export const URLParamsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate(); // Asegúrate de que useNavigate esté aquí
    const location = useLocation(); // Obtener la ubicación actual

    const updateURLParams = (newParams: Record<string, string>) => {
        const currentParams = new URLSearchParams(location.search);
        
        // Agregar o actualizar los parámetros
        Object.entries(newParams).forEach(([key, value]) => {
            currentParams.set(key, value);
        });

        // Navegar a la nueva URL con los parámetros acumulados
        navigate(`?${currentParams.toString()}`);
    };

    return (
        <URLParamsContext.Provider value={{ updateURLParams }}>
            {children}
        </URLParamsContext.Provider>
    );
};

export const useURLParams = (): URLParamsContextType => {
    const context = useContext(URLParamsContext);
    if (!context) {
        throw new Error('useURLParams must be used within a URLParamsProvider');
    }
    return context;
};
