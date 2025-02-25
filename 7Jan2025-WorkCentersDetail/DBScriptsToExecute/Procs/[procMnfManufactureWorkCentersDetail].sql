
CREATE OR ALTER  PROC [dbo].[procMnfManufactureWorkCentersDetail]   
    @MachineType [nvarchar](60) = Null,
	@Capacity [nvarchar](20) = Null,
	@MaterialId int = Null,
	@Cost int,
	@SetupTime int,
	@LocationId int = Null,
	@Remark [nvarchar](max) = NULL,
	@CreateUser [nvarchar](50) = NULL,
	@UpdateUser [nvarchar](50) = NULL,
	@Id [nvarchar](50) = NULL,
	@IsUpdate bit=0
AS
	
BEGIN
IF(@IsUpdate=1)
BEGIN
	Update [tblMnfWorkCentersDetail]
	SET 
	MachineType=@MachineType,
	Capacity=@Capacity,
	materialId=@MaterialId,
	Cost=@Cost,
	SetupTime=@SetupTime,
	LocationId=@LocationId,
	Remark=@Remark,
	UpdateUser=@UpdateUser,
	UpdateDate=getdate()
	WHERE Id=@Id
END
ELSE
BEGIN
	INSERT INTO dbo.[tblMnfWorkCentersDetail] 
	(Id,
	MachineType,
	Capacity,
	materialId,
	Cost,
	SetupTime,
	LocationId,
	Remark,
	CreateUser)
	SELECT
	@Id,
	@MachineType,
	@Capacity,
	@MaterialId,
	@Cost,
	@SetupTime,
	@LocationId,
	@Remark,
	@CreateUser
END
    
END 
