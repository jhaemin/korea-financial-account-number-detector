# Korea Financial Account Number Detector

[금융결제원 CMS 계좌번호 체계](https://www.cmsedi.or.kr/cms/board/workdata)를 기반으로 대한민국 계좌번호의 기관을 판별하는 라이브러리입니다.

> 증권 계좌번호는 아직 구현되지 않았습니다.

## Usage

```ts
const result = detectFinancialAccountNumber('110-436-387740')
```

The result would be:

```json
[
  "shinhan",
  "ibk",
  "kb",
  "hana",
  "suhyup",
  "nh",
  "woori",
  "citi",
  "daegu",
  "busan",
  "kbank",
  "toss",
  "kdb",
  "nh2",
  "sc",
  "kfcc",
  "kakao"
]
```

## To Do

- [x] Implement bank account number detection
  - [x] kdb
  - [x] ibk
  - [x] kb
  - [x] hana
  - [x] suhyup
  - [x] nh
  - [x] nh2
  - [x] woori
  - [x] sc
  - [x] shinhan
  - [x] citi
  - [x] daegu
  - [x] busan
  - [x] kfcc
  - [x] kbank
  - [x] kakao
  - [x] toss
- [ ] Revalidate implementation
- [ ] Test each bank account number
- [ ] Implement stock account number detection
