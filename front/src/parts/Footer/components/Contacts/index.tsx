import React from 'react';

import {MAIN_EMAIL, MAIN_PHONE_NUMBER, OPT_PHONE_NUMBER} from '@/constants/contacts';

import styles from './styles.scss';


const ContactsItem = ({children}: {children: React.ReactNode}) =>
    <li className={styles.contactsItem}>{children}</li>;

const FooterContacts = () => (
    <div className={styles.footerContacts}>
        <h2 className={styles.companyName}>Aglobell</h2>

        <ul className={styles.contactsContainer}>
            <ContactsItem>Розничный отдел - {MAIN_PHONE_NUMBER}</ContactsItem>
            <ContactsItem>Оптовый отдел - {OPT_PHONE_NUMBER}</ContactsItem>
            <ContactsItem>{MAIN_EMAIL}</ContactsItem>
            <ContactsItem>
                город Москва, 8 км МКАД, ТЦ &quot;ДРАЙВ&quot;, дом 3, корпус 1, павильон № 21
            </ContactsItem>
            <ContactsItem>
                город Москва, 8 км МКАД, ТЦ &quot;СКАРАБЕЙ&quot;, дом 3, корпус 2, павильон №199
            </ContactsItem>
            <ContactsItem>ИНН 772153835692. ОГРНИП 315774600002011</ContactsItem>
        </ul>
    </div>
);

export default FooterContacts;
