import React from 'react';
import {Row, Col} from 'react-flexbox-grid';

import {LinkItem, LinksBlock} from './..';
import styles from './styles.scss';


const FooterLinks = () => (
    <Row className={styles.footerLinks}>
        <Col md={6}>
            <LinksBlock title={'Каталог'}>
                <Row>
                    <Col xs={6}>
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    </Col>
                    <Col xs={6}>
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    </Col>
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

export default FooterLinks;
