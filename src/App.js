import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import './App.css';
import BookDetails from './BookDetails';
import AllBooksPage from './AllBooksPage';
import { BrowserRouter as Router, Link as RouterLink, 
  Switch, Route, useHistory, Redirect, 
  useLocation} from 'react-router-dom';

import { Button, Toolbar } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { addBook, postNewUser } from './accessHooks';
import BookDetailsPage from './BookDetailsPage';
import BookSearchPage from './BookSearchPage';
import BookSearchByAuthorPage from './BookSearchByAuthorPage';

import { useAuth, ProvideAuth} from './useAuth';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { passwordYupSchema, passwordStrength, countChrOccurence } from './validationTools';
import AppBar from '@mui/material/AppBar'
import { Box } from '@mui/system';
import React from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const theme = createTheme({
  palette: {
    primary: {
      light: '#ef6694',
      main: '#ec407a',
      dark: '#a52c55',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#f381a7',
      main: '#f06292',
      dark: '#a84466',
      contrastText: '#ffffff',
    }
  }
})

const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if(login){
      return <Button variant="contained" onClick={() => {
          signout( () => history.push("/"));            
      }}>Sign out</Button>
  }else{
      return <Button variant="contained" component={RouterLink} to="/login">Log in</Button>
  }
}

const RegisterButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if(login){
      return <Button  onClick={() => {
          signout( () => history.push("/"));            
      }}>Registracija</Button>
  }else{
      return <Button component={RouterLink} to="/register">Registracija</Button>
  }
}

const PrivateRoute = ({children, ...rest}) => {
  const [login, error, signin, signout] = useAuth();
  return (
      <Route
          {...rest}
          render={({location}) => {
              if(login){
                  return children;
              }else{
                  return <Redirect
                      to={{pathname: "/login", state: {from: location}}}
                  />
              }
          }}
          />
  ); 
}

const LoginBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();
  
  let {from} = location.state || { from : { pathname: "/"}};
  return <div className="loginBox">
      <h3>Login Forma</h3>
      <Formik
          initialValues={{username: "", password: ""}}
          onSubmit={(values, { setSubmitting }) => {
              signin(values.username, values.password, () => {
                  setSubmitting(false);
              }, () => {
                  history.replace(from);
              });
          }}
      >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            validateField,
            isSubmitting
          }) => (
              <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth 
                    variant="outlined" 
                    name="username" 
                    value={values.username} 
                    label="Korisničko ime" 
                    onChange={handleChange}
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="password" 
                    value={values.password} 
                    label="Lozinka" 
                    onChange={handleChange}
                    type="password"                    
                  /><br/>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                  <span className="registracija"> 
                    <h4 >Nemate nalog?</h4>
                    <RegisterButton/>
                  </span>
                  
                  <div>{(error) ? error : ""}</div>
              </form>
          )}
      </Formik>
  </div>
}


const RegisterBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();

  
  let {from} = location.state || { from : { pathname: "/"}};
  return <div className="loginBox">
      <h3>Register Forma</h3>
      <Formik
          initialValues={{username: "", password: "", passwordConfirmation: ""}}
          validationSchema={passwordYupSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (fetch(`http://localhost:3081/app/checkUsername/${values.username}`)) {
            countChrOccurence(values.password);
            if (values.password === values.passwordConfirmation) {
              if (passwordStrength(values.password) >= 4) {
                  postNewUser(values.username, values.password);
                 signin(values.username, values.password, () => {
                    setSubmitting(false);
                }, () => {
                    history.replace(from);
                });
              } else {
                alert("Lozinka mora biti minimum 60% ukupnog kvaliteta!")
              if (window.confirm) {
                return<Redirect to={{pathname: "/register", state: {from: location}}}/>
              }
              }
            } else {
              alert("Lozinke moraju da budu jednake!")
              if (window.confirm) {
                return<Redirect to={{pathname: "/register", state: {from: location}}}/>
              }
            }
          } else {
            alert("Username vec postoji!")
              if (window.confirm) {
                return<Redirect to={{pathname: "/register", state: {from: location}}}/>
              }
          }
         
          }}
      >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            validateField,
            isSubmitting
          }) => (<div>
              <form name="username" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth 
                    variant="outlined" 
                    name="username" 
                    value={values.username} 
                    label="Korisničko ime" 
                    onChange={handleChange}
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="password" 
                    value={values.password} 
                    label="Lozinka" 
                    onChange={handleChange}
                    type="password" 
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}                   
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="passwordConfirmation" 
                    value={values.passwordConfirmation} 
                    label="Potvrdi lozinku" 
                    onChange={handleChange}
                    type="password"  
                    onBlur={handleBlur}
                    /><br/>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    REGISTER
                  </Button>
                  <div>{(error) ? error : ""}</div>
              </form>
              <form>
                  <meter onChange={handleChange} min="0" max="4" low="1" optimum="3" value={passwordStrength(values.password)}/>
              </form>
              </div>
          )}
      </Formik>
  </div>
}

const AddBookPage = () => {
  const [login] = useAuth();
  return <BookDetails startingMode="create" action={(book) => addBook(book,login)}/>
  
}

const fabStyle = {
  right: 1,
  bottom: 20,
  position: 'fixed'
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth  >
      <Router >
          <div className="main">
            <nav>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
             <Toolbar >
              <Button component={RouterLink} to="/allbooks" variant="contained" disableElevation sx={{marginRight: "10px"}}>
                  Sve knjige
              </Button>
              <Button component={RouterLink} to="/searchbooks" variant="contained" disableElevation>
                Pretraga
              </Button>
              <Button component={RouterLink} to="/searchbyauthor" variant="contained" disableElevation>
              Pretraga po autoru
              </Button>
              <AuthButton />   
            </Toolbar>
              </AppBar>
              </Box>
              <p/>
              <p/>
              <p/>
              <Fab style={fabStyle} color="primary" aria-label="add" component={RouterLink} to="/addbook">
               <AddIcon />
              </Fab>
            </nav>
            <div className="mainContent">
              <Switch>
                <Route path="/login">
                  <LoginBox/>
                </Route>
                <Route path="/register">
                  <RegisterBox/>
                </Route>
                <PrivateRoute path="/allbooks">
                  <AllBooksPage/>
                </PrivateRoute>
                <PrivateRoute path="/searchbooks">
                  <BookSearchPage/>
                </PrivateRoute>
                <PrivateRoute path="/searchbyauthor">
                  <BookSearchByAuthorPage/>
                </PrivateRoute>
                <PrivateRoute path="/book/:cid/:operation">
                  <BookDetailsPage/>
                </PrivateRoute>
                <PrivateRoute path="/addbook">
                  <AddBookPage/>
                  </PrivateRoute>
                <Route path="/">
                  <h1>EVIDENCIJA O KNJIGAMA</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ProvideAuth>
    </LocalizationProvider>
    </ThemeProvider>
  );
}

const optionss = [
  {label: "Science Fiction"},
  {label:  "Fantasy"},
  {label:  "Computing"},
  {label:  "Mystery"},
  {label:  "Horror"}];



export default App;

/*  */