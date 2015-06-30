import AjaxTransport from './AjaxTransport';

/**
 * Provides a factory for data transport.
 */
class TransportFactory {

	constructor() {
		this.transports = {};
		this.transports[TransportFactory.DEFAULT_TRANSPORT_NAME] = AjaxTransport;
	}

	/**
	 * Returns {@code TransportFactory} instance.
	 */
	static instance() {
		if (!TransportFactory.instance_) {
			TransportFactory.instance_ = new TransportFactory();
		}
		return TransportFactory.instance_;
	}

	get(implementationName) {
		var transportClass = this.transports[implementationName];

		if (transportClass === null) {
			throw new Error('Invalid transport name: ' + implementationName);
		}

		try {
			return new (transportClass)();
		} catch (err) {
			throw new Error('Can\'t create transport', err);
		}
	}

	/**
	 * Returns default transport.
	 */
	getDefault() {
		return this.get(TransportFactory.DEFAULT_TRANSPORT_NAME);
	}

}

TransportFactory.DEFAULT_TRANSPORT_NAME = 'default';

export default TransportFactory;
