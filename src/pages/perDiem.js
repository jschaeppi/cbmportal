import React, { useState } from 'react';
import '../css/perDiem.css';

function PerDiem() {
    const [perDiem, addPerDiem] = useState([
        {
            mileageDate: '',
            arrivalStore: '',
            destinationStore: '',
            rtow: ''
        }
    ]);
    const generateStoreList = (name, id, index) => {
            return (
                <select name={name} id={id} onChange={e => handleInputChange(e,index)}>
                <option value="">Select Starting Point</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="615 - T0003  Crystal MN ">615 - T0003 Crystal MN </option>
                <option value="674 - T0004 Target Duluth, MN">674 - T0004 Target Duluth, MN</option>
                <option value="583 - T0005  Bloomington MN ">583 - T0005 Bloomington MN </option>
                <option value="637 - T0024  Greenfield WI ">637 - T0024 Greenfield WI </option>
                <option value="584 - T0052  Minneapolis MN">584 - T0052 Minneapolis MN</option>
                <option value="653 - T0061  Fargo ND ">653 - T0061 Fargo ND </option>
                <option value="580 - T0069  West Des Moines IA ">580 - T0069 West Des Moines IA </option>
                <option value="641 - T0076  Sioux Falls SD ">641 - T0076 Sioux Falls SD </option>
                <option value="638 - T0082  Waukesha WI ">638 - T0082 Waukesha WI </option>
                <option value="644 - T0085  Minot ND ">644 - T0085 Minot ND </option>
                <option value="516 - T0086  Dubuque IA ">516 - T0086 Dubuque IA </option>
                <option value="645 - T0152  Racine WI ">645 - T0152 Racine WI </option>
                <option value="675 - T0215 Target Division St., St. Cloud MN ">675 - T0215 Target Division St., St. Cloud MN </option>
                <option value="532 - T0217  Lincoln NE">532 - T0217 Lincoln NE</option>
                <option value="540 - T0223  Milwaukee WI">540 - T0223 Milwaukee WI</option>
                <option value="635 - T0238  Appleton WI">635 - T0238 Appleton WI</option>
                <option value="606 - T0240  Brooklyn Center MN ">606 - T0240 Brooklyn Center MN </option>
                <option value="591 - T0260  St. Louis Park MN ">591 - T0260 St. Louis Park MN </option>
                <option value="585 - T0360  Eagan MN ">585 - T0360 Eagan MN </option>
                <option value="570 - T0364  Schofield WI ">570 - T0364 Schofield WI </option>
                <option value="548 - T0530  Omaha NE">548 - T0530 Omaha NE</option>
                <option value="566 - T0532  Papillion NE ">566 - T0532 Papillion NE </option>
                <option value="507 - T0533  Davenport IA ">507 - T0533 Davenport IA </option>
                <option value="790 - T0557  Oconomowoc, WI RDC ">790 - T0557 Oconomowoc, WI RDC </option>
                <option value="791 - T0590  Cedar Falls, IA RDC ">791 - T0590 Cedar Falls, IA RDC </option>
                <option value="670 - T0619  Shoreview MN ">670 - T0619 Shoreview MN </option>
                <option value="560 - T0620  Onalaska WI">560 - T0620 Onalaska WI</option>
                <option value="676 - T0657 Target Bemidji, MN">676 - T0657 Target Bemidji, MN</option>
                <option value="640 - T0658  Moorhead MN ">640 - T0658 Moorhead MN </option>
                <option value="677 - T0659 Target Baxter, MN">677 - T0659 Target Baxter, MN</option>
                <option value="626 - T0661  Willmar MN ">626 - T0661 Willmar MN </option>
                <option value="612 - T0664  Plymouth MN ">612 - T0664 Plymouth MN </option>
                <option value="607 - T0693  Brooklyn Park MN ">607 - T0693 Brooklyn Park MN </option>
                <option value="596 - T0803  Des Moines IA">596 - T0803 Des Moines IA</option>
                <option value="501 - T0804  Mason City IA ">501 - T0804 Mason City IA </option>
                <option value="538 - T0805  Marshfield WI ">538 - T0805 Marshfield WI </option>
                <option value="574 - T0806  Stevens Point WI ">574 - T0806 Stevens Point WI </option>
                <option value="616 - T0807  Oshkosh WI ">616 - T0807 Oshkosh WI </option>
                <option value="617 - T0808  Fond Du Lac WI ">617 - T0808 Fond Du Lac WI </option>
                <option value="531 - T0809  Janesville WI ">531 - T0809 Janesville WI </option>
                <option value="678 - T0821 Target Alexandria, MN">678 - T0821 Target Alexandria, MN</option>
                <option value="599 - T0834  Elgin IL ">599 - T0834 Elgin IL </option>
                <option value="600 - T0835  Schaumburg IL ">600 - T0835 Schaumburg IL </option>
                <option value="601 - T0836  Glendale Heights IL ">601 - T0836 Glendale Heights IL </option>
                <option value="679 - T0847 Target Virginia, MN ">679 - T0847 Target Virginia, MN </option>
                <option value="646 - T0848  Aberdeen SD ">646 - T0848 Aberdeen SD </option>
                <option value="546 - T0856  Norfolk NE ">546 - T0856 Norfolk NE </option>
                <option value="530 - T0857  Kearney NE ">530 - T0857 Kearney NE </option>
                <option value="647 - T0859  Watertown SD ">647 - T0859 Watertown SD </option>
                <option value="508 - T0860  Burlington IA ">508 - T0860 Burlington IA </option>
                <option value="618 - T0861  Buffalo MN ">618 - T0861 Buffalo MN </option>
                <option value="592 - T0862  Chanhassen MN ">592 - T0862 Chanhassen MN </option>
                <option value="619 - T0863  Menomonee Falls WI ">619 - T0863 Menomonee Falls WI </option>
                <option value="514 - T0864  Delafield WI ">514 - T0864 Delafield WI </option>
                <option value="520 - T0878  Fort Dodge IA ">520 - T0878 Fort Dodge IA </option>
                <option value="534 - T0879  Lincoln NE">534 - T0879 Lincoln NE</option>
                <option value="682 - T0880 Schaumburg Higgins Rd">682 - T0880 Schaumburg Higgins Rd</option>
                <option value="524 - T0891  Galesburg IL ">524 - T0891 Galesburg IL </option>
                <option value="602 - T0893  Wood Dale IL ">602 - T0893 Wood Dale IL </option>
                <option value="649 - T0895  Bourbonnais IL ">649 - T0895 Bourbonnais IL </option>
                <option value="680 - T0904 Target Grand Rapids , MN">680 - T0904 Target Grand Rapids , MN</option>
                <option value="544 - T0926  Moline IL ">544 - T0926 Moline IL </option>
                <option value="651 - T0929  Peru IL ">651 - T0929 Peru IL </option>
                <option value="681 - T0930 Target St. Cloud Lincoln Ave , MN ">681 - T0930 Target St. Cloud Lincoln Ave , MN </option>
                <option value="652 - T0943  Champaign IL ">652 - T0943 Champaign IL </option>
                <option value="537 - T1060  Madison WI">537 - T1060 Madison WI</option>
                <option value="564 - T1068  Owatonna MN ">564 - T1068 Owatonna MN </option>
                <option value="539 - T1069  Madison WI">539 - T1069 Madison WI</option>
                <option value="593 - T1096  Winona MN ">593 - T1096 Winona MN </option>
                <option value="509 - T1113  Coralville IA ">509 - T1113 Coralville IA </option>
                <option value="597 - T1170  Ames IA ">597 - T1170 Ames IA </option>
                <option value="629 - T1210  Hutchinson MN ">629 - T1210 Hutchinson MN </option>
                <option value="526 - T1212  Grafton WI ">526 - T1212 Grafton WI </option>
                <option value="630 - T1246  Sturgeon Bay WI ">630 - T1246 Sturgeon Bay WI </option>
                <option value="631 - T1247  Green Bay WI">631 - T1247 Green Bay WI</option>
                <option value="632 - T1248  Appleton WI">632 - T1248 Appleton WI</option>
                <option value="590 - T1272  Shakopee MN ">590 - T1272 Shakopee MN </option>
                <option value="636 - T1311  New Berlin WI ">636 - T1311 New Berlin WI </option>
                <option value="572 - T1323  St. Charles IL ">572 - T1323 St. Charles IL </option>
                <option value="633 - T1334  Marquette MI ">633 - T1334 Marquette MI </option>
                <option value="523 - T1352  Chaska MN ">523 - T1352 Chaska MN </option>
                <option value="634 - T1483  Green Bay WI">634 - T1483 Green Bay WI</option>
                <option value="568 - T1522  Red Wing MN ">568 - T1522 Red Wing MN </option>
                <option value="506 - T1537  Bellevue NE ">506 - T1537 Bellevue NE </option>
                <option value="503 - T1767  Ankeny IA ">503 - T1767 Ankeny IA </option>
                <option value="515 - T1768  Cedar Rapids">515 - T1768 Cedar Rapids</option>
                <option value="517 - T1771  Cedar Rapids">517 - T1771 Cedar Rapids</option>
                <option value="513 - T1774  Eau Claire WI ">513 - T1774 Eau Claire WI </option>
                <option value="558 - T1777  Omaha NE">558 - T1777 Omaha NE</option>
                <option value="654 - T1783  Grand Forks ND ">654 - T1783 Grand Forks ND </option>
                <option value="595 - T1791  Urbandale IA ">595 - T1791 Urbandale IA </option>
                <option value="518 - T1792  Waterloo IA ">518 - T1792 Waterloo IA </option>
                <option value="655 - T1800  Sioux City IA ">655 - T1800 Sioux City IA </option>
                <option value="500 - T1801  Algonquin IL ">500 - T1801 Algonquin IL </option>
                <option value="525 - T1833  Savage MN ">525 - T1833 Savage MN </option>
                <option value="620 - T1880  Sheboygan WI ">620 - T1880 Sheboygan WI </option>
                <option value="639 - T1895  West Milwaukee WI ">639 - T1895 West Milwaukee WI </option>
                <option value="603 - T1896  South Elgin IL ">603 - T1896 South Elgin IL </option>
                <option value="505 - T1901  West Des Moines">505 - T1901 West Des Moines</option>
                <option value="656 - T1925  Oak Creek WI ">656 - T1925 Oak Creek WI </option>
                <option value="502 - T1939  Altoona IA ">502 - T1939 Altoona IA </option>
                <option value="604 - T1950  Streamwood IL ">604 - T1950 Streamwood IL </option>
                <option value="657 - T1951  Decatur IL ">657 - T1951 Decatur IL </option>
                <option value="550 - T2010  Omaha NE">550 - T2010 Omaha NE</option>
                <option value="598 - T2041  Des Moines IA">598 - T2041 Des Moines IA</option>
                <option value="673 - T2101  Roseville, MN ">673 - T2101 Roseville, MN </option>
                <option value="519 - T2106  Fitchburg WI ">519 - T2106 Fitchburg WI </option>
                <option value="683 - T2122 Hoffman Estates">683 - T2122 Hoffman Estates</option>
                <option value="552 - T2125  Omaha NE">552 - T2125 Omaha NE</option>
                <option value="559 - T2135  Oakdale MN ">559 - T2135 Oakdale MN </option>
                <option value="621 - T2180  Monticello MN ">621 - T2180 Monticello MN </option>
                <option value="543 - T2193  Maple Grove">543 - T2193 Maple Grove</option>
                <option value="658 - T2194  Bismarck ND ">658 - T2194 Bismarck ND </option>
                <option value="622 - T2199  West Allis WI ">622 - T2199 West Allis WI </option>
                <option value="611 - T2200  Fridley MN ">611 - T2200 Fridley MN </option>
                <option value="614 - T2223  Medina MN ">614 - T2223 Medina MN </option>
                <option value="659 - T2251  Pleasant Prairie WI ">659 - T2251 Pleasant Prairie WI </option>
                <option value="536 - T2303  Lincoln NE">536 - T2303 Lincoln NE</option>
                <option value="556 - T2326  Omaha NE">556 - T2326 Omaha NE</option>
                <option value="660 - T2348  Lake Geneva WI ">660 - T2348 Lake Geneva WI </option>
                <option value="554 - T2383  Omaha NE K Plaza ">554 - T2383 Omaha NE K Plaza </option>
                <option value="522 - T2388  Franklin WI ">522 - T2388 Franklin WI </option>
                <option value="528 - T2449  Waconia MN ">528 - T2449 Waconia MN </option>
                <option value="512 - T2454  Council Bluff IA ">512 - T2454 Council Bluff IA </option>
                <option value="577 - T2491  Sun Praire WI ">577 - T2491 Sun Praire WI </option>
                <option value="521 - T2526  Cedar Falls IA ">521 - T2526 Cedar Falls IA </option>
                <option value="642 - T2540  Sioux Falls SD ">642 - T2540 Sioux Falls SD </option>
                <option value="624 - T2546  Waukesha WI ">624 - T2546 Waukesha WI </option>
                <option value="605 - T2559  Dekalb IL ">605 - T2559 Dekalb IL </option>
                <option value="623 - T2586  Wauwatosa WI ">623 - T2586 Wauwatosa WI </option>
                <option value="541 - T2765  Madison WI Hilldale ">541 - T2765 Madison WI Hilldale </option>
                <option value="661 - T2780  Brookfield WI ">661 - T2780 Brookfield WI </option>
                <option value="586 - T3204  St Paul  Express MN">586 - T3204 St Paul Express MN</option>
                <option value="792 - T3842  DeKalb, IL UDC ">792 - T3842 DeKalb, IL UDC </option>
                <option value="793 - T3895  Cedar Falls, IA FDC">793 - T3895 Cedar Falls, IA FDC</option>
                <option value="121  Jerry's Cub Harmar Roseville MN ">121 Jerry's Cub Harmar Roseville MN </option>
                <option value="124  Jerry's Cub Lake St Minneapolis MN ">124 Jerry's Cub Lake St Minneapolis MN </option>
                <option value="140  Rodamacher's Cub Shakopee MN  ">140 Rodamacher's Cub Shakopee MN </option>
                <option value="143  Jerry's Cub Southdale Edina Mn ">143 Jerry's Cub Southdale Edina Mn </option>
                <option value="147  Jerry's Cub Woodbury MN   147">147 Jerry's Cub Woodbury MN 147</option>
                <option value="157  Jerry's Cub Nicollet Minneapolis Mn ">157 Jerry's Cub Nicollet Minneapolis Mn </option>
                <option value="160  Jerry's Cub Sunray St.Paul MN  ">160 Jerry's Cub Sunray St.Paul MN </option>
                <option value="164  Jerry's Cub Roseville MN (Larpenteur)">164 Jerry's Cub Roseville MN (Larpenteur)</option>
                <option value="261  Lunds &amp; Byerly's Prior Lake M n ">261 Lunds &amp; Byerly's Prior Lake M n </option>
                <option value="262  Lunds &amp; Byerly's St. Louis Park ">262 Lunds &amp; Byerly's St. Louis Park </option>
                <option value="264  Lunds &amp; Byerly's Woodbury Mn">264 Lunds &amp; Byerly's Woodbury Mn</option>
                <option value="265  Lunds &amp; Byerly's Eden Prairie Mn">265 Lunds &amp; Byerly's Eden Prairie Mn</option>
                <option value="266  Lunds &amp; Byerly's Minnetonka (HWY 7)">266 Lunds &amp; Byerly's Minnetonka (HWY 7)</option>
                <option value="267  Lunds &amp; Byerly's Bloomington">267 Lunds &amp; Byerly's Bloomington</option>
                <option value="268  Lunds &amp; Byerly's Uptown MPLS">268 Lunds &amp; Byerly's Uptown MPLS</option>
                <option value="269  Lunds &amp; Byerly's France Ave">269 Lunds &amp; Byerly's France Ave</option>
                <option value="270  Lunds &amp; Byerly's Burnsville Mn">270 Lunds &amp; Byerly's Burnsville Mn</option>
                <option value="271  Lunds &amp; Byerly's Chanhassen Mn">271 Lunds &amp; Byerly's Chanhassen Mn</option>
                <option value="272  Lunds &amp; Byerly's Eagan Mn">272 Lunds &amp; Byerly's Eagan Mn</option>
                <option value="273  Lunds &amp; Byerly's Roseville Mn">273 Lunds &amp; Byerly's Roseville Mn</option>
                <option value="275  Lunds &amp; Byerly's Downtown Minneapolis">275 Lunds &amp; Byerly's Downtown Minneapolis</option>
                <option value="276  Lunds &amp; Byerly's Harmon Wine &amp; Spirits">276 Lunds &amp; Byerly's Harmon Wine &amp; Spirits</option>
                <option value="277  Lunds &amp; Byerly's Wayzata">277 Lunds &amp; Byerly's Wayzata</option>
                <option value="278  Lunds &amp; Byerly's Northeast Minneapolis">278 Lunds &amp; Byerly's Northeast Minneapolis</option>
                <option value="279  Lunds &amp; Byerly's Golden Valley">279 Lunds &amp; Byerly's Golden Valley</option>
                <option value="280  Lunds &amp; Byerly's Ridgedale">280 Lunds &amp; Byerly's Ridgedale</option>
                <option value="281  Lunds &amp; Byerly's Maple Grove">281 Lunds &amp; Byerly's Maple Grove</option>
                <option value="301 Lakeside Foods Salem">301 Lakeside Foods Salem</option>
                <option value="302 Festival Foods Hales Corners">302 Festival Foods Hales Corners</option>
                <option value="303 Festival Foods Verona">303 Festival Foods Verona</option>
                <option value="170 Hugo's Park Rapids, MN">170 Hugo's Park Rapids, MN</option>
                <option value="171 Hugo's Thief River Falls, MN">171 Hugo's Thief River Falls, MN</option>
                <option value="172 Hugo's East Grand Forks, MN">172 Hugo's East Grand Forks, MN</option>
                <option value="173 Hugo's Washington St. Grand Forks, ND">173 Hugo's Washington St. Grand Forks, ND</option>
                <option value="174 Hugo's 13th Ave N. Grand Forks, ND">174 Hugo's 13th Ave N. Grand Forks, ND</option>
                <option value="175 Hugo's Central Bakery 13th Ave N. Grand Forks, ND">175 Hugo's Central Bakery 13th Ave N. Grand Forks, ND</option>
                <option value="176 Hugo's Columbia Rd, Grand Forks ND">176 Hugo's Columbia Rd, Grand Forks ND</option>
                <option value="177 Hugo's 32nd Ave Grand Forks, ND">177 Hugo's 32nd Ave Grand Forks, ND</option>
                <option value="178 Hugo's Grafton, ND">178 Hugo's Grafton, ND</option>
                <option value="887  Nordstrom Rack Knollwood #275 St. Louis Park, MN">887 Nordstrom Rack Knollwood #275 St. Louis Park, MN</option>
                <option value="888  Nordstrom Rack MOA #233 Bloomington, MN">888 Nordstrom Rack MOA #233 Bloomington, MN</option>
                <option value="889  Nordstrom Ridgedale Center Minnetonka, MN">889 Nordstrom Ridgedale Center Minnetonka, MN</option>
                <option value="890  Nordstrom Rack Arbor Lakes #271 Maple Grove, MN">890 Nordstrom Rack Arbor Lakes #271 Maple Grove, MN</option>
                <option value="891  Nordstrom Rack Woodbury #256 Woodbury, MN">891 Nordstrom Rack Woodbury #256 Woodbury, MN</option>
                </select>
        )
    }
    const handleInputChange = (e, index) => {
        const incIndex = index + 1;
        if (e.target.id === `Mileage Date ${incIndex}`) {
        const list = [...perDiem];
        list[index].mileageDate = e.target.value;
        addPerDiem(list); 
        } else if (e.target.id === 'Starting Point') {
            const list = [...perDiem];
            list[index].arrivalStore = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'Destination Point') {
            const list = [...perDiem];
            list[index].destinationStore = e.target.value;
            addPerDiem(list); 
        }else if (e.target.id === 'rt') {
            const list = [...perDiem];
            list[index].rtow = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'ow') {
            const list = [...perDiem];
            list[index].rtow = e.target.value;
            addPerDiem(list); 
        }
    }

    const handleAddBackPay = (e) => {
        e.preventDefault();
        const list = [...perDiem];
        list.push({
            mileageDate: '',
            arrivalStore: '',
            destinationStore: '',
            rtow: ''
        })
        addPerDiem(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...perDiem];
        list.splice(index,1)
        addPerDiem(list)
    }
        return (
            <div className="container">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Bonus</span></h1><br />
                <form>
                    <label for="employeenum">Employee #:</label><br />
                    <input type="text" id="employeenum" name="employeenum"/><br /><br />
                    <label for="employeename"> Employee Name:</label><br />
                    <input type="text" id="employeename" name="employeename"/><br /><br />
                    <label for="store">Store:</label><br />
                    {generateStoreList('store', 'store')}
                    <br /><br />
                    <label for="city">City:</label><br />
                    <input type="text" id="city" name="city"/><br /><br />
                    <label for="state"> State:</label><br />
                    <input type="text" id="state" name="state"/>
                    <br /><br />
                    <label for="first_hotel">First hotel night needed:</label><br />
                    <input type="date" name="first_hotel" id="first_hotel"></input><br /><br />
                    <label for="last_hotel">Last hotel night needed:</label><br />
                    <input type="date" name="last_hotel" id="last_hotel"></input><br /><br />
                    <label for="arrival">Arrival Date:</label><br />
                    <input type="date" name="arrival" id="arrival"></input><br /><br />
                    <label for="departure">Departure Date:</label><br />    
                    <input type="date" name="departure" id="departure"></input><br /><br />
                    { perDiem.map((row, index) => { 
                        const incIndex = index + 1;
                        const mileageName =`Mileage Date ${incIndex}`;
                        const startName = `Starting Point ${incIndex}`;
                        const destinationName = `Destination Point ${incIndex}`;
                        const rtowName = `Select RT/OW ${incIndex}`;
                        const destinationID = 'Destination Point';
                        const arrivalID = 'Starting Point';
                        return (
                            <div key={index} id="mileageEntries">
                                <label for={mileageName}>{mileageName}</label><br />
                                <input key={mileageName} type="date" id={mileageName} name={mileageName} onChange={e => handleInputChange(e, index)} ></input><br />
                                <label for={startName}>{startName}</label><br />
                                {generateStoreList(startName, arrivalID, index)}
                                <br /><br />
                                <label for={destinationName}>{destinationName}</label><br />
                                {generateStoreList(destinationName, destinationID, index )}
                                <br /><br />
                                <label >{rtowName}</label><br />
                                <label for="rt">Round Trip</label>
                                <input key={rtowName} type="radio" id="rt" name={rtowName} value="Round Trip" onChange={e => handleInputChange(e, index)}></input><br />
                                <label for="ow">One Way</label>
                                <input key={rtowName} type="radio" id="ow" name={rtowName} value="One Way" onChange={e => handleInputChange(e, index)}></input><br />
                                {perDiem.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="backPayRemoveButton">Remove</button>}
                                {perDiem.length - 1 === index && <button onClick={handleAddBackPay} id="backPayAddButton">Add Back Pay</button>}
                            </div>
                        );
                    })}<br />
                    <label for="comments">REASON WHY THIS PAY WAS MISSED</label><br />
                    <textarea name="comments" id="comments"></textarea><br />
                    <br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
}

export default PerDiem;