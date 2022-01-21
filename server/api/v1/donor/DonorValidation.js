import * as yup from 'yup';

export default function() {
  return {
    create: yup.object().shape({
        donorId: yup
            .string()
            .required('donorId is a required field.')
            .typeError('Invalid type for donorId property.'),
        name: yup
            .string()
            .typeError('Invalid type for name property.'),
        email: yup
            .string()
            .typeError('Invalid type for email property.'),
        gender: yup
            .string()
            .typeError('Invalid type for gender property.'),
        address: yup
            .string()
            .typeError('Invalid type for address property.'),
        amount: yup
            .number()
            .typeError('Invalid type for amount property.'),
    }),
  };
}
