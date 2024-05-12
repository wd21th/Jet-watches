import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import './home.scss';

export function HomePage() {
  const routes = [
    {
      route: '',
      name: 'Times',
    },
    {
      route: 'stopwatch',
      name: 'Stopwatch',
    },
    {
      route: 'alarm',
      name: 'Alarm',
    },
    {
      route: 'timer',
      name: 'Timer',
    }
  ];
  const [navBarIsActive, setNavBarIsActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getOperatingSystem();
    
    window.addEventListener("resize", () => {
      getOperatingSystem();
    });
  }, []);
  
  function getOperatingSystem() {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      document.body.className = 'ios';
    } else if (/Android/.test(navigator.userAgent)) {
      document.body.className = 'android';
    } else if (/Win|Macintosh/.test(navigator.userAgent)) {
      document.body.className = 'desktop';
    }
  }
  
  return (
    <>
      <div className="in-col full-height" style={{ backgroundColor: darkMode ? '#121212' : '#fff', color: darkMode ? '#f5f5f5' : '#121212' }}>
        
        <header className="header in-row">
          <h1 className="project-name">
            Jet watches
          </h1>
          <div className="switch-container">
            <input type="checkbox" id="switch" />
            <label
              className={`switch ${darkMode ? 'selected' : ''}`}
              htmlFor="switch" id="label" onClick={() => setDarkMode(!darkMode)}>Toggle</label>
          </div>
          <nav className={`nav-bar ${navBarIsActive ? 'active' : ''}`}>
            <div className="in-row bottom-bar">
              {routes.map((route) => (
                <NavLink
                  key={route.route}
                  to={route.route}
                  className={({ isActive }) => {
                    return isActive ? 'active' : '';
                  }}
                  onClick={() => setNavBarIsActive(false)}
                >
                  {
                    route.route === '' ?
                        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor" />
                        </svg>
                      :
                    route.route === 'stopwatch' ?
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 1H9V3H15V1ZM11 14H13V8H11V14ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.07 4.74 14.12 4 12 4C7.03 4 3 8.03 3 13C3 17.97 7.02 22 12 22C16.98 22 21 17.97 21 13C21 10.88 20.26 8.93 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20Z" fill="currentColor" />
                      </svg>
                      :
                    route.route === 'alarm' ?
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4977 8.00006H10.9977V14.0001L15.7477 16.8501L16.4977 15.6201L12.4977 13.2501V8.00006ZM17.3347 1.81006L21.9417 5.65506L20.6617 7.19006L16.0517 3.34706L17.3347 1.81006ZM6.66069 1.81006L7.94269 3.34606L3.33469 7.19006L2.05469 5.65406L6.66069 1.81006ZM11.9977 4.00006C7.02769 4.00006 2.99769 8.03006 2.99769 13.0001C2.99769 17.9701 7.02769 22.0001 11.9977 22.0001C16.9677 22.0001 20.9977 17.9701 20.9977 13.0001C20.9977 8.03006 16.9677 4.00006 11.9977 4.00006ZM11.9977 20.0001C8.13769 20.0001 4.99769 16.8601 4.99769 13.0001C4.99769 9.14006 8.13769 6.00006 11.9977 6.00006C15.8577 6.00006 18.9977 9.14006 18.9977 13.0001C18.9977 16.8601 15.8577 20.0001 11.9977 20.0001Z" fill="currentColor" />
                      </svg>
                      :
                    route.route === 'timer' ?
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 3.5V7.5H13V5.58C16.39 6.07 19 8.97 19 12.5C19 16.37 15.87 19.5 12 19.5C8.13 19.5 5 16.37 5 12.5C5 10.82 5.59 9.28 6.58 8.08L12 13.5L13.41 12.09L6.61 5.29V5.31C4.42 6.95 3 9.55 3 12.5C3 17.47 7.02 21.5 12 21.5C16.97 21.5 21 17.47 21 12.5C21 7.53 16.97 3.5 12 3.5H11Z" fill="currentColor" />
                        </svg>
                      : null
                  }
                  {route.name}
                </NavLink>
              ))}
            </div>
          </nav>
          <div className={`burger-line-list ${navBarIsActive ? 'active' : ''}`} onClick={() => setNavBarIsActive(!navBarIsActive)}>
            <div className="burger-line-list-item"></div>
            <div className="burger-line-list-item"></div>
            <div className="burger-line-list-item"></div>
          </div>
          <div className={`backdrop ${navBarIsActive ? 'active' : ''}`} onClick={() => setNavBarIsActive(false)}></div>
        </header>
        <div className="press scroll-y in-col">
          <Outlet />
        </div>
        <footer className="in-row">
          <div className="social-links">
            <a className="social-link" href="https://www.linkedin.com/in/dias-bakashbay-b580a21a3/" target="_blank" rel="noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12Z" fill="#1275B1" />
                <path d="M9.46395 7.26911C9.46395 7.97003 8.85638 8.53823 8.10698 8.53823C7.35753 8.53823 6.75 7.97003 6.75 7.26911C6.75 6.5682 7.35753 6 8.10698 6C8.85638 6 9.46395 6.5682 9.46395 7.26911Z" fill="white" />
                <path d="M6.9375 9.47119H9.25709V16.5001H6.9375V9.47119Z" fill="white" />
                <path d="M12.9915 9.47108H10.6719V16.5H12.9915C12.9915 16.5 12.9915 14.2872 12.9915 12.9037C12.9915 12.0732 13.275 11.2391 14.4064 11.2391C15.685 11.2391 15.6774 12.3259 15.6714 13.1678C15.6636 14.2683 15.6822 15.3914 15.6822 16.5H18.0018V12.7903C17.9821 10.4216 17.3649 9.33008 15.3343 9.33008C14.1283 9.33008 13.3808 9.87758 12.9915 10.3729V9.47108Z" fill="white" />
              </svg>
            </a>
            <a className="social-link" href="https://github.com/wd21th" target="_blank" rel="noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.5 1C17.2991 1 22 5.81942 22 11.7656C22 16.521 18.9949 20.5551 14.8253 21.98C14.293 22.086 14.104 21.7498 14.104 21.4632C14.104 21.1083 14.1166 19.9491 14.1166 18.5085C14.1166 17.5047 13.7806 16.8496 13.4037 16.5157C15.742 16.249 18.199 15.3385 18.199 11.2037C18.199 10.0277 17.7916 9.068 17.1175 8.3141C17.2267 8.04215 17.5868 6.94714 17.0146 5.46455C17.0146 5.46455 16.1347 5.17608 14.1302 6.56838C13.2913 6.33003 12.3925 6.2101 11.5 6.2059C10.6075 6.2101 9.70975 6.33003 8.87185 6.56838C6.8653 5.17608 5.9833 5.46455 5.9833 5.46455C5.41315 6.94714 5.7733 8.04215 5.88145 8.3141C5.2105 9.068 4.79995 10.0277 4.79995 11.2037C4.79995 15.328 7.2517 16.2524 9.58375 16.5244C9.28345 16.7932 9.0115 17.2674 8.917 17.9635C8.3185 18.2386 6.7981 18.7147 5.8615 17.0694C5.8615 17.0694 5.30605 16.035 4.25185 15.9594C4.25185 15.9594 3.2281 15.9458 4.18045 16.6136C4.18045 16.6136 4.8682 16.9444 5.34595 18.1886C5.34595 18.1886 5.9623 20.1101 8.8834 19.4591C8.88865 20.3589 8.8981 21.207 8.8981 21.4632C8.8981 21.7477 8.7049 22.0808 8.18095 21.981C4.00825 20.5583 1 16.5221 1 11.7656C1 5.81942 5.7019 1 11.5 1Z" fill="black" />
              </svg>
            </a>
            <a className="social-link" href="https://www.instagram.com/dias.bki/" target="_blank" rel="noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 1.5H6C3.51472 1.5 1.5 3.51472 1.5 6V18C1.5 20.4853 3.51472 22.5 6 22.5H18C20.4853 22.5 22.5 20.4853 22.5 18V6C22.5 3.51472 20.4853 1.5 18 1.5Z" fill="url(#paint0_radial_3430_19)" />
                <path d="M18 1.5H6C3.51472 1.5 1.5 3.51472 1.5 6V18C1.5 20.4853 3.51472 22.5 6 22.5H18C20.4853 22.5 22.5 20.4853 22.5 18V6C22.5 3.51472 20.4853 1.5 18 1.5Z" fill="url(#paint1_radial_3430_19)" />
                <path d="M18 1.5H6C3.51472 1.5 1.5 3.51472 1.5 6V18C1.5 20.4853 3.51472 22.5 6 22.5H18C20.4853 22.5 22.5 20.4853 22.5 18V6C22.5 3.51472 20.4853 1.5 18 1.5Z" fill="url(#paint2_radial_3430_19)" />
                <path d="M17.25 7.875C17.25 8.4963 16.7463 9 16.125 9C15.5037 9 15 8.4963 15 7.875C15 7.25368 15.5037 6.75 16.125 6.75C16.7463 6.75 17.25 7.25368 17.25 7.875Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 15.75C14.071 15.75 15.75 14.071 15.75 12C15.75 9.92895 14.071 8.25 12 8.25C9.92895 8.25 8.25 9.92895 8.25 12C8.25 14.071 9.92895 15.75 12 15.75ZM12 14.25C13.2427 14.25 14.25 13.2427 14.25 12C14.25 10.7573 13.2427 9.75 12 9.75C10.7573 9.75 9.75 10.7573 9.75 12C9.75 13.2427 10.7573 14.25 12 14.25Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4.5 11.7C4.5 9.17978 4.5 7.91963 4.99047 6.95705C5.4219 6.11031 6.11031 5.4219 6.95705 4.99047C7.91963 4.5 9.17978 4.5 11.7 4.5H12.3C14.8202 4.5 16.0804 4.5 17.0429 4.99047C17.8897 5.4219 18.5781 6.11031 19.0095 6.95705C19.5 7.91963 19.5 9.17978 19.5 11.7V12.3C19.5 14.8202 19.5 16.0804 19.0095 17.0429C18.5781 17.8897 17.8897 18.5781 17.0429 19.0095C16.0804 19.5 14.8202 19.5 12.3 19.5H11.7C9.17978 19.5 7.91963 19.5 6.95705 19.0095C6.11031 18.5781 5.4219 17.8897 4.99047 17.0429C4.5 16.0804 4.5 14.8202 4.5 12.3V11.7ZM11.7 6H12.3C13.5849 6 14.4583 6.00117 15.1334 6.05632C15.7911 6.11005 16.1274 6.20744 16.362 6.32698C16.9264 6.6146 17.3854 7.07354 17.673 7.638C17.7925 7.8726 17.89 8.2089 17.9437 8.86657C17.9988 9.54172 18 10.4151 18 11.7V12.3C18 13.5849 17.9988 14.4583 17.9437 15.1334C17.89 15.7911 17.7925 16.1274 17.673 16.362C17.3854 16.9264 16.9264 17.3854 16.362 17.673C16.1274 17.7925 15.7911 17.89 15.1334 17.9437C14.4583 17.9988 13.5849 18 12.3 18H11.7C10.4151 18 9.54172 17.9988 8.86657 17.9437C8.2089 17.89 7.8726 17.7925 7.638 17.673C7.07354 17.3854 6.6146 16.9264 6.32698 16.362C6.20744 16.1274 6.11005 15.7911 6.05632 15.1334C6.00117 14.4583 6 13.5849 6 12.3V11.7C6 10.4151 6.00117 9.54172 6.05632 8.86657C6.11005 8.2089 6.20744 7.8726 6.32698 7.638C6.6146 7.07354 7.07354 6.6146 7.638 6.32698C7.8726 6.20744 8.2089 6.11005 8.86657 6.05632C9.54172 6.00117 10.4151 6 11.7 6Z" fill="white" />
                <defs>
                  <radialGradient id="paint0_radial_3430_19" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 17.25) rotate(-55.3758) scale(19.1397)">
                    <stop stopColor="#B13589" />
                    <stop offset="0.79309" stopColor="#C62F94" />
                    <stop offset="1" stopColor="#8A3AC8" />
                  </radialGradient>
                  <radialGradient id="paint1_radial_3430_19" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.25 23.25) rotate(-65.1363) scale(16.9457)">
                    <stop stopColor="#E0E8B7" />
                    <stop offset="0.444662" stopColor="#FB8A2E" />
                    <stop offset="0.71474" stopColor="#E2425C" />
                    <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="paint2_radial_3430_19" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.375 2.25) rotate(-8.1301) scale(29.1682 6.23877)">
                    <stop offset="0.156701" stopColor="#406ADC" />
                    <stop offset="0.467799" stopColor="#6A45BE" />
                    <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </a>
            <a className="social-link" href="https://t.me/dias_bakashbay" target="_blank" rel="noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z" fill="url(#paint0_linear_3431_8)" />
                <path d="M17.2399 7.6566C17.3334 7.05249 16.759 6.57566 16.2219 6.8115L5.52361 11.5086C5.13842 11.6777 5.1666 12.2612 5.5661 12.3884L7.77232 13.091C8.19345 13.2251 8.64937 13.1557 9.0171 12.9017L13.9912 9.46522C14.1412 9.36157 14.3047 9.57487 14.1766 9.70695L10.5961 13.3984C10.2487 13.7566 10.3177 14.3634 10.7355 14.6254L14.7442 17.1392C15.1939 17.4211 15.7723 17.1379 15.8563 16.5946L17.2399 7.6566Z" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear_3431_8" x1="12" y1="1.5" x2="12" y2="22.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#37BBFE" />
                    <stop offset="1" stopColor="#007DBB" />
                  </linearGradient>
                </defs>
              </svg>
            </a>
          </div>
          <span className="author">
            Developed by <span className="author-name">Dias Bakashbay</span>
          </span>
        </footer>
      </div>
    </>
  );
}
