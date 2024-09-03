"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function VerifyPhoto() {
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    
    useEffect(() => {
        const fetchLogin = async () => {
            try {
                const token = useParams<{ token: string}>()
                const decodedToken = jwtDecode(token.token);
                console.log(decodedToken);
                

                if (!token) {
                    console.error('Token not found. Redirecting to login...');
                    router.push('/http://165.22.70.167:8000/'); 
                    return;
                }

            } catch (error) {
                console.error('Error fetching login', error);
                router.push('login');
            } finally {
                setLoading(false);
            }
        };

        fetchLogin();
    }, [router]);

    return (
        <div className="div">
            div
        </div>
    )

}
