import { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserDto } from "../../types";
import UserScreen from "../Screens/UserScreen/UserScreen";

interface ItemProps {
  page:string
  setCurrentPath ?: React.Dispatch<React.SetStateAction<string>>
  component: React.ReactNode;
  User:UserDto
}

const Item:FunctionComponent<ItemProps> = ({page,setCurrentPath,component,User}) => {
 
  useEffect(() => {
    if (setCurrentPath) {
      setCurrentPath(page)
    }
  }, [page])
  
  if (page === "My Profile") {
    return <div id="page">
        <UserScreen user={User} />
    </div>;
  } else {
    return (
      <div id="page">
        {component}
      </div>
    );
  }
};

export default Item;