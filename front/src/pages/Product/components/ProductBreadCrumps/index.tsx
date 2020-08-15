import React from 'react';
import {observer} from 'mobx-react-lite';

import {BreadCrumps} from '@/uikit';
import {useProductById} from '@/entities/product/hooks';
import {useCategoryById} from '@/entities/productCategory/hooks';

import styles from './styles.scss';


type ProductBreadCrumpsProps = {
    productId: number;
}

const ProductBreadCrumps = observer(({
    productId,
}: ProductBreadCrumpsProps) => {
    const product = useProductById(productId);
    if (!product) return null;

    const {categoryId} = product;

    const category = useCategoryById(categoryId);
    if (!category) return null;

    const {name: productName, verboseName} = product;
    const {name: categoryName} = category;

    return  (
        <BreadCrumps
            className={styles.breadCrumps}
            items={[
                {caption: 'Каталог', href: '/catalog'},
                {caption: categoryName, href: `/catalog?categoryId=${categoryId}`},
                {caption: productName, href: `/product/${verboseName}/${productId}`},
            ]}
        />
    );
});

export default ProductBreadCrumps;
