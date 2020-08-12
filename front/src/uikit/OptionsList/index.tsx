import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';


interface OptionProps extends React.LiHTMLAttributes<HTMLLIElement> {
    caption: string;
    isSelected: boolean;
    className?: string;

    handleSelect?: () => void;
}

export const Option = ({
    caption,
    isSelected,
    className,

    handleSelect,

    ...props
}: OptionProps) => (
    <li
        {...props}
        className={classnames(
            className,
            styles.option,
            {[styles.selected]: isSelected},
        )}
        tabIndex={0}
        aria-selected={isSelected}

        onClick={handleSelect}
        onKeyUp={({key}) => key === 'Enter' && handleSelect && handleSelect()}
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
    className,
}: OptionsListProps) => (
    <ul className={classnames(className, styles.optionsList)}>
        {children}
    </ul>
);

OptionsList.Option = Option;

export default OptionsList;
