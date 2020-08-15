import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


interface InfoTableItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    itemName: string;
    itemValue: string;
}

const InfoTableItem = ({
    className,
    itemName,
    itemValue,
    ...props
}: InfoTableItemProps) => (
    <li
        {...props}
        className={classnames(className, styles.infoTableItem)}
    >
        <span className={styles.itemName}>{itemName}</span>
        <span className={styles.itemValue}>{itemValue}</span>
    </li>
);


type InfoTableProps = React.HTMLAttributes<HTMLUListElement>

const InfoTable = ({
    className,
    children,

    ...props
}: InfoTableProps) => (
    <ul
        {...props}
        className={classnames(className, styles.infoTable)}
    >
        {children}
    </ul>
);

InfoTable.InfoTableItem = InfoTableItem;

export default InfoTable;
