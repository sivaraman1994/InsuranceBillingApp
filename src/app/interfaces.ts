/*
Interface for the Register Request (can look different, based on your backend api)
*/
export interface RegisterRequest {
    fullname: string;
    email: string;
    password: string;
  }
  
  /*
  Interface for the Register Response (can look different, based on your backend api)
  */
  export interface RegisterResponse {
    status: number;
    message: string;
  }