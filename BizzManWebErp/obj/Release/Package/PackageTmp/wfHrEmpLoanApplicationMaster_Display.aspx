<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfHrEmpLoanApplicationMaster_Display.aspx.cs" Inherits="BizzManWebErp.wfHrEmpLoanApplicationMaster_Display" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Scripts/jquery.min.js"></script>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
    <script src="Scripts/HrEmpLoanApplicationDetail.js"></script>
    <title></title>
    <style>
        img {
            height:90vh;
        }
    </style>
</head>
<body>
    <input type="hidden" id="loginuser" runat="server" />
    <form id="form2" runat="server">
        <div>
            <img id="imagePlaceholder" src="#" alt="Image" style="display:none;" />
            <iframe id="pdfViewer" src="#" style="display:none;" height="800px" width="80%"></iframe>
        </div>

    </form>

</body>
</html>
