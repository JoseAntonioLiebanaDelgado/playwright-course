// ==========================================================
// CLIENT APP - LOGIN, PRODUCTOS Y CARRITO
// ==========================================================
//
// Este archivo trabaja con la aplicación:
//
// https://rahulshettyacademy.com/client
//
// Objetivo actual:
// 1. Abrir la aplicación
// 2. Hacer login
// 3. Esperar a que carguen los productos
// 4. Buscar un producto dinámicamente
// 5. Añadirlo al carrito
// 6. Entrar al carrito
// 7. Comprobar que el producto está en el carrito
//
// ==========================================================


const { test, expect } = require('@playwright/test');


test('Client App login', async ({ page }) => {

    // Producto que queremos comprar
    const productName = 'ZARA COAT 3';


    // Cada .card-body representa un producto completo
    const products = page.locator('.card-body');


    // Abrimos la página de login
    await page.goto(
        'https://rahulshettyacademy.com/client'
    );


    // Introducimos el email
    await page.locator('#userEmail').fill(
        'anshika@gmail.com'
    );


    // Introducimos la contraseña
    await page.locator('#userPassword').type(
        'Iamking@000'
    );


    // Pulsamos Login
    await page.locator("[value='Login']").click();


    // Esperamos a que aparezca el primer producto
    await page.locator('.card-body b').first().waitFor();


    // Obtiene el texto de TODOS los títulos
    const titles = await page
        .locator('.card-body b')
        .allTextContents();


    console.log(titles);


    // ======================================================
    // BUSCAR EL PRODUCTO
    // ======================================================

    // Cuenta cuántos productos hay en pantalla
    const count = await products.count();


    // Recorremos todos los productos uno por uno
    for (let i = 0; i < count; i++) {

        // Obtiene el nombre del producto actual
        const productTitle = await products
            .nth(i)
            .locator('b')
            .textContent();


        // Si encontramos el producto que queremos...
        if (productTitle.trim() === productName) {

            // Pulsamos su botón Add To Cart
            await products
                .nth(i)
                .getByRole('button', { name: 'Add To Cart' })
                .click();


            // Ya hemos encontrado el producto,
            // no necesitamos seguir recorriendo la lista
            break;
        }
    }


    // ======================================================
    // ENTRAR AL CARRITO
    // ======================================================

    await page.locator("[routerlink*='cart']").click();


    // ======================================================
    // VALIDAR EL PRODUCTO
    // ======================================================

    // Comprueba que ZARA COAT 3 aparece en el carrito
    await expect(
        page.getByText(productName, { exact: true })
    ).toBeVisible();

});