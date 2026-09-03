// #username             -> ID
// .form-control         -> clase
// input[type='submit']  -> atributo

// newContext()      -> nueva sesión aislada
// newPage()         -> nueva pestaña/página
// goto()            -> navegar a una URL
// locator()         -> localizar elemento
// fill()            -> escribir/reemplazar texto
// click()           -> hacer clic
// textContent()     -> obtener texto de un elemento
// allTextContents() -> obtener el texto de todos los elementos
// waitFor()         -> esperar a que aparezca un elemento
// expect()          -> validar


const { test, expect } = require('@playwright/test');

// test.only(...) -> ejecuta solo ese test.
// test.skip(...) -> omite ese test.


// TEST 1 - Creamos manualmente Context y Page
test.skip('Browser Context Playwright test raw', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});


// TEST 2 - Playwright nos proporciona directamente Page
test.skip('Page Playwright test', async ({ page }) => {

    await page.goto('https://google.com/');
});


// TEST 3 - Comprobamos el título de Google
test.skip('Google test', async ({ page }) => {

    await page.goto('https://google.com/');

    // Muestra el título en consola
    console.log(await page.title());

    // Comprueba que el título sea "Google"
    await expect(page).toHaveTitle('Google');
});


// TEST 4 - Login y selectores
test('Browser Context Playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    // Guardamos los locators para reutilizarlos
    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    console.log(await page.title());


    // Login incorrecto
    await userName.fill('rahulshetty');
    await password.fill('Learning@830$3mK2');
    await signIn.click();


    // Muestra el mensaje de error
    console.log(
        await page.locator("[style*='block']").textContent()
    );

    // Comprueba que el mensaje contiene "Incorrect"
    await expect(
        page.locator("[style*='block']")
    ).toContainText('Incorrect');


    // Cambiamos al usuario correcto
    await userName.fill('');
    await userName.fill('rahulshettyacademy');

    // La contraseña ya es correcta, por lo que no hace falta cambiarla
    await signIn.click();


    // Esperamos a que aparezca el primer producto
    // antes de intentar obtener todos los títulos
    await cardTitles.first().waitFor();


    // Obtiene el texto de TODOS los productos
    const allCardTitles = await cardTitles.allTextContents();

    // Muestra todos los títulos en consola
    console.log(allCardTitles);


    // first() -> primer elemento
    // console.log(await cardTitles.first().textContent());

    // nth(n) -> elemento según su posición
    // nth(0) = primero, nth(1) = segundo...
    // console.log(await cardTitles.nth(1).textContent());

});