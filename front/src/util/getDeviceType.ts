export const getDeviceType = () =>
    document.documentElement.clientWidth <= 900 ? 'mobile' : 'desktop';
