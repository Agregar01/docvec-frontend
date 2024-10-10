'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import 'tippy.js/dist/tippy.css';
import 'flatpickr/dist/flatpickr.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import Flatpickr from 'react-flatpickr';
import 'tippy.js/dist/tippy.css';
import { IRootState } from '@/store';
import Dropdown from '@/components/dropdown';
import IconEye from '@/components/icon/icon-eye';
import { useSelector } from 'react-redux';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import axios from 'axios';
import Link from 'next/link';
import "../../../components/verification-loader.css";


const PAGE_SIZES = [20, 30, 50, 100];

interface Stats {
  total_verifications_count: number;
  total_verifications_count_week: number;
  matched_count: number;
  matched_week_count: number;
  mismatched_count: number;
  mismatched_week_count: number;
  pending_count: number;
  pending_week_count: number;

  total_change_per_month: number;
  matched_change_per_month: number;
  mismatched_change_per_month: number;
  pending_change_per_month: number;
}


const ComponentsDatatablesAdvanced = () => {
  const [Loader, setLoader] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [recordsData, setRecordsData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({columnAccessor: 'created_at',direction: 'desc',});
  const [search, setSearch] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [dateRange, setDateRange] = useState<Date[] | null>(null);
  const [filterTriggered, setFilterTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Start at page 1
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [tableLoading, setTableLoading] = useState<boolean>(false); // Local loader state for table
  const router = useRouter();


  function handleNext() {
    if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
    }
  }
  function handlePrevious() {
      if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
      }
  }
  useEffect(() => {
    
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const stats_url = `https://verifications.agregartech.com/api/v1/id-cards/clients/${7908909999}/verification-statistics/`;
    const fetchData = async () => {
      try {
        const response = await axios.get(stats_url);
        
        setStats(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const verifs_url = `https://verifications.agregartech.com/api/v1/id-cards/clients/${7908909999}/verifications?page=${currentPage}`;
    setLoader(true);
    const verificationData = async () => {
      try {
        const verifications = await axios.get(verifs_url);
        setRowData(verifications.data.results);
        setTotalPages(Math.ceil(verifications.data.count));
        if (verifications.data) {
          setLoader(false);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    verificationData();
  }, [currentPage]);

  useEffect(() => {
    const data = sortBy(rowData, sortStatus.columnAccessor);
    setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [rowData, sortStatus]);

  useEffect(() => {
    let filteredRecords = [...initialRecords];

    if (search) {
      filteredRecords = filteredRecords.filter((record: any) =>
        record.reference.toLowerCase().includes(search.toLowerCase()) ||
        record.email.toLowerCase().includes(search.toLowerCase()) ||
        record.phone.toLowerCase().includes(search.toLowerCase()) ||
        record.verification_status.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterTriggered && dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filteredRecords = filteredRecords.filter((record: any) => {
        const recordDate = new Date(record.created_at);
        return recordDate >= start && recordDate <= end;
      });
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData(filteredRecords.slice(from, to));
  }, [search, dateRange, filterTriggered, initialRecords, page, pageSize]);

  const formatDate = (date: string | number | Date) => {
    if (date) {
      const dt = new Date(date);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = months[dt.getMonth()];
      const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
      return day + '-' + month + '-' + dt.getFullYear();
    }
    return '';
  };

  const colors = { primary: "primary", secondary: "secondary", success: "success", danger: "danger", warning: "warning" };
  const handleRowClick = (reference: string) => {
    router.push(`/verifications/${reference}`);
  };
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';


  return (
    <>
      {
        Loader ? <div className=' grid place-items-center my-28'>
          <span className="loader"></span>
        </div> :

          <><div className="mb-5 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4 mt-6">
            <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
              <div className="flex justify-between">
                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Verifications</div>
                <div className="dropdown">
                  <Dropdown
                    offset={[0, 5]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="hover:opacity-80"
                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                  >
                    <ul className="text-black dark:text-white-dark">
                      <li>
                        <button type="button">View Report</button>
                      </li>
                    </ul>
                  </Dropdown>
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{stats?.total_verifications_count} </div>
                <div className="badge bg-white/30">{stats?.total_change_per_month}%</div>
              </div>
              <div className="mt-5 flex items-center font-semibold">
                <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                This Week: {stats?.total_verifications_count_week}
              </div>
            </div>

            {/* Sessions */}
            <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
              <div className="flex justify-between">
                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Verifications Match</div>
                <div className="dropdown">
                  <Dropdown
                    offset={[0, 5]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="hover:opacity-80"
                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                  >
                    <ul className="text-black dark:text-white-dark">
                      <li>
                        <button type="button">View Report</button>
                      </li>
                    </ul>
                  </Dropdown>
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {stats?.matched_count} </div>
                <div className="badge bg-white/30">{stats?.matched_change_per_month}% </div>
              </div>
              <div className="mt-5 flex items-center font-semibold">
                <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                This Week: {stats?.matched_week_count}
              </div>
            </div>

            {/*  Time On-Site */}
            <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
              <div className="flex justify-between">
                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Verifications Mismatch</div>
                <div className="dropdown">
                  <Dropdown
                    offset={[0, 5]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="hover:opacity-80"
                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                  >
                    <ul className="text-black dark:text-white-dark">
                      <li>
                        <button type="button">View Report</button>
                      </li>

                    </ul>
                  </Dropdown>
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {stats?.mismatched_count} </div>
                <div className="badge bg-white/30">{stats?.mismatched_change_per_month}% </div>
              </div>
              <div className="mt-5 flex items-center font-semibold">
                <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                This Week: {stats?.mismatched_week_count}
              </div>
            </div>

            {/* Bounce Rate */}
            <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
              <div className="flex justify-between">
                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Pending Verifications</div>
                <div className="dropdown">
                  <Dropdown
                    offset={[0, 5]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="hover:opacity-80"
                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                  >
                    <ul className="text-black dark:text-white-dark">
                      <li>
                        <button type="button">View Report</button>
                      </li>

                    </ul>
                  </Dropdown>
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {stats?.pending_count} </div>
                <div className="badge bg-white/30">{stats?.pending_change_per_month}% </div>
              </div>
              <div className="mt-5 flex items-center font-semibold">
                <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                This Week: {stats?.pending_week_count}
              </div>
            </div>
          </div><div className="panel mt-6">
              <div className="flex justify-end mb-5">
                <Link href="/verifications/initiate" className="text-blue-500 bg-blue-100 py-3 px-6 rounded-md">Start a verification</Link>
              </div>
              <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 className="text-lg font-semibold dark:text-white-light">Verifications</h5>

                <div className="ltr:ml-auto rtl:mr-auto flex gap-4 items-center">
                  <Flatpickr
                    placeholder="Select date range"
                    options={{
                      mode: 'range',
                      dateFormat: 'Y-m-d',
                      position: isRtl ? 'auto right' : 'auto left',
                    }}
                    value={dateRange || []} // Default to an empty array if dateRange is null
                    className="form-input"
                    onChange={(date) => {
                      setDateRange(date);
                      setFilterTriggered(true); // Ensure filter is triggered
                    }} />

                  <input
                    type="text"
                    className="form-input w-auto"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="datatables">
      {isMounted && (
        <>
          {tableLoading ? ( // Show loader only for the table
            <div className="loader">Loading...</div>
          ) : (
            <DataTable
              noRecordsText="No results match your search query"
              highlightOnHover
              className="table-hover whitespace-nowrap"
              records={recordsData}
              columns={[
                {
                  accessor: 'reference',
                  title: 'Verification ID',
                  sortable: true,
                  render: ({ reference }) => (
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{reference}</div>
                    </div>
                  ),
                },
                {
                  accessor: 'fullname',
                  title: 'Fullname',
                  sortable: true,
                  render: ({ fullname }) => (
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{fullname}</div>
                    </div>
                  ),
                },
                {
                  accessor: 'created_at',
                  title: 'Verification Date',
                  sortable: true,
                  render: ({ created_at }) => <div>{formatDate(created_at)}</div>,
                },
                {
                  accessor: 'email',
                  title: 'Email',
                  sortable: true,
                  render: ({ email }) => <div>{email}</div>,
                },
                { accessor: 'phone', title: 'Phone', sortable: true },
                {
                  accessor: 'verification_status',
                  title: 'Status',
                  sortable: true,
                  render: ({ verification_status }) => {
                    let colorClass;
                    switch (verification_status) {
                      case 'MATCH':
                        colorClass = colors.success;
                        break;
                      case 'PENDING':
                        colorClass = colors.warning;
                        break;
                      case 'MISMATCH':
                        colorClass = colors.danger;
                        break;
                      default:
                        colorClass = colors.secondary;
                        break;
                    }
                    return <span className={`badge btn-${colorClass}`}>{verification_status}</span>;
                  },
                },
              ]}
              onRowClick={({ reference }) => handleRowClick(reference)}
            />
          )}
        </>
      )}
    </div>
              <div className="div flex gap-2 flex-right mt-5">
                <button 
                    className="btn shadow-lg text-primary" 
                    onClick={handlePrevious} 
                    disabled={currentPage === 1} // Disable if on the first page
                >
                    Previous
                </button>
                <button 
                    className="btn btn-primary" 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages} // Disable if on the last page
                >
                    Next
                </button>
              </div>
            </div></>
      }
    </>
  );
};

export default ComponentsDatatablesAdvanced;

