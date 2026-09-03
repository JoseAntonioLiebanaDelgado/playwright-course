// ==========================================================
// CHULETA RÁPIDA
// ==========================================================

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

// first()           -> primer elemento
// last()            -> último elemento
// nth(n)            -> elemento según su posición
// selectOption()    -> seleccionar opción de un desplegable
// isChecked()       -> devuelve true/false si está seleccionado
// toBeChecked()     -> valida que esté seleccionado
// uncheck()         -> desmarca un checkbox
// toBeFalsy()       -> valida que el valor sea false
// pause()           -> pausa el test y abre Playwright Inspector


const { test, expect } = require('@playwright/test');

// test.only(...) -> ejecuta solo ese test.
// test.skip(...) -> omite ese test.



// ==========================================================
// TEST 1 - Creamos manualmente Context y Page
// ==========================================================

test.skip('Browser Context Playwright test raw', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );
});



// ==========================================================
// TEST 2 - Playwright nos proporciona directamente Page
// ==========================================================

test.skip('Page Playwright test', async ({ page }) => {

    await page.goto('https://google.com/');
});



// ==========================================================
// TEST 3 - Comprobamos el título de Google
// ==========================================================

test.skip('Google test', async ({ page }) => {

    await page.goto('https://google.com/');

    // Muestra el título en consola
    console.log(await page.title());

    // Comprueba que el título sea "Google"
    await expect(page).toHaveTitle('Google');
});



// ==========================================================
// TEST 4 - Login y selectores
// ==========================================================

test.skip('Browser Context Playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    // Guardamos locators para reutilizarlos
    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );

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

    // La contraseña ya es correcta
    await signIn.click();


    // Esperamos a que aparezca el primer producto
    await cardTitles.first().waitFor();


    // Obtiene el texto de TODOS los productos
    const allCardTitles = await cardTitles.allTextContents();

    console.log(allCardTitles);


    // Ejemplos:
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
});



// ==========================================================
// TEST 5 - UI Controls
// ==========================================================

test('UI Controls', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );

    // Guardamos locators
    const dropdown = page.locator('select.form-control');
    const userRadio = page.locator('.radiotextsty').last();
    const terms = page.locator('#terms');


    // Selecciona "Consultant" en el desplegable
    await dropdown.selectOption('consult');


    // Selecciona el último radio button (User)
    await userRadio.click();


    // Confirma el popup
    await page.locator('#okayBtn').click();


    // Muestra true/false según si está seleccionado
    console.log(await userRadio.isChecked());


    // Comprueba que el radio button está seleccionado
    await expect(userRadio).toBeChecked();


    // Marca términos y condiciones
    await terms.click();


    // Comprueba que está marcado
    await expect(terms).toBeChecked();


    // Desmarca términos y condiciones
    await terms.uncheck();


    // Comprueba que ya NO está marcado
    await expect(terms).not.toBeChecked();


    // Pausa manual para inspeccionar el test
    // await page.pause();
});