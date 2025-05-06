import {IncomingMessage, ServerResponse} from "node:http";
import {parseBody} from "../utils/tools.js";
import {UserService} from "../services/UserService.js";
import {User} from "../model/userTypes.js";
import {SOCKET} from "../config/userConfig.js";
import {logger} from "../events/logger.js";

export class UserController{

    constructor(private userService:UserService) {}

    async addUser(req:IncomingMessage, res: ServerResponse){
        logger.log("Request for adding new user was get")
        const body = await parseBody(req);
        const isSuccess = this.userService.addUser(body as User);
        if (isSuccess) {

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('User added');
            logger.log('new user was successfully added')
            logger.save('new user was successfully added')
        } else {
            res.writeHead(409, {'Content-Type': 'text/plain'});
            res.end('User is already exist');
            logger.log('user was not added, because user with the same ID already exists')
        }
    }

    getUser(req:IncomingMessage, res: ServerResponse){
        logger.log('Request to get user data')
        const id = new URL(req.url!, SOCKET).searchParams.get('userId')
        if(id===null){
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Request must contain user ID');
            logger.log('request without ID')
            return;
        }
        const founded = this.userService.getUser(+id);
        if(founded!==null){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(founded))
            logger.log('Success')
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end(`User not found with id ${id}`)
            logger.log('user not found');
        }
    }

    async removeUser(req:IncomingMessage, res: ServerResponse){
        logger.log('Request for removing user was get')
        const body = await parseBody(req) as User;
        const removed = this.userService.removeUser(body.id);
        if (removed) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(removed))
            logger.log('user was removed')
            logger.save('user was removed')
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end(`User with id ${body.id} not found`);
            logger.log('user not found')
        }
    }

    async updateUser(req:IncomingMessage, res: ServerResponse){
        logger.log('Request for updating user was get')
        const body = await parseBody(req) as User;
        const isSuccess = this.userService.updateUser(body);
        if (isSuccess) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`User with id ${body.id} was updated`);
            logger.log('user was updated')
            logger.save('user was updated')
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end(`User with id ${body.id} not found`);
            logger.log('user not found')
        }
    }
    getAllUsers(res:ServerResponse){
        logger.log('Request to get all users data')
        const users = this.userService.getAllUsers();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users))
        logger.log('Success')
    }
}