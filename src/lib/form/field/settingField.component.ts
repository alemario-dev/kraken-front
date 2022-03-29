
export interface IkrakenValidator{
    function: (any);
    message: string;
}

export enum INPUTTYPEFIELDS {
    TEXT = 'text',
    DATE = 'date',
    CHECKBOX = 'checkbox',
    TEXTAREA = 'TEXTAREA',
    SELECT_CLOSE = 'SELECT_CLOSE',
    SELECT_OPEN = 'SELECT_OPEN',
    PASSWORD = 'password',
    NUMBER = 'number',
    PHONE = 'phone',
    EMAIL = 'email',
}

export enum VALIDATE_FIELDS {
    VALID = 0,
    INVALID =  1
}

export const ValidatorEmail:IkrakenValidator =  {
    function: (field)=>{
        const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (re.test(field))
        {
            return VALIDATE_FIELDS.VALID
        }
        return VALIDATE_FIELDS.INVALID
    },
    message: 'No es un correo valido'
}