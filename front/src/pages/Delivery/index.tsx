import React from 'react';

import styles from './styles.scss';
import {DeliveryInfo, DeliveryMap} from './components';


const DeliveryPage = () => (
    <div className={styles.deliveryPage}>
        <DeliveryMap />
        <DeliveryInfo />
    </div>
);

export default DeliveryPage;
