import React from 'react';

import {Reference} from '@/components';


type NavItemProps = {
    name: string;
    path: string;

    className?: string;
    wrapperClass?: string;
}

const NavItem = ({
    name,
    path,

    className,
    wrapperClass,
}: NavItemProps) => (
    <Reference to={path} className={wrapperClass}>
        <li className={className}>{name}</li>
    </Reference>
);

export default NavItem;
