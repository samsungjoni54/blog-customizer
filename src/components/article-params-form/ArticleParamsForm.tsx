import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { useOutsideClickClose } from '@/ui/select/hooks/useOutsideClickClose';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  state: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};
export const ArticleParamsForm = ({
  state,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [formState, setFormState] = useState<ArticleStateType>(state);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(formState);
  };
  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };
  useOutsideClickClose({ isOpen, rootRef, onChange: setIsOpen });
  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.form_title}>Задайте параметры</h2>
          <div className={styles.content_wrapper}>
            <div className={styles.control_group}>
              <Select
                title="шрифт"
                selected={formState.fontFamilyOption}
                options={fontFamilyOptions}
                onChange={(option: OptionType) =>
                  setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
                }
              />
            </div>
            <div className={styles.control_group}>
              <RadioGroup
                title="размер шрифта"
                name="fontSize"
                options={fontSizeOptions}
                selected={formState.fontSizeOption}
                onChange={(option: OptionType) =>
                  setFormState((prev) => ({ ...prev, fontSizeOption: option }))
                }
              />
            </div>
            <div className={styles.control_group}>
              <Select
                title="цвет шрифта"
                selected={formState.fontColor}
                options={fontColors}
                onChange={(option: OptionType) =>
                  setFormState((prev) => ({ ...prev, fontColor: option }))
                }
              />
            </div>
            <Separator />
            <div className={styles.control_group}>
              <Select
                title="цвет фона"
                selected={formState.backgroundColor}
                options={backgroundColors}
                onChange={(option: OptionType) =>
                  setFormState((prev) => ({ ...prev, backgroundColor: option }))
                }
              />
            </div>
            <div className={styles.control_group}>
              <Select
                title="ширина контента"
                selected={formState.contentWidth}
                options={contentWidthArr}
                onChange={(option: OptionType) =>
                  setFormState((prev) => ({ ...prev, contentWidth: option }))
                }
              />
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <Button
              onClick={handleReset}
              title="Сбросить"
              htmlType="reset"
              type="clear"
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
