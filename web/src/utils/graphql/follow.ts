export default (idsToFollow: string[]) => `mutation CreateFollowTypedData {
  createFollowTypedData(request:{
    follow: [
      ${idsToFollow.reduce((acc, profileId, index) => {
          const trailingComma = index < idsToFollow.length - 1 ? ',' : '';
          return `${acc}\n{ profileId: ${profileId}}${trailingComma}`;
      }, '')}
    ]
  }) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        FollowWithSig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        profileIds
        datas
      }
    }
  }
}`;
