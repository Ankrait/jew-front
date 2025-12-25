import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

export interface ConversationMessage {
	role: 'user' | 'assistant';
	content: string;
}

interface GirlfriendChatRequest {
	message: string;
	conversation_history?: ConversationMessage[];
	zodiac_sign?: string;
}

interface GirlfriendChatResponse {
	status: 'success' | 'error';
	agent: string;
	response?: string;
	zodiac_sign?: string;
	error?: string;
}

export interface AnalysisReportResponse {
	status: 'success' | 'error';
	agent: string;
	report?: Record<string, unknown>;
	popular_styles?: string[];
	budget_distribution?: Record<string, number>;
	demand_forecast?: Record<string, unknown>;
	insights?: string[];
	error?: string;
}

const createAxiosInstance = (baseURL: string): AxiosInstance => {
	return axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export class BaseService {
	private client: AxiosInstance;

	constructor(baseURL: string = process.env.API_URL ?? '') {
		this.client = createAxiosInstance(baseURL);

		this.client.interceptors.response.use(
			(response: AxiosResponse) => {
				console.log('✅ API Success:', response.config.url, response.data);
				return response;
			},
			(error: AxiosError) => {
				console.error('❌ API Error:', error.config?.url, error.message);
				return Promise.reject(error);
			}
		);
	}

	private async send(
		userId: string,
		request: GirlfriendChatRequest
	): Promise<GirlfriendChatResponse> {
		try {
			const response = await this.client.post<GirlfriendChatResponse>(
				`/girlfriend/${userId}`,
				request
			);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async sendMessage(
		userId: string,
		message: string,
		conversationHistory: ConversationMessage[] = [],
		zodiacSign?: string
	): Promise<GirlfriendChatResponse> {
		return this.send(userId, {
			message,
			conversation_history: conversationHistory,
			zodiac_sign: zodiacSign,
		});
	}

	async getAnalysisReport(): Promise<AnalysisReportResponse> {
		try {
			const response = await this.client.post<AnalysisReportResponse>(
				`/analysis/customer`
			);
			return response.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	private handleError(error: unknown): Error {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<GirlfriendChatResponse>;

			if (axiosError.response?.data?.error) {
				return new Error(axiosError.response.data.error);
			}

			if (axiosError.code === 'ECONNABORTED') {
				return new Error('Request timeout');
			}

			if (axiosError.code === 'ERR_NETWORK') {
				return new Error('Network error');
			}

			if (axiosError.response?.status) {
				return new Error(`HTTP ${axiosError.response.status}: ${axiosError.message}`);
			}
		}

		return error instanceof Error ? error : new Error('Unknown error');
	}
}

export const baseService = new BaseService();
