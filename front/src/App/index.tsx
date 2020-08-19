import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

import {Preloader} from '@/uikit';
import {Footer, Header, CartModal} from '@/parts';
import {
    Catalog,
    Product,
    Delivery,
    Cart,
} from '@/pages';

import {useAppInit} from './hooks';
import {withCartModalContext} from '@/containers/withCartModalContext';

const App = () => {
    useAppInit();

    return (
        <>
            <Header />

            <Suspense fallback={Preloader}>
                <Switch>
                    <Route exact path="/" />
                    <Route exact path="/catalog" component={Catalog} />
                    <Route exact path="/delivery" component={Delivery} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/product/:verbose/:productId" component={Product} />
                </Switch>
            </Suspense>

            <CartModal />
            <Footer />
        </>
    );
};

export default withCartModalContext(App);
