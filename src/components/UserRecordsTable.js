import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const UserRecordsTable = ({ fetchUsers, userRecord }) => {
  return (
    <div>
      <MaterialTable
        onRowClick={(event, rowData) => fetchUsers(rowData.userId)}
        columns={[
          {
            title: "NAME",
            field: "name",
          },
          {
            title: "USER ID",
            field: "userId",
          },
          {
            title: "EMAIL",
            field: "email",
          },
          {
            title: "USER TYPES",
            field: "userTypes",
          },
          {
            title: "USER STATUS",
            field: "userStatus",
          },
        ]}
        options={{
          exportMenu: [
            {
              label: "Export Pdf",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "User Records"),
            },
            {
              label: "Export Csv",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "User Records"),
            },
          ],
          headerStyle: {
            backgroundColor: "darkblue",
            color: "#fff",
          },
          rowStyle: {
            backgroundColor: "#fff",
          },
        }}
        data={userRecord}
        title=""
      />
    </div>
  );
};

export default UserRecordsTable;
