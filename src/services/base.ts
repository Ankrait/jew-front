import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? '';

export interface ConversationMessage {
	role: 'user' | 'assistant';
	content: string;
	agent?: string;
}

interface ChatRequest {
	message: string;
	conversation_history?: ConversationMessage[];
}

export interface ChatResponse {
	status: 'success' | 'error';
	task_type?: string;
	response?: string;
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

	constructor(baseURL: string = API_URL ?? '') {
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
		request: ChatRequest
	): Promise<ChatResponse> {
		try {
			const response = await this.client.post<ChatResponse>(
				`/orchestrator/${userId}`,
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
	): Promise<ChatResponse> {
		return this.send(userId, {
			message,
			conversation_history: conversationHistory,
		});
	}


	private handleError(error: unknown): Error {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ChatResponse>;

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
