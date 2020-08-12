import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({className, ...props}: LabelProps) => (
    <label {...props} className={classnames(className, styles.label)} />
);

export default Label;
