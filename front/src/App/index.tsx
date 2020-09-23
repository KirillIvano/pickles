import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

import {Preloader} from '@/uikit';
import {Footer, Header, CartModal} from '@/parts';
import {
    Catalog,
    Product,
    OrderSuccess,
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
                    <Route exact path="/" component={Catalog} />
                    <Route exact path="/catalog" component={Catalog} />
                    <Route exact path="/delivery" component={React.lazy(() => /* webpackChunkName: "delivery" */import('./../pages/Delivery'))} />
                    <Route exact path="/cart" component={React.lazy(() => /* webpackChunkName: "cart" */import('./../pages/Cart'))} />
                    <Route exact path="/product/:verbose/:productId" component={Product} />
                    <Route exact path="/order/:orderId" component={React.lazy(() => /* webpackChunkName: "order" */import('./../pages/Order'))} />
                    <Route exact path="/orderSuccess" component={OrderSuccess} />
                </Switch>
            </Suspense>

            <CartModal />
            <Footer />
        </>
    );
};

export default withCartModalContext(App);
