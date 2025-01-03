$(document).ready(function () {
    $("button").click(function (event) {
        event.preventDefault();
    });
    $("#btntitle").html('Pipeline');
    BindPipelineMaster();

    
});

function ViewAssignActivity() {
    $('#divPipelineList').show();
    $('#divPipelineEntry').hide();
    
    BindPipelineMaster();
}
function Title() {
    window.location = "wfCrmSunPipeline.aspx";
}

function BindPipelineMaster() {
    
    $.ajax({
        type: "POST",
        url: 'wfCrmSunPipeline.aspx/BindPipelineDetails',
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (response) {
            var data = JSON.parse(response.d);
            $('#tblPipelinelist').DataTable().clear();
            $('#tblPipelinelist').DataTable().destroy();
            $('#tbody_Pipeline_list').html('');
            var html = '';
            for (var i = 0; i < JSON.parse(response.d).length; i++) {

                html = html + '<tr><td style="white-space: nowrap;">' + data[i].LeadID + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].CustomerName == undefined ? '' : data[i].CustomerName) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].ContactNo == undefined ? '' : data[i].ContactNo) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].LeadNote == undefined ? '' : data[i].LeadNote) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].LeadSource == undefined ? '' : data[i].LeadSource) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AssignedPerson == undefined ? '' : data[i].AssignedPerson) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Date == undefined ? '' : data[i].Date) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].Priority == undefined ? '' : data[i].Priority) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].DueDate == undefined ? '' : data[i].DueDate) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].FollowUpType == undefined ? '' : data[i].FollowUpType) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].FollowUpStatus == undefined ? '' : data[i].FollowUpStatus) + '</td>'
                    + '<td style="white-space: nowrap;">' + (data[i].AssignNote == undefined ? '' : data[i].AssignNote) + '</td></tr>'

            }
            $('#tbody_PipeLine_list').html(html);
            $('#tblPipelinelist').DataTable();
          

        },
        complete: function () {

        },
        failure: function (jqXHR, textStatus, errorThrown) {

        }
    });

}