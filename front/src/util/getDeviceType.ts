export const getDeviceType = () =>
    document.documentElement.clientWidth <= 800 ? 'mobile' : 'desktop';
