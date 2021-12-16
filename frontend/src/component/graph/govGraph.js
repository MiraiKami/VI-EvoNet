import React, { useState } from 'react';
import Plot from 'react-plotly.js';


export default function GovChart({ data }) {

    const defaultRange = {
        yaxis: {
            autorange: true
        },
        xaxis: {
            autorange: true
        }
    }

    // this "hack" with `range` seems to be enough to save user scaling
    const [range, ] = useState(defaultRange);

    const decorator = {
        mode: 'lines',
        type: 'scatter'
    };
    function decorate(data) {
        return Object.values(data).map(element => {return {...element, ...decorator}});
    }
    const plottingData = Object.values(data).flatMap( d => decorate(d["data"]));

    return (
        <>
            <Plot
                data={plottingData}
                layout={{
                    autosize: true,
                    ...range,
                    uirevision:'true'
                }}
                useResizeHandler={true}
                style={{width: "100%", height: "auto"}}
            />
        </>
    )

}
