<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfSdSalesOrderPayment_display.aspx.cs" Inherits="BizzManWebErp.wfSdSalesOrderPayment_display" %>

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
        table.center {
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

        .tdHeader {
            font-weight: bold;
        }
    </style>
    <script>

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
            var Id = getQueryStringValue('id');
            GetPDFContent(Id);

        });


        var salesPayementID = null;

        function GetPDFContent(id) {
            $.ajax({
                type: 'POST',
                url: 'wfSdSalesOrderPayment_display.aspx/GetPaymentDetailsData',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ paymentId: id }),
                dataType: 'json',
                success: function (response) {
                    var data = JSON.parse(response.d);
                    var companyDetails = data.CompanyDetails;
                    var clientDetails = data.ClientDetails;
                    var paymentDetails = data.PaymentDetails;
                    var salesOrderAllPayDetails = data.SalesOrderAllPayDetails;

                    salesPayementID = salesOrderAllPayDetails[0].Id;

                    var content = '<div style="padding: 20px; font-family: Arial, sans-serif; color: #000;">';

                    content += '<h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">Sales Order Payment Detail</h3>';

                    if (companyDetails && companyDetails.length > 0) {
                        content += '<div style="display: flex; justify-content: space-between; align-items: center;">';
                        content += '<div>';
                        content += '<h2 style="margin-bottom: 10px; font-weight: bold;">' + companyDetails[0].CompanyName + '</h2>';
                        content += '<p style="margin: 5px 0;">' + companyDetails[0].Address1 + '</p>';
                        content += '<p style="margin: 5px 0;">Email: ' + companyDetails[0].EmailAddress + '</p>';
                        content += '<p style="margin: 5px 0;">Contact: ' + companyDetails[0].PhoneNo + '</p>';
                        content += '</div>';
                        content += '<div style="text-align: right;">';
                        content += '<img src="Images/logo.png" alt="Company Logo" style="height: 100px;">';
                        content += '</div>';
                        content += '</div>';
                    }

                    content += '<hr style="margin: 20px 0; border-top: 1px solid #000;">';

                    if (clientDetails && clientDetails.length > 0) {
                        content += '<div style="display: flex; justify-content: space-between;">';
                        content += '<div>';
                        content += '<h3 style="margin-bottom: 10px; font-weight: bold;">Bill To</h3>';
                        content += '<p style="margin: 5px 0;">Name: ' + clientDetails[0].ContactName + '</p>';
                        content += '<p style="margin: 5px 0;">Address: ' + clientDetails[0].Address + '</p>';
                        content += '<p style="margin: 5px 0;">Mobile: ' + clientDetails[0].Mobile + '</p>';
                        content += '<p style="margin: 5px 0;">Email: ' + clientDetails[0].Email + '</p>';
                        content += '</div>';
                        content += '<div style="text-align: right;margin-top:10px">';
                        content += '<p style="margin: 5px 0;"><span style="font-weight: bold"> SalesOrder ID: </span> ' + salesOrderAllPayDetails[0].SalesOrderId + '</p>';
                        content += '<p style="margin: 5px 0;"><span style="font-weight: bold">Payment ID: </span>' + salesOrderAllPayDetails[0].Id + ' </p>';
                        content += '<p style="margin: 5px 0;"><span style="font-weight: bold">Payment Date: </span>' + salesOrderAllPayDetails[0].PaymentDate + '</p>';
                        content += '</div>';
                        content += '</div>';
                    }


                    if (paymentDetails && paymentDetails.length > 0) {

                        content += '<table style="width: 100%; border-collapse: collapse; margin-top: 20px;font-size:13px;margin-left:0%">';
                        content += '<caption  align= "top" style="font-size:15px; font-weight: bold;margin-bottom:15px" >Payment Entry Details : ' + salesOrderAllPayDetails[0].Id + ' </caption > ';
                        content += '<tr>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Sales OrderId</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].SalesOrderId + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Payment Id</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].Id + '</td>';
                        content += '</tr>';

                        content += '<tr>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Payment Mode</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].PaymentMode + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Payment Type</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].PaymentType + '</td>';
                        content += '</tr>';

                        content += '<tr>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Payment Amount</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(paymentDetails[0].PaymentAmount).toFixed(2) + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Payment Date</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].PaymentDate + '</td>';
                        content += '</tr>';

                        content += '<tr>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Bank Account Number</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].AcNo + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Commnet</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].Description + '</td>';
                        content += '</tr>';

                        content += '<tr>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Created By</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].CreateUser + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" >Created On</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + paymentDetails[0].CreateDate + '</td>';
                        content += '</tr>';

                        content += '<tr style="border-style: double">';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" ><span style="font-style: italic;">Total Amount : ' + parseFloat(paymentDetails[0].TotalAmount).toFixed(2) + ' </span></td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" ><span style="font-style: italic;">Total Paid : ' + parseFloat(paymentDetails[0].TotalPaid).toFixed(2) + ' </span></td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;" class="tdHeader" colspan="2" ><span style="font-style: italic;">Outstanding Net Amount : ' + Math.round(parseFloat(paymentDetails[0].OutstandingAmount).toFixed(2)) + ' </span></td>';
                        content += '</tr>';

                        content += '<tbody>';

                    }

                    content += '<hr style="margin: 20px 0; border-top: 1px solid #000;">';

                    content += '<table style="width: 100%; border-collapse: collapse; margin-top: 20px;font-size:13px;margin-left:0%">';
                    content += '<caption  align= "top" style="font-size:15px; font-weight: bold;margin-bottom:15px" >Payment History Of Sales Order : ' + salesOrderAllPayDetails[0].SalesOrderId + ' </caption > ';
                    content += '<thead style="background-color: #f2f2f2; font-weight: bold;">';
                    content += '<tr>';
                    content += '<th style="border: 1px solid #000; padding: 8px;">Payment Id</th>';
                    content += '<th style="border: 1px solid #000; padding: 8px;">Payment Mode</th>';
                    content += '<th style="border: 1px solid #000; padding: 8px;">Bank A/c No</th>';
                    content += '<th style="border: 1px solid #000; padding: 8px;">Payment Type</th>';
                    content += '<th style="border: 1px solid #000; padding: 8px;">Payment Amount</th>';
                    content += '<th style="border: 1px solid #000; padding: 8px;">Payment Date</th>';
                    content += '<th style="border: 1px solid #000; padding: 8px;">Created By</th>';
                    content += '</tr>';
                    content += '</thead>';
                    content += '<tbody>';
                    content += '<hr style="margin: 20px 0; border-top: 1px solid #000;">';
                    for (var i = 0; i < salesOrderAllPayDetails.length; i++) {
                        content += '<tr>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + salesOrderAllPayDetails[i].Id + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + salesOrderAllPayDetails[i].PaymentMode + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + salesOrderAllPayDetails[i].AcNo + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + salesOrderAllPayDetails[i].PaymentType + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(salesOrderAllPayDetails[i].PaymentAmount).toFixed(2) + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + salesOrderAllPayDetails[i].PaymentDate + '</td>';
                        content += '<td style="border: 1px solid #000; padding: 8px;">' + salesOrderAllPayDetails[i].CreateUser + '</td>';
                        content += '</tr>';


                    }

                    content += '</tfoot>';
                    content += '</table>';

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
                margin: [10, 10, 14, 10], // Top, right, bottom, left margins
                filename: salesPayementID + '.pdf', // Set the filename using the current QuotationId
                image: { type: 'jpeg', quality: 0.98 },
                /*html2canvas: { scale: 4, useCORS: true },*/
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                html2canvas: { width: '1000px',scale:4 },
            };

            html2pdf().set(opt).from(element).save();
        }


    </script>
</head>
<body>
    <input type="hidden" id="loginuser" runat="server" />
    <form id="form1" runat="server">
        <table class="center" style="width: 100%;" border="0">
            <tr>
                <td  style="text-align: left;">
                    <button type="button" onclick="DownLoadPDF()">Export To Pdf</button></td>
            </tr>
            
        </table>
        <div id="tableContainer"></div>

    </form>

</body>
</html>
