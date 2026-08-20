import { expect, test } from "@playwright/test";
import { generateWebmasterMessagePayload } from "../../utils/dataGenerator";
import { RequestHandler } from "../../utils/requestHandler";
import { validateSchema } from "../../utils/schemaValidator";

const apiBaseUrl = "https://api.practicesoftwaretesting.com/";
const email = "customer2@practicesoftwaretesting.com";
const password = "welcome01";

test("High: authenticated user can send a webmaster message through the API", async ({ request }) => {
    const requestHandler = new RequestHandler(request, apiBaseUrl);
    const loginResponse = await requestHandler
        .path("users/login")
        .body({ email, password })
        .postRequest();
    expect(loginResponse.status()).toBe(200);

    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.access_token;
    const messagePayload = generateWebmasterMessagePayload();

    const messageResponse = await requestHandler
        .path("messages")
        .headers({ Authorization: `Bearer ${accessToken}` })
        .body(messagePayload)
        .postRequest();
    expect(messageResponse.status()).toBe(200);

    const messageResponseBody = await messageResponse.json();
    await validateSchema(messageResponseBody, "POST_message_schema.json");
    expect(messageResponseBody.subject).toBe(messagePayload.subject);
    expect(messageResponseBody.message).toBe(messagePayload.message);
    expect(messageResponseBody.status).toBe("NEW");
});