const { cy } = require("date-fns/locale");
const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    //  LOGIN
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("rchadgonzales");
    cy.findByLabelText(/password/i).type("Spock2230");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    // CHECK ACCOUNT BALANCE
    let oldBalance;
    // cy.get("[data-test=sidenav-user-balance]").then(($balance) => (oldBalance = $balance.text()).then(balance => console.log(balance)));
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => (oldBalance = $balance.text()));

    // CLICK ON NEW BUTTON
    cy.findByRole("button", { name: /new/i }).click();

    // SEARCH FOR USER
    cy.findByRole("textbox").type("john doe");
    cy.findByText(/john doe/i).click();

    // ADD AMOUNT AND NOTE AND CLICK PAY
    const paymentAmount = "7.00";
    // cy.findByPlaceholderText(/amount/i).type("7");
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    const note = uuidv4();
    // cy.findByPlaceholderText(/add a note/i).type(coffee);
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    // RETURN TO TRANSACTIONS
    cy.findByRole("button", { name: /return to transactions/i }).click();

    // GO TO PERSONAL PAYMENTS
    cy.findByRole("tab", { name: /mine/i }).click();

    // CLICK ON PAYMENT
    // cy.findByText(note).scrollIntoView();
    // cy.findByText(note).click();
    cy.findByText(note).click({ force: true });

    // VERIFY IF PAYMENT WAS MADE
    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    // VERIFY IF PAYMENT AMOUNT WAS DEDUCTED
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmount));
    });
  });
});
