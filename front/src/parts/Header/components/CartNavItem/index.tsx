import React from 'react';
import {observer} from 'mobx-react-lite';

import {useCartStore} from '@/entities/cart/hooks';
import {NAV_ITEMS} from '@/constants/nav';

import {NavItem} from './../';


type CartNavItemProps = Omit<React.ComponentProps<typeof NavItem>, 'name' | 'path'>;

const CartNavItem = (props: CartNavItemProps) => {
    const {cartItems} = useCartStore();

    const itemsCount = cartItems.length;

    return (
        <NavItem
            {...props}
            path={NAV_ITEMS.cart.path}
            name={`Корзина( ${itemsCount} )`}
        />
    );
};

export default observer(CartNavItem);
