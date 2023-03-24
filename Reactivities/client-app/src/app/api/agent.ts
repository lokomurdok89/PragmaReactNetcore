import axios, { AxiosResponse } from "axios";
import { User } from "../model/user";

const sleep = (delay:number)=>{

    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    });
}

axios.defaults.baseURL='http://localhost:5000/'
axios.interceptors.response.use(async response=>{
   try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
const responseBody =(response:AxiosResponse) => response.data;

const request = {
    get:<T>(url:string)=> axios.get<T>(url).then(responseBody),
    post:<T>(url:string, body:{})=> axios.post<T>(url, body).then(responseBody),
    put:<T>(url:string, body:{})=> axios.put<T>(url, body).then(responseBody),
    del:<T>(url:string)=> axios.delete<T>(url).then(responseBody),

}
const Users ={
    list:() => request.get<User[]>('/Users'),
    details:(id:string) => request.get<User>(`/Users/${id}`),
    create:(user:User)=> request.post<void>('/Users',user),
    update: (user:User)=> request.put<void>(`/Users/${user.id}`,user),
    delete:(id:string) => request.del<void>(`/Users/${id}`),
}

const agent = {
    Users
}

export default agent;