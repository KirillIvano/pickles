import {assertExists} from '@/util/assertions';

import {useFeaturingStore} from './useFeaturingStore';


export const useFeaturingIdSafe = (): number => {
    const {featuringId} = useFeaturingStore();

    assertExists(featuringId);

    return featuringId;
};
