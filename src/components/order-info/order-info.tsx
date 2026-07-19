import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TIngredient, TOrder } from '@utils-types';

import { getOrderByNumberApi } from '../../utils/burger-api';
import { useSelector } from '../../services/store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const { number } = useParams();

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    if (!number) {
      return;
    }

    getOrderByNumberApi(Number(number)).then((data) => {
      setOrderData(data.orders[0]);
    });
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, ingredientId: string) => {
        if (acc[ingredientId]) {
          acc[ingredientId].count += 1;
          return acc;
        }

        const ingredient = ingredients.find(
          (item) => item._id === ingredientId
        );

        if (ingredient) {
          acc[ingredientId] = {
            ...ingredient,
            count: 1
          };
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, ingredient) => sum + ingredient.price * ingredient.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
