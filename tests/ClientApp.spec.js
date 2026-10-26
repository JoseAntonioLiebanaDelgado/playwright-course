// ==========================================================
// CLIENT APP - END TO END TEST
// ==========================================================
//
// Aplicación:
//
// https://rahulshettyacademy.com/client
//
// Flujo completo:
//
// 1. Abrir la aplicación
// 2. Hacer login
// 3. Esperar a que carguen los productos
// 4. Obtener los títulos
// 5. Buscar ZARA COAT 3 dinámicamente
// 6. Añadirlo al carrito
// 7. Entrar al carrito
// 8. Validar que el producto está en el carrito
// 9. Ir al Checkout
// 10. Escribir "ind" en Country
// 11. Buscar India entre las sugerencias
// 12. Seleccionar India
// 13. Validar el país
// 14. Validar el email del Checkout
// 15. Realizar el pedido
// 16. Validar el mensaje de confirmación
// 17. Obtener el Order ID
// 18. Ir a Orders
// 19. Buscar nuestro pedido dinámicamente
// 20. Entrar en View
// 21. Validar que el Order ID coincide
//
// ==========================================================


const { test, expect } = require('@playwright/test');


test('Client App E2E order flow', async ({ page }) => {


    // ======================================================
    // DATOS DEL TEST
    // ======================================================

    const email = 'anshika@gmail.com';

    const password = 'Iamking@000';

    const productName = 'ZARA COAT 3';



    // ======================================================
    // LOCATORS PRINCIPALES
    // ======================================================

    // Cada .card-body representa una tarjeta de producto
    const products = page.locator('.card-body');



    // ======================================================
    // LOGIN
    // ======================================================

    // Abrimos la aplicación
    await page.goto(
        'https://rahulshettyacademy.com/client'
    );


    // Introducimos el email
    await page.locator('#userEmail').fill(
        email
    );


    // Introducimos la contraseña
    await page.locator('#userPassword').fill(
        password
    );


    // Pulsamos Login
    await page
        .locator("[value='Login']")
        .click();



    // ======================================================
    // ESPERAR A QUE CARGUEN LOS PRODUCTOS
    // ======================================================

    // Esperamos específicamente al primer producto
    await page
        .locator('.card-body b')
        .first()
        .waitFor();



    // ======================================================
    // OBTENER LOS PRODUCTOS
    // ======================================================

    // Obtiene el texto de todos los productos
    const titles = await page
        .locator('.card-body b')
        .allTextContents();


    // Los mostramos en terminal
    console.log(
        'Productos:',
        titles
    );



    // ======================================================
    // BUSCAR PRODUCTO DINÁMICAMENTE
    // ======================================================

    // Contamos cuántos productos hay
    const count = await products.count();


    // Recorremos todos los productos uno por uno
    for (let i = 0; i < count; i++) {


        // Obtenemos el nombre del producto actual
        const productTitle = await products
            .nth(i)
            .locator('b')
            .textContent();


        // Comparamos con el producto que queremos
        if (
            productTitle.trim() === productName
        ) {


            // Pulsamos Add To Cart
            await products
                .nth(i)
                .getByRole(
                    'button',
                    { name: 'Add To Cart' }
                )
                .click();


            // Ya encontramos el producto
            break;
        }
    }



    // ======================================================
    // ENTRAR AL CARRITO
    // ======================================================

    await page
        .locator("[routerlink*='cart']")
        .click();



    // ======================================================
    // ESPERAR AL CARRITO
    // ======================================================

    await page
        .locator('div li')
        .first()
        .waitFor();



    // ======================================================
    // VALIDAR PRODUCTO EN EL CARRITO
    // ======================================================

    // Comprueba que ZARA COAT 3
    // aparece realmente en el carrito
    await expect(
        page.getByText(
            productName,
            { exact: true }
        )
    ).toBeVisible();



    // ======================================================
    // CHECKOUT
    // ======================================================

    await page
        .locator('text=Checkout')
        .click();



    // ======================================================
    // COUNTRY - AUTOSUGGEST
    // ======================================================

    // Campo Country
    const countryInput = page.locator(
        "[placeholder*='Country']"
    );


    // Escribimos "ind" carácter por carácter
    //
    // El delay de 150 ms viene de la nota del curso
    await countryInput.pressSequentially(
        'ind',
        { delay: 150 }
    );



    // ======================================================
    // DESPLEGABLE DE PAÍSES
    // ======================================================

    // Contenedor de las sugerencias
    const dropdown = page.locator(
        '.ta-results'
    );


    // Esperamos a que aparezca
    await dropdown.waitFor();


    // Contamos las opciones
    const optionsCount = await dropdown
        .locator('button')
        .count();



    // ======================================================
    // BUSCAR INDIA
    // ======================================================

    // Recorremos las opciones una por una
    for (
        let i = 0;
        i < optionsCount;
        i++
    ) {


        // Obtenemos el texto de la opción actual
        const text = await dropdown
            .locator('button')
            .nth(i)
            .textContent();


        // Buscamos India
        if (
            text.trim() === 'India'
        ) {


            // Seleccionamos India
            await dropdown
                .locator('button')
                .nth(i)
                .click();


            // Ya la encontramos
            break;
        }
    }



    // ======================================================
    // VALIDAR PAÍS
    // ======================================================

    await expect(
        countryInput
    ).toHaveValue('India');



    // ======================================================
    // VALIDAR EMAIL DEL CHECKOUT
    // ======================================================

    // Localizamos el email que aparece
    // automáticamente en el Checkout
    const checkoutEmail = page
        .locator(".user__name [type='text']")
        .first();


    // Como es un input, validamos su value
    await expect(
        checkoutEmail
    ).toHaveValue(email);



    // ======================================================
    // REALIZAR PEDIDO
    // ======================================================

    // Pulsamos Place Order
    await page
        .locator('.action__submit')
        .click();



    // ======================================================
    // VALIDAR CONFIRMACIÓN DEL PEDIDO
    // ======================================================

    // Comprobamos el mensaje de confirmación
    await expect(
        page.locator('.hero-primary')
    ).toHaveText(
        ' Thankyou for the order. '
    );



    // ======================================================
    // OBTENER ORDER ID
    // ======================================================

    // Guardamos el ID generado para este pedido
    const orderId = await page
        .locator(
            '.em-spacer-1 .ng-star-inserted'
        )
        .textContent();


    // Mostramos el Order ID en terminal
    console.log(
        'Order ID:',
        orderId
    );



    // ======================================================
    // IR A ORDERS
    // ======================================================

    await page
        .locator(
            "button[routerlink*='myorders']"
        )
        .click();



    // ======================================================
    // ESPERAR TABLA DE PEDIDOS
    // ======================================================

    await page
        .locator('tbody')
        .waitFor();



    // Cada tr representa una fila de la tabla
    const rows = page.locator(
        'tbody tr'
    );



    // ======================================================
    // BUSCAR NUESTRO PEDIDO
    // ======================================================

    // Recorremos todas las filas
    for (
        let i = 0;
        i < await rows.count();
        i++
    ) {


        // Obtenemos el Order ID de la fila actual
        const rowOrderId = await rows
            .nth(i)
            .locator('th')
            .textContent();


        // Comprobamos si corresponde
        // al pedido que acabamos de crear
        if (
            orderId.includes(
                rowOrderId.trim()
            )
        ) {


            // Pulsamos View
            await rows
                .nth(i)
                .locator('button')
                .first()
                .click();


            // Ya encontramos el pedido
            break;
        }
    }



    // ======================================================
    // OBTENER ORDER ID DE DETAILS
    // ======================================================

    // Obtenemos el ID mostrado
    // en la página de detalles
    const orderIdDetails = await page
        .locator('.col-text')
        .textContent();



    // ======================================================
    // VALIDAR ORDER ID
    // ======================================================

    // Comprueba que el pedido abierto
    // es el mismo que acabamos de crear
    expect(
        orderId.includes(
            orderIdDetails.trim()
        )
    ).toBeTruthy();



    // ======================================================
    // RESULTADO FINAL
    // ======================================================

    console.log(
        'Pedido validado correctamente:',
        orderIdDetails
    );


    // ==========================================================
// TEST EXTRA - VALIDAR PANTALLA DE LOGIN
// ==========================================================
//
// Comprobamos que los elementos principales
// de la pantalla de login están disponibles.
//
// ==========================================================

test('Login page elements are visible', async ({ page }) => {

    // Abrimos la aplicación
    await page.goto(
        'https://rahulshettyacademy.com/client'
    );


    // Campo de email
    const emailInput = page.locator('#userEmail');


    // Campo de contraseña
    const passwordInput = page.locator('#userPassword');


    // Botón Login
    const loginButton = page.locator("[value='Login']");


    // Validamos que los tres elementos estén visibles
    await expect(emailInput).toBeVisible();

    await expect(passwordInput).toBeVisible();

    await expect(loginButton).toBeVisible();

});

});