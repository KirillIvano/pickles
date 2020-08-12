import React, { useMemo } from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {useCategoriesStore} from '@/entities/productCategory/hooks';
import {getArrayHalfs} from '@/util/getArrayHalfs';

import {LinkItem, LinksBlock} from './..';
import styles from './styles.scss';
import { CategoryPreview } from '@/entities/productCategory/types';

type CategoriesLinksProps = {
    categories: CategoryPreview[];
}

const CategoriesLinks = ({categories}: CategoriesLinksProps) => (
    <Col xs={6}>
        {categories.map(
            ({id, name}) =>
                <LinkItem key={id} name={name} path={`/catalog?categoryId=${id}`} />,
        )}
    </Col>
);

const FooterLinks = observer(() => {
    const {categoriesPreviews} = useCategoriesStore();

    const [firstCategories, restCategories] = useMemo(
        () => getArrayHalfs(categoriesPreviews), [categoriesPreviews],
    );

    return (
        <Row className={styles.footerLinks}>
            <Col md={6}>
                <LinksBlock title={'Каталог'}>
                    <Row>
                        <CategoriesLinks categories={firstCategories} />
                        <CategoriesLinks categories={restCategories} />
                    </Row>
                </LinksBlock>
            </Col>
            <Col md={3}>
                <LinksBlock title={'Каталог'}>
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                </LinksBlock>
            </Col>
            <Col md={3}>
                <LinksBlock title={'Каталог'}>
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                </LinksBlock>
            </Col>
        </Row>
    );
});

export default FooterLinks;
