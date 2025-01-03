<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfAdminLogin.aspx.cs" Inherits="BizzManWebErp.wfAdminLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet"/>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

    <link rel="stylesheet" href="css/styleo.css"/>


</head>
<body class="img js-fullheight" style="background-image: url(images/bg.jpg); height: 100vh;">
    <section class="ftco-section">
        <div class="container">

            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="login-wrap p-0 text-center">
                        <img src="images/ErpLogo.png"  style="width:200px"/>
                        <h3 class="mb-4 text-center" style="font-size: 22px;font-weight: 500;">A Product of BizzmanWeb Pvt. Ltd</h3>
                        
                           <form id="form1" runat="server" class="signin-form">
                            <div class="form-group">

                                <asp:TextBox runat="server" class="form-control" ID="txtuser" placeholder="Email" />
                            </div>
                            <div class="form-group">

                                <asp:TextBox runat="server" ID="txtpassword" class="form-control" placeholder="Password" TextMode="Password" />
                                 <!--<span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> -->
                            </div>
                            <div class="form-group">

                                <asp:Button runat="server" OnClick="btn_login_Click" class="form-control btn btn-primary submit px-3" style="background-color: #3AADAA; color: aliceblue" Text="Login" ID="btn_login" />
                                <asp:Label ID="messagelbl" runat="server" Text="" class="label label-danger" style="text-align: center;color: red; margin-left: 75px;" />
                            </div>
                            <div class="form-group d-md-flex">
                                <div class="w-50">
                                    <label class="checkbox-wrap checkbox-primary">Remember Me
                                        <input type="checkbox" checked="checked" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div class="w-50 text-md-right">
                                    &nbsp;</div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="js/bt.min.js"></script>
    <script src="js/poppar.js"></script>
    <script src="js/jqq.min.js"></script>
    <script src="js/Maino.js"></script>

</body>
</html>