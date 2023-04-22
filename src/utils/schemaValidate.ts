import * as Yup from 'yup'

export const CreateFilterSchemaValidate = {
    id: Yup.number().min(1),
    label: Yup.string().required().max(20),
}

export const CreateColorSchemaValidate = {
    id: Yup.string().max(7).required(),
    label: Yup.string(),
}

export const ProductCreateSchemaValidate = {
    name: Yup.string().max(20).required(),
    description: Yup.string().min(50).required(),
    price: Yup.number().integer().moreThan(-1).required(),
    available: Yup.number().integer().moreThan(-1).required(),
    creatorId: Yup.string().uuid().required(),
    colors: Yup.array().of(Yup.string().max(7).required()).required('Color must be array type'),
    roomIds: Yup.array().of(Yup.object({ id: Yup.number().moreThan(-1).required() })),
    cateIds: Yup.array().of(Yup.object({ id: Yup.number().moreThan(-1).required() })),
    imageIds: Yup.array().of(Yup.object({ id: Yup.number().moreThan(-1).required() })),
}

export const ProductEditSchemaValidate = {
    ...ProductCreateSchemaValidate,
    id: Yup.string().uuid().required(),
}