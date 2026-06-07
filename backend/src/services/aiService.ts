import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import axios from 'axios';
import SystemSetting from '../models/SystemSetting';
import User from '../models/User';
import Notification from '../models/Notification';

export interface IAiRequestOptions {
  mode?: string;
  systemInstruction?: string;
}

// Abstraction Interface
export interface IAiProvider {
  generateText(prompt: string, model: string, apiKey: string, options?: IAiRequestOptions): Promise<string>;
}

// 1. Google Gemini Provider
class GeminiProvider implements IAiProvider {
  async generateText(prompt: string, modelName: string, apiKey: string, options?: IAiRequestOptions): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName || 'gemini-1.5-flash',
      systemInstruction: options?.systemInstruction,
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}

// 2. OpenAI Provider
class OpenAIProvider implements IAiProvider {
  async generateText(prompt: string, modelName: string, apiKey: string, options?: IAiRequestOptions): Promise<string> {
    const openai = new OpenAI({ apiKey });
    const messages: any[] = [];
    if (options?.systemInstruction) {
      messages.push({ role: 'system', content: options.systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const completion = await openai.chat.completions.create({
      model: modelName || 'gpt-4o-mini',
      messages,
    });

    return completion.choices[0]?.message?.content || '';
  }
}

// 3. OpenRouter Provider (Using standard Axios REST call or OpenAI client structure)
class OpenRouterProvider implements IAiProvider {
  async generateText(prompt: string, modelName: string, apiKey: string, options?: IAiRequestOptions): Promise<string> {
    // OpenRouter can be queried using standard Fetch / Axios API
    const messages: any[] = [];
    if (options?.systemInstruction) {
      messages.push({ role: 'system', content: options.systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: modelName || 'google/gemini-2.5-flash:free',
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // Required by OpenRouter API
          'X-Title': 'SmartLearn AI LMS',
        },
      }
    );

    return response.data.choices[0]?.message?.content || '';
  }
}

// 4. Groq Provider (Using standard OpenAI SDK with custom baseURL)
class GroqProvider implements IAiProvider {
  async generateText(prompt: string, modelName: string, apiKey: string, options?: IAiRequestOptions): Promise<string> {
    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    
    const messages: any[] = [];
    if (options?.systemInstruction) {
      messages.push({ role: 'system', content: options.systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const completion = await openai.chat.completions.create({
      model: modelName || 'llama3-8b-8192',
      messages,
    });

    return completion.choices[0]?.message?.content || '';
  }
}

// 5. Together AI Provider (Using standard OpenAI SDK with custom baseURL)
class TogetherAIProvider implements IAiProvider {
  async generateText(prompt: string, modelName: string, apiKey: string, options?: IAiRequestOptions): Promise<string> {
    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://api.together.xyz/v1',
    });

    const messages: any[] = [];
    if (options?.systemInstruction) {
      messages.push({ role: 'system', content: options.systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const completion = await openai.chat.completions.create({
      model: modelName || 'meta-llama/Llama-3-8b-chat-hf',
      messages,
    });

    return completion.choices[0]?.message?.content || '';
  }
}

// Map of concrete provider strategies
const providers: Record<string, IAiProvider> = {
  gemini: new GeminiProvider(),
  openai: new OpenAIProvider(),
  openrouter: new OpenRouterProvider(),
  groq: new GroqProvider(),
  together: new TogetherAIProvider(),
};

// Default models for fallback chain
const defaultModels: Record<string, string> = {
  gemini: 'gemini-1.5-flash',
  openai: 'gpt-4o-mini',
  openrouter: 'google/gemini-2.5-flash:free',
  groq: 'llama3-8b-8192',
  together: 'meta-llama/Llama-3-8b-chat-hf',
};

// Main AI Service
export class AiService {
  /**
   * Retrieves or initializes system settings
   */
  static async getSettings() {
    let settings = await SystemSetting.findOne();
    if (!settings) {
      settings = new SystemSetting({
        siteName: 'SmartLearn AI',
        activeAiProvider: 'gemini',
        activeAiModel: 'gemini-1.5-flash',
      });
      await settings.save();
    }
    return settings;
  }

  /**
   * Resolves key for a provider, checking DB then environment variables
   */
  static getApiKey(settings: any, provider: string): string {
    switch (provider) {
      case 'gemini':
        return settings.geminiApiKey || process.env.GEMINI_API_KEY || '';
      case 'openai':
        return settings.openaiApiKey || process.env.OPENAI_API_KEY || '';
      case 'openrouter':
        return settings.openrouterApiKey || process.env.OPENROUTER_API_KEY || '';
      case 'groq':
        return settings.groqApiKey || process.env.GROQ_API_KEY || '';
      case 'together':
        return settings.togetherApiKey || process.env.TOGETHER_API_KEY || '';
      default:
        return '';
    }
  }

  /**
   * Generates text with automatic fallback failover chain
   */
  static async generateText(prompt: string, options?: IAiRequestOptions): Promise<string> {
    const settings = await this.getSettings();
    const primaryProvider = settings.activeAiProvider;
    const providerChain: ('gemini' | 'openai' | 'openrouter' | 'groq' | 'together')[] = [
      'gemini',
      'openai',
      'openrouter',
      'groq',
      'together',
    ];

    // Reorder chain so active is first
    const primaryIndex = providerChain.indexOf(primaryProvider);
    if (primaryIndex > -1) {
      providerChain.splice(primaryIndex, 1);
      providerChain.unshift(primaryProvider);
    }

    let lastError: Error | null = null;

    for (const provider of providerChain) {
      const apiKey = this.getApiKey(settings, provider);
      if (!apiKey) {
        // Skip provider if no key is configured
        continue;
      }

      const model = provider === primaryProvider ? settings.activeAiModel : defaultModels[provider];
      const strategy = providers[provider];

      try {
        // Log attempt
        console.log(`🤖 AI Request: Routing to provider "${provider}" using model "${model}"...`);
        
        // Execute request
        const text = await strategy.generateText(prompt, model, apiKey, options);

        // Update successful stats
        await SystemSetting.updateOne(
          { _id: settings._id },
          { $inc: { [`apiUsageStats.${provider}.requests`]: 1 } }
        );

        return text;
      } catch (err: any) {
        lastError = err;
        console.error(`⚠️ AI Request Failed on provider "${provider}":`, err.message);

        // Update error stats
        await SystemSetting.updateOne(
          { _id: settings._id },
          { $inc: { [`apiUsageStats.${provider}.errors`]: 1 } }
        );

        // Log error and notify admins
        await this.notifyAdmins(provider, err.message);
      }
    }

    // If we exhausted all options
    throw new Error(
      `AI Service Error: All configured providers failed. Last error on primary was: ${
        lastError?.message || 'No API keys configured.'
      }`
    );
  }

  /**
   * Helper to write system notifications directly to admin user accounts
   */
  private static async notifyAdmins(provider: string, errorMessage: string) {
    try {
      const admins = await User.find({ role: 'admin' });
      const text = `[AI Failover Alert] AI Provider "${provider}" failed. Error: "${errorMessage}". System dynamically routed request to fallback provider.`;
      
      await Promise.all(
        admins.map((admin) => {
          const notif = new Notification({
            userId: admin._id,
            text,
          });
          return notif.save();
        })
      );
    } catch (err) {
      console.error('Failed to dispatch alert notifications to admin accounts:', err);
    }
  }

  /**
   * Utility to test connectivity of a specific provider
   */
  static async testConnection(
    provider: 'gemini' | 'openai' | 'openrouter' | 'groq' | 'together',
    apiKey: string,
    modelName?: string
  ): Promise<boolean> {
    const testPrompt = 'Respond with "pong".';
    const model = modelName || defaultModels[provider];
    const strategy = providers[provider];

    if (!apiKey) return false;

    try {
      const res = await strategy.generateText(testPrompt, model, apiKey);
      return res.toLowerCase().includes('pong') || res.length > 0;
    } catch (err) {
      console.error(`Test connection for "${provider}" failed:`, err);
      return false;
    }
  }
}
