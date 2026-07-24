import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  moveIngredient,
  removeIngredient
} from '../constructor-slice';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';

const mockBun: TIngredient = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'bun.png',
  image_mobile: 'bun-mobile.png',
  image_large: 'bun-large.png'
};

const mockIngredient: TIngredient = {
  _id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'main.png',
  image_mobile: 'main-mobile.png',
  image_large: 'main-large.png'
};

const firstIngredient: TConstructorIngredient = {
  ...mockIngredient,
  id: 'ingredient-1'
};

const secondIngredient: TConstructorIngredient = {
  ...mockIngredient,
  _id: '3',
  name: 'Соус Spicy-X',
  type: 'sauce',
  id: 'ingredient-2'
};

describe('constructorReducer', () => {
  test('возвращает начальное состояние при неизвестном экшене', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('добавляет булку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(mockBun));

    expect(state.bun).toEqual(
      expect.objectContaining({
        _id: mockBun._id,
        name: mockBun.name,
        type: 'bun'
      })
    );

    expect(state.bun).toHaveProperty('id');
    expect(state.ingredients).toEqual([]);
  });

  test('добавляет начинку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(mockIngredient));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);

    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        _id: mockIngredient._id,
        name: mockIngredient.name,
        type: 'main'
      })
    );

    expect(state.ingredients[0]).toHaveProperty('id');
  });

  test('удаляет начинку из конструктора', () => {
    const initialState = {
      bun: null,
      ingredients: [firstIngredient, secondIngredient]
    };

    const state = constructorReducer(
      initialState,
      removeIngredient('ingredient-1')
    );

    expect(state.ingredients).toEqual([secondIngredient]);
  });

  test('перемещает начинку в конструкторе', () => {
    const initialState = {
      bun: null,
      ingredients: [firstIngredient, secondIngredient]
    };

    const state = constructorReducer(
      initialState,
      moveIngredient({ from: 0, to: 1 })
    );

    expect(state.ingredients).toEqual([secondIngredient, firstIngredient]);
  });

  test('очищает конструктор', () => {
    const initialState = {
      bun: {
        ...mockBun,
        id: 'bun-1'
      },
      ingredients: [firstIngredient]
    };

    const state = constructorReducer(initialState, clearConstructor());

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
