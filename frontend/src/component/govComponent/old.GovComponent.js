import React from 'react';
import SVGMap from "react-svg-map";
import World from "@svg-maps/world";
import "react-svg-map/lib/index.css";
import {queryGov} from "../../services/queryServices";
import {broadbandToArray, mobileToArray, shareToArray, yearsToArray} from "../../helpers/helper";
import ReactModal from "react-modal";
import Plot from "react-plotly.js";

class GovComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            location: "",
            plottingData: [],
            defaultRange: {
                yaxis: {
                    autorange: true
                },
                xaxis: {
                    autorange: true
                }
            },
            decorator: {
                mode: 'lines',
                type: 'scatter'
            }
        }


        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    decorate(data) {
        return Object.values(data).map(element => {return {...element, ...this.state.decorator}});
    }

    handleOpenModal() {
        this.setState(s => s.showModal = true);
    }

    handleCloseModal() {
        this.setState({showModal: false, location: "", plottingData: []});
    }

    componentDidUpdate = () => {
        console.log(this.state.location);
        if (this.state.location !== "") {
            queryGov(this.state.location).then(data => {
                const results = {};
                results["years"] = yearsToArray(data);
                results["Broadband"] = broadbandToArray(data);
                results["Mobile %"] = mobileToArray(data);
                results["Share of Users (%)"] = shareToArray(data);
                Object.values(results).flatMap( d => this.decorate(d));
                this.handleOpenModal();
            });
        }
    }

    render() {
        return (
            <div>
                <SVGMap map={World}
                        onLocationClick={(location) => this.setState(s => s.location = location.target.getAttribute('name'))}/>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example">
                    {/*<GovChart data={this.state.data}/>*/}
                    <Plot
                        data={this.state.plottingData}
                        layout={{
                            autosize: true,
                            ...this.state.defaultRange,
                            uirevision: 'true'
                        }}
                        useResizeHandler={true}
                        style={{width: "100%", height: "auto"}}
                    />
                    <button onClick={this.handleCloseModal}>Close window</button>
                </ReactModal>
            </div>
        )
    }
}

export default GovComponent;

