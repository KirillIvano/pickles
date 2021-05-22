import React from 'react';

import {getImageUrl} from '@/util/getImageUrl';

import {useFeaturingProductSafe} from '../../hooks/useFeaturingProductSafe';
import {FeaturingCartButton} from '..';
import styles from './styles.scss';


const FeaturingContent = () => {
    const {
        name,
        oldPrice,
        price,
        image,
        weight,
    } = useFeaturingProductSafe();

    return (
        <div className={styles.featuring}>
            <div className={styles.featuringImage__container}>
                <img
                    src={getImageUrl(image)}
                    className={styles.featuringImage}
                />
            </div>

            <div className={styles.featuringContent}>
                <div className={styles.featuringContent__pricing}>
                    {oldPrice && <span className={styles.featuringContent__oldPrice}>{oldPrice} ₽</span>}
                    <span className={styles.featuringContent__price}>{' '}{price} ₽</span>
                    {' /'} {weight}
                </div>

                <div className={styles.featuringContent__name}>
                    {name}
                </div>

                <div className={styles.featuringContent__cartButton}>
                    <FeaturingCartButton />
                </div>
            </div>
        </div>
    );
};

export default FeaturingContent;
