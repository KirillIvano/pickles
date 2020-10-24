import 'babel-polyfill';
import 'focus-visible';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {DeviceContext} from '@/contexts/DeviceContext';
import {getDeviceType} from '@/util/getDeviceType';

import {WithScrollContext} from './contexts/ScrollContext';
import {WithCartModalContext} from './containers/withCartModalContext';
import App from './App';
import './main.scss';


const root = document.getElementById('root') as HTMLDivElement;

render(
    <DeviceContext.Provider value={getDeviceType()}>
        <BrowserRouter>
            <WithScrollContext>
                <WithCartModalContext>
                    <App />
                </WithCartModalContext>
            </WithScrollContext>
        </BrowserRouter>
    </DeviceContext.Provider>,
    root,
);
