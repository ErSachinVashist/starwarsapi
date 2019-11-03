import React, { Component } from 'react';
import {connect} from "react-redux";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import {searchCss} from "../../helpers/componentStyle";
import Search from '@material-ui/icons/Search'
import Next from '@material-ui/icons/NavigateNext';
import Before from '@material-ui/icons/NavigateBefore';
import {FetchSwapData,SearchList} from '../../actions/searchAction'
import {ReceiveSocketAction} from '../../actions/socketAction'
import {SubscribeSocket} from '../../socket/PubSub'
import ListTable from './searchList'
import RenderInfo from './renderInfo'
class SearchArea extends Component {
    state={
        searchedValue:'',
        category:'people',
        skip:0,
        limit:5
    };
    handlePage=(val,skip,limit)=>{
        this.setState({skip:skip})
        this.props.SearchList({order:'id DESC',limit:limit,skip:skip})
    }
    handleChange=(e)=>{
        this.setState({category:e.target.value,selectedSearch:null})
        this.props.FetchSwapData({searchCat:e.target.value.trim(),searchKey:this.state.searchedValue.trim()})

    };
    componentDidMount() {
        this.props.SearchList({order:'id DESC',limit:this.state.limit})
        SubscribeSocket('Searched',null,null, this.props.userData.user.id, this.props.ReceiveSocketAction)
    }

    selectSearch=(data)=>{
        this.setState({selectedSearch:data})
    }
    render() {
        const {classes,searchList,FetchSwapData}=this.props;
        let {category,searchedValue,skip,limit,selectedSearch}=this.state;
        return <Grid container justify='center' spacing={1}>
            <Grid item xs={12} md={6}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container justify='center' spacing={1}>
                            <Grid item xs={12} md={7}>
                                <form onSubmit={(e)=>{
                                    e.preventDefault();
                                    this.selectSearch(null)
                                    this.props.FetchSwapData({searchCat:category.trim(),searchKey:searchedValue.trim()})
                                }}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Search by id or name"
                                        className={classes.searchField}
                                        value={this.state.name}
                                        InputProps={{
                                            startAdornment:<InputAdornment classes={{root:classes.searchIcon}} position='start'>
                                                <Search/>
                                            </InputAdornment>,
                                            inputProps:{
                                                style:{padding:'9px'}
                                            },
                                        }}
                                        onChange={(e) => this.setState({searchedValue:e.target.value})}
                                        margin="normal"
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <Select
                                        classes={{
                                            root:classes.selectRoot
                                        }}
                                        value={category}
                                        onChange={this.handleChange}
                                        className={classes.selectEmpty}
                                    >
                                        <MenuItem value='planets'>Planets</MenuItem>
                                        <MenuItem value='starships'>Spaceships</MenuItem>
                                        <MenuItem value='vehicles'>Vehicles</MenuItem>
                                        <MenuItem value='people'>People</MenuItem>
                                        <MenuItem value='films'>Films</MenuItem>
                                        <MenuItem value='species'>Species</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <ButtonGroup fullWidth>
                                    <Button disabled={skip<limit} onClick={()=>this.handlePage('before',skip-limit,limit)}><Before/></Button>
                                    <Button disabled={searchList.length<limit} onClick={()=>this.handlePage('next',skip+limit,limit)}><Next/></Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.rootPaper}>
                            {searchList.loading?
                                <Typography variant='h5' align='center'>Loading ...</Typography>:
                                <ListTable {...this.props} selectSearch={this.selectSearch}/>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}md={6} >

                {searchList.loading?
                <Typography variant='h5' align='center'>Loading ...</Typography>:
                searchList.length>0?<RenderInfo FetchSwapData={FetchSwapData} searchData={selectedSearch?selectedSearch:searchList[0]} classes={classes}/>:
                    <Typography variant='h5' align='center'>No Search Found</Typography>
                }
            </Grid>
        </Grid>
    }
}

export default compose(
    withStyles(searchCss),
    connect(store => ({
        userData: store.UserReducer,
        searchData: store.SearchReducer,
        searchList: store.SearchListReducer,
    }),{FetchSwapData,SearchList,ReceiveSocketAction})
)(SearchArea);
