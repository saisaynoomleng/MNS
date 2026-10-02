import type React from 'react';
import { Bounded, SectionTitle } from '../components';

import { IoClose, IoSettingsOutline } from 'react-icons/io5';
import { CiFilter, CiImageOn, CiLink } from 'react-icons/ci';
import {
  MdFeaturedPlayList,
  MdNearbyError,
  MdOutlineDesignServices,
  MdOutlineEmail,
  MdOutlineKeyboardArrowLeft,
  MdOutlineQuestionAnswer,
  MdOutlineVideoCameraFront,
  MdPhonelink,
} from 'react-icons/md';
import { RxDropdownMenu, RxHamburgerMenu } from 'react-icons/rx';
import { PiTextColumnsBold } from 'react-icons/pi';
import { FaFacebookSquare, FaYoutubeSquare } from 'react-icons/fa';
import {
  FaChartBar,
  FaCheck,
  FaCrown,
  FaGoogle,
  FaHeart,
  FaLinkedin,
  FaMoneyCheckDollar,
  FaPencil,
  FaUserGroup,
} from 'react-icons/fa6';
import {
  RiBuilding2Line,
  RiMoneyDollarBoxLine,
  RiSuitcaseLine,
} from 'react-icons/ri';
import { GiNewspaper, GiProgression } from 'react-icons/gi';
import { LuReceiptText } from 'react-icons/lu';
import { IoMdColorPalette } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { BiSolidDashboard } from 'react-icons/bi';
import { VscChatSparkleError } from 'react-icons/vsc';

const icons: React.ReactElement[] = [
  <IoSettingsOutline aria-hidden />,
  <CiImageOn aria-hidden />,
  <CiLink aria-hidden />,
  <MdOutlineQuestionAnswer aria-hidden />,
  <MdOutlineVideoCameraFront aria-hidden />,
  <RxDropdownMenu aria-hidden />,
  <PiTextColumnsBold aria-hidden />,
  <RxHamburgerMenu aria-hidden />,
  <IoClose aria-hidden />,
  <FaFacebookSquare aria-hidden />,
  <FaYoutubeSquare aria-hidden />,
  <FaLinkedin aria-hidden />,
  <FaGoogle aria-hidden />,
  <MdOutlineDesignServices aria-hidden />,
  <FaMoneyCheckDollar aria-hidden />,
  <RiSuitcaseLine aria-hidden />,
  <GiProgression aria-hidden />,
  <MdPhonelink aria-hidden />,
  <LuReceiptText aria-hidden />,
  <FaHeart aria-hidden />,
  <FaPencil aria-hidden />,
  <IoMdColorPalette aria-hidden />,
  <FaChartBar aria-hidden />,
  <FaCrown aria-hidden />,
  <GoDotFill aria-hidden />,
  <BiSolidDashboard aria-hidden />,
  <MdOutlineEmail aria-hidden />,
  <GiNewspaper aria-hidden />,
  <MdFeaturedPlayList aria-hidden />,
  <VscChatSparkleError aria-hidden />,
  <FaUserGroup aria-hidden />,
  <MdNearbyError aria-hidden />,
  <CiFilter aria-hidden />,
  <MdOutlineKeyboardArrowLeft aria-hidden />,
  <RiBuilding2Line aria-hidden />,
  <RiMoneyDollarBoxLine aria-hidden />,
  <FaCheck aria-hidden />,
];

export const Iconography = (): React.JSX.Element => {
  return (
    <Bounded padding="sm" spacing="sm">
      <SectionTitle hasUnderline>Iconography</SectionTitle>
      <p>
        Icons provide a simple and recognizable visual language for
        communicating actions, navigation, status, and supporting information.
        The system uses icons from React Icons to maintain a consistent visual
        style across the interface.
      </p>

      <p>
        Icons should be clear, purposeful, and appropriately scaled to their
        surrounding content. They complement typography and UI elements without
        competing with the primary message.
      </p>

      <div className="flex flex-wrap gap-2">
        {icons.map((icon, i) => {
          return (
            <span key={i} className="text-fs-600 p-1 border border-border/10">
              {icon}
            </span>
          );
        })}
      </div>
    </Bounded>
  );
};
