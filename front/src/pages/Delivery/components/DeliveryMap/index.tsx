import React from 'react';
import {Map, Polyline} from 'react-yandex-maps';

import {MKAD_POLYGON, MOSCOW_CENTER} from '@/constants/map';

import styles from './styles.scss';


const DeliveryMap = () => (
    <Map
        className={styles.deliveryMap}
        defaultState={{center: MOSCOW_CENTER, zoom: 10}}
    >
        <Polyline
            geometry={MKAD_POLYGON}
            options={{strokeColor: '#0033FF', strokeWidth: 2, opacity: .7}}
        />
    </Map>
);

export default DeliveryMap;
