import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Textbox from "./components/Textbox";
import Docs from "./components/Docs";
import Error from "./components/Error";
import News from "./components/News";
import Homepage from "./components/Homepage";
import Mynotebook from "./components/Mynotebook";
import NoteStates from "./context/notes/NoteStates";
import Login from "./components/Login";
import Signup from "./components/Signup";

export class App extends Component {
  pageSize = 12;
  apiKey = process.env.REACT_APP_NEWS_API;

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      mode: "light",
      alert: null,
    };
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  toggleMode = (mode) => {
    this.setState({ mode: mode });
  };
  setAlert = (alert) => {
    this.setState({ alert: alert });
  };

  showAlert = (type, message) => {
    this.setAlert({
      type: type,
      msg: message,
    });
    setTimeout(() => {
      this.setAlert(null);
    }, 1500);
  };
  modes = () => {
    if (this.state.mode === "light") {
      this.toggleMode("dark");
      document.body.style.backgroundColor = "#161928";
      document.body.style.color = "#ffffff";
      localStorage.setItem("mode", "dark")
      this.showAlert("success", "Dark mode enabled");
    } else {
      this.toggleMode("light");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
      localStorage.setItem("mode", "light")
      this.showAlert("success", "Light mode enabled");
    }
  };

  componentDidMount() {
    this.setProgress(100);
    setTimeout(() => {
      this.setProgress(0);
    }, 100);
  }

  render() {
    return (
      <NoteStates>
        <Router>
          <LoadingBar progress={this.state.progress} color="#2974bf" />
          <Navbar
            mode={this.state.mode}
            modes={this.modes}
            showAlert={this.showAlert}
          />
          <Alert alert={this.state.alert} />
          <div className="container my-3">
            <Switch>
              <Route exact path="/">
                <Homepage mode={this.state.mode} />
              </Route>
              <Route exact path="/texteditor">
                <Textbox showAlert={this.showAlert} />
              </Route>
              <Route exact path="/docs">
                <Docs mode={this.state.mode} />
              </Route>
              <Route exact path="/my/home">
                <Mynotebook mode={this.state.mode} showAlert={this.showAlert} />
              </Route>
              <Route exact path="/login">
                <Login showAlert={this.showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={this.showAlert} />
              </Route>

              <Route exact path="/news/all">
                <News
                  mode={this.state.mode}
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  category="general"
                  key="general"
                />
              </Route>
              <Route exact path="/news/science">
                <News
                  mode={this.state.mode}
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  category="science"
                  key="science"
                />
              </Route>
              <Route exact path="/news/business">
                <News
                  mode={this.state.mode}
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  category="business"
                  key="business"
                />
              </Route>
              <Route exact path="/news/entertainment">
                <News
                  mode={this.state.mode}
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  category="entertainment"
                  key="entertainment"
                />
              </Route>
              <Route exact path="/news/health">
                <News
                  mode={this.state.mode}
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  category="health"
                  key="health"
                />
              </Route>
              <Route exact path="/news/sports">
                <News
                  mode={this.state.mode}
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  category="sports"
                  key="sports"
                />
              </Route>
              <Route exact path="/news/technology">
                <News
                  mode={this.state.mode}
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  category="technology"
                  key="technology"
                />
              </Route>

              <Route>
                <Error />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteStates>
    );
  }
}

export default App;
