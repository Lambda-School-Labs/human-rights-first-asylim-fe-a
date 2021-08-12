import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import './_SideDrawer.less';

const { SubMenu } = Menu;

function SideDrawer() {
  const role = window.localStorage.getItem('role_name');

  const history = useHistory();

  const handleRoute = ({ key }) => {
    if (key) {
      history.push(`${key}`);
    }
  };

  return (
    <div style={{ width: '200px', height: '100vh', position: 'fixed' }}>
      <Menu
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        theme="light"
        onClick={handleRoute}
        style={{
          backgroundColor: '#F4F6F7',
          height: '100vh',
          position: 'sticky',
        }}
      >
        <Menu.Item className="home" key="/">
          Home
        </Menu.Item>

        <Menu.Item className="cases" key="/cases">
          Cases
        </Menu.Item>

        <Menu.Item className="judges" key="/judges">
          Judges
        </Menu.Item>

        <SubMenu
          key="saved"
          className="saved-submenu"
          title="Saved"
          style={{ backgroundColor: '#F4F6F7', paddingRight: 30 }}
        >
          <Menu.Item key="/saved-cases">Saved Cases</Menu.Item>
          <Menu.Item key="/saved-judges">Saved Judges</Menu.Item>
        </SubMenu>

        <Menu.Item className="my-cases" key="/my-cases">
          My Cases
        </Menu.Item>

        {role === 'moderator' || role === 'admin' ? (
          <>
            <SubMenu
              key="admin-tools"
              title="Admin Tools"
              className="admin-tools-submenu"
              style={{ backgroundColor: '#F4F6F7', paddingRight: 30 }}
            >
              <Menu.Item key="/manage-users">Manage Users</Menu.Item>
              <Menu.Item key="/manage-faq">Manage FAQ</Menu.Item>
              <Menu.Item className="review-cases" key="/manage-cases">
                Review Cases
              </Menu.Item>
            </SubMenu>
          </>
        ) : null}
      </Menu>
    </div>
  );
}

export default SideDrawer;
