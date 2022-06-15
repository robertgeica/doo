import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { logout } from "../actions/userActions";
import { loadCollection, updateCollection } from "../actions/collectionActions";
import { loadBlocks, addBlock } from "../actions/blockActions";
import Block from "../layout/components/Block/Block";
import AddBlockInput from "../layout/components/Block/AddBlockInput";
import { AiOutlineSave } from "react-icons/ai";

const CollectionScreen = (props) => {
  const { collectionState, blockState } = props;
  const { collection } = collectionState;

  const dispatch = useDispatch();
  const params = useParams();

  const [newCollectionName, setNewCollectionName] = useState(null);

  useEffect(() => {
    dispatch(loadCollection(params.id));
  }, [params.id]);

  useEffect(() => {
    if (collection?.blocks) {
      dispatch(loadBlocks(collection?.blocks));
    }
  }, [collection?.blocks]);


  return (
    <div>
      <div
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setNewCollectionName(e.target.textContent)}
        className="collection-input"
      >
        {collection?.name}
        {newCollectionName !== null &&
          newCollectionName !== collection?.name && (
            <AiOutlineSave
              style={{ cursor: "pointer" }}
              onClick={() =>
                dispatch(
                  updateCollection(
                    { ...collection, name: newCollectionName },
                    collection._id
                  )
                )
              }
            />
          )}
      </div>

      {blockState?.blocks?.map((block) => (
        <Block
          collection={collection}
          block={block}
          user={props.auth.user}
          subBlocks={blockState.subBlocks}
          key={block._id}
        />
      ))}

      <AddBlockInput
        parentId={collection?._id}
        userId={props.auth.user._id}
        style={{ maxWidth: "70%", border: "1px solid red" }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
  collectionState: state.collectionReducer,
  blockState: state.blockReducer,
});

export default connect(mapStateToProps)(CollectionScreen);
