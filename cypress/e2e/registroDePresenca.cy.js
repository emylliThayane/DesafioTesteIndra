/// <reference types="cypress" />

var faker = require('faker-br');

describe('Funcionalidade Presenca', () => {

    const perfil = require('../fixtures/perfil.json')

    beforeEach(() => {
        cy.visit('web/index.php/auth/login')
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(perfil.usuario)
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(perfil.senha)
        cy.get('.oxd-button').click()  
        
    });

    it('Deve apresentar funcionários e o registro de presença com sucesso', () => {
        
        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let nomeCompleto = nome.concat(" ").concat(sobrenome)
    
        cy.get(':nth-child(2) > .oxd-main-menu-item').trigger('mouseover')

        cy.visit('web/index.php/pim/addEmployee')
        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type(nome)
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type(sobrenome)
        cy.get('.oxd-button--secondary').click()

        cy.visit('web/index.php/time/viewEmployeeTimesheet')
        cy.visit('web/index.php/attendance/viewAttendanceRecord')
      
        cy.get('.oxd-autocomplete-text-input > input').type(nomeCompleto) 
        cy.get('.oxd-date-input > .oxd-input').type('2022-12-20').click()
        cy.get('.oxd-form-actions > .oxd-button').submit
        
    });

    it('Deve apresentar mensagem de erro usuário inexistente', () => {
        cy.visit('web/index.php/time/viewEmployeeTimesheet')
        cy.visit('web/index.php/attendance/viewAttendanceRecord')
       
        cy.get('.oxd-autocomplete-text-input > input').type('5plç')
        cy.get('.oxd-form-actions > .oxd-button').submit

        //verificacao
        cy.get('.oxd-autocomplete-option').should('contain','No Records Found')
   
    });

    it.only('Deve apresentar mensagem de erro por falta de preenchimento da data', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()

        cy.get(':nth-child(2) > .oxd-main-menu-item').trigger('mouseover')

        cy.visit('web/index.php/pim/addEmployee')
        cy.get('.--visited').should('contain','Add Employee')

        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type(nome)
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type(sobrenome)
        cy.get('.oxd-button--secondary').click()
        let nomeCompleto = nome.concat(" ").concat(sobrenome) 
  
        cy.visit('web/index.php/time/viewEmployeeTimesheet')
        cy.visit('web/index.php/attendance/viewAttendanceRecord')
        
        cy.get('.oxd-autocomplete-text-input > input').type(nomeCompleto)
        cy.get('.oxd-date-input > .oxd-input').type('000000000').click()
        cy.get('.oxd-form-actions > .oxd-button').click()

        //verificacao
        cy.get('.oxd-input-group > .oxd-text').should('contain', 'Should be a valid date in yyyy-mm-dd format')
    });
    
});

