import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TicketRecordsTable from "./TicketRecordsTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TicketTable({
  editTicket,
  ticketList,
  admin,
  engineer,
  customer,
}) {
  const [value, setValue] = React.useState(0);
  const { all, open, closed, pending, blocked } = ticketList;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="table">
      <Box
        sx={{
          backgroundColor: admin
            ? "var( --admin-tab-bg-color)"
            : engineer
            ? "var(--engineer-tab-bg-color)"
            : "var(--customer-tab-bg-color)",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label=""
          textColor="secondary"
          indicatorColor="secondary"
          TabIndicatorProps={{
            sx: {
              bgcolor: admin ? "secondary" : engineer ? "#b04905" : "#0890bd",
            },
          }}
        >
          <Tab
            label="all"
            {...a11yProps(0)}
            className={`${engineer && "engTab"} ${customer && "cxTab"}`}
          />
          <Tab
            label="open"
            {...a11yProps(1)}
            className={`${engineer && "engTab"} ${customer && "cxTab"}`}
          />
          <Tab
            label="closed"
            {...a11yProps(2)}
            className={`${engineer && "engTab"} ${customer && "cxTab"}`}
          />
          <Tab
            label="in progress"
            {...a11yProps(3)}
            className={`${engineer && "engTab"} ${customer && "cxTab"}`}
          />
          <Tab
            label="blocked"
            {...a11yProps(4)}
            className={`${engineer && "engTab"} ${customer && "cxTab"}`}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TicketRecordsTable
          admin
          engineer
          customer
          editTicket={editTicket}
          ticketRecord={all}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TicketRecordsTable
          admin
          engineer
          customer
          editTicket={editTicket}
          ticketRecord={open}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TicketRecordsTable
          admin
          engineer
          customer
          editTicket={editTicket}
          ticketRecord={closed}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TicketRecordsTable
          admin
          engineer
          customer
          editTicket={editTicket}
          ticketRecord={pending}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TicketRecordsTable
          admin
          engineer
          customer
          editTicket={editTicket}
          ticketRecord={blocked}
        />
      </TabPanel>
    </Box>
  );
}
