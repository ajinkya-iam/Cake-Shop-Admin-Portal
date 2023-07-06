import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/SideBar";

import "./styles.scss";
import { Redirect, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Button, Input, Spin, message } from "antd";

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    async function checkUserLogin() {
        setLoading(true);
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                //set timeout
                setTimeout(() => {
                    setIsLogin(true);
                    setLoading(false);
                }, 1000);
            } else {
                setIsLogin(false);
                setLoading(false);
            }
        });
    }

    async function login() {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    message.success("Login successfully..");
                    checkUserLogin();
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    message.error(errorMessage);
                });
        } catch (error) {
            console.log("Failed : ", error);
        }
    }

    useEffect(() => {
        checkUserLogin();
    }, []);

    return (
        <>
            {isLogin ? (
                <div className={`app ${toggled ? "toggled" : ""}`}>
                    <Sidebar
                        collapsed={collapsed}
                        toggled={toggled}
                        handleToggleSidebar={handleToggleSidebar}
                        handleCollapsedChange={handleCollapsedChange}
                    />
                    <main>
                        <div
                            className="btn-toggle"
                            onClick={() => handleToggleSidebar(true)}
                        >
                            <FaBars />
                        </div>

                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/products" component={Products} />
                            <Route path="/add-product" component={AddProduct} />
                            <Redirect to="/not-found" />
                        </Switch>
                    </main>
                </div>
            ) : (
                <>
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-screen">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
                            <Spin className="mt-10" />
                        </div>
                    ) : (
                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    className="mx-auto h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company"
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign in to Admin Portal
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            className="block w-full rounded-md border py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name="password"
                                            type="password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <button
                                        onClick={() => login()}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                                    >
                                        Sign in
                                    </button>
                                </div>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Design by{" "}
                                    <a className="font-semibold leading-6 cursor-pointer text-indigo-600 hover:text-indigo-500 underline">
                                        Aurora Digital Solution
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default App;
