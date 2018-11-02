import { reloadRoutes } from 'react-static/node'
import jdown from 'jdown'
import chokidar from 'chokidar'

chokidar.watch('content').on('all', () => reloadRoutes())

export default {
	siteRoot: '',
	generateSourceMaps: false,
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { pages, nom, semel, principia, home, about  } = await jdown('content')
    return [
      {
        path: '/',
        component: 'src/containers/Post',
        getData: () => ({
          page: semel,
        }),
      },
			{
				path: '/principia',
				component: 'src/containers/Principia',
				getData: (blah, route) => ({ page: principia, route }),
			},
      {
        path: '/nom',
        component: 'src/containers/Blog',
        getData: () => ({
					pages: nom,
        }),
        children: nom.map(page => ({
          path: `/${page.slug}`,
          component: 'src/containers/Post',
          getData: () => ({
            page,
          }),
        })),
      },
      {
        path: '/read',
        component: 'src/containers/Blog',
        getData: () => ({
					pages,
        }),
        children: pages.map(page => ({
          path: `/${page.slug}`,
          component: 'src/containers/Post',
          getData: () => ({
            page,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
