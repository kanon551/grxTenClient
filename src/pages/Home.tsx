import React, {  useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import PhoneIcon from '@mui/icons-material/Phone';
import { SnackbarProvider, closeSnackbar, VariantType, useSnackbar } from 'notistack';
import { calculateSolarReliability } from '../utils/GlobalApi';
import CircularProgress from '@mui/joy/CircularProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Homeicon from '@mui/icons-material/Home';
import Apps from '@mui/icons-material/Apps';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UpdateIcon from '@mui/icons-material/Update';

const Home = () => {

  const [bill, setBill] = useState<number|null>(null);
  const [area, setArea] = useState<number|null>(null);
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [finalOutput, seFinalOutput] = useState<{
    numberOfPanels: number,
    requiredRooftopArea: number,
    capitalNeeded: number,
    breakevenYears: number,
    next25YearsEarnings: number
  }>({
    numberOfPanels: 0,
    requiredRooftopArea: 0,
    capitalNeeded: 0,
    breakevenYears: 0,
    next25YearsEarnings: 0
  });

  const { enqueueSnackbar } = useSnackbar();


  const handleSubmit = async () => {

    setLoading(true);
      const payload = {
        averageElectricityBill: bill,
        roofTopArea: area,
        phoneNumber: phone
      }
  
      console.log(payload)
      const response = await calculateSolarReliability(payload);
      setLoading(false);
      if(response.status === false){
        const variant: VariantType = 'error';
        enqueueSnackbar(`${response.statusMessage}`, { variant, autoHideDuration: 10000 });
      }
      else{
        const variant: VariantType = 'success';
        enqueueSnackbar(`${response.statusMessage}`, { variant, autoHideDuration: 10000 });
        seFinalOutput(response.response);
      }
   
  };

  return (

    <div>
      {
        loading ? <CircularProgress variant="outlined"/> :

        <>
                <Card
        variant="outlined"
        sx={{
          maxHeight: 'max-content',
          maxWidth: '100%',
          mx: 'auto',
          // to make the demo resizable
          overflow: 'auto'
        }}
      >
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Solar calculator
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
            gap: 1.5,
          }}
        >
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Average Monthly Electricity Bill</FormLabel>
            <Input endDecorator={<CurrencyRupeeIcon />} 
            type="number"
            value={bill === null ? '' : bill}
            onChange={(e) => setBill(e.target.value === '' ? null : Number(e.target.value))}
            />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Rooftop Area Available</FormLabel>
            <Input endDecorator={<Grid4x4Icon />} placeholder="(m²)"
             type="number"
             value={area === null ? '' : area}
             onChange={(e) => setArea(e.target.value === '' ? null : Number(e.target.value))}
            />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Phone Number</FormLabel>
            <Input endDecorator={<PhoneIcon />} placeholder="+91" 
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" color="primary" onClick={handleSubmit}>
              Calculate
            </Button>
          </CardActions>
        </CardContent>
        </Card>

          <List
          sx={{
            maxWidth: 320,
          }}
          >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <SolarPowerIcon />
              </ListItemDecorator>
              Number of panels : 
              <div>
                {
                  finalOutput.numberOfPanels
                }
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Apps />
              </ListItemDecorator>
              Requiured RootTop area (m²) :
              <div>
                {
                  finalOutput.requiredRooftopArea
                }
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <CurrencyRupeeIcon />
              </ListItemDecorator>
              Capital Needed :
              <div>
                {
                  finalOutput.capitalNeeded
                }
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <EventAvailableIcon />
              </ListItemDecorator>
             Break Even years :
              <div>
                {
                  finalOutput.breakevenYears
                }
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <UpdateIcon />
              </ListItemDecorator>
            Next 25 years earnings:
              <div>
                {
                  finalOutput.next25YearsEarnings
                }
              </div>
            </ListItemButton>
          </ListItem>
          </List>
        </>

      }
    </div>
   
  )
}

export default function SnackBarWrapperHome() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={10000}
    action={(snackbarId) => (
      <button onClick={()=> closeSnackbar(snackbarId)} style={{background:'transparent', borderRadius:'10px'}}>
        Close
      </button>
    )}>
      <Home/>
    </SnackbarProvider>
  )
}
