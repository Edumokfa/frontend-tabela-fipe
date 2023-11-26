
import Index from "views/Index.js";
import Brands from "views/main/Brands.js";
import Models from "views/main/Models";

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
    icon: "ni ni ni-ambulance text-green",
    component: <Models />,
    layout: "/admin",
  },
];
export default routes;
