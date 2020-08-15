import React, {useState} from 'react';
import {Col, Row} from 'react-flexbox-grid';
import classnames from 'classnames';
import {observer} from 'mobx-react-lite';

import {ProductImage} from '@/components';

import styles from './styles.scss';
import {useProductById} from '@/entities/product/hooks';


type DesktopProductGalleryProps = {
    productId: number;
}

const DesktopProductGallery = observer(({
    productId,
}: DesktopProductGalleryProps) => {
    const {images} = useProductById(productId);
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className={styles.productGallery} aria-hidden="true">
            <ProductImage.Wrapper>
                <ProductImage src={images[currentImage]} />
            </ProductImage.Wrapper>
            <Row className={styles.imagesSelect}>
                {
                    images.map(
                        (image, ind) => (
                            <Col key={ind} xs={3}>
                                <ProductImage.Wrapper
                                    tabIndex={0}
                                    className={classnames(
                                        styles.imageWrapper,
                                        {[styles.selected]: ind === currentImage},
                                    )}
                                    onClick={() => setCurrentImage(ind)}
                                >
                                    <ProductImage
                                        className={styles.image}
                                        src={image}
                                    />
                                </ProductImage.Wrapper>
                            </Col>
                        ),
                    )
                }
            </Row>
        </div>
    );
});

export default React.memo(DesktopProductGallery);
