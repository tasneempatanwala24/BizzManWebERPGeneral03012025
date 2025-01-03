<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfInventTransportDetail_display.aspx.cs" Inherits="BizzManWebErp.wfInventTransportDetail_display" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="Scripts/jquery.min.js"></script>
    <link href="css/style.css" rel="stylesheet" />
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/InventTransportDetailDisplay.js"></script>
    <title></title>
    <style>
        img {
            max-height:90vh;
        }
    </style>
</head>
<body>
    <input type="hidden" id="loginuser" runat="server" />
    <form id="form2" runat="server">
        <div>
            <img id="imagePlaceholder" src="#" alt="Image"/>
            <%--<iframe id="pdfViewer" src="#" style="display:none;" height="800px" width="80%"></iframe>--%>
        </div>

    </form>

</body>
</html>

