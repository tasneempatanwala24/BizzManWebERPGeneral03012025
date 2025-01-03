$(document).ready(function () {
    function getQueryStringValue(name) {
        var queryString = window.location.search.substring(1);
        var queryParams = queryString.split('&');
        for (var i = 0; i < queryParams.length; i++) {
            var pair = queryParams[i].split('=');
            if (decodeURIComponent(pair[0]) === name) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
    // AJAX call to fetch the base64 string from the server
    var Id = getQueryStringValue('id');
    $.ajax({
        type: "POST",
        url: "wfInventTransportDetail_display.aspx/DisplayImage",
        data: JSON.stringify({
            "Id": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response.d);
            var dataUrl = data[0].TransportImage;
            var mimeType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
            if (mimeType.startsWith('image/')) {
                $("#imagePlaceholder").show();
                /*$('#pdfViewer').hide();*/
                $("#imagePlaceholder").attr("src", dataUrl);
            } else {
                $("#imagePlaceholder").show();
                //$('#pdfViewer').show();
                //$('#pdfViewer').attr('src', dataUrl);
            }

        },
        error: function () {
            alert("Error fetching image from server.");
        }
    });
});
