export type Finance =
  | 'kdb'
  | 'ibk'
  | 'kb'
  | 'hana'
  | 'suhyup'
  | 'nh'
  | 'nh2'
  | 'woori'
  | 'sc'
  | 'shinhan'
  | 'citi'
  | 'daegu'
  | 'busan'
  | 'kfcc'
  | 'kbank'
  | 'kakao'
  | 'toss'

export type ScoreResult = {
  finance: Finance
  score: number
}

export type YCodeRange = {
  from: number
  to: number
}
