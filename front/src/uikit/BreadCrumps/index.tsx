import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './styles.scss';

type BreadCrumpsProps = {
    className?: string;
    items: {caption: string; href: string}[];
}

const BreadCrumps = ({
    className,
    items,
}: BreadCrumpsProps) => (
    <div className={classnames(className, styles.breadCrumps)}>
        {items.map(
            ({caption, href}, ind) => (
                <Link
                    to={href}
                    className={styles.breadCrump}
                    key={ind}
                >
                    {caption}
                </Link>
            ),
        )}
    </div>
);

export default React.memo(BreadCrumps);
