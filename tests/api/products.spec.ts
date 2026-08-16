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
    expect(jsonResponse.data[0].id).toEqual("01M04SBZ5PGPHHY172TVXEAPGT")
    expect(jsonResponse.data[0].price).toEqual(14.15)
    expect(jsonResponse.data[0].id).toEqual(expect.any(String))
    expect(jsonResponse.data[0].product_image.by_url).toEqual("https://unsplash.com/@fantin")

    // Validate JSON Schema Response
    const jsonSchemaResponseInString = await JSON.stringify(jsonResponse)
    console.log("jsonSchemaResponseInString", jsonSchemaResponseInString);
    await validateSchema(jsonResponse, "GET_product-info_schema.json")
     
})