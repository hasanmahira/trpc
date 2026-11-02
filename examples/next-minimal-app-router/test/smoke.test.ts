import { expect, test } from '@playwright/test';

test.setTimeout(35e3);

test('prefetched queries are in the server-rendered HTML', async ({
  request,
}) => {
  const res = await request.get('/');
  expect(res.ok()).toBe(true);
  const html = await res.text();
  expect(html).toContain('hello client');
  expect(html).toContain('hello server');
});

test('route handler answers GET queries', async ({ request }) => {
  const input = encodeURIComponent(JSON.stringify({ json: { name: 'route' } }));
  const res = await request.get(`/api/trpc/greeting?input=${input}`);
  expect(res.ok()).toBe(true);
  const body = await res.json();
  expect(body.result.data.json.text).toBe('hello route');
});

test('adding a message invalidates the list', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('greeting')).toHaveText('hello client');

  const text = `hi from playwright ${Date.now()}`;
  await page.getByLabel('Message').fill(text);
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByTestId('messages')).toContainText(text);
  await expect(page.getByLabel('Message')).toHaveValue('');
});
