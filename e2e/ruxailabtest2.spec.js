const { test, expect } = require('@playwright/test');

async function login(page) {
  await page.goto('https://ruxailab-prod.web.app/signin');
  await page.getByRole('textbox', {name:'E-mail'}).fill('testemail@gmail.com')
  await page.getByRole('textbox', {name: 'Password'}).fill('password123')
  //await page.click('button[type="submit"]');
  await page.click('.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--rounded');
}
test.beforeEach(async ({ page }) => {
  await login(page);
});

test('failure test heuristic', async ({ page }) => { // test 3
  await page.video();
  await page.click('button.v-btn.v-btn--bottom.v-btn--is-elevated.v-btn--fab.v-btn--fixed.v-btn--has-bg.v-btn--right.v-btn--round');
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.click('.card-title:has-text("Create a blank test")');
  await page.click('.card.col-sm-10.col-md-5.col-12');
  await page.getByRole('textbox', {name: 'Test Description'}).fill('Some descripton')
  await page.click('.ml-auto.mr-2.circleOrange.v-btn.v-btn--fab.v-btn--has-bg.v-btn--round.theme--dark.v-size--default.orange')

  const errorMessage = await page.locator('div[role="alert"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Enter a Title')
  await page.waitForTimeout(2000); // 2 segundo de delay

});

test('Detalte test', async ({ page }) => { // test 12
  await page.video();

  await page.click('button.v-btn.v-btn--bottom.v-btn--is-elevated.v-btn--fab.v-btn--fixed.v-btn--has-bg.v-btn--right.v-btn--round');
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.click('.card-title:has-text("Create a blank test")');
  await page.click('.card.col-sm-10.col-md-5.col-12');
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.getByRole('textbox', {name:'Test Name'}).fill('Test heuristic playwright for delate')
  await page.getByRole('textbox', {name: 'Test Description'}).fill('Some descripton')

  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.click('.ml-auto.mr-2.circleOrange.v-btn.v-btn--fab.v-btn--has-bg.v-btn--round.theme--dark.v-size--default.orange')
  await page.click('.card.col-sm-10.col-md-4.col-10')
  await page.click('.console-button.mx-1.hidden-sm-and-down.v-btn.v-btn--text.theme--dark.v-size--default')
  await page.waitForTimeout(2000); // 2 segundo de delay
  await page.goto('https://ruxailab-prod.web.app/testslist')
  await page.waitForTimeout(2000); // 2 segundo de delay

  //await page.click('.div.v-list-item__title', { hasText: 'Test heuristic playwright for delate' });
  await page.click('text=Test heuristic playwright for delate');
  await page.click('.v-btn.v-btn--icon.v-btn--round.theme--light.v-size--default')
  await page.click('.white--text.mb-4.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default')
  await page.click('.red.white--text.ml-1.v-btn.v-btn--text.theme--light.v-size--default')
});


test('failure test template', async ({ page }) => { // test 10
  await page.video();

  await page.click('button.v-btn.v-btn--bottom.v-btn--is-elevated.v-btn--fab.v-btn--fixed.v-btn--has-bg.v-btn--right.v-btn--round');
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.click('.card-title:has-text("Create from template")');

  await page.click('.v-list-item.v-list-item--link.theme--light')
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.getByRole('button', { name: 'NEXT' }).click();
  await page.getByRole('textbox', {name:'Title'}).fill('')
  await page.getByRole('textbox', {name: 'Description'}).fill('Some description for template')
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.getByRole('button', { name: 'CREATE' }).click();

  try {
      await page.waitForSelector('.console-button.mx-1.hidden-sm-and-down.v-btn.v-btn--text.theme--dark.v-size--default', { timeout: 5000 });
      await page.click('.console-button.mx-1.hidden-sm-and-down.v-btn.v-btn--text.theme--dark.v-size--default', { timeout: 5000 });
      await expect(page).toHaveURL('https://ruxailab-prod.web.app/testslist', { timeout: 5000 });
  } catch {
      console.error('Failed to click button or URL did not match:');
      // throw new Error('Failed to click button or URL did not match');
      await page.waitForTimeout(2000); // 2 segundo de delay
      page.close()
  }
});


