// pages/ContactPage.js
class ContactPage {
    constructor(page) {
        this.page = page;
        // Mapeamos os elementos aqui (os seletores)
        this.nameInput = page.getByLabel(/Name/i);
        this.emailInput = page.getByLabel(/Email/i);
        this.companyInput = page.getByLabel(/Company/i);
        this.phoneInput = page.getByLabel(/Phone/i);
        this.subjectInput = page.getByLabel(/Subject/i);
        this.messageInput = page.getByLabel(/Message/i);
        this.sendButton = page.getByRole('button', { name: /Send message/i });
        this.successMessage = page.getByText('Your submission was successful.');
    }

    async navigate() {
        await this.page.goto('https://www.kiwilaunch.co.nz');
        await this.page.getByRole('link', { name: /contact us/i }).click();
    }

    async fillForm(details) {
        await this.nameInput.fill(details.name);
        await this.companyInput.fill(details.company);
        await this.phoneInput.fill(details.phone);
        await this.emailInput.fill(details.email);
        await this.subjectInput.fill(details.subject);
        await this.messageInput.fill(details.message);
    }

    async submitForm() {
        await this.sendButton.click();
    }
}

module.exports = { ContactPage };