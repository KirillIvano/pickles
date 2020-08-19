import {observable} from 'mobx';


class PopupStore {
    @observable
    messages = []
}

export const popupStore = new PopupStore();
