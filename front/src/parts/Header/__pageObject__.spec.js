/// <reference types="cypress" />

import {po} from './../../util/pageObjectSearch';

export class Header {
    static LOGO_ID = 'header__logo';

    clickLogo() {
        cy.get(po`${Header.LOGO_ID}`);
    }
}
