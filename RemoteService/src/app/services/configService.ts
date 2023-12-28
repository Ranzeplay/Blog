import getConfig from "next/config";

export class ConfigService {
	private static instance: ConfigService = new ConfigService();
	public static getInstance(): ConfigService {
		return ConfigService.instance;
	}

	public static getBackendExchangeServerAddress(): string | undefined {
		return process.env.BACKEND_URL;
	}

	public static getAccessToken(): string | undefined {
		return process.env.BACKEND_ACCESS_TOKEN;
	}
}
