import React from 'react';
import classnames from 'classnames';

import {useScrolled} from '@/hooks/useScrolled';

import styles from './styles.scss';


type ProductImageWrapperProps = React.HTMLAttributes<HTMLDivElement>;

const ProductImageWrapper = ({
    className,
    ...props
}: ProductImageWrapperProps) => (
    <div
        {...props}
        className={classnames(className, styles.productImageWrapper)}
    />
);


type ProductImageProps = {lazy?: boolean} & React.ImgHTMLAttributes<HTMLImageElement>

const ProductImage = ({
    className,
    src,
    alt='Фото продукта',
    lazy=false,

    ...props
}: ProductImageProps) => {
    const {elementRef, isReached} = useScrolled();

    return (
        <img
            {...props}

            ref={elementRef as React.Ref<HTMLImageElement>}
            src={lazy ? (isReached ? src : undefined) : src}
            alt={lazy ? (isReached ? alt : undefined) : alt}
            className={classnames(className, styles.productImage)}
        />
    );
};

ProductImage.Wrapper = ProductImageWrapper;

export default ProductImage;
