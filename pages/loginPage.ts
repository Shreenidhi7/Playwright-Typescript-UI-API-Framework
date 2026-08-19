import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;

    constructor(private readonly page: Page) {
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.signInButton = page.locator('[data-test="login-submit"]');
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}
