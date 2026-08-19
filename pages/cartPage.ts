import { Locator, Page } from "@playwright/test";

export class CartPage {
    private readonly cartItemNavigation: Locator;
    private readonly proceedButton: Locator;

    constructor(private readonly page: Page) {
        this.cartItemNavigation = page.locator("[data-test='nav-cart']");
        this.proceedButton = page.locator("[data-test='proceed-1']");
    }

    async getCartItemText(): Promise<string | null> {
        return this.cartItemNavigation.textContent();
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedButton.click();
    }
}
