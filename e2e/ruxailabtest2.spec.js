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
