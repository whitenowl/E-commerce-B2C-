import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";
import { retry } from "rxjs";


export const tokeHttpInterceptor:HttpInterceptorFn=(req,next)=>{
    const token=localStorage.getItem("token");
    if(token){
        req=req.clone({
            setHeaders:{
                Authorization: token,
            },
        });
    }
    return next(req);
}