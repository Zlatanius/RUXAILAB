const { test, expect } = require('@playwright/test');

test('failure test heuristic', async ({ page }) => {
    await page.goto('https://ruxailab-prod.web.app/');

    await page.goto('https://ruxailab-prod.web.app/signin');
    await page.waitForTimeout(1000); // 2 segundo de delay

    /*login*/
    await page.getByRole('textbox', {name:'E-mail'}).fill('testemail@gmail.com')
    await page.getByRole('textbox', {name: 'Password'}).fill('password123')
    await page.click('.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--rounded')

    await page.click('button.v-btn.v-btn--bottom.v-btn--is-elevated.v-btn--fab.v-btn--fixed.v-btn--has-bg.v-btn--right.v-btn--round');
    await page.waitForTimeout(1000); // 2 segundo de delay
    await page.click('.card-title:has-text("Create a blank test")');
    await page.click('.card.col-sm-10.col-md-5.col-12');
    await page.getByRole('textbox', {name: 'Test Description'}).fill('Some descripton')
    await page.click('.ml-auto.mr-2.circleOrange.v-btn.v-btn--fab.v-btn--has-bg.v-btn--round.theme--dark.v-size--default.orange')

    const errorMessage = await page.locator('div[role="alert"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Enter a Title')

});


test('failure test template', async ({ page }) => { // test 10
  /*login*/
  await page.goto('https://ruxailab-prod.web.app/signin');
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.getByRole('textbox', {name:'E-mail'}).fill('testemail@gmail.com')
  await page.getByRole('textbox', {name: 'Password'}).fill('password123')
  await page.click('.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--rounded');

  await page.click('button.v-btn.v-btn--bottom.v-btn--is-elevated.v-btn--fab.v-btn--fixed.v-btn--has-bg.v-btn--right.v-btn--round');
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.click('.card-title:has-text("Create from template")');
  //create MARCTEST
  await page.click('.v-list-item.v-list-item--link.theme--light')
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.getByRole('button', { name: 'NEXT' }).click();
  await page.getByRole('textbox', {name:'Title'}).fill('')
  await page.getByRole('textbox', {name: 'Description'}).fill('Some description for template')
  await page.waitForTimeout(1000); // 2 segundo de delay
  await page.getByRole('button', { name: 'CREATE' }).click();

  try {
      await page.click('.console-button.mx-1.hidden-sm-and-down.v-btn.v-btn--text.theme--dark.v-size--default');
      await expect(page).toHaveURL('https://ruxailab-prod.web.app/testslist');
  } catch(error) {
      //console.log(`Failed to click button: ${error.message}`);
      throw new Error('Failed to click button');
  }
});


test('Detalte test', async ({ page }) => { // test 12
  /*login*/
  await page.goto('https://ruxailab-prod.web.app/signin');
  //await page.waitForTimeout(1000); // 2 segundo de delay
  await page.getByRole('textbox', {name:'E-mail'}).fill('testemail@gmail.com')
  await page.getByRole('textbox', {name: 'Password'}).fill('password123')
  await page.click('.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--rounded');

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


  const element = await page.locator('div.v-list-item__title', { hasText: 'Test heuristic playwright for delate' });
  await expect(element).toBeVisible({ timeout: 10000 });
  await element.click();
  await page.click('.v-btn.v-btn--icon.v-btn--round.theme--light.v-size--default')
  await page.click('.white--text.mb-4.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default')
  await page.click('.red.white--text.ml-1.v-btn.v-btn--text.theme--light.v-size--default')

});
