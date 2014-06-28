define(['plugins/dialog', 'durandal/app', 'knockout'], function (dialog, app, ko) {
	var self = this;

	function volunteerObj(email, type) {
        this.email = email;
        this.type = ko.observable(type); // str
    }

    var CustomModal = function () {
    };

    CustomModal.prototype.ok = function(customModal) {
		dialog.close(this, customModal.volunteer);
	};

	CustomModal.prototype.cancel = function() {
		dialog.close(this, null);
	};

    CustomModal.prototype.show = function(){
       return dialog.show(this);
    };

    return CustomModal;
});