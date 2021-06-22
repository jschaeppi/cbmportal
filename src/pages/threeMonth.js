import React, { Component } from 'react';
// import '../css/threeMonth.css';
export class threeMonth extends Component {
    constructor() {
        super();
        this.state = {
            radioItems: [`Flo-Pac Mop Bucket/Wringer Combo,35 qt, 26 qt - 35 qt,Yellow,Side Press,PE,1 Ea/Ctn`, "Duo-Sweep Warehouse Broom,13\" L, 7\" Trim,Black,Stiff Bristles,Foam,12 Ea/Ctn", "LobbyMaster Dust Pan,12\" W x 11\" H x 37\" H,Black,Plastic/PVC,6 Ea/Ctn", "Dust Mop Handle,60\" L, 1\" Dia,Natural,Clip On,Wood,12 Ea/Ctn", "Dust Mop Frame,5\" W x 36\" L,Gray,Metal,12 Ea/Ctn", "Dust Mop Frame,5\" W x 48\" L,Gray,Metal,12 Ea/Ctn", "Impact Pad Holder,3-5/8\" W x 9-1/2\" L,Gray,Threaded,Metal,12 Ea/Ctn" ,"Impact Scrub Brush,2-1/2\" W x 6\" L,Assorted,Iron Style,Plastic,6 Ea/Ctn", "Impact Scrub Brush,9\" W,White,PP,12 Ea/Ctn", "Carlisle Broom Handle,5 L, 15/16\" Dia, 2-1/2\" Tip,Clear,Threaded,Metal,12 Ea/Ctn", "Carlisle Floor Squeegee,18\" W,Black,Metal Moss,Foam Rubber/Steel,10 Ea/Ctn", "Flo-Pac Broom Handle,60\" L, 1.125\" Dia,Clear,Tapered,Lacquered Hardwood,12 Ea/Ctn", "Unger Scraper,4\" W x 48\" L, Light Duty,White/Black,Angled Head,Aluminum/Zinc Alloy,10 Ea/Ctn", "Impact Scraper Replacement Blade,4\" W,Reversible, Single Edge,Carbon Steel,10 Ea/Pkg", "ErgoTec Safety Scraper,1-1/2\" L,Silver,50 Ea/Ctn", "Unger Scraper Replacement Blade,Fits SR500, SR040,1-1/2\" L, #9,100 Ea/Ctn", "Nifty Nabber Grabber,36\" L,Green/Silver,Pistol Grip,Aluminum,5 Ea/Ctn", "Coleman Cable Extension Cord,50 L,Orange,3-Conductor, Water Resistant,Vinyl,6 Ea/Ctn", "Carlisle Janitorial Cart,19\" W x 45\" L x 39\" H,Gray,LLDPE,1 Ea/Ctn", "Carlisle Janitorial Cart,CAR JANITOR CART BLUE REPLACEMENT BAG,Blue,Nylon,1 Bag/Ctn", "Unger Bucket,11-1/2\" W x 23\" L x 10-1/2\" H, Heavy Duty,6 gal,Green,HDPE,5 Ea/Ctn", "Carlisle Squeegee,12\" W,Black/Silver,Dual Blade,Rubber/Zinc Plated Steel,6 Ea/Ctn", "Flo-Pac Strip Washer,14\" L,White,Rubber,10 Ea/Ctn", "OptiLoc Extension Pole,8 L,Silver/Green,2-Section,Anodized Aluminum,10 Ea/Ctn", "Impact Duster,52\" - 84\" L,White Handle/Multicolor Head,Extended, Non-Allergenic,Poly Wool,12 Ea/Ctn", "Impact Bowl Brush,15-1/2\" W,White/Black,Scratchless,Plastic,12 Ea/Ctn", "Impact Toilet Plunger,25\" H, 6\" Dia, Industrial Grade,Black/Natural,Wood,6 Ea/Ctn", "Barrier Tape,3\" W x 1000 L,Red,8 Rl/Ctn", "Impact Wet Floor Sign,10-3/4\" W x 24-5/8\" H,Plastic,Yellow,English/Spanish,6 Ea/Ctn", "Impact Ear Plug,OSFA,Foam,Yellow,Cone Shaped, Corded, Disposable,NRR 31,200 Pr/Box, 10 Box/Ctn", "Impact Dust Mask,OSFA,PP,White,Disposable, Non-Toxic,50 Ea/Box, 12 Box/Ctn", "Sanitaire Upright Vacuum Shake-Out Bag SC866E Quick Kleen Commercial 12\" W, 7 amp,1 Ea/Ctn", "Finish Wet Mop Head,1\" Head Band, 24 oz,Blue/White,Looped End,Rayon,12 Ea/Ctn", "Phazer Applicator Assembly,5\" W x 60\" L,Silver/Blue,Metal,1 Ea/Ctn"],
        }
    }
    label = (item, index) => {
        const name = `Cleaning_Supplies`;
        return (
                <label name={`${name} ${index}`} id={name}>
                    {item}
                </label>
        )
    }

    radioItems = (item, i) => {
        const options = [];
            options.push(<div id="radioDiv"><input type="radio" name={item} id={`Radio Units ${i+1}`} value="1"></input><label>1</label>&nbsp;&nbsp;<input type="radio" name={item} id={`Radio Units ${i+1}`} value="2"></input><label>2</label></div>)
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }

