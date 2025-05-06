import {UserServiceEmbeddedImpl} from "../services/UserServiceEmbeddedImpl.js";
import {PostServiceEmbeddedImpl} from "../services/PostServiceEmbeddedImpl.js";

export const userService = new UserServiceEmbeddedImpl();
export const postService = new PostServiceEmbeddedImpl();