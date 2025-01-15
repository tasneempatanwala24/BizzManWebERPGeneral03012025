 ---Exec procMnfManufactureBomDetail 2,23,4,'SubContracting','WC002','OP2',67,'admin','','BM009',0,'<BOMList><BOMListDetail><MaterialId>4</MaterialId><Qty>111</Qty><UOM>4</UOM></BOMListDetail></BOMList>' 
CREATE  OR ALTER  PROC [dbo].[procMnfManufactureBomDetail]    
 @MaterialId int = Null,  
 @Quantity float = 0,  
 @UOM int = Null,  
 @BOMType [nvarchar](50) = NULL,
 @WorkCenter [nvarchar](20)= NULL,  
 @Operation [nvarchar](20)= NULL, 
 @Duration int = NULL,  
 @CreateUser [nvarchar](50) = NULL,  
 @UpdateUser [nvarchar](50) = NULL,  
 @Id [nvarchar](50) = NULL,  
 @IsUpdate bit=0,
 @XMLData AS XML 
AS  
   
BEGIN  
Declare @TotalRecords int=0,@LoopCount int=1 
IF(@IsUpdate=1)  
BEGIN  
Select 'Update'
 --Update [tblMnfWorkCentersDetail]  
 --SET   
 --MachineType=@MachineType,  
 --Capacity=@Capacity,  
 --materialId=@MaterialId,  
 --Cost=@Cost,  
 --SetupTime=@SetupTime,  
 --LocationId=@LocationId,  
 --Remark=@Remark,  
 --UpdateUser=@UpdateUser,  
 --UpdateDate=getdate()  
 --WHERE Id=@Id  
END  
ELSE  
BEGIN  
	INSERT INTO dbo.[tblMnfManufactureBomMaster]   
	(Id,
	MaterialId,
	Quantity,
	UOMID,
	BOMType,
	WorkCenterID,
	Operation,
	Duration,
	CreateUser)  
	SELECT  
	@Id,  
	@MaterialId,  
	@Quantity,  
	@UOM, 
	@BOMType,
	@WorkCenter,  
	@Operation,  
	@Duration,  
	@CreateUser  
END  

--DETAILS
SELECT @TotalRecords = @xmlData.value('count(/BOMList/BOMListDetail)', 'int')     
WHILE @LoopCount <= @TotalRecords                                                                                               
BEGIN                      
	INSERT INTO tblMnfManufactureBomDetail (BOMID,
	MaterialId,
	Quantity,
	UOMID,CreateUser)          
	select @Id,p.n.value('MaterialId[1]', 'int')
	,p.n.value('Qty[1]', 'float')                
	,p.n.value('UOM[1]', 'int'),@CreateUser  
	from  @XmlData.nodes('/BOMList/BOMListDetail[sql:variable("@LoopCount")]') AS p(n)                        
SET @LoopCount = @LoopCount + 1                     
END          
END   