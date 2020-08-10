import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


type OptionProps = {
    caption: string;
    isSelected: boolean;
    className?: string;

    handleSelect: () => void;
}

export const Option = ({
    caption,
    isSelected,
    className,

    handleSelect,
}: OptionProps) => (
    <li
        className={classnames(
            className,
            styles.option,
            {[styles.selected]: isSelected},
        )}
        tabIndex={0}
        aria-selected={isSelected}

        onClick={handleSelect}
        onKeyUp={({key}) => key === 'Enter' && handleSelect()}
    >
        {caption}
    </li>
);


type OptionsListProps = {
    children: React.ReactNode;
    className?: string;
}

const OptionsList = ({
    children,
}: OptionsListProps) => (
    <ul className={styles.optionsList}>
        {children}
    </ul>
);

OptionsList.Option = Option;

export default OptionsList;
