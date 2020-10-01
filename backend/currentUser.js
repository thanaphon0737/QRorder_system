module.exports = class currentUser{
    constructor(id,email,role,JWT_auth){
        this.id = id;
        this.email = email;
        this.role = role;
        this.JWT_auth = JWT_auth;
    }
    set me(JWT_auth){
        this.JWT_auth = JWT_auth
    }
    get me(){
        return {user:{
            id:this.id,
            email:this.email,
            role:this.role,
            JWT_auth:this.JWT_auth
        }}
    }
}