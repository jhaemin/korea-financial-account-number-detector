/**
 * Implemented based on the following information:
 * https://www.cmsedi.or.kr/cms/board/workdata
 */

import { makeDetector } from './make-detector'

/**
 * 한국산업은행
 */
export const kdb = makeDetector({
  bank: 'kdb',
  basicRules: [
    // 구계좌
    {
      patterns: ['XXX-YY-ZZZZZC'],
      yCodes: ['13', '20', '19', '11', '22'],
    },
    // 신계좌
    // YYY-ZZZZZZZC-XXX
    // YYY-ZZZZZZZZ-XXX
    {
      patterns: ['YYY-ZZZZZZZC-XXX'],
      yCodes: ['013', '020', '019', '011', '022'],
    },
  ],
})

/**
 * 중소기업은행
 */
export const ibk = makeDetector({
  bank: 'ibk',
  basicRules: [
    // 평생계좌 (2012년 11월 12일자로 신규등록 중단된 것으로 추정)
    { patterns: ['BBBBBBBB-ZZ', 'AAA-BBBBBBBB'] },
    // 현재
    {
      patterns: ['XXX-YY-ZZZZZZC', 'XXX-BBBBBB-YY-ZZC'],
      yCodes: ['01', '02', '03', '13', '07', '06', '04'],
    },
  ],
})

/**
 * KB국민은행
 */
export const kb = makeDetector({
  bank: 'kb',
  basicRules: [
    // 구 한국주택은행(주택은행)
    // XXXX-YY-ZZZZZC (당좌)
    // XXXX-YY-ZZZZZZZC
    {
      patterns: ['XXXX-YY-ZZZZZC', 'XXXX-YY-ZZZZZZZC'],
      yCodes: [
        '01',
        '02',
        '25',
        '06',
        '18',
        '37',
        '90',
        '07', // 주택청약저축
      ],
    },
    // 구 국민은행
    // XXX-YY-ZZZZ-ZZC
    // 현행 국민은행
    // XXXXYY-ZZ-ZZZZZC
    {
      patterns: ['XXX-YY-ZZZZ-ZZC', 'XXXXYY-ZZ-ZZZZZC'],
      yCodes: [
        '01',
        '02',
        '24',
        '05',
        '04',
        '25',
        '26',
        '92', // 수납전용 가상계좌
        '07', // 주택청약저축
      ],
      additionalRules: [(accountNumber) => accountNumber.startsWith('0')],
    },
  ],
})

/**
 * 하나은행
 */
export const hana = makeDetector({
  bank: 'hana',
  basicRules: [
    // 구 외환은행
    // XXX-YY-ZZZZZ-C (11자리)
    {
      patterns: ['XXX-YY-ZZZZZ-C'],
      yCodes: [
        '13',
        '33',
        '18',
        '38',
        '19',
        '39',
        '26',
        '11',
        '22',
        '15', // 정기적금
        '23', // 부금
        '24', // 근로자우대저축
        '29', // 장기주택마련저축
        '70', // 연금신탁
        '73', // 적립식목적신탁
        '74', // 기업금전신탁
        '75', // 가계금전신탁
        '77', // 노후연금신탁
      ],
    },
    // 구 외환은행
    // YYY-ZZZZZZ-ZZC (12자리)
    {
      patterns: ['YYY-ZZZZZZ-ZZC'],
      yCodes: [
        '611',
        '610',
        '620',
        '600',
        '601',
        '630',
        '621',
        '631',
        '810', // 정기적금
        '811', // 자유적립식적금
        '817', // 부금
        '818', // 부금
        '814', // 근로자우대저축
        '815', // 장기주택마련저축
        '704', // 기업금전신탁
        '705', // 가계금전신탁
        '707', // 노후연금신탁
        '700', // 신탁기타
        '703', // 신탁기타
        { from: 710, to: 716 }, // 신탁기타
      ],
    },
    // 나머지 일반계좌
    // XXX-ZZZZZZ-ZZCYY
    {
      patterns: ['XXX-ZZZZZZ-ZZCYY'],
      yCodes: [
        '05',
        '07',
        '08',
        '02',
        '01',
        '04',
        '94',
        '37', // 가상계좌
        '32', // 외화통장
        '60', //ISA
      ],
    },
  ],
})

