import React, { useState } from "react";
import "./CategoryDesktop.css";
import { useGetProductCategoriesQuery } from "reduxStore/rtk";
import { Link , useNavigate  } from "react-router-dom";

const CategoryDesktop = () => {
  const [subMenuData, setSubMenuData] = useState([]);
  const navigate = useNavigate();
  const { data, error, isLoading, isFetching, isSuccess, refetch } =
    useGetProductCategoriesQuery();
  const parentData = data && data?.filter((value) => !value.ParentId);
  const subMenu = (id) => {
    const result =
      data &&
      data?.filter((vald) => {
        return vald.ParentId === id;
      });
    setSubMenuData(result);
  };
  return (
    <>
      <div className="nav_bar">
        <div className="row">
          <div className=" dropdown category_drop ">
            <button
              className="btn__ctg btn btn-secondary dropdown-toggle category_btn"
              type="button"
              id="dropdownMenuButton1"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Browse Categories
            </button>
            <ul
              className="dropdown-menu category_list"
              aria-labelledby="dropdownMenuButton1"
            >
              {data &&
                parentData.map((value, index) => {
                  return (
                    <li
                      className="inner_drop"
                      key={index}
                      onMouseOver={() => subMenu(value.Id)}
                    >
                      <a className="inner_anchor" href="#">
                        {value.Name}
                      </a>
                      <div className="container">
                        <div className="row inner_drop_menu">
                          <div className="col-lg-12 abc">
                            <ul
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "100%",
                              }}
                              className="ps-0"
                            >
                              {subMenuData?.map((val, ind) => {
                                return (
                                  <li className="mega_mnu_list" key={ind} style={{ width: "100%" }}>
                                   
                                    <Link className="mega_menu_links" to={{pathname:`/shop/category/${val.Id}`}} state={{myParams:true , shopId:val.Id}}>
                                      {val.Name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDesktop;
