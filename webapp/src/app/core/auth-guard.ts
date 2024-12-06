// import { inject } from "@angular/core";
// import { CanActivateFn, Router } from "@angular/router";
// import { AuthService } from "../services/auth.service";

// export const authGuard:CanActivateFn=(route,state)=>{
//     const authService=inject(AuthService);
//     const router=inject(Router);
//     if(authService.isLoggedIn){
//         return true;
//     }else{
//         router.navigateByUrl("/login")
//         return false;
//     }
// }

//new
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar"; 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  console.log("Auth Guard Triggered");  // Debugging log

  if (authService.isLoggedIn) {
    console.log("User is logged in");  // Debugging log
    return true;
  } else {
    console.log("User is not logged in");  // Debugging log
    snackBar.open("Please login first to shop.", "Close", {
      duration: 3000,
    });
    router.navigateByUrl("/login");
    return false;
  }
};
