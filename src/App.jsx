import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MedicalRecord from './pages/records/index'
import Home from './pages/Home';
import { Onboarding, Profile } from './pages';
import { useStateContext } from './context';
import { usePrivy } from '@privy-io/react-auth';
import SingleRecordDetails from './pages/records/single-record-details';
import ScreeningSchedule from './pages/ScreeningSchedule';

const App = () => {
  const { currentUser, loadingUser } = useStateContext();
  const { authenticated, ready } = usePrivy();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ready || loadingUser) return;

    const path = location.pathname;

    if (!authenticated) {
      if (path !== "/") {
        navigate("/");
      }
    } else {
      if (!currentUser) {
        if (path !== "/onboarding") {
          navigate("/onboarding");
        }
      } else {
        if (path === "/onboarding") {
          navigate("/");
        }
      }
    }
  }, [ready, loadingUser, authenticated, currentUser, location.pathname, navigate]);

  if (!ready || loadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1c1c24] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent"></div>
          <p className="font-epilogue text-lg font-medium text-gray-400">Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-row bg-[#1c1c24] p-4 ">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto pl-10 flex-1 max-sm:w-full sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medical-records" element={<MedicalRecord />} />
          <Route path="/medical-records/:id" element={<SingleRecordDetails />} />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;