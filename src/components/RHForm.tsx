import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setRHFData } from '../lib/slices/formSlice';
import {
  formSchema,
  type FormOutput,
  type FormInput,
} from '../validation/formSchema';
import type { RootState } from '../lib/store';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export const RHForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.form.countries);
  const [pictureError, setPictureError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      termsAccepted: false,
      country: '',
      pictureBase64: '',
    },
  });

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setPictureError('Only PNG or JPEG allowed');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPictureError('Max size is 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setValue('pictureBase64', reader.result as string);
      setPictureError('');
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<FormOutput> = (data) => {
    dispatch(setRHFData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="m-0">
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} className="border p-1 w-full" />
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.name?.message}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          {...register('age')}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.age?.message}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          {...register('email')}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.email?.message}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.password?.message}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          {...register('gender')}
          className="border p-1 w-full"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.gender?.message}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          list="country-list"
          {...register('country')}
          className="border p-1 w-full"
        />
        <datalist id="country-list">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.country?.message}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          type="file"
          onChange={handlePictureUpload}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">{pictureError}</p>
      </div>

      <div className="m-0">
        <label htmlFor="terms" className="flex items-center gap-2">
          <input id="terms" type="checkbox" {...register('termsAccepted')} />
          Accept Terms and Conditions
        </label>
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.termsAccepted?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`px-4 py-1 rounded text-white ${
          isValid ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
    </form>
  );
};
