/***
 * 1. Registration to the user -> fresh user
 * 2. Login to the application -> using email id and password -> gives us access token
 * -----
 * 2 types of storage (local storage and session storage)
 * Token Storage in Browser : 
 * Application -> Storage ->> Local Storage ->>> auth-token (if we delete the token, we would be logged out of the application)
 * Application -> Storage ->> Session Storage ->>> card-id & cart-quantity ()
 * 3. Add to cart API -> to add items to an empty cart
 * 4. Cart State -> it contains items
 * 5. Validations and Assertions
 */

import { expect, request, test } from "@playwright/test";
import { RequestHandler } from "../../utils/requestHandler";
import { addToCartPayload, generateUserLoginPayload, generateUserRegistrationPayload } from "../../utils/dataGenerator";
import fs from "fs";

const base_url = "https://api.practicesoftwaretesting.com/"

test("Validate Cart Sync - Hybrid", async ({ request, page }) => {
    // Registration Request
    const req = new RequestHandler(request, base_url)
    const response = await req
        .path("users/register")
        .headers({})
        .body(generateUserRegistrationPayload())
        .postRequest()
    const registrationJsonResponse = await response.json()
    console.log("registrationJsonResponse", registrationJsonResponse);
    expect(response.status()).toEqual(201)
    expect(registrationJsonResponse.first_name).toEqual("John")

    // Login Request
    const loginResponse = await req
        .path("users/login")
        .headers({})
        .body(generateUserLoginPayload())
        .postRequest()
    const loginJsonResponse = await loginResponse.json()
    console.log("loginJsonResponse", loginJsonResponse);
    console.log("access-token", loginJsonResponse.access_token);
    const token = loginJsonResponse.access_token
    fs.writeFileSync("./credentials/auth-token.json", JSON.stringify({
        "token": `${token}`,
    }))
    expect(loginResponse.status()).toEqual(200)


    // Read the Token
    const config = JSON.parse(fs.readFileSync("./credentials/auth-token.json", "utf-8"))
    const access_token = `${config.token}`
    console.log("token value", token);

    //Retrieve Cart Id (Unique Cart Id)
    const cartIdResponse = await req
        .path("carts")
        .headers({
            Authorization: access_token
        })
        .postRequest()
    const cardIdJsonResponse = await cartIdResponse.json()
    console.log("cardIdJsonResponse", cardIdJsonResponse);
    const cartId = cardIdJsonResponse.id
    console.log("unique cart id", cartId);

    //UI Test
    await page.goto("https://practicesoftwaretesting.com/checkout")
    await page.evaluate(([my_token, my_cartId]) => {
        window.localStorage.setItem("auth-token", my_token)
        window.sessionStorage.setItem("cart_id", my_cartId)
        window.sessionStorage.setItem("card_quantity", "1")
    }, [access_token, cartId])
    await page.reload()


    const addToCartApiResponse = await req
        .path("carts/" + cartId)
        .headers({
            Authorization: access_token
        })
        .body(addToCartPayload())
        .postRequest()
    const addToCartApiJsonResponse = await addToCartApiResponse.json()
    console.log("addToCartApiJsonResponse", addToCartApiJsonResponse);

    // ensure UI has the product loaded before assertions
    await page.waitForSelector("//span[@class='product-title']", { timeout: 15000 })

    const itemNameText = await page.locator("//span[@class='product-title']").textContent()
    const itemQuantity = await page.locator("//input[@data-test='product-quantity']").inputValue()
    const cartQuantity = await page.locator("//span[@data-test='cart-quantity']").textContent()
    console.log("Item Name", itemNameText);
    console.log("Item Quantity", itemQuantity);
    console.log("Cart Quatity", cartQuantity);
    
    expect(itemNameText).toContain("Pliers")
    expect(cartQuantity).toEqual("1")
    expect(itemQuantity).toEqual("1")
    await page.close()

})
