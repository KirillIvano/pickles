import React from 'react';
import classnames from 'classnames';
import {GridProps, Grid as FlexboxGrid} from 'react-flexbox-grid';

import styles from './styles.scss';

const Grid = ({
    className,
    ...props
}: GridProps) => (
    <FlexboxGrid
        {...props}
        className={classnames(
            className,
            styles.grid,
        )}
    />
);

export default Grid;
