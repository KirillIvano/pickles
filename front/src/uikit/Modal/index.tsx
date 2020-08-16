import React from 'react';
import ReactModal, {Props as ReactModalProps} from 'react-modal';
import classnames from 'classnames';

import styles from './styles.scss';
import {CloseIconImage} from './CloseIcon';


type CloseIconProps = {
    handleClick: () => void;
    theme?: 'light' | 'dark';
}

const ModalCloseIcon = ({
    handleClick,
    theme='light',
}: CloseIconProps) => (
    <button
        onClick={handleClick}
        onKeyUp={({key}) => key === 'Enter' && handleClick && handleClick()}
        className={classnames(
            styles.iconContainer,
            {[styles.dark]: theme === 'dark'},
        )}
    >
        <CloseIconImage />
    </button>
);


interface ModalProps extends ReactModalProps {
    isOpen: boolean;
    children: React.ReactNode;

    handleClose?: () => void;
    className?: string;
    closable?: boolean;
}

const Modal = ({
    isOpen,
    children,

    handleClose,
    className,
    closable=true,
}: ModalProps) => (
    <ReactModal
        bodyOpenClassName={styles.bodyOpen}
        overlayClassName={styles.modalOverlay}
        className={classnames(className, styles.modal)}
        isOpen={isOpen}
        shouldCloseOnEsc={closable}
        shouldCloseOnOverlayClick={closable}
        onRequestClose={handleClose}
    >
        {children}
    </ReactModal>
);

ReactModal.setAppElement(document.body);


Modal.ModalCloseIcon = ModalCloseIcon;

export default Modal;
