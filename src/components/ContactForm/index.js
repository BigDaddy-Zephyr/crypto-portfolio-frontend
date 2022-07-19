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
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";

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

  const [ stocks, setStocks] = useState([]);
  useEffect(() => {
    StocksGet()
  }, [])
  
  const StocksGet = () => {
    fetch(process.env.REACT_APP_API_URL+"getstocks",{
      method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response) {       
    return response.json();
  }).then(function(data) {
    setStocks(data)
  })
  }

  const handleSubmit = event => {
    event.preventDefault();
    var data = event.target.elements.name.value

    fetch('https://data.messari.io/api/v2/assets/'+data+'/profile', {
      method: 'GET',
    }).catch(error => {
      console.log(error)
      return Promise.reject()
  })
    .then(res => res.json())
    .then(
      (result) => {
      fetch(process.env.REACT_APP_API_URL+'addstocks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({messariId:result.data.id,name:result.data.name}),
    })


        alert(result.data.name+" added")
        StocksGet();

      }
    )
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
        StocksGet();
      }
    )
  }


  return (
    <div className={classes.root}>
      <div style={{zIndex:1}}>
      <Container className={classes.container} maxWidth="lg"style={{zIndex:1}}>    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                My Portfolio
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  Remove Portfolio
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { stocks.map((list, index) => (
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{list.name}</TableCell>
                            <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => StockDelete(list.id)} >Del</Button>
                    </ButtonGroup>
                  </TableCell>
                        </TableRow>
                      ))}
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

          <Grid container spacing={4}>
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