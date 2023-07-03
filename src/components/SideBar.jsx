import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import { BiLogOutCircle } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { message } from "antd";

const Sidebar = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {

    function handleLogout() {
        message.info("Not implemented yet !!")
    }

    return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                }}
              >
                Admin Panel
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<RiDashboardFill />}>
            Dashboard
            <NavLink to="/dashboard" />
          </MenuItem>
          <MenuItem icon={<AiOutlineShoppingCart />}>
            Orders
            <NavLink to="/orders" />
          </MenuItem>
          <MenuItem icon={<BiLogOutCircle className="text-red-600" />}>
            <div className="text-red-600" onClick={()=>handleLogout()}>
                Logout
            </div>
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default Sidebar;
