import React, { useState } from "react";
import Highlightable from "./Highlight";
import Button from "./Button";


const MainBox = () => {

    const [addToPerson, setAddToPerson] = useState (true)
    const [addToLoc, setAddToLoc] = useState (false)
    const [addToOrg, setAddToOrg] = useState (false)

    const [colorClass, setColorClass] = useState ("personTag")

    const [nowAnnotating, setNowAnnotating] = useState ("Person")

    const [test_text, setText] = useState (`
        Presidio Bank (OTCBB: PDOB), sdasa Bay Area business bank, today reported
        unaudited results for the first quarter ended March 31, 2019 with Net
        Income of $3.1 million, down from $3.3 million in the fourth quarter of
        2018 and up from $2.2 million (38%) in the first quarter of 2018.Presidio
        Bank (OTCBB: PDOB), a Bay Area business bank, today reported unaudited
        results for the first quarter ended March 31, 2019 with Net Income of $3.1
        million, down from $3.3 million in the fourth quarter of 2018 and up from
        $2.2 million (38%) in the first quarter of 2018.
    `)

    // dynamically update each category's range
    const [personRanges, setPersonRanges] = useState([]);
    const [locRanges, setLocRanges] = useState([]);
    const [orgRanges, setOrgRanges] = useState([]);

    // to dynamically update the highligted substring
    const [ranges, setRanges] = useState([]);

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
    };

    // import and display the input txt file
    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const test_text = (e.target.result)
          setText(test_text);
          setRanges([]);
        };
        reader.readAsText(e.target.files[0])
      }
      

    return (
        <div id='main' className="mainItem">
            <p>Now annotating: <span className={colorClass}>{nowAnnotating}</span></p>
            <div id='topbar'>

                <input type="file" accept=".txt" className="file-upload" onChange={(e) => showFile(e)} />
        
                <div id='annCategories'>

                    <Button text='Person' className="annCategoryBtn" id="personBtn" onClick = {() => {
                        setAddToPerson(true)
                        setAddToLoc(false)
                        setAddToOrg(false)
                        setColorClass("personTag")
                        setNowAnnotating("Person")
                    }}/>

                    <Button text='Location' className="annCategoryBtn" id="locBtn" onClick = {() => {
                        setAddToPerson(false)
                        setAddToLoc(true)
                        setAddToOrg(false)
                        setColorClass("locTag")
                        setNowAnnotating("Location")
                    }}/>

                    <Button text='Organization' className="annCategoryBtn" id="orgBtn" onClick = {() => {
                        setAddToPerson(false)
                        setAddToLoc(false)
                        setAddToOrg(true)
                        setColorClass("orgTag")
                        setNowAnnotating("Organization")
                    }}/>
                    

                </div>

                <Button text='Export' className='actionBtn' />
                
            </div>
            <div id='mainBox' className="middleItem">
                <Highlightable
                    ranges={ranges}
                    handleHighlight={handleHightlight}
                    deleteMark={deleteMark}
                    text={test_text}
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
