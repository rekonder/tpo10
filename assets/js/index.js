$(document).ready(function() {

});

$.notifyDefaults({
    offset: {
        x: 0,
        y: 60  
    },
	spacing: 10,
    template:
        '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<span data-notify="icon"></span>' +
            '<span data-notify="title">{1}</span>' +
            '<span data-notify="message">{2}</span>' +
        '</div>'
});