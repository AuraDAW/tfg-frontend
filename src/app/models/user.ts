export interface User {
    id?:number,
    username?:string,
    email:string,
    password:string,
    role?:number,
    entityType?:"user"
}
