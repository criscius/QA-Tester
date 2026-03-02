const { test, expect } = require('@playwright/test');

test('Teste de Chat com AI Agent', async ({ page }) => {
  await page.goto('https://www.kiwilaunch.co.nz');

  // 1. Clicar no ícone do agente (a imagem do robô/agente)
  const agenteIcone = page.getByRole('img', { name: 'agent' });
  await agenteIcone.click();

  // 2. Criar uma referência para o Frame do chat (facilita a leitura)
  const chatFrame = page.frameLocator('iframe[title="Embedded Agent"]');

  // 3. ESPERAR o campo de entrada estar visível antes de clicar
  // Isso resolve o erro de "element is not visible"
  const campoInput = chatFrame.getByTestId('ai-input');
  await expect(campoInput).toBeVisible({ timeout: 10000 });

  // 4. Interagir com o chat
  await campoInput.fill('Olá, gostaria de saber mais sobre os serviços.');
  await chatFrame.getByRole('button', { name: 'Send' }).click();

  console.log('O teste passou e a mensagem foi enviada!');
});