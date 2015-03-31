(function() {
  'use strict';

  var contact, request = require('request');

  request('http://127.0.0.1:3000/data', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      contact = JSON.parse(body)[0];
    }
  });

  describe('Contact Details', function() {

    beforeEach(function() {
      browser.get('http://127.0.0.1:3000/contacts/view/1');
    });

    it('should load the contacts page', function() {
      var el = element(by.css('h1'));
      expect(el.getText()).toBe('Contact Details');
    });

    it('should display the contact\'s name as a header', function() {
      var el = element(by.css('h2'));
      expect(el.getText()).toEqual(contact.first_name + ' ' + contact.last_name);
    });

    it('should display the contact\'s email below the header', function() {
      var els = element.all(by.css('.view-element'));
      expect(els.get(1).getText()).toEqual(contact.email);
    });

    it('should display the contact\'s phone number below the email', function() {
      var els = element.all(by.css('.view-element'));
      expect(els.get(2).getText()).toEqual(contact.phone);
    });

    it('should display the contact\'s address below the phone number', function() {
      var els = element.all(by.css('.view-element'));
      expect(els.get(3).getText()).toEqual(contact.address + '\n' + contact.city + ', ' + contact.state + ' ' + contact.zip);
    });

    it('should display the contact\'s join date below the address', function() {
      var els = element.all(by.css('.view-element'));
      expect(els.get(4).getText()).toEqual(contact.join_date);
    });

    it('should redirect to the Contacts view when the back button is clicked', function() {
      var el = element(by.css('button'));
      el.click();
      expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:3000/contacts');
    });
  });
})();