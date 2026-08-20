import { Locator, Page } from "@playwright/test";

export class ContactPage {
    private readonly pageHeading: Locator;
    private readonly subjectSelect: Locator;
    private readonly messageInput: Locator;
    private readonly sendButton: Locator;
    private readonly confirmationMessage: Locator;

    constructor(private readonly page: Page) {
        this.pageHeading = page.locator('h3');
        this.subjectSelect = page.locator('[data-test="subject"]');
        this.messageInput = page.locator('[data-test="message"]');
        this.sendButton = page.locator('[data-test="contact-submit"]');
        this.confirmationMessage = page.getByText("Thanks for your message! We will contact you shortly.");
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForFormFields(): Promise<void> {
        await this.subjectSelect.waitFor({ state: "visible" });
        await this.messageInput.waitFor({ state: "visible" });
        await this.sendButton.waitFor({ state: "visible" });
    }

    async selectSubject(subject: string): Promise<void> {
        await this.subjectSelect.selectOption({ label: subject });
    }

    async fillMessage(message: string): Promise<void> {
        await this.messageInput.fill(message);
    }

    async sendMessage(): Promise<void> {
        await this.sendButton.click();
    }

    getConfirmationMessage(): Locator {
        return this.confirmationMessage;
    }

    getPageHeading(): Locator {
        return this.pageHeading;
    }
}