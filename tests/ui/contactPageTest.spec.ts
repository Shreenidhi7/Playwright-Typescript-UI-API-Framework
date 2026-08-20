import { expect, test } from '../../fixtures/pages.fixture';

const email = "customer2@practicesoftwaretesting.com";
const password = "welcome01";

test("Critical: user can sign in with valid credentials", async ({ page, loginPage }) => {
    await page.goto("https://practicesoftwaretesting.com/auth/login");
    await loginPage.login(email, password);

    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");
    await expect(page.getByRole("heading", { name: "My account" })).toBeVisible();
});

test("High: authenticated user can access and submit the contact form", async ({ page, loginPage, contactPage }) => {
    await page.goto("https://practicesoftwaretesting.com/auth/login");
    await loginPage.login(email, password);

    await contactPage.navigateTo("https://practicesoftwaretesting.com/contact");
    await expect(contactPage.getPageHeading()).toHaveText("Contact");
    await contactPage.waitForFormFields();

    await contactPage.selectSubject("Customer service");
    await page.waitForTimeout(5_000)
    await contactPage.fillMessage("Exploratory contact form verification");
    await contactPage.sendMessage();
    await page.waitForTimeout(5_000)

    await expect(page).toHaveURL("https://practicesoftwaretesting.com/contact");
});