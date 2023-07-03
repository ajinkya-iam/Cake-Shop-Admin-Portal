import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/SideBar";

import "./styles.scss";
import { Redirect, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      <main>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>

        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/orders" component={Orders} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
