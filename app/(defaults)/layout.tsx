"use client"
import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import Sidebar from '@/components/layouts/sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    // const [login, setLogin] = useState<string | null>(null);
    // const [loading, setLoading] = useState(true);
    // const router = useRouter();

    // useEffect(() => {
    //     const fetchLogin = async () => {
    //         try {
    //             // Retrieve the token from localStorage (or sessionStorage, cookies, etc.)
    //             const token = localStorage.getItem('authToken'); // Assuming the token is stored as 'authToken'
    //             if (!token) {
    //                 console.error('Token not found in localStorage');
    //                 router.push('/login'); // Redirect to login page if token is missing
    //                 return;
    //             }

    //             const url = `${process.env.NEXT_PUBLIC_BASE_CORE_DASHBOARD_URL}/oauth/sso`;
    //             console.log(url);

    //             const response = await axios.get(url, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
    //                 },
    //             });

    //             if (response.status === 200) {
    //                 setLogin(response.data);
    //             } else {
    //                 console.error('Failed to authenticate', response);
    //                 router.push('/login'); // Redirect to login page if authentication fails
    //             }
    //         } catch (error) {
    //             console.error('Error fetching login', error);
    //             router.push('/login'); // Redirect to login page if there's an error
    //         } finally {
    //             setLoading(false); // Stop loading once authentication is done
    //         }
    //     };

    //     fetchLogin();
    // }, [router]);

    // // Render a loading spinner or nothing until the login state is determined
    // if (loading) {
    //     return <div>Loading...</div>; // Replace with a spinner or your custom loading component
    // }

    return (
        <>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative">
                <Overlay />
                {/* <ScrollToTop /> */}


                <MainContainer>
                    <Sidebar />
                    <div className="main-content flex min-h-screen flex-col">
                        <Header />
                        <ContentAnimation>{children}</ContentAnimation>
                        <Footer />
                        {/* END FOOTER */}
                        {/* <Portals /> */}
                    </div>
                </MainContainer>
            </div>
        </>
    );
}
