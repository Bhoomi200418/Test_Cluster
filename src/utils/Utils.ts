import * as Bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import * as Multer from 'multer';

const desinationOptions = Multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, './src/uploads/restaurants');
  },
  filename: (req,file, cd) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cd(null,  uniqueSuffix + file.originalname);
  }
});

const fileFilter = (req, file, cd) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cd(null , true);
  } else {
    cd(null, false);
 }
};

export class Utils {
  static jwtSign(payload: { user_id: any; email: any; }) {
    const secretKey = process.env.JWT_SECRET || "default_secret";
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
  }

  static dotenvConfigs(): void {
    dotenv.config();
    console.log("Environment variables loaded successfully.");
  }

  public MAX_TOKEN_TIME = 5 * 60 * 1000;
  public multer = Multer ({storage: desinationOptions, fileFilter: fileFilter});


  static generateVerificationToken(digit: number = 6) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < digit; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    // return parseInt(otp);
     return otp;
  }

  static encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparePassword(data: { password: string, encrypt_password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(data.password, data.encrypt_password, (err, same) => {
        if (err) {
          reject(err);
        } else if (!same) {
          reject(new Error("User & Password Doesn't Match"));
        } else {
          resolve(true);
        }
      });
    });
  }
}
