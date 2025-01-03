using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Data;
using System.Data.SqlClient;

using System.Web.UI;
using System.Web.UI.WebControls;

using BizzManWebErp.Model;


namespace BizzManWebErp
{
 

    public class clsMain
    {

        public System.Data.SqlClient.SqlConnection con;


        public System.Data.SqlClient.SqlConnection conHo;
        public System.Data.SqlClient.SqlCommand comm;
        public System.Data.SqlClient.SqlDataAdapter DA;
        public System.Data.DataSet DS;
        public System.Data.DataTable DT;
        public bool gblConStatus, gblConHoStatus;
        //  public string gstrFinancialYear;
        // '" + System.DateTime.Today.ToString("yyyyMMdd") + "'

      

        public string gstrFinancialYear;
        public DateTime gdtStartFianceDate, gdtEndFinanceDate;

        public clsMain()
        {
            gblConStatus = false;  // for Bijli Database
            gblConHoStatus = false;
            try
            {
                //BizzzManERP_New
               //  MY LAPTOP  current database  Geenral ERP
                   conHo = new System.Data.SqlClient.SqlConnection("Data Source=DESKTOP-S053FQR;Initial Catalog=BizzManERP_Final1;User ID=sa;Password=123;Persist Security Info=True");
              

               
                conHo.Open();
                gblConHoStatus = true;
            }
            catch (Exception eConHo)
            {
                gblConHoStatus = false;
            }
        }

        public bool blSearchDataHO(string strSQL)
        {
            try
            {
                DataTable dt = new DataTable();
                DA = new System.Data.SqlClient.SqlDataAdapter(strSQL, conHo);
                DA.Fill(dt);
                if (dt.Rows.Count > 0) { return true; }
                else { return false; }
            }
            catch (Exception e)
            {
                //MessageBox.Show("internet connection error,   try later..");
                return false;
            }
        }
        public string strFetchDate(string strSQL)
        {
            try
            {
                string temp;
                DataTable dt = new DataTable();
                DA = new System.Data.SqlClient.SqlDataAdapter(strSQL, conHo);
                DA.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    temp = dt.Rows[0][0].ToString();
                }
                else
                {
                    temp = "";
                }
                return temp;
            }
            catch (Exception e)
            {
                //  MessageBox.Show("internet connection error,   try later..");
               // MessageBox.Show(e.Message.ToString());
                string temp1 = "";
                return temp1;
            }
        }
        //=====================Naresh from Gujrath as done ======================================
        //================= this function for amount to word convert, it coll model==============
        public string strAmountToWord(string amount)
        {
            return NumberToWords.GetAmountInWords(amount);
        }

//=======================================
//=========================================
        public DataTable dtFetchData(string strSQL)
        {
            try
            {
                DataTable dt = new DataTable();
                DA = new System.Data.SqlClient.SqlDataAdapter(strSQL, conHo);
                DA.Fill(dt);
                return dt;
            }
            catch (Exception e)
            {
               // MessageBox.Show("internet connection error,   try later..");
                DataTable dt1 = new DataTable();
                return dt1;
            }
        }


        public bool Insert(string strSQL)
        {
            int result;
            try
            {
                comm = new System.Data.SqlClient.SqlCommand(strSQL, conHo);
                result = comm.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
              //  MessageBox.Show(ex.Message.ToString());
                result = 0;
            }

            if (result == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }






        public dynamic ExecuteProcedure(string sqlProcName, SqlParameter[] sqlParam)
        {

            int result = 0;
            try
            {
                using (SqlConnection _sqlConnection = new SqlConnection(conHo.ConnectionString))
                {
                    if (_sqlConnection.State == ConnectionState.Closed)
                        _sqlConnection.Open();
                    using (SqlCommand _sqlCommand = new SqlCommand(sqlProcName, _sqlConnection))
                    {
                        _sqlCommand.CommandType = CommandType.StoredProcedure;
                        if (sqlParam != null && sqlParam.Length > 0)
                        { _sqlCommand.Parameters.AddRange(sqlParam); }
                        result = _sqlCommand.ExecuteNonQuery();
                        return
                                new
                                {
                                    msg = result.ToString(),
                                    status = "success"
                                };
                    }
                }
            }
            catch (Exception ex)
            {
                return new
                {
                    msg = ex.Message,
                    status = "failure"
                };
            }

        }



        public DataTable ExecuteStoreProcedure(string strProcName, SqlParameter[] sqlParam)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection _sqlConnection = new SqlConnection(conHo.ConnectionString))
                {
                    if (_sqlConnection.State == ConnectionState.Closed)
                        _sqlConnection.Open();
                    using (SqlCommand _sqlCommand = new SqlCommand(strProcName, _sqlConnection))
                    {
                        _sqlCommand.CommandTimeout = 20 * 60 * 1000;
                        _sqlCommand.CommandType = CommandType.StoredProcedure;
                        if (sqlParam != null && sqlParam.Length > 0)
                        { _sqlCommand.Parameters.AddRange(sqlParam); }
                        SqlDataAdapter _sqlDataAdapter = new SqlDataAdapter();
                        _sqlDataAdapter.SelectCommand = _sqlCommand;
                        _sqlDataAdapter.Fill(dt);
                    }
                }
                return dt;
            }
            catch (Exception ex)
            {
                dt = null;
            }
            return dt;
        }


    }
}