import {action, computed, observable} from 'mobx';

import {UserRetailType, UserStoreInterface} from '@/entities/user/types';
import {isValueInEnum} from '@/util/isValueInEnum';


export class UserStore implements UserStoreInterface {
    private static RETAIL_TYPE_KEY = 'retailType';
    private static SHOW_RETAIL_MODAL_KEY = 'showRetailModal';

    @observable private _retailType: UserRetailType = UserRetailType.WHOLE;
    @observable private _shouldShowRetailModal = true;
    @observable private _isRetailModalVisible = false;


    private saveRetailType = () => {
        localStorage.setItem(UserStore.RETAIL_TYPE_KEY, this._retailType);
    }

    private saveShouldShowRetailModal = () => {
        localStorage.setItem(UserStore.SHOW_RETAIL_MODAL_KEY, this._shouldShowRetailModal ? 'true' : 'false');
    }

    @computed
    get shouldShowRetailModal(): boolean {
        return this._shouldShowRetailModal;
    }

    @computed
    get retailType(): UserRetailType {
        return this._retailType;
    }

    @computed
    get isRetailModalVisible(): boolean {
        return this._isRetailModalVisible;
    }


    @action
    setShouldShowRetailModal = (shouldShow: boolean) => {
        this._shouldShowRetailModal = shouldShow;
        this.saveShouldShowRetailModal();
    }

    @action
    setRetailType = (type: UserRetailType) => {
        this._retailType = type;
        this.saveRetailType();
    }

    @action
    showRetailModal = () =>  {
        if (this._shouldShowRetailModal) {
            this._isRetailModalVisible = true;
        }
    }
    @action
    hideRetailModal = () => {
        this._isRetailModalVisible = false;
    }

    @action
    initUser = () =>  {
        const type = localStorage.getItem(UserStore.RETAIL_TYPE_KEY);

        if (isValueInEnum(UserRetailType, type)) {
            this._retailType = type as UserRetailType;
        }

        this._shouldShowRetailModal = 'false' !== localStorage.getItem(UserStore.SHOW_RETAIL_MODAL_KEY);
    }
}

export const userStore = new UserStore();
