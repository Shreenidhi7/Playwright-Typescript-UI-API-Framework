import { test, expect } from '@playwright/test';
import fs from "fs-extra";

test('My Account User Login', async ({ page }) => {
    const config = JSON.parse(fs.readFileSync("./credentials/auth-token.json", "utf-8"))
    const access_token = `${config.token}`
    console.log("access_token", access_token);

    await page.goto('https://practicesoftwaretesting.com/');
    // await page.locator('[data-test="nav-sign-in"]').click();
    // await page.locator('[data-test="email"]').fill('Caroline91@gmail.com');
    // await page.locator('[data-test="password"]').click();
    // await page.locator('[data-test="password"]').fill('Test@9099');
    // await page.locator('[data-test="login-submit"]').click();
    // Inject token into LocalStorage via evaluate
    await page.evaluate((token) => {
        window.localStorage.setItem("auth-token", token)
    }, access_token)
    await page.goto("https://practicesoftwaretesting.com/account")
    expect(await page.locator('[data-test="page-title"]').textContent()).toEqual("My account")
    await page.waitForTimeout(5_000)
});