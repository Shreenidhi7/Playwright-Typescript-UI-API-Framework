import fs from "fs";
import { Faker } from "@faker-js/faker";

export function generateUserRegistrationPayload() {
    const userRegistrationPayload = JSON.stringify(fs.readFileSync("./request-objects/POST-registration.json"))
    const userRegistrationBody = structuredClone(userRegistrationPayload)
    console.log("userRegistrationBody", userRegistrationBody);

}