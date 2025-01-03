<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfAdminLogin.aspx.cs" Inherits="BizzManWebErp.wfAdminLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">


</head>
<body>
       <div class="container py-5">
		<div class="row">
			<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
				<div style="max-width: 300px;" class="card border-0 mx-auto bg-100 my-5">
					<div class="card-body">
			        <div class="text-center pb-3 border-bottom mb-4">
                            <img alt="Logo" style="max-height:120px; max-width: 100%; width:auto">
                        </div>
						
						<form id="form1" runat="server">
                            <label for="exampleFormControlInput1" class="form-label">Email</label>
							<div class=" mb-3">
                                
								<asp:TextBox runat="server" class="form-control rounded border-dark" ID="txtuser" placeholder="Email" />
								
							</div>
                            <label for="exampleFormControlInput1" class="form-label">Password</label>
							<div class=" mb-3">
                                
								<asp:TextBox runat="server" ID="txtpassword" class="form-control rounded border-dark"  placeholder="Password" TextMode="Password"/>
								
							</div>
						

						<div class="d-grid">
							<asp:Button runat="server" OnClick="btn_login_Click" class="btn mt-15  btn-login text-uppercase fw-bold " style="background-color: #3AADAA; color: aliceblue" Text="Login" ID="btn_login"/>
                            <asp:Label ID="messagelbl" runat="server" Text="" class="label label-danger" style="text-align: center;color: red;"/> 
                            <div class="justify-content-between mt-2 d-flex small" style="color: currentcolor"> 
                                  <a href="#">Don't have an account?</a>
                             <div class="d-flex flex-row-reverse ">
                                <a href="#">Reset Password</a>
                               </div>
                             </div>

						</div>
                       </form>
					</div>
				</div>
			</div>
		</div>
	</div>     
       
</body>
</html>