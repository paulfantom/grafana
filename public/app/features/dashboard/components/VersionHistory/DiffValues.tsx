import React from 'react';
import { isArray, isObject, isUndefined } from 'lodash';
import { useStyles2, Icon } from '@grafana/ui';
import { GrafanaThemeV2 } from '@grafana/data';
import { css } from '@emotion/css';
import { Diff } from './utils';

type DiffProps = {
  diff: Diff;
};

export const DiffValues: React.FC<DiffProps> = ({ diff }) => {
  const styles = useStyles2(getStyles);
  const hasLeftValue =
    !isUndefined(diff.originalValue) && !isArray(diff.originalValue) && !isObject(diff.originalValue);
  const hasRightValue = !isUndefined(diff.value) && !isArray(diff.value) && !isObject(diff.value);

  return (
    <>
      {hasLeftValue && <span className={styles}>{String(diff.originalValue)}</span>}
      {hasLeftValue && hasRightValue ? <Icon name="arrow-right" /> : null}
      {hasRightValue && <span className={styles}>{String(diff.value)}</span>}
    </>
  );
};

const getStyles = (theme: GrafanaThemeV2) => css`
  background-color: ${theme.colors.action.hover};
  border-radius: ${theme.shape.borderRadius()};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.body.fontSize};
  margin: 0 ${theme.spacing(0.5)};
  padding: ${theme.spacing(0.5, 1)};
`;
