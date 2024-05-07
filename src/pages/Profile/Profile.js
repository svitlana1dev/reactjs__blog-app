import { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        name
        posts {
          id
          title
          content
          createdAt
          published
        }
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    postDelete(postId: $postId) {
      userErrors {
        message
      }
      post {
        id
      }
    }
  }
`;

export default function Profile() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  const [deletePost, { data: any, loading: boolean }] =
    useMutation(DELETE_POST);

  useEffect(() => {
    if (data && data.profile) {
      setPosts(profile.user.posts);
    }
  }, [data]);

  if (error) return <div>error page</div>;

  if (loading) return <div>Spinner...</div>;

  const { profile } = data;

  const handleOnDeletePost = (id) => {
    deletePost({
      variables: {
        postId: id,
      },
    }).then(({ data }) => {
      const { id } = data.postDelete.post;

      if (id) {
        setPosts((prev) => prev.filter((post) => post.id !== id));
      }
    });
  };

  const handleOnAdd = (post) => {
    if (post) {
      setPosts((prev) => [post, ...prev]);
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{profile.user.name}</h1>
          <p>{profile.bio}</p>
        </div>
        {profile.isMyProfile && (
          <div>
            <AddPostModal onAdd={(post) => handleOnAdd(post)} />
          </div>
        )}
      </div>
      <div>
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.createdAt}
              user={profile.user.name}
              published={post.published}
              isMyProfile={profile.isMyProfile}
              id={post.id}
              onDelete={(id) => handleOnDeletePost(id)}
            />
          );
        })}
      </div>
    </div>
  );
}
