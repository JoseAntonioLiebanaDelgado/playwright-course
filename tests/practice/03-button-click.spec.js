const { test, expect } = require('@playwright/test');

test('Practice 03 - Click login button and validate error', async ({ page }) => {

    // Abrimos la página
    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );

    // Localizamos el campo username
    const userName = page.locator('#username');

    // Localizamos el campo password
    const password = page.locator('[type="password"]');

    // Localizamos el botón de login
    const signInButton = page.locator('#signInBtn');

    // Escribimos credenciales incorrectas
    await userName.fill('Jose');
    await password.fill('123456');

    // Pulsamos el botón
    await signInButton.click();

    // Comprobamos que aparece el mensaje de error
    await expect(
        page.locator("[style*='block']")
    ).toContainText('Incorrect');

});