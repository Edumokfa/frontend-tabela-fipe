
import Index from "views/Index.js";
import Profile from "views/main/Profile.js";
import Maps from "views/main/Maps.js";
import Register from "views/main/Register.js";
import Brands from "views/main/Brands.js";
import Icons from "views/main/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/marcas",
    name: "Marcas",
    icon: "ni ni ni-tag text-blue",
    component: <Brands />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Modelos",
    icon: "ni ni ni-book-bookmark text-purple",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/veiculos",
    name: "Veículos",
    icon: "ni ni ni-ambulance text-green",
    component: <Profile />,
    layout: "/admin",
  }
];
export default routes;
