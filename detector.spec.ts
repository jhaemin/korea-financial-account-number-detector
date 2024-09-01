import { expect, test } from 'bun:test'
import { detectFinancialAccountNumber } from './detector'
import { makeDetector } from './make-detector'

const bank = makeDetector({
  bank: 'hana',
  basicRules: [
    {
      patterns: ['XXX-YY-ZZZZZC', 'YYY-ZZZZZZZC-XXX'],
      yCodes: ['13', '378'],
      additionalRules: [(accountNumber) => accountNumber.startsWith('6')],
    },
    {
      patterns: ['XXXX-YY-ZZZZZ-C', 'XXX-ZZZZZZZC-YYY'],
      yCodes: ['20', '999'],
    },
  ],
  globalCustomRules: [(accountNumber) => accountNumber.startsWith('3')],
})

test('Detector', () => {
  expect(bank('00013').score).toEqual(1)
  expect(bank('000-13-000000').score).toEqual(2)
  expect(bank('600-13-000000').score).toEqual(3)
  expect(bank('378-13-0000002').score).toEqual(2)
  expect(bank('378-12345678-999').score).toEqual(3)
  expect(bank('0000-13').score).toEqual(0)
  expect(bank('0000-20').score).toEqual(1)
  expect(bank('0000-20-0000-00').score).toEqual(2)
  expect(bank('0000-00-0000-00').score).toEqual(1)
  expect(bank('000-12345678-999').score).toEqual(2)
})

test('Bank account numbers', () => {
  detectFinancialAccountNumber('110-436-387740') // 신한
  detectFinancialAccountNumber('1000-0003-4499') // 토스
  detectFinancialAccountNumber('3333-13-0298081') // 카뱅
})
