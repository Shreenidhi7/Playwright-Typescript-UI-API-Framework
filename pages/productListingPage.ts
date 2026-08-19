import { Locator, Page } from "@playwright/test";

export class ProductListingPage {
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;

    constructor(private readonly page: Page) {
        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');
    }

    async searchForProduct(searchTerm: string): Promise<void> {
        await this.searchInput.click();
        await this.searchInput.fill(searchTerm);
        await this.searchButton.click();
    }

    productResult(productName: string): Locator {
        return this.page.locator(`//h5[contains(text(),'${productName}')]/parent::div/parent::a`);
    }

    productResultName(productName: string): Locator {
        return this.page.locator(`//h5[contains(text(),'${productName}')]`);
    }

    async selectProduct(productName: string): Promise<void> {
        await this.productResult(productName).click();
    }
}
