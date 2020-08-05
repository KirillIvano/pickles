import React from 'react';
import classnames from 'classnames';

import {ButtonLink} from '@/uikit';
import {ContactLink} from '@/components';
import {MAIN_EMAIL, MAIN_PHONE_NUMBER} from '@/constants/contacts';

import styles from './styles.scss';

const DeliveryInfo = () => (
    <div className={styles.deliveryInfo}>
        <p className={styles.deliveryDescription}>
            {'Posuere nibh sed gravida a cum tempus. Duis aliquam tortor aliquet dolor ' +
            'et congue fermentum. Nisl sed pharetra laoreet consectetur mi. Vel urna ' +
            'tincidunt vulputate arcu, dignissim. Sed est turpis in tincidunt congue imperdiet '}
        </p>
        <p
            className={classnames(styles.deliveryDescription, styles.hightlighted)}
        >
            {'Дополнительные вопросы по доставке вы можете задать по телефону или почте:'}
        </p>

        <ContactLink
            contact={MAIN_PHONE_NUMBER}
            contactType="phone"
            className={styles.deliveryContact}
        >
            {MAIN_PHONE_NUMBER}
        </ContactLink>
        <ContactLink
            contact={MAIN_EMAIL}
            contactType="mail"
            className={styles.deliveryContact}
        >
            {MAIN_EMAIL}
        </ContactLink>

        <ButtonLink to={'/catalog'} className={styles.deliveryToCatalog}>Перейти в каталог</ButtonLink>
    </div>
);


export default DeliveryInfo;
