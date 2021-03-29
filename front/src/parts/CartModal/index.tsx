import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import classnames from 'classnames';

import {ButtonLink, Modal, Preloader, Button} from '@/uikit';
import {ProductImage, ProductCountInput, Reference} from '@/components';
import {useProductPreviewById} from '@/entities/product/hooks';
import {useCartItemById} from '@/entities/cart/hooks';
import {useCartModalContext} from '@/hooks/useCartModalContext';
import {useDeviceType} from '@/contexts/DeviceContext';
import {useUserStore} from '@/entities/user/hooks';
import {NAV_ITEMS} from '@/constants/nav';
import {UserRetailType} from '@/entities/user/types';

import styles from './styles.scss';
import {useCartModalStore} from './hooks';


export const CartModalContent = observer(({productId}: {productId: number}) => {
    const {productLoadingError, getProductPreview} = useCartModalStore();
    const {closeModal} = useCartModalContext();
    const {retailType} = useUserStore();

    useEffect(() => {
        getProductPreview(productId);
    }, [productId, getProductPreview]);

    const productPreview = useProductPreviewById(productId);
    const cartItem = useCartItemById(productId, retailType);

    if (productLoadingError) return <div>Ошибка загрузки</div>;
    if (!productPreview || !cartItem) return <Preloader />;

    const {
        image,
        name,
        price,
        verboseName,
    } = productPreview;
    const {productsCount} = cartItem;

    return (
        <section className={styles.cartModalContent}>
            <div className={styles.productImageContainer}>
                <ProductImage.Wrapper className={styles.productImageWrapper}>
                    <ProductImage
                        className={styles.productImage}
                        src={image}
                        alt={`Фото продукта с именем ${name}`}
                    />
                </ProductImage.Wrapper>
            </div>

            <div className={styles.cartProduct}>
                <div className={styles.cartProductInfo}>
                    <h1 className={styles.modalCaption}>Теперь в корзине</h1>
                    <h2 className={styles.productName}>{name}</h2>

                    <div className={styles.productsCountContainer}>
                        <ProductCountInput productId={productId} />
                        <span className={styles.productPrice}>{price * productsCount} ₽</span>
                    </div>
                </div>

                <Reference
                    to={`/product/${verboseName}/${productId}`}
                    className={styles.productVariantsInformer}
                    onClick={() => closeModal()}
                >
                    Информация о товаре и другие упаковки
                </Reference>

                <div className={styles.cartModalControls}>
                    <Button
                        onClick={closeModal}
                        className={classnames(styles.cartLink, styles.continueBuyingLink)}
                    >
                        {'Продолжить покупки'}
                    </Button>
                    <ButtonLink
                        to={(retailType === UserRetailType.RETAIL ? NAV_ITEMS.retailCart : NAV_ITEMS.cart).path}
                        handleInteract={closeModal}
                        className={styles.cartLink}
                    >
                        {'Перейти в корзину'}
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
});



const CartModal = () => {
    const {closeModal, isModalOpened, currentProductId} = useCartModalContext();
    const deviceType = useDeviceType();

    return (
        <Modal
            isOpen={isModalOpened}
            handleClose={closeModal}
            portalClassName={styles.cartModalPortal}
        >
            <Modal.ModalCloseIcon
                handleClick={closeModal}
                theme={deviceType === 'desktop' ? 'light' : 'dark'}
            />

            {!!currentProductId && <CartModalContent productId={currentProductId} />}
        </Modal>
    );
};

export default CartModal;
