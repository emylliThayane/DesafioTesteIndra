
/// <reference types="cypress" />

var faker = require('faker-br');
const perfil = require('../fixtures/perfil.json')

context('Funcionalidade Login', () => {
    
    beforeEach(() => {
        cy.visit('web/index.php/auth/login')

    });

    it('Deve fazer login com sucesso', () => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(perfil.usuario)
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(perfil.senha)
        cy.get('.oxd-button').click()  
        
        
    });

    it('Deve exibir mensagem de erro ao inserir usuário ou senha inválidos', () => {
        
        let usuario = faker.internet.userName();
        let senha = faker.internet.password();
        
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(usuario)
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(senha)
        cy.get('.oxd-button').click() 
        
        //verificacao
        cy.get('.oxd-alert').should('contain', 'Invalid credentials')
       
    });
    
    it('Deve exibir mensagem de recuperação de login', () => {

       cy.get('.orangehrm-login-forgot').click()
       cy.get('.oxd-input').type('Admin')
       cy.get('.oxd-button--secondary').click()
        
        //verificacao
        cy.get('.orangehrm-card-container').should('contain','password')
        
    });

    it('Deve validar botões de redes socias', () => {
        cy.get('[href="https://www.linkedin.com/company/orangehrm/mycompany/"]').click()
        cy.get('[href="https://www.facebook.com/OrangeHRM/"]').click()
        cy.get('[href="https://twitter.com/orangehrm?lang=en"]').click()
        cy.get('[href="https://www.youtube.com/c/OrangeHRMInc"]').click()     
        
    });
    
});