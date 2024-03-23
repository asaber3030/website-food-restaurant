import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, useForm } from '@inertiajs/react';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Layout from "@/layouts/Layout";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('password.confirm'));
  };

  return (
    <Layout>
      <Head title="Confirm Password"/>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <InputLabel forInput="password" value="Password"/>

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            isFocused={true}
            handleChange={onHandleChange}
          />

          <InputError message={errors.password} className="mt-2"/>
        </div>

        <div className="flex items-center justify-end mt-4">
          <button disabled={processing} type='submit' className="btn btn-warning ml-4 text-black" processing={processing}>
            {processing && (
              <FontAwesomeIcon className={'mr-4 text-black animate-spin'} icon={faSpinner} />
            )}
            Confirm
          </button>
        </div>
      </form>
    </Layout>
  );
}
