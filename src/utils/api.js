import axios from "axios";
const request = axios.create({
  baseURL: "https://ac-nc-news.herokuapp.com/api",
});

export const fetchTopics = async () => {
  const {
    data: { topics },
  } = await request.get(`/topics`);
  return topics;
};

export const fetchArticles = async (topic, sort_by) => {
  const {
    data: { articles },
  } = await request.get(`/articles`, { params: { topic, sort_by } });
  return articles;
};

export const fetchArticleById = async (article_id) => {
  const {
    data: { article },
  } = await request.get(`/articles/${article_id}`);
  return article;
};

export const fetchComments = async (article_id) => {
  const {
    data: { comments },
  } = await request.get(`/articles/${article_id}/comments`);
  return comments;
};

export const postComment = async (article_id, newComment) => {
  const {
    data: { comment },
  } = await request.post(`/articles/${article_id}/comments`, newComment);
  return comment;
};

export const patchVotesById = async (itemToUpdate, id, increment) => {
  const {
    data: { article },
  } = await request.patch(`/${itemToUpdate}/${id}`, {
    inc_votes: increment,
  });
  return article;
};

export const deleteCommentById = async (comment_id) => {
  const response = await request.delete(`/comments/${comment_id}`);
};
