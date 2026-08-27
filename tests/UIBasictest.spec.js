// Importamos la función "test" desde Playwright.
// Esto nos permite crear y ejecutar tests.
const { test } = require('@playwright/test');
// import { test } from '@playwright/test';


// PRIMER TEST
// Aquí pedimos la fixture "browser".
// Playwright nos da el navegador, pero nosotros creamos manualmente
// el contexto y la página.
test('Browser Context Playwright test', async ({ browser }) => {

    // Creamos un contexto nuevo del navegador.
    // Es como una sesión nueva/incógnito:
    // sin cookies ni sesión previa por defecto.
    const context = await browser.newContext();

    // Creamos una nueva página/pestaña dentro de ese contexto.
    const page = await context.newPage();

    // Navegamos a esta URL.
    // Usamos await porque cargar una página es una operación asíncrona.
    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );

});


// SEGUNDO TEST
// Aquí pedimos directamente la fixture "page".
// Playwright crea automáticamente el contexto y la página por nosotros.
test('Page Playwright test', async ({ page }) => {

    // Como Playwright ya nos ha dado "page",
    // podemos navegar directamente sin crear context ni page manualmente.
    await page.goto(
        'https://rahulshettyacademy.com/loginpagePractise/'
    );

});

// test.only(...) → ejecuta únicamente ese test y omite los demás.
// test.skip(...) → omite ese test y ejecuta los demás.
// Útiles para centrarse en un caso concreto mientras desarrollamos o depuramos.