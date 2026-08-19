import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs-extra";
import { validateSchema } from "../../utils/schemaValidator";


let email: string;
const password: string = "Test@9099"

test.beforeEach(async ({ request }) => {
    email = faker.internet.email()
    const user_registration_response = await request.post("https://api.practicesoftwaretesting.com/users/register", {
        data: {
            "first_name": faker.person.firstName(),
            "last_name": faker.person.lastName(),
            "dob": "1990-01-01",
            "phone": "1234567890",
            "email": email,
            "password": password,
            "address": {
                "street": faker.location.streetAddress(),
                "city": faker.location.city(),
                "state": faker.location.state(),
                "country": "US",
                "postal_code": "12345"
            }
        }
    })

    console.log("user_registration_response", await user_registration_response.json());
})

test("User Login Test", async ({ request }) => {
    const user_login_response = await request.post("https://api.practicesoftwaretesting.com/users/login", {
        data: {
            "email": email,
            "password": password
        },
    })

    const user_login_JsonResponse = await user_login_response.json()
    console.log("user-login-response", await user_login_response.json());
    const user_access_token = user_login_JsonResponse.access_token
    console.log("user_access_token", user_access_token);
    // const tokenValue = {
    //     "auth-token": `${user_access_token}`
    // }
    writeFileSync("./credentials/auth-token.json", JSON.stringify({
        "token" : user_access_token
    }, null, 4))
    // console.log("Token", tokenValue["auth-token"]);


})

test("Validate User Login Response Schema", async ({ request }) => {
    const user_login_response = await request.post("https://api.practicesoftwaretesting.com/users/login", {
        data: {
            "email": email,
            "password": password
        },
    })

    expect(user_login_response.status()).toBe(200)
    const user_login_JsonResponse = await user_login_response.json()

    await validateSchema(user_login_JsonResponse, "POST_login_schema.json")
})