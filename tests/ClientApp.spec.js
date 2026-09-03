const { test, expect } = require('@playwright/test');


test('Client App login', async ({ page }) => {

    // Abrimos la página de login
    await page.goto("https://rahulshettyacademy.com/client");


    // Introducimos el email
    await page.locator("#userEmail").fill("anshika@gmail.com");


    // Introducimos la contraseña
    await page.locator("#userPassword").type("Iamking@000");


    // Pulsamos el botón Login
    await page.locator("[value='Login']").click();


    // Opción 1:
    // Espera a que la actividad de red de la página se estabilice.
    // await page.waitForLoadState('networkidle');


    // Opción 2:
    // Espera específicamente a que aparezca el primer título de producto.
    // Esto evita pedir los títulos antes de que los productos hayan cargado.
    await page.locator(".card-body b").first().waitFor();


    // Obtiene el texto de TODOS los títulos de los productos
    const titles = await page.locator(".card-body b").allTextContents();


    // Muestra todos los títulos en la terminal
    console.log(titles);

});