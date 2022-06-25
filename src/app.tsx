import { request } from '@/utils';
import { history, IRoute } from 'umi';

let extraRoutes: IRoute[];

export function patchRoutes({ routes }: { routes: IRoute[] }) {
  routes.forEach((route) => {
    route.routes = [...(route.routes as IRoute[]), ...extraRoutes];
  });
}

export async function render(oldRender: () => void) {
  const data = await request('/api/routes', {
    method: 'get',
    params: { mainPage: 1 },
  });

  const res: { path: string }[] = JSON.parse(data[0]?.routes);

  extraRoutes = res.map((ret) => ({
    path: ret.path,
    component: require('@/pages/index').default,
  }));

  history.push(res[0].path);

  oldRender();
}
