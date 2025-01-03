<%@ Page Title="" Language="C#" MasterPageFile="~/InventMainMenu.Master" AutoEventWireup="true" CodeBehind="wfInventPutwayRule.aspx.cs" Inherits="BizzManWebErp.wfInventPutwayRule" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/style.css" rel="stylesheet" />   
    <script src="Scripts/bootstrap.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/InventPutawayRule.css" rel="stylesheet" />
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/moment.min.js"></script>
    <script src="Scripts/InventPutwayPule.js"></script>    
    <script src="Scripts/jquery-ui.min.js"></script>   
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" id="loginuser" runat="server" />
  
    <%--dynamic breadcrumbs--%>
    <button id="btntitle" class="LabelTitle" onclick="Title();">Putaways Rules</button><br />
    <%--dynamic breadcrumbs--%>
    <button onclick="CreatePutaway();" id="btnCreate">Create</button>
    <%--<button onclick="ViewWarehouse();">View</button>--%>
    <button onclick="SavePutaway();" style="display: none;" id="btnSave">Save</button>
    <button onclick="Discard();" style="display: none;" id="btnDiscard">Discard</button>


   

    <div class="container" id="putawayrulelist" style="margin-top: 10px; width:100%; overflow: auto;">
        <table class="display" id="tblputawaylist">
            <thead>
                <tr>
                    <th style="white-space: nowrap;">
                        <input type="checkbox"  name="selectAll"></th>
                    
                    <th style="white-space: nowrap;">Product</th>      
                    <th style="white-space: nowrap;" >Product Category</th>
                    <th style="white-space: nowrap;" >When product arrives in</th>
                    <th style="white-space: nowrap;" >Store to</th>
                    <th style="white-space: nowrap;" >Branch</th>
                </tr>
            </thead>
            <tbody id="tbody_putaway_list" >
              
            </tbody>
        </table>

        <%--	<a href="#" class="list_add">Add one row</a>
		<br class="clear" />

		<div class="action_btn">
			<input name="submit" class="action_btn submit"
				type="submit" value="Edit" />
		</div>--%>
    </div>



    <%--<script>
		function addNewRow() {
			var template = $("tr.trow:first");
			$(".no_entries_row").css("display", "none");
			var newRow = template.clone();
			var lastRow = $("tr.trow:last").after(newRow);

			$(".list_cancel").on("click", function(event) {
				event.stopPropagation();
				event.stopImmediatePropagation();
				$(this).closest("tr").remove();
				if ($(".list_cancel").length === 1) {
					$(".no_entries_row")
						.css("display", "inline-block");
				}
				console.log($(".list_cancel").length);
			});
			console.log($(".list_cancel").length);
			$("select.label").on("change", function(event) {
				event.stopPropagation();
				event.stopImmediatePropagation();
				$(this).css("background-color", $(this).val());
			});
		}

		$("a.list_add").on("click", addNewRow);
    </script>--%>
</asp:Content>
