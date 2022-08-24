import React, { useEffect, useState } from "react";

export default function MainDayPage() {

    const [DayList, setDayList] = useState([]);

    //localhost:8080/days

    useEffect(()=>{
        const url ='//localhost:8080/days'

        const fetchData = async () => {
            try {
              const response = await fetch(url);
              const json = await response.json();
              console.log(json);
              setDayList(json);
            } catch (error) {
              console.log("error", error);
            }
          };
      
          fetchData();
    }, []);


    return (
        <>
            <h1>JustWork</h1>
            <ul>
                {
                    DayList.map((day, key) => {
                        return <li key={key}>{day.title}</li>
                    })
                }
            </ul>

        </>
    )
}

