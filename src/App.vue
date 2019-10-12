<template>
	<div class="app">
		<vue-command
			prompt="shell@klieh ~ $"
			:commands="commands"
			:built-in="builtIn"
			:hide-bar="true"
		/>
		<div ref="slot" style="display: none;"><slot /></div>
	</div>
</template>

<script>
import VueCommand from 'vue-command';
import commands from './commands';

async function commandRoutes() {
	const routes = (await this.$fetchSearchDatabase()).filter(
		p => p.layout === 'command'
	);
	console.log('routes', routes);
	const cmds = {};

	for (const { slug, permalink, content } of routes) {
		const command = slug === 'index' ? 'home' : slug;
		cmds[command] = async () => {
			if (this.$route.path === this.$router.resolve(permalink).resolved.path)
				return content;

			await this.$router.push(permalink);
			await this.$nextTick();

			return content;
		};
	}

	cmds.help = () => `Try out one of the following commands:<br>
     ${[...Object.keys(commands), ...Object.keys(cmds)]
				.sort()
				.map(c => `- ${c}`)
				.join('<br>')}`;

	return cmds;
}

export default {
	props: ['page'],
	components: { VueCommand },
	data() {
		return {
			commands,
			builtIn: {
				// Next tick is not available inside data
				clear: ({ _ }, data) => undefined
			}
		};
	},
	head() {
		const pageTitle = this.page && this.page.title;
		const siteTitle = this.$siteConfig.title;
		return {
			title: pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle
		};
	},
	created() {
		this.builtIn.clear = async ({ _ }, data) => {
			data.history = [];
			data.last = '';

			// Wait for input to be flushed
			await this.$nextTick();

			data.history.push('');
		};
	},
	async mounted() {
		await this.$nextTick();
		const commands = await commandRoutes.apply(this);
		this.commands = {
			...this.commands,
			...commands
		};
		this.$children[0].history.push(this.$refs.slot.innerHTML);
	}
};
</script>