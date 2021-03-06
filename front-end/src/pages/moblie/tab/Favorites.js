import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
// import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import TrainIcon from '../../../images/train_885831.png'
import swal from 'sweetalert';

import '../../../css/Favorites.css'
// import subway1 from '../images/subway1.png';


const useStyles = makeStyles((theme) => ({
    // demo: {
    //     backgroundColor: 'none',
    // },
    trash:{
        color: '#ff0000a3'
    },
    nonefavor:{
        fontSize: '2rem',
        paddingTop: '15rem',
        textAlign: 'center',
        textShadow: '2px 2px 2px gray'
    },
    back:{
        // background: 'rgba(255,255,255,1) !important',
    }
}));


const Favorites = ( props ) => {
    let history = useHistory();
    const classes = useStyles();
    const [favname, setFavname] = useState([]);
    const hidden = props.favorite_edit;

    useEffect(() => {
        const store = []
        for (let i = 0; i < localStorage.length; i++) {
            store.push({ id: localStorage.key(i), content: localStorage.getItem(localStorage.key(i)) })
        }
        setFavname(store)
    }, [])


    var nextid = 0
    for (let i = 0; i <= favname.length; i++) {
        if (Number(nextid) < localStorage.key(i)) {
            nextid = localStorage.key(i)
        }
    }


    const onRemove = (id) => {
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
                setFavname(favname.filter(favn => favn.id !== id));
                localStorage.removeItem(id)
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

    const godetail = (content) => {
        const start = content.split(',')[0]
        const end = content.split(',')[1]
        history.push(`/selectroute/${start}/${end}`)
    }

    const favlist = favname.map((favn) =>
        <ListItem key={favn.id} onClick={() => godetail(favn.content)}>
            <img src={TrainIcon} alt="기차" className="favorite_star ml-2" />
            {/* <StarIcon className="favorite_star ml-2" /> */}
            <ListItemText
                primary={favn.content.split(',')[0] + '->' + favn.content.split(',')[1]}
                className="listname mb-1 ml-3"
            />
            {hidden && <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(favn.id)}>
                    <DeleteIcon className={classes.trash} />
                </IconButton>
            </ListItemSecondaryAction>}
        </ListItem>
    )

    // const edit = () => {
    //     if (hidden) {
    //         setHidden(false)
    //     } else {
    //         setHidden(true)
    //     }
    // }

    return (
        <div>
            <div className="d-flex justify-content-end mt-3">
                {/* {nextid !== 0 && <div>{hidden ? <button className="btn btn-outline Favorite_edit" onClick={edit}>완료</button> : <button className="btn btn-outline Favorite_edit" onClick={edit}>편집</button>}</div>} */}
            </div>
            <Grid item xs={12}>
                <div className={classes.demo}>
                {nextid !== 0 ?<List className={classes.back}>
                         {favlist} 
                    </List> : 
                    <div className={classes.nonefavor}>즐겨찾기를 추가해주세요!</div>
                    }
                </div>
            </Grid>

        </div>
    );
}

export default Favorites;