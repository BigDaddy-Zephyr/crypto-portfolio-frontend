import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { FormControl,InputLabel, Select,MenuItem } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TableFooter from "@material-ui/core/TableFooter";
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Audio } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Users() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [ stocks, setStocks] = useState([])
  const [total, setTotal] = useState(0)
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
  StocksGet()
  }, [])


  
  let StocksGet = () => {
    fetch(process.env.REACT_APP_API_URL+"getstocks",{
      method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response) {     

    return response.json();
  }).then(function(data) {
    console.log(data)

    let total=0;
    if(data.status==401){
      alert("Please signin")
    }
    for(let i=0;i<data.length;i++){
      total=total+(data[i].currentPrice*data[i].shares)
    }
    setTotal(total)
    setLoading(false)
    setStocks(data)
  })
  }


  const handleSubmit = event => {
    event.preventDefault();
    var data = {name:event.target.elements.name.value,price:event.target.elements.price.value,shares:event.target.elements.shares.value}
    console.log(data)

    fetch('https://data.messari.io/api/v1/assets/'+data.name+'/metrics/market-data', {
      method: 'GET',
    }).catch(error => {
      console.log(error)
      return Promise.reject()
  })
    .then(res => res.json())
    .then( 
      (result) => {
        
        console.log(data,"INSIDE HANDLESUMBIT")
        // setStocks(oldArray => [...oldArray,{...data,currentPrice:result.data.market_data.price_usd}])
        fetch(process.env.REACT_APP_API_URL+'addstocks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({messariId:result.data.Asset.id,name:result.data.Asset.name,shares:data.shares,price:data.price}),
    }).then((res)=>StocksGet())
      }
      
      )
  }
  
  const priceRefresh= async()=>{
    let tempstocks=stocks;
    let promises=stocks.map(async (stock)=>{
    let res;
    try {
      res = await fetch('https://data.messari.io/api/v1/assets/' + stock.name + '/metrics/market-data',
        {
          method: 'GET',
        });
    } catch (error) {
      console.log(error);
      res = await Promise.reject();
    }
    const result_1 = await res.json();

    tempstocks.map(x=>{
      if(x.name==result_1.data.Asset.name){
        let temp = x;
        temp.currentPrice=result_1.data.market_data.price_usd
        console.log(temp.name,"Executed")
      }
    })
      return tempstocks
    })

  const results = await Promise.all(promises)
  let update = await setStocks(promises[0])
  console.log(results,"resulsts")
}



const logstockprices =()=>{
  // priceRefresh()
  console.log(stocks,"LOGGING STOCKS")
}
  const StockDelete = id => {
    var data = {
      'id': id
    }
    fetch(process.env.REACT_APP_API_URL+'deletestock', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        alert("deleted")
        // StocksGet();
      }
    )
  }


  if(loading) return (
    
    <Container className={classes.container} maxWidth="lg"style={{zIndex:1}}>    
    <Paper className={classes.paper}>
      <Box display="flex">
<div className="loader">
<Audio
    height="50"
    width="50"
    color='#94b6e7'
    ariaLabel='loading'
  />
</div>
</Box>
</Paper>
</Container>
  );
    
  return (
    <div className={classes.root}>
      <div style={{zIndex:1}}>
      <Container className={classes.container} maxWidth="lg"style={{zIndex:1}}>    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Performance
              </Typography>
            </Box>
            <Box>
            </Box>
            <Box>

                <Button  variant="contained" color="primary">
                  Get prices
                </Button>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Buy Price</TableCell>
                <TableCell align="left">Current Price</TableCell>
                <TableCell align="left">Shares</TableCell>
                <TableCell align="left">Gain</TableCell>
                <TableCell align="left">Holdings</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
    stocks.map((list, index) => (
    <TableRow key={index}>
        <TableCell>{index+1}</TableCell>
        <TableCell>{list.name}</TableCell>
        <TableCell>{"$"+list.price}</TableCell>
        <TableCell>{"$"+(list.currentPrice).toLocaleString('en-US', {maximumFractionDigits:2})}</TableCell>
        <TableCell>{list.shares.toLocaleString('en-US', {maximumFractionDigits:2})}</TableCell>
        {<TableCell>{((((list.currentPrice-list.price)/list.price)*100).toLocaleString('en-US', {maximumFractionDigits:2}))+"%"}</TableCell>}
        <TableCell>{"$"+(list.shares*list.currentPrice).toLocaleString('en-US', {maximumFractionDigits:2})}</TableCell>
        <TableCell align="left">
<ButtonGroup color="primary" aria-label="outlined primary button group">
  <Button onClick={() => StockDelete(list.id)} >Del</Button>
</ButtonGroup>
</TableCell>
    </TableRow>
  ))
  
  
  }
    <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}/>
                  <TableCell colSpan={2}>Total: ${total.toLocaleString('en-US', {maximumFractionDigits:2})}</TableCell>
                </TableRow>
              </TableFooter>
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
      </div>
      <div style={{zIndex:2}}>
      <Container maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="symbol or fullname"
                // onChange={(e) => setStocks(e.target.value)}
                autoFocus
              />
             
            </Grid>
            <Grid item>
              <TextField
                autoComplete="fname"
                name="price"
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Buy price"
                // onChange={(e) => setStocks(e.target.value)}
                autoFocus
              />
             
            </Grid>
            <Grid item>
              <TextField
                autoComplete="fname"
                name="shares"
                variant="outlined"
                required
                fullWidth
                id="shares"
                label="Shares"
                // onChange={(e) => setStocks(e.target.value)}
                autoFocus
              />
             
            </Grid>
          </Grid>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>
        </form>
        </div>
        </Container>
        </div>
    </div>
  );
}

// things to do
// add mail client 
// integrate with dash
// 404 and login flow in backend
