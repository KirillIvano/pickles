import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type TypoContainerProps = {
    children: React.ReactNode;
    className?: string;
}

const TypoContainer = ({
    children,
    className,
}: TypoContainerProps) => (
    <div className={classnames(
        className,
        styles.typoContainer,
    )}
    >
        {children}
    </div>
);

export default TypoContainer;
