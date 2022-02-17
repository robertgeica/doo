export const sideMenu = (children) => [
  {
    label: "Home",
    icon: "icon",
    to: "/",
  },
  {
    label: "Collections",
    icon: "icon",
    to: "/collections",
    children: children,
  },
];
