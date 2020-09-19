import React from 'react';
import classnames from 'classnames';
import {Link, LinkProps} from 'react-router-dom';

import styles from './styles.scss';

type ButtonLinkProps = LinkProps<HTMLAnchorElement> & {handleInteract?: () => void};

const ButtonLink = ({
    className,
    onClick,
    onKeyUp,
    handleInteract,

    ...props
}: ButtonLinkProps) => (
    <Link
        {...props}
        onClick={e => {
            onClick && onClick(e);
            handleInteract && handleInteract();
        }}
        onKeyUp={e => {
            onKeyUp && onKeyUp(e);
            (e.key === 'Enter' || e.key === 'Space') && handleInteract && handleInteract();
        }}
        className={classnames(className, styles.buttonLink)}
    />
);

export default ButtonLink;
