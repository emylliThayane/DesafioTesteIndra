/// <reference types="cypress" />

var faker = require('faker-br');

describe('Funcionalidade Funcionario', () => {

    const perfil = require('../fixtures/perfil.json')

    beforeEach(() => {
        cy.visit('web/index.php/auth/login')
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(perfil.usuario)
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').type(perfil.senha)
        cy.get('.oxd-button').click()  
    });


   it('Deve adicionar funcionário com sucesso', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()

        cy.get(':nth-child(2) > .oxd-main-menu-item').trigger('mouseover')

        cy.visit('web/index.php/pim/addEmployee')
        cy.get(':nth-child(3) > .oxd-topbar-body-nav-tab-item').should('contain','Add Employee')

        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type(nome)
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type(sobrenome)
        cy.get('.oxd-button--secondary').click()

        //verificação
        cy.get('.orangehrm-edit-employee-content > :nth-child(1) > .oxd-text--h6').should('contain','Personal Details')     
    });

    it('Deve adicionar funcionário e Pesquisar', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let identidade = faker.random.number()

        cy.get(':nth-child(2) > .oxd-main-menu-item').trigger('mouseover')

        cy.visit('web/index.php/pim/addEmployee')
        cy.get(':nth-child(3) > .oxd-topbar-body-nav-tab-item').should('contain','Add Employee')

        cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input').type(nome)
        cy.get(':nth-child(3) > :nth-child(2) > .oxd-input').type(sobrenome)
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(identidade)
        cy.get('.oxd-button--secondary').click()

        cy.get(':nth-child(2) > .oxd-topbar-body-nav-tab-item').click()
        cy.get(':nth-child(2) > .oxd-input').type(identidade)
    })

    it('Deve editar funcionário com sucesso', () => {

        cy.visit('web/index.php/pim/viewEmployeeList')
        cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row').click()
        cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button').click()

        //verificação
        cy.get('.oxd-text--toast-message').should('contain','Successfully Update') 
    });
});