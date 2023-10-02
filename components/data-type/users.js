export const columns = [
  {
    title: '#:',
    getFullData: ({ id }) => id,
    getDataVal: ({ id }) => id,
    setDataVal: (id) => ({ id }),
  },
  {
    title: 'Name:',
    getFullData: ({ name: fName }) => fName,
    getDataVal: ({ name: fName }) => fName,
    setDataVal: (name) => ({ name }),
  },
  {
    title: 'Email:',
    getFullData: ({ email }) => <a href={`mailto:${email}`}>{email}</a>,
    getDataVal: ({ email }) => email,
    setDataVal: (email) => ({ email }),
  },
  {
    title: 'Address:',
    getFullData: ({ address: { street, suite, city } }) =>
      `${city}, ${street}, ${suite}`,
    getDataVal: ({ address: { city } }) => city,
    // setDataVal: (city) => ({
    //   getFullData: {
    //     address: {
    //       city,
    //     },
    //   },
    // }),
  },
  {
    title: 'Phone number:',
    getFullData: ({ phone }) => <a href={`tel:${phone}`}>{phone}</a>,
    getDataVal: ({ phone }) => phone,
    setDataVal: (phone) => ({ phone }),
  },
  {
    title: 'Website:',
    getFullData: ({ website }) => <a href={`https://${website}`}>{website}</a>,
    getDataVal: ({ website }) => website,
    setDataVal: (website) => ({ website }),
  },
  {
    title: 'Company name:',
    getFullData: ({ company: { name: cName } }) => cName,
    getDataVal: ({ company: { name: cName } }) => cName,
    // setDataVal: (cName) => {
    //   cName;
    // },
  },
];
