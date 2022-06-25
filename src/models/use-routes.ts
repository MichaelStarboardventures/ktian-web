import { useCallback, useEffect, useState } from 'react';
import { request } from '../utils';

type Route = {
  name: string;
  path: string;
  content: string;
};

type RouteProps = {
  id: number;
  name: string;
  routes: string;
};

export default function useRoutes() {
  const [route, setRoute] = useState<RouteProps | null>(null);

  const fetchData = useCallback(async () => {
    const data: RouteProps[] = await request('/api/routes', {
      method: 'get',
      params: { mainPage: 1 },
    });

    setRoute(data[0]);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { route };
}
