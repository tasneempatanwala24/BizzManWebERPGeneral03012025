 ---Exec [procMnfManufactureOrderDetail] 2,23,4,'SubContracting','WC002','OP2',67,'admin','','BM009',0,'<BOMList><BOMListDetail><MaterialId>4</MaterialId><Qty>111</Qty><UOM>4</UOM></BOMListDetail></BOMList>'   
CREATE  OR ALTER   PROC [dbo].[procMnfManufactureOrderDetail] 
 @Id [nvarchar](50) = NULL,    
 @BOMID [nvarchar](50)  = Null,    
 @ProductId int = 0,   
 @MOdate datetime= NULL,
 @Quantity float = 0,    
 @UOM int = 0,    
 @Assignperson [nvarchar](50) = NULL,  
 @DeadlineDate datetime= NULL,    
 @ManufacturingType [nvarchar](50)= NULL,   
 @CreateUser [nvarchar](50) = NULL,    
 @UpdateUser [nvarchar](50) = NULL,    
 @IsUpdate bit=0,  
 @XMLData AS XML   
AS    
  
BEGIN    
Declare @TotalRecords int=0,@LoopCount int=1   
IF(@IsUpdate=1)    
BEGIN    
Select 'Update'  
	Update [tblMnfManufactureOrderMaster]  
	set BOMID=@BOMID,  
	MaterialId=@ProductId,  
	MODate=@MODate,  
	Quantity=@Quantity,  
	UOMID=@UOM,  
	AssignPersonId=@AssignPerson,  
	DeadLineDate=@DeadLineDate,  
	ManufacturingType=@ManufacturingType,  
	UpdateUser=@CreateUser  
	where id=@Id  
  
	--Delete from tblMnfManufactureBomDetail where BOMID=@Id  
  
END    
ELSE    
BEGIN    
	INSERT INTO dbo.[tblMnfManufactureOrderMaster]     
	(Id,
	BOMID,
	MaterialId,
	MODate,
	Quantity,
	UOMID,
	AssignPersonId,
	DeadLineDate,
	ManufacturingType,
	CreateUser)    
	SELECT    
	@Id,
	@BOMID,
	@ProductId,
	@MODate,
	@Quantity,
	@UOM,
	@AssignPerson,
	@DeadLineDate,
	@ManufacturingType,
	@CreateUser  
END    
  Delete from tblMnfManufactureOrderDetail where OrderID=@Id 
--DETAILS  
SELECT @TotalRecords = @xmlData.value('count(/OrderList/OrderListDetail)', 'int')       
WHILE @LoopCount <= @TotalRecords                                                                                                 
BEGIN                        
	INSERT INTO tblMnfManufactureOrderDetail (
	OrderID,
	MaterialId,
	Quantity,
	WCID,
	Operation,
	QuantityConsumed,
	CreateUser
	)            
	select @Id
	,p.n.value('MaterialId[1]', 'int')                  
	,p.n.value('Quantity[1]', 'decimal')
	,p.n.value('WCID[1]', 'nvarchar(50)')
	,p.n.value('Operation[1]', 'nvarchar(50)')
	,p.n.value('QtyConsumed[1]', 'decimal')
	,@CreateUser    
	from  @XmlData.nodes('/OrderList/OrderListDetail[sql:variable("@LoopCount")]') AS p(n)                          
SET @LoopCount = @LoopCount + 1                       
END            
END 