import axios from 'axios';


export default{
    auth:{
        login: (credentials) =>
            axios.post("/api/auth/login",{credentials}).then(res=>res.data.user),
        logout: (logoutToken) => 
            axios.post("/api/auth/logout",{logoutToken}),
        authenticationCheck: () =>
            axios.post("/api/auth/authentication_check").then(res=>res.data.user),
        signupConfirmationToken: (token) =>
            axios.post("/api/auth/signup_confirmation_token",{token}), 
        signup: (user) =>
            axios.post("/api/auth/signup",{user}),
        signupEmailExists: (email) =>
            axios.post("/api/auth/signup_email_exists",{email}),
        forgotPassword: (email) =>
            axios.post("/api/auth/forgot_password",{email}),
        resetPasswordToken: (token) =>
            axios.post("/api/auth/reset_password_token",{token}),
        resetPassword:(data) => 
            axios.post("/api/auth/reset_password",{data}),
        
    },
    dashboard:{
        page:()=>
            axios.get("/api/dashboard"),
    }
};