
import Index from "views/Index.js";
import Brands from "views/main/Brands.js";
import Models from "views/main/Models";
import Profile from "views/main/Profile.js";

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
    path: "/models",
    name: "Modelos",
    icon: "ni ni ni-book-bookmark text-purple",
    component: <Models />,
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
