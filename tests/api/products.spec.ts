import { test, expect } from "@playwright/test";
import { RequestHandler } from "../../utils/requestHandler";
import { validateSchema } from "../../utils/schemaValidator";

let baseUrl = "https://api.practicesoftwaretesting.com/"

test("Get Products", async ({ request }) => {
    const req = new RequestHandler(request, baseUrl)
    const response = await req.path("products").params({
        "page": 1,
        "between": "price, 1, 100",
        "is_rental": false
    }).getRequest()

    const jsonResponse = await response.json()
    console.log("Values present at index 0", jsonResponse.data[0]);
    // expect(jsonResponse.data[0].id).toEqual("01M04SBZ5PGPHHY172TVXEAPGT")
    expect(jsonResponse.data[0].price).toEqual(14.15)
    expect(jsonResponse.data[0].id).toEqual(expect.any(String))
    expect(jsonResponse.data[0].product_image.by_url).toEqual("https://unsplash.com/@fantin")

    // Validate JSON Schema Response
    const jsonSchemaResponseInString = await JSON.stringify(jsonResponse)
    console.log("jsonSchemaResponseInString", jsonSchemaResponseInString);
    await validateSchema(jsonResponse, "GET_product-info_schema.json")
     
})

// CRITICAL TEST: Verify response status is 200
test("Assert response status equals 200", async ({ request }) => {
    const req = new RequestHandler(request, baseUrl)
    const response = await req.path("products").params({
        "page": 1,
        "between": "price, 1, 100",
        "is_rental": false
    }).getRequest()

    expect(response.status()).toBe(200)
})

// CRITICAL TEST: Verify all products price is between 1 and 100
test("Verify all products price between 1 and 100", async ({ request }) => {
    const req = new RequestHandler(request, baseUrl)
    const response = await req.path("products").params({
        "page": 1,
        "between": "price, 1, 100",
        "is_rental": false
    }).getRequest()

    const jsonResponse = await response.json()

    for (const product of jsonResponse.data) {
        expect(product.price).toBeGreaterThanOrEqual(1)
        expect(product.price).toBeLessThanOrEqual(100)
    }
})

// CRITICAL TEST: Verify all products is_rental is false
test("Verify all products is_rental equals false", async ({ request }) => {
    const req = new RequestHandler(request, baseUrl)
    const response = await req.path("products").params({
        "page": 1,
        "between": "price, 1, 100",
        "is_rental": false
    }).getRequest()

    const jsonResponse = await response.json()

    for (const product of jsonResponse.data) {
        expect(product.is_rental).toBe(false)
    }
})

// CRITICAL TEST: Verify all product IDs are unique on the page
test("Verify all product IDs are unique", async ({ request }) => {
    const req = new RequestHandler(request, baseUrl)
    const response = await req.path("products").params({
        "page": 1,
        "between": "price, 1, 100",
        "is_rental": false
    }).getRequest()

    const jsonResponse = await response.json()
    const ids = jsonResponse.data.map((product: any) => product.id)
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(ids.length)
})