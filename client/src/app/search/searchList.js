import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Moment from "moment";
import Table from "@material-ui/core/Table";

const searchList=function (props) {
    const {classes,searchList,selectSearch}=props
    return <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>Search</TableCell>
                <TableCell >Category</TableCell>
                <TableCell >Search At</TableCell>
                <TableCell >Time Taken</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {searchList.map((data,index)=><TableRow hover key={index} onClick={()=>selectSearch(data)}>
                <TableCell>{data.searchKey}</TableCell>
                <TableCell>{data.searchCat.toUpperCase()}</TableCell>
                <TableCell>{Moment(data.addedOn).format('MMM Do YY, h:mm a')}</TableCell>
                <TableCell>{data.fetching?'Fetching ...':data.fetchedIn+' ms'}</TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
}

export default searchList
