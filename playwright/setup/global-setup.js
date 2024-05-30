import { expect, chromium } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

const globatSetup = async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('https://ruxailab-prod.web.app/signin')
  await page.getByLabel('E-mail').click()
  await page.getByLabel('E-mail').fill('testemail@gmail.com')
  await page.getByLabel('Password', { exact: true }).click()
  await page.getByLabel('Password', { exact: true }).fill('password123')
  await page
    .getByRole('main')
    .getByRole('button', { name: 'Sign-In' })
    .click()
  await expect(page.locator('.pa-0').first()).toBeVisible()

  await page.context().storageState({ path: authFile })

  await browser.close()
}

export default globatSetup
