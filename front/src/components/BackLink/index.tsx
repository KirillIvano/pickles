import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';
import {Reference} from '..';


type BackLinkProps = React.ComponentProps<typeof Reference>

const BackLink = ({
    className,
    ...props
}: BackLinkProps) => (
    <Reference
        {...props}
        className={classnames(
            className,
            styles.backLink,
        )}
    />
);

export default BackLink;
