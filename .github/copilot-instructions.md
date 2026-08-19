# Copilot instructions

This repository is a Playwright + TypeScript hybrid UI/API automation project.

## Project structure
- `tests/ui/`: browser UI specs
- `tests/api/`: API specs
- `tests/hybrid/`: mixed UI + API flows
- `utils/`: shared helpers such as request handling and schema validation
- `request-objects/`: API request JSON payloads
- `response-schemas/`: JSON schema validation files
- `credentials/`: generated auth/token files for runtime flows
- `playwright.config.ts`: Playwright setup

## Conventions
- Use Playwright `test`, `expect`, `page`, and `request` from `@playwright/test`.
- Keep tests in the existing folders and follow the current patterns for async/await and descriptive test names.
- Prefer shared helpers such as `RequestHandler` in `utils/requestHandler.ts` and `validateSchema()` in `utils/schemaValidator.ts` instead of duplicating API logic in tests.
- Reuse request payloads from `request-objects/` and dynamic generation helpers in `utils/dataGenerator.ts` when creating payloads.
- Validate API responses against the JSON schemas in `response-schemas/`.
- For authentication flows, persist and reuse tokens from `credentials/auth-token.json` when needed.
- Keep UI tests deterministic: prefer stable selectors like `data-test` attributes and assert real state changes.
- For hybrid tests, perform API setup first, persist token/cart state, inject it into browser storage, and then verify the UI behavior.
- Keep changes small, readable, and repo-local; do not introduce new frameworks or duplicate utilities.

<!--
##Prompt
Prepare a github copilot instructions file based on my current project.
Which is crisp and minimal and does not consume too much context window.
But provides necessary information and practices followed in project and code structure.
Share your reasoning behind the decisions made by your for copilot instructions file
Also about API spec, UI Spec and Hybrid test creation with request objects and response schemas?
-->