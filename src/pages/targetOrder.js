import React, { Component } from 'react'
import '../css/targetOrder.css';
export class targetOrder extends Component {
    constructor() {
        super();
        this.state = {
             items: [
                "C0015- UHS Cleaner", "C0016 Crew Restroom Floor and Surface 1.5L RTD", "C0019 - Crew Restroom Floor & Surface Bottle", "C0022 - Signature wax", "C0024 - Spitfire Spray Bottle", "C0035 - Prostrip HD Stripper", "C0060 - Stride Citrus Neutral Cleaner Accumix", "C0061 - Gum Remove", "C0062 - Citrus Express Gel", "C0090- SPITFIRE POWER CLEANER 1.5L RTD", "C0091-EcoLab LmEntary", "C0092 - Alpha Hp Brathroom Disinfectant Cleaner", "C0093 - Alpha Hp Bathroom Disinfectant Spray Bottle", "C0096 - Kitchen Degreaser Spray Bottle", "C0097 - Glance Glass & Surface Spray Bottle", "C0098 - Dibs Neutralize", "C0128 - Crew Emereld Creme Cleanser", "C1100 - Crew Emereld Creme Cleanser", "C1101 – 14” Stripping pad (green)", "C1102 – 16” Stripping pad (Green)", "C1103 – 17” Stripping pad (green)", "C1105 –20” Stripping pad (Green)", "C1108 - 16 \"Deep Scrubbing Pad (Maroon)", "C1109 - 17 \"Deep Scrubbing Pad (MaroonB)", "C1112 - 13\" Deep Scrubbing Pad (Maroon)", "C1113 - 14\" Deep Scrubbing Pad (Maroon)", "C1117 - 20\" Deep Scrubbing Pad (Maroon)", "C1118 - 13\" Daily Cleaning Pad (Red)", "C1119 - 14\" Daily Cleaning Pad (Red)", "C1120 - 16\" Daily Cleaning Pad (Red)", "C1121 - 17\" Daily Cleaning Pad (Red)", "C1123 - 20\" Dailycleaning Pad (Red)", "C1155 - Grit Screen Pad (17\")", "C1156 - Grit Screen Pad (20\")", "C1204 - General Purpose Spotter(6/32oz.)", "C1205 - Paint, Oil & Grease Remover", "C1208 - Power Foam Bravo Spot Stripper", "C1209 Suma Inox Stainless Steel Polish", "C1210 - Doodlebug General Purpose Brush", "C1211 - Doodlebug High Pro Black Pad", "C1244 - Jworks Strata Degreaser", "C1245 - Liquid Defoamer", "C1246 - Joncrete Concrete & Floor Restorer", "C1273 - 27\" Burnishing Pad", "C1300 - Stench & Stain Digester", "C1301 - Heavy Duty Prespray Cleaner", "C1303 - Glance Glass & Surface Cleaner(1/5l Rtd)", "C1307-Diversey Dry Foam Shampoo and Encapsulation Cleaner", "C1310 - Rust & Tannin Treatment", "C1315 - Trailblazer Rinsable Applicator Pad", "C1316 - Trailblazer Finish Kit", "C1317 - Prospeed Signature Uhs Floor", "C1321 - Prospeed Signature Floor Finish", "55 Gal. Brute Gray Barrel", "Pkg Of 10 Filter Bag 10 Qt(Big)", "Pkg of 10 Vacuum filter bags 6 QT(SMALL)(BACKPACK"
            ], 
            radioItems2: ["Dust Bag, Barracuda", "Red Top Fill Vacuum Bag"],
            radioItems12: ["Bristle Strip Package", "Sanitaire Vacuum Belt"],
            options: 3,
            itemsOrder: [],
            employeeName: '',
            notes: '',
            stores: [],
            location: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.dropDown = this.dropDown.bind(this);
        this.orderList = this.orderList.bind(this);
    }
    label = (item, index) => {
        const name = `Drop Input Supplies ${index + 1}`
        return (
                <label name={name} id={name}>
                    {item}
                </label>
        )
    }

    label2 = (item, index) => {
        const name = `Radio ${index+1}`
        return (
                <label name={name} id={`Radio ${index+1}`}>
                    {item}
                </label>
        )
    }

    label12 = (item, index) => {
        const name = `Radio 6 or 12 ${index + 1}`
        return (
                <label name={name} id={name}>
                    {item}
                </label>
        )
    }
    radioItems2 = (item, i) => {
        const options = [];
            const amount = (i+1);
            options.push(<React.Fragment key={`units 2 ${i}`}><div id="radioDiv2" name="itemsOrder"><input type="radio" name="itemsOrder"id="radioUnits 1" value={amount} onClick={e => this.handleChange(e,item)}></input><label>1</label>&nbsp;&nbsp;<input type="radio" name="itemsOrder" id="radioUnits 2" value={amount} onClick={e => this.handleChange(e,item)}></input><label>2</label></div></React.Fragment>)
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }

    radioItems12 = (item, i) => {
        const options = [];
            options.push(<React.Fragment key={`units 12 ${i}`}><div id="radioDiv12" name="itemsOrder"><input type="radio" name="itemsOrder" id="radioUnits 6" value="6" onClick={e => this.handleChange(e,item)}></input><label>6</label>&nbsp;&nbsp;<input type="radio" name="itemsOrder" id="radioUnits 12" value="12" onClick={e => this.handleChange(e,item)}></input><label>12</label></div></React.Fragment>)
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }

    dropDown = () => {
        let i = 0;
        const options = [];
        for (i=1; i <= this.state.options; i++) {
            const name = `Units`
            options.push(<option key={i} id={name} value={i}>{i}</option>)
        }
            return (
                    options.map(option => {
                        return option;
                    })
            )
    }

    handleChange = (e, item) => {
        let name = e.target.name;
        let value = e.target.value;
        if (e.target.name === "itemsOrder") {
            if (this.state.itemsOrder.length === 0) {
                this.setState({
                    itemsOrder: this.state.itemsOrder.concat({'item': item, 'amount':value})
            
                });
                this.state.itemsOrder.forEach(itemName => { console.log(itemName.name)})
            } else {
                    const array = this.state.itemsOrder;
                    const result = array.map(itemName => { return itemName.item}).indexOf(item);
                    console.log(result)
                   if (result === -1) {
                        this.setState({
                            itemsOrder: this.state.itemsOrder.concat({'item': item, 'amount':value})
                
                    });
                }
        }
                
        } else {
            this.setState({
            [name]: value
            })
        }
    }
    orderList = (e, item) => {
        /*let value = e.target.value;
        this.setState({
            itemsOrder: this.state.itemsOrder.push(`${value}`),
        })*/
    }
    onSubmit = (e) => {
        e.preventDefault();
            fetch('http://portal.cbmportal.com:5000/api/targetOrder/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                employeeName: this.state.employeeName,
                location: this.state.location,
                notes: this.state.notes,
                order: this.state.itemsOrder,
            })
            })
            .then(res => res.json())
            .then( data => {
                console.log(data.config);
            })
        .catch(err => console.log(err))
}

    componentDidMount() {
        fetch('http://portal.cbmportal.com:5000/api/dustmop/stores')
        .then(res => res.json())
        .then(data => this.setState({stores: data})
        );
    }
    render() {

        return (
            <div className="container">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Target Order</span></h1><br />
                <form onSubmit={this.onSubmit}>
                <label >Store Number:</label>
                <div className="wrapper1">
                <select name="location" onChange={this.handleChange}>
                    <option value="">Select Starting Point</option>
                    <option value="Home">Home</option>
                    {this.state.stores.map((store, i) => {
                        return <option key={i} value={store.store}>{store.store}</option>
                            })}
                </select>
                </div>
                <br /><br />
                <div className="wrapper1">
                <label forhtml="employeename"> Employee Name:</label><br />
                <input type="text" id="employeename" name="employeeName" onChange={this.handleChange}/>
                </div><br /><br />
                <label >Order Form:</label>
                <table>
                    {this.state.items.map((item, index) => {
                        return (
                            <div id="dataCells" key={`quantity ${index}`}>
                        <tr>
                            <td id="label">{this.label(item, index)}</td>
                            <td id="select">
                                <select id="orderQuantity" name="itemsOrder" onChange={(e) => this.handleChange(e,item)}>
                                    <option>Select amount</option>
                                    {this.dropDown()}
                                 </select>
                            </td>
                        </tr>
                        </div>
                        );
                    })}
                        <br />
                        {this.state.radioItems2.map((item, index) => {
                        return (
                            <div id="dataCells" key={`items ${index}`}>
                        <tr>
                            <td id="label2">{this.label2(item, index)}</td>
                            <td id="radio2">
                                {this.radioItems2(item, index)}
                            </td>
                        </tr>
                        </div>
                        );
                    })}
                    {this.state.radioItems12.map((item, index) => {
                        return (
                            <div id="dataCells" key={`items12 ${index}`}>
                        <tr>
                            <td id="label12">{this.label12(item, index)}</td>
                            <td id="radio12">
                                {this.radioItems12(item, index)}
                            </td>
                        </tr>
                        </div>
                        );
                    })}
                </table><br />
                <label >Other Notes:</label> <br />
                <textarea id="notes" name="notes" onChange={this.handleChange}></textarea>
                <br />
                <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
    }
}

export default targetOrder

