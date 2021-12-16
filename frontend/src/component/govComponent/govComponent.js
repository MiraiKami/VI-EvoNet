import React, {useEffect, useState} from 'react';
import {SVGMap} from "react-svg-map";
import World from "@svg-maps/world";
import "react-svg-map/lib/index.css";
import {queryGov} from "../../services/queryServices";
import {broadbandToArray, mobileToArray, shareToArray, yearsToArray} from "../../helpers/helper";
import ReactModal from "react-modal";
import Plot from "react-plotly.js";

function GovComponent () {

    const [showModal, setShowModal] = useState(false);
    const [location, setLocation] = useState("");
    const [years, setYears] = useState([]);
    const [mobileData, setMobileData] = useState([]);
    const [broadbandData, setBroadbandData] = useState([]);
    const [shareData, setShareData] = useState([]);

    const defaultRange = {
        yaxis: {
            autorange: true
        },
        xaxis: {
            autorange: true
        }
    };

    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setLocation("");
        setShowModal(false);
    }

    useEffect( () => {
        console.log(location);
        if (location !== "") {
            queryGov(location).then(data => {
                setYears(yearsToArray(data));
                setBroadbandData(broadbandToArray(data));
                setMobileData(mobileToArray(data));
                setShareData(shareToArray(data));
            });
        }
    }, [location]);

    useEffect( () => {
        if (location !== ""){
            handleOpenModal();
        }
    }, [years, shareData, mobileData, broadbandData])

    return (
        <div>
            <SVGMap map={World} onLocationClick={(location) => setLocation(location.target.getAttribute('name'))}/>
            <ReactModal
                isOpen={showModal}
                contentLabel="Minimal Modal Example">
                <Plot
                    data = {[
                        {
                            x:years,
                            y:mobileData,
                            type: 'scatter',
                            name: 'Mobile Data Users (Per 100 Users)'

                        },
                        {
                            x:years,
                            y:broadbandData,
                            type: 'scatter',
                            name: 'Broadband Penetration'
                        },
                        {
                            x:years,
                            y:shareData,
                            type: 'scatter',
                            name: 'Share of Internet user (%)'
                        }
                    ]}
                    layout={{
                        autosize: true,
                        ...defaultRange,
                        uirevision: 'true',
                        title: 'Internet Usage for '+location
                    }}
                    useResizeHandler={true}
                    style={{width: "100%", height: "auto"}}
                />
                <button onClick={handleCloseModal}>Close window</button>
            </ReactModal>
        </div>
        );
}

export default GovComponent;

