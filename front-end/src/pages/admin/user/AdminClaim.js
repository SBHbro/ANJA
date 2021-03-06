import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment'

import '../../../css/adminclaim.css'

import swal from 'sweetalert';
import axios from 'axios'
import { Grid } from '@material-ui/core';

const baseURL = 'https://k3b101.p.ssafy.io'

const useStyles = makeStyles({
    header:{
        padding:'40px 0 20px 0',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    root: {
    //   minWidth: 200,
      margin:'auto',
      width: 250,
      height: '17rem'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginTop: 12,
      fontSize: 18
    },
    content:{
        fontSize: 16,
        height: 95
        
    },
    category:{
        fontSize: 18,
        fontWeight: "bold"
    },
    timestamp:{
        lineHeight:'46.4px',
        padding: '8px'
    }

});

    const AdminClaim = () =>{
        const classes = useStyles();
        // const bull = <span className={classes.bullet}>•</span>;
        const [claimlist, setClaimlist] = useState([])

        
    useEffect(() => {
        claimRegist(sessionStorage.getItem('uid').slice(0,2))
        return () =>{
        };
    },[])

    
    const claimRegist = ((line =>{
        window.db.collection("reports").doc(line).collection("messages").orderBy('time','desc').onSnapshot(
            querySnapshot => {
                var list = []
                querySnapshot.forEach(doc => {
                    var obj = {};
                    obj = doc.data();
                    obj["key"] = doc.id;
                    list.push(obj)
                });
                // console.log(list)
                setClaimlist(list)
        });
    }))

 
    const claimDelete = (claim) =>{
        swal({
            title: "삭제하시겠습니까?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: {
                cancel: "취소",
                confirm: "삭제"
              },
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`${baseURL}/api/reports?id=${claim.id}&reportDocId=${claim.key}`)
                .then((res) =>{
                    // console.log(res.data)
                    claimRegist()
                })
                .catch((error) =>{
                    // console.log(error)
                })
              swal("삭제되었습니다!", {
                icon: "success",
                buttons:{
                    confirm: "완료"
                }
              });
            } else {
              swal("취소되었습니다!",{
                icon: "error",
                buttons:{
                    confirm: "완료"
                }
              });
              
            }
          });
    }

    const listClaim = claimlist.map((claim, index) => 
    <Grid item xs={4} key={index} className="mb-3">
        <Card  className={classes.root} variant="outlined">
            <CardContent>
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography> */}
                <Typography variant="h5" component="h2">
                    열차번호: {claim.sid}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    <span className={classes.category}>신고유형:</span> {claim.category}
                </Typography>
                <br />
                <Typography className={classes.content}>
                {claim.contents}
                </Typography>
            </CardContent>
            <div className="d-flex justify-content-between">
            <Moment className={classes.timestamp} format="YYYY-MM-DD HH:mm">{claim.time.seconds*1000}</Moment>
            <CardActions >
                <Button  variant="outlined" color="secondary" size="small" onClick={()=>claimDelete(claim)}>신고삭제</Button>
            </CardActions>
            </div>
        </Card>

    </Grid>
              
    );

    return(
        <div>
            <h1 className={classes.header}>신고</h1>
                <Grid container>
                    {/* <Grid claim xs={4}> */}
                     {listClaim}
                    {/* </Grid> */}
                </Grid>
                
        </div>
        );
    }

export default AdminClaim;