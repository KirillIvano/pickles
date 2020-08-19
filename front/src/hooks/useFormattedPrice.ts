import {useMemo} from 'react';

import {formatPrice} from '@/util/formatPrice';

export const useFormattedPrice = (price: number) =>
    useMemo(() => formatPrice(price), [price]);
