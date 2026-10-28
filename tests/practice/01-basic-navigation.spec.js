const { test, expect } = require('@playwright/test');

test('Practice 01 - Open page and validate title', async ({ page }) => {

    // Abrimos la página
    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );

    // Comprobamos que el título contiene "LoginPage"
    await expect(page).toHaveTitle(/LoginPage/);

});