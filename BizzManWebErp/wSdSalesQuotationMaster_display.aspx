<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wSdSalesQuotationMaster_display.aspx.cs" Inherits="BizzManWebErp.wSdSalesQuotationMaster_display" %>

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
            font-family : Calibri;
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
      border-collapse:collapse;
      text-align: center; 
    }

    #search_form1 tr td{
      border: 1px solid black;
      border-collapse: collapse;
      padding: 5px;
    }
    </style>
      <script>
          //function getContentInPDF() {
          //    var element = document.getElementById("tableContainer");;
          //   html2pdf().from(element).save();
          //  }
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


          var currentQuotationId = null;

          function GetPDFContent(id) {
              $.ajax({
                  type: 'POST',
                  url: 'wSdSalesQuotationMaster_display.aspx/GetQuotationData',
                  contentType: 'application/json; charset=utf-8',
                  data: JSON.stringify({ "QuotationId": id }),
                  dataType: 'json',
                  success: function (response) {
                      var data = JSON.parse(response.d);
                      var companyDetails = data.CompanyDetails;
                      var clientDetails = data.ClientDetails;
                      var quotationDetails = data.QuotationDetails;
                      var salesQuotationDetail = data.SalesQuotationDetail;
                      var netamountinword = data.NetAmountInWord;

                      currentQuotationId = id; // Store the current QuotationId

                      var content = '<div style="padding: 20px; font-family: Arial, sans-serif; color: #000;">';

                      // Add QUOTATION heading
                      content += '<h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">QUOTATION</h3>';

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
                          content += '<p style="margin: 5px 0;">Phone: ' + clientDetails[0].Phone + '</p>';
                          content += '<p style="margin: 5px 0;">Email: ' + clientDetails[0].Email + '</p>';
                          content += '</div>';
                          if (quotationDetails && quotationDetails.length > 0) {
                              content += '<div style="text-align: right;">';
                              content += '<p style="margin: 5px 0;">Quotation ID: ' + quotationDetails[0].QuotationId + '</p>';
                              content += '<p style="margin: 5px 0;">Quotation Date: ' + quotationDetails[0].QuotationDate + '</p>';
                              content += '</div>';
                          }
                          content += '</div>';
                      }

                      content += '<hr style="margin: 20px 0; border-top: 1px solid #000;">';

                      content += '<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">';
                      content += '<thead style="background-color: #f2f2f2; font-weight: bold;">';
                      content += '<tr>';
                      content += '<th style="border: 1px solid #000; padding: 8px;">Item</th>';
                      content += '<th style="border: 1px solid #000; padding: 8px;">Qty</th>';
                      content += '<th style="border: 1px solid #000; padding: 8px;">Rate (incl Tax)</th>';
                      content += '<th style="border: 1px solid #000; padding: 8px;">Discount</th>';
                      content += '<th style="border: 1px solid #000; padding: 8px;">GST %</th>';
                      content += '<th style="border: 1px solid #000; padding: 8px;">Amount</th>';
                      content += '</tr>';
                      content += '</thead>';
                      content += '<tbody>';


                      var centralTaxValue = 0;
                      var stateTaxValue = 0;
                      var cessTaxValue = 0;

                      var centralTaxPercent = 0;
                      var stateTaxPercent = 0;
                      var cessTaxPercent = 0;
                      var qty = 0;
                      var Rate = 0;
                      var Amount = 0;
                      var NetGST = 0;
                      for (var i = 0; i < salesQuotationDetail.length; i++) {
                          content += '<tr>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + salesQuotationDetail[i].materialName + '</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + salesQuotationDetail[i].Qty + '</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(salesQuotationDetail[i].Rate).toFixed(2) + '</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(salesQuotationDetail[i].Discount).toFixed(2) + '</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(salesQuotationDetail[i].GST).toFixed(2) + '</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(salesQuotationDetail[i].Amount).toFixed(2) + '</td>';
                          content += '</tr>';
                          centralTaxPercent = parseFloat(salesQuotationDetail[i].CentralTaxPercent);
                          stateTaxPercent = parseFloat(salesQuotationDetail[i].StateTaxPercent);
                          cessTaxPercent = parseFloat(salesQuotationDetail[i].CessPercent);
                          qty = parseFloat(salesQuotationDetail[i].Qty);
                          Rate = parseFloat(salesQuotationDetail[i].Rate);
                          Amount = parseFloat(salesQuotationDetail[i].Amount);
                          //centralTaxValue += (qty * Rate) * (centralTaxPercent / 100);
                          //stateTaxValue += (qty * Rate) * (stateTaxPercent / 100);
                          //cessTaxValue += (qty * Rate) * (cessTaxPercent / 100);
                          centralTaxValue += (Amount * centralTaxPercent) / 100;
                          stateTaxValue += (Amount * stateTaxPercent) / 100;
                          cessTaxValue += (Amount * cessTaxPercent) / 100;
                      }
                      NetGST = centralTaxValue + stateTaxValue + cessTaxValue;
                      content += '</tbody>';
                      content += '<tfoot>';
                      if (quotationDetails && quotationDetails.length > 0) {
                          content += '<tr>';
                          content += '<td colspan="5" style="text-align:right; border: 1px solid #000; padding: 8px;">Total Amount:</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(quotationDetails[0].NetTotal).toFixed(2) + '</td>';
                          content += '</tr>';

                          content += '<tr>';
                          content += '<td colspan="5" style="text-align:right; border: 1px solid #000; padding: 8px;">Central Tax Value:</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(centralTaxValue).toFixed(2) + '</td>';
                          content += '</tr>';

                          content += '<tr>';
                          content += '<td colspan="5" style="text-align:right; border: 1px solid #000; padding: 8px;">State Tax Value:</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(stateTaxValue).toFixed(2) + '</td>';
                          content += '</tr>';

                          
                          content += '<tr>';
                          content += '<td colspan="5" style="text-align:right; border: 1px solid #000; padding: 8px;">Net GST:</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(NetGST).toFixed(2) + '</td>';
                          content += '</tr>';
                          content += '<tr>';
                          content += '<td colspan="5" style="text-align:right; border: 1px solid #000; padding: 8px;">Shipping Charges:</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + parseFloat(quotationDetails[0].ShippingCharges).toFixed(2) + '</td>';
                          content += '</tr>';
                          content += '<tr>';
                          content += '<td colspan="5" style="text-align:right; border: 1px solid #000; padding: 8px;">Net Amount:</td>';
                          content += '<td style="border: 1px solid #000; padding: 8px;">' + Math.round(quotationDetails[0].NetAmount) + '</td>';
                          content += '</tr>';
                          content += '<tr>';
                          content += '<td colspan="6" style="text-align:left; border: 1px solid #000; font-style: oblique;font-size:large; padding:8px"><span style="font-size: 10px">Net Amount In Word</span>  (' + netamountinword + ')</td>';
                          content += '</tr>';
                      }
                      content += '</tfoot>';
                      content += '</table>';

                      if (quotationDetails && quotationDetails.length > 0) {
                          content += '<p style="margin: 20px 0 0 0;">Notes: ' + quotationDetails[0].Notes + '</p>';
                          content += '<p style="margin: 5px 0;">Terms and Conditions: ' + quotationDetails[0].TermsAndConditions + '</p>';
                      }

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
                  filename: currentQuotationId + '.pdf', // Set the filename using the current QuotationId
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
        <table class="center" style="width:60%;" border="0>
            <tr><td colspan="2" style="text-align:right;"><button type="button" onclick = "DownLoadPDF()">Export To Pdf</button></td></tr>
            <tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr>
        </table>
         <div id="tableContainer"></div>
        
        
        
    </form>
  
</body>
</html>
