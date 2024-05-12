import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { AlarmPage } from './pages/alarm/alarm';
import { HomePage } from './pages/home/home';
import { NotFoundPage } from './pages/not-found/not-found';
import { StopWatchPage } from './pages/stopwatch/stopwatch';
import { TimerPage } from './pages/timer/timer';
import { WorldWideTimesPage } from './pages/world-wide-times/world-wide-times';

import './index.scss';

const router = createHashRouter([
    {
      path: '',
      element: <HomePage />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '',
          element: <WorldWideTimesPage />,
        },
        {
          path: '/stopwatch',
          element: <StopWatchPage />,
        },
        {
          path: '/alarm',
          element: <AlarmPage />,
        },
        {
          path: '/timer',
          element: <TimerPage />,
        }
      ],
    },
  ],
  {
    basename: '/',
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);