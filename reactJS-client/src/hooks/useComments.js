import { useEffect, useState } from "react";
import commentsApi from "../api/commentsApi";

export function useGetAllComments(articleId) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await commentsApi.getAll(articleId);

      setComments(result);
    })();
  }, [articleId]);

  return [comments, setComments];
}

export function useCreateComment() {
  const createHandler = (articleId, commentText) =>
    commentsApi.create(articleId, commentText);

  return createHandler;
}

export function useRemoveComment() {
  const removeHandler = (commentId) => commentsApi.remove(commentId);

  return removeHandler;
}
