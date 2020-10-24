import React, {Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Preloader} from '@/uikit';
import {
    Footer,
    Header,
    CartModal,
    RetailChangeModal,
} from '@/parts';
import {
    Catalog,
    Product,
    OrderSuccess,
} from '@/pages';

import {useAppInit} from './hooks';


const LazyCart = React.lazy(() => /* webpackChunkName: "cart" */import('./../pages/Cart'));
const LazyOrder = React.lazy(() => /* webpackChunkName: "order" */import('./../pages/Order'));
const LazyDelivery = React.lazy(() => /* webpackChunkName: "delivery" */import('./../pages/Delivery'));

const App = () => {
    useAppInit();

    return (
        <>
            <Header />

            <Suspense fallback={Preloader}>
                <Switch>
                    <Redirect exact from="/" to="/catalog" />
                    <Route exact path="/catalog/:type" component={Catalog} />
                    <Route exact path="/catalog" component={Catalog} />
                    <Route exact path="/delivery" component={LazyDelivery} />
                    <Route exact path="/cart/:type" component={LazyCart} />
                    <Route exact path="/cart" component={LazyCart} />
                    <Route exact path="/product/:verbose/:productId" component={Product} />
                    <Route exact path="/order/:orderId" component={LazyOrder} />
                    <Route exact path="/orderSuccess" component={OrderSuccess} />
                </Switch>
            </Suspense>

            <RetailChangeModal />
            <CartModal />
            <Footer />
        </>
    );
};

export default App;
