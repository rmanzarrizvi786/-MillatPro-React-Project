import * as React from "react";
import "./CategoryDesktop.css";
import { useGetProductCategoriesQuery } from "reduxStore/rtk";
import { useState } from "react";
import { Drawer, Typography, Button } from "@material-ui/core";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { styled } from "@mui/material/styles";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  width: "100%",
  padding: "0px 16px !important",
  backgroundColor: "rgba(255, 255, 255, .05) !important",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
//
const CategoriesMobile = () => {
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useGetProductCategoriesQuery();

  const parentData = data && data.filter((v) => !v.ParentId);

  const [resultOfMobileMenu, setResultOfMobileMenu] = useState([]);

  const subMenu = (id) => {
    const result =
      data &&
      data?.filter((vald) => {
        return vald.ParentId === id;
      });

    setResultOfMobileMenu(result);
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <div className="cat_mbl">
        <Button onClick={() => setOpen(true)}>
          <DehazeIcon style={{ fontSize: "24px" }} />
          <strong style={{ marginLeft: "10px" }}>By Category</strong>
        </Button>
        <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
          <div className="main" style={{ width: "250px" }}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 8px",
              }}
              onClick={() => setOpen(false)}
            >
              <p>
                <strong>By Category</strong>
              </p>
              <CloseIcon />
            </div>
            {/* {getList()} */}
            <hr style={{ margin: "3px 0px" }} />

            <List>
              {parentData &&
                parentData?.map((value) => {
                  return (
                    <Accordion
                      key={value.Id}
                      expanded={expanded === value.Id}
                      onChange={handleChange(value.Id)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${value.Id}-content`}
                        id={`${value.Id}-header`}
                        onClick={(event) => {
                          event.stopPropagation(); // Stop the event from propagating
                          subMenu(value.Id);
                        }}
                      >
                        <Typography>{value.Name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <ul className="p-0">
                            {resultOfMobileMenu &&
                              resultOfMobileMenu?.map((value, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      onClick={() => setOpen(false)}
                                      to={{
                                        pathname: `/shop/category/${value.Id}`,
                                      }}
                                      state={{
                                        myParams: true,
                                        shopId: value.Id,
                                      }}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                      }}
                                    >
                                      {value.Name}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
            </List>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default CategoriesMobile;
