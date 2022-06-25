export default (address: string) => `query Challenge {
  challenge(request: { address: "${address}" }) {
    text
  }
}`;
