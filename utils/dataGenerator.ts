import fs from "fs";
import { faker } from "@faker-js/faker";

const email = faker.internet.email()
const password = "helloWorld01@"

export function generateUserRegistrationPayload() {
    const raw = fs.readFileSync("./request-objects/POST-registration.json", "utf-8")
    const userRegistrationPayload = JSON.parse(raw)
    const userRegistrationBody = structuredClone(userRegistrationPayload)
    userRegistrationBody.email = email
    userRegistrationBody.password = password
    return userRegistrationBody
    
}

export function generateUserLoginPayload(){
    const raw = fs.readFileSync("./request-objects/POST-registration.json", "utf-8")
    const userLoginPayload = JSON.parse(raw)
    const userLoginBody = structuredClone(userLoginPayload)
    userLoginBody.email = email
    userLoginBody.password = password
    return userLoginBody

}

export function addToCartPayload(){
    const raw = fs.readFileSync("./request-objects/POST-addToCart.json", "utf-8")
    const itemInCartPayload = JSON.parse(raw)
    const itemInCartBody = structuredClone(itemInCartPayload)
    return itemInCartBody

}