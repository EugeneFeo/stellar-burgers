import { FC, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TOrder } from '@utils-types';

import { clearConstructor } from '../../services/slices/constructor-slice';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurgerApi } from '../../utils/burger-api';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const isAuth = useSelector((state) => state.user.isAuth);

  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login', {
        state: {
          from: location
        }
      });
      return;
    }

    if (!bun || orderRequest) {
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    setOrderRequest(true);

    orderBurgerApi(ingredientIds)
      .then((data) => {
        setOrderModalData({
          _id: data.order._id,
          status: data.order.status,
          name: data.order.name,
          createdAt: data.order.createdAt,
          updatedAt: data.order.updatedAt,
          number: data.order.number,
          ingredients: ingredientIds
        });

        dispatch(clearConstructor());
      })
      .finally(() => {
        setOrderRequest(false);
      });
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
