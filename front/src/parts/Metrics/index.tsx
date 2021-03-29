import React from 'react';
import {YMInitializer} from 'react-yandex-metrika';

import {YM_ID} from '@/constants/metrics';


const YM_ACCOUNTS = [YM_ID];
const YM_PARAMS = {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
};

const Metrics = () =>
    <YMInitializer accounts={YM_ACCOUNTS} options={YM_PARAMS} />;

export default Metrics;
