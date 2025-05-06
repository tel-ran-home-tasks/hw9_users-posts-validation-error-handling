import {Post} from "../model/postTypes.js";
import {postService, userService} from "../config/appConfig.js";
import {UserPostError} from "../utils/types.js";

function throwError(status: number, message: string): never {
    throw new UserPostError(status, message);
}

export async function getUserPost(userId: number): Promise<Post[]> {
    if (!userService.getUser(userId)) throwError(404, "User not found");
    return postService.getAllUserPosts(userId);
}

export async function updatePost(post: Post): Promise<boolean> {
    if (!userService.getUser(post.userId)) throwError(404, "User not found");
    const result = postService.updatePost(post);
    if (!result) throwError(404, "Post not found");
    return result;
}

export async function removePost(id: number): Promise<Post> {
    try {
        return postService.removePost(id);
    } catch (e) {
        throwError(404, "Post not found");
    }
}

export async function getPostById(id: number): Promise<Post> {
    try {
        return postService.getPost(id);
    } catch (e) {
        throwError(404, "Post not found");
    }
}

export async function getAllPosts(): Promise<Post[]> {
    return postService.getAllPosts();
}

export async function addPost(post: Post): Promise<boolean> {
    if (!userService.getUser(post.userId)) throwError(404, "User not found");
    const result = postService.addPost(post);
    if (!result) throwError(409, "Post with such id already exists");
    return result;
}