<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfSdProjectMaster_Document.aspx.cs" Inherits="BizzManWebErp.wfSdProjectMaster_Document" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Scripts/jquery.min.js"></script>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <title></title>
    <style>
        #tableContainer {
            padding: 50px;
            margin-left:20%;
            font-family: Arial, sans-serif;
            height: fit-content;
            width: fit-content;
            text-align: center;
        }
        #imgDocExternal {
            max-height:3000px !important;
            max-width:1000px !important;
        }

    </style>
    <script>
        var projectName = '';
        $(document).ready(function () {
            function GetProjectById(id) {
                var queryString = window.location.search.substring(1);
                var queryParams = queryString.split('&');
                for (var i = 0; i < queryParams.length; i++) {
                    var pair = queryParams[i].split('=');
                    if (decodeURIComponent(pair[0]) === id) {
                        return decodeURIComponent(pair[1]);
                    }
                }
                return null;
            }
            var Id = GetProjectById('id');
            GetPDFContent(Id);

        });
        function GetPDFContent(id) {
            $.ajax({
                type: 'POST',
                url: 'wfSdProjectMaster_Document.aspx/GetProjectById',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ "Id": id }),
                dataType: 'json',
                success: function (response) {
                    var data = JSON.parse(response.d);
                    data[0].ProjectName;
                    var content = '<div>'
                    content += '<img  id="imgDocExternal" src="' + data[0].ProjectDocumentS +'" />';
                    content += '</div>';

                    $('#tableContainer').html(content);
                },
                error: function (xhr, status, error) {
                    console.log('Error fetching data:', error);
                }
            });
        }
        function DownLoadPDF() {
            var element = document.getElementById("tableContainer");
            var opt = {
                margin: [10, 10, 10, 10], // Top, right, bottom, left margins
                filename: projectName + '.pdf', // Set the filename using the current QuotationId
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(element).save();
        }
    </script>
</head>
<body>
    <input type="hidden" id="loginuser" runat="server" />
    <form id="form1" runat="server">
        <div id="tableContainer">
          
        </div>
    </form>

</body>
</html>
