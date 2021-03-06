import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    tablecon: {
        width: '355px',
        margin: '0 10px 5rem 10px',
    },
    table: {
        width: '100%',
    },
    tablehead:{
        backgroundColor: '#00BFFF',
    },
    headfont:{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        width: '177px'
    },
    subwaytime_header: {
        textAlign: 'center',
        fontSize: '3rem'
    }
});


const SubwayTimeTable = (props) =>{
    const classes = useStyles();
    const upwardlist = props.upward
    const downwardlist = props.downward
    // const arrive = [upwardlist, downwardlist]
    // const radio_value = props.radio_value;
    const [radio_value, setRadio_value] = useState(props.radio_value);
    const [maxlen, setMaxlen] = useState(0);
    const [arrivetime, setArrivetime] = useState([]);

    // // console.log(upwardlist)
    // // console.log(downwardlist)

    useEffect(()=>{
        if(upwardlist.length < downwardlist.length){
            setMaxlen(downwardlist.length)
        }else{
            setMaxlen(upwardlist.length)
        }

        const arr =[]
        for (let i = 0; i < maxlen; i++){
            if (!upwardlist[i] && downwardlist[i]){
                if(downwardlist[i].ARRIVETIME){
                    arr.push(['', downwardlist[i].endSubwayStationNm + ' - ' + downwardlist[i].ARRIVETIME])
                }
            }
            else if (upwardlist[i] && !downwardlist[i]){
                if(upwardlist[i].ARRIVETIME){
                    arr.push([upwardlist[i].endSubwayStationNm +' - ' + upwardlist[i].ARRIVETIME,''])
                }
            }
            else{
                if(upwardlist[i] && downwardlist[i]){
                    arr.push([upwardlist[i].endSubwayStationNm +' - ' + upwardlist[i].ARRIVETIME, downwardlist[i].endSubwayStationNm +' - ' + downwardlist[i].ARRIVETIME])
                }
            }
        }
        setArrivetime(arr)
    },[upwardlist, downwardlist, maxlen])

    if(radio_value !== props.radio_value){
        setRadio_value(props.radio_value)
    }
    // // console.log(radio_value)
    // // console.log(arrivetime)

    
    return (
        <TableContainer className={classes.tablecon} component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead className={classes.tablehead}>
                <TableRow>
                    <TableCell className={classes.headfont} align="center">상행</TableCell>
                    <TableCell className={classes.headfont} align="center">하행</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {arrivetime.map((time, index) => (
                    <TableRow key={index}>
                    <TableCell align="center">{time[0].slice(0,-3)}</TableCell>
                    <TableCell align="center">{time[1].slice(0,-3)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    )
}

export default SubwayTimeTable;