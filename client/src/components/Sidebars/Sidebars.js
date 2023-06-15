import './styles.css';
import React, { useState } from 'react';

import {
  RiHome4Line,
  RiFolder2Line,
  RiPlantLine,
  RiStackLine,
  RiStackFill,
} from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';
import { GrUserSettings, GrCode, GrUserWorker } from 'react-icons/gr';
import {
  BsFillPostcardFill,
  BsBriefcaseFill,
  BsBroadcast,
  BsBank2,
  BsFolderFill,
  BsFillArchiveFill,
} from 'react-icons/bs';
import {
  FaUsersCog,
  FaFileUpload,
  FaFolderPlus,
  FaHandHoldingMedical,
  FaUsers,
} from 'react-icons/fa';
import { MdAssignmentAdd } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { IoIosListBox, IoArchiveSharp } from 'react-icons/io';
import { TbReceiptTax } from 'react-icons/tb';
import { VscGraphLine, VscGraphLeft } from 'react-icons/vsc';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi/';
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  //useProSidebar
} from 'react-pro-sidebar';
function Sidebars() {
  //const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(true);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = value => {
    setToggled(value);
  };

  return (
    <div className='allMenu'>
      <Sidebar
        className={`app ${toggled ? 'toggled' : ''}`}
        // style={{ height: '100%', position: 'absolute' }}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      >
        <Menu>
          {collapsed ? (
            <MenuItem
              icon={<FiChevronsRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FiChevronsLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: '9px',
                  // textTransform: "uppercase",
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: '1px',
                }}
              >
                הנהלת חשבונות
              </div>
            </MenuItem>
          )}
          <hr />
        </Menu>

        <Menu>
          <MenuItem
            className='link'
            onClick={() => {
              window.location.href = 'http://localhost:3000/home';
            }}
            icon={<FaUsers />}
          >
            רשימת לקוחות
          </MenuItem>
          <MenuItem
            className='link'
            onClick={() => {
              window.location.href = 'http://localhost:3000/cusIndex';
            }}
            icon={<RiHome4Line />}
          >
            {localStorage.getItem('CusName')}
          </MenuItem>

          <SubMenu defaultClose label={'הגדרות'} icon={<AiFillSetting />}>
            <MenuItem icon={<GrUserSettings />}>הגדרות עוסק </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = 'http://localhost:3000/sortCodes';
              }}
              icon={<GrCode />}
            >
              קודי מיון
            </MenuItem>
            <MenuItem icon={<BsFillPostcardFill />}>חשבונות</MenuItem>
            <MenuItem icon={<FaUsersCog />}>הגדרת עובדים</MenuItem>
            <MenuItem icon={<BsBriefcaseFill />}>ניהול תיקי לקוחות</MenuItem>
            <MenuItem icon={<GrUserWorker />}>דוחות עובדים</MenuItem>
          </SubMenu>
          <SubMenu defaultClose label={'קליטה'} icon={<MdAssignmentAdd />}>
            <MenuItem icon={<FaFileUpload />}>העלאת מסמכים</MenuItem>
            <MenuItem icon={<RiStackFill />}>קליטת מסמכים</MenuItem>
            <MenuItem icon={<FaHandHoldingMedical />}>פקודות ידניות</MenuItem>
          </SubMenu>
          <SubMenu defaultClose label={'דוחות'} icon={<HiDocumentReport />}>
            <MenuItem icon={<VscGraphLine />}>רווח והפסד</MenuItem>
            <MenuItem icon={<VscGraphLeft />}>דוח מאזן</MenuItem>
            <MenuItem icon={<IoIosListBox />}>כרטסת</MenuItem>
          </SubMenu>
          <SubMenu defaultClose label={'דיווחים'} icon={<BsBroadcast />}>
            <MenuItem icon={<BsBank2 />}>מע"מ</MenuItem>
            <MenuItem icon={<TbReceiptTax />}>מס הכנסה</MenuItem>
          </SubMenu>
          <SubMenu defaultClose label={'תיקיות'} icon={<BsFolderFill />}>
            <MenuItem icon={<BsFillArchiveFill />}>ארכיון</MenuItem>
            <MenuItem icon={<FaFolderPlus />}>חומרים לדוח שנתי</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
export default Sidebars;