export const suhyup = makeDetector({
  bank: 'suhyup',
  basicRules: [
    // 구 수협
    // XXX-YY-ZZZZZ-C
    {
      patterns: ['XXX-YY-ZZZZZ-C'],
      yCodes: ['01', '02', '06', '08'],
    },
    // 현행 수협
    // YYYZ-ZZZZ-ZZZC
    {
      patterns: ['YYYZ-ZZZZ-ZZZC'],
      yCodes: [
        '101',
        '201',
        '102',
        '202',
        '209',
        '103',
        '208',
        '106',
        '108',
        '113',
        '114',
        '206',
      ],
      additionalRules: [
        // 맞춤계좌
        (accountNumber) =>
          accountNumber.startsWith('0') &&
          accountNumber.replace(/-/g, '').length === 12,
      ],
    },
    // 가상계좌
    // XXX-YY-ZZZZZZZZ-C
    {
      patterns: ['XXX-YY-ZZZZZZZZ-C'],
      yCodes: ['40'],
    },
  ],
})

/**
 * 농협
 */
export const nh = makeDetector({
  bank: 'nh',
  basicRules: [
    // XXX-YY-ZZZZZC
    {
      patterns: ['XXX-YY-ZZZZZC', 'XXXX-YY-ZZZZZC'],
      yCodes: [
        '01',
        '02',
        '12',
        '06',
        '05',
        '17',
        // 적금
        '04',
        '10',
        '14',
        '21',
        '24',
        '34',
        '45',
        '47',
        '49',
        '59',
        '80',
        // 신탁
        '28',
        '31',
        '43',
        '46',
        '79',
        '81',
        '86',
        '87',
        '88',
      ],
    },
    // 계좌번호가 13자리인 경우 과목코드 앞에 3을 붙여 3자리로 만든다.
    {
      patterns: ['YYY-ZZZZ-ZZZZ-CT'],
      yCodes: [
        '301',
        '302',
        '312',
        '306',
        '305',
        '317',
        '304',
        '310',
        '314',
        '321',
        '324',
        '334',
        '345',
        '347',
        '349',
        '359',
        '380',
        '028',
        '031',
        '043',
        '046',
        '079',
        '081',
        '086',
        '087',
        '088',
      ],
    },
    // 가상계좌
    {
      patterns: ['XXXXXX-YY-ZZZZZC', 'YYY-ZZZZ-ZZZZ-ZZC'],
      yCodes: ['64', '65', '790', '791'],
    },
  ],
})

/**
 * 농업협동조합
 */
export const nh2 = makeDetector({
  bank: 'nh2',
  basicRules: [
    // 구계좌 XXXXXX-YY-ZZZZZC
    // 신계좌 YYY-ZZZZ-ZZZZ-CT (앞에 3을 붙임)
    {
      patterns: ['XXXXXX-YY-ZZZZZC', 'YYY-ZZZZ-ZZZZ-CT'],
      yCodes: [
        '51',
        '52',
        '56',
        '55',
        '351',
        '352',
        '356',
        '355',
        // 적금
        '354',
        '360',
        '384',
        '394',
        '398',
        // 신탁
        '028',
      ],
    },
    // 가상계좌
    {
      patterns: ['XXXXXX-YY-ZZZZZC', 'YYY-ZZZZ-ZZZZ-ZZC'],
      yCodes: ['66', '67', '792'],
    },
  ],
})

export const woori = makeDetector({
  bank: 'woori',
  basicRules: [
    // 통합 우리은행
    // SYYY-CZZ-ZZZZZZ (13자리)
    {
      patterns: ['SYYY-CZZ-ZZZZZZ'],
      yCodes: ['006', '007', '002', '004', '003', '005'],
      additionalRules: [(accountNumber) => accountNumber.startsWith('1')],
    },
    // 연계계좌
    // XXX-BBBBBC-YY-ZZC (14자리)
    {
      patterns: ['XXX-BBBBBC-YY-ZZC'],
      yCodes: ['18', '92'],
    },
    // 구 한국상업은행
    // XXX-YY-ZZZZZC (11자리)
    {
      patterns: ['XXX-YY-ZZZZZC'],
      yCodes: ['006', '007', '002', '004', '003', '005'],
    },
    // 구 한일은행
    // XXX-BBBBBB-YY-ZZC (14자리)
    {
      patterns: ['XXX-BBBBBB-YY-ZZC'],
      yCodes: ['01', '15', '02', '12', '04', '03', '13'],
    },
    // 구 평화은행
    // XXX-YY-ZZZZZZC (12자리)
    {
      patterns: ['XXX-YY-ZZZZZZC'],
      yCodes: ['01', '21', '24', '05', '04', '25', '09'],
    },
  ],
})

