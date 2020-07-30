import React from 'react';

import styles from './styles.scss';


type LinksBlockProps = {
    children: React.ReactNode;
    title: string;
}

const LinksBlock = ({
    children,
    title,
}: LinksBlockProps) => (
    <div className={styles.linksBlock}>
        <h3 className={styles.linksBlockTitle}>
            {title}
        </h3>
        <div className={styles.linksBlockContent}>
            {children}
        </div>
    </div>
);

export default LinksBlock;
