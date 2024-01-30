import {Toolbar} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {HiOutlinePhone} from "react-icons/hi";
import styles from "./Styles.module.scss";

const Call = () => {
  return (
    <Box>
      <Toolbar disableGutters variant="dense" sx={{ minHeight: "100%" }}>
        <a href="tel:+923254456314" className={styles.topHover} style={{textDecoration:"none"}}>
          <Box marginRight={"7px"} alignItems={"center"}>
            <HiOutlinePhone fontSize={"1rem"} />
          </Box>
          Call: +92 325 4456314
        </a>
      </Toolbar>
    </Box>
  );
};

export default Call;
