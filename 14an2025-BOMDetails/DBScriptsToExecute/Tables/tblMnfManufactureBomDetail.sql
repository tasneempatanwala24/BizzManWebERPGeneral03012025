--DROP TABLE [tblMnfManufactureBomDetail]

CREATE TABLE [dbo].[tblMnfManufactureBomDetail](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BOMID] varchar(20) NOT NULL,
	[MaterialId] int NOT NULL,
	[Quantity] float NULL,
	[UOMID] int,  
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime] NOT NULL Default GetDate(),
	[UpdateUser] [nvarchar](20) NULL,
	[UpdateDate] [datetime] NULL,
	CONSTRAINT fk_BOMID_BomMaster foreign key (BOMID) references tblMnfManufactureBomMaster (ID),
	CONSTRAINT [PK_ComputerBasedTraining] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] 





