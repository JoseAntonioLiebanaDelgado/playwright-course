const { test, expect } = require('@playwright/test');

test('Practice 02 - Locate and fill username', async ({ page }) => {

    // Abrimos la página
    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );

    // Localizamos el campo username
    const userName = page.locator('#username');

    // Escribimos un valor
    await userName.fill('Jose');

    // Comprobamos que el valor se ha escrito correctamente
    await expect(userName).toHaveValue('Jose');

});