import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useBasicFormTop = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AType>({
        resolver: zodResolver(aSchema)
    });

    const onSubmit = (data: AType) => {
        debugger;
        console.log(data);
    };

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        errors
    };
};
import { z } from 'zod';
// Page 1
const aname: z.ZodString = z.string().min(1).max(50);

export const aSchema = z.object({
    aname: aname
});
export type AType = z.infer<typeof aSchema>;

const BasicFormTop = () => {
    const { register, onSubmit, errors } = useBasicFormTop();
    return (
        <form onSubmit={onSubmit}>
            <input {...register('aname')} />
            <button type={'submit'}>送信</button>
        </form>
    );
};

export default BasicFormTop;
