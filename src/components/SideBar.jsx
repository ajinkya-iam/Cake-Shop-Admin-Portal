import { NavLink } from "react-router-dom";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
} from "react-pro-sidebar";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaUser } from "react-icons/fa";

import { BiLogOutCircle, BiDish } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { message } from "antd";
import { auth } from "../firebase";
import { Link } from "@material-ui/core";

const Sidebar = ({
    collapsed,
    toggled,
    handleToggleSidebar,
    handleCollapsedChange,
}) => {
    async function handleLogout() {
        await auth.signOut();
        message.success("Logout Successfully !!");
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
                    {/* <MenuItem icon={<BiDish />}>
                        Products
                        <NavLink to="/products" />
                    </MenuItem> */}
                    <MenuItem
                        icon={<BiLogOutCircle className="text-red-600" />}
                    >
                        <div
                            className="text-red-600"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </div>
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: "center" }}>
                <div
                    className="sidebar-btn-wrapper flex flex-col"
                    style={{ padding: "16px" }}
                >
                    <span className="text-xs items-center text-center">Design By <br /><span className="text-blue-600 underline">Aurora Digital Solution</span></span>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;
