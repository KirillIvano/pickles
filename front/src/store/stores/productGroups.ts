import {action, observable} from 'mobx';

import {getProductGroups} from '@/services/product';

import {ProductGroup} from '@/entities/productGroup/types';

class GroupsStore {
    @observable.ref
    groupsPreviews: ProductGroup[] = []

    @observable
    groupsGettingInProgress = false;
    @observable
    groupsGettingError: string | null = null;

    getGroupById(groupId: number): ProductGroup | null {
        return this.groupsPreviews.find(({id}) => id === groupId) ?? null;
    }

    @action
    async getGroups() {
        this.groupsGettingInProgress = true;
        this.groupsGettingError = null;

        const groupsRes = await getProductGroups();

        if (groupsRes.ok === false) {
            this.groupsGettingError = groupsRes.error;
        } else {
            this.groupsPreviews = [
                ...groupsRes.data.compilations,
            ];
        }

        this.groupsGettingInProgress = false;
    }
}


export const groupsStore = new GroupsStore();
