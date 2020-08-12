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
    ...props
}: ReferenceProps) => {
    const history = useHistory();

    const handleInteract = () => history.push(to);

    return (
        <a
            {...props}
            tabIndex={0}
            onKeyUp={e => e.key === 'Enter' && handleInteract()}
            onClick={handleInteract}
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
