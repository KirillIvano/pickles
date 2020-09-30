import React from 'react';
import {Map, Polyline} from 'react-yandex-maps';

import {TTK_PATH, MOSCOW_CENTER} from '@/constants/map';

import styles from './styles.scss';


const MAP_DEFAULT_STATE = {center: MOSCOW_CENTER, zoom: 9};
const TTK_PATH_OPTIONS = {strokeColor: '#0033FF', strokeWidth: 2, opacity: .7};

const DeliveryMap = () => (
    <Map
        className={styles.deliveryMap}
        defaultState={MAP_DEFAULT_STATE}
    >
        <Polyline
            geometry={TTK_PATH}
            options={TTK_PATH_OPTIONS}
        />
    </Map>
);

export default DeliveryMap;
