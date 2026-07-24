import { getIngredients, ingredientsReducer } from '../ingredients-slice';
import { TIngredient } from '../../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image.png',
    image_mobile: 'image-mobile.png',
    image_large: 'image-large.png'
  }
];

describe('ingredientsReducer', () => {
  test('возвращает начальное состояние при неизвестном экшене', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  test('обрабатывает getIngredients.pending', () => {
    const action = getIngredients.pending('requestId', undefined);
    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('обрабатывает getIngredients.fulfilled', () => {
    const action = getIngredients.fulfilled(
      mockIngredients,
      'requestId',
      undefined
    );
    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  test('обрабатывает getIngredients.rejected', () => {
    const action = getIngredients.rejected(
      new Error('Ошибка запроса'),
      'requestId',
      undefined
    );
    const state = ingredientsReducer(undefined, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка запроса'
    });
  });
});
