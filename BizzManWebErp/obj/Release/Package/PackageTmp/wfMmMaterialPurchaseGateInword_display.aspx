<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfMmMaterialPurchaseGateInword_display.aspx.cs" Inherits="BizzManWebErp.wfMmMaterialPurchaseGateInword_display" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Scripts/jquery.min.js"></script>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
    <script src="Scripts/MmMaterialPurchaseGateInword_display.js"></script>
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
</head>
<body>
    <input type="hidden" id="Hidden1" runat="server" />
    <div style="height:25px;"></div>
    <form id="form2" runat="server">
        <table class="center" style="width:60%;" border="0">
            <tr>
                <td colspan="2" style="text-align:right;">
                <button type="button" onclick = "getContentInPDF()">Print To Pdf</button>
               
                </td></tr>
            <tr><td colspan="2"></td></tr><tr><td colspan="2"></td></tr>
        </table>
        <div style="height:25px;"></div>
         <div id="tableContainer">
             <div style="height:25px;"></div>
         </div>
        
        
        
    </form>
    <script>
      function getContentInPDF() {
          var element = document.getElementById("tableContainer");
          //var empId = document.getElementById("Id").textContent.trim();
          html2pdf().from(element).save('PurchaseGateInword.pdf');
      }
    </script>
</body>
</html>

