--DROP TABLE [tblMnfManufactureOrderMaster]

CREATE TABLE [dbo].[tblMnfManufactureOrderMaster](
	[Id] [varchar](20) NOT NULL,
	[BOMID] varchar(20) NOT NULL,
	[ProductId] [int] NULL,
	[MODate] [datetime] NULL,
	[Quantity] [float] NULL,
	[UOMID] [int] NULL,
	[AssignPerson] [varchar](60) NULL,
	[DeadLineDate] [datetime] NULL,
	[ManufacturingType] [varchar](60) NULL,
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateUser] [nvarchar](20) NULL,
	[UpdateDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblMnfManufactureOrderMaster] ADD  DEFAULT (getdate()) FOR [CreateDate]
GO







