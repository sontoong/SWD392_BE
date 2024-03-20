import { NextFunction, Request, Response } from 'express';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import multer from 'multer';
import AppError from '~/utils/appError';
import catchAsync from '~/utils/catchAsync';
import firebaseConfig from '~/configs/firebaseConfig';

let isWrongFileType: boolean = false;

// firebase
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get references to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads

export const checkImgUpload = (isReturnError: boolean) => {
  const multerStorage = multer.memoryStorage();

  const multerFilterForSingleFile = (
    req: Request,
    file: Express.Multer.File,
    cb: any
  ) => {
    console.log(file);
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      isWrongFileType = true;
      if (isReturnError) {
        cb(
          new AppError('Not an image! Please upload only images.', 400),
          false
        );
      } else {
        req.body.invalidImage = file.originalname;
        cb(null, true);
      }
    }
  };

  return multer({
    storage: multerStorage,
    fileFilter: multerFilterForSingleFile
  });
};

export const sendImgtoFirebase = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (req.file && !isWrongFileType) {
      await uploadImgToFirebaseAndGetURL(req.file, req);
    }
    if (req.files && !isWrongFileType) {
      let files: Express.Multer.File[] = [];
      if (!Array.isArray(req.files)) {
        files = Object.values(structuredClone(req.files)).map(
          (file) => file[0]
        );
      } else {
        files = structuredClone(req.files);
      }
      for (let file of files) {
        await uploadImgToFirebaseAndGetURL(file, req);
      }
    }
    isWrongFileType && (isWrongFileType = false);
    next();
  }
);

const uploadImgToFirebaseAndGetURL = async (
  file: Express.Multer.File,
  req: Request
) => {
  let fileNameItem = file.originalname.split('.');
  let lastItem = fileNameItem.pop();
  let fileName = fileNameItem.join('.') + '-' + Date.now() + '.' + lastItem;
  const storageRef = ref(storage, `images/${fileName}`);

  // Create file metadata including content type
  const metadata = {
    contentType: file.mimetype
  };

  // Check if req.file.buffer is defined before uploading the file
  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );

  const downloadURL = await getDownloadURL(snapshot.ref);
  req.body[file.fieldname] = downloadURL;
  console.log('file uploaded successfully');
};
