import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';

import {useDebouncer} from '@/hooks/useDebouncer';
import {getUniqueId} from '@/util/getUniqueId';
import {Input, Label} from '@/uikit';
import {useDeviceType} from '@/contexts/DeviceContext';

import {useCatalogStoreContext} from './../../hooks/useCatalogStoreContext';
import {useProductFiltersContext} from './../../hooks/useFiltersContext';
import styles from './styles.scss';


const PriceSelect = observer(() => {
    const inputId = useMemo(getUniqueId, []);
    const device = useDeviceType();
    const inputsSize = device === 'mobile' ? 'lg' : 'sm';

    const {getEdgePrices} = useCatalogStoreContext();
    const edgePrices = getEdgePrices();
    const {setMaxPrice, setMinPrice} = useProductFiltersContext();

    const [localMinPrice, setLocalMinPrice] = useState('');
    const [localMaxPrice, setLocalMaxPrice] = useState('');

    useEffect(
        () => {
            setMinPrice(localMinPrice ? +localMinPrice : edgePrices.minPrice);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [edgePrices.minPrice],
    );
    useEffect(
        () => {setMaxPrice(localMaxPrice ? +localMaxPrice : edgePrices.maxPrice);},
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [edgePrices.maxPrice],
    );

    const minPriceDebouncer = useDebouncer(300);
    const maxPriceDebouncer = useDebouncer(300);


    return (
        <div className={styles.pricesSelect}>
            <Label
                htmlFor={inputId}
            >
                цена, ₽/шт
            </Label>

            <div className={styles.pricesWrapper}>
                <Input
                    id={inputId}
                    type="number"
                    name="minPrice"
                    onChange={({target: {value}}) => {
                        minPriceDebouncer.perform(
                            () => setMinPrice(value ? +value : edgePrices.minPrice),
                        );
                        setLocalMinPrice(value);
                    }}
                    value={localMinPrice}
                    placeholder={`от ${edgePrices.minPrice}`}

                    className={styles.priceSelectInput}
                    sizing={inputsSize}
                />
                <Input
                    type="number"
                    name="maxPrice"
                    value={localMaxPrice}
                    onChange={({target: {value}}) => {
                        maxPriceDebouncer.perform(
                            () => setMaxPrice(value ? +value : edgePrices.maxPrice),
                        );
                        setLocalMaxPrice(value);
                    }}
                    placeholder={`до ${edgePrices.maxPrice}`}

                    className={styles.priceSelectInput}
                    sizing={inputsSize}
                />
            </div>
        </div>
    );
});

export default PriceSelect;
