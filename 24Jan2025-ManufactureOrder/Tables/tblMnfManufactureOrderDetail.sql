--DROP TABLE [tblMnfManufactureOrderDetail]

CREATE TABLE [dbo].[tblMnfManufactureOrderDetail](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[OrderID] varchar(20) NOT NULL,
	[MaterialId] int NOT NULL,
	[Quantity] float NULL,
	[WCID] varchar(20)NOT NULL,  
	[Operation] varchar(20)NOT NULL,  
	[QuantityConsumed] float NULL,
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime] NOT NULL Default GetDate(),
	[UpdateUser] [nvarchar](20) NULL,
	[UpdateDate] [datetime] NULL,
	CONSTRAINT fk_OrderID_Master foreign key ([OrderID]) references tblMnfManufactureOrderMaster (ID),
	CONSTRAINT [PK_MnfManufactureOrderDetail] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] 





