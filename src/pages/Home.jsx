import { useState } from "react";
import Banner from "../components/Banner";
import { Typography, Box, TextField, Button, MenuItem, CircularProgress } from "@mui/material";
import axios from 'axios';
import { toast } from "react-toastify"



const currencyCodes = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'NGN','ZAR', 'KES', 'EGP', 'GHS'];

const Home = () => {
  const [currencyData, setCurrencyData] = useState({
    from: '',
    to: '',
    amount: '',
  })

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  

  const changeHandler = (e) => {    
    setCurrencyData({
      ...currencyData,
      [e.target.name]: e.target.value
    })
  }


  const submitHandler = async(e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      setError(null)
      const response = await axios.post('api/users/converter', currencyData)
      setResult(response.data)
      setIsLoading(false)
      
    } catch (err) {
      setIsLoading(false)
      setError(err?.error || err?.data?.message)
      toast.error(error) 
    }

 
  }

  return (
    <div>
      <Banner />

      {/* currency converter card */}
      <Box
        padding="2rem"
        bgcolor="#fff"
        borderRadius="4px"
        boxShadow="1px 1px 4px rgba(0,0,0,0.4)"
        maxWidth="450px"
        margin="1rem auto"
        overflow="hidden"
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          width="100%"
          display="flex"
          alignSelf="start"
          flexDirection="column"
          gap="1rem"
          onSubmit={submitHandler}
        >
          <div className="currency-container">
            <TextField
              select
              label="Select Currency From"
              sx={{ flex: 1, minWidth: "120px" }}
              value={currencyData.from}
              name="from"
              onChange={changeHandler}
            >
              {currencyCodes.map((code) => (
                <MenuItem
                  key={code}
                  value={code}
                >
                  {code}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select Currency To"
              sx={{ flex: 1, minWidth: "120px" }}
              value={currencyData.to}
              name="to"
              onChange={changeHandler}
            >
              {currencyCodes.map((code) => (
                <MenuItem
                  key={code}
                  value={code}
                >
                  {code}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
            name="amount"
            value={currencyData.amount}
            onChange={changeHandler}
          />

          <Button type="submit" variant="contained" sx={{ mb: "1rem" }}>
            CONVERT
          </Button>

          {isLoading && (
          <Box sx={{ margin: 'auto' }}>
            <CircularProgress />
          </Box>
        )}
        </Box>

        {result && (
          <div className="conversion-result-ctn">
            <Typography
              variant="h6"
              color="#1976D2"
              textAlign="center"
              gutterBottom
              fontSize="15px"
              fontWeight="700"
            >
              Converted Amount: {result.conversionResult.toFixed(2)} {result.target}
            </Typography>
            <Typography
              component="p"
              color="#000"
              textAlign="center"
              fontSize="14px"
            >
              Conversion Rate: {result.conversionRate.toFixed(2)} {result.target}
            </Typography>
          </div>
        )}
      </Box>

      {/* footer */}
      <div className="footer">
        <Typography variant="h4" color="#000" textAlign="center" gutterBottom>
          Why choose simple currency converter?
        </Typography>
        <Typography variant="h6" color="#000" textAlign="center">
          Your go-to solution currency conversions worldwide.
        </Typography>
      </div>
    </div>
  );
};
export default Home;
