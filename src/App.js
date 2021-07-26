import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SignIn from "./page/SignIn/components";
import ChatUI from "./page/ChatUI/components";
import AuthProvider from "./context/AuthProvider";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route path="/login" component={SignIn} exact />
            <Route path="/chat" component={ChatUI}></Route>
            <Route path="/">{<Redirect to="/login" />}</Route>
            <Route path="*">
              <h2>NOT FOUND</h2>
            </Route>
          </Switch>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
