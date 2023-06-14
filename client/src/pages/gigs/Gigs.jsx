/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useLocation();
  // console.log(search);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}&page=${currentPage}`
        )
        .then((res) => {
          return res.data;
        }),
  });
  // url += `&page=${currentPage}`;
  // console.log(search.split("=")[1], "searchty");
console.log(data,"data fronm gisgs")


  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, currentPage]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs"></span>
        <h1>{search.split("=")[1]} </h1>
        <p>
          Explore the boundaries of art and technology with
          <span> Skillify's {search.split("=")[1]} </span>
          
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.gigs.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>

      {data?.pagination.totalPages > 1 && (
            <div style={{ width: "100%" }}>
              <Pagination
                totalPages={data.pagination.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
    </div>
  );
}

export default Gigs;