export const sc = makeDetector({
  bank: 'sc',
  basicRules: [
    // XXX-YY-ZZZZZC
    {
      patterns: ['XXX-YY-ZZZZZC'],
      yCodes: ['10', '20', '30', '85'],
    },
    // 가상계좌
    // XXX-YY-ZZZZZZZZC
    {
      patterns: ['XXX-YY-ZZZZZZZZC'],
      yCodes: ['15', '16'],
    },
  ],
})

export const shinhan = makeDetector({
  bank: 'shinhan',
  basicRules: [
    // 신계좌
    // YYY-ZZZ-ZZZZZC
    {
      patterns: ['YYY-ZZZ-ZZZZZC'],
      yCodes: [
        {
          from: 100,
          to: 109,
        },
        '160',
        '161',
        {
          from: 110,
          to: 139,
        },
        {
          from: 155,
          to: 159,
        },
        {
          from: 150,
          to: 154,
        },
        {
          from: 140,
          to: 149,
        },
        // 외화예금
        '180',
        // 청년희망펀드 공익신탁
        '298',
        '268',
        '269',
      ],
    },
    // 신계좌(가상)
    // YYY-TTT-ZZZZZZZC
    {
      patterns: ['YYY-TTT-ZZZZZZZC'],
      yCodes: ['560', '561', '562'],
    },
    // 구 조흥은행
    // XXX-YY-ZZZZZC
    // 구 조흥은행(가상)
    // XXX-YY-ZZZZZZZC
    {
      patterns: ['XXX-YY-ZZZZZC', 'XXX-YY-ZZZZZZZC'],
      yCodes: [
        '01',
        '09',
        '61',
        '04',
        '05',
        '06',
        '08',
        '02',
        '07',
        '03',
        // 가상
        '81',
        '82',
      ],
    },
    // 구 신한은행(가상포함)
    // XXX-YY-ZZZZZC
    {
      patterns: ['XXX-YY-ZZZZZC'],
      yCodes: [
        '01',
        '02',
        '11',
        '13',
        '12',
        '03',
        '04',
        '05',
        // 가상
        '99',
      ],
    },
    // 구 신한은행(가상)
    // XXX-YYY-ZZZZZZZC
    {
      patterns: ['XXX-YYY-ZZZZZZZC'],
      yCodes: ['901'],
    },
  ],
})

export const citi = makeDetector({
  bank: 'citi',
  basicRules: [
    // 통합 씨티은행(개인) XXX-ZZZZZ-YYC-ZZ
    // 구 한미은행 XXX-ZZZZZ-YYC
    {
      patterns: ['XXX-ZZZZZ-YYC-ZZ'],
      yCodes: [
        '01',
        '11',
        '21',
        '25',
        '31',
        '42',
        '51',
        '71',
        '81',
        '23',
        '05',
        '06',
        '15',
        '26',
        '29',
        '07',
        '27',
        '55',
        '99',
        '03',
        '13',
        '33',
        '41',
        '43',
        '53',
        '63',
        '24',
      ],
    },
    // 구 씨티은행 XX-YY-ZZZZZC, Y-ZZZZZZ-ZZC
    {
      patterns: ['XX-YY-ZZZZZC', 'Y-ZZZZZZ-ZZC'],
      yCodes: [
        '20',
        '21',
        '32',
        '34',
        { from: 36, to: 38 },
        '42',
        '46',
        '70',
        '71',
        { from: 72, to: 78 },
        '80',
        '81',
        { from: 83, to: 88 },
        { from: 91, to: 96 },
        '99',
        '30',
        '33',
        '35',
        '41',
        { from: 43, to: 45 },
        { from: 50, to: 58 },
        '63',
        '64',
        { from: 60, to: 69 },
        '40',
        '48',
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        { from: 10, to: 19 },
        '59',
      ],
    },
    // 통합 씨티은행(기업) T-BBBBBB-CYY-ZZ
    {
      patterns: ['T-BBBBBB-CYY-ZZ'],
      yCodes: ['25', '41', '24', '18'],
    },
  ],
})

