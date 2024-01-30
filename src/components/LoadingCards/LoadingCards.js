import React from "react";
import styles from "./Styles.module.scss";

const LoadingCards = () => {
  const loadingContent = [
    { id: 1, image: "", head: "", subHead: "" },
    { id: 2, image: "", head: "", subHead: "" },
    { id: 3, image: "", head: "", subHead: "" },
    { id: 4, image: "", head: "", subHead: "" },
    { id: 5, image: "", head: "", subHead: "" },
    { id: 6, image: "", head: "", subHead: "" },
    { id: 7, image: "", head: "", subHead: "" },
    { id: 8, image: "", head: "", subHead: "" },
    { id: 9, image: "", head: "", subHead: "" },
    { id: 10, image: "", head: "", subHead: "" },
  ];
  return (
    <>
      <div className="d-flex w-100 flex-wrap">
        {loadingContent.map((value, index) => {
          return (
            <div class={styles.isloadingScreen} key={index}>
              <div class={styles.imageLoading}>{value.image}</div>
              <div class={styles.contentLoading}>
                <h2>{value.head}</h2>
                <p>{value.subHead}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LoadingCards;
