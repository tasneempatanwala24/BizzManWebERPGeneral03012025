<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfErpMain.aspx.cs" Inherits="BizzManWebErp.wfErpMain" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ERP Main</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

</head>

<body>
    <form id="form1" runat="server">
        
        <div class="container" style="margin-top:20px;">
            <div class="row">
              <div class="col-sm-4">
                <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <img src="https://cdn-icons-png.flaticon.com/512/1802/1802749.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">Accounts</h5>
                            <a href="wfFaMainMenu.aspx" class="btn btn-light text-dark">Open</a>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
              
                <div class="col-sm-4">
                <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/employee-data-2-770562.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">HRMS</h5>
                            <a href="wfHrHrmsMain.aspx" class="btn btn-light text-dark">Open</a>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>

                <div class="col-sm-4">
                <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <img src="https://cdn4.iconfinder.com/data/icons/logistics-delivery-2-5/64/136-512.png"class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title" style="font-size: 15px;">Material Management(MM)</h5>
                            <a href="wfMmMainMenu.aspx" class="btn btn-light text-dark">Open</a>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            
            </div>
        
        </div>
    </form>
</body>
</html>
