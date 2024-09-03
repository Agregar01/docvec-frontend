export interface RequestData {
    email: string;
    phone: string;
    fullname: string;
    image: ImageType;}

export type ImageType = {
    dataURL: string;
    file: File;
  };
