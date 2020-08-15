import {ContactType} from '.';

const CONTACTS_PREFIX_MAPPING: Record<ContactType, string> = {
    'mail': 'mailto',
    'phone': 'tel',
};

export const getContactLink = (contactType: ContactType, contact: string) =>
    `${CONTACTS_PREFIX_MAPPING[contactType]}:${contact}`;
