import React, {createContext, useContext} from 'react';

export const DeviceContext = createContext<'mobile' | 'desktop'>('desktop');

// hooks
export const useDeviceType = () => useContext(DeviceContext);

// renders component for specific device
const createRenderForDeviceHOC = (selectedDevice: 'mobile' | 'desktop') =>
    <TProps extends object>(Comp: React.ComponentType<TProps>) =>
        (props: TProps) => {
            const device = useDeviceType();

            return device === selectedDevice ? <Comp {...props} /> : null;
        };

export const renderForMobileHOC = createRenderForDeviceHOC('mobile');
export const renderForDesktopHOC = createRenderForDeviceHOC('desktop');
