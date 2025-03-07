--select Id,MaterialName,
--(select isnull(Sum(QtyBalance),0) from tblMmMaterialStockMaster inner join tblFaWarehouseMaster on tblFaWarehouseMaster.Id = tblMmMaterialStockMaster.WarehouseId 
--inner join tblHrBranchMaster on tblHrBranchMaster.BranchCode=tblFaWarehouseMaster.BranchCode 
--where tblFaWarehouseMaster.BranchCode='001' and MaterialMasterId=MM.Id) as Stock from tblMmMaterialMaster MM


-- Stored Procedure: procMnfManufactureDemandslip
CREATE OR ALTER PROCEDURE procMnfManufactureDemandslip
    @DemandIssueNo NVARCHAR(50),
    @DateTime DATETIME,
    @ReferenceID NVARCHAR(50),
    @CounterNo NVARCHAR(50),
    @ReceiptDate DATETIME,
    @User NVARCHAR(50),
    @IsUpdate BIT,
    @XMLData XML
AS
BEGIN
    SET NOCOUNT ON;
    
    IF @IsUpdate = 1
    BEGIN
        UPDATE tblMnfManufactureDemandslipMaster
        SET DateTime = @DateTime,
            ReferenceID = @ReferenceID,
            CounterNo = @CounterNo,
            ReceiptDate = @ReceiptDate,
            CreatedBy = @User,
            CreatedDate = GETDATE()
        WHERE DemandIssueNo = @DemandIssueNo;

        DELETE FROM tblMnfManufactureDemandslipDetail WHERE DemandIssueNo = @DemandIssueNo;
    END
    ELSE
    BEGIN
        INSERT INTO tblMnfManufactureDemandslipMaster (DemandIssueNo, DateTime, ReferenceID, CounterNo, ReceiptDate, CreatedBy, CreatedDate)
        VALUES (@DemandIssueNo, @DateTime, @ReferenceID, @CounterNo, @ReceiptDate, @User, GETDATE());
    END

    INSERT INTO tblMnfManufactureDemandslipDetail (DemandIssueNo, MaterialID, MaterialName, Quantity, Stock)
    SELECT 
        @DemandIssueNo, 
        x.Data.value('(MaterialID)[1]', 'NVARCHAR(50)'),
        x.Data.value('(MaterialName)[1]', 'NVARCHAR(255)'),
        x.Data.value('(Quantity)[1]', 'DECIMAL(18,2)'),
        x.Data.value('(Stock)[1]', 'DECIMAL(18,2)')
    FROM @XMLData.nodes('/DemandSlipList/DemandSlipDetail') AS x(Data);
END;
