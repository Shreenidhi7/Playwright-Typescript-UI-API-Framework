import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";

test('test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').click();
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await page.waitForTimeout(5_000)
    await page.locator('[data-test="nav-home"]').click();
    await page.locator('[data-test="search-query"]').click();
    await page.locator('[data-test="search-query"]').fill('hammer');
    await page.locator('[data-test="search-submit"]').click();
    const itemNameInItemsPage = await page.locator("//h5[contains(text(),'Claw Hammer with Shock Reduction Grip')]").textContent()
    console.log("itemNameInItemsPage = ", itemNameInItemsPage);
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
    // await page.close()

    await page.locator("[data-test='nav-cart']").click()
    const itemNameInCart = await page.locator("[data-test='nav-cart']").textContent()
    console.log("itemNameInCart", itemNameInCart );
    // await expect(itemNameInCart).toContain("Claw Hammer with Shock Reduction Grip")
    await page.locator("[data-test='proceed-1']").click()
    await page.waitForTimeout(5_000)
    //sign in confirmation page
    // expect(await page.locator("(//p[contains(text(),'logged in')]").textContent()).toContain("logged in")
    await page.locator("[data-test='proceed-2']").click()
    //billing page
    await page.locator("//select[@id='country']").selectOption("Angola")
    await page.locator("//input[@id='postal_code']").fill(faker.location.zipCode())
    await page.locator("//input[@data-test='house_number']").fill(faker.location.buildingNumber())
    await page.waitForTimeout(2_000)
    await page.locator("//input[@id='street']").fill(faker.location.streetAddress())
    await page.getByPlaceholder("Your City *").fill(faker.location.city())
    await page.getByRole("textbox", {name:"State"}).fill(faker.location.state())
    await page.locator("[data-test='proceed-3']").click()
    await page.waitForTimeout(5_000)

    //payment page
    await page.locator("//select[@id='payment-method']").selectOption({label: "Gift Card"})
    await page.getByPlaceholder("Gift Card Number").fill(faker.string.numeric(16))
    await page.locator("//input[@data-test='validation_code']").fill(faker.string.numeric(4))
    await page.getByRole("button", {name: "Confirm"}).click()
    const payment_success_message = await page.locator("//div[@data-test='payment-success-message']").textContent()
    expect(await payment_success_message).toEqual("Payment was successful")

});

// test("Completing payment for items in Cart", async ({ page }) => {
//     // await page.locator("[data-test='nav-cart']").click()
//     // const itemNameInCart = await page.locator("[data-test='nav-cart']").textContent()
//     // console.log("itemNameInCart", itemNameInCart );
//     // expect(itemNameInCart).toContain("Claw Hammer with Shock Reduction Grip")
//     // await page.locator("[data-test='proceed-1']").click()
//     // //sign in confirmation page
//     // expect(await page.locator("(//p[contains(text(),'logged in')]").textContent()).toContain("logged in")
//     // await page.locator("[data-test='proceed-2']").click()
//     // //billing page
//     // await page.locator("//select[@id='country']").selectOption("Angola")
//     // await page.locator("//input[@id=''postaL_code]").fill(faker.location.zipCode())
//     // await page.locator("//input[@data-test='house_number']").fill(faker.location.buildingNumber())
//     // await page.locator("//input[@id='street']").fill(faker.location.streetAddress())
//     // await page.getByPlaceholder("Your City *").fill(faker.location.city())
//     // await page.getByRole("textbox", {name:"State"}).fill(faker.location.state())
//     // await page.locator("[data-test='proceed-3']").click()
//     // //payment page
//     // await page.locator("//select[@id='payment-method']").selectOption({label: "Gift Card"})
//     // await page.waitForTimeout(10_000)
// })