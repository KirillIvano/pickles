import React from 'react';
import {observer} from 'mobx-react-lite';

import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';
import {ButtonLink} from '@/uikit';

import styles from './styles.scss';


const CartRetailType = observer(() => {
    const {retailType, showRetailModal} = useUserStore();

    return (
        <div className={styles.retailHeaderContainer}>
            <h1 className={styles.retailHeader}>
                {retailType === UserRetailType.RETAIL ? 'Розничная корзина' : 'Оптовая корзина'}
            </h1>

            <ButtonLink
                to={retailType === UserRetailType.RETAIL ? '/cart' : '/cart/retail'}
                handleInteract={showRetailModal}
                className={styles.retailChangeBtn}
            >
                {retailType === UserRetailType.RETAIL ? 'В оптовую корзину' : 'В розничную корзину'}
            </ButtonLink>
        </div>
    );
});

export default CartRetailType;
