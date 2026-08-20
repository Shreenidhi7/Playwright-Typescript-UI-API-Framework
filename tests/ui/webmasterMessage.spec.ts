import { expect, test } from '../../fixtures/pages.fixture';
import { faker } from "@faker-js/faker";

const email = "customer2@practicesoftwaretesting.com";
const password = "welcome01";

test("High: authenticated user can send a webmaster message", async ({ page, loginPage, contactPage }) => {
    const message = faker.lorem.sentence();

    await page.goto("https://practicesoftwaretesting.com/auth/login");
    await loginPage.login(email, password);
    await contactPage.navigateTo("https://practicesoftwaretesting.com/contact");
    await contactPage.waitForFormFields();
    await contactPage.selectSubject("Webmaster");
    await contactPage.fillMessage(message);
    await contactPage.sendMessage();

    await expect(contactPage.getConfirmationMessage()).toHaveText("Thanks for your message! We will contact you shortly.");
});