export const daegu = makeDetector({
  bank: 'daegu',
  basicRules: [
    {
      patterns: [
        'YY-ZZZZZZZZZZZ',
        'XXX-YY-ZZZZZZC',
        'YYY-ZZ-ZZZZZZC',
        'XXX-YY-ZZZZZZ-ZZZ',
      ],
      yCodes: [
        '05',
        { from: 91, to: 94 },
        '96',
        '08',
        '02',
        '01',
        '04',
        '505',
        '508',
        '502',
        '501',
        '504',
        '06',
        '13',
        '14',
        '19',
        '519',
        '20',
        '520',
        '21',
        '521',
        '524',
        '25',
        '525',
        '27',
        '527',
        '28',
        '528',
        '937',
      ],
    },
  ],
})

export const busan = makeDetector({
  bank: 'busan',
  basicRules: [
    {
      patterns: ['XXX-YYY-ZZZZZC', 'ZYYY-ZZZ-ZZZZZZC'],
      yCodes: [
        '107',
        '108',
        '109',
        '121',
        '123',
        '124',
        '122',
        '103',
        '101',
        '127',
        '716',
      ],
    },
  ],
})

export const kfcc = makeDetector({
  bank: 'kfcc',
  basicRules: [
    // 구 13자리
    // XXXX-YY-ZZZZZZ-C
    {
      patterns: ['XXXX-YY-ZZZZZZ-C'],
      yCodes: ['09', '10', '13', '37'],
    },
    // 구 14자리
    // XXXX-YYY-ZZZZZZ-C
    {
      patterns: ['XXXX-YYY-ZZZZZZ-C'],
      yCodes: [
        { from: 801, to: 810 },
        { from: 851, to: 860 },
      ],
    },
    // 현행
    // 9YYY-ZZZZ-ZZZZ-C
    {
      patterns: ['9YYY-ZZZZ-ZZZZ-C'],
      yCodes: [
        '002',
        '003',
        '004',
        '072',
        '090',
        '091',
        '092',
        '093',
        '200',
        '202',
        '205',
        { from: 207, to: 210 },
        '212',
        '005',
      ],
      additionalRules: [(accountNumber) => accountNumber.startsWith('9')],
    },
  ],
})

export const kbank = makeDetector({
  bank: 'kbank',
  basicRules: [
    // 일반
    {
      patterns: ['YYY-YNN-NNZZZZ'],
      yCodes: ['1002', '1005'],
    },
  ],
})

export const kakao = makeDetector({
  bank: 'kakao',
  basicRules: [
    // 업무구분(T) + 과목코드(Y)
    {
      patterns: ['TYYY-ZZ-ZZZZZZZ'],
      yCodes: ['333', '388', '355', '310'],
      additionalRules: [(accountNumber) => accountNumber.startsWith('3')],
    },
    {
      patterns: ['TYYY-ZZ-ZZZZZZZ'],
      yCodes: ['777', '979'],
      additionalRules: [(accountNumber) => accountNumber.startsWith('7')],
    },
    {
      patterns: ['TYYY-ZZ-ZZZZZZZ'],
      yCodes: ['101'],
      additionalRules: [(accountNumber) => accountNumber.startsWith('9')],
    },
  ],
})

export const toss = makeDetector({
  bank: 'toss',
  basicRules: [
    {
      patterns: ['YYYZ-ZZZZ-ZZZC'],
      yCodes: ['100', '106', '300', '150', '700'],
      additionalRules: [
        (accountNumber) => accountNumber[3] === '8' || accountNumber[3] === '0',
      ],
    },
    // 가상계좌
    // (17/19)ZZ-ZZZZ-ZZZZ
    {
      patterns: ['17ZZ-ZZZZ-ZZZZ', '19ZZ-ZZZZ-ZZZZ'],
      additionalRules: [
        (accountNumber) =>
          accountNumber.startsWith('17') || accountNumber.startsWith('19'),
      ],
    },
  ],
})
