module.exports = {
  id: '/address',
  type: 'object',
  properties: {
    mailingAddress: {
      default: '',
      type: 'string'
    },
    mailingAddress2: {
      default: '',
      type: 'string'
    },
    mailingCity: {
      default: '',
      type: 'string'
    },
    mailingState: {
      default: '',
      pattern:
        '^(A[EKLPRSZ]|C[AOT]|D[CE]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHVJMY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$',
      type: 'string'
    },
    mailingZIP: {
      default: '',
      pattern: '^[0-9]{5}$|^[0-9]{9}$',
      type: 'string'
    }
  },
  required: ['mailingAddress', 'mailingCity', 'mailingState', 'mailingZIP']
};
