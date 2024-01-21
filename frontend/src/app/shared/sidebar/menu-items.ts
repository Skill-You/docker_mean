import { RouteInfo, RouteUser } from "./sidebar.metadata";

export const ROUTES: RouteUser[] = [
  {
    role: "ROLE_SUPERADMIN",
    routes: [
      {
        path: "/superadmin/dashboard",
        title: "Dashboard",
        icon: "bi bi-speedometer2",
        image: "assets/images/bashboard.png",
        active: "assets/images/bashbaord.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      },
      {
        path: "/superadmin/competitions",
        title: "Competition Manager",
        icon: "bi bi-speedometer2",
        image: "assets/images/bashboard.png",
        active: "assets/images/bashbaord.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      }
    ]
  },
  {
    role: "ROLE_ADMIN",
    routes: [
      {
        path: "/admin/dashboard",
        title: "Dashboard",
        icon: "bi bi-speedometer2",
        image: "assets/images/bashboard.png",
        active: "assets/images/bashbaord.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      },
      {
        path: "/admin/competitions",
        title: "Competition Manager",
        icon: "bi bi-speedometer2",
        image: "assets/images/bashboard.png",
        active: "assets/images/bashbaord.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      },
      {
        path: "/admin/leagues",
        title: "League Management",
        icon: "bi bi-speedometer2",
        image: "assets/images/leagues.png",
        active: "assets/images/leagues.png",
        class: "",
        extralink: false,
        submenu: [],
        display: false
      },
      {
        path: "/admin/academies",
        title: "Club Management",
        icon: "bi bi-speedometer2",
        image: "assets/images/teams.png",
        active: "assets/images/teams.png",
        class: "",
        extralink: false,
        submenu: [],
        display: false
      },
      {
        path: "/admin/squads",
        title: "Squad Management",
        icon: "bi bi-speedometer2",
        image: "assets/images/squads.png",
        active: "assets/images/squads.png",
        class: "",
        extralink: false,
        submenu: [],
        display: false
      },
      {
        path: "/admin/users",
        title: "User Management",
        icon: "bi bi-speedometer2",
        image: "assets/images/squads.png",
        active: "assets/images/squads.png",
        class: "",
        extralink: false,
        submenu: [],
        display: false
      },
      {
        path: "/admin/players",
        title: "All Players",
        icon: "bi bi-speedometer2",
        image: "assets/images/teams.png",
        active: "assets/images/teams.png",
        class: "",
        extralink: false,
        submenu: [],
        display: false
      },
      {
        path: "/admin/results",
        title: "Results",
        icon: "bi bi-speedometer2",
        image: "assets/images/teams.png",
        active: "assets/images/teams.png",
        class: "",
        extralink: false,
        submenu: [],
        display: false
      }
    ]
  },
  {
    role: "ROLE_COACH",
    routes: [
      {
        path: "/coach/dashboard",
        title: "Dashboard",
        icon: "bi bi-speedometer2",
        image: "assets/images/bashboard.png",
        active: "assets/images/bashbaord.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      },
      {
        path: "/coach/teams",
        title: "Squad Management",
        icon: "bi bi-hdd-stack",
        image: "assets/images/squads.png",
        active: "assets/images/squads.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      }
    ]
  },
  {
    role: "ROLE_REFEREE",
    routes: [
      {
        path: "/referee/dashboard",
        title: "Fixture Setup",
        icon: "bi bi-speedometer2",
        image: "assets/images/bashboard.png",
        active: "assets/images/bashbaord.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      },
      {
        path: "/referee/mangegames",
        title: "Game Management",
        icon: "bi bi-pause-btn",
        image: "assets/images/squads.png",
        active: "assets/images/squads.png",
        class: "",
        extralink: false,
        submenu: [],
        display: true
      }
    ]
  }
];
