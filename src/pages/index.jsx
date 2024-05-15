import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Spline from '@splinetool/react-spline'
import Layout from '@/app/Layout'
import Spinner from '@/components/Spinner' // Adjust the import path as needed

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true);

  // Map target names to their corresponding routes
  const routes = {
    HOME: '/',
    ABOUT: '/about',
    PROJECTS: '/projects',
    CONTACT: '/contact',
    LINKEDIN: 'https://www.linkedin.com/in/ryan-spreier/'
  };

  function onMouseDown(e) {
    const route = routes[e.target.name];
    if (route) {
      router.push(route);
    }
  }

  function handleLoad() {
    setLoading(false);
  }

  return (
    <Layout>
      {loading && <Spinner />}
      <Spline
        scene="https://prod.spline.design/obSTGJBx51XELos0/scene.splinecode"
        onMouseDown={onMouseDown}
        onLoad={handleLoad}
      />
    </Layout>
  );
}