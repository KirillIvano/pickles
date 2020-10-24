import React, {useCallback} from 'react';
import {Col, Row} from 'react-flexbox-grid';
import {observer} from 'mobx-react-lite';

import {Button, Modal, Checkbox} from '@/uikit';
import {useUserStore} from '@/entities/user/hooks';
import {UserRetailType} from '@/entities/user/types';

import styles from './styles.scss';


const RetailChangeModal = observer(() => {
    const userStore = useUserStore();

    const closeModal = useCallback(() => userStore.hideRetailModal(), [userStore]);

    return (
        <Modal
            isOpen={userStore.isRetailModalVisible}
            closable={true}
            handleClose={closeModal}
        >
            <Modal.ModalCloseIcon handleClick={closeModal} />

            <div className={styles.retailChangeModalContent}>
                <h1 className={styles.modalHeading}>
                    Вы перешли в режим <strong>
                        {userStore.retailType === UserRetailType.RETAIL ? 'розничной' : 'оптовой'}
                    </strong> покупки!
                </h1>

                <Row>
                    <Col xs={12} md={4}>
                        <ul className={styles.infoList}>
                            <h2 className={styles.infoListHeading}>Оптовый режим</h2>

                            <li className={styles.infoListItem}>- Ниже цены</li>
                            <li className={styles.infoListItem}>- Доставка при заказе от 5000р</li>
                            <li className={styles.infoListItem}>- Бесплатная доставка от 10000р</li>
                        </ul>
                    </Col>
                    <Col xs={12} md={4} mdOffset={1}>
                        <ul className={styles.infoList}>
                            <h2 className={styles.infoListHeading}>Розничный режим</h2>

                            <li className={styles.infoListItem}>- Выше цены</li>
                            <li className={styles.infoListItem}>- Бесплатная доставка от 2000 р</li>
                        </ul>
                    </Col>
                </Row>

                <p className={styles.infoParagraph}>
                    {'В розничном и оптовом режимах - раздельные корзины. ' +
                     'Действия в одном режиме не влияют на корзину другого режима'}
                </p>

                <Checkbox
                    onChange={e => userStore.setShouldShowRetailModal(!e.currentTarget.checked)}
                    checked={!userStore.shouldShowRetailModal}
                    className={styles.showAgainCheckbox}
                >
                    Больше не показывать
                </Checkbox>
            </div>

            <Button
                onClick={closeModal}
                className={styles.continueBtn}
            >
                Продолжить покупки
            </Button>
        </Modal>
    );
});

export default RetailChangeModal;
