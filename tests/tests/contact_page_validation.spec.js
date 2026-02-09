const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../pages/ContactPage');
const testData = require('../data.json'); // Importa os dados

test.describe('Contact form with POM', () => {
    
    test.beforeEach('Validate if it is on the right page @quick', async({page})=>{
        const contactPage = new ContactPage(page);
        
        await contactPage.navigate();
        await expect(contactPage.page).toHaveTitle(/contact us/i);
        
    });
    
    test('Should submit the contact form successfully @smoke @regression', async ({ page }) => {
        const contactPage = new ContactPage(page);
        await contactPage.fillForm(testData.validUser);
        // await contactPage.fillForm({
        //     name: 'Christina',
        //     company: 'QA Specialist',
        //     phone: '000000000',
        //     email: 'christy@test.com',
        //     subject: 'Job Interview',
        //     message: 'I am a QA Engineer'
        // });
        
        // VALIDAÇÃO AVANÇADA: Garante que o botão está pronto antes do clique
        await expect(contactPage.sendButton).toBeEnabled();
        await contactPage.submitForm();

        // Validação final
        // await expect(contactPage.successMessage).toBeVisible({ timeout: 10000 });

        // ESPERA DINÂMICA: Em vez de apenas visível, garantimos que contém o texto certo
        // Isso ajuda se o site mudar de "Your submission was successful" para "Your submission was successful! Thank you"
        await expect(contactPage.successMessage).toContainText(/successful/i);
    });
});
