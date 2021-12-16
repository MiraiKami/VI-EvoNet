import React, {useEffect, useRef, useState} from 'react';
import {queryOng, queryYears} from "../../services/queryServices";
import BubbleChart from '@weknow/react-bubble-chart-d3';
import {
    Divider,
    FormControl, FormControlLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper, Radio, RadioGroup,
    Select,
    Typography
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}


function OngComponent() {

    const [data, setData] = useState([]);
    const [dataBubbleChart, setDataBubbleChart] = useState([]);
    const [year, setYear] = useState(2017);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [open, setOpen] = React.useState(false);
    const [years, setYears] = useState([]);
    const [selectedValueFilter, setSelectedValueFilter] = useState('<');
    const [selectedValuePercent, setSelectedValuePercent] = useState(10);

    const classes = useStyles();

    useEffect(() => {
        queryOng(year).then(d => {
            console.log("data receive : " + d[0]["country"]);
            setData(d);
        });
    }, [year]);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        queryYears().then( ys => {
            setYears(ys.map(y => +y));
        });

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const bubbleClick = (label) => {
        console.log("Custom bubble click func")
    }

    const legendClick = (label) => {
        console.log("Customer legend click func")
    }

    const transformDataToBubbleChartData = (data) => {

        data = data.filter(item => item.country !== 'total' && item.country !== "World");
        setDataBubbleChart(data.map(item => {
            return {label: item["country"], value: item["numberUser"].toFixed(2)}
        }));
    }

    useEffect(() => {
        if (dataBubbleChart !== undefined && dataBubbleChart.length > 0) {
            console.log("data for BubbleChart = " + dataBubbleChart[0].label + " value " +dataBubbleChart[0].value);
        }

    }, [dataBubbleChart])

    const handleChange = (event) => {
        setYear(+event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        console.log(selectedValuePercent);
        if (selectedValueFilter === '<') {
            transformDataToBubbleChartData(data.filter(d => +d["numberUser"] < selectedValuePercent));
        } else {
            transformDataToBubbleChartData(data.filter(d => +d["numberUser"] > selectedValuePercent));
        }
    }, [data, selectedValueFilter, selectedValuePercent]);

    const handleRadioChange = (event) => {
        setSelectedValueFilter(event.target.value);
    }

    const handleRadioChangePercent = (event) => {
        setSelectedValuePercent(+event.target.value);
    }

    return (
        <div style={{ padding: 20 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={7}>
                    <BubbleChart
                        graph={{
                            zoom: 0.95,
                            offsetX: 0.005,
                            offsetY: -0.01,
                        }}
                        width={windowDimensions.width/2}
                        height={windowDimensions.height}
                        padding={1} // optional value, number that set the padding between bubbles
                        showLegend={true} // optional value, pass false to disable the legend.
                        legendPercentage={10} // number that represent the % of with that legend going to use.
                        legendFont={{
                            family: 'Arial',
                            size: 12,
                            color: '#000',
                            weight: 'bold',
                        }}
                        valueFont={{
                            family: 'Arial',
                            size: 12,
                            color: '#fff',
                            weight: 'bold',
                        }}
                        labelFont={{
                            family: 'Arial',
                            size: 16,
                            color: '#fff',
                            weight: 'bold',
                            'stroke-width': 2,
                        }}
                        //Custom bubble/legend click functions such as searching using the label, redirecting to other page
                        bubbleClickFunc={bubbleClick}
                        legendClickFun={legendClick}
                        data={dataBubbleChart}
                    />
                </Grid>
                <Grid item xs alignItems="center">
                    <Paper className="mt-4">
                        <Typography id="global-params" component='h5' variant='h5' style={{textAlign: "center"}} gutterBottom>Chose the year</Typography>
                        <Divider />
                        <div className="ml-4" align="center">
                            <FormControl className={classes.formControl}>
                                <Select
                                    native
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={year}
                                    onChange={handleChange}
                                >
                                    {years.map(y => (
                                        <option value={y}>{y}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Divider />
                        <Typography id="global-params" component='h5' variant='h5' style={{textAlign: "center"}} gutterBottom>Filter results over or under the value of percentage below</Typography>
                        <Divider />
                        <div className="ml-4">
                            <div className="ml-4" align="center">
                                <FormControl component="fieldset">
                                    <RadioGroup row defaultValue="<">
                                        <FormControlLabel
                                            value="<"
                                            control={<Radio
                                                        checked={selectedValueFilter === '<'}
                                                        onChange={handleRadioChange}
                                                        color="default"
                                                        name="radio-button-demo"

                                                        inputProps={{ 'aria-label': 'D' }}/>}
                                            label="under (x < %)"
                                            labelPlacement="start"/>

                                        <FormControlLabel
                                            control={<Radio
                                                checked={selectedValueFilter === '>'}
                                                onChange={handleRadioChange}
                                                value=">"
                                                color="default"
                                                name="radio-button-demo"
                                                inputProps={{ 'aria-label': 'D' }}/>}
                                            label="over (x > %)"
                                            labelPlacement="end"/>

                                    </RadioGroup>
                                </FormControl>
                                <br/>
                                <FormControl component="fieldset">
                                    <RadioGroup row defaultValue={selectedValuePercent}>
                                        {[1, 5, 10, 20, 40].map(k => {
                                            return <FormControlLabel
                                                control={<Radio
                                                    checked={selectedValuePercent === k}
                                                    onChange={handleRadioChangePercent}
                                                    value={k}
                                                    color="default"
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': 'D' }}/>}
                                                label={k}
                                                labelPlacement="start"/>
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <Divider />
                        <Typography id="global-params" component='h5' variant='h5' style={{textAlign: "center"}} gutterBottom>Statistics for year <b>{year}</b></Typography>
                        <Divider />
                        <div style={{paddingLeft: 20, paddingRight: 20, paddingBottom:10}}>
                            <p> <b>{dataBubbleChart.length}</b> {dataBubbleChart.length === 1 ? 'country is' :'countries are'} using each {selectedValueFilter === '<' ? 'under' : 'over'} <b>{selectedValuePercent}%</b> of the Internet traffic</p>
                            <p> This represent <b>{(dataBubbleChart.length/data.length*100).toFixed(2)}%</b> of the countries in the world at this epoch</p>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default OngComponent;

