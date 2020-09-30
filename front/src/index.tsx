import 'babel-polyfill';
import 'focus-visible';
import 'mobx-react-lite/batchingForReactDom';

import React from 'react';
import {render} from 'react-dom';
import {renderToString} from 'react-dom/server';
import {BrowserRouter} from 'react-router-dom';

import {DeviceContext} from '@/contexts/DeviceContext';
import {getDeviceType} from '@/util/getDeviceType';

import {WithScrollContext} from './contexts/ScrollContext';
import App from './App';
import './main.scss';

const root = document.getElementById('root') as HTMLDivElement;

render(
    <DeviceContext.Provider value={getDeviceType()}>
        <BrowserRouter>
            <WithScrollContext>
                <App />
            </WithScrollContext>
        </BrowserRouter>
    </DeviceContext.Provider>,
    root,
);

console.log(renderToString(<App />));
