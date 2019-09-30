module.exports = {
	siteConfig: {
		title: 'Klieh'
	},
	theme: '../src',
	permalinks: {
		page: '/:slug/'
	},
	plugins: [
		{
			resolve: 'saber-plugin-search',
			options: {
				index: ['type', 'title', 'slug', 'content', 'permalink', 'layout']
			}
		}
	]
};
