import { test as base, expect } from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { ProductListingPage } from "../pages/productListingPage";

export const test = base.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
    productListingPage: ProductListingPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productListingPage: async ({ page }, use) => {
        await use(new ProductListingPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { expect };
