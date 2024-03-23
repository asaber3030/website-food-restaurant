import InputError from '@/Components/InputError';
import Layout from "@/layouts/Layout";
import TextInput from '@/Components/TextInput';

import { Head, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <Layout>

      <Head title="Forgot Password"/>

      <div className="forgot-password-status">
        {status && <div className="alert alert-sm alert-success mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}
      </div>

      <form onSubmit={submit} className='forgot-password-form'>

        <h1 className='section-title'>Forgot Password?</h1>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Forgot your password? No problem. Just let us know your email address and we will email you a password
          reset link that will allow you to choose a new one.
        </div>
        <label>E-mail Address</label>
        <TextInput
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          isFocused={true}
          handleChange={onHandleChange}
        />

        <InputError message={errors.email} className="mt-2"/>

        <div className="flex items-center justify-end mt-4">
          <button disabled={processing} type='submit' className="btn btn-warning ml-4 text-black" processing={processing}>
            {processing && (
              <FontAwesomeIcon className={'mr-4 text-black animate-spin'} icon={faSpinner} />
            )}
            Send Email
          </button>
        </div>
      </form>
    </Layout>
  );
}
