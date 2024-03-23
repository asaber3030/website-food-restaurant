import { Head, Link, useForm } from '@inertiajs/react';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "@/layouts/Layout";

export default function VerifyEmail({status}) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <Layout>
      <Head title="Email Verification"/>

      <div className="verify-email-container">
        <div className="alert alert-sm alert-primary mb-4 text-sm text-gray-600 dark:text-gray-400">
          Thanks for signing up! Before getting started, could you verify your email address by clicking on the
          link we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        {status === 'verification-link-sent' && (
          <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
            A new verification link has been sent to the email address you provided during registration.
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mt-4 flex items-center justify-between">
            <button type='submit' className="btn btn-warning text-black" disabled={processing}>
              {processing && (
                <FontAwesomeIcon className={'mr-4 text-black animate-spin'} icon={faSpinner} />
              )}
              Resend Verification Email
            </button>

            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Log Out
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
