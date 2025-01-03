<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfSdProjectMaster_Display.aspx.cs" Inherits="BizzManWebErp.wfSdProjectMaster_Display" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Scripts/jquery.min.js"></script>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>

    <title></title>
    <style>
        table tr td {
            border-bottom: 1px solid black;
            padding: 5px;
        }

          /*  table tr td:first-child {
                font-size: 13px;
                white-space: nowrap !important
            }*/

        .center {
            margin-left: auto;
            margin-right: auto;
            font-family: Calibri;
        }

        #search_form {
            height: 2em;
            word-wrap: break-word;
            border-collapse: collapse;
        }

            #search_form tr td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 5px;
            }

        #search_form1 {
            height: 2em;
            word-wrap: break-word;
            border-collapse: collapse;
        }

            #search_form1 thead {
                border: solid 1px black;
                border-collapse: collapse;
                text-align: center;
            }

            #search_form1 tr td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 5px;
            }

        /*.tdHeader {
            text-align: left !important;
            padding-left: 10px !important;
            height: 50px;
            font-size: x-large !important;
        }

        .imageCol {
            height: 300px;
            background: transparent !important;
            width: 300px;
        }
        #imgLogo {
            height:inherit;
            width:inherit;
        }*/
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
                url: 'wfSdProjectMaster_Display.aspx/GetProjectById',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ "Id": id }),
                dataType: 'json',
                success: function (response) {
                    var data = JSON.parse(response.d);
                    projectName = data[0].ProjectName;
                    var content = '<div style="padding: 20px; font-family: Arial, sans-serif; color: #000;">';
                    //content += '<div style="text-align: right;width: 80%;"><button type="button" onclick="DownLoadPDF()">Export To Pdf</button></div>';
                    content += '<table style="width: 80%;border:solid 1px; border-collapse: collapse; margin-top: 5px;margin-left: auto;margin-right: auto;">';
                    //content += '<tr>';
                    //content += '<td colspan=2 class="tdHeader" >' + data[0].ProjectName + '</td>';
                    //content += '</tr>';
                    //content += '<tr>';
                    //content += '<td>Project Logo</td>';
                    //content += '<td><div class="col imageCol"><img id="imgLogo" src="'+data[0].ProjectLogoS+'" alt="Uploaded logo displays here" /></div></td>';
                    //content += '</tr>';
                    content += '<tr>';
                    content += '<td style="border:solid 1px;width:20%;"> Project Name</td>';
                    content += '<td style="border:solid 1px;">' + data[0].ProjectName + '</td>';
                    //content += '<td style="border:solid 1px;width:20%;">Project Logo</td>';
                    content += '<td colspan="3"><img id="imgLogo" src="'+data[0].ProjectLogoS+'" alt="Uploaded logo displays here" style="width:100px;height:100px;"/></td>';
                    content += '</tr>';

                    content += '<tr>';
                    content += '<td style="border:solid 1px;width:15%;">Category</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + data[0].ProjectCategoryName + '</td>';
                    content += '<td style="border:solid 1px;width:10%;">Branch</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + data[0].BranchName + '</td>';
                    content += '<td style="border:solid 1px;width:15%;">Location</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + data[0].LocationName + '</td>';
                    content += '</tr>';

                    content += '<tr>';                    
                    content += '<td style="border:solid 1px;width:15%;">Expected Start Date</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[0].ExpectedStartDate.split('T')[0]))  + '</td>';
                    content += '<td style="border:solid 1px;width:10%;">Actual Start Date</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[0].ActualStartDate.split('T')[0])) + '</td>';
                    content += '<td style="border:solid 1px;width:15%;">Expected Finish Date</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[0].ExpectedFinishDate.split('T')[0])) + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="border:solid 1px;width:15%;">Actual Finish Date</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + $.datepicker.formatDate('dd/mm/yy', new Date(data[0].ActualFinishDate.split('T')[0]))  + '</td>';
                    content += '<td style="border:solid 1px;width:15%;">Expected Cost</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + data[0].ExpectedCost + '</td>';
                    content += '<td style="border:solid 1px;width:15%;">Actual Cost</td>';
                    content += '<td style="border:solid 1px;width:20%;">' + data[0].ActualCost + '</td>';
                    content += '</tr>';
                   
                    content += '<tr>';
                    content += '<td style="border:solid 1px;width:15%;">Address 1</td>';
                    content += '<td colspan="5" style="border:solid 1px;width:85%;">' + data[0].Address1 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="border:solid 1px;width:15%;">Address 2</td>';
                    content += '<td colspan="5" style="border:solid 1px;width:85%;">' + data[0].Address2 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="border:solid 1px;width:15%;">Description</td>';
                    content += '<td colspan="5" style="border:solid 1px;width:85%;">' + data[0].Description + '</td>';
                    content += '</tr>';
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
        <div style="text-align: right;width: 80%;"">
            <button type="button" onclick="DownLoadPDF()">Export To Pdf</button>
        </div>
        <div id="tableContainer"></div>

    </form>

</body>
</html>
