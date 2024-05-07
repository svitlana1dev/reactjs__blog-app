import React, { useState, userState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import "./Post.css";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation unpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      post {
        title
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
  onDelete,
}) {
  const [isPublished, setIsPublished] = useState(published);
  const [publishPost, { data, loading }] = useMutation(PUBLISH_POST);
  const [unpublishPost, { data: unpublishData, loading: unpublishLoading }] =
    useMutation(UNPUBLISH_POST);

  const formatedDate = new Date(Number(date));

  const handleOnDelete = () => {
    onDelete && onDelete(id);
  };

  return (
    <div
      className="Post"
      style={
        !isPublished ? { backgroundColor: "#fbfcfe", boxShadow: "none" } : {}
      }
    >
      <div className={"Post__buttons-container"}>
        {isMyProfile && !isPublished && (
          <p
            className="Post__publish"
            onClick={() => {
              publishPost({
                variables: {
                  postId: id,
                },
              }).then(() => setIsPublished((prev) => !prev));
            }}
          >
            <FontAwesomeIcon icon={faEyeSlash} size="xs" />
          </p>
        )}
        {isMyProfile && isPublished && (
          <p
            className="Post__publish"
            onClick={() => {
              unpublishPost({
                variables: {
                  postId: id,
                },
              }).then(() => setIsPublished((prev) => !prev));
            }}
          >
            <FontAwesomeIcon icon={faEye} size="xs" />
          </p>
        )}

        {isMyProfile && (
          <div className={"Post__delete-btn"} onClick={handleOnDelete}>
            <FontAwesomeIcon icon={faTrashCan} size="xs" />
          </div>
        )}
      </div>
      <p className={"Post_subtitle"}>
        Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
        {user}
      </p>
      <div className="Post__header-container">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
