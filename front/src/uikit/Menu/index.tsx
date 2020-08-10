import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

const ToggleIcon = () => (
    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            className={styles.menuTogglerIcon}
            // eslint-disable-next-line max-len
            d="M1.13477 1.23926L1.13477 7.76514C1.13477 8.39355 1.5918 8.79346 2.16748 8.79346C2.33887 8.79346 2.51025 8.74951 2.67285 8.65723L8.52197 5.3877C8.86475 5.19873 9.04492 4.85156 9.04492 4.5C9.04492 4.15283 8.86914 3.80127 8.52197 3.6123L2.66846 0.347168C2.51025 0.250488 2.33887 0.206543 2.16748 0.206543C1.5918 0.206543 1.13477 0.606445 1.13477 1.23926Z"
        />
    </svg>
);

type MenuTogglerProps = {
    toggle: () => void;
    isOpened: boolean;
    caption: string;

    className?: string;
}

export const MenuTogglerBtn = ({
    toggle,
    isOpened,
    caption,

    className,
}: MenuTogglerProps) => (
    <button
        className={classnames(
            className,
            styles.menuToggler,
            {[styles.selected]: isOpened},
        )}
        onClick={toggle}
        onKeyUp={e => e.key === 'Enter' && toggle}
    >
        <ToggleIcon />
        <span className={styles.menuTogglerContent}>{caption}</span>
    </button>
);


type MenuProps = {
    isOpened: boolean;
    children: React.ReactNode;

    className?: string;
    openedClassName?: string;
}

export const Menu = ({
    isOpened,
    children,

    className,
    openedClassName,
}: MenuProps) => (
    <div
        aria-hidden={!isOpened}
        className={classnames(
            className,
            styles.menu,
            {
                [classnames(openedClassName, styles.opened)]: isOpened,
            },
        )}
    >
        {children}
    </div>
);
