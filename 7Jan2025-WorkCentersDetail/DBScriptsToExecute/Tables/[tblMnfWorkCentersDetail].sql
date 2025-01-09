--DROP TABLE [tblMnfWorkCentersDetail]

CREATE TABLE [dbo].[tblMnfWorkCentersDetail](
	[Id] varchar(20) NOT NULL primary key,
	[MachineType] [nvarchar](60) NULL,
	[Capacity] [nvarchar](20) NULL,
	[MaterialId] int NULL,
	[Cost] int NULL,
	[SetupTime] int NULL,
	[LocationID] int,
	[Remark] [varchar](max) NULL,
	
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime] NOT NULL Default GetDate(),
	[UpdateUser] [nvarchar](20) NULL,
	[UpdateDate] [datetime] NULL)




