import React, { useMemo } from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {useCategoriesStore} from '@/entities/productCategory/hooks';
import {getArrayHalfs} from '@/util/getArrayHalfs';
import {CategoryPreview} from '@/entities/productCategory/types';

import {LinkItem, LinksBlock} from './..';
import styles from './styles.scss';


type CategoriesLinksProps = {
    categories: CategoryPreview[];
}

const CategoriesLinks = ({categories}: CategoriesLinksProps) => (
    <div>
        {categories.map(
            ({id, name}) =>
                <LinkItem key={id} name={name} path={`/catalog?categoryId=${id}`} />,
        )}
    </div>
);

const FooterLinks = observer(() => {
    const {categoriesPreviews} = useCategoriesStore();

    const [firstCategories, restCategories] = useMemo(
        () => getArrayHalfs(categoriesPreviews), [categoriesPreviews],
    );

    return (
        <Row className={styles.footerLinks}>
            <Col md={6}>
                <LinksBlock title={'Категории'}>
                    <Row>
                        <Col xs={6}>
                            <CategoriesLinks categories={firstCategories} />
                        </Col>
                        <Col xs={6}>
                            <CategoriesLinks categories={restCategories} />
                        </Col>
                    </Row>
                </LinksBlock>
            </Col>
            <Col md={3}>
                <LinksBlock title={'Доставка'}>
                    <LinkItem name={'О доставке'} path={'/delivery'} />
                </LinksBlock>
            </Col>
        </Row>
    );
});

export default FooterLinks;
