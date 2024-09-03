'use client';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const FileUpload = () => {
    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList as never[]);
    };
    return (
            <div className="mb-5">
                <div className="custom-file-container" data-upload-id="myFirstImage">
                    <div className="label-container">
                        <label>Upload </label>
                        <button
                            type="button"
                            className="custom-file-container__image-clear"
                            title="Clear Image"
                            onClick={() => {
                                setImages([]);
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <label className="custom-file-container__custom-file"></label>
                    <input type="file" className="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                    <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                            <div className="upload__image-wrapper">
                                <button className="custom-file-container__custom-file__custom-file-control" onClick={onImageUpload}>
                                    Select image to verify...
                                </button>
                                &nbsp;
                                {imageList.map((image, index) => (
                                    <div key={index} className="custom-file-container__image-preview relative">
                                        <img src={image.dataURL} alt="img" className="m-auto" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                    {images.length === 0 ? <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="" /> : ''}
                </div>
            </div>
    );
};

export default FileUpload;
