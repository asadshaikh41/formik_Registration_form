import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  FormControl,
  FormHelperText,
  Button,
  Alert,
  Snackbar,
  Box,
  Grid,
  Typography,
  TextField,
  InputLabel,
} from '@mui/material';
import { Select, RadioGroup, Radio, Checkbox, FormGroup, FormControlLabel, MenuItem } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  gender: yup.string().required('Gender is required'),
  hobbies: yup.array().min(1, 'Select at least one hobby'),
});


const initialValues = {
  name: '',
  address: '',
  country: '',
  gender: '',
  hobbies: [],
};

const FormComponent = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values); 
      setSubmitSuccess(true);
    },
  });

  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
  };

  const handleRefreshForm = () => {
    formik.resetForm();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
      padding={2}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#fff',
          borderRadius: 4,
          padding: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" sx={{ bgcolor: '#3f51b5', color: '#fff', padding: '10px', marginTop: '-16px',borderBottomRightRadius:"30px",  borderBottomLeftRadius:"30px", borderTopRadius: "none" }}>
          User Information Form
        </Typography><br />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                size="small"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth error={formik.touched.country && Boolean(formik.errors.country)}>
                <InputLabel htmlFor="country">Country</InputLabel>
                <Select
                  id="country"
                  name="country"
                  size="small"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Country"
                >
                  <MenuItem value="">Select Country</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                </Select>
                {formik.touched.country && formik.errors.country && (
                  <FormHelperText>{formik.errors.country}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" error={formik.touched.gender && Boolean(formik.errors.gender)}>
                <RadioGroup
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  row
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
                {formik.touched.gender && formik.errors.gender && (
                  <FormHelperText>{formik.errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Reading"
                    name="hobbies"
                    value="reading"
                    checked={formik.values.hobbies.includes('reading')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Traveling"
                    name="hobbies"
                    value="traveling"
                    checked={formik.values.hobbies.includes('traveling')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Cooking"
                    name="hobbies"
                    value="cooking"
                    checked={formik.values.hobbies.includes('cooking')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                {formik.touched.hobbies && formik.errors.hobbies && (
                  <FormHelperText>{formik.errors.hobbies}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ color: '#fff', bgcolor: '#3f51b5', '&:hover': { bgcolor: '#2c387e' } }}
                onClick={handleRefreshForm}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={submitSuccess} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            Form submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default FormComponent;
