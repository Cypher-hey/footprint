/** 候选审阅样例；不是批准的 footprint 协议。 */
export type Block =
  | { type: 'text' | 'example' | 'note'; title: string; text: string }
  | { type: 'flow'; title: string; steps: string[] }
  | { type: 'compare'; title: string; columns: [string, string]; rows: [string, string, string][] }
  | { type: 'code'; title: string; language: string; code: string };
export type Source = {
  key: string; title: string; url: string; scope: string; basis: string; verifiedAt: string;
};
export type DemoCard = {
  id: string; title: string; subtitle: string;
  kind: 'concept' | 'relation' | 'mechanism';
  group: 'agent' | 'context' | 'retrieval' | 'reliability';
  overview: string; blocks: Block[]; related: string[]; sources: Source[];
  endorsement: 'pending'; // 这批演示样本仅有待认同，不写用户认同。
  editorial: string; review: { question: string; answer: string };
};
