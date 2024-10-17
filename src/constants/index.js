import { FaFileMedical, FaClipboardList, FaUserCircle, FaHome } from 'react-icons/fa';

export const navLinks = [
    {
        name: 'dashboard',
        Icon: FaHome, // Reference to the icon component
        link: '/'
    },
    {
        name: 'records',
        Icon: FaFileMedical, // Reference to the icon component
        link: '/medical-records'
    },
    {
        name: 'screening',
        Icon: FaClipboardList, // Reference to the icon component
        link: '/screening-schedules'
    },
    {
        name: 'profile',
        Icon: FaUserCircle, // Reference to the icon component
        link: '/profile'
    }
];
