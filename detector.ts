import {
  busan,
  citi,
  daegu,
  hana,
  ibk,
  kakao,
  kb,
  kbank,
  kdb,
  kfcc,
  nh,
  nh2,
  sc,
  shinhan,
  suhyup,
  toss,
  woori,
} from './detectors'
import type { Finance, ScoreResult } from './types'

export function detectFinancialAccountNumber(accountNumber: string): Finance[] {
  const detectors = [
    kdb,
    ibk,
    kb,
    hana,
    suhyup,
    nh,
    nh2,
    woori,
    sc,
    shinhan,
    citi,
    daegu,
    busan,
    kfcc,
    kbank,
    kakao,
    toss,
  ]
  const results: ScoreResult[] = detectors.map((detector) =>
    detector(accountNumber)
  )
  // TODO: Sort by popularity when the score is the same.
  const sorted = results.toSorted((a, b) => b.score - a.score)
  const banks = sorted.map((result) => result.finance)
  console.log(banks)
  return banks
}
