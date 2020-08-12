import React from 'react';
import classnames from 'classnames';

import {useDebouncedEventHandler} from '@/hooks/useDebouncedEventHandler';
import {useUniqueId} from '@/hooks/useUniqueId';
import {Input, Label} from '@/uikit';

import styles from './styles.scss';
import loupeImg from './images/loupe.svg';


type SearchInputProps = {
    setSearchValue: (val: string) => void;

    sizing: 'sm' | 'lg';
    caption?: string;
    placeholder?: string;
    className?: string;
    wrapperClassName?: string;
}

const INPUT_DEBOUNCE_TIME = 300;

const SearchInput = ({
    setSearchValue,

    caption,
    placeholder,
    wrapperClassName,

    className,
    sizing,
}: SearchInputProps) => {
    const handleSearchChange = useDebouncedEventHandler(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value),
        INPUT_DEBOUNCE_TIME,
    );
    const inputId = useUniqueId();

    return (
        <div className={classnames(
            wrapperClassName,
            styles.searchWrapper,
            {[styles.large]: sizing === 'lg'},
        )}>
            <Label
                htmlFor={inputId}
            >
                {caption || 'Поиск'}
            </Label>
            <div className={styles.inputWrapper}>
                <Input
                    sizing={sizing}
                    id={inputId}
                    className={classnames(className, styles.searchInput)}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                />

                <img
                    className={styles.loupe}
                    src={loupeImg}
                    alt="Лупа"
                />
            </div>
        </div>
    );
};

export default SearchInput;
