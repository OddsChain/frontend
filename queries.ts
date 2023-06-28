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
      validator
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
      validator
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
      reportOutcome
    }
  }
`;

export const GET_AWAITING_ACCEPTANCE_BETS = gql`
  query GetAwaitingAcceptance {
    bets(
      where: { and: [{ accepted: false }] }
      orderBy: endTime
      orderDirection: desc
    ) {
      betID
      betDescription
      betType
      yesParticipants
      noParticipants
      validators
      validator
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

export const GET_AWAITING_ACCEPT_BETS = gql`
  query GetAwaitingAcceptBets($address: Bytes) {
    bets(
      where: { and: [{ accepted: false }, { validator: $address }] }
      orderBy: endTime
      orderDirection: desc
    ) {
      betID
      betDescription
      betType
      yesParticipants
      noParticipants
      validators
      validator
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

export const BET_TO_REPORT = gql`
  query GetBetsToReport($betID: BigInt) {
    bets(where: { betID: $betID }, orderBy: endTime, orderDirection: desc) {
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
      validator
    }
  }
`;

export const GET_REPORTED_BETS = gql`
  query GetReportedBets {
    bets(
      where: { betType: true, currentlyChallenged: true }
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
      validator
      currentlyChallenged
      reportDescription
      reporter
      support
      oppose
    }
  }
`;

// FAKE VALIDATORS
// 1. 0x52047DE4458AfaaFF7C6B954C63033A21EfCD2E6
// 2. 0x79f85f6C4C926277Ef97370d6f89ab1D78F6A4f8
// 3. 0xC0089cB5F8f286EAF6574666397834722e044d9b
