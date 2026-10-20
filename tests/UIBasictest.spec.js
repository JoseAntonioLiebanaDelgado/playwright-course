// ==========================================================
// PLAYWRIGHT UI BASICS
// ==========================================================
//
// Este archivo contiene los ejercicios básicos realizados
// durante las primeras secciones del curso.
//
// Conceptos practicados:
//
// - Browser, Browser Context y Page
// - Locators y selectores CSS
// - Inputs y botones
// - Assertions
// - Listas de elementos
// - Dropdowns
// - Radio buttons
// - Checkboxes
// - Validación de atributos
// - Nuevas pestañas / Child Windows
// - Manejo básico de texto
//
// ==========================================================


// ==========================================================
// CHULETA RÁPIDA
// ==========================================================


// SELECTORES CSS
//
// #username             -> elemento por ID
// .form-control         -> elemento por clase
// input[type='submit']  -> elemento por atributo
// [href*='texto']       -> atributo que CONTIENE ese texto


// PLAYWRIGHT
//
// newContext()      -> crea una nueva sesión aislada
// newPage()         -> crea una nueva página/pestaña
// goto()            -> navega a una URL
// locator()         -> localiza uno o varios elementos
// fill()            -> escribe o reemplaza texto
// click()           -> hace clic
// textContent()     -> obtiene el texto de un elemento
// inputValue()      -> obtiene el valor escrito en un input
// allTextContents() -> obtiene el texto de todos los elementos encontrados
// waitFor()         -> espera a que aparezca un elemento
// expect()          -> realiza una validación


// TRABAJAR CON VARIOS ELEMENTOS
//
// first()           -> primer elemento encontrado
// last()            -> último elemento encontrado
// nth(n)            -> elemento según su posición
//
// nth(0) -> primer elemento
// nth(1) -> segundo elemento
// nth(2) -> tercer elemento


// UI CONTROLS
//
// selectOption()    -> selecciona una opción de un desplegable
// isChecked()       -> devuelve true/false si está seleccionado
// toBeChecked()     -> valida que esté seleccionado
// uncheck()         -> desmarca un checkbox
// toHaveAttribute() -> valida el valor de un atributo HTML


// DEBUG
//
// pause()           -> pausa el test y abre Playwright Inspector


// ASINCRONÍA Y NUEVAS PÁGINAS
//
// Promise.all()     -> coordina varias operaciones asíncronas
// waitForEvent()    -> espera a que ocurra un evento
// split()           -> divide un string en diferentes partes


const { test, expect } = require('@playwright/test');


// test.only(...) -> ejecuta únicamente ese test.
// test.skip(...) -> omite ese test.



// ==========================================================
// TEST 1 - Browser Context y Page manualmente
// ==========================================================

test.skip('Browser Context Playwright test raw', async ({ browser }) => {

    // Creamos un nuevo contexto.
    // Es una sesión aislada del navegador.
    const context = await browser.newContext();


    // Creamos una página dentro de ese contexto.
    const page = await context.newPage();


    // Navegamos a la web.
    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );
});



// ==========================================================
// TEST 2 - Fixture Page
// ==========================================================

test.skip('Page Playwright test', async ({ page }) => {

    // Al solicitar directamente { page },
    // Playwright crea Context y Page automáticamente.
    await page.goto(
        'https://google.com/'
    );
});



// ==========================================================
// TEST 3 - Título de la página y assertion
// ==========================================================

test.skip('Google test', async ({ page }) => {

    // Abrimos Google.
    await page.goto(
        'https://google.com/'
    );


    // Obtiene el título de la página
    // y lo muestra en la terminal.
    console.log(
        await page.title()
    );


    // Comprueba que el título sea "Google".
    await expect(page).toHaveTitle('Google');
});



// ==========================================================
// TEST 4 - Login, locators y listas de elementos
// ==========================================================

test.skip('Browser Context Playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();


    // Guardamos los locators para poder reutilizarlos.
    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn = page.locator('#signInBtn');

    // Este locator puede representar VARIOS elementos.
    const cardTitles = page.locator('.card-body a');


    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );


    // Muestra el título de la página.
    console.log(
        await page.title()
    );



    // ------------------------------------------------------
    // LOGIN INCORRECTO
    // ------------------------------------------------------

    await userName.fill('rahulshetty');

    await password.fill(
        'Learning@830$3mK2'
    );

    await signIn.click();



    // Obtiene el texto del mensaje de error
    // y lo muestra en la terminal.
    console.log(
        await page.locator("[style*='block']").textContent()
    );


    // Comprueba que el mensaje contiene "Incorrect".
    await expect(
        page.locator("[style*='block']")
    ).toContainText('Incorrect');



    // ------------------------------------------------------
    // LOGIN CORRECTO
    // ------------------------------------------------------

    // Limpiamos el usuario anterior.
    await userName.fill('');


    // Introducimos el usuario correcto.
    await userName.fill(
        'rahulshettyacademy'
    );


    // La contraseña ya era correcta,
    // por lo que no hace falta escribirla otra vez.
    await signIn.click();



    // ------------------------------------------------------
    // PRODUCTOS
    // ------------------------------------------------------

    // Esperamos a que aparezca el primer producto.
    //
    // Esto es importante porque allTextContents()
    // puede devolver [] si se ejecuta antes de que
    // los productos hayan terminado de aparecer.
    await cardTitles.first().waitFor();


    // Obtiene el texto de TODOS los productos.
    //
    // El resultado será un array.
    const allCardTitles =
        await cardTitles.allTextContents();


    // Muestra el array en la terminal.
    console.log(allCardTitles);



    // Ejemplos para trabajar con elementos individuales:

    // Primer producto:
    // console.log(
    //     await cardTitles.first().textContent()
    // );


    // Segundo producto:
    // console.log(
    //     await cardTitles.nth(1).textContent()
    // );
});



