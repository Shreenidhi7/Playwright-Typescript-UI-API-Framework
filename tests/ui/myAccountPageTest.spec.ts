import { test, expect } from '../../fixtures/pages.fixture';
import { generateUserRegistrationPayload } from '../../utils/dataGenerator';

let accessToken: string;

test.beforeEach(async ({ request }) => {
    const registrationPayload = generateUserRegistrationPayload();

    const registrationResponse = await request.post("https://api.practicesoftwaretesting.com/users/register", {
        data: registrationPayload,
    });
    expect(registrationResponse.status()).toBe(201);

    const loginResponse = await request.post("https://api.practicesoftwaretesting.com/users/login", {
        data: {
            email: registrationPayload.email,
            password: registrationPayload.password,
        },
    });
    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseBody = await loginResponse.json();
    accessToken = loginResponseBody.access_token;
});

test('My Account User Login', async ({ myAccountPage }) => {
    await myAccountPage.navigateTo('https://practicesoftwaretesting.com/');
    await myAccountPage.setAuthToken(accessToken)
    await myAccountPage.navigateTo("https://practicesoftwaretesting.com/account")
    expect(await myAccountPage.getPageTitle()).toEqual("My account")
});