    render() {
        return (
            <div className="container">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Three Month Order</span></h1><br />
                <form>
                <label for="employeename"> Employee Name:</label><br />
                <input type="text" id="employeename" name="employeename"/><br /><br />
                <label for="employeenum">Employee #:</label><br />
                <input type="text" id="employeenum" name="employeenum"/><br /><br />
                <label >Store Number:</label><br />
                <select>
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
                </select><br /><br />
                <label >Order Form:</label>
                <table>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                            Wet Mop Head,1" Head Band, 24 oz,Blue,Looped End,Cotton/Rayon/Polyester Blend,12 Ea/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="9">9</option>
                                <option value="12">12</option>
                            </select>
                        </td>
                    </tr>
                    </div>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                        Starline Mop Head,6" W, 1-1/4" Head Band, Large,Green,Looped End,Cotton/Rayon Blend,12 Ea/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="9">9</option>
                                <option value="12">12</option>
                            </select>
                        </td>
                    </tr>
                    </div>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                            Wet Mop Head,1" Head Band, 24 oz,White,Looped End,Cotton/Rayon/Polyester Blend,12 Ea/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="9">9</option>
                                <option value="12">12</option>
                            </select>
                        </td>
                    </tr>
                    </div>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                            Wet Mop Handle,60" L, 1-1/8" Dia,Natural,Side Gate,Wood/Metal,12 Ea/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="9">9</option>
                                <option value="12">12</option>
                                </select>
                        </td>
                    </tr>
                    </div>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                            Ambitex Nitrile Examination Glove,Small, 8" L,Nitrile,Black,FDA Approved,Powder Free, Medical Grade,100 Ea/Box, 10 Box/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="3">3 box</option>
                                <option value="5">5 box</option>
                                <option value="8">8 box</option>
                             </select>
                        </td>
                    </tr>
                    </div>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                            Ambitex Nitrile Examination Glove,Medium, 9" L,Nitrile,Black,FDA Approved,Powder Free, Medical Grade,100 Ea/Box, 10 Box/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="4">4 box</option>
                                <option value="5">5 box</option>
                                <option value="8">8 box</option>
                            </select>
                        </td>
                    </tr>
                    </div>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                            Ambitex Nitrile Examination Glove,Large, 11" L,Nitrile,Black,FDA Approved,Powder Free, Medical Grade,100 Ea/Box, 10 Box/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="4">4 box</option>
                                <option value="5">5 box</option>
                                <option value="8">8 box</option>
                            </select>
                        </td>
                    </tr>
                    </div>
                    <div id="dataCells">
                    <tr>
                        <td id="label">
                            Ambitex Nitrile Examination Glove,XL, 9" L,Nitrile,Black,FDA Approved,Powder Free, Medical Grade,100 Glv/Box, 10 Box/Ctn
                        </td>
                        <td id="datacells">
                            <select>
                                <option value="">Select</option>
                                <option value="4">4 box</option>
                                <option value="5">5 box</option>
                                <option value="8">8 box</option>
                            </select>
                        </td>
                    </tr>
                    </div>
                    {this.state.radioItems.map((item, index) => {
                        return (
                            <div id="dataCells">
                            <tr>
                            <td id="label12">{this.label(item, index)}</td>
                            <td id="radio12">
                                {this.radioItems(item, index)}
                            </td>
                    </tr>
                    </div>
                        );
                     })}
                    <div id="dataCells">
                        <tr>
                            <td id="label12">
                            Impact Goggles,OSFA,PVC,Clear,Anti-Fog, Chemical Splash,60 Pr/Ctn
                            </td>
                            <td id="radio12">
                                <div id="radioDiv3">
                            <   input type="radio" name="form[6296559]" value="1" id="62965590" />
                                    1
                                    &nbsp;
                                <input type="radio" name="form[6296559]" value="2" id="62965591" />
                                    2
                                    &nbsp;
                                <input type="radio" name="form[6296559]" value="3" id="62965592" />
                                    3
                                </div>
                            </td>
                        </tr>
                    </div>
                    <div id="dataCells">
                        <tr>
                            <td id="label12">
                                @ CARLSON FEXP 8.5X 11 187PAGE WHT 3RING BIND HAZMAT MANUAL,3-Ring Binder,1 Ea
                            </td>
                            <td id="radio12">
                                <div id="radioDiv">
                                    <input type="radio" name="form[6264134]" value="1" id="62641340" /> 1
                                </div>
                            </td>
                        </tr>
                    </div>
                    <div id="dataCells">
                        <tr>
                            <td id="label12">
                                First Aid Only First Aid Kit,8" W x 3" L x 5" H, 71-Piece,White,Serves 10 People, Weatherproof,Plastic,672 Kit/Pal
                            </td>
                            <td id="radio12">
                                <div id="radioDiv">
                                <input type="radio" name="form[6376323]" value="1" id="63763230" /> 1
                                </div>
                            </td>
                        </tr>
                    </div>
                    <div id="dataCells">
                        <tr>
                            <td id="label12">
                                Phazer Microfiber Applicator Pad,21" W x 5-1/2" L,White,5 Pad/Ctn
                            </td>
                            <td id="radio12">
                                <div id="radioDiv">
                                    <input type="radio" name="form[6193265]" value="1" id="61932650" /> 1
                                </div>
                            </td>
                        </tr>
                    </div>
                </table><br />
                <label >Other Notes:</label> <br />
                <textarea id="notes"></textarea>
                <br />
                <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
    }
}

export default threeMonth
