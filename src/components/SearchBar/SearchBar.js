import React from "react";
import { useState, useEffect } from "react";
import { useGetEmcommerceProductsQuery } from "reduxStore/rtk";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Styles.module.scss";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const {
    data: allDataProduct,
    error: isError,
    isLoading: loadingData,
    isFetching: fetchingOfData,
    isSuccess,
    refetch: fetchAllDataProducts,
  } = useGetEmcommerceProductsQuery();
  const handleSearchText = (value) => {
    const dataOfAllProducts =
      allDataProduct &&
      allDataProduct?.filter((val, index) => {
        return (
          value && val && val?.Name && val?.Name.toLowerCase().includes(value)
        );
      });

    setResults(dataOfAllProducts);
  };
  const handleChangeText = (value) => {
    setInputText(value);
    const fieldText = value.toLowerCase();
    handleSearchText(fieldText);
  };
  useEffect(() => {
    fetchAllDataProducts();
  }, [inputText]);
  return (
    <>
      <div className={styles.searchWraper}>
        <SearchIcon />
        <input
          style={{
            width: "100%",
            background: "none",
            border: "none",
            outline: "none",
            padding: "0px 10px",
          }}
          placeholder="Search for Products....."
          value={inputText}
          onChange={(e) => handleChangeText(e.target.value)}
        />
      </div>
      {inputText ? (
        <div className={styles.listItems}>
          {results.length === 0 ? (
            <p style={{ color: "black", padding: "10px" }}>
              No Suggested Product:
            </p>
          ) : (
            <ul>
              {results.map((val, index) => {
                return (
                  <Link to={{ pathname: `/product/${val.Id}` }}>
                    <li key={index}>
                      <div>
                        <img
                          src={`https://frontend.millatsports.com.pk${val?.Image}`}
                        />
                        {val.Name}
                      </div>
                      <p>{`Rs.${val.Price}`}</p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchBar;
