export default (address: string, sig: string) => `mutation Authenticate {
  authenticate(request: {
    address: "${address}",
    signature: "${sig}"
  }) {
    accessToken
    refreshToken
  }
}`;
