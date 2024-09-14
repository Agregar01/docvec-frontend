'use client';
import Dropdown from '@/components/dropdown';
import IconChatDots from '@/components/icon/icon-chat-dots';
import IconChrome from '@/components/icon/icon-chrome';
import IconGlobe from '@/components/icon/icon-globe';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconLink from '@/components/icon/icon-link';
import IconSafari from '@/components/icon/icon-safari';
import IconUsersGroup from '@/components/icon/icon-users-group';
import { IRootState } from '@/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const ComponentsDashboardAnalytics = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    
    // uniqueVisitorSeriesOptions
    const uniqueVisitorSeries: any = {
        series: [
            {
                name: 'Failed',
                data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
            },
            {
                name: 'Success',
                data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
            },
        ],
        options: {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            colors: ['#5c1ac3', '#ffbb44'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
            },
        },
    };
    // followersOptions
    const followers: any = {
        series: [
            {
                data: [38, 60, 38, 52, 36, 40, 28],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#4361ee'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // referralOptions
    const referral: any = {
        series: [
            {
                data: [60, 28, 52, 38, 40, 36, 38],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#e7515a'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    // engagementOptions
    const engagement: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 50, 36, 60, 38, 52, 38],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#1abc9c'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Analytics</span>
                </li>
            </ul>
            <div className="pt-5">
                

                <div className="mb-6">
                    <div className="panel h-full p-0 lg:col-span-2">
                        <div className="mb-5 flex items-start justify-between border-b border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
                            <h5 className="text-lg font-semibold ">Verification Status Comparison</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View</button>
                                        </li>
                                        <li>
                                            <button type="button">Update</button>
                                        </li>
                                        <li>
                                            <button type="button">Delete</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>

                        {isMounted && <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} width={'100%'} />}
                    </div>
                </div>

                <div className="mb-6 grid gap-6 sm:grid-cols-3 xl:grid-cols-5">
                    <div className="panel h-full sm:col-span-3 xl:col-span-2">
                        <div className="mb-5 flex items-start justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Visitors by Browser</h5>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <div className="flex items-center">
                                <div className="h-9 w-9">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
                                        <IconChrome className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="w-full flex-initial px-3">
                                    <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                        <h6>Chrome</h6>
                                        <p className="text-xs ltr:ml-auto rtl:mr-auto">65%</p>
                                    </div>
                                    <div>
                                        <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="relative h-full w-full rounded-full bg-gradient-to-r from-[#009ffd] to-[#2a2a72] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                                style={{ width: '65%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-9 w-9">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                                        <IconSafari className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="w-full flex-initial px-3">
                                    <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                        <h6>Safari</h6>
                                        <p className="text-xs ltr:ml-auto rtl:mr-auto">40%</p>
                                    </div>
                                    <div>
                                        <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="relative h-full w-full rounded-full bg-gradient-to-r from-[#a71d31] to-[#3f0d12] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                                style={{ width: '40%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-9 w-9">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/10 text-warning dark:bg-warning dark:text-white-light">
                                        <IconGlobe className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="w-full flex-initial px-3">
                                    <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                        <h6>Others</h6>
                                        <p className="text-xs ltr:ml-auto rtl:mr-auto">25%</p>
                                    </div>
                                    <div>
                                        <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="relative h-full w-full rounded-full bg-gradient-to-r from-[#fe5f75] to-[#fc9842] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                                style={{ width: '25%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
                                <IconUsersGroup className="h-5 w-5" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">31.6K</p>
                                <h5 className="text-xs text-[#506690]">Followers</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={followers.series} options={followers.options} type="area" height={160} width={'100%'} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                                <IconLink className="h-5 w-5" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">1,900</p>
                                <h5 className="text-xs text-[#506690]">Referral</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={referral.series} options={referral.options} type="area" height={160} width={'100%'} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>

                    <div className="panel h-full p-0">
                        <div className="flex p-5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success dark:bg-success dark:text-white-light">
                                <IconChatDots className="h-5 w-5" />
                            </div>
                            <div className="font-semibold ltr:ml-3 rtl:mr-3">
                                <p className="text-xl dark:text-white-light">18.2%</p>
                                <h5 className="text-xs text-[#506690]">Engagement</h5>
                            </div>
                        </div>
                        <div className="h-40">
                            {isMounted && <ReactApexChart series={engagement.series} options={engagement.options} type="area" height={160} width={'100%'} className="absolute bottom-0 w-full" />}
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default ComponentsDashboardAnalytics;
