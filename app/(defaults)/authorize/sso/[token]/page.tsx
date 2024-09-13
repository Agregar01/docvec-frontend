"use client"
import { useEffect, useState } from 'react';
import jwt from "jsonwebtoken"
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/router';

const VerifyToken = () => {
    const [loading, setLoading] = useState(true);
    const { token } = useParams<{ token: string }>();

    useEffect(() => {

        if (token) {
            try {
                const decoded = jwt.decode(token);
                console.log(decoded);
                setTimeout(() => {
                    if (decoded && (decoded as { name?: string }).name) {
                        localStorage.setItem("businessData", JSON.stringify(decoded))
                        window.location.href ='/';
                    } else {
                        window.location.href = 'https://app.agregartech.com/';
                    }
                }, 2000);
            } catch (error) {
                console.error('Invalid token:', error);
                window.location.href = 'https://app.agregartech.com/';
            }
        } else {
            window.location.href = 'https://app.agregartech.com/';
        }
    }, [window]);

    return (
        <div className="flex items-center justify-center h-screen">
            {loading && (
                <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
            )}
        </div>
    );
};

export default VerifyToken;
