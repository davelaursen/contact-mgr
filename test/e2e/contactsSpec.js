(function() {
  'use strict';

  var contacts, request = require('request');

  request('http://127.0.0.1:3000/data', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      contacts = JSON.parse(body);
    }
  });

  describe('Contacts', function() {

    beforeEach(function() {
      browser.get('http://127.0.0.1:3000/contacts');
    });

    it('should load the contacts page', function() {
      var el = element(by.css('h1'));
      expect(el.getText()).toBe('Contacts');
    });

    it('should have an empty "search by name" input field by default', function() {
      var el = element(by.css('input'));
      expect(el.getAttribute('value')).toEqual('');
    });

    it('should have the first "filter by state" dropdown option selected by default', function() {
      var el = element(by.css('.contact-filters > select'));
      expect(el.$('option:checked').getText()).toEqual('filter by state');
    });

    it('should have the first "items per page" dropdown option selected by default', function() {
      var el = element(by.css('.per-page select'));
      expect(el.$('option:checked').getText()).toEqual('10');
    });

    it('should list 10 contacts by default', function() {
      var items = element.all(by.repeater('contact in pagedContacts'));
      expect(items.count()).toEqual(10);
    });

    it('should have more than one page by default', function() {
      var pages = element.all(by.repeater('n in range(pageCount)'));
      var expected = Math.ceil(contacts.length / 10);
      expect(pages.count()).toEqual(expected);
    });

    it('should filter the contacts listed when a "search by name" value is entered', function() {
      var before = element.all(by.repeater('n in range(pageCount)')).count();
      element(by.css('input')).sendKeys('b');
      var after = element.all(by.repeater('n in range(pageCount)')).count();
      expect(after).toBeLessThan(before);
    });

    it('should filter the contacts listed when a "filter by state" value is selected', function() {
      var before = element.all(by.repeater('n in range(pageCount)')).count();
      element(by.cssContainingText('option', 'CA')).click();
      var after = element.all(by.repeater('n in range(pageCount)')).count();
      expect(after).toBeLessThan(before);
    });

    it('should change the number of pages and contacts listed when the "items per page" is changed', function() {
      var pages = element.all(by.repeater('n in range(pageCount)'));
      var expected = Math.ceil(contacts.length / 20);
      element(by.cssContainingText('option', '20')).click();
      expect(pages.count()).toEqual(expected);
      var items = element.all(by.repeater('contact in pagedContacts'));
      expect(items.count()).toEqual(20);
    });

    it('should redirect to the Contact Details view when a contact is clicked', function() {
      var contacts = element.all(by.repeater('contact in pagedContacts'));
      contacts.get(0).click();
      expect(browser.getCurrentUrl()).toContain('http://127.0.0.1:3000/contacts/view/');
    });
  });
})();