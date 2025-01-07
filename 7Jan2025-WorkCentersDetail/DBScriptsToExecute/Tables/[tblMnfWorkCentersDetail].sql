--DROP TABLE [tblMnfWorkCentersDetail]

CREATE TABLE [dbo].[tblMnfWorkCentersDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[MachineType] [nvarchar](60) NULL,
	[Capacity] [nvarchar](20) NULL,
	[ProductName] [varchar](60) NULL,
	[Cost] int NULL,
	[SetupTime] int NULL,
	[Location] [nvarchar](60),
	[Remark] [varchar](max) NULL,
	[Active] bit,
	[CreateUser] [nvarchar](20) NULL,
	[CreateDate] [datetime] NOT NULL,
	[UpdateUser] [nvarchar](20) NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_tblMnfWorkCentersDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [tblMnfWorkCentersDetail] ADD  CONSTRAINT [DF_tblMnfWorkCentersDetail_Active]  DEFAULT ((1)) FOR [Active]
GO


ALTER TABLE [tblMnfWorkCentersDetail] ADD  CONSTRAINT [DF_tblMnfWorkCentersDetail_CreateDate]  DEFAULT (getdate()) FOR [CreateDate]
GO