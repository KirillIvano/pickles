import React from 'react';
import {observer} from 'mobx-react-lite';
import classnames from 'classnames';

import {useCartItemById, useCartStore} from '@/entities/cart/hooks';
import {useProductPreviewById} from '@/entities/product/hooks';
import {useFormattedPrice} from '@/hooks/useFormattedPrice';
import {InteractionEventBase, useEnterPressHandler} from '@/hooks/useEnterPressHandler';

import styles from './styles.scss';
import ProductCountInput from '../ProductCountInput';
import ProductImage from '../ProductImage';
import trashCanImage from './images/can.svg';
import Reference from '../Reference';


const RemoveButton = observer(({productId}: {productId: number}) => {
    const {removeCartItem} = useCartStore();

    return (
        <button
            className={styles.removeIcon}
            onClick={e => {
                e.stopPropagation();
                removeCartItem(productId);
            }}
        >
            <img
                className={styles.removeIconImage}
                src={trashCanImage}
                alt="Убрать продукт из корзины"
            />
        </button>
    );
});

type ProductCartCardProps = {
    productId: number;
    className?: string;
}

const ProductCartCard = observer(({productId, className}: ProductCartCardProps) => {
    const product = useProductPreviewById(productId);
    const cartItem = useCartItemById(productId);

    const handleNumberInputWrapperClick = (e: React.MouseEvent<Element>) => e.stopPropagation();
    const handleNumberInputWrapperPress = useEnterPressHandler(
        handleNumberInputWrapperClick as (e: InteractionEventBase) => void,
    );

    const formattedPrice = useFormattedPrice(
        product ? product.price : 0,
    );
    const formattedTotal = useFormattedPrice(
        cartItem && product ? cartItem.productsCount * product.price : 0,
    );

    if (!product || !cartItem) return null;

    const {
        name,
        weight,
        image,
        verboseName,
    } = product;

    return (
        <Reference
            to={`/product/${verboseName}/${productId}`}
            className={classnames(styles.cartCard, className)}
        >
            <ProductImage.Wrapper>
                <ProductImage
                    src={image}
                    alt={`Фото продукта с названием "${name}"`}
                />
            </ProductImage.Wrapper>

            <RemoveButton productId={productId} />

            <div className={styles.cardInfo}>
                <div className={styles.pricing}>
                    <span className={styles.price}>{formattedPrice} ₽</span>
                    <span className={styles.weight}> / {weight}</span>
                </div>

                <p className={styles.name}>{name}</p>

                <div
                    className={styles.countInput}
                    onClick={handleNumberInputWrapperClick}
                    onKeyDown={handleNumberInputWrapperPress}
                >
                    <ProductCountInput
                        productId={productId}
                    />
                </div>

                <p className={styles.totalPrice}>{formattedTotal} ₽</p>
            </div>
        </Reference>
    );
});

export default ProductCartCard;
