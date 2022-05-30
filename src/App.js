//import React, { Component } from 'react';
import SearchBar from "./search_bar";
import { useState, useEffect } from "react";
import AddItem from "./add_item";
import ItemsDisplay from "./items_display";
import Test from './Class'
// import styled from "styled-components";
import "./App.css";

// const Title = styled.h1`
//   color: blue
// `

// const Title2 = styled.h1`
//   color: ${(props) => (props.color ? props.color : "yellow")}
// `

function App() {
    const [filters, setFilters] = useState({});
    const [data, setData] = useState({ items: [] });
    const [showTest, setshowTest] = useState(true)

    const updateFilters = (searchParams) => {
        setFilters(searchParams);
    };

    //video 7, 6:20
    const addItemToData = (item) => {
        //this accesses the items array
        let items = data["items"];

        const requestoptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }
        fetch("http://localhost:3000/items", requestoptions)
            .then((response) => {
                const data = response.json()
                items.push(data);
                setData({ items: items });
                
            })
            .then((data) => {

                // items.push(data);
                // setData({ items: items });
                
                // items.push(data)
                // setData({ items: items})
            })
            .catch(err => alert("Failed to add new item, please try again!", err))
           


        
        // console.log(data);
    };

    const filterData = (data) => {
        const filteredData = []

        if (!filters.name){
            return data
        }

        for(const item of data)
        {
            if(filters.name !== "" && item.name !== filters.name){
                continue
            }

            if(filters.price !== 0 && item.price !== filters.price){
                continue
            }

            if(filters.type !== "" && item.type !== filters.type){
                continue
            }

            if(filters.brand !== "" && item.brand !== filters.brand){
                continue
            }

            filteredData.push(item)        
        }

        return filteredData
    }

    return (
        <div className="container">
            {/* <Title>test</Title>
      <Title2 color='red'>test2</Title2> */}
            <div className="row mt-3">
                <ItemsDisplay items={filterData(data["items"])} />
            </div>
            <div className="row mt-3">
                <SearchBar updateSearchParams={updateFilters} />
            </div>           
            <div className="row mt-3">
                <AddItem addItem={addItemToData} />
            </div>
            {showTest ? <Test destroy = {setshowTest} />: null}
        </div>
    );
}
export default App;
