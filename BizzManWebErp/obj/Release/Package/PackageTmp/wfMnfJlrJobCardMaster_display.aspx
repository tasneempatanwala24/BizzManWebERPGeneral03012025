<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfMnfJlrJobCardMaster_display.aspx.cs" Inherits="BizzManWebErp.wfMnfJlrJobCardMaster_display" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Scripts/jquery.min.js"></script>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>

    <script src="Scripts/MnfJlrJobCardMaster_display.js"></script>
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
                <button type="button" onclick = "getContentInPDF()" id="btnPdf" style="display:none;">Export To Pdf</button>
               <button type="button" id="exportButton" style="display:none;">Export To Excel</button>
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

            var opt = {
                margin: 0.1, // Adjust the margin to prevent cutting off
                filename: 'JobCard.pdf',
                image: { type: 'jpeg', quality: 0.5 },
                html2canvas: { scale: 2 }, // Increase scale for better quality
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } // Set to landscape
            };

            html2pdf().from(element).set(opt).save();
        }
        function getContentInExcel() {
            var table = document.getElementById("tableContainer");
            var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
            XLSX.writeFile(wb, 'JobCard.xlsx');
        }


    </script>
</body>
</html>


