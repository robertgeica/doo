import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavItem from "./navItem/NavItem.jsx";
import { connect } from "react-redux";
import { sideMenu } from "./menu.config.js";
import {
  loadWorkplace,
  addWorkplace,
  deleteWorkplace,
  updateWorkplace,
  loadWorkplaces,
} from "../../../actions/workplaceActions.js";
import { logout } from "../../../actions/userActions";
import {
  loadCollections,
  addCollection,
  deleteCollection,
} from "../../../actions/collectionActions.js";
import {
  MdDeleteOutline,
  MdEdit,
  MdAddCircleOutline,
  MdOutlinePowerSettingsNew,
} from "react-icons/md";
const EditableDropdown = React.lazy(() =>
  import("../Dropdown/EditableDropdown.js")
);

const Sidebar = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user, workplace } = props;
  const collections = workplace?.workplace?.collections?.map((collection) => {
    return {
      label: collection.collectionName,
      icon: collection.collectionIcon,
      to: `collection/${collection.collectionId}`,
    };
  });

  const options = user?.workplacesIds?.map((workplace) => {
    return {
      value: workplace.workplaceId,
      label: workplace.name,
    };
  });

  const [defaultValue, setDefaultValue] = useState(
    typeof options === "undefined" ? {} : options[0]
  );
  const userId = props.user._id;

  const selectItem = (id) => {
    setDefaultValue(options?.filter((item) => id == item.value));
  };

  const addItem = (content) => {
    return (
      <MdAddCircleOutline
        className="actionButton"
        onClick={(e) => {
          dispatch(
            addWorkplace({ workplace: { workplaceName: content } }, userId)
          );
        }}
      />
    );
  };

  const updateItem = (content, workplaceId) => {
    return (
      <MdEdit
        className="actionButton"
        onClick={(e) =>
          dispatch(updateWorkplace({ workplaceName: content }, workplaceId))
        }
      />
    );
  };

  const deleteItem = (id) => {
    return (
      <MdDeleteOutline
        className="actionButton"
        onClick={() => dispatch(deleteWorkplace(id))}
      />
    );
  };

  useEffect(() => {
    if (typeof defaultValue?.value !== "undefined") {
      dispatch(loadWorkplace(defaultValue?.value));
    }
  }, [user]);

  const [collectionName, setCollectionName] = useState("");
  const onCollectionInputChange = (e) => {
    if (e.key === "Enter") {
      dispatch(
        addCollection(
          {
            collection: {
              workplaceId: workplace?.workplace._id,
              name: e.target.value,
              icon: "📁",
              background: "default",
            },
          },
          userId
        )
      ).then(() => {
        e.target.value = "";
        dispatch(loadWorkplace(workplace.workplace._id));
      });
    }
    // setCollectionName(e.target.textContent);
  };

  const removeCollection = (id) => {
    dispatch(deleteCollection(id)).then(() =>
      dispatch(loadWorkplace(workplace.workplace._id))
    );
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <EditableDropdown
          options={options}
          value={defaultValue ? defaultValue : ""}
          onChange={(e) =>
            dispatch(loadWorkplace(e.target.childNodes[0].id || e.target.id))
          }
          placeholder="Select option"
          itemActions={{ addItem, updateItem, deleteItem, selectItem }}
        />
      </div>

      <div className="links">
        <div className="links-header">
          <input
            // contentEditable="true"
            // suppressContentEditableWarning={true}
            className="collections"
            onKeyDown={onCollectionInputChange}
            // data-text="Type new collection name..."
            placeholder="Type new collection name..."
          ></input>
          {/* <MdAddCircleOutline
            className="actionButton edit-collection"
            onClick={(e) => {
              dispatch(
                addCollection(
                  {
                    collection: {
                      workplaceId: workplace?.workplace._id,
                      name: collectionName,
                      icon: "📁",
                      background: "default",
                    },
                  },
                  userId
                )
              ).then(() => dispatch(loadWorkplace(workplace.workplace._id)));
            }}
          /> */}
        </div>
        {collections &&
          sideMenu(collections).map((item, index) => {
            return (
              <>
                <NavItem
                  key={`${item.to}`}
                  item={item}
                  deleteCollection={removeCollection}
                />
              </>
            );
          })}
      </div>

      <div className="actions">
        <MdOutlinePowerSettingsNew
          onClick={() => {
            dispatch(logout());
            navigate("/welcome");
          }}
        />
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  workplace: state.workplaceReducer,
});

export default connect(mapStateToProps)(Sidebar);
