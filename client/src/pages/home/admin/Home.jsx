/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Menu, Navbar } from "../../../components/dashboardComponents";
import { ModalContext } from "../../../contexts/ModalContext";
import { Outlet } from "react-router-dom";
import "./home.css";

import axios from "axios";
import { baseUrl, getPdtUrl_admin, getUserUrl } from "../../../constants";
import {
  BarChart,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  UserCircle,
} from "lucide-react";
import Header from "../../../components/dashboardComponents/Header";

const Home = () => {
  //product State
  const [product, setProduct] = useState([]);
  const [openCreatePdt, setOpenCreatePdt] = useState(false);
  const [openDeletePdt, setOpenDeletePdt] = useState(false);
  const [openEditPdt, setOpenEditPdt] = useState(false);
  const [editPdt, setEditPdt] = useState({
    name: "",
    unitPrice: "",
    adminId: "",
    img: "",
  });

  //user State
  const [user, setUser] = useState([]);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    company: "",
    userType: "",
    status: "",
    img: "",
  });
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState([]);
  const [pdtData, setPdtData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchProductData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(getUserUrl);

      setData(res.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await axios.get(getPdtUrl_admin);

      const productsWithDataAndImages = res.data.products.map((product) => ({
        ...product,
        img: product.img ? `${baseUrl}/images/${product.img}` : null, // Assuming the backend serves images at /api route
      }));
      setPdtData(productsWithDataAndImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="home h-full">
      <Header />
      <div className="flex mt-[40px]">
        <ModalContext.Provider
          value={{
            product,
            setProduct,
            openCreatePdt,
            openDeletePdt,
            openEditPdt,
            setOpenCreatePdt,
            setOpenDeletePdt,
            setOpenEditPdt,
            user,
            setUser,
            openCreateUser,
            openDeleteUser,
            openEditUser,
            setOpenCreateUser,
            setOpenDeleteUser,
            setOpenEditUser,
            data,
            setData,
            pdtData,
            setPdtData,
            userData,
            setUserData,
            validated,
            setValidated,
            editUser,
            setEditUser,
            editPdt,
            setEditPdt,
          }}
        >
          {/* <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              alert
            />
            <SidebarItem
              icon={<BarChart size={20} />}
              text="Statistics"
              active
            />
            <SidebarItem icon={<UserCircle size={20} />} text="Users" />
            <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
            <SidebarItem icon={<Package size={20} />} text="Orders" alert />
            <SidebarItem icon={<Receipt size={20} />} text="Billings" />
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          </Sidebar> */}
          <Menu />
          <div className={`w-full ml-[250px]`}>
            <Navbar />

            <div className="outlet surface-ground">
              <Outlet fetchData={fetchData} />
            </div>
          </div>
        </ModalContext.Provider>
      </div>
    </section>
  );
};

export default Home;
