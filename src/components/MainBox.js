import React, { useState } from "react";
import Highlightable from "./Highlight";
import Button from "./Button";


const MainBox = () => {
    
    const [addToPerson, setAddToPerson] = useState (false)
    const [addToLoc, setAddToLoc] = useState (false)
    const [addToOrg, setAddToOrg] = useState (false)

    const [colorClass, setColorClass] = useState ("yellow")

    const [personRanges, setPersonRanges] = useState([
        {
        id: 0,
        offset: 10,
        length: 29
        }
    ]);

    const [locRanges, setLocRanges] = useState([
        {
        id: 0,
        offset: 10,
        length: 29
        }
    ]);

    const [orgRanges, setOrgRanges] = useState([
        {
        id: 0,
        offset: 10,
        length: 29
        }
    ]);

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

        if (addToPerson) {
            setPersonRanges([...personRanges, range]);
        }
        else if (addToLoc) {
            setLocRanges([...locRanges, range]);
        }
        else {
            setOrgRanges([...orgRanges, range]);
        }
      };

    // delete the highlight by filtering it out from the ranges
    const deleteMark = range => {
    setRanges(ranges.filter(r => r.id !== range));
    // console.log(ranges.filter(r => r.id !== range));
    };

    return (
        <div id='main' className="mainItem">
            <div id='sidebar'>
                <div id='functions'>
                    <Button text='Import' className='actionBtn' />
                    
                    <div id='annCategories'>

                        <Button text='Person' className='annCategoryBtn' onClick = {() => {
                            setAddToPerson(true)
                            setAddToLoc(false)
                            setAddToOrg(false)
                            setColorClass("pink");
                        }}/>

                        <Button text='Location' className='annCategoryBtn' onClick = {() => {
                            setAddToPerson(false)
                            setAddToLoc(true)
                            setAddToOrg(false)
                            setColorClass("blue");
                        }}/>

                        <Button text='Organization' className='annCategoryBtn' onClick = {() => {
                            setAddToPerson(false)
                            setAddToLoc(false)
                            setAddToOrg(true)
                            setColorClass("green");
                        }}/>

                    </div>

                    <Button text='Export' className='actionBtn' />

                </div>
                
            </div>
            <div id='mainBox' className="middleItem">
                <Highlightable
                    ranges={ranges}
                    handleHighlight={handleHightlight}
                    deleteMark={deleteMark}
                    text={text}
                    colorClass={colorClass}
                />
            </div>
        </div>
        
    )
}

export default MainBox

/* 

1- Change highlight color according to category (SAT)
2- Import File (SAT)
3- BIO calculations (talk to şeniz hoca on Friday, if so, SAT)
4- Export file (SUN)

Extra: Display the category's highlights on the top bar dynamically (SUN)

*/
