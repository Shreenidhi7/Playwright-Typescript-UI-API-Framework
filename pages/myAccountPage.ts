import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
    private readonly pageTitle: Locator;

    constructor(private readonly page: Page) {
        this.pageTitle = page.locator('[data-test="page-title"]');
    }

    async setAuthToken(token: string): Promise<void> {
        await this.page.evaluate((authToken) => {
            window.localStorage.setItem("auth-token", authToken);
        }, token);
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getPageTitle(): Promise<string | null> {
        return this.pageTitle.textContent();
    }
}