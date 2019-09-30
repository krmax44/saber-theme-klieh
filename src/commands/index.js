export default {
	echo({ _ }) {
		_.shift();
		return new Option(_.join(' ')).innerHTML;
	}
};
