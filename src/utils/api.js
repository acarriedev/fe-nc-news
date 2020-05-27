import axios from "axios";
const baseURL = "https://ac-nc-news.herokuapp.com/api";

export const fetchTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const fetchArticles = (topic, sort_by) => {
  return axios
    .get(`${baseURL}/articles`, { params: { topic, sort_by } })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const fetchArticleById = (article_id) => {
  return axios
    .get(`${baseURL}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const fetchComments = (article_id) => {
  return axios
    .get(`${baseURL}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postComment = (article_id, newComment) => {
  return axios
    .post(`${baseURL}/articles/${article_id}/comments`, newComment)
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const patchVotesById = (itemToUpdate, id, increment) => {
  return axios.patch(`${baseURL}/${itemToUpdate}/${id}`, {
    inc_votes: increment,
  });
};

export const deleteCommentById = (comment_id) => {
  return axios.delete(`${baseURL}/comments/${comment_id}`);
};
