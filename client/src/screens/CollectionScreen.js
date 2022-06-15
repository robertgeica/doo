import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { logout } from "../actions/userActions";
import { loadCollection, updateCollection } from "../actions/collectionActions";
import { loadBlocks, addBlock } from "../actions/blockActions";
import Block from "../layout/components/Block/Block";
import AddBlockInput from "../layout/components/Block/AddBlockInput";
import { AiOutlineSave } from "react-icons/ai";
import { loadWorkplace } from "../actions/workplaceActions";
import Emoji from "../layout/components/Emoji";

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


  const onIconUpdate = (emoji) => {
    dispatch(
      updateCollection(
        { ...collection, icon: emoji },
        collection._id
      )
    );
  }
  return (
    <div>
      <div style={{ display: "flex", maxWidth: '70%' }}>
        <Emoji parent={collection} onUpdate={onIconUpdate}/>
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
                  ).then(() => dispatch(loadWorkplace(collection.workplaceId)))
                }
              />
            )}
        </div>
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

      {/* <Emoji collection={collection} bid={collection?._id} /> */}
      <AddBlockInput parentId={collection?._id} userId={props.auth.user._id} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.userReducer,
  collectionState: state.collectionReducer,
  blockState: state.blockReducer,
});

export default connect(mapStateToProps)(CollectionScreen);
