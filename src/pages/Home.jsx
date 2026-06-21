import DisplayInfo from "../components/DisplayInfo";
import { usePrivy } from "@privy-io/react-auth";
import { FaHeartbeat, FaShieldAlt, FaFileMedical, FaTasks, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const { authenticated, login } = usePrivy();

  if (authenticated) {
    return <DisplayInfo />;
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 h-[300px] w-[300px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 px-4 py-1.5 text-sm font-semibold text-teal-400 backdrop-blur-sm">
          <FaHeartbeat className="animate-pulse" />
          <span>Intelligent Oncology Companion</span>
        </div>

        <h1 className="mb-6 bg-gradient-to-r from-white via-neutral-100 to-teal-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          AI-Powered Cancer <br />
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text">Care & Tracking</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
          Upload medical reports to automatically generate personalized treatment paths, track schedules via visual boards, and manage oncology metrics efficiently.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={login}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-4 font-bold text-white shadow-lg shadow-teal-500/20 hover:from-teal-600 hover:to-emerald-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Access Dashboard</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 mt-20 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="group rounded-2xl border border-neutral-800 bg-[#13131a]/80 p-6 backdrop-blur-md transition-all hover:border-teal-500/30 hover:bg-[#13131a] hover:shadow-xl hover:shadow-teal-500/5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
            <FaFileMedical size={22} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-neutral-100">AI Report Analysis</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Extract medical milestones and diagnosis insights directly from clinical documents using state-of-the-art models.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group rounded-2xl border border-neutral-800 bg-[#13131a]/80 p-6 backdrop-blur-md transition-all hover:border-teal-500/30 hover:bg-[#13131a] hover:shadow-xl hover:shadow-teal-500/5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <FaTasks size={22} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-neutral-100">Interactive Kanban</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Map out treatment steps, therapy check-ups, and recovery phases in a user-friendly drag-and-drop system.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group rounded-2xl border border-neutral-800 bg-[#13131a]/80 p-6 backdrop-blur-md transition-all hover:border-teal-500/30 hover:bg-[#13131a] hover:shadow-xl hover:shadow-teal-500/5 sm:col-span-2 lg:col-span-1">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
            <FaShieldAlt size={22} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-neutral-100">Privacy First</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Secure Web3/Web2 identity-backed authentication using Privy so only you can access your clinical documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;