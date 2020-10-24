import React from 'react';
import {observer} from 'mobx-react-lite';

import {useCartStore} from '@/entities/cart/hooks';
import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';

import {NavItem} from './../';


type CartNavItemProps = Omit<React.ComponentProps<typeof NavItem>, 'name' | 'path'>;

const CartNavItem = (props: CartNavItemProps) => {
    const {retailType} = useUserStore();
    const {itemsCount} = useCartStore(retailType);

    return (
        <NavItem
            {...props}
            path={retailType === UserRetailType.RETAIL ? '/cart/retail' : '/cart'}
            name={`Корзина( ${itemsCount} )`}
        />
    );
};

export default observer(CartNavItem);
