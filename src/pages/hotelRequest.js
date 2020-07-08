import React, { useState } from 'react';
import '../css/hotelRequest.css';

function HotelRequest() {
    const [managerSettings, addManagerSetting] = useState([
        {
            newPS: false,
            manager: '',
            numPeople: "1",
            numRooms: "2"
        }
    ]);
    const getPSList = (manager) => {
        if (manager === "Ausencio Cruz") {
            return (
                <div>
                <select><option value="">Select Employee</option>
                <option value="Alejandro Cruz #11610">Alejandro Cruz #11610</option>
                <option value="Cirilo Lopez Reyes #9351">Cirilo Lopez Reyes #9351</option>
                <option value="Delfino Gil #8937">Delfino Gil #8937</option>
                <option value="Edilberto Gonzalez #11784">Edilberto Gonzalez #11784</option>
                <option value="Edgar Solis #10702">Edgar Solis #10702</option>
                <option value="Gregorio Cruz Gil #11609">Gregorio Cruz Gil #11609</option>
                <option value="Israel Lopez Reyes #8981">Israel Lopez Reyes #8981</option>
                <option value="Jose Alvarez Cruz #9649">Jose Alvarez Cruz #9649</option>
                <option value="Juan Alvarez #11785">Juan Alvarez #11785</option>
                </select><br />
                </div>
            );
        } else if (manager === "Cruz Hernandez") {
            return (
                <div>
                    <select>
                        <option value="">Select Employee</option>
                        <option value="Jose Cornejo">Jose Cornejo</option>
                        <option value="Leonel Yanqui #2140">Leonel Yanqui #2140</option>
                        <option value="Octavio Gutierrez #4538">Octavio Gutierrez #4538</option>
                        <option value="Israel Ortiz Cabrera #5657">Israel Ortiz Cabrera #5657</option>
                        <option value="Santiago Chavez Climaco #8117">Santiago Chavez Climaco #8117</option>
                        <option value="Jonathan Guzman Rivera #9999">Jonathan Guzman Rivera #9999</option>
                        <option value="Alberto Flores #10354">Alberto Flores #10354</option>
                        </select>
                </div>
            );
        } else if (manager === "Daniel De la Paz") {
            return (
                <div>
                    <select>
                        <option value="">Select Employee</option>
                        <option value="Bravo Asuncion #10973">Bravo Asuncion #10973</option>
                        <option value="Calletano Cruz #9997">Calletano Cruz #9997</option>
                        <option value="Miguel Flores #8566">Miguel Flores #8566</option>
                        <option value="Gilberto Cortez #8163">Gilberto Cortez #8163</option>
                        <option value="Dinora Lemus #8164">Dinora Lemus #8164</option>
                        <option value="Christopher Lozada #11007">Christopher Lozada #11007</option>
                        <option value="Fernando Lozada #9239">Fernando Lozada #9239</option>
                        <option value="Javier Mora #10946">Javier Mora #10946</option>
                        <option value="Pablo Olivar Cerezo #9625">Pablo Olivar Cerezo #9625</option>
                        <option value="Omar Munoz #10446">Omar Munoz #10446</option>
                        <option value="Leticia Rodriguez #10951">Leticia Rodriguez #10951</option>
                        <option value="Cirilo Vega #9238">Cirilo Vega #9238</option>
                    </select>
                </div>
            );
        } else if (manager === "Daniel De la Paz North") {
            return (
                <div>
                    <select>
                        <option value="">Select Employee</option>
                        <option value="Cruz Hernandez">Cruz Hernandez</option>
                        <option value="Jose Cornejo">Jose Cornejo</option>
                        <option value="Leonel Yanqui #2140">Leonel Yanqui #2140</option>
                        <option value="Octavio Gutierrez #4538">Octavio Gutierrez #4538</option>
                        <option value="Israel Ortiz Cabrera #5657">Israel Ortiz Cabrera #5657</option>
                        <option value="Santiago Chavez Climaco #8117">Santiago Chavez Climaco #8117</option>
                        <option value="Jonathan Guzman Rivera #9999">Jonathan Guzman Rivera #9999</option>
                        <option value="Alberto Flores #10354">Alberto Flores #10354</option>
                        </select>
                </div>
            );
        } else if (manager === "Jose Lopez") {
            return (
                <div>
                    <select>
                        <option value="">Select Employee</option>
                        <option value="Cesar Perez">Cesar Perez</option>
                        <option value="Salvador Lucio Hernandez # 9193">Salvador Lucio Hernandez # 9193</option>
                        <option value="Jose Rico #4654">Jose Rico #4654</option>
                        <option value="Lucas Jimenez #521">Lucas Jimenez #521</option>
                        <option value="Alfredo Martinez #3568">Alfredo Martinez #3568</option>
                        <option value="Tony Rosada #4374">Tony Rosada #4374</option>
                        <option value="Margaro Gamino #4639">Margaro Gamino #4639</option>
                        <option value="Belarmino Alcantara #3712 ">Belarmino Alcantara #3712 </option>
                        <option value="Belarmino Rodriguez #4802">Belarmino Rodriguez #4802</option>
                    </select>
                </div>
            );
        }
        else if (manager === "Zach Harlow") {
            return (
                <div>
                    <select>
                        <option value="">Select Employee 1</option>
                        <option value="Cruz Hernandez">Cruz Hernandez</option>
                        <option value="Jose Cornejo">Jose Cornejo</option>
                        <option value="Leonel Yanqui #2140">Leonel Yanqui #2140</option>
                        <option value="Octavio Gutierrez #4538">Octavio Gutierrez #4538</option>
                        <option value="Israel Ortiz Cabrera #5657">Israel Ortiz Cabrera #5657</option>
                        <option value="Santiago Chavez Climaco #8117">Santiago Chavez Climaco #8117</option>
                        <option value="Jonathan Guzman Rivera #9999">Jonathan Guzman Rivera #9999</option>
                        <option value="Alberto Flores #10354">Alberto Flores #10354</option>
                        </select>
                </div>
            );
        }
        else if (manager === "Ausencio Cruz") {
            return (
                <div>
                    <select>
                        <option value="">Select Employee 1</option>
                        <option value="Cruz Hernandez">Cruz Hernandez</option>
                        <option value="Jose Cornejo">Jose Cornejo</option>
                        <option value="Leonel Yanqui #2140">Leonel Yanqui #2140</option>
                        <option value="Octavio Gutierrez #4538">Octavio Gutierrez #4538</option>
                        <option value="Israel Ortiz Cabrera #5657">Israel Ortiz Cabrera #5657</option>
                        <option value="Santiago Chavez Climaco #8117">Santiago Chavez Climaco #8117</option>
                        <option value="Jonathan Guzman Rivera #9999">Jonathan Guzman Rivera #9999</option>
                        <option value="Alberto Flores #10354">Alberto Flores #10354</option>
                        </select>
                </div>
            );
        }
    }
    const handleChange = (e) => {
        if (e.target.id === "dm") {
        const settings = [...managerSettings];
        settings[0].manager = e.target.value
        addManagerSetting(settings);
    } else if (e.target.id === "newPS") {
        const settings = [...managerSettings];
        settings[0].newPS = !settings[0].newPS;
        addManagerSetting(settings);
    } else if (e.target.id === "peopleNum" && e.target.value === "2") {
        const settings = [...managerSettings];
        settings[0].numPeople = "2"
        addManagerSetting(settings);
    } else if (e.target.id === "roomNum" && e.target.value === "1") {
        const settings = [...managerSettings];
        settings[0].numRooms = "1"
        addManagerSetting(settings);
    } else if (e.target.id === "roomNum" && e.target.value === "2") {
        const settings = [...managerSettings];
        settings[0].numRooms = "2"
        addManagerSetting(settings);
    } else if (e.target.id === "peopleNum" && e.target.value === "1") {
        const settings = [...managerSettings];
        settings[0].numPeople = "1"
        addManagerSetting(settings);
    }
    }
    const getStoreList = (e) =>{
        const manager = managerSettings[0].manager;
        if (manager === '') {
            return '';
        }
        else if (manager === "Ausencio Cruz") {
            return (
                <div>
                    <br />
                    <label>IA/IL/WI District</label>
                <select>
                    <option value="">Select location</option>
                    <option value="T0082 Target Waukesha WI (PFresh)  #638">T0082 Target Waukesha WI (PFresh) #638</option>
                    <option value="T0086 Target Dubuque IA (PFresh)  #516">T0086 Target Dubuque IA (PFresh) #516</option>
                    <option value="T0152 Target Racine WI (General)  #645">T0152 Target Racine WI (General) #645</option>
                    <option value="T0533 Target Davenport IA (SuperT)  #507">T0533 Target Davenport IA (SuperT) #507</option>
                    <option value="T0809 Target Janesville WI (PFresh)  #531">T0809 Target Janesville WI (PFresh) #531</option>
                    <option value="T0835 Target Schaumburg IL (SuperT)  #600">T0835 Target Schaumburg IL (SuperT) #600</option>
                    <option value="T0860 Target Burlington IA (General)  #508">T0860 Target Burlington IA (General) #508</option>
                    <option value="T0864 Target Delafield WI (PFresh)  #514">T0864 Target Delafield WI (PFresh) #514</option>
                    <option value="T0880 Target Schaumburg, IL Higgins Rd #682">T0880 Target Schaumburg, IL Higgins Rd #682</option>
                    <option value="T0891 Target Galesburg IL (General)  #524">T0891 Target Galesburg IL (General) #524</option>
                    <option value="T0895 Target Bourbonnais IL (PFresh)  #649">T0895 Target Bourbonnais IL (PFresh) #649</option>
                    <option value="T0926 Target Moline IL (PFresh)  #544">T0926 Target Moline IL (PFresh) #544</option>
                    <option value="T0929 Target Peru IL (General)  #651">T0929 Target Peru IL (General) #651</option>
                    <option value="T0943 Target Champaign IL (PFresh)  #652">T0943 Target Champaign IL (PFresh) #652</option>
                    <option value="T1060 Target Madison WI Junction Road (PFresh)  #537">T1060 Target Madison WI Junction Road (PFresh) #537</option>
                    <option value="T1069 Target Madison WI Lien Road (PFresh)  #539">T1069 Target Madison WI Lien Road (PFresh) #539</option>
                    <option value="T1113 Target Coralville IA (PFresh)  #509">T1113 Target Coralville IA (PFresh) #509</option>
                    <option value="T1311 Target New Berlin WI (PFresh)  #636">T1311 Target New Berlin WI (PFresh) #636</option>
                    <option value="T1323 Target St. Charles IL (SuperT)  #572">T1323 Target St. Charles IL (SuperT) #572</option>
                    <option value="T1768 Target Cedar Rapids (Blairs Ferry Rd) IA (SuperT)  #515">T1768 Target Cedar Rapids (Blairs Ferry Rd) IA (SuperT) #515</option>
                    <option value="T1771 Target Cedar Rapids (Edgewood Rd) IA (SuperT)  #517">T1771 Target Cedar Rapids (Edgewood Rd) IA (SuperT) #517</option>
                    <option value="T1925 Target Oak Creek WI (PFresh)  #656">T1925 Target Oak Creek WI (PFresh) #656</option>
                    <option value="T1950 Target Streamwood IL (SuperT)  #604">T1950 Target Streamwood IL (SuperT) #604</option>
                    <option value="T1951 Target Decatur IL (General)  #657">T1951 Target Decatur IL (General) #657</option>
                    <option value="T2106 Target Fitchburg WI (SuperT)  #519">T2106 Target Fitchburg WI (SuperT) #519</option>
                    <option value="T2122 Target Hoffman Estates, IL #683">T2122 Target Hoffman Estates, IL #683</option>
                    <option value="T2251 Target Pleasant Prairie WI (PFresh)  #659">T2251 Target Pleasant Prairie WI (PFresh) #659</option>
                    <option value="T2348 Target Lake Geneva WI (General)  #660">T2348 Target Lake Geneva WI (General) #660</option>
                    <option value="T2388 Target Franklin WI (PFresh)  #522">T2388 Target Franklin WI (PFresh) #522</option>
                    <option value="T2491 Target Sun Praire WI (PFresh)  #577">T2491 Target Sun Praire WI (PFresh) #577</option>
                    <option value="T2546 Target Waukesha WI (PFresh)  #624">T2546 Target Waukesha WI (PFresh) #624</option>
                    <option value="T2765 Target Madison WI Hilldale (PFresh)">T2765 Target Madison WI Hilldale (PFresh)</option>
                    </select>
                    </div>
            );
        } else if (manager === "Cruz Hernandez") {
            return (
                <div>
                    <br />
                <label>NE/SD/IA West District</label>
                <select><option value="">Select location</option>
                <option value="T0069 Target West Des Moines IA (PFresh)  #580">T0069 Target West Des Moines IA (PFresh) #580</option>
                <option value="T0076 Target Sioux Falls SD (PFresh)  #641">T0076 Target Sioux Falls SD (PFresh) #641</option>
                <option value="T0217 Target Lincoln NE N 48th Street (PFresh)  #532">T0217 Target Lincoln NE N 48th Street (PFresh) #532</option>
                <option value="T0530 Target Omaha NE 132nd Street (SuperT)  #548">T0530 Target Omaha NE 132nd Street (SuperT) #548</option>
                <option value="T0532 Target Papillion NE (SuperT)  #566">T0532 Target Papillion NE (SuperT) #566</option>
                <option value="T0590 Target Cedar Falls, IA RDC (Distribution)  #791">T0590 Target Cedar Falls, IA RDC (Distribution) #791</option>
                <option value="T0803 Target Des Moines IA East Army Post Road (General)  #596">T0803 Target Des Moines IA East Army Post Road (General) #596</option>
                <option value="T0804 Target Mason City IA (SuperT)  #501">T0804 Target Mason City IA (SuperT) #501</option>
                <option value="T0848 Target Aberdeen SD (General)  #646">T0848 Target Aberdeen SD (General) #646</option>
                <option value="T0856 Target Norfolk NE (General)  #546">T0856 Target Norfolk NE (General) #546</option>
                <option value="T0857 Target Kearney NE (PFresh)  #530">T0857 Target Kearney NE (PFresh) #530</option>
                <option value="T0859 Target Watertown SD (General)  #647">T0859 Target Watertown SD (General) #647</option>
                <option value="T0878 Target Fort Dodge IA (PFresh)  #520">T0878 Target Fort Dodge IA (PFresh) #520</option>
                <option value="T0879 Target Lincoln NE South 56th Street (PFresh)  #534">T0879 Target Lincoln NE South 56th Street (PFresh) #534</option>
                <option value="T1170 Target Ames IA (PFresh)  #597">T1170 Target Ames IA (PFresh) #597</option>
                <option value="T1537 Target Bellevue NE (PFresh)  #506">T1537 Target Bellevue NE (PFresh) #506</option>
                <option value="T1767 Target Ankeny IA (SuperT)  #503">T1767 Target Ankeny IA (SuperT) #503</option>
                <option value="T1777 Target Omaha NE West Center Road (SuperT)  #558">T1777 Target Omaha NE West Center Road (SuperT) #558</option>
                <option value="T1791 Target Urbandale IA (SuperT)  #595">T1791 Target Urbandale IA (SuperT) #595</option>
                <option value="T1792 Target Waterloo IA (SuperT)  #518">T1792 Target Waterloo IA (SuperT) #518</option>
                <option value="T1800 Target Sioux City IA (PFresh)  #655">T1800 Target Sioux City IA (PFresh) #655</option>
                <option value="T1901 Target West Des Moines (Mills Pkwy) IA (SuperT)  #505">T1901 Target West Des Moines (Mills Pkwy) IA (SuperT) #505</option>
                <option value="T1939 Target Altoona IA (PFresh)  #502">T1939 Target Altoona IA (PFresh) #502</option>
                <option value="T2010 Target Omaha NE North 73rd Plaza (PFresh)  #550">T2010 Target Omaha NE North 73rd Plaza (PFresh) #550</option>
                <option value="T2041 Target Des Moines IA Douglas Ave (PFresh)  #598">T2041 Target Des Moines IA Douglas Ave (PFresh) #598</option>
                <option value="T2125 Target Omaha NE Dodge Street (PFresh)  #552">T2125 Target Omaha NE Dodge Street (PFresh) #552</option>
                <option value="T2303 Target Lincoln NE South 40th Street (SuperT)  #536">T2303 Target Lincoln NE South 40th Street (SuperT) #536</option>
                <option value="T2326 Target Omaha NE Evans Plaza (SuperT)  #556">T2326 Target Omaha NE Evans Plaza (SuperT) #556</option>
                <option value="T2383 Target Omaha NE K Plaza (SuperT)  #554">T2383 Target Omaha NE K Plaza (SuperT) #554</option>
                <option value="T2454 Target Council Bluff IA (PFresh)  #512">T2454 Target Council Bluff IA (PFresh) #512</option>
                <option value="T2526 Target Cedar Falls IA (PFresh)  #521">T2526 Target Cedar Falls IA (PFresh) #521</option>
                <option value="T2540 Target Sioux Falls SD (PFresh)  #642">T2540 Target Sioux Falls SD (PFresh) #642</option>
                <option value="T3895 Target Cedar Falls, IA FDC (Distribution)  #793">T3895 Target Cedar Falls, IA FDC (Distribution) #793</option>
                </select>
                </div>
            );
        } else if (manager === "Daniel De la Paz North") {
            return (
                <div>
                    <br />
                    <label>MN Northern District</label><br />
                    <select><option value="">Select location</option>
                    <option value="T0004 Target Duluth, MN #674">T0004 Target Duluth, MN #674</option>
                    <option value="T0215 Target Division St., St. Cloud MN #675">T0215 Target Division St., St. Cloud MN #675</option>
                    <option value="T0657 Target Bemidji, MN #676">T0657 Target Bemidji, MN #676</option>
                    <option value="T0659 Target Baxter, MN #677">T0659 Target Baxter, MN #677</option>
                    <option value="T0821 Target Alexandria, MN	#678">T0821 Target Alexandria, MN	#678</option>
                    <option value="T0847 Target Virginia, MN #679">T0847 Target Virginia, MN #679</option>
                    <option value="T0904 Target Grand Rapids , MN #680">T0904 Target Grand Rapids , MN #680</option>
                    <option value="T0930 Target St. Cloud Lincoln Ave , MN #681">T0930 Target St. Cloud Lincoln Ave , MN #681</option>
                    </select><br />
                    
                </div>
            );
        } else if (manager === "Daniel De la Paz") {
            return (
                <div>
                    <br />
                    <label>MN Retail District</label>
                    <select><option value="">Select location</option>
                    <option value="T0003 Target Crystal MN (PFresh)  #615">T0003 Target Crystal MN (PFresh) #615</option>
                    <option value="T0005 Target Bloomington MN (PFresh)  #583">T0005 Target Bloomington MN (PFresh) #583</option>
                    <option value="T0052 Target Minneapolis MN East Lake Street (PFresh)  #584">T0052 Target Minneapolis MN East Lake Street (PFresh) #584</option>
                    <option value="T0240 Target Brooklyn Center MN (PFresh)  #606">T0240 Target Brooklyn Center MN (PFresh) #606</option>
                    <option value="T0260 Target St. Louis Park MN (PFresh)  #591">T0260 Target St. Louis Park MN (PFresh) #591</option>
                    <option value="T0360 Target Eagan MN (PFresh)  #585">T0360 Target Eagan MN (PFresh) #585</option>
                    <option value="T0619 Target Shoreview MN (SuperT)  #670">T0619 Target Shoreview MN (SuperT) #670</option>
                    <option value="T0620 Target Onalaska WI (Lacrosse) (PFresh)  #560">T0620 Target Onalaska WI (Lacrosse) (PFresh) #560</option>
                    <option value="T0661 Target Willmar MN (General)  #626">T0661 Target Willmar MN (General) #626</option>
                    <option value="T0664 Target Plymouth MN (SuperT)  #612">T0664 Target Plymouth MN (SuperT) #612</option>
                    <option value="T0693 Target Brooklyn Park MN (PFresh)  #607">T0693 Target Brooklyn Park MN (PFresh) #607</option>
                    <option value="T0861 Target Buffalo MN (PFresh)  #618">T0861 Target Buffalo MN (PFresh) #618</option>
                    <option value="T0862 Target Chanhassen MN (PFresh)  #592">T0862 Target Chanhassen MN (PFresh) #592</option>
                    <option value="T1068 Target Owatonna MN (General)  #564">T1068 Target Owatonna MN (General) #564</option>
                    <option value="T1096 Target Winona MN (General)  #593">T1096 Target Winona MN (General) #593</option>
                    <option value="T1210 Target Hutchinson MN (General)  #629">T1210 Target Hutchinson MN (General) #629</option>
                    <option value="T1272 Target Shakopee MN (PFresh)  #590">T1272 Target Shakopee MN (PFresh) #590</option>
                    <option value="T1352 Target Chaska MN (SuperT)  #523">T1352 Target Chaska MN (SuperT) #523</option>
                    <option value="T1522 Target Red Wing MN (General)  #568">T1522 Target Red Wing MN (General) #568</option>
                    <option value="T1774 Target Eau Claire WI (SuperT)  #513">T1774 Target Eau Claire WI (SuperT) #513</option>
                    <option value="T1833 Target Savage MN (SuperT)  #525">T1833 Target Savage MN (SuperT) #525</option>
                    <option value="T2101 Target Roseville, MN (SuperT)  #673">T2101 Target Roseville, MN (SuperT) #673</option>
                    <option value="T2135 Target Oakdale MN (PFresh)  #559">T2135 Target Oakdale MN (PFresh) #559</option>
                    <option value="T2180 Target Monticello MN (SuperT)  #621">T2180 Target Monticello MN (SuperT) #621</option>
                    <option value="T2193 Target Maple Grove (Grove Circle) MN (SuperT)  #543">T2193 Target Maple Grove (Grove Circle) MN (SuperT) #543</option>
                    <option value="T2200 Target Fridley MN (SuperT)  #611">T2200 Target Fridley MN (SuperT) #611</option>
                    <option value="T2223 Target Medina MN (PFresh)  #614">T2223 Target Medina MN (PFresh) #614</option>
                    <option value="T2449 Target Waconia MN (PFresh)  #528">T2449 Target Waconia MN (PFresh) #528</option>
                    <option value="T3204 Target St Paul Target Express MN (Express)  #586">T3204 Target St Paul Target Express MN (Express) #586</option>
                    <option value="889 Nordstrom Ridgedale Center, Minnetonka, MN">889 Nordstrom Ridgedale Center, Minnetonka, MN</option>
                    <option value="228 Menards Eau Claire West">228 Menards Eau Claire West</option>
                    </select>
                </div>
            );
        } else if (manager === "Zach Harlow") {
            return (
                <div>
                    <br />
                    <label>North Dakota District</label><br />
                    <select><option value="">Select location</option>
                    <option value="170 Hugo's Park Rapids, MN">170 Hugo's Park Rapids, MN</option>
                    <option value="171 Hugo's Thief River Falls, MN">171 Hugo's Thief River Falls, MN</option>
                    <option value="172 Hugo's East Grand Forks, MN">172 Hugo's East Grand Forks, MN</option>
                    <option value="173 Hugo's Washington St. Grand Forks, ND">173 Hugo's Washington St. Grand Forks, ND</option>
                    <option value="174 Hugo's 13th Ave N. Grand Forks, ND">174 Hugo's 13th Ave N. Grand Forks, ND</option>
                    <option value="175 Hugo's Central Bakery 13th Ave N. Grand Forks, ND">175 Hugo's Central Bakery 13th Ave N. Grand Forks, ND</option>
                    <option value="176 Hugo's Columbia Rd, Grand Forks ND">176 Hugo's Columbia Rd, Grand Forks ND</option>
                    <option value="177 Hugo's 32nd Ave Grand Forks, ND">177 Hugo's 32nd Ave Grand Forks, ND</option>
                    <option value="178 Hugo's Grafton, ND">178 Hugo's Grafton, ND</option>
                    </select>
                </div>
            );
        } else if (manager === "Jose Lopez") {
            return (
                <div>
                    <br />
                    <label>IL/WI/MI District District</label><br />
                    <select><option value="">Select location</option>
                    <option value="T0024 Target Greenfield WI (PFresh)  #637">T0024 Target Greenfield WI (PFresh) #637</option>
                    <option value="T0223 Target Milwaukee WI South Chase Ave (PFresh)  #540">T0223 Target Milwaukee WI South Chase Ave (PFresh) #540</option>
                    <option value="T0238 Target Appleton WI West Wisconsin Ave. (PFresh)  #635">T0238 Target Appleton WI West Wisconsin Ave. (PFresh) #635</option>
                    <option value="T0364 Target Schofield WI (PFresh)  #570">T0364 Target Schofield WI (PFresh) #570</option>
                    <option value="T0557 Target Oconomowoc, WI RDC (Distribution)  #790">T0557 Target Oconomowoc, WI RDC (Distribution) #790</option>
                    <option value="T0805 Target Marshfield WI (General)  #538">T0805 Target Marshfield WI (General) #538</option>
                    <option value="T0806 Target Stevens Point WI (General)  #574">T0806 Target Stevens Point WI (General) #574</option>
                    <option value="T0807 Target Oshkosh WI (PFresh)  #616">T0807 Target Oshkosh WI (PFresh) #616</option>
                    <option value="T0808 Target Fond Du Lac WI (General)  #617">T0808 Target Fond Du Lac WI (General) #617</option>
                    <option value="T0834 Target Elgin IL (General)  #599">T0834 Target Elgin IL (General) #599</option>
                    <option value="T0836 Target Glendale Heights IL (SuperT)  #601">T0836 Target Glendale Heights IL (SuperT) #601</option>
                    <option value="T0863 Target Menomonee Falls WI (PFresh)  #619">T0863 Target Menomonee Falls WI (PFresh) #619</option>
                    <option value="T0893 Target Wood Dale IL (PFresh)  #602">T0893 Target Wood Dale IL (PFresh) #602</option>
                    <option value="T1212 Target Grafton WI (PFresh)  #526">T1212 Target Grafton WI (PFresh) #526</option>
                    <option value="T1246 Target Sturgeon Bay WI (General)  #630">T1246 Target Sturgeon Bay WI (General) #630</option>
                    <option value="T1247 Target Green Bay WI Cormier Road (PFresh)  #631">T1247 Target Green Bay WI Cormier Road (PFresh) #631</option>
                    <option value="T1248 Target Appleton WI Kensington Drive (General)  #632">T1248 Target Appleton WI Kensington Drive (General) #632</option>
                    <option value="T1334 Target Marquette MI (PFresh)  #633">T1334 Target Marquette MI (PFresh) #633</option>
                    <option value="T1483 Target Green Bay WI Lime Kiln Road (PFresh)  #634">T1483 Target Green Bay WI Lime Kiln Road (PFresh) #634</option>
                    <option value="T1801 Target Algonquin IL (SuperT)  #500">T1801 Target Algonquin IL (SuperT) #500</option>
                    <option value="T1880 Target Sheboygan WI (General)  #620">T1880 Target Sheboygan WI (General) #620</option>
                    <option value="T1895 Target West Milwaukee WI (PFresh)  #639">T1895 Target West Milwaukee WI (PFresh) #639</option>
                    <option value="T1896 Target South Elgin IL (SuperT)  #603">T1896 Target South Elgin IL (SuperT) #603</option>
                    <option value="T2199 Target West Allis WI (PFresh)  #622">T2199 Target West Allis WI (PFresh) #622</option>
                    <option value="T2559 Target Dekalb IL (PFresh)  #605">T2559 Target Dekalb IL (PFresh) #605</option>
                    <option value="T2586 Target Wauwatosa WI (PFresh)  #623">T2586 Target Wauwatosa WI (PFresh) #623</option>
                    <option value="T2780 Target Brookfield WI (PFresh)  #661">T2780 Target Brookfield WI (PFresh) #661</option>
                    <option value="T3842 Target DeKalb, IL UDC (Distribution)  #792">T3842 Target DeKalb, IL UDC (Distribution) #792</option>
                    <option value="443 H&amp;M 0062 Woodfield Shopping Center Schaumburg">443 H&amp;M 0062 Woodfield Shopping Center Schaumburg</option>
                    <option value="444 H&amp;M 0072 Gurnee Mills Mall Gurnee">444 H&amp;M 0072 Gurnee Mills Mall Gurnee</option>
                    <option value="446 H&amp;M 0083 Hawthorn Center Vernon Hills">446 H&amp;M 0083 Hawthorn Center Vernon Hills</option>
                    <option value="447 H&amp;M 0085 Geneva Commons Geneva">447 H&amp;M 0085 Geneva Commons Geneva</option>
                    <option value="448 H&amp;M 0089 Brookfield Square Milwaukee">448 H&amp;M 0089 Brookfield Square Milwaukee</option>
                    <option value="449 H&amp;M 0094 West Towne Mall Madison">449 H&amp;M 0094 West Towne Mall Madison</option>
                    <option value="451 H&amp;M 0125 Bayshore Town Center Glendale">451 H&amp;M 0125 Bayshore Town Center Glendale</option>
                    <option value="456 H&amp;M 0227 Northbrook Court, Northbrook">456 H&amp;M 0227 Northbrook Court, Northbrook</option>
                    <option value="457 H&amp;M 0237 Southridge Mall Milwaukee">457 H&amp;M 0237 Southridge Mall Milwaukee</option>
                    <option value="458 H&amp;M 0283 Cherryvale Mall Rockford">458 H&amp;M 0283 Cherryvale Mall Rockford</option>
                    <option value="475 H&amp;M 0567 Spring Hill Mall, West Dundee">475 H&amp;M 0567 Spring Hill Mall, West Dundee</option>
                    <option value="477 H&amp;M 0577 East Towne Mall, Madison">477 H&amp;M 0577 East Towne Mall, Madison</option>
                    <option value="486 H&amp;M 0688 Appleton WI (Fox River Mall)">486 H&amp;M 0688 Appleton WI (Fox River Mall)</option>
                    </select>
                </div>
            );
        }
    }
    const newPS = (e) => {
        if (managerSettings[0].newPS === true) {

            return (
            <div>
                <br />
                <label for="newPS">Enter New PS:</label><br />
                <input type="text" name="newPS" id="newPS"></input>
            </div>
            );
        } else if (managerSettings[0].newPS === false) {
             if (managerSettings[0].manager === "Lino Huerta" || managerSettings[0].manager === "") {
                return '';
            }
            return (
                <div>
                    <br />
                    <label for="newPS">Employee 1</label><br />
                    {getPSList(managerSettings[0].manager)}
                    <br />
                    <label for="newPS">Employee 2</label><br />
                    {getPSList(managerSettings[0].manager)}
                </div>
            );
        } 
    }

    const numBeds = () => {
        if (managerSettings[0].numPeople === "2" && managerSettings[0].numRooms === "1") {
            return (
                <div>
                    <input type="text" defaultValue="2 Queen Beds (Double)"></input>
                    <br /><br />
                </div>
            );
        } else {
            return '';
        }
    }
        return (
            <div className="container">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Hotel Request</span></h1><br />
                <form>
                    <select id="dm" name="dm" onChange={e => handleChange(e)}>
                    <option value="">Select Manager</option>
                    <option value="Ausencio Cruz">Ausencio Cruz</option>
                    <option value="Cruz Hernandez">Cruz Hernandez</option>
                    <option value="Daniel De la Paz">Daniel De la Paz</option>
                    <option value="Daniel De la Paz North">Daniel De la Paz North</option>
                    <option value="Lino Huerta">Lino Huerta</option>
                    <option value="Jose Lopez">Jose Lopez</option>
                    <option value="Zach Harlow">Zach Harlow"</option>
                    </select>
                    <br />
                    {getStoreList()}<br />
                    <label for="checkIn">Check In Date:</label><br />
                    <input type="date" id="checkIn" name="checkIn" /><br /><br />
                    <label for="checkOut">Check Out Date:</label><br />
                    <input type="date" id="checkOut" name="checkOut" /><br /><br />
                    <label for="roomNum">How many rooms:</label><br />
                    <select id="roomNum" name="roomNum" onChange={e => handleChange(e)}>
                    <option value="">Number of Rooms:</option>
                    <option value="1">1 room</option>
                    <option value="2">2 rooms</option>
                    </select><br /><br />
                    <label for="peopleNum" >How many people in room:</label><br />
                    <select id="peopleNum" name="peopleNum" onChange={e => handleChange(e)}>
                        <option value="">Number of People:</option>
                        <option value="1">One Person</option>
                        <option value="2">Two People</option>
                    </select><br /><br />
                    {numBeds()}
                    <label for="newPS">New PS:</label>
                    <input type="checkbox" name="newPS" id="newPS" onChange={e => handleChange(e)}></input><br />
                    {newPS()}<br />
                    <label for="hotelReason">Reason for Hotel:</label><br />
                    <select name="hotelReason">
                        <option value="">Select an option</option>
                        <option value="VATs">VATs</option>
                        <option value="Full SR">Full SR</option>
                        <option value="Partial SR">Partial SR</option>
                        <option value="Full DSR">Full DSR</option>
                        <option value="Partial DSR">Partial DSR</option>
                        <option value="Full Carpet Extraction">Full Carpet Extraction</option>
                        <option value="Covering Location">Covering Location</option>
                        <option value="Closing WOs">Closing WOs</option>
                        <option value="Store Remodel">Store Remodel</option>
                    </select><br /><br />
                    <label for="notes">Notes:</label> <br />
                    <textarea name="notes" id="notes"></textarea><br /><br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
    }

export default HotelRequest
