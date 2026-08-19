import { Locator, Page } from "@playwright/test";

export interface AddressForm {
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
}

export class CheckoutPage {
    private readonly proceedToBillingButton: Locator;
    private readonly countrySelect: Locator;
    private readonly postalCodeInput: Locator;
    private readonly houseNumberInput: Locator;
    private readonly streetInput: Locator;
    private readonly cityInput: Locator;
    private readonly stateInput: Locator;
    private readonly proceedToPaymentButton: Locator;
    private readonly paymentMethodSelect: Locator;
    private readonly giftCardNumberInput: Locator;
    private readonly validationCodeInput: Locator;
    private readonly confirmButton: Locator;
    private readonly paymentSuccessMessage: Locator;

    constructor(private readonly page: Page) {
        this.proceedToBillingButton = page.locator("[data-test='proceed-2']");
        this.countrySelect = page.locator("//select[@id='country']");
        this.postalCodeInput = page.locator("//input[@id='postal_code']");
        this.houseNumberInput = page.locator("//input[@data-test='house_number']");
        this.streetInput = page.locator("//input[@id='street']");
        this.cityInput = page.getByPlaceholder("Your City *");
        this.stateInput = page.getByRole("textbox", { name: "State" });
        this.proceedToPaymentButton = page.locator("[data-test='proceed-3']");
        this.paymentMethodSelect = page.locator("//select[@id='payment-method']");
        this.giftCardNumberInput = page.getByPlaceholder("Gift Card Number");
        this.validationCodeInput = page.locator("//input[@data-test='validation_code']");
        this.confirmButton = page.getByRole("button", { name: "Confirm" });
        this.paymentSuccessMessage = page.locator("//div[@data-test='payment-success-message']");
    }

    async proceedToBilling(): Promise<void> {
        await this.proceedToBillingButton.click();
    }

    async fillAddressForm(address: AddressForm): Promise<void> {
        await this.countrySelect.selectOption(address.country);
        await this.postalCodeInput.fill(address.postalCode);
        await this.houseNumberInput.fill(address.houseNumber);
        await this.streetInput.fill(address.street);
        await this.cityInput.fill(address.city);
        await this.stateInput.fill(address.state);
    }

    async proceedToPayment(): Promise<void> {
        await this.proceedToPaymentButton.click();
    }

    async completeGiftCardPayment(cardNumber: string, validationCode: string): Promise<void> {
        await this.paymentMethodSelect.selectOption({ label: "Gift Card" });
        await this.giftCardNumberInput.fill(cardNumber);
        await this.validationCodeInput.fill(validationCode);
        await this.confirmButton.click();
    }

    async getPaymentSuccessMessage(): Promise<string | null> {
        return this.paymentSuccessMessage.textContent();
    }
}
