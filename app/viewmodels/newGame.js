define(['plugins/dialog', 'durandal/app', 'knockout'], function (dialog, app, ko) {
	var self = this;

	function gameObj(eventId, name, image, rules, scoreType) {
        this.eventId = eventId;
        this.name = ko.observable(name); // str
        this.image = image; // url
        this.rules = ko.observable(rules); // str
        this.scoreType = ko.observable(scoreType); // str
    }

    self.scoringTypes = [
		"points",
		"timed"
    ];

    var CustomModal = function () {
    };

    CustomModal.prototype.ok = function(customModal) {
		dialog.close(this, customModal.game);
	};

	CustomModal.prototype.cancel = function() {
		dialog.close(this, null);
	};

    CustomModal.prototype.show = function(){
       return dialog.show(this);
    };

    return CustomModal;
});