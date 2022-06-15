import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { logout } from "../actions/userActions";
import { loadCollection } from "../actions/collectionActions";
import { loadBlocks, addBlock } from "../actions/blockActions";
import Block from "../layout/components/Block/Block";

const CollectionScreen = (props) => {
  const { collectionState, blockState } = props;
  const { collection } = collectionState;

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(loadCollection(params.id));
  }, [params.id]);

  useEffect(() => {
    if (collection?.blocks) {
      dispatch(loadBlocks(collection?.blocks));
    }
  }, [collection?.blocks]);

  // console.log(collection)
  return (
    <div>
      <h1>{collection?.name}</h1>
      {blockState?.blocks?.map((block) => (
        <Block
          collection={collection}
          block={block}
          user={props.auth.user}
          subBlocks={blockState.subBlocks}
          key={block._id}
        />
      ))}

      <input
        type="text"
        name="name"
        id="add-block"
        className="collections"
        placeholder="Add new block"
        onKeyDown={(e) => {
          e.key === "Enter" &&
            dispatch(
              addBlock({
                parentId: collection._id,
                userId: props.auth.user._id,
                blockName: e.target.value,
              })
            );
        }}
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
