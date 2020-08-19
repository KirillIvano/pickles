import React from 'react';
import classnames from 'classnames';

import {Input, Label} from '..';
import styles from './styles.scss';

interface LabeledInputProps extends React.ComponentProps<typeof Input> {
    caption: string;

    className?: string;
    wrapperClassName?: string;
    labelClassName?: string;
}

const LabeledInput = ({
    caption,
    wrapperClassName,
    labelClassName,

    ...inputProps
}: LabeledInputProps) => (
    <div className={wrapperClassName}>
        <Label
            className={classnames(
                labelClassName,
                styles.label,
            )}
        >
            {caption}
        </Label>
        <Input
            {...inputProps}
            sizing={'lg'}
        />
    </div>
);


export default LabeledInput;
