// ==========================================================
// CLIENT APP - LOGIN, PRODUCTOS, CARRITO Y CHECKOUT
// ==========================================================
//
// Aplicación:
//
// https://rahulshettyacademy.com/client
//
// Flujo actual:
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
// 10. Escribir "ind" en el selector de país
// 11. Buscar India dinámicamente
// 12. Seleccionar India
// 13. Validar que India ha quedado seleccionada
//
// ==========================================================


const { test, expect } = require('@playwright/test');


test('Client App login', async ({ page }) => {


    // ======================================================
    // DATOS DEL TEST
    // ======================================================

    // Email utilizado para iniciar sesión
    const email = 'anshika@gmail.com';


    // Producto que queremos comprar
    const productName = 'ZARA COAT 3';


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
        'Iamking@000'
    );


    // Pulsamos Login
    await page.locator("[value='Login']").click();



    // ======================================================
    // ESPERAR A QUE CARGUEN LOS PRODUCTOS
    // ======================================================

    // Esperamos específicamente a que aparezca
    // el primer título de producto.
    await page
        .locator('.card-body b')
        .first()
        .waitFor();


    // Obtenemos el texto de TODOS los productos.
    //
    // allTextContents() devuelve un array.
    const titles = await page
        .locator('.card-body b')
        .allTextContents();


    // Mostramos los productos en la terminal
    console.log(titles);



    // ======================================================
    // BUSCAR EL PRODUCTO
    // ======================================================

    // Contamos cuántas tarjetas de producto hay.
    const count = await products.count();


    // Recorremos todos los productos uno por uno.
    for (let i = 0; i < count; i++) {


        // Obtenemos el nombre del producto actual.
        const productTitle = await products
            .nth(i)
            .locator('b')
            .textContent();


        // Comparamos el producto actual
        // con el que queremos comprar.
        if (productTitle.trim() === productName) {


            // Pulsamos Add To Cart únicamente
            // dentro de la tarjeta del producto encontrado.
            await products
                .nth(i)
                .getByRole(
                    'button',
                    { name: 'Add To Cart' }
                )
                .click();


            // Ya encontramos el producto.
            // Salimos del bucle.
            break;
        }
    }



    // ======================================================
    // ENTRAR AL CARRITO
    // ======================================================

    // Pulsamos el botón Cart.
    await page
        .locator("[routerlink*='cart']")
        .click();



    // ======================================================
    // VALIDAR QUE EL PRODUCTO ESTÁ EN EL CARRITO
    // ======================================================

    // Comprueba que el producto que hemos añadido
    // aparece realmente dentro del carrito.
    await expect(
        page.getByText(
            productName,
            { exact: true }
        )
    ).toBeVisible();



    // ======================================================
    // CHECKOUT
    // ======================================================

    // Pulsamos Checkout.
    await page
        .locator('text=Checkout')
        .click();



    // ======================================================
    // PAÍS - AUTOSUGGEST DROPDOWN
    // ======================================================

    // Localizamos el campo Country.
    const countryInput = page.locator(
        "[placeholder*='Country']"
    );


    // Escribimos "ind" carácter por carácter.
    //
    // pressSequentially() simula la escritura
    // como si fueran pulsaciones reales de teclado.
    //
    // El delay de 150 ms viene de la nota
    // proporcionada por el curso.
    await countryInput.pressSequentially(
        'ind',
        { delay: 150 }
    );



    // ======================================================
    // ESPERAR AL DESPLEGABLE DE PAÍSES
    // ======================================================

    // .ta-results contiene las sugerencias
    // que aparecen después de escribir "ind".
    const dropdown = page.locator(
        '.ta-results'
    );


    // Esperamos a que aparezca el desplegable.
    await dropdown.waitFor();



    // ======================================================
    // BUSCAR INDIA DINÁMICAMENTE
    // ======================================================

    // Contamos todas las opciones del desplegable.
    const optionsCount = await dropdown
        .locator('button')
        .count();


    // Recorremos las opciones una por una.
    for (let i = 0; i < optionsCount; i++) {


        // Obtenemos el texto de la opción actual.
        const text = await dropdown
            .locator('button')
            .nth(i)
            .textContent();


        // Buscamos exactamente India.
        if (text.trim() === 'India') {


            // Pulsamos sobre India.
            await dropdown
                .locator('button')
                .nth(i)
                .click();


            // Ya hemos encontrado la opción.
            break;
        }
    }



    // ======================================================
    // VALIDAR EL PAÍS
    // ======================================================

    // Comprobamos que el campo Country
    // contiene finalmente el valor India.
    await expect(
        countryInput
    ).toHaveValue('India');

});