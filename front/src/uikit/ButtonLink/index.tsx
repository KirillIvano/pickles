import React from 'react';
import classnames from 'classnames';
import {Link, LinkProps} from 'react-router-dom';

import styles from './styles.scss';

type ButtonLinkProps = LinkProps<HTMLAnchorElement>;

const ButtonLink = ({
    className,

    ...props
}: ButtonLinkProps) => (
    <Link
        {...props}
        className={classnames(className, styles.buttonLink)}
    />
);

export default ButtonLink;
