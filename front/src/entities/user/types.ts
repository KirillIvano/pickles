export enum UserRetailType {
    WHOLE='wholesale',
    RETAIL='retail'
}

export interface UserStoreInterface {
    isRetailModalVisible: boolean;
    showRetailModal: () => void;
    hideRetailModal: () => void;

    shouldShowRetailModal: boolean;
    setShouldShowRetailModal: (shouldShow: boolean) => void;

    retailType: UserRetailType;
    setRetailType: (type: UserRetailType) => void;
}
