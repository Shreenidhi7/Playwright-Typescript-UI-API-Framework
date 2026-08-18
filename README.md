# Playwright + TypeScript UI & API Framework 🚀

This repository provides a **hybrid automation framework** built with **Playwright** and **TypeScript**, enabling both **UI (browser-based)** and **API (backend)** testing in a single project.  
It’s ideal for teams who want a unified approach to validating web applications across multiple layers.

---

## 📖 Overview
- **Frameworks Used:** Playwright + TypeScript  
- **Testing Scope:** UI (end-to-end browser automation) + API (backend validation)  
- **License:** MIT (open-source, free to use and modify)  
- **Purpose:** Demonstrates how to build a combined UI/API automation framework with Playwright.  

---

## 🚀 Features
- ✅ **UI Testing** – Automate browser interactions across Chromium, Firefox, and WebKit.  
- ✅ **API Testing** – Validate REST/GraphQL endpoints directly within Playwright tests.  
- ✅ **TypeScript Support** – Strong typing, autocompletion, and compile-time error checking.  
- ✅ **Unified Framework** – Run UI and API tests together in one project.  
- ✅ **Scalable Setup** – Extendable for larger projects with multiple test suites.  
- ✅ **Open Source** – Licensed under MIT, so you can freely adapt it to your needs.  

---
## Playwright-Typescript-UI-API-Framework/

- │── tests/                # Test files (UI + API specs)
- │   ├── ui/               # UI test cases
- │   └── api/              # API test cases
- │── pages/                # Page Object Models for UI
- │── utils/                # Utility functions (API clients, helpers)
- │── playwright.config.ts  # Playwright configuration
- │── package.json          # Dependencies & scripts
- │── tsconfig.json         # TypeScript configuration
- │── README.md             # Documentation
- │── LICENSE               # MIT License

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Shreenidhi7/Playwright-Typescript-UI-API-Framework.git
cd Playwright-Typescript-UI-API-Framework
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run UI Tests
```bash
npx playwright test tests/ui
```

### 4. Run API Tests
```bash
npx playwright test tests/api
```

### 5. Generate Reports
```bash
npx playwright show-report
```

---

### 📌 Example Test Cases
#### UI Test
```bash
ts
import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
await page.goto('https://example.com/login');
await page.fill('#username', process.env.USERNAME!);
await page.fill('#password', process.env.PASSWORD!);
await page.click('button[type="submit"]');
await expect(page).toHaveURL('https://example.com/dashboard');
});
```

#### API Test
```bash
ts
import { test, expect } from '@playwright/test';
  
test('Validate user API response', async ({ request }) => {
const response = await request.get('/api/users/1');
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.name).toBe('Admin');
});
```

---
### ✅ Use Cases
- UI Testing: Automate login, navigation, and UI validations.
- API Testing: Validate backend endpoints for correctness and performance.
- CI/CD Integration: Run both UI and API tests in pipelines.
- Cross-Browser + Backend Validation: Ensure consistent behavior across browsers and APIs.

---
### 📜 License
- This project is licensed under the MIT License, meaning you can freely use, modify, and distribute it.

---
### 📜 Repository Description
- Playwright-Typescript-UI-API-Framework is a hybrid automation framework that combines UI testing and API testing using Playwright with TypeScript. It provides a unified, scalable setup for validating both front-end and back-end functionality, making it ideal for modern web application testing.

---
### 🙌 Contributing
- Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
