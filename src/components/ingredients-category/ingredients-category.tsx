import { forwardRef, useMemo } from 'react';

import { TIngredient } from '@utils-types';

import { useSelector } from '../../services/store';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const burgerConstructor = useSelector((state) => state.burgerConstructor);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    burgerConstructor.ingredients.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (burgerConstructor.bun) {
      counters[burgerConstructor.bun._id] = 2;
    }

    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});

IngredientsCategory.displayName = 'IngredientsCategory';
