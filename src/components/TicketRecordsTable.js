import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const TicketRecordsTable = ({ editTicket, ticketRecord, admin, engineer }) => {
  return (
    <div>
      <MaterialTable
        className={admin ? "admin-table" : engineer ? "eng-table" : "cx-table"}
        onRowClick={(event, rowData) => editTicket(rowData)}
        columns={[
          {
            title: "Ticket ID",
            field: "id",
          },
          {
            title: "TITLE",
            field: "title",
          },
          {
            title: "DESCRIPTION",
            field: "description",
          },
          {
            title: "REPORTER",
            field: "reporter",
          },
          {
            title: "PRIORITY",
            field: "ticketPriority",
          },
          {
            title: "Assignee",
            field: "assignee",
          },

          {
            title: "Status",
            field: "status",
          },
        ]}
        options={{
          exportMenu: [
            {
              label: "Export Pdf",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "Ticket Records"),
            },
            {
              label: "Export Csv",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "Ticket Records"),
            },
          ],

          headerStyle: {},
          rowStyle: {
            backgroundColor: "#fff",
          },
        }}
        data={ticketRecord}
        title=""
      />
    </div>
  );
};

export default TicketRecordsTable;
