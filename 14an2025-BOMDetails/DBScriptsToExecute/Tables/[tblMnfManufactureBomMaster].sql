--DROP TABLE [tblMnfManufactureBomMaster]

CREATE TABLE [dbo].[tblMnfManufactureBomMaster](
	[Id] varchar(20) NOT NULL primary key,
	[MaterialId] int NULL,
	[Quantity] float NULL,
	[UOMID] int,  
	[BOMType] varchar(60) NULL,
	[WorkCenterID] varchar(20) NULL,
	[Operation] varchar(20),
	[Duration] int NULL,
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime] NOT NULL Default GetDate(),
	[UpdateUser] [nvarchar](20) NULL,
	[UpdateDate] [datetime] NULL)




