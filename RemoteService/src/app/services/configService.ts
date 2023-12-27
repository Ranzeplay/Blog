import getConfig from "next/config";

export class ConfigService {
	private static instance: ConfigService = new ConfigService();
	public static getInstance(): ConfigService {
		return ConfigService.instance;
	}

	public constructor() {
		console.log("Initializing ConfigService");
	}

	public static getBackendExchangeServerAddress(): string {
		const { serverRuntimeConfig } = getConfig();

		// console.log('Backend url: ' + serverRuntimeConfig.backendExchangeServerAddress)

		return serverRuntimeConfig.backendExchangeServerAddress;
	}

	public static getAccessToken(): string {
		const { serverRuntimeConfig } = getConfig();
		return serverRuntimeConfig.accessToken;
	}
}
