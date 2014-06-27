/*global jasmine, describe, beforeEach, it, expect, require */
describe('viewmodels/flickr', function() {
    "use strict";

    var flickr = require('viewmodels/flickr');
    var ko = require('knockout');

    it('should return a displayName', function() {
        expect(flickr.displayName).toBeDefined();
    });

    it('should return "images" as ko.observableArray ', function() {
        expect(ko.isObservable(flickr.images)).toBeTruthy();
        expect(ko.unwrap(flickr.images).length).toBeDefined();
    });

    it('should have a "activate" property of type function', function() {
        expect(typeof flickr.activate).toBe('function');
    });

    it('should have a "select" property of type function', function() {
        expect(typeof flickr.select).toBe('function');
    });

    it('should have a "canDeactivate" property of type function', function() {
        expect(typeof flickr.canDeactivate).toBe('function');
    });
});
