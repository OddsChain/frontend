import { gql } from "@apollo/client";

export const GET_OPEN_BETS = gql`
  query GetOpenBets($currentTimestamp: BigInt) {
    bets(
      where: {
        and: [
          { accepted: true }
          { outCome: "0" }
          { validationCount: "0" }
          { endTime_gt: $currentTimestamp }
        ]
      }
      orderBy: endTime
      orderDirection: desc
    ) {
      betID
      betDescription
      betType
      yesParticipants
      noParticipants
      validators
      endTime
      participants
      yesPool
      noPool
      creator
      outCome
    }
  }
`;

export const GET_AWAITING_VALIDATION_BETS = gql`
  query GetAwaitingValidatingBets($currentTimestamp: BigInt) {
    bets(
      where: {
        and: [
          { accepted: true }
          { outCome: "0" }
          { endTime_lt: $currentTimestamp }
        ]
      }
      orderBy: endTime
      orderDirection: desc
    ) {
      betID
      betDescription
      betType
      yesParticipants
      noParticipants
      validators
      endTime
      participants
      yesPool
      noPool
      creator
      outCome
      validationCount
    }
  }
`;

export const GET_COMPLETED_BETS = gql`
  query GetCompletedBets {
    bets(
      where: { and: [{ accepted: true }, { outCome_not: 0 }] }
      orderBy: endTime
      orderDirection: desc
    ) {
      betID
      betDescription
      betType
      yesParticipants
      noParticipants
      validators
      endTime
      participants
      yesPool
      noPool
      creator
      outCome
      claimWaitTime
    }
  }
`;

// FAKE VALIDATORS
// 1. 0x52047DE4458AfaaFF7C6B954C63033A21EfCD2E6
// 2. 0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8
// 3. 0xC0089cB5F8f286EAF6574666397834722e044d9b
