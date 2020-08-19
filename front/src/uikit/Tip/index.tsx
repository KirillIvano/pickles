import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


export type TooltipProps = {
    content: string;
    isVisible: boolean;

    className?: string;
}

const Tooltip = ({
    content,
    isVisible,

    className,
}: TooltipProps) => (
    <div
        aria-hidden={!isVisible}
        className={classnames(
            className,
            styles.tooltip,
            {[styles.visible]: isVisible},
        )}
    >
        {content}
    </div>
);

export default Tooltip;
