import type { Finance, ScoreResult, YCodeRange } from './types'

export function makeDetector({
  bank,
  basicRules: rules,
  globalCustomRules,
}: {
  bank: Finance
  /**
   * Basic rules that most banks have.
   */
  basicRules: {
    /**
     * Account number patterns.
     * ex) YYY-ZZZ-ZZZZZC
     */
    patterns: string[]
    /**
     * All available codes for the given lengths and code position.
     */
    yCodes?: (string | YCodeRange)[]
    /**
     * Additional rules that are specific to the given rule.
     */
    additionalRules?: ((accountNumber: string) => boolean)[]
  }[]
  /**
   * Global custom rules that are applied to all financial account numbers.
   */
  globalCustomRules?: ((accountNumber: string) => boolean)[]
}): (accountNumber: string) => ScoreResult {
  return (accountNumber: string): ScoreResult => {
    const sanitizedNumber = accountNumber.replace(/-/g, '')

    const scores = rules.map((rule) => {
      const { patterns, yCodes, additionalRules } = rule

      const patternScores = patterns.map((pattern) => {
        let patternScore = 0
        const sanitizedPattern = pattern.replace(/-/g, '').toUpperCase()
        const yCodeMatch = sanitizedPattern.match(/Y+/)

        if (yCodeMatch && yCodeMatch.index !== undefined) {
          const yCodeStart = yCodeMatch.index
          const yCodeLength = yCodeMatch[0].length

          const yCodePart = sanitizedNumber.slice(
            yCodeStart,
            yCodeStart + yCodeLength
          )

          // Check if the account number matches the pattern.
          if (
            yCodes?.includes(yCodePart) ||
            yCodes?.some((range) => {
              if (typeof range === 'string') {
                return false
              }

              return (
                range.from <= Number.parseInt(yCodePart) &&
                Number.parseInt(yCodePart) <= range.to
              )
            })
          ) {
            patternScore += 1
          }
        }

        if (sanitizedPattern.length === sanitizedNumber.length) {
          patternScore += 1
        }

        return patternScore
      })

      let maxPatternScore = Math.max(...patternScores)

      additionalRules?.forEach((additionalRule) => {
        if (additionalRule(accountNumber)) {
          maxPatternScore += 1
        }
      })

      return maxPatternScore
    })

    let maxRuleScore = Math.max(...scores)

    globalCustomRules?.forEach((customRule) => {
      if (customRule(accountNumber)) {
        maxRuleScore += 1
      }
    })

    return {
      finance: bank,
      score: maxRuleScore,
    }
  }
}
