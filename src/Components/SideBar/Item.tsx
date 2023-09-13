import Dashboard from "../Screens/Dashboard/Dashboard";
import { ProjectScreen } from "../Screens/Projects/ProjectScreen";
import FeedsScreen from "../Screens/Feeds/FeedsScreen";
import ExpertsScreen from "../Screens/Experts/ExpertsScreen";
import UserScreen from "../Screens/UserScreen/UserScreen";
import { UserDto } from "../../types";
import Group from "react-select/dist/declarations/src/components/Group";
import Groups from "../Screens/Groups/Groups";
import Events from "../Screens/Dashboard/Events";


export const SIDEBAR_DATA = [
    {
      id: 1,
      name: "Cockpit",
      path: "cockpit",
      icon: "/assets/dashboard.svg",
      element: <Dashboard />,
    },
    {
      id: 2,
      name: "ventures",
      path: "project",
      icon: "/assets/work.svg",
      element: <ProjectScreen />,
    },
    {
      id: 3,
      name: "Specialists",
      path: "specialists",
      icon: "/assets/supervised-user-circle.svg",
      element: <ExpertsScreen />,
    },
    {
      id: 4,
      name: "personalized",
      path: "personalized",
      icon: "/assets/personalised.svg",
      element: <UserScreen user={{} as UserDto}/>,
    },
    {
      id: 5,
      name: "Groups",
      path: "Groups",
      icon: "/assets/groups.svg",
      element: <Groups  />,
    },
    {
      id: 6,
      name: "events",
      path: "events",
      icon: "/assets/events.svg",
      element: <Events  />,
    },
  ];