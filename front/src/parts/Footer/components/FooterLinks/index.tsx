import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';
import {LinkItem, LinksBlock} from './..';


const FooterLinks = () => (
    <div className="flex flex-wrap w-full -mx-4 pt-4 md:ml-12">
        <div className="w-full md:w-1/2 px-4">
            <LinksBlock title={'Каталог'}>
                <div className="flex -mx-4">
                    <div className="w-1/2 px-4">
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    </div>
                    <div className="w-1/2 px-4">
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                        <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                    </div>
                </div>
            </LinksBlock>
        </div>
        <div className="w-full md:w-1/4 px-4">
            <LinksBlock title={'Каталог'}>
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
            </LinksBlock>
        </div>
        <div className="w-full md:w-1/4 px-4">
            <LinksBlock title={'Каталог'}>
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
                <LinkItem name={'Баклажаны'} path={'/catalog/баклажаны'} />
            </LinksBlock>
        </div>
    </div>
);

export default FooterLinks;
