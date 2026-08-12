import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').click();
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await page.locator('[data-test="nav-home"]').click();
    await page.locator('[data-test="search-query"]').click();
    await page.locator('[data-test="search-query"]').fill('hammer');
    await page.locator('[data-test="search-submit"]').click();
    const itemNameInItemsPage = await page.locator("//h5[contains(text(),'Claw Hammer with Shock Reduction Grip')]").textContent()
    console.log("itemNameInItemsPage = ",itemNameInItemsPage);
    await expect(itemNameInItemsPage).toContain("Hammer")
    
    await page.locator("//h5[contains(text(),'Claw Hammer with Shock Reduction Grip')]/parent::div/parent::a").click();
    const itemName = await page.locator('[data-test="product-name"]').textContent()
    console.log("itemName", itemName);
    await expect(itemName).toEqual(itemNameInItemsPage)
    
    await page.locator('[data-test="add-to-cart"]').click();
    const alertText = await page.getByRole('alert', { name: 'Product added to shopping' }).textContent()
    console.log("alertText", alertText);
    await expect(alertText).toContain(" Product added to shopping cart. ")
    await page.waitForTimeout(5_000)
    await page.close()
});