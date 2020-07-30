import React from 'react';

import styles from './styles.scss';


const ContactsItem = ({children}: {children: React.ReactNode}) =>
    <li className={styles.contactsItem}>{children}</li>;

const FooterContacts = () => (
    <div className={styles.footerContacts}>
        <h1 className={styles.companyName}>Aglobell</h1>

        <ul className={styles.contactsContainer}>
            <ContactsItem>8(999)999-99-99</ContactsItem>
            <ContactsItem>info@aglobell.ru</ContactsItem>
            <ContactsItem>г. Москва, ул. Пушкина д.12 к.2</ContactsItem>
            <ContactsItem>ОГРН/ИНН: 1053600591197 / 3664069397</ContactsItem>
        </ul>
    </div>
);

export default FooterContacts;
