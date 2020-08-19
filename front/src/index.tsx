import 'babel-polyfill';
import 'mobx-react-lite/batchingForReactDom';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {YMaps} from 'react-yandex-maps';

import {DeviceContext} from '@/contexts/DeviceContext';
import {getDeviceType} from '@/util/getDeviceType';

import App from './App';
import './main.scss';

const root = document.getElementById('root') as HTMLDivElement;

render(
    <YMaps preload>
        <DeviceContext.Provider value={getDeviceType()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </DeviceContext.Provider>
    </YMaps>,
    root,
);
