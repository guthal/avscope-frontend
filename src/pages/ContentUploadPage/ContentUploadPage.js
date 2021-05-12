import React, { useState } from "react";
import { Box, Container, AppBar, Tabs, Tab } from "@material-ui/core";
// import useStyles from "./ContentUploadPage.Styles";
import StandAloneUpload from "./StandAloneUpload";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ContentUploadPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event, tab) => {
    setSelectedTab(tab);
  };

  return (
    <Container maxWidth="lg">
      <Container maxWidth="xs">
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab
              style={{ width: "60%" }}
              label="Stand Alone Content"
              {...a11yProps(0)}
            />

            <Tab
              style={{ width: "40%" }}
              label="Series Content"
              {...a11yProps(0)}
            />
          </Tabs>
        </AppBar>
      </Container>
      <TabPanel value={selectedTab} index={0}>
        <StandAloneUpload />
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        Series
      </TabPanel>
    </Container>
  );
}

export default ContentUploadPage;
