import browser from './browser-polyfill';

export interface GeneralSettings {
	vaults: string[];
	showMoreActionsButton: boolean;
	betaFeatures: boolean;
	openaiApiKey?: string;
	openaiModel?: string;
}

export let generalSettings: GeneralSettings = {
	vaults: [],
	showMoreActionsButton: false,
	betaFeatures: false,
	openaiApiKey: '',
	openaiModel: 'gpt-4o-mini'
};

export function setLocalStorage(key: string, value: any): Promise<void> {
	return browser.storage.local.set({ [key]: value });
}

export function getLocalStorage(key: string): Promise<any> {
	return browser.storage.local.get(key).then((result: {[key: string]: any}) => result[key]);
}

export async function loadGeneralSettings(): Promise<GeneralSettings> {
	const data = await browser.storage.sync.get(['general_settings', 'vaults', 'openaiApiKey', 'openaiModel']);

	generalSettings = {
		showMoreActionsButton: data.general_settings?.showMoreActionsButton ?? true,
		vaults: data.vaults || [],
		betaFeatures: data.general_settings?.betaFeatures ?? false,
		openaiApiKey: data.openaiApiKey || '',
		openaiModel: data.openaiModel || 'gpt-4o-mini'
	};
	
	return generalSettings;
}

export async function saveGeneralSettings(settings?: Partial<GeneralSettings>): Promise<void> {
	if (settings) {
		generalSettings = { ...generalSettings, ...settings };
	}
	await browser.storage.sync.set({
		vaults: generalSettings.vaults,
		showMoreActionsButton: generalSettings.showMoreActionsButton,
		betaFeatures: generalSettings.betaFeatures,
		openaiApiKey: generalSettings.openaiApiKey,
		openaiModel: generalSettings.openaiModel
	});
}