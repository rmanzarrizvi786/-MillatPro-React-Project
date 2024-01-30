import React from "react";
import { useGetProductCategoriesQuery } from "reduxStore/rtk";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import styles from "./Styles.module.scss";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

const SideBarCategory = () => {
  const [isActive, setIsActive] = useState(null);
  const [dataOfSubCategory, setDataOfSubCategory] = useState([]);
  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useGetProductCategoriesQuery();
  const mainCategoryData =
    data &&
    data?.filter((value, index) => {
      return value.ParentId === null;
    });
  const filterResult = (Id) => {
    const subCategoryData =
      data &&
      data?.filter((value, index) => {
        return value.ParentId === Id;
      });
    setDataOfSubCategory(subCategoryData);
  };
  const handleActive = (value) => {
    setIsActive(value);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div>
      {isLoading && (
        <div
          className="loader"
          style={{ textAlign: "center", paddingTop: "20px" }}
        >
          <CircularProgress color="inherit" />
        </div>
      )}

      {isSuccess && (
        <>
          {data &&
            mainCategoryData?.map((value, index) => {
              return (
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                  className={`${styles.myAc}`}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    onClick={() => filterResult(value.Id)}
                  >
                    <Typography>{value.Name}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul className="ps-0">
                      {dataOfSubCategory &&
                        dataOfSubCategory?.map((value, index) => {
                          return (
                            <li key={index} className={`${styles.list} `}>
                              <Link
                                to={{
                                  pathname: `/shop/category/${value?.Id}`,
                                }}
                                className={
                                  isActive === value.Id
                                    ? `${styles.listActive}`
                                    : ``
                                }
                                onClick={() => handleActive(value.Id)}
                                style={{
                                  textDecoration: "none",
                                  color: "#333",
                                }}
                              >
                                {value?.Name}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </>
      )}
    </div>
  );
};

export default SideBarCategory;
