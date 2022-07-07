import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserRecordsTable from "./UserRecordsTable";

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

export default function UserTable({ fetchUsers, userList }) {
  const [value, setValue] = React.useState(0);

  const { all, approved, pending, rejected } = userList;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="table">
      <Box sx={{ backgroundColor: "var( --admin-tab-bg-color)" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label=""
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="all" {...a11yProps(0)} />
          <Tab label="approved" {...a11yProps(1)} />
          <Tab label="pending" {...a11yProps(2)} />
          <Tab label="rejected" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserRecordsTable fetchUsers={fetchUsers} userRecord={all} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserRecordsTable fetchUsers={fetchUsers} userRecord={approved} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserRecordsTable fetchUsers={fetchUsers} userRecord={pending} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UserRecordsTable fetchUsers={fetchUsers} userRecord={rejected} />
      </TabPanel>
    </Box>
  );
}
