import { ProLayout, ProLayoutProps } from '@ant-design/pro-layout';
import React from 'react';
import styled from 'styled-components';
import { history, IRoute, useModel } from 'umi';

const LayoutContainer = styled.div`
  height: 100vh;
`;

const Layouts: React.FC<ProLayoutProps> = ({ children }) => {
  const { route } = useModel('use-routes');
  const routes: IRoute[] = route?.routes
    ? (JSON.parse(route.routes) as IRoute[])?.map((route) => ({
        name: route.name,
        path: route.path,
      }))
    : [];

  return (
    <LayoutContainer>
      <ProLayout
        route={{
          routes,
        }}
        menuItemRender={(item, defaultDom) => (
          <div onClick={() => history.push(item.path as string)}>
            {defaultDom}
          </div>
        )}
      >
        {children}
      </ProLayout>
    </LayoutContainer>
  );
};

export default Layouts;
