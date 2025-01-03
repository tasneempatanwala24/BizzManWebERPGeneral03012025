$(document).ready(function () {
    function getQueryStringValue(name) {
        var queryString = window.location.search.substring(1); // Get the query string without '?'
        var queryParams = queryString.split('&'); // Split by '&'
        for (var i = 0; i < queryParams.length; i++) {
            var pair = queryParams[i].split('='); // Split by '='
            if (decodeURIComponent(pair[0]) === name) {
                return decodeURIComponent(pair[1]); // Return the value of the parameter
            }
        }
        return null; // Return null if the parameter isn't found
    }

    // Retrieve 'id' and 'vId' from the query string
    var Id = getQueryStringValue('id'); // Assuming 'id' is loanAppId
    var vId = getQueryStringValue('vId');
    $.ajax({

        type: "POST",
        url: "wfMnfJlrJobCardMaster_display.aspx/FectchJobCardDetails",
        data: JSON.stringify({
            "Id": Id
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonData = JSON.parse(response.d);
            if (vId == 1) {
                $("#btnPdf").show();
                $("#exportButton").hide();
                populateTable(jsonData);
            }
            else if (vId == 2) {
                $("#btnPdf").hide();
                $("#exportButton").show();
                populateExcelTable(jsonData);
            }
            
            
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });    

    function populateTable(data) {
        var container = $('#tableContainer');
        var tableHTML = '<table class="center" id="search_form" style="width:90%;border:solid 1px black;padding:5px;">'
            + '<tr><td colspan="4" style="text-align:center;"><h3>Job Card</h3></td></tr>'
            + '<tr>' +
            '<td colspan="4">' +
            '<div style="display: flex; justify-content: space-between; align-items: center;">' +
            '<div style="text-align: left; flex: 1;">' +
            '<div>' + data.Table3[0].CompanyName + '</div>' +
            '<div>' + data.Table3[0].Address1 + '</div>' +
            '</div>' +
            '<div style="text-align: right;">' +
            '<img src="Images/logo.png" style="width:150px;height:150px;"/>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>'
            + '<tr><td><b> DEALER </b></td><td>' + data.Table1[0].CustomerName + '</td><td colspan="2"></td></tr>'
            + '<tr><td><b> ORDER NO </b></td><td>' + data.Table1[0].OrderNo + '</td><td><b>ORDER DATE </b></td>'
            + '<td>' + data.Table1[0].OrderDate + '</td></tr>'
            + '<tr><td><b> REFERENCE ORDER NO. </b></td><td>' + data.Table1[0].ReferenceOrderNo + '</td><td><b> ORDER RECEIVED DATE </b></td><td>'
            + data.Table1[0].OrderReceivedDate + '</td></tr>'
            + '<tr><td><b> CAD ISSUE DATE </b></td><td>' + data.Table1[0].CadIssueDate + '</td><td><b>CAD APPROVE DATE </b></td>'
            + '<td>' + data.Table1[0].CadApproveDate + '</td></tr>'
            + '<tr><td><b> DIAMOND RECEIVED DATE </b></td><td>' + data.Table1[0].DiamondReceivedDate + '</td><td><b>  DELIVERY DATE </b></td><td>'
            + data.Table1[0].DeliveryDate + '</td></tr>'
            + '<tr><td><b> DIAMOND QUALITY </b></td><td>' + data.Table1[0].DiamondQuality + '</td><td><b>PARTY DIAMOND </b></td>'
            + '<td>' + data.Table1[0].PartyDiamond + '</td></tr>'
            + '<tr><td><b> DIAMOND REFERENCE NO. </b></td><td>' + data.Table1[0].PartyDiamondReferenceNo + '</td><td><b>TYPE </b></td><td>'
            + data.Table1[0].Type + '</td></tr>'
            + '<tr><td><b> DESCRIPTION </b></td><td colspan="3">' + data.Table1[0].Description + '</td></tr>'
            + '<tr><td colspan="4"><table id="search_form" style="width:100%;"><tr><td style="text-align:center;"><b>Sr No.</b></td><td style="text-align:center;"><b>Product</b></td>'
            + '<td style="text-align:center;"><b>Design No / J-Number</b></td>'
            + '<td style="text-align:center;"><b>Customer Image</b></td><td style="text-align:center;"><b>Cad Image</b></td>'
            + '<td style="text-align:center;"><b>Finished Final Image</b></td><td style="text-align:center;"><b>Additional Image</b></td></tr>';

        for (var i = 0; i < data.Table2.length; i++) {
            tableHTML += '<tr>'
                + '<td>' + data.Table2[i].SlNo + '</td>'
                + '<td>' + data.Table2[i].MaterialName + '</td>'
                + '<td>' + data.Table2[i].DesignNo + '</td>'
                + '<td><img src="data:image/png;base64,' + data.Table2[i].CustomerImage + '" style="width:100px;height:100px;"/></td>'
                + '<td><img src="data:image/png;base64,' + data.Table2[i].CadImage + '" style="width:100px;height:100px;"/></td>'
                + '<td><img src="data:image/png;base64,' + data.Table2[i].FinishedFinalImage + '" style="width:100px;height:100px;"/></td>'
                + '<td><img src="data:image/png;base64,' + data.Table2[i].AdditionalImage + '" style="width:100px;height:100px;"/></td>'
                + '</tr>' 
                + '<tr><td colspan="7"><table style="width:100%;" id="search_form">'
                + '<tr><td style="text-align:center;"><b>Approx Wgt</b></td><td style="text-align:center;"><b>Polish</b></td><td style="text-align:center;"><b>Pcs</b></td><td style="text-align:center;"><b>Size</b></td>'
                + '<td style="text-align:center;"><b>Length</b></td><td style="text-align:center;"><b>Diamond Weight</b></td>'
                + '<td style="text-align:center;"><b>Diamond Pieces</b></td></tr>'
                + '<tr>'
                + '<td style="text-align:right;">' + data.Table2[i].ApproxWeight.toFixed(4) + '</td>'
                + '<td>' + data.Table2[i].Polish + '</td>'
                + '<td style="text-align:right;">' + data.Table2[i].Pcs.toFixed(4) + '</td>'
                + '<td style="text-align:right;">' + data.Table2[i].Size.toFixed(4) + '</td>'
                + '<td style="text-align:right;">' + data.Table2[i].Length.toFixed(4) + '</td>'
                + '<td style="text-align:right;">' + data.Table2[i].DiamondWeight.toFixed(4) + '</td>'
                + '<td style="text-align:right;">' + data.Table2[i].DiamondPices.toFixed(4) + '</td>'
                + '</tr>'                 
                + '<tr><td colspan="7"> <b>Remark :</b> ' + data.Table2[i].Remark + '</td></tr></table>'
                + '</td></tr>'
                + '</tr>';
        }

        tableHTML += '</table></td></tr>';
        tableHTML += '</table>';

        // Clear previous content and append the new table
        container.empty().append(tableHTML);
    }
    function populateExcelTable(data) {
        var tableHTML = '<table class="center" id="search_form" style="width:90%; border: solid 1px black; padding: 5px;">' +
            '<tr><td colspan="4" style="text-align:center;"><h3>Job Card</h3></td></tr>' +
            '<tr>' +
            '<td colspan="4">' +
            '<div style="display: flex; justify-content: space-between; align-items: center;">' +
            '<div style="text-align: left; flex: 1;">' +
            '<div>' + data.Table3[0].CompanyName + '</div>' +
            '<div>' + data.Table3[0].Address1 + '</div>' +
            '</div>' +
            '<div style="text-align: right;">' +
            '<img src="Images/logo.png" style="width:150px; height:150px;" />' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '<tr><td><b> DEALER </b></td><td>' + data.Table1[0].CustomerName + '</td><td colspan="2"></td></tr>' +
            '<tr><td><b> ORDER NO </b></td><td>' + data.Table1[0].OrderNo + '</td><td><b>ORDER DATE </b></td>' +
            '<td>' + data.Table1[0].OrderDate + '</td></tr>' +
            '<tr><td><b> REFERENCE ORDER NO. </b></td><td>' + data.Table1[0].ReferenceOrderNo + '</td><td><b> ORDER RECEIVED DATE </b></td><td>' +
            data.Table1[0].OrderReceivedDate + '</td></tr>' +
            '<tr><td><b> CAD ISSUE DATE </b></td><td>' + data.Table1[0].CadIssueDate + '</td><td><b>CAD APPROVE DATE </b></td>' +
            '<td>' + data.Table1[0].CadApproveDate + '</td></tr>' +
            '<tr><td><b> DIAMOND RECEIVED DATE </b></td><td>' + data.Table1[0].DiamondReceivedDate + '</td><td><b> DELIVERY DATE </b></td><td>' +
            data.Table1[0].DeliveryDate + '</td></tr>' +
            '<tr><td><b> DIAMOND QUALITY </b></td><td>' + data.Table1[0].DiamondQuality + '</td><td><b>PARTY DIAMOND </b></td>' +
            '<td>' + data.Table1[0].PartyDiamond + '</td></tr>' +
            '<tr><td><b> DIAMOND REFERENCE NO. </b></td><td>' + data.Table1[0].PartyDiamondReferenceNo + '</td><td><b>TYPE </b></td><td>' +
            data.Table1[0].Type + '</td></tr>' +
            '<tr><td><b> DESCRIPTION </b></td><td colspan="3">' + data.Table1[0].Description + '</td></tr>' +
            '<tr><td colspan="4"><table id="search_form" style="width:100%; border: solid 1px black; border-collapse: collapse;">' +
            '<tr style="background-color: #f2f2f2;">' +
            '<td style="border: solid 1px black; text-align:center;"><b>Sr No.</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Product</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Design No / J-Number</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Customer Image</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Cad Image</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Finished Final Image</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Additional Image</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Approx Wgt</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Polish</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Pcs</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Size</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Length</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Diamond Weight</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Diamond Pieces</b></td>' +
            '<td style="border: solid 1px black; text-align:center;"><b>Remark</b></td>' +
            '</tr>';

        // Iterate through Table2 to populate rows
        for (var i = 0; i < data.Table2.length; i++) {
            const customerImageBase64 = data.Table2[i].CustomerImage; //? convertToBase64(data.Table2[i].CustomerImage) : '';
            const cadImageBase64 = data.Table2[i].CadImage;// ? convertToBase64(data.Table2[i].CadImage) : '';
            const finishedFinalImageBase64 = data.Table2[i].FinishedFinalImage;// ? convertToBase64(data.Table2[i].FinishedFinalImage) : '';
            const additionalImageBase64 = data.Table2[i].AdditionalImage;// ? convertToBase64(data.Table2[i].AdditionalImage) : '';
            tableHTML += '<tr>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].SlNo + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].MaterialName + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].DesignNo + '</td>' +
                '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + customerImageBase64 + '" style="width:100px; height:100px;"/></td>' +
                '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + cadImageBase64 + '" style="width:100px; height:100px;"/></td>' +
                '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + finishedFinalImageBase64 + '" style="width:100px; height:100px;"/></td>' +
                '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + additionalImageBase64 + '" style="width:100px; height:100px;"/></td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].ApproxWeight.toFixed(4) + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].Polish + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].Pcs.toFixed(4) + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].Size.toFixed(4) + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].Length.toFixed(4) + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].DiamondWeight.toFixed(4) + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].DiamondPices.toFixed(4) + '</td>' +
                '<td style="border: solid 1px black;">' + data.Table2[i].Remark + '</td>' +
                '</tr>';
        }

        tableHTML += '</table></td></tr>'; // Close the inner table and outer table
        tableHTML += '</table>'; // Close the main table

        // Clear any previous content and append the new table
        $('#tableContainer').empty().append(tableHTML);
    }
    async function exportToExcel(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Job Card');

        // Add header row
        const headerRow = worksheet.addRow([
            'DEALER', 'ORDER NO', 'ORDER DATE', 'REFERENCE ORDER NO.',
            'ORDER RECEIVED DATE', 'CAD ISSUE DATE', 'CAD APPROVE DATE',
            'DIAMOND RECEIVED DATE', 'DELIVERY DATE', 'DIAMOND QUALITY',
            'PARTY DIAMOND', 'DIAMOND REFERENCE NO.', 'TYPE', 'DESCRIPTION'
        ]);

        // Style header row to be bold
        headerRow.eachCell({ includeEmpty: true }, (cell) => {
            cell.font = { bold: true };
        });

        // Add data rows
        data.Table1.forEach(item => {
            worksheet.addRow([
                item.CustomerName, item.OrderNo, item.OrderDate,
                item.ReferenceOrderNo, item.OrderReceivedDate,
                item.CadIssueDate, item.CadApproveDate,
                item.DiamondReceivedDate, item.DeliveryDate,
                item.DiamondQuality, item.PartyDiamond,
                item.PartyDiamondReferenceNo, item.Type,
                item.Description
            ]);
        });

        worksheet.addRow([]);
        const detailsHeaderRow = worksheet.addRow([
            'Sr. No', 'Product', 'Design No / J-Number', 'Customer Image',
            'Cad Image', 'Finished Final Image', 'Additional Image',
            'Approx Wgt', 'Polish', 'Pcs',
            'Size', 'Length', 'Diamond Weight', 'Diamond Pieces',
            'Remark'
        ]);

        // Style details header row to be bold
        detailsHeaderRow.eachCell({ includeEmpty: true }, (cell) => {
            cell.font = { bold: true };
        });

        data.Table2.forEach((item, index) => {
            const rowIndex = data.Table2.length + 3 + index;
            const customerImageBase64 = item.CustomerImage;
            const cadImageBase64 = item.CadImage;
            const finishedFinalImageBase64 = item.FinishedFinalImage;
            const additionalImageBase64 = item.AdditionalImage;

            // Add image
            const images = [
                { base64: customerImageBase64, extension: 'png' },
                { base64: cadImageBase64, extension: 'png' },
                { base64: finishedFinalImageBase64, extension: 'png' },
                { base64: additionalImageBase64, extension: 'png' }
            ];

            images.forEach((image, imageIndex) => {
                if (image.base64) {
                    const imageId = workbook.addImage({
                        base64: image.base64,
                        extension: image.extension,
                    });

                    worksheet.addImage(imageId, {
                        tl: { col: 3 + imageIndex, row: rowIndex },
                        ext: { width: 100, height: 100 }
                    });
                }
            });

            worksheet.addRow([
                item.SlNo, item.MaterialName, item.DesignNo,
                // placeholder for images
                '', '', '', '',
                item.ApproxWeight.toFixed(4), item.Polish, item.Pcs.toFixed(4),
                item.Size.toFixed(4), item.Length.toFixed(4),
                item.DiamondWeight.toFixed(4), item.DiamondPices.toFixed(4),
                item.Remark
            ]);
        });

        // Generate and save the Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), 'JobCard.xlsx');
    }

    $('#exportButton').click(function () {
        $.ajax({
            type: "POST",
            url: "wfMnfJlrJobCardMaster_display.aspx/FectchJobCardDetails",
            data: JSON.stringify({ "Id": Id }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var jsonData = JSON.parse(response.d);
                populateTableToExcel(jsonData);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });
    function base64ToBlob(base64, contentType = '') {
        const sliceSize = 512;
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    async function populateTableToExcel(data) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Job Card');

        // Define border style
        const borderStyle = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        const headerStyle = {
            font: { bold: true },
            alignment: { horizontal: 'center' },
            border: borderStyle,
        };

        const cellStyle = {
            border: borderStyle,
        };

        const imageWidth = 80;
        const imageHeight = 50;

        worksheet.mergeCells('A1:D1');
        worksheet.getCell('A1').value = 'Job Card';
        worksheet.getCell('A1').style = headerStyle;

        worksheet.mergeCells('A2:B2');
        worksheet.getCell('A2').value = `${data.Table3[0].CompanyName}\n${data.Table3[0].Address1}`;
        worksheet.getCell('A2').style = {
            alignment: { vertical: 'middle', horizontal: 'left' },
            border: borderStyle,
        };

        // Add logo image
        const logoImagePath = 'Images/logo.png'; // Adjust this path as needed
        try {
            const response = await fetch(logoImagePath);
            const arrayBuffer = await response.arrayBuffer();
            const logoImageId = workbook.addImage({
                buffer: arrayBuffer,
                extension: 'png',
            });
            worksheet.addImage(logoImageId, {
                tl: { col: 2, row: 1 },
                ext: { width: imageWidth, height: imageHeight },
            });
        } catch (error) {
            console.error('Error fetching or adding logo image:', error);
        }

        // Adjust column widths and row heights
        worksheet.getColumn(3).width = imageWidth / 7; // Adjust according to your needs
        worksheet.getColumn(4).width = imageWidth / 7;
        worksheet.getColumn(5).width = imageWidth / 7;
        worksheet.getColumn(6).width = imageWidth / 7;

        worksheet.eachRow({ includeEmpty: true }, row => {
            row.height = imageHeight / 10; // Adjust row height accordingly
        });

        // Add table header rows with borders
        const headers = [
            ['DEALER', data.Table1[0].CustomerName, '', ''],
            ['ORDER NO', data.Table1[0].OrderNo, 'ORDER DATE', data.Table1[0].OrderDate],
            ['REFERENCE ORDER NO.', data.Table1[0].ReferenceOrderNo, 'ORDER RECEIVED DATE', data.Table1[0].OrderReceivedDate],
            ['CAD ISSUE DATE', data.Table1[0].CadIssueDate, 'CAD APPROVE DATE', data.Table1[0].CadApproveDate],
            ['DIAMOND RECEIVED DATE', data.Table1[0].DiamondReceivedDate, 'DELIVERY DATE', data.Table1[0].DeliveryDate],
            ['DIAMOND QUALITY', data.Table1[0].DiamondQuality, 'PARTY DIAMOND', data.Table1[0].PartyDiamond],
            ['DIAMOND REFERENCE NO.', data.Table1[0].PartyDiamondReferenceNo, 'TYPE', data.Table1[0].Type],
            ['DESCRIPTION', data.Table1[0].Description, '', '']
        ];

        headers.forEach((row) => {
            const newRow = worksheet.addRow(row);
            newRow.eachCell({ includeEmpty: true }, cell => {
                cell.style = cellStyle;
            });
        });

        // Add table header for images with borders
        worksheet.addRow(['Sr No.', 'Product', 'Design No / J-Number', 'Customer Image', 'Cad Image', 'Finished Final Image', 'Additional Image'])
            .eachCell({ includeEmpty: true }, cell => {
                cell.style = headerStyle;
            });

        for (const item of data.Table2) {
            worksheet.addRow([
                item.SlNo,
                item.MaterialName,
                item.DesignNo,
            ]);

            // Add images to the correct positions
            const rowIndex = worksheet.lastRow.number;

            const addImageToCell = async (base64Image, col, row) => {
                if (base64Image) {
                    try {
                        const imageBlob = base64ToBlob(base64Image, 'image/png');
                        const imageId = workbook.addImage({
                            buffer: await imageBlob.arrayBuffer(),
                            extension: 'png',
                        });
                        worksheet.addImage(imageId, {
                            tl: { col: col, row: row },
                            ext: { width: imageWidth, height: imageHeight },
                            editAs: 'oneCell',
                        });
                    } catch (error) {
                        console.error(`Error adding image to cell ${col}, ${row}:`, error);
                    }
                }
            };

            await addImageToCell(item.CustomerImage, 3, rowIndex);
            await addImageToCell(item.FinishedFinalImage, 5, rowIndex);
            await addImageToCell(item.AdditionalImage, 6, rowIndex);

            // Merge cells for "Cad Image" across three rows
            worksheet.mergeCells(rowIndex, 4, rowIndex + 2, 4); // Merging three rows for "Cad Image" column

            await addImageToCell(item.CadImage, 4, rowIndex);

            worksheet.addRow([
                '', '', '', '', '', '', ''
            ]);

            worksheet.addRow(['Approx Wgt', 'Polish', 'Pcs', 'Size', 'Length', 'Diamond Weight', 'Diamond Pieces'])
                .eachCell({ includeEmpty: true }, cell => {
                    cell.style = headerStyle;
                });

            worksheet.addRow([
                item.ApproxWeight.toFixed(4),
                item.Polish,
                item.Pcs.toFixed(4),
                item.Size.toFixed(4),
                item.Length.toFixed(4),
                item.DiamondWeight.toFixed(4),
                item.DiamondPices.toFixed(4),
            ])
                .eachCell({ includeEmpty: true }, cell => {
                    cell.style = cellStyle;
                });

            worksheet.addRow([`Remark: ${item.Remark}`, '', '', '', '', '', ''])
                .eachCell({ includeEmpty: true }, cell => {
                    cell.style = cellStyle;
                });
        }

        // Generate and save the Excel file
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            saveAs(blob, 'JobCard.xlsx');
        }).catch(error => {
            console.error('Error writing Excel file:', error);
        });
    }


    //function populateExcelTable(data) {
    //    var container = $('#tableContainer');
    //    var tableHTML = '<table class="center" id="search_form" style="width:90%; border: solid 1px black; padding: 5px;">' +
    //        '<tr><td colspan="4" style="text-align:center;"><h3>Job Card</h3></td></tr>' +
    //        '<tr>' +
    //        '<td colspan="4">' +
    //        '<div style="display: flex; justify-content: space-between; align-items: center;">' +
    //        '<div style="text-align: left; flex: 1;">' +
    //        '<div>' + data.Table3[0].CompanyName + '</div>' +
    //        '<div>' + data.Table3[0].Address1 + '</div>' +
    //        '</div>' +
    //        '<div style="text-align: right;">' +
    //        '<img src="Images/logo.png" style="width:150px; height:150px;" />' +
    //        '</div>' +
    //        '</div>' +
    //        '</td>' +
    //        '</tr>' +
    //        '<tr><td><b> DEALER </b></td><td>' + data.Table1[0].CustomerName + '</td><td colspan="2"></td></tr>' +
    //        '<tr><td><b> ORDER NO </b></td><td>' + data.Table1[0].OrderNo + '</td><td><b>ORDER DATE </b></td>' +
    //        '<td>' + data.Table1[0].OrderDate + '</td></tr>' +
    //        '<tr><td><b> REFERENCE ORDER NO. </b></td><td>' + data.Table1[0].ReferenceOrderNo + '</td><td><b> ORDER RECEIVED DATE </b></td><td>' +
    //        data.Table1[0].OrderReceivedDate + '</td></tr>' +
    //        '<tr><td><b> CAD ISSUE DATE </b></td><td>' + data.Table1[0].CadIssueDate + '</td><td><b>CAD APPROVE DATE </b></td>' +
    //        '<td>' + data.Table1[0].CadApproveDate + '</td></tr>' +
    //        '<tr><td><b> DIAMOND RECEIVED DATE </b></td><td>' + data.Table1[0].DiamondReceivedDate + '</td><td><b>  DELIVERY DATE </b></td><td>' +
    //        data.Table1[0].DeliveryDate + '</td></tr>' +
    //        '<tr><td><b> DIAMOND QUALITY </b></td><td>' + data.Table1[0].DiamondQuality + '</td><td><b>PARTY DIAMOND </b></td>' +
    //        '<td>' + data.Table1[0].PartyDiamond + '</td></tr>' +
    //        '<tr><td><b> DIAMOND REFERENCE NO. </b></td><td>' + data.Table1[0].PartyDiamondReferenceNo + '</td><td><b>TYPE </b></td><td>' +
    //        data.Table1[0].Type + '</td></tr>' +
    //        '<tr><td><b> DESCRIPTION </b></td><td colspan="3">' + data.Table1[0].Description + '</td></tr>' +
    //        '<tr><td colspan="4"><table id="search_form" style="width:100%; border: solid 1px black; border-collapse: collapse;">' +
    //        '<tr style="background-color: #f2f2f2;">' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Sr No.</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Product</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Design No / J-Number</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Customer Image</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Cad Image</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Finished Final Image</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Additional Image</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Approx Wgt</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Polish</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Pcs</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Size</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Length</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Diamond Weight</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Diamond Pieces</b></td>' +
    //        '<td style="border: solid 1px black; text-align:center;"><b>Remark</b></td>' +
    //        '</tr>';

    //    // Iterate through Table2 to populate rows
    //    for (var i = 0; i < data.Table2.length; i++) {
    //        tableHTML += '<tr>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].SlNo + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].MaterialName + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].DesignNo + '</td>' +
    //            '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + data.Table2[i].CustomerImage + '" style="width:100px; height:100px;"/></td>' +
    //            '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + data.Table2[i].CadImage + '" style="width:100px; height:100px;"/></td>' +
    //            '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + data.Table2[i].FinishedFinalImage + '" style="width:100px; height:100px;"/></td>' +
    //            '<td style="border: solid 1px black;"><img src="data:image/png;base64,' + data.Table2[i].AdditionalImage + '" style="width:100px; height:100px;"/></td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].ApproxWeight.toFixed(4) + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].Polish + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].Pcs.toFixed(4) + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].Size.toFixed(4) + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].Length.toFixed(4) + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].DiamondWeight.toFixed(4) + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].DiamondPices.toFixed(4) + '</td>' +
    //            '<td style="border: solid 1px black;">' + data.Table2[i].Remark + '</td>' +
    //            '</tr>';
    //    }

    //    tableHTML += '</table></td></tr>'; // Close the inner table and outer table
    //    tableHTML += '</table>'; // Close the main table

    //    // Clear any previous content and append the new table
    //    container.empty().append(tableHTML);
    //}


});







