$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
        $('#example-search-input').hide();
    });

});
function Back() {
    window.location = "wfPosProductCalculation.aspx";
}