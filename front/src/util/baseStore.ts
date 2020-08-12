import {observable, action} from 'mobx';

// применяется для запросов получаещего типа(get - запросы)
// при таких запросах важно, что данные пришли, и не нужна реакция интерфейса на них
export class BaseServiceStore {
    @observable
    loading: boolean;
    @observable
    error: string | null;
}

// применияется для более сложных запросов, когда важна реакция
// например, post запрос, после которого нужно закрыть модалку, с помощью состояния это сделать сложно
// поэтому вводится дополнительная переменная success, по которой мы определяем завершение запроса
// и после того, как интерфейс отреагирует, мы вызываем reset, чтобы подготовить модалку к следующему вызову
export class ServiceStore extends BaseServiceStore {
    @observable
    success: boolean;

    @action
    reset = () => {
        this.loading = false;
        this.error = null;
        this.success = false;
    }
}
