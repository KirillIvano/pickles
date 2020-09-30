import React from 'react';

import {ProductImage} from '@/components';
import {Carousel} from '@/components';
import {useProductById} from '@/entities/product/hooks';

import styles from './styles.scss';


type MobileProductGalleryProps = {
    productId: number;
}

const MobileProductGallery = ({
    productId,
}: MobileProductGalleryProps) => {
    const {images} = useProductById(productId);

    return (
        <Carousel capacity={1}>
            {
                images.map(
                    (image, ind) => (
                        <ProductImage.Wrapper
                            tabIndex={0}
                            key={ind}
                        >
                            <ProductImage
                                className={styles.productImage}
                                src={image}
                                alt={'Фото продукта'}
                            />
                        </ProductImage.Wrapper>
                    ),
                )
            }
        </Carousel>
    );
};

export default React.memo(MobileProductGallery);
