import React from 'react';
import {observer} from 'mobx-react-lite';

import {BreadCrumps} from '@/uikit';
import {useProductById} from '@/entities/product/hooks';
import {useCategoryById} from '@/entities/productCategory/hooks';
import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';
import {NAV_ITEMS} from '@/constants/nav';

import styles from './styles.scss';


type ProductBreadCrumpsProps = {
    productId: number;
}

const ProductBreadCrumps = observer(({
    productId,
}: ProductBreadCrumpsProps) => {
    const {retailType} = useUserStore();

    const product = useProductById(productId);
    const {categoryId} = product;
    const category = useCategoryById(categoryId);

    if (!category) return null;
    if (!product) return null;

    const {name: productName, verboseName} = product;
    const {name: categoryName} = category;

    const catalogPath = (
        retailType === UserRetailType.RETAIL ?
            NAV_ITEMS.retailCatalog :
            NAV_ITEMS.catalog
    ).path;

    return  (
        <BreadCrumps
            className={styles.breadCrumps}
            items={[
                {caption: 'Каталог', href: catalogPath},
                {caption: categoryName, href: `${catalogPath}?categoryId=${categoryId}`},
                {caption: productName, href: `/product/${verboseName}/${productId}`},
            ]}
        />
    );
});

export default ProductBreadCrumps;
