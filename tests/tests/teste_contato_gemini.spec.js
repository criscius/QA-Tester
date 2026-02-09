const { test, expect } = require('@playwright/test');

test('My day 4 test - Contact Form', async ({ page }) => {
    // 1. Sempre use o protocolo completo (https://)
    await page.goto('https://www.kiwilaunch.co.nz');

    // 2. Clique no link (usando regex / /i para ignorar maiúsculas/minúsculas)
    await page.getByRole('link', { name: /contact us/i }).click();

    // 3. Validar Título (Note o await e o uso de regex)
    await expect(page).toHaveTitle(/Contact Us/i);

    // 4. Preenchimento com Validação Profissional
    // Em vez de isVisible(), usamos expect().toBeVisible()
    const campoName = page.getByPlaceholder(/name/i); // Campos de formulário costumam usar Placeholder ou Label
    await expect(campoName).toBeVisible();
    await campoName.fill('Christina');

    // Dica: Se o getByRole('field') falhar, tente getByLabel ou getByPlaceholder
    await page.getByPlaceholder(/company/i).fill('KiwiLaunch');
    await page.getByPlaceholder(/phone/i).fill('027 489 9183');
    await page.getByPlaceholder(/email/i).fill('christycius@gmail.com');
    await page.getByPlaceholder(/subject/i).fill('Clarification');
    await page.getByPlaceholder(/message/i).fill('This is just a test from my automation study.');

    // 5. Botão Enviar
    const botaoEnviar = page.getByRole('button', { name: /send message/i });
    await expect(botaoEnviar).toBeVisible();
    await expect(botaoEnviar).toBeEnabled();
    await botaoEnviar.click();

    // 6. Validar Mensagem de Sucesso
    const successMessage = page.getByText('Your submission was successful.');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
});