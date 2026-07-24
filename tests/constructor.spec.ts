import { test, expect } from '@playwright/test';

const bunName = 'Краторная булка N-200i';
const ingredientName = 'Биокотлета из марсианской Магнолии';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/burger.har', {
      notFound: 'fallback'
    });

    await page.goto('/');
    await expect(page.getByText('Соберите бургер')).toBeVisible();
  });

  test('добавляет булку и начинку в конструктор', async ({ page }) => {
    const bunCard = page.locator('li').filter({ hasText: bunName });
    const ingredientCard = page
      .locator('li')
      .filter({ hasText: ingredientName });

    await bunCard.getByRole('button', { name: 'Добавить' }).click();
    await ingredientCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByText(`${bunName} (верх)`)).toBeVisible();
    await expect(page.getByText(`${bunName} (низ)`)).toBeVisible();
    await expect(page.getByText(ingredientName)).toHaveCount(2);
  });

  test('открывает модальное окно выбранного ингредиента', async ({ page }) => {
    await page.getByText(ingredientName).click();

    const modalRoot = page.locator('#modals');

    await expect(
      modalRoot.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await expect(
      modalRoot.getByRole('heading', { name: ingredientName })
    ).toBeVisible();

    await expect(page).toHaveURL(
      /\/ingredients\/643d69a5c3f7b9001cfa0941$/
    );
  });

  test('закрывает модальное окно ингредиента по клику на крестик', async ({
    page
  }) => {
    await page.getByText(ingredientName).click();

    const modalRoot = page.locator('#modals');

    await expect(
      modalRoot.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await modalRoot.locator('button').click();

    await expect(modalRoot).toBeEmpty();
    await expect(page).toHaveURL('/');
  });

  test('закрывает модальное окно ингредиента по клику на оверлей', async ({
    page
  }) => {
    await page.getByText(ingredientName).click();

    const modalRoot = page.locator('#modals');

    await expect(
      modalRoot.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await modalRoot.locator(':scope > div').last().click({
      position: { x: 5, y: 5 }
    });

    await expect(modalRoot).toBeEmpty();
    await expect(page).toHaveURL('/');
  });

  test('создаёт заказ и очищает конструктор', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer mock-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    await page.routeFromHAR('tests/hars/user.har', {
      notFound: 'fallback'
    });

    await page.routeFromHAR('tests/hars/order.har', {
      notFound: 'fallback'
    });

    await page.reload();

    const bunCard = page.locator('li').filter({ hasText: bunName });
    const ingredientCard = page
      .locator('li')
      .filter({ hasText: ingredientName });

    await bunCard.getByRole('button', { name: 'Добавить' }).click();
    await ingredientCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByText(`${bunName} (верх)`)).toBeVisible();
    await expect(page.getByText(`${bunName} (низ)`)).toBeVisible();
    await expect(page.getByText(ingredientName)).toHaveCount(2);

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modalRoot = page.locator('#modals');

    await expect(
      modalRoot.getByRole('heading', { name: '12345' })
    ).toBeVisible();

    await expect(
      modalRoot.getByText('идентификатор заказа')
    ).toBeVisible();

    await expect(page.getByText('Выберите булки')).toHaveCount(2);
    await expect(page.getByText('Выберите начинку')).toBeVisible();

    await modalRoot.locator('button').click();

    await expect(modalRoot).toBeEmpty();
  });
});
