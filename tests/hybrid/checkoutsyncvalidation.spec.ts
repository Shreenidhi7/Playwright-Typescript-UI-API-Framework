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

import { request, test } from "@playwright/test";
import { RequestHandler } from "../../utils/requestHandler";
import { generateUserRegistrationPayload } from "../../utils/dataGenerator";

const base_url = "https://api.practicesoftwaretesting.com/"

test("Validate Cart Sync - Hybrid", async({request})=>{
   generateUserRegistrationPayload()
   const req = new RequestHandler(request, base_url)
   const response = await req
   .path("user/register")
   .headers({})
   .body({})
   .postRequest()
})