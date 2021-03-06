import { reloadRoutes } from 'react-static/node'
import jdown from 'jdown'
import chokidar from 'chokidar'

chokidar.watch('content').on('all', () => reloadRoutes())

export default {
	siteRoot: 'https://poee.lol',
	generateSourceMaps: false,
  getSiteData: () => ({
    title: 'POEE.lol',
  }),
	webpack: (config, { defaultLoaders }) => {
		config.module.rules.push(
			{ test: /ddate\.js$/, loader: 'shebang-loader' },
		)
		return config
	},
  getRoutes: async () => {
    const { pages, nom, semel, discordia, home  } = await jdown('content')
    return [
      {
        path: '/',
        component: 'src/containers/Post',
        getData: () => ({
          page: semel,
        }),
      },
			{
				path: '/discordia',
				component: 'src/containers/Discordia',
				getData: (blah, route) => ({ page: discordia, route }),
			},
      {
        path: '/nom',
        component: 'src/containers/SOC',
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
				path: '/nom/times',
				component: 'src/containers/Holytimes',
			},
      {
        path: '/read',
        component: 'src/containers/SOC',
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