// ==========================================================
// TEST 5 - UI Controls
// ==========================================================

test('UI Controls', async ({ page }) => {

    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );


    // Guardamos los locators.
    const dropdown =
        page.locator('select.form-control');

    const userRadio =
        page.locator('.radiotextsty').last();

    const terms =
        page.locator('#terms');


    // Busca un enlace cuyo href contenga
    // el texto "documents-request".
    const documentLink =
        page.locator("[href*='documents-request']");



    // ------------------------------------------------------
    // DROPDOWN
    // ------------------------------------------------------

    // Selecciona la opción Consultant.
    await dropdown.selectOption('consult');



    // ------------------------------------------------------
    // RADIO BUTTON
    // ------------------------------------------------------

    // Selecciona el último radio button: User.
    await userRadio.click();


    // Confirma el popup que aparece.
    await page.locator('#okayBtn').click();


    // isChecked() devuelve:
    //
    // true  -> está seleccionado
    // false -> no está seleccionado
    console.log(
        await userRadio.isChecked()
    );


    // Assertion:
    // comprueba que el radio button está seleccionado.
    await expect(userRadio).toBeChecked();



    // ------------------------------------------------------
    // CHECKBOX
    // ------------------------------------------------------

    // Marca Terms and Conditions.
    await terms.click();


    // Comprueba que está marcado.
    await expect(terms).toBeChecked();


    // Desmarca el checkbox.
    await terms.uncheck();


    // Comprueba que ahora NO está marcado.
    await expect(terms).not.toBeChecked();



    // ------------------------------------------------------
    // ATRIBUTOS HTML
    // ------------------------------------------------------

    // Comprueba que documentLink tenga:
    //
    // class="blinkingText"
    await expect(documentLink).toHaveAttribute(
        'class',
        'blinkingText'
    );



    // Pausa manual para inspeccionar el test
    // con Playwright Inspector.
    //
    // await page.pause();
});



// ==========================================================
// TEST 6 - Child Windows / Nueva pestaña
// ==========================================================

test('@Child windows hadl', async ({ browser }) => {

    const context =
        await browser.newContext();

    const page =
        await context.newPage();


    // Locator del campo username.
    const userName =
        page.locator('#username');


    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );


    // Este enlace abre una nueva pestaña.
    const documentLink =
        page.locator("[href*='documents-request']");



    // ------------------------------------------------------
    // ABRIR Y CAPTURAR UNA NUEVA PESTAÑA
    // ------------------------------------------------------
    //
    // Tenemos dos operaciones relacionadas:
    //
    // 1. Esperar a que aparezca una nueva Page.
    // 2. Hacer clic en el enlace que abre esa Page.
    //
    // Promise.all() permite coordinar ambas operaciones.
    //
    // La nueva pestaña queda almacenada en:
    //
    // newPage
    // ------------------------------------------------------

    const [newPage] = await Promise.all([

        context.waitForEvent('page'),

        documentLink.click(),

    ]);



    // ------------------------------------------------------
    // TRABAJAMOS EN LA NUEVA PESTAÑA
    // ------------------------------------------------------

    // Busca el elemento .red en newPage
    // y obtiene su texto.
    const text =
        await newPage.locator('.red').textContent();



    // ------------------------------------------------------
    // MANIPULACIÓN DEL TEXTO
    // ------------------------------------------------------

    // Divide el texto utilizando @.
    //
    // Ejemplo:
    //
    // texto@dominio.com resto
    //
    // se convierte en:
    //
    // [
    //   "texto",
    //   "dominio.com resto"
    // ]
    const arrayText =
        text.split('@');


    // Cogemos la segunda parte [1]
    // y volvemos a dividirla por espacios.
    //
    // [0] obtiene la primera palabra.
    const domain =
        arrayText[1].split(' ')[0];


    // Podemos mostrar el resultado:
    // console.log(domain);



    // ------------------------------------------------------
    // VOLVEMOS A LA PÁGINA ORIGINAL
    // ------------------------------------------------------

    // Escribe el dominio obtenido
    // dentro del input username.
    await page.locator('#username').fill(domain);



    // inputValue() obtiene el valor escrito
    // dentro de un <input>.
    //
    // Para leer inputs usamos inputValue(),
    // no textContent().
    console.log(
        await page.locator('#username').inputValue()
    );

});