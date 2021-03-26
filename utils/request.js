import axios from "axios";

const token =
  "m8tiFyxZrZD1NGWNAjSu7dpPV8hlJOMLOqS2sWCGXXFllxFsHmGwrD3oT2Son1kXaEM6iRL22nLsgBPp";

export default axios.create({
  baseURL: "https://sapi.newsifier.com/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
