-- Table: tblMnfManufactureDemandslipDetail
CREATE TABLE tblMnfManufactureDemandslipDetail (
    DetailID INT IDENTITY(1,1) PRIMARY KEY,
    DemandIssueNo NVARCHAR(50) NOT NULL,
    MaterialID NVARCHAR(50) NOT NULL,
    MaterialName NVARCHAR(255) NOT NULL,
    Quantity DECIMAL(18,2) NOT NULL,
    Stock DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (DemandIssueNo) REFERENCES tblMnfManufactureDemandslipMaster(DemandIssueNo)
);