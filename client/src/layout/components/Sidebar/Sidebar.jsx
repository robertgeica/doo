import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavItem from "./navItem/NavItem.jsx";
import { connect } from "react-redux";
import { sideMenu } from "./menu.config.js";
import {
  loadWorkplace,
  addWorkplace,
  deleteWorkplace,
  updateWorkplace,
} from "../../../actions/workplaceActions.js";
const Dropdown = React.lazy(() => import("../Dropdown/Dropdown.js"));

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const { user, workplace } = props;

  const collections = workplace?.workplace?.collections?.map((collection) => {
    return {
      label: collection.collectionName,
      icon: "icon",
      to: `${collection.collectionId}`,
    };
  });

  const options = user?.workplacesIds.map((workplace) => {
    return {
      value: workplace.workplaceId,
      label: workplace.name,
    };
  });
  const defaultValue = options?.[0];

  const addItem = () => (
    <button onClick={() => dispatch(addWorkplace())}>+</button>
  );

  const updateItem = () => (
    <button onClick={() => dispatch(updateWorkplace())}>e</button>
  );

  const deleteItem = (id) => {
    return <button onClick={() => dispatch(deleteWorkplace(id))}>x</button>;
  };

  useEffect(() => {
    dispatch(loadWorkplace(defaultValue?.value));
  }, []);

  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <Dropdown
          options={options}
          value={defaultValue ? defaultValue : ""}
          onChange={(e) => dispatch(loadWorkplace(e.target.id))}
          placeholder="Select option"
          itemActions={{ addItem, updateItem, deleteItem }}
        />
      </div>

      <div className="links">
        <div className="links-header">
          <p>Favorites</p>
          <button>+</button>
        </div>
        {/* {sideMenu(collections).map((item, index) => {
          return <NavItem key={`${item.label}`} item={item} />;
        })} */}

        <div className="links-header">
          <p>Collections</p>
          <button>+</button>
        </div>
        {collections &&
          sideMenu(collections).map((item, index) => {
            return (
              <NavItem
                key={`${item.label}`}
                item={{ ...item, to: `collection/${item.to}` }}
              />
            );
          })}
      </div>

      <div className="actions">
        <button>logout</button>
        <div className="user">
          <button>profile</button>
          <button>setari</button>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  workplace: state.workplaceReducer,
});

export default connect(mapStateToProps)(Sidebar);
