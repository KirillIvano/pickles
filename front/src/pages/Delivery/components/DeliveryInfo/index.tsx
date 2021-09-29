import React from 'react';
import classnames from 'classnames';

import {ButtonLink} from '@/uikit';
import {ContactLink, TypoContainer} from '@/components';
import {MAIN_EMAIL, MAIN_PHONE_NUMBER, OPT_PHONE_NUMBER} from '@/constants/contacts';

import styles from './styles.scss';

const DeliveryInfo = () => (
    <div className={styles.deliveryInfo}>
        <TypoContainer className={styles.deliveryDescription}>
            <h2>Самовывоз</h2>
            <p>
                {
                    'Бесплатно со склада. График работы склада: 5:00 — 16:00 Если заказ оформлен' +
                    ' до 14:00 — доставка на следующий день, иначе — через день.'
                }
            </p>

            <p>Адреса торговых точек:</p>
            <ul>
                <li>город Москва, 8 км МКАД, ТЦ &quot;ДРАЙВ&quot;, дом 3, корпус 1, павильон № 21</li>
                <li>город Москва, 8 км МКАД, ТЦ &quot;СКАРАБЕЙ&quot;, дом 3, корпус 2, павильон №199</li>
            </ul>

            <h2>Доставка</h2>
            <h3></h3>
            <ul>
                <li>
                    {
                        'Доставка в пределах ТТК: Заказ от 5 000 р. — доставка 1 000 р. Заказ от 10 000р.' +
                        ' — бесплатная доставка'
                    }
                </li>
                <li>
                    {'За пределами ТТК: + 20 р/км, но не более 50 км от МКАД.'}
                </li>
            </ul>

            <h3>Доставка в другие города:</h3>
            <p>
                {
                    'Чтобы вы получили заказ в других городах, мы можем доставить его до пункта приёма' +
                    ' транспортной компании по тарифам доставки по Москва.'
                }
            </p>
        </TypoContainer>

        <p
            className={classnames(styles.deliveryDescription, styles.hightlighted)}
        >
            {'Дополнительные вопросы по доставке вы можете задать по телефону или почте:'}
        </p>

        <div className={styles.deliveryContactContainer}>
            Розничный отдел - <ContactLink
                contact={MAIN_PHONE_NUMBER}
                contactType="phone"
                className={styles.deliveryContact}
            >
                {MAIN_PHONE_NUMBER}
            </ContactLink>
        </div>

        <div className={styles.deliveryContactContainer}>
            Оптовый отдел - <ContactLink
                contact={OPT_PHONE_NUMBER}
                contactType="phone"
                className={styles.deliveryContact}
            >
                {OPT_PHONE_NUMBER}
            </ContactLink>
        </div>

        <div className={styles.deliveryContactContainer}>
            <ContactLink
                contact={MAIN_EMAIL}
                contactType="mail"
                className={styles.deliveryContact}
            >
                {MAIN_EMAIL}
            </ContactLink>
        </div>

        <ButtonLink to={'/catalog'} className={styles.deliveryToCatalog}>Перейти в каталог</ButtonLink>
    </div>
);


export default React.memo(DeliveryInfo);
