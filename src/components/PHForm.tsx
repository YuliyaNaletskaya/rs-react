import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
};

export const RHForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('RHF:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input
          {...register('name', { required: 'Name is required' })}
          className="border p-2 w-full"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <label>
        Email:
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email',
            },
          })}
          className="border p-2 w-full"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};
