--DROP TABLE [tblMnfManufactureOrderMaster]


Alter table [tblMnfManufactureOrderMaster]
add isAutoProduce bit default 0
, AutoProduceBy varchar(60) null, AutoProduceOn DateTime null


go

update tblMnfManufactureOrderMaster set isAutoProduce=0
go

--ALTER DATABASE BizzManERP_Final1 SET COMPATIBILITY_LEVEL = 100;







