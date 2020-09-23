import React from 'react';
import {YMaps} from 'react-yandex-maps';

import styles from './styles.scss';
import {DeliveryInfo, DeliveryMap} from './components';


const DeliveryPage = () => (
    <YMaps>
        <div className={styles.deliveryPage}>
            <DeliveryMap />
            <DeliveryInfo />
        </div>
    </YMaps>
);

export default DeliveryPage;
