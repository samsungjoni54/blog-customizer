import { defaultArticleState, type ArticleStateType } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [state, setState] = useState(defaultArticleState);

  const handleApply = (newValue: ArticleStateType): void => {
    setState(newValue);
  };
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': state.fontFamilyOption.value,
          '--font-size': state.fontSizeOption.value,
          '--font-color': state.fontColor.value,
          '--container-width': state.contentWidth.value,
          '--bg-color': state.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm state={state} onApply={handleApply} />
      <Article />
    </main>
  );
};
