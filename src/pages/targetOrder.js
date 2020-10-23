import React, { useEffect, useContext, useState } from 'react'
import '../css/targetOrder.css';
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import Stores from '../Components/Stores';
function TargetOrder() {
    const history = useHistory();
    const cbmContext = useContext(CbmContext);
    //const history = useHistory();
    const { loginStatus, isAuthenticated, loading, getStores, stores, user} = cbmContext;
    const { district} = cbmContext.user;
    // eslint-disable-next-line
    const [items5, setItems5] = useState (["C1102 – 16\" Stripping pad (Green)"])
    // eslint-disable-next-line
    const [items4, setItems4] = useState(["C1103 – 17\" Stripping pad (green)"])
    // eslint-disable-next-line
    const [items55, setItems55] = useState(["C0022 - Signature wax", "C0035 - Prostrip HD Stripper"])
    // eslint-disable-next-line
    const [items3, setItems3] = useState([
        "C0015- UHS Cleaner", "C0016 Crew Restroom Floor and Surface 1.5L RTD", "C0019 - Crew Restroom Floor & Surface Bottle", "C0024 - Spitfire Spray Bottle", "C0060 - Stride Citrus Neutral Cleaner Accumix", "C0061 - Gum Remove", "C0062 - Citrus Express Gel", "C0090- SPITFIRE POWER CLEANER 1.5L RTD", "C0091-EcoLab LmEntary", "C0092 - Alpha Hp Brathroom Disinfectant Cleaner", "C0093 - Alpha Hp Bathroom Disinfectant Spray Bottle", "C0096 - Kitchen Degreaser Spray Bottle", "C0097 - Glance Glass & Surface Spray Bottle", "C0098 - Dibs Neutralize", "C0128 - Crew Emereld Creme Cleanser", "C1100 - Crew Emereld Creme Cleanser", "C1101 – 14” Stripping pad (green)", "C1102 – 16\" Stripping pad (Green)", "C1103 – 17\" Stripping pad (green)", "C1105 –20” Stripping pad (Green)", "C1108 - 16 \"Deep Scrubbing Pad (Maroon)", "C1109 - 17 \"Deep Scrubbing Pad (MaroonB)", "C1112 - 13\" Deep Scrubbing Pad (Maroon)", "C1113 - 14\" Deep Scrubbing Pad (Maroon)", "C1117 - 20\" Deep Scrubbing Pad (Maroon)", "C1118 - 13\" Daily Cleaning Pad (Red)", "C1119 - 14\" Daily Cleaning Pad (Red)", "C1120 - 16\" Daily Cleaning Pad (Red)", "C1121 - 17\" Daily Cleaning Pad (Red)", "C1123 - 20\" Dailycleaning Pad (Red)", "C1155 - Grit Screen Pad (17\")", "C1156 - Grit Screen Pad (20\")", "C1204 - General Purpose Spotter(6/32oz.)", "C1205 - Paint, Oil & Grease Remover", "C1208 - Power Foam Bravo Spot Stripper", "C1209 Suma Inox Stainless Steel Polish", "C1210 - Doodlebug General Purpose Brush", "C1211 - Doodlebug High Pro Black Pad", "C1244 - Jworks Strata Degreaser", "C1245 - Liquid Defoamer", "C1246 - Joncrete Concrete & Floor Restorer", "C1273 - 27\" Burnishing Pad", "C1300 - Stench & Stain Digester", "C1301 - Heavy Duty Prespray Cleaner", "C1303 - Glance Glass & Surface Cleaner(1/5l Rtd)", "C1307-Diversey Dry Foam Shampoo and Encapsulation Cleaner", "C1310 - Rust & Tannin Treatment", "C1315 - Trailblazer Rinsable Applicator Pad", "C1316 - Trailblazer Finish Kit", "C1317 - Prospeed Signature Uhs Floor", "C1321 - Prospeed Signature Floor Finish", "55 Gal. Brute Gray Barrel", "Pkg of 10 Vacuum filter bags 6 QT(SMALL)(BACKPACK"
    ])// eslint-disable-next-line
    const [radioItems2_state, setRadioItems2] = useState(["Dust Bag, Barracuda", "Red Top Fill Vacuum Bag", "Pkg Of 10 Filter Bag 10 Qt(Big)", "C0092 - Alpha Hp Brathroom Disinfectant Cleaner", "C0093 - Alpha Hp Bathroom Disinfectant Spray Bottle", "C0096 - Kitchen Degreaser Spray Bottle", "C0097 - Glance Glass & Surface Spray Bottle", "C0098 - Dibs Neutralize", "C0128 - Crew Emereld Creme Cleanser","C1105 –20” Stripping pad (Green)", "C1108 - 16 \"Deep Scrubbing Pad (Maroon)","C1112 - 13\" Deep Scrubbing Pad (Maroon)", "55 Gal. Brute Gray Barrel"]);
    // eslint-disable-next-line
    const [radioItems12_state, setRadioItems12] = useState(["Bristle Strip Package", "Sanitaire Vacuum Belt"]);
    // eslint-disable-next-line
    const [orderItems, setOrderItems] = useState([{
    }])
    // eslint-disable-next-line
    const [info, setInfo] = useState([{
        options: 3,
        employeeName: '',
        notes: '',
        location: '',
    }])

    const label = (item, index) => {
        const name = `Drop Input Supplies ${index + 1}`
        return (
                <label name={name} id={name}>
                    {item}
                </label>
        )
    }

    const label2 = (item, index) => {
        const name = `Radio ${index+1}`
        return (
                <label name={name} id={`Radio ${index+1}`}>
                    {item}
                </label>
        )
    }

    const label12 = (item, index) => {
        const name = `Radio 6 or 12 ${index + 1}`
        return (
                <label name={name} id={name}>
                    {item}
                </label>
        )
    }
    const radioItems2 = (item, i) => {
        const options = [];
            options.push(
            <React.Fragment key={`units 2 ${i}`}>
                <div id="radioDiv2" name="itemsOrder">
                <input type="radio" name="itemsOrder"id="radioUnits 1" value="1" onClick={e => handleChange(e,item)}>
                </input>
                <label>1</label>
                &nbsp;&nbsp;
                <input type="radio" name="itemsOrder" id="radioUnits 2" value="2" onClick={e => handleChange(e,item)}></input>
                <label>2</label>
                </div>
                </React.Fragment>)
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }

    const radioItems12 = (item, i) => {
        const options = [];
            options.push(
            <React.Fragment key={`units 12 ${i}`}>
                <div id="radioDiv12" name="itemsOrder">
                    <input type="radio" name="itemsOrder" id="radioUnits 6" value="6" onClick={e => handleChange(e,item)}></input>
                    <label>6</label>
                    &nbsp;&nbsp;
                    <input type="radio" name="itemsOrder" id="radioUnits 12" value="12" onClick={e => handleChange(e,item)}></input>
                    <label>12</label>
                    </div>
                    </React.Fragment>)
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }
    const textItems = (item, i) => {
        const options = [];
            options.push(
            <React.Fragment key={`textItem ${i}`}>
                    <input type="number" name="itemsOrder"  onChange={e => handleChange(e,item)}></input>
                    </React.Fragment>)
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }

    const dropDown = (item) => {
        let i = 0;
        const options = [];
        let amounts = [];
    if (items5.includes(item)) {
            amounts = [5];
        for (i=1; i <= amounts[0]; i++) {
            const name = `Units`
            options.push(<option key={i} id={name} value={i}>{i}</option>)
        }
    } else if (items4.includes(item)) {
            amounts = [4];
        for (i=1; i <= amounts[0]; i++) {
            const name = `Units`
            options.push(<option key={i} id={name} value={i}>{i}</option>)
        }
    } else if (items55.includes(item)) {
        amounts = [8,12,20,25,30,35,40,45,50,55]
        for (i=0; i <= amounts.length-1; i++) {
            const name = `Units`
            options.push(<option key={amounts[i]} id={name} value={amounts[i]}>{amounts[i]}</option>)
        }
    } else {
        amounts = [3]
        for (i=1; i <= amounts[0]; i++) {
            const name = `Units`
            options.push(<option key={i} id={name} value={i}>{i}</option>)
        }
    }
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }

    const handleChange = (e, item) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "itemsOrder") {
            if (orderItems.length === 1) {

                setOrderItems(orderItems.concat({'item': item, 'amount':value}));
            } else {
                    
                    const found = Object.values(orderItems).findIndex((itemCheck, i) => itemCheck['item'] === item)
                    if (found >= 0) {
                        let list = [...orderItems];
                        list[found]['amount'] = value
                        setOrderItems(list);
                        
                } else if (found === -1){
                    setOrderItems(orderItems.concat({'item': item, 'amount':value}));
                }
            
        }
                
        } else {
            const list = [...info];
           list[0][name] = value;
           setInfo(list);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
            fetch('https://portal.cbmportal.com:5000/api/targetOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                employeeName: info[0].employeeName,
                location: info[0].location,
                notes: info[0].notes,
                order: orderItems,
                dm: user,
            })
            })
            .then(res => res.json())
            .then( data => {
                if (data.message) history.push('/success');
            })
        .catch(err => console.log(err))
}

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            loginStatus();
            }
            getStores(district);
            // eslint-disable-next-line
    }, []);

        return (
            <div className="container">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Target Order</span></h1><br />
                <form onSubmit={e => onSubmit(e)}>
                <label >Store Number:</label>
                <div className="wrapper1">
                <select name="location" id="storeList" required title="Please select an option" onChange=  {e => handleChange(e)}>
                    <option name="storeSelect">Select a location</option>
                   <Stores stores={stores} />
                </select>
                </div>
                <br /><br />
                <div className="wrapper1">
                <label forhtml="employeename"> Employee Name:</label><br />
                <input type="text" id="employeename" name="employeeName" onChange={e => handleChange(e)}/>
                </div><br /><br />
                <label >Order Form:</label>
                <table>
                    <tbody>
                        {items3.map((item, index) => {
                            return (
                                <tr key={`row${index}`}>
                                    <td id="label" className="dataCells">
                                        {label(item, index)}
                                    </td>
                                    <td id="select" className="dataCells">
                                        <select id="orderQuantity" name="itemsOrder" onChange={(e) => handleChange(e,item)}>
                                            <option key="Quantity">Quantity</option>
                                            <option key="0">0</option>
                                            {dropDown(item)}
                                        </select>
                                    </td>
                                </tr>
                            
                            
                            );
                        })}
                    </tbody>
                    <tbody>
                        {items55.map((item, index) => {
                            return (
                                <tr key={`row${index}`}>
                                    <td id="label" className="dataCells">
                                        {label(item, index)}
                                    </td>
                                    <td id="radio2" className="dataCells">
                                        {textItems(item, index)}
                                    </td>
                                </tr>
                            );
                    })}
                    </tbody>
                    <tbody>
                        {radioItems2_state.map((item, index) => {
                            return (
                                <tr key={`row${index}`}>
                                    <td id="label2" className="dataCells">
                                        {label2(item, index)}
                                    </td>
                                    <td id="radio2" className="dataCells">
                                        {radioItems2(item, index)}
                                    </td>
                                </tr>
                            );
                    })}
                    </tbody>
                    <tbody>
                        {radioItems12_state.map((item, index) => {
                            return (
                                <tr key={`row${index}`}>
                                    <td id="label12" className="dataCells">{label12(item, index)}</td>
                                    <td id="radio12" className="dataCells">
                                        {radioItems12(item, index)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table><br />
                <label >Other Notes:</label> <br />
                <textarea id="notes" name="notes" onChange={e => handleChange(e)}></textarea>
                <br />
                <input type="submit" className="btn" />
                </form>
            </div>
        )
}

export default TargetOrder

