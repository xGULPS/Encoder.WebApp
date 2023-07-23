import { Button, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './App.css'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';



const App = () => {
  const [completed, setCompleted] = useState(true);
  const [initial, setInitial] = useState(true);
  const [resultLength, setresultLength] = useState(0);
  const [index, setIndex] = useState(0);
  const [result,setResult] = useState("");
  const [strInput,setStrInput] = useState("");

  useEffect(() => {

  if(index < resultLength && !completed)
  {
    getEncodedString();
  }
  else
  {
    
    setResult("");
    Reset();
        
  }

   } , [ index]);

   const Reset= () => {
    setCompleted(true);
    setresultLength(0);
    setInitial(true);
    setIndex(0);
   
   }

   const onConvertClick = () => {
    setResult("");
    if(initial)
    {
     
      fetch(`https://localhost:5001/api/Encoder/EncodeStringToBase64Length?strToEncode=` + strInput,
      { method: 'GET', }).then((res) => {
        return res.text();
      }).then((text) => {
        setresultLength(text);
        setInitial(false);
        setCompleted(false);        
        
        getEncodedString();
        
      })
    }
    else
    {
     
      Reset();
    
    }
   }


  const getEncodedString = () => {    
      fetch(`https://localhost:5001/api/Encoder/EncodeStringToBase64ByIndex?strToEncode=` + strInput + `&Index=` + index,
      { method: 'GET', }).then((res) => {
        return res.text();
      }).then((text) => {
        setResult(result + text);
        setIndex(index +1);
      })    
  }
  const handleTextChange = (e) => {
    setStrInput(e.target.value);
    setResult("");
  };


  return (
    <div className="App">
      <header className="App-header">
        <Grid container alignItems="center" justifyContent="center"  direction="column" spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              id="filled-basic"
              label="Enter String to Convert"
              sx={{ width: 400 }}
              value={strInput}
              disabled={!completed}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              size='large'
              color= {completed ? "primary" : "error"}
              sx={{ width: 400 }}
              onClick={onConvertClick}
              >
               
                {completed ? "Convert" : "Cancel"}
               
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Result"
              sx={{ width: 400 }}
              value={result}
             
            />
          </Grid>
        </Grid>


      </header>
    </div>
  )
}

export default App
