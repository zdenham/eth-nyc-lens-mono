const getIdsString = (idsToFollow: string[]) =>
    `${idsToFollow.reduce((acc, profileId, index) => {
        const trailingComma = index < idsToFollow.length - 1 ? ',' : '';
        return `${acc}\n{ profile: "${profileId}" }${trailingComma}`;
    }, '')}`;

export default (idsToFollow: string[]) => `mutation CreateFollowTypedData {
  createFollowTypedData(request:{
    follow: [
      ${getIdsString(idsToFollow)}
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
