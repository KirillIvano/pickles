import React, {useRef, useState} from 'react';
import classnames from 'classnames';

import {useDeviceType} from '@/contexts/DeviceContext';
import {Tip} from '@/uikit';
import {copyText} from '@/services/dom';

import {getContactLink} from './helpers';
import styles from './styles.scss';


export type ContactType = 'phone' | 'mail';

type ContactLinkProps = {
    contact: string;
    contactType: ContactType;

    children: React.ReactNode;
    className?: string;
}

const MobileContactLink = ({
    contact,
    contactType,

    children,
    className,
}: ContactLinkProps) => (
    <a
        className={classnames(styles.contactLink, className)}
        href={getContactLink(contactType, contact)}
    >
        {children}
    </a>
);

const DesktopContactLink = ({
    contact,

    children,
    className,
}: ContactLinkProps) => {
    const [isCopied, setCopied] = useState(false);
    const copyTimeoutRef = useRef<number | null>(null);

    const handleClick = () => {
        try {
            copyText(contact);
        } catch {
            return;
        }

        if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);

        setCopied(true);

        copyTimeoutRef.current = window.setTimeout(
            () => setCopied(false),
            1500,
        );
    };

    return (
        <div
            className={classnames(styles.contactLink, className)}
            tabIndex={0}
            onClick={handleClick}
            onKeyUp={({key}) => key === 'Enter' && handleClick()}
        >
            <Tip className={styles.tip} content={'Скопировано!'} isVisible={isCopied} />
            {children}
        </div>
    );
};


const ContactLink = (props: ContactLinkProps) => {
    const deviceType = useDeviceType();

    if (deviceType === 'mobile') return <MobileContactLink {...props} />;

    return <DesktopContactLink {...props} />;
};

export default ContactLink;
