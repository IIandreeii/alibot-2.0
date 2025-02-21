// urlUtils.ts
export const updateURLParams = (newParams: Record<string, string>) => {
    const currentParams = new URLSearchParams(window.location.search);
    
    // Agregar o actualizar los parámetros
    Object.entries(newParams).forEach(([key, value]) => {
        currentParams.set(key, value);
    });

    // Actualizar la URL sin recargar la página
    window.history.replaceState({}, '', `?${currentParams.toString()}`);
};
