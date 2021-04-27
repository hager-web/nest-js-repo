import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema ({ 
    name: {
        type: String,
        unique: true,
        required: true,
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        validate: { validator: validateEmail },
 
    }, 
    password: {
        type: String,
        required: true
    }, 
});

function validateEmail(email: string) {

  // tslint:disable-next-line:max-line-length

  const expression = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return expression.test(email);

}