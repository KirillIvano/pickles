import React from 'react';
import {useHistory} from 'react-router-dom';
import classnames from 'classnames';

import styles from './styles.scss';


interface ReferenceProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
}

const Reference = ({
    to,
    children,
    className,
    onClick,
    onKeyUp,

    ...props
}: ReferenceProps) => {
    const history = useHistory();

    const handleInteract = () => {
        history.push(to);
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick && onClick(e);
        handleInteract();
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        onKeyUp && onKeyUp(e);
        (e.key === 'Enter' || e.key === 'Space') && handleInteract();
    };

    return (
        <a
            {...props}
            tabIndex={0}
            onKeyUp={handleKeyUp}
            onClick={handleClick}
            className={classnames(
                className,
                styles.reference,
            )}
        >
            {children}
        </a>
    );
};

export default Reference;
