import React, { useState }  from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    background: {
      paper: '#000',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});


function App() {
  const [todos, setTodos] = useState([]);
  const [pvm,setPvm] =useState(new Date())
  const [descStr,setDescStr] =useState('');
  const [value, setValue] = useState(0);//
  

  const addTehtava = (event) => {
    event.preventDefault();
    let pvmStr = pvm.getDate() + "." + (pvm.getMonth()+1) + "." + pvm.getFullYear();
    setTodos([...todos,{desc:descStr, date:pvmStr}]);
  }

   const handleChange = (event) => {
    setDescStr(event.target.value);
   }

   const handleTabs = (e,val)=> {
     console.warn(val);
     setValue(val);
   }

  return (
    <div className="App" >      


      

      <AppBar position="static" >
        <Tabs value={value} onChange={handleTabs} centered sx={{
          bgcolor: '#5f9ea0'
        }} >
          <Tab label = "HOME"  />
          <Tab label = "MY TODOS"/>
        </Tabs>
      </AppBar>
      
      <TabPanel value = {value} index = {0}><h1>Welcome to the Todolist</h1></TabPanel>
      <TabPanel value = {value} index = {1}>
      <h1 >Todolist</h1>
        
      <TextField value={descStr} label="Description" variant="outlined"  onChange={handleChange}/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker label = "Valitse päivämäärä"
      value = {pvm}
      onChange={(pvm) => setPvm(pvm)}
      renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
      <Button variant="contained" onClick={addTehtava}>Add</Button >
      <table>
        <tbody>
      {
      todos.map((todo, index) => 
        <tr key={index}>
          <td>{todo.date}</td>
          <td>{todo.desc}</td>
        </tr>)
      }
      </tbody></table>
        </TabPanel>

      
     
    </div>
  );
}

function TabPanel(props){
  const {children, value, index} = props
  return (<div>
    {
    value === index && (<div>{children}</div>)
    }
    </div>)
};

export default App;
