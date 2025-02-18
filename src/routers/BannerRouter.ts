// import { UserValidators } from "./../validators/UserValidators";
// import { UserController } from "./../controllers/UserController";
import { Router } from "express";
import { BannerValidators } from "../validators/BannerValidators";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { BannerController } from "../controllers/BannerController";
// import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";


class BannerRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
    this.router.get('/banners', GlobalMiddleWare.auth, BannerController.getBanners);
  }
  postRoutes() { 
    this.router.post('/create/banner', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, new Utils().multer.single('banner'), 
    BannerValidators.addBanner(), GlobalMiddleWare.checkError, BannerController.addBanner);
  }
  patchRoutes() {

    }
  putRoutes() {

   }

  deleteRoutes() { }
}
export default new BannerRouter().router;