import React, { useState } from "react";
import Highlightable from "./Highlight";

const MainBox = () => {
    const text = `
        Presidio Bank (OTCBB: PDOB), sdasa Bay Area business bank, today reported
        unaudited results for the first quarter ended March 31, 2019 with Net
        Income of $3.1 million, down from $3.3 million in the fourth quarter of
        2018 and up from $2.2 million (38%) in the first quarter of 2018.Presidio
        Bank (OTCBB: PDOB), a Bay Area business bank, today reported unaudited
        results for the first quarter ended March 31, 2019 with Net Income of $3.1
        million, down from $3.3 million in the fourth quarter of 2018 and up from
        $2.2 million (38%) in the first quarter of 2018.
    `;

    // to dynamically update the highligted substring
    const [ranges, setRanges] = useState([
        {
        id: 0,
        offset: 10,
        length: 29
        }
    ]);

    // add highlight to ranges
    const handleHightlight = range => {
        setRanges([...ranges, range]);
      };

    // delete the highlight by filtering it out from the ranges
    const deleteMark = range => {
    setRanges(ranges.filter(r => r.id !== range));
    // console.log(ranges.filter(r => r.id !== range));
    };

    return (
        <div id='mainBox' className="middleItem">
            <Highlightable
                ranges={ranges}
                handleHighlight={handleHightlight}
                deleteMark={deleteMark}
                text={text}
            />
        </div>
    )
}

export default MainBox

/* 
1- Move sidebar buttons to Mainbox.js
2- Create ranges arrays and their useState(s)
3- Add if else logic inside ranges attribute to ranges attribute
4- Keep an array for all kinds of ranges and individual ones (to be able to show all kinds of higlighted tags)
*/
