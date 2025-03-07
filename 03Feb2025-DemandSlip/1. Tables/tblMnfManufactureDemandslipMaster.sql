-- Table: tblMnfManufactureDemandslipMaster
--SELECT *, FORMAT(DateTime, 'dd-MM-yyyy HH:mm:ss') AS FormattedDateTime,FORMAT(ReceiptDate, 'dd-MM-yyyy HH:mm:ss') AS FormattedReceiptDate FROM tblMnfManufactureDemandslipMaster

select * from tblMnfManufactureDemandslipMaster
CREATE TABLE tblMnfManufactureDemandslipMaster (
    DemandIssueNo NVARCHAR(50) PRIMARY KEY,
    DateTime DATETIME NOT NULL,
    ReferenceID NVARCHAR(50) NOT NULL,
    CounterNo NVARCHAR(50) NOT NULL,
    ReceiptDate DATETIME NOT NULL,
    CreatedBy NVARCHAR(50) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE()
);