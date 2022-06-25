import { Editor } from '@starboard-ventures/pangu.ui.editor';
import { useMemo } from 'react';
import { history, useModel } from 'umi';

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

const useRoute = (route: RouteProps | null) => {
  return useMemo(() => {
    if (!route) return null;

    const {
      location: { pathname },
    } = history;

    const routes: Route[] = JSON.parse(route.routes);

    return routes?.find((ret) => ret.path === pathname);
  }, [route]);
};

export default function IndexPage() {
  const { route } = useModel('use-routes');
  const retRoute = useRoute(route);

  return <Editor data={retRoute?.content} page={true} enabled={true} />;
}
