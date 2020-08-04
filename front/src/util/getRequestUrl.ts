import qs from 'qs';

export const getRequestUrl = (path: string, params?: object) =>
    `${__SERVER_ORIGIN__}${path}?${params ? qs.stringify(params) : ''}`;
