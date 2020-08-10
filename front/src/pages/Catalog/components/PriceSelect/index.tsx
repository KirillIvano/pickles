import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react-lite';

import {useDebouncedEventHandler} from '@/hooks/useDebouncedEventHandler';
import {getUniqueId} from '@/util/getUniqueId';

import {useProductFiltersContext} from './../../hooks/useFiltersContext';
import {useCatalogStoreContext} from './../../hooks/useCatalogStoreContext';
import styles from './styles.scss';


const PriceSelect = observer(() => {
    const inputId = useMemo(getUniqueId, []);

    const {edgePrices} = useCatalogStoreContext();
    const {setMaxPrice, setMinPrice} = useProductFiltersContext();


    useEffect(() => {setMinPrice(edgePrices.minPrice);}, [edgePrices.minPrice]);
    useEffect(() => {setMaxPrice(edgePrices.maxPrice);}, [edgePrices.maxPrice]);


    const handleMinPriceChange = useDebouncedEventHandler(
        ({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
            value ? setMinPrice(+value) : setMinPrice(edgePrices.minPrice),
        300,
    );

    const handleMaxPriceChange = useDebouncedEventHandler(
        ({target: {value}}: React.ChangeEvent<HTMLInputElement>) =>
            value ? setMaxPrice(+value) : setMaxPrice(edgePrices.maxPrice),
        300,
    );

    return (
        <div className={styles.pricesSelect}>
            <label
                className={styles.label}
                htmlFor={inputId}
            >
                Выбор цены
            </label>

            <div className={styles.pricesWrapper}>
                <input
                    className={styles.priceSelectInput}
                    id={inputId}
                    type="number"
                    name="minPrice"
                    onChange={handleMinPriceChange}
                    placeholder={`от ${edgePrices.minPrice}`}
                />
                <input
                    className={styles.priceSelectInput}
                    type="number"
                    name="maxPrice"
                    onChange={handleMaxPriceChange}
                    placeholder={`до ${edgePrices.maxPrice}`}
                />
            </div>
        </div>
    );
});

export default PriceSelect;
