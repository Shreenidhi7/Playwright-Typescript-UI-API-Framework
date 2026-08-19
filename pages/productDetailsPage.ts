import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    private readonly productName: Locator;
    private readonly addToCartButton: Locator;
    private readonly addToCartAlert: Locator;

    constructor(private readonly page: Page) {
        this.productName = page.locator('[data-test="product-name"]');
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.addToCartAlert = page.getByRole('alert', { name: 'Product added to shopping' });
    }

    async getProductName(): Promise<string | null> {
        return this.productName.textContent();
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async getAddToCartAlertText(): Promise<string | null> {
        return this.addToCartAlert.textContent();
    }
}
