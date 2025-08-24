import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledData } from '../lib/slices/formSlice';
import type { RootState } from '../lib/store';
import {
  formSchema,
  type FormInput,
  type FormOutput,
} from '../validation/formSchema';
import { z } from 'zod';

export const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.form.countries);
  const [pictureError, setPictureError] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormOutput, string>>
  >({});

  const refs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    terms: useRef<HTMLInputElement>(null),
    picture: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setPictureError('');

    const rawData: FormInput = {
      name: refs.name.current?.value || '',
      age: Number(refs.age.current?.value || 0),
      email: refs.email.current?.value || '',
      password: refs.password.current?.value || '',
      confirmPassword: refs.confirmPassword.current?.value || '',
      gender: refs.gender.current?.value || '',
      termsAccepted: refs.terms.current?.checked || false,
      country: refs.country.current?.value || '',
    };

    const pictureFile = refs.picture.current?.files?.[0];
    if (pictureFile) {
      if (!['image/png', 'image/jpeg'].includes(pictureFile.type)) {
        setPictureError('Only PNG or JPEG allowed');
        return;
      }
      if (pictureFile.size > 2 * 1024 * 1024) {
        setPictureError('Max size is 2MB');
        return;
      }

      rawData.pictureBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(pictureFile);
      });
    }

    try {
      const validated: FormOutput = formSchema.parse(rawData);
      dispatch(setUncontrolledData(validated));
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormOutput, string>> = {};
        err.issues.forEach((issue) => {
          const field = issue.path[0] as keyof FormOutput;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="m-0">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          ref={refs.name}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.name}</p>
      </div>

      <div className="m-0">
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          ref={refs.age}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.age}</p>
      </div>

      <div className="m-0">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          ref={refs.email}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.email}</p>
      </div>

      <div className="m-0">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={refs.password}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.password}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          ref={refs.confirmPassword}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.confirmPassword}
        </p>
      </div>

      <div className="m-0">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          ref={refs.gender}
          className="border p-1 w-full"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.gender}</p>
      </div>

      <div className="m-0">
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          name="country"
          list="country-list"
          ref={refs.country}
          className="border p-1 w-full"
        />
        <datalist id="country-list">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <p className="text-red-500 text-sm min-h-[1.25rem]">{errors.country}</p>
      </div>

      <div className="m-0">
        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          name="picture"
          type="file"
          ref={refs.picture}
          className="border p-1 w-full"
        />
        <p className="text-red-500 text-sm min-h-[1.25rem]">{pictureError}</p>
      </div>

      <div className="m-0">
        <label htmlFor="terms" className="flex items-center gap-2">
          <input id="terms" name="terms" type="checkbox" ref={refs.terms} />
          Accept Terms and Conditions
        </label>
        {/* ключ в errors — termsAccepted, потому что таким он идёт из схемы */}
        <p className="text-red-500 text-sm min-h-[1.25rem]">
          {errors.termsAccepted}
        </p>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};
