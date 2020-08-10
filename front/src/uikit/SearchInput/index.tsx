import React from 'react';
import classnames from 'classnames';

import {useDebouncedEventHandler} from '@/hooks/useDebouncedEventHandler';
import {useUniqueId} from '@/hooks/useUniqueId';

import styles from './styles.scss';
import loupeImg from './images/loupe.svg';


type SearchInputProps = {
    setSearchValue: (val: string) => void;

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
    className,
    wrapperClassName,
}: SearchInputProps) => {
    const handleSearchChange = useDebouncedEventHandler(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value),
        INPUT_DEBOUNCE_TIME,
    );
    const inputId = useUniqueId();

    return (
        <div className={classnames(wrapperClassName, styles.searchWrapper)}>
            <label
                htmlFor={inputId}
                className={styles.searchLabel}
            >
                {caption || 'Поиск'}
            </label>
            <div className={styles.inputWrapper}>
                <input
                    id={inputId}
                    className={classnames(className, styles.searchInput)}
                    onChange={handleSearchChange}
                    placeholder={placeholder}
                />

                <img className={styles.loupe} src={loupeImg} alt="Лупа" />
            </div>
        </div>
    );
};

export default SearchInput;
