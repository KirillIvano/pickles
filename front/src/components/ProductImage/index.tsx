import React from 'react';
import classnames from 'classnames';

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


type ProductImageProps = React.ImgHTMLAttributes<HTMLImageElement>

const ProductImage = ({
    className,
    ...props
}: ProductImageProps) => (
    <img
        {...props}
        className={classnames(className, styles.productImage)}
    />
);


ProductImage.Wrapper = ProductImageWrapper;

export default ProductImage;
