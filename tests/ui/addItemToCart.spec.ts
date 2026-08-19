import { expect, test } from '../../fixtures/pages.fixture';
import { faker } from "@faker-js/faker";

test('test', async ({ page, loginPage, homePage, productListingPage, productDetailsPage, cartPage, checkoutPage }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await loginPage.login('admin@practicesoftwaretesting.com', 'welcome01');
    await page.waitForTimeout(5_000)
    await homePage.goToHome();
    await productListingPage.searchForProduct('hammer');
    const itemNameInItemsPage = await productListingPage.productResultName('Claw Hammer with Shock Reduction Grip').textContent()
    console.log("itemNameInItemsPage = ", itemNameInItemsPage);
    await expect(itemNameInItemsPage).toContain("Hammer")

    await productListingPage.selectProduct('Claw Hammer with Shock Reduction Grip');
    const itemName = await productDetailsPage.getProductName();
    console.log("itemName", itemName);
    await expect(itemName).toEqual(itemNameInItemsPage)

    await productDetailsPage.addProductToCart();
    const alertText = await productDetailsPage.getAddToCartAlertText();
    console.log("alertText", alertText);
    await expect(alertText).toContain(" Product added to shopping cart. ")
    await page.waitForTimeout(5_000)
    // await page.close()

    await homePage.goToCart();
    const itemNameInCart = await cartPage.getCartItemText();
    console.log("itemNameInCart", itemNameInCart );
    // await expect(itemNameInCart).toContain("Claw Hammer with Shock Reduction Grip")
    await cartPage.proceedToCheckout();
    await page.waitForTimeout(5_000)
    //sign in confirmation page
    // expect(await page.locator("(//p[contains(text(),'logged in')]").textContent()).toContain("logged in")
    await checkoutPage.proceedToBilling();
    //billing page
    await checkoutPage.fillAddressForm({
        country: "Angola",
        postalCode: faker.location.zipCode(),
        houseNumber: faker.location.buildingNumber(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
    });
    await page.waitForTimeout(2_000)
    await checkoutPage.proceedToPayment();
    await page.waitForTimeout(5_000)

    //payment page
    await checkoutPage.completeGiftCardPayment(faker.string.numeric(16), faker.string.numeric(4));
    const payment_success_message = await checkoutPage.getPaymentSuccessMessage();
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