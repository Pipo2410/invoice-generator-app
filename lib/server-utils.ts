'use server';

export const sendCreateClientRequest = () => {
  console.log('server Action');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessName: 'Netflix',
      email: 'netflix@gmail.com',
      nif: 389643090,
      country: 'Portugal',
      currency: 'EUR',
      defaultCurrency: 'EUR',
      address: {
        street: 'Avenida de liberdade 726',
        city: 'Lisboa',
        postalCode: '1254-223',
        additional: '1dt-1e',
      },
    }),
  };
  const data = fetch(`http://localhost:3000/api/clients/create`, requestOptions).then((response) => response.json());

  return data;
};
