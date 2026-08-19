import { Locator, Page } from "@playwright/test";

export class HomePage {
    private readonly homeNavigation: Locator;
    private readonly cartNavigation: Locator;

    constructor(private readonly page: Page) {
        this.homeNavigation = page.locator('[data-test="nav-home"]');
        this.cartNavigation = page.locator('[data-test="nav-cart"]');
    }

    async goToHome(): Promise<void> {
        await this.homeNavigation.click();
    }

    async goToCart(): Promise<void> {
        await this.cartNavigation.click();
    }
}
