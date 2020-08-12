import React from 'react';

import styles from './styles.scss';


type PageHeadingProps = {
    content: string;
}

const PageHeading = ({content}: PageHeadingProps) => (
    <h1 className={styles.pageHeading}>{content}</h1>
);

export default PageHeading;
