CREATE OR ALTER PROC [dbo].[procMnfManufactureBulkAutoProduction] 
    @Id VARCHAR(MAX),  
    @CreateUser VARCHAR(60)
AS    
BEGIN    
    DECLARE @xml XML;
    SET @xml = CAST('<i>' + REPLACE(@Id, ',', '</i><i>') + '</i>' AS XML);
    
    -- Add finished goods to stock
    INSERT INTO tblMmMaterialStockMaster(
        [EntryDate], [WarehouseId], [TransectionType], [TransectionId], [QtyIn], 
        [Rate], [QtyOut], [QtyBalance], [Active], [CreateUser], [CreateDate], MaterialMasterId)
    SELECT 
        a.CreateDate, '1', 'Auto Produce MO', a.Id, a.Quantity, 
        m.MRP, 0, a.Quantity, 'Y', @CreateUser, GETDATE(), a.materialID
    FROM tblMnfManufactureOrderMaster a 
    INNER JOIN tblMmMaterialMaster m ON a.materialId = m.Id
    WHERE a.Id IN (
        SELECT x.i.value('.', 'NVARCHAR(100)') FROM @xml.nodes('/i') AS x(i)
    )
    ORDER BY a.Id DESC;

    -- Deduct raw materials from stock
    INSERT INTO tblMmMaterialStockMaster(
        [EntryDate], [WarehouseId], [TransectionType], [TransectionId], [QtyIn], 
        [Rate], [QtyOut], [QtyBalance], [Active], [CreateUser], [CreateDate], MaterialMasterId)
    SELECT 
        a.CreateDate, '1', 'Auto Produce MO', a.OrderID, 0, 
        m.MRP, a.QuantityConsumed, -a.QuantityConsumed, 'Y', @CreateUser, GETDATE(), a.materialID
    FROM tblMnfManufactureOrderDetail a 
    INNER JOIN tblMmMaterialMaster m ON a.materialId = m.Id
    WHERE a.OrderID IN (
        SELECT x.i.value('.', 'NVARCHAR(100)') FROM @xml.nodes('/i') AS x(i)
    )
    ORDER BY a.Id DESC;

    -- Update manufacture order as auto-produced
    UPDATE tblMnfManufactureOrderMaster 
    SET isAutoProduce = 1, AutoProduceBy = @CreateUser, AutoProduceOn = GETDATE()
    WHERE Id IN (
        SELECT x.i.value('.', 'NVARCHAR(100)') FROM @xml.nodes('/i') AS x(i)
    );
